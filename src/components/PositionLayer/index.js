import React, { PropTypes } from 'react'
import styles from './position-layer.module.scss'

const PositionLayer = ({ zIndex, children }) => (
  <div
    className={styles.root}
    style={{ zIndex }}
  >
    {children}
  </div>
)

PositionLayer.propTypes = {
  zIndex: PropTypes.number,
  children: PropTypes.node.isRequired
}

PositionLayer.defaultProps = {
  zIndex: 1
}

export default PositionLayer
