import React from 'react'
import { node, object, string } from 'prop-types'
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
  children: node.isRequired,
  currentMedia: object.isRequired,
  when: string.isRequired
}

export default Show(Rezponsive(When))
