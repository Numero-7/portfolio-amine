import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './utils/typography'

const BUILD_TIME = new Date().getTime()

const HTML = ({ body }) => {
  const head = Helmet.rewind()
  let css

  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!./public/styles.css')
        }}
      />
    )
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        {css}
      </head>
      <body>
        <div
          id="react-mount"
          dangerouslySetInnerHTML={{
            __html: body
          }}
        />
        <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
      </body>
    </html>
  )
}

HTML.propTypes = {
  body: PropTypes.string
}

module.exports = HTML
