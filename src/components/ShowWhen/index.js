import React, { PropTypes } from 'react'
import Rezponsive from 'rezponsive'
import breakpoints from 'src/values/breakpoints'

const mediaQueries = {
  small: `screen and (max-width: ${breakpoints.small}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`
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
