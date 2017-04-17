import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './projects-grid.module.scss'

class ProjectsGrid extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    // Default to first activeProject so that there is always a background-image for the hover
    // animation.
    this.state = { activeProject: props.projects[0], showBackground: false }
  }

  handleActive (index) {
    const activeProject = this.props.projects[index]

    this.setState({ activeProject, showBackground: true })
  }

  handleLeave () {
    this.setState({ showBackground: false })
  }

  render () {
    const { activeProject, showBackground } = this.state
    const { projects } = this.props

    return (
      <div className={styles.root}>
        <div
          style={{ backgroundImage: `url(${activeProject.cover})` }}
          className={`${styles.background} ${showBackground ? styles.active : ''}`}
        />

        <ul className={styles.list}>
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={styles.item}
            >
              <Link
                className={styles.link}
                to={prefixLink(project.path)}
                onMouseOver={() => this.handleActive(index)}
                onFocus={() => this.handleActive(index)}
                onMouseLeave={() => this.handleLeave()}
                onBlur={() => this.handleLeave()}
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
