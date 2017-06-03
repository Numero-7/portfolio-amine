import React from 'react'
import { node } from 'prop-types'
import styles from './credits.module.scss'

const Credits = ({ children }) => (
  <p className={styles.root}>
    {children}
  </p>
)

Credits.propTypes = {
  children: node.isRequired
}

export default Credits
