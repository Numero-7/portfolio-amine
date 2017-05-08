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

  fadeInLinks (callback = () => {}) {
    const invisible = { autoAlpha: 0 }
    const visible = { autoAlpha: 1 }
    const timeline = new TimelineLite({ onComplete: callback })
    timeline.staggerFromTo(
      this.links,
      1,
      invisible,
      visible,
      0.5
    )
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
