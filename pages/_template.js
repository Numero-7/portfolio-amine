import React, { PropTypes } from 'react'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'

const Template = ({ children }) => (
  <Container
    style={{
      maxWidth: '100%',
      padding: `${rhythm(0.5)} ${rhythm(1)}`
    }}
  >
    {children}
  </Container>
)

Template.propTypes = {
  children: PropTypes.node.isRequired
}

export default Template
