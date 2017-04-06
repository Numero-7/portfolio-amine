import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'

const Projects = () => (
  <div>
    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
    />

    <LinkColumn
      text="Back to home."
      href={prefixLink('/')}
      pull="right"
    />

    <h1>Projects page</h1>
    <Link to={prefixLink('/')}>Index</Link>
  </div>
)

export default Projects
