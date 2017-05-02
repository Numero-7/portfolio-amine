import React, { PropTypes } from 'react'
import styles from './slider-breadcrumb.module.scss'

const getLabel = (currentIndex, index, title, order) => {
  let label = title

  if (currentIndex !== index) {
    label = (order < 10 ? `0${order}` : order)
  }

  return label
}

const SliderBreadCrumb = ({ projectsData, handleProjectSwitch, currentIndex }) => (
  <div className={styles.root}>
    <ul className={styles.list}>
      {projectsData.map((project, index) => (
        <li
          key={project.shortTitle}
          className={styles.item}
        >
          <div>
            <button
              className={`${styles.number} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => handleProjectSwitch(index)}
            >
              {getLabel(currentIndex, index, project.title, project.order)}
            </button>

            <div
              className={`${styles.projectThumbnail} ${currentIndex === index ? styles.activeThumbnail : ''}`}
              style={{ backgroundImage: `url(${project.cover})` }}
            />
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
