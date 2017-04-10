import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './close-button.module.scss'

const CloseButton = ({ href }) => (
  <Link
    className={styles.link}
    to={href}
  >
    Close.
  </Link>
)

CloseButton.propTypes = {
  href: PropTypes.string.isRequired
}

export default CloseButton
