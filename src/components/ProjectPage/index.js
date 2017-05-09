import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite } from 'gsap'
import fadeElement from 'src/utils/fade-element'
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
    project: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    handlePageTransitionEnd: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { hideScrollIndicator: false }
    this.projectsGridInView = false
  }

  componentWillAppear (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.content, timeline, {})
  }

  componentWillEnter (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.content, timeline, {})
  }

  componentWillLeave (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.content, timeline, { fadeOut: true })
    // Scroll back to the top of the page when leaving. This fixes a problem when
    // switching project using the grid at the bottom of the page.
    timeline.add(() => this.root.base.scrollIntoView(true))
  }

  componentWillUnmount () {
    this.props.handlePageTransitionEnd(true)
  }

  handleProjectsGridInView () {
    if (!this.projectsGridInView) {
      this.projectsGrid.fadeInLinks()
      this.projectsGridInView = true
    }
  }

  handleScrollIndicator ({ currentPosition }) {
    this.setState({ hideScrollIndicator: currentPosition === 'inside' })
  }

  render () {
    const { hideScrollIndicator } = this.state
    const { route, project, projectsData } = this.props
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle(project.title)

    return (
      <StretchedContainer ref={(component) => { this.root = component }}>
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
          transparent={true}
          text="About me."
          href={prefixLink('/about/')}
          pull="left"
        />

        <div ref={(component) => { this.content = component }}>
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
