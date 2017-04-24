import React, { PropTypes } from 'react'
import ProjectPage from '../src/components/ProjectPage'

const JSONWrapper = ({ route, projectsData }) => {
  const project = route.page.data

  return (
    <ProjectPage
      projectsData={projectsData}
      project={project}
    />
  )
}

JSONWrapper.propTypes = {
  route: PropTypes.object.isRequired,
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

module.exports = JSONWrapper
