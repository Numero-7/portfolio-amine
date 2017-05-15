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
    <div className={styles.content}>
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
        <ProjectInfo title="type" content={project.type} isSmallText={true} />
        <ProjectInfo title="role" content={project.role} isSmallText={true} />
        <ProjectInfo title="date" content={project.date} isSmallText={true} />
      </div>

      {project.url && (
        <div className={styles.buttonWrapper}>
          <SwagButton
            text="View website"
            href={project.url}
            external={true}
          />
        </div>
      )}
    </div>
  </section>
)

ProjectIntro.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectIntro
