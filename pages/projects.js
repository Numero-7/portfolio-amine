import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TRANSITION_LAYER_DURATION } from 'src/values/animations'
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
    triggerPageTransition: PropTypes.func.isRequired
  }

  /* eslint-disable class-methods-use-this */
  componentWillAppear (onComplete) {
    onComplete()
  }
  /* eslint-enable class-methods-use-this */

  componentWillEnter (onComplete) {
    const { previousPath, triggerPageTransition } = this.props
    triggerPageTransition(onComplete, previousPath === '/about/')
  }

  componentDidMount () {
    this.projectsGrid.animate()
  }

  /* eslint-disable class-methods-use-this */
  componentWillLeave (onComplete) {
    setTimeout(onComplete, TRANSITION_LAYER_DURATION * 1000)
  }
  /* eslint-enable class-methods-use-this */

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
            text="About me."
            href={prefixLink('/about/')}
          />

          <ProjectsGrid
            ref={(component) => { this.projectsGrid = component }}
            projects={projectsData}
          />

          <LinkColumn
            text="Go back."
            href={(previousPath !== '/about/' && prefixLink(previousPath)) || prefixLink('/')}
            pull="right"
          />
        </StretchedContainer>
      </div>
    )
  }
}

export default Projects
