import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import styles from './slider-breadcrumb.module.scss'

class SliderBreadCrumb extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleProjectSwitch: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired
  }

  getLabel (index) {
    const { projectsData, currentIndex } = this.props
    const { title, order } = projectsData[index]
    let label = title

    if (currentIndex !== index) {
      label = (order < 10 ? `0${order}` : order)
    }

    return label
  }

  getClassName (index, className, modifier = 'active') {
    const { currentIndex } = this.props
    return `${styles[className]} ${currentIndex === index ? styles[modifier] : ''}`
  }

  render () {
    const { projectsData, handleProjectSwitch } = this.props

    return (
      <div className={styles.root}>
        <ul className={styles.list}>
          {projectsData.map((project, index) => (
            <li
              key={project.shortTitle}
              className={this.getClassName(index, 'item')}
            >
              <div>
                <button
                  className={this.getClassName(index, 'number')}
                  onClick={() => handleProjectSwitch(index)}
                >
                  {this.getLabel(index)}
                </button>

                <div
                  ref={(component) => { this.thumbnail = component }}
                  className={this.getClassName(index, 'thumbnail', 'visible')}
                  style={{ backgroundImage: `url(${prefixLink(project.cover)})` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SliderBreadCrumb
