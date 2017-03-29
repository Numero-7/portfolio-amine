import ReactDOM from 'react-dom/server'
import React from 'react'
import Typography from 'typography'
import { GoogleFont } from 'react-typography'

const FONT_STACK = ['Karla', 'Helvetica', 'Arial', 'sans-serif']

const options = {
  includeNormalize: true,
  googleFonts: [
    {
      name: 'Karla',
      styles: [
        '400',
        '700'
      ]
    }
  ],
  headerFontFamily: FONT_STACK,
  headerWeight: '700',
  bodyFontFamily: FONT_STACK,
  bodyWeight: '400',
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  scaleRatio: 2.25
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()

  if (typeof document !== 'undefined') {
    const googleFonts = ReactDOM.renderToStaticMarkup(
      React.createFactory(GoogleFont)({ typography })
    )
    const head = document.getElementsByTagName('head')[0]

    head.insertAdjacentHTML('beforeend', googleFonts)
  }
}

export default typography
