import React, { PropTypes } from 'react'
import Rezponsive from 'rezponsive'

const mediaQueries = {
  mobile: 'screen and (max-width: 899px)',
  desktop: 'screen and (min-width: 900px)'
}

const Show = WrappedComponent => props => (
  <WrappedComponent
    {...props}
    mq={mediaQueries}
  />
)

const When = ({ children, currentMedia, when }) => (
  currentMedia && currentMedia[when]
    ? children
    : <div />
)

When.propTypes = {
  children: PropTypes.node.isRequired,
  currentMedia: PropTypes.object.isRequired,
  when: PropTypes.string.isRequired
}

export default Show(Rezponsive(When))
