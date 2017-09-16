import React from 'react'
import { arrayOf, object } from 'prop-types'
import SwagButton from '@components/SwagButton'
import styles from './projects-list.module.scss'

const ProjectsList = ({ projectsData }) => (
  <ul className={styles.root}>
    {projectsData.map(project => (
      <li
        style={{ backgroundImage: `url(${project.intro})` }}
        className={styles.item}
      >
        <div className={styles.content}>
          <span className={styles.type}>{project.type}</span>
          <span className={styles.title}>{project.title}</span>
        </div>

        <div className={styles.buttonWrapper}>
          <SwagButton
            href={project.path}
            text="View project"
          />
        </div>
      </li>
    ))}
  </ul>
)

ProjectsList.propTypes = {
  projectsData: arrayOf(object).isRequired
}

export default ProjectsList
