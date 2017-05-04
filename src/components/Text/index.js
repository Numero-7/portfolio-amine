import React, { PropTypes } from 'react'
import styles from './text.module.scss'

const Text = ({ children }) => (
  <p className={styles.root}>
    {children}
  </p>
)

Text.propTypes = {
  children: PropTypes.node.isRequired
}

export default Text
