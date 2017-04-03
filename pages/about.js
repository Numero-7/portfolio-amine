import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'
import LinkColumn from 'src/components/LinkColumn'

const About = ({ previousPath }) => (
  <div>
    <Helmet
      title={getPageTitle()}
    />

    <LinkColumn
      text="Close."
      href={prefixLink(previousPath) || prefixLink('/')}
    />

    <h1>Hello about</h1>
    <Link to={prefixLink('/')}>Index</Link>
  </div>
)

About.propTypes = {
  previousPath: PropTypes.string.isRequired
}


export default About
