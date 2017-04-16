import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import ProjectsGrid from 'src/components/ProjectsGrid'
import StretchedContainer from 'src/components/StretchedContainer'

const Projects = ({ projectsData }) => (
  <StretchedContainer>
    <LinkColumn
      text="Back to home."
      href={prefixLink('/')}
    />

    <ProjectsGrid projects={projectsData} />

    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
      pull="right"
    />
  </StretchedContainer>
)

Projects.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Projects
