import React, { PropTypes } from 'react'
import styles from './overlay.module.css'

const Overlay = ({ color }) => (
  <div className={`${styles.root} ${styles[color]}`} />
)

Overlay.propTypes = {
  color: PropTypes.string
}

Overlay.defaultProps = {
  color: 'black'
}

export default Overlay
