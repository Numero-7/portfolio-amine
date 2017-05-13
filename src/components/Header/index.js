import React, { PropTypes } from 'react'
import CloseButton from '../CloseButton'
import styles from './header.module.scss'

const Header = ({ previousPath, currentPath, showCloseButton }) => (
  <header className={styles.root}>
    <div>
      <h2 className={`${styles.text} ${styles.name}`}>Amine Bouneggar</h2>
      <h3 className={`${styles.text} ${styles.role}`}>French designer</h3>
    </div>

    {showCloseButton && (
      <CloseButton
        previousPath={previousPath}
        currentPath={currentPath}
      />
    )}
  </header>
)

Header.propTypes = {
  previousPath: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  showCloseButton: PropTypes.bool
}

Header.defaultProps = {
  showCloseButton: false
}

export default Header
