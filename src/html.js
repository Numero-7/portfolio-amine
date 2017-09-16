import React from 'react'
import { string, arrayOf, object } from 'prop-types'
import Helmet from 'react-helmet'
import getAbsoluteURL from '@utils/get-absolute-url'

const HTML = ({ body, headComponents, postBodyComponents }) => {
  const head = Helmet.rewind()
  let css

  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!../public/styles.css') // eslint-disable-line global-require
        }}
      />
    )
  }

  return (
    <html lang="en">
      <head>
        {headComponents}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui" />

        {head.title.toComponent()}
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getAbsoluteURL('/static/images/og-image.png')} />
        {head.meta.toComponent()}
        <link rel="icon" href="/static/images/favicon.ico" />
        {head.link.toComponent()}

        <script
          dangerouslySetInnerHTML={{
            __html: require('!raw!./utils/browser/load-fonts.js') // eslint-disable-line global-require
          }}
        />
        {css}
      </head>
      <body>
        <div
          id="___gatsby"
          dangerouslySetInnerHTML={{
            __html: body
          }}
        />

        {postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  body: string.isRequired,
  headComponents: arrayOf(object).isRequired,
  postBodyComponents: arrayOf(object).isRequired
}

export default HTML
