import React from 'react'
import { string, bool } from 'prop-types'
import CloseButton from '@components/CloseButton'
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
  previousPath: string.isRequired,
  currentPath: string.isRequired,
  showCloseButton: bool
}

Header.defaultProps = {
  showCloseButton: false
}

export default Header
