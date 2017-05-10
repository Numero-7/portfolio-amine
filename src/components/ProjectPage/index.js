import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite } from 'gsap'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import LinkColumn from '../LinkColumn'
import ScrollIndicator from '../ScrollIndicator'
import ProjectIntro from '../ProjectIntro'
import ProjectImage from '../ProjectImage'
import ProjectsGrid from '../ProjectsGrid'
import StretchedContainer from '../StretchedContainer'

class ProjectPage extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    previousPath: PropTypes.string.isRequired,
    transitionPage: PropTypes.func.isRequired,
    notifyPageTransitionEnded: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  getInitialState () {
    return {
      hideScrollIndicator: false,
      contentOpacity: 1
    }
  }

  componentWillAppear (onComplete) {
    TweenLite.fromTo(
      this,
      1,
      { state: { contentOpacity: 0 } },
      { state: { contentOpacity: 1 }, onComplete }
    )
  }

  componentWillEnter (onComplete) {
    const { previousPath, transitionPage } = this.props

    if (previousPath === '/about/' || previousPath === '/projects/') {
      transitionPage('in', onComplete, true)
    } else {
      TweenLite.fromTo(
        this,
        1,
        { state: { contentOpacity: 0 } },
        { state: { contentOpacity: 1 }, onComplete }
      )
    }
  }

  componentWillLeave (onComplete) {
    if (this.columnClicked) {
      this.props.transitionPage('out', onComplete)
    } else {
      TweenLite.fromTo(
        this,
        1,
        { state: { contentOpacity: 1 } },
        {
          state: { contentOpacity: 0 },
          onComplete: () => {
            this.base.scrollIntoView(true)
            onComplete()
          }
        }
      )
    }
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  handleProjectsGridInView () {
    if (!this.projectsGridInView) {
      this.projectsGrid.animate()
      this.projectsGridInView = true
    }
  }

  handleScrollIndicator ({ currentPosition }) {
    this.setState({ hideScrollIndicator: currentPosition === 'inside' })
  }

  render () {
    const { hideScrollIndicator, contentOpacity } = this.state
    const { route, project, projectsData } = this.props
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle(project.title)

    return (
      <StretchedContainer>
        <Helmet
          title={pageTitle}
          link={[
            { rel: 'canonical', href: currentURL }
          ]}
          meta={[
            { name: 'description', content: project.description },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: project.description },
            { property: 'og:url', content: currentURL }
          ]}
        />

        <LinkColumn
          handleClick={() => { this.columnClicked = true }}
          transparent={true}
          text="About me."
          href={prefixLink('/about/')}
          pull="left"
        />

        <div style={{ opacity: contentOpacity }}>
          <ScrollIndicator hidden={hideScrollIndicator} />

          <ProjectIntro project={project} />
          <section>
            {project.images.map(link => (
              <ProjectImage
                src={link}
                title={project.title}
              />
            ))}
          </section>

          <Waypoint
            onEnter={(e) => {
              this.handleProjectsGridInView()
              this.handleScrollIndicator(e)
            }}
            onLeave={e => this.handleScrollIndicator(e)}
          >
            <section>
              <ProjectsGrid
                ref={(component) => { this.projectsGrid = component }}
                projects={projectsData.filter(({ order }) => order !== project.order)}
              />
            </section>
          </Waypoint>
        </div>

        <LinkColumn
          handleClick={() => { this.columnClicked = true }}
          transparent={true}
          icon={true}
          text="All projects."
          href={prefixLink('/projects/')}
          pull="right"
        />
      </StretchedContainer>
    )
  }
}

export default ProjectPage
