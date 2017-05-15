import React, { PropTypes } from 'react'
import styles from './credits.module.scss'

const Credits = ({ children }) => (
  <p className={styles.root}>
    {children}
  </p>
)

Credits.propTypes = {
  children: PropTypes.node.isRequired
}

export default Credits
