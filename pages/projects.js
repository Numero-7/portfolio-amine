import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import ProjectsGrid from 'src/components/ProjectsGrid'

class Projects extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    previousPath: PropTypes.string.isRequired,
    handlePageTransitionEnd: PropTypes.func.isRequired
  }

  componentWillAppear (onComplete) {
    this.projectsGrid.fadeInLinks(onComplete)
  }

  componentWillEnter (onComplete) {
    onComplete(this) // this = ignore eslint
  }

  componentWillLeave (onComplete) {
    onComplete(this) // this = ignore eslint
  }

  componentWillUnmount () {
    this.props.handlePageTransitionEnd(true)
  }

  render () {
    const { route, projectsData, previousPath } = this.props
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle('Projects')

    return (
      <div>
        <Helmet
          title={pageTitle}
          meta={[
            { property: 'og:title', content: pageTitle },
            { property: 'og:url', content: currentURL }
          ]}
          link={[
            { rel: 'canonical', href: currentURL }
          ]}
        />

        <StretchedContainer>
          <LinkColumn
            text="Go back."
            href={(previousPath !== '/about/' && prefixLink(previousPath)) || prefixLink('/')}
          />

          <ProjectsGrid
            ref={(component) => { this.projectsGrid = component }}
            projects={projectsData}
          />

          <LinkColumn
            handleClick={() => { this.aboutLinkClicked = true }}
            text="About me."
            href={prefixLink('/about/')}
            pull="right"
          />
        </StretchedContainer>
      </div>
    )
  }
}

export default Projects
