import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import ProjectInfo from '../ProjectInfo'
import SwagButton from '../SwagButton'
import styles from './project-intro.module.scss'

const ProjectIntro = ({ project }) => (
  <section
    style={{ backgroundImage: `url(${prefixLink(project.intro)})` }}
    className={styles.root}
  >

    <div>

      <span className={styles.number}>
        {project.order < 10
          ? `0${project.order}`
          : project.order
        }
      </span>

      <h1 className={styles.title}>{project.title}</h1>

      <div className={styles.descriptionWrapper}>
        <ProjectInfo title="description" content={project.description} />
      </div>

      <div className={styles.infoWrapper}>
        <ProjectInfo title="type" content={project.type} />
        <ProjectInfo title="role" content={project.role} />
        <ProjectInfo title="date" content={project.date} />
      </div>

      <div className={styles.buttonWrapper}>
        <SwagButton text="view website" />
      </div>

    </div>

  </section>
)

ProjectIntro.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectIntro
