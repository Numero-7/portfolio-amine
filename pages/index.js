import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import SwagButton from 'src/components/SwagButton'

const Index = ({ projectsData }) => (
  <div>
    <LinkColumn
      href={prefixLink('/about/')}
      text="About me."
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

    <LinkColumn
      href={prefixLink('/projects/')}
      text="All projects"
      pull="right"
    />
  </div>
)

Index.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Index
exports.data = {
  needsRootData: true
}
