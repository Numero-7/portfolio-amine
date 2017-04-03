import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'
import LinkColumn from 'src/components/LinkColumn'

const Projects = () => (
  <div>
    <Helmet
      title={getPageTitle()}
    />

    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
    />

    <LinkColumn
      text="Back to home."
      href={prefixLink('/')}
      orientation="right"
    />

    <h1>Projects page</h1>
    <Link to={prefixLink('/')}>Index</Link>
  </div>
)

export default Projects
