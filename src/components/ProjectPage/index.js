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

  handleScrollIndicator (e) {
    this.setState({ hideScrollIndicator: e.currentPosition === 'inside' })
  }

  render () {
    const { hideScrollIndicator } = this.state
    const { project, projectsData } = this.props

    return (
      <StretchedContainer>
        <LinkColumn
          text="About me."
          href={prefixLink('/about/')}
          pull="left"
        />

        <ScrollIndicator hidden={hideScrollIndicator} />

        <ProjectIntro project={project} />
        {project.images.map(link => (
          <ProjectImage
            src={link}
            title={project.title}
          />
        ))}

        <Waypoint
          scrollableAncestor={window}
          onEnter={e => this.handleScrollIndicator(e)}
          onLeave={e => this.handleScrollIndicator(e)}
        >
          <section>
            <ProjectsGrid projects={projectsData.filter(({ order }) => order !== project.order)} />
          </section>
        </Waypoint>

        <LinkColumn
          text="All projects."
          href={prefixLink('/projects/')}
          pull="right"
        />
      </StretchedContainer>
    )
  }
}

export default ProjectPage
