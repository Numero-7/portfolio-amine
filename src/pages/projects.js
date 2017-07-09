import React, { Component } from 'react'
import { object, arrayOf, string, func } from 'prop-types'
import Helmet from 'react-helmet'
import getPageTitle from '@utils/get-page-title'
import getAbsoluteURL from '@utils/get-absolute-url'
import StretchedContainer from '@components/StretchedContainer'
import LinkColumn from '@components/LinkColumn'
import ProjectsGrid from '@components/ProjectsGrid'

class Projects extends Component {
  static propTypes = {
    route: object.isRequired,
    projectsData: arrayOf(object).isRequired,
    previousPath: string.isRequired,
    transitionPage: func.isRequired,
    notifyPageTransitionEnded: func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { contentOpacity: 1 }
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
            href="/about/"
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
            href={(previousPath !== '/about/' && previousPath) || '/'}
            pull="right"
          />
        </StretchedContainer>
      </div>
    )
  }
}

export default Projects
