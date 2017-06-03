import React from 'react'
import { node } from 'prop-types'
import styles from './text.module.scss'

const Text = ({ children }) => (
  <p className={styles.root}>
    {children}
  </p>
)

Text.propTypes = {
  children: node.isRequired
}

export default Text
