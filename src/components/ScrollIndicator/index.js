import React, { PropTypes } from 'react'
import styles from './scroll-indicator.module.scss'

const ScrollIndicator = ({ hidden }) => (
  <span className={`${styles.indicator} ${hidden ? styles.hidden : ''}`}>Scroll</span>
)

ScrollIndicator.propTypes = {
  hidden: PropTypes.bool.isRequired
}

export default ScrollIndicator
