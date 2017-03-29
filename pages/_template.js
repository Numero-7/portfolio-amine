import React, { PropTypes } from 'react'
import { rhythm } from '../utils/typography'
import { Container } from 'react-responsive-grid'

const Template = ({ children }) => (
  <Container style={{
    maxWidth: '100%',
    padding: `${rhythm(0.5)} ${rhythm(1)}`
  }}>
    {children}
  </Container>
)

Template.propTypes = {
  children: PropTypes.node
}

export default Template
