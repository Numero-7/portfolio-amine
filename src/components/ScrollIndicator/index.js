import React from 'react'
import { bool } from 'prop-types'
import styles from './scroll-indicator.module.scss'

const ScrollIndicator = ({ hidden }) => (
  <span className={`${styles.indicator} ${hidden ? styles.hidden : ''}`}>Scroll</span>
)

ScrollIndicator.propTypes = {
  hidden: bool.isRequired
}

export default ScrollIndicator
