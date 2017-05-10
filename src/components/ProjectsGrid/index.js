import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite } from 'gsap'
import styles from './projects-grid.module.scss'

class ProjectsGrid extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    // Default activeProject to the first project so that there is always a background-image for the
    // hover animation.
    this.state = { activeProject: props.projects[0] }
    // Make a list of all links so that they can be animated.
    this.links = []
  }

  componentDidMount () {
    this.timeline = this.getTimeline()
  }

  componentWillUnmount () {
    // Always clear the timeline to avoid multiple timelines running at the same time if coming back
    // to the same page.
    this.timeline.set(this.timeline.getChildren(), { clearProps: 'all' })
  }

  getTimeline () {
    const timeline = new TimelineLite({ paused: true })
    timeline.staggerFromTo(
      this.links,
      1,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      0.5
    )
    return timeline
  }

  animate () {
    this.timeline.restart()
  }

  handleActiveLink (index) {
    TweenLite.to(
      this.backgroundImage,
      2.5,
      { autoAlpha: 1 }
    )
    this.setState({ activeProject: this.props.projects[index] })
  }

  handleLeaveLink () {
    TweenLite.to(
      this.backgroundImage,
      2.5,
      { autoAlpha: 0 }
    )
  }

  render () {
    const { activeProject } = this.state
    const { projects } = this.props

    return (
      <div className={styles.root}>
        <div
          ref={(component) => { this.backgroundImage = component }}
          style={{ backgroundImage: `url(${prefixLink(activeProject.cover)})` }}
          className={styles.background}
        />

        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li
              ref={component => this.links.push(component)}
              key={project.title}
              className={styles.item}
            >
              <Link
                className={styles.link}
                to={prefixLink(project.path)}
                onMouseOver={() => this.handleActiveLink(index)}
                onFocus={() => this.handleActiveLink(index)}
                onMouseLeave={() => this.handleLeaveLink()}
                onBlur={() => this.handleLeaveLink()}
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ProjectsGrid
