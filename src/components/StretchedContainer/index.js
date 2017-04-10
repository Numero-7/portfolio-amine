import React, { PropTypes } from 'react'
import styles from './stretched-container.module.scss'

const StretchedContainer = ({ children, pushed }) => (
  <div className={`${styles.root} ${pushed ? styles.pushed : ''}`}>
    {children}
  </div>
)

StretchedContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pushed: PropTypes.bool
}

StretchedContainer.defaultProps = {
  pushed: true
}

export default StretchedContainer
