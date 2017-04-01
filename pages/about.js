import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'

const About = () => (
  <div>
    <Helmet
      title={getPageTitle()}
    />
    <h1>Hello about</h1>
    <Link to={prefixLink('/')}>Index</Link>
  </div>
)

export default About
