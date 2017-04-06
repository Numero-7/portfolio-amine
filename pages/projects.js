import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import ProjectsGrid from 'src/components/ProjectsGrid'

const Projects = ({ projectsData }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
    />

    <ProjectsGrid projects={projectsData} />

    <LinkColumn
      text="Back to home."
      href={prefixLink('/')}
      pull="right"
    />
  </div>
)

Projects.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Projects
exports.data = {
  needsRootData: true
}
