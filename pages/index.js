import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import SwagButton from 'src/components/SwagButton'

const Index = ({ projectsData }) => (
  <div>
    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
    />

    <LinkColumn
      text="All projects"
      href={prefixLink('/projects/')}
      pull="right"
    />

    <h1>Home</h1>
    <SwagButton text="Swag button" />

    {projectsData.map(project => (
      <div>
        <Link to={prefixLink(project.path)}>
          {project.title}
        </Link>
      </div>
    ))}
  </div>
)

Index.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Index
exports.data = {
  needsRootData: true
}
