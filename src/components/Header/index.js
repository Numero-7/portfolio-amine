import React, { PropTypes } from 'react'
import CloseButton from '../CloseButton'

const Header = ({ showCloseButton }) => (
  <header>
    <p>Test</p>
    {showCloseButton && <CloseButton />}
  </header>
)

Header.propTypes = {
  showCloseButton: PropTypes.bool
}

Header.defaultProps = {
  showCloseButton: false
}

export default Header
