import React, { PropTypes } from 'react'
import styles from './stretched-container.module.scss'

const StretchedContainer = ({ children, pushed, paddingSide }) => (
  <div
    className={`
      ${styles.root} ${paddingSide ? styles[paddingSide] : ''} ${pushed ? styles.pushed : ''}
    `}
  >
    {children}
  </div>
)

StretchedContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pushed: PropTypes.bool,
  paddingSide: PropTypes.string
}

StretchedContainer.defaultProps = {
  pushed: true,
  paddingSide: ''
}

export default StretchedContainer
