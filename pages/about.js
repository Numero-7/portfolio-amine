import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'

const About = ({ previousPath }) => (
  <div>
    <LinkColumn
      text="Close."
      href={prefixLink(previousPath) || prefixLink('/')}
    />

    <h1>About page</h1>
    <Link to={prefixLink('/')}>Index</Link>
  </div>
)

About.propTypes = {
  previousPath: PropTypes.string.isRequired
}

export default About
exports.data = {
  needsPreviousPath: true
}
