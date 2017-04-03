import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'
import getProjectsData from 'src/utils/get-projects-data'
import SwagButton from 'src/components/SwagButton'

const Index = ({ route }) => {
  const projectsData = getProjectsData(route.pages)

  return (
    <div>
      <Helmet
        title={getPageTitle()}
      />

      <h1>Home</h1>

      <SwagButton
        text="About"
        href={prefixLink('/about/')}
      />

      {projectsData.map(project => (
        <div>
          <Link to={prefixLink(project.path)}>
            {project.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

Index.propTypes = {
  route: PropTypes.object.isRequired
}

export default Index
