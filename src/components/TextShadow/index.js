import React from 'react'
import { string } from 'prop-types'
import styles from './text-shadow.module.scss'

const TextShadow = ({ text }) => (
  <span
    className={styles.text}
    data-content={text}
  >
    {text}
  </span>
)

TextShadow.propTypes = {
  text: string.isRequired
}

export default TextShadow
