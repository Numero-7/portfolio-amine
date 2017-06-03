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
    transitionPage: PropTypes.func.isRequired,
    notifyPageTransitionEnded: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      contentOpacity: 1
    }
  }

  componentWillEnter (onComplete) {
    const { previousPath, transitionPage } = this.props
    transitionPage('in', onComplete, previousPath === '/about/')
  }

  componentDidMount () {
    this.projectsGrid.animate()
  }

  componentWillLeave (onComplete) {
    this.props.transitionPage(
      'out',
      onComplete,
      this.goBackLinkClicked || (!this.goBackLinkClicked && !this.aboutLinkClicked)
    )
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  render () {
    const { contentOpacity } = this.state
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
            handleClick={() => { this.aboutLinkClicked = true }}
            text="About me."
            href={prefixLink('/about/')}
          />

          <div style={{ opacity: contentOpacity }}>
            <ProjectsGrid
              ref={(component) => { this.projectsGrid = component }}
              projects={projectsData}
            />
          </div>

          <LinkColumn
            handleClick={() => { this.goBackLinkClicked = true }}
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
