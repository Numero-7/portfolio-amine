import React, { Component } from 'react'
import { arrayOf, object, func, number } from 'prop-types'
import styles from './slider-breadcrumb.module.scss'

class SliderBreadCrumb extends Component {
  static propTypes = {
    projectsData: arrayOf(object).isRequired,
    handleProjectSwitch: func.isRequired,
    currentIndex: number.isRequired
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
                  className={this.getClassName(index, 'thumbnail', 'visible')}
                  style={{ backgroundImage: `url(${project.cover})` }}
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
