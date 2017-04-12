import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from '../LinkColumn'
import ProjectIntro from '../ProjectIntro'
import ProjectsGrid from '../ProjectsGrid'
import StretchedContainer from '../StretchedContainer'

const ProjectPage = ({ projectsData, project }) => (
  <StretchedContainer>

    <LinkColumn
      text="About me."
      href={prefixLink('/about/')}
      pull="left"
    />

    <ProjectIntro project={project} />

    <ProjectsGrid
      fullHeight={true}
      projects={projectsData}
    />

    <LinkColumn
      text="All projects."
      href={prefixLink('/projects/')}
      pull="right"
    />

  </StretchedContainer>

)

ProjectPage.propTypes = {
  project: PropTypes.object.isRequired,
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectPage
