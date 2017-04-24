import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import Waypoint from 'react-waypoint'
import LinkColumn from '../LinkColumn'
import ScrollIndicator from '../ScrollIndicator'
import ProjectIntro from '../ProjectIntro'
import ProjectImage from '../ProjectImage'
import ProjectsGrid from '../ProjectsGrid'
import StretchedContainer from '../StretchedContainer'

class ProjectPage extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    this.state = { hideScrollIndicator: false }
  }

  componentWillAppear (callback) {
    // INITIAL RENDER ANIMATION GOES HERE
    callback(this) // (this = temporarily ignore eslint)
  }

  componentWillEnter (callback) {
    // SUBSEQUENT ENTER ANIMATIONS GO HERE
    // Scroll back to the top of the page when the component appears. This fixes a problem when
    // switching project using the grid at the bottom of the page.
    this.root.base.scrollIntoView(true)
    callback()
  }

  componentWillLeave (callback) {
    // LEAVE ANIMATION GOES HERE
    callback(this) // (this = temporarily ignore eslint)
  }

  handleScrollIndicator ({ currentPosition }) {
    this.setState({ hideScrollIndicator: currentPosition === 'inside' })
  }

  render () {
    const { hideScrollIndicator } = this.state
    const { project, projectsData } = this.props

    return (
      <StretchedContainer ref={(component) => { this.root = component }}>
        <LinkColumn
          text="About me."
          href={prefixLink('/about/')}
          pull="left"
        />

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
          onEnter={e => this.handleScrollIndicator(e)}
          onLeave={e => this.handleScrollIndicator(e)}
        >
          <section>
            <ProjectsGrid projects={projectsData.filter(({ order }) => order !== project.order)} />
          </section>
        </Waypoint>

        <LinkColumn
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
