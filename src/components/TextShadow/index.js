import React, { PropTypes } from 'react'
import styles from './text-shadow.module.scss'

const TextShadow = ({ text }) => (
  <div className={styles.container}>
    <span className={styles.text}>{text}</span>
    <span className={`${styles.text} ${styles.shadow}`}>{text}</span>
  </div>
)

TextShadow.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextShadow
