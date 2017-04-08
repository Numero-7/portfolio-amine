import React, { PropTypes } from 'react'
import styles from './shadow.module.scss'

const TextShadow = ({ text }) => (
  <div className={styles.container}>
    <span className={styles.text}>{text}</span>
    <span className={`${styles.text} ${styles.textShadow}`}>{text}</span>
  </div>
)

TextShadow.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextShadow
