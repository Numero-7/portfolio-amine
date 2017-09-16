import React from 'react'
import { node, bool, oneOf } from 'prop-types'
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
  children: node.isRequired,
  pushed: bool,
  paddingSide: oneOf(['right', 'left', ''])
}

StretchedContainer.defaultProps = {
  pushed: true,
  paddingSide: ''
}

export default StretchedContainer
