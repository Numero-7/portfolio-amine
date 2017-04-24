import React, { PropTypes } from 'react'
import styles from './z-index-layer.module.scss'

const ZIndexLayer = ({ zIndex, children }) => (
  <div
    className={styles.root}
    style={{ zIndex }}
  >
    {children}
  </div>
)

ZIndexLayer.propTypes = {
  zIndex: PropTypes.number,
  children: PropTypes.node.isRequired
}

ZIndexLayer.defaultProps = {
  zIndex: 1
}

export default ZIndexLayer
