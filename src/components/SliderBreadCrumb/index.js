import React, { PropTypes } from 'react'
import styles from './slider-breadcrumb.module.scss'

const SliderBreadCrumb = ({ projectsData, handleProjectSwitch, currentIndex }) => (
  <div className={styles.root}>

    <ul className={styles.list}>
      {projectsData.map((project, index) => (
        <li className={styles.item}>
          <div>
            <button
              className={`${styles.number} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => handleProjectSwitch(index)}
            >
              {currentIndex === index
                ? project.title
                : `0${project.order}`
              }
            </button>
          </div>
        </li>
      ))}
    </ul>

  </div>
)

SliderBreadCrumb.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleProjectSwitch: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired
}

export default SliderBreadCrumb
