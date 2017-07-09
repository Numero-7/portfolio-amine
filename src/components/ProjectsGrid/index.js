import React, { Component } from 'react'
import { arrayOf, object } from 'prop-types'
import Link from 'gatsby-link'
import TweenLite from 'gsap/TweenLite'
import breakpoints from '@values/breakpoints'
import styles from './projects-grid.module.scss'

class ProjectsGrid extends Component {
  static propTypes = {
    projects: arrayOf(object).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      activeProject: {},
      linksDisplayedCount: 0,
      backgroundImageOpacity: 0
    }
  }

  componentWillMount () {
    // Default activeProject to the first project so that there is always a background-image for the
    // hover animation.
    this.setState({ activeProject: this.props.projects[0] })
  }

  componentWillUnmount () {
    if (this.backgroundImageTween) {
      this.backgroundImageTween.kill()
    }
  }

  animate () {
    const { projects } = this.props

    if (window.innerWidth >= breakpoints.desktop) {
      const interval = setInterval(
        () => {
          this.setState(prevState => ({ linksDisplayedCount: prevState.linksDisplayedCount + 1 }))

          if (this.state.linksDisplayedCount > projects.length) {
            clearInterval(interval)
          }
        },
        500
      )
    } else {
      this.setState({ linksDisplayedCount: projects.length })
    }
  }

  handleEnterLink (index) {
    this.backgroundImageTween = (
      TweenLite.to(
        this,
        2.5,
        { state: { backgroundImageOpacity: 1 } }
      )
    )
    this.setState({ activeProject: this.props.projects[index] })
  }

  handleLeaveLink (focusOut) {
    if (focusOut) {
      this.backgroundImageTween.kill()
    }

    this.backgroundImageTween = (
      TweenLite.to(
        this,
        2.5,
        { state: { backgroundImageOpacity: 0 } }
      )
    )
  }

  render () {
    const { activeProject, linksDisplayedCount, backgroundImageOpacity } = this.state
    const { projects } = this.props

    return (
      <div className={styles.root}>
        <div
          style={{
            backgroundImage: `url(${activeProject.cover})`,
            opacity: backgroundImageOpacity
          }}
          className={styles.background}
        />

        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={styles.item}
            >
              <Link
                className={`${styles.link} ${index < linksDisplayedCount ? styles.visible : ''}`}
                to={project.path}
                onMouseOver={() => this.handleEnterLink(index)}
                onFocus={() => this.handleEnterLink(index)}
                onMouseLeave={() => this.handleLeaveLink()}
                onBlur={() => this.handleLeaveLink(true)}
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
