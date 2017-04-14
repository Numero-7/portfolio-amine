import React, { PropTypes } from 'react'
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
  text: PropTypes.string.isRequired
}

export default TextShadow
