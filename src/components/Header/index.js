import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import CloseButton from '../CloseButton'
import styles from './header.module.scss'

const Header = ({ showCloseButton }) => (
  <header className={styles.root}>
    <div>
      <h2 className={`${styles.text} ${styles.name}`}>Amine Bouneggar</h2>
      <h3 className={`${styles.text} ${styles.role}`}>French designer</h3>
    </div>
    {showCloseButton && <CloseButton href={prefixLink('/')} />}
  </header>
)

Header.propTypes = {
  showCloseButton: PropTypes.bool
}

Header.defaultProps = {
  showCloseButton: false
}

export default Header
