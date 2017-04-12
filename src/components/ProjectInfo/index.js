import React, { PropTypes } from 'react'
import styles from './project-info.module.scss'

const ProjectInfo = ({ title, content }) => (
  <div className={styles.infoWrapper}>
    <span className={styles.title}>{title}</span>
    {typeof content === 'string'
      ? <span className={styles.content}>{content}</span>
      : (content.map && content.map(line => ( <span className={styles.content}>{line}</span>))
      )
    }
  </div>
)

ProjectInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
}

export default ProjectInfo
