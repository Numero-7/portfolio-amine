import React, { PropTypes } from 'react'
import styles from './project-info.module.scss'

const ProjectInfo = ({ title, content, isSmallText }) => (
  <div className={styles.infoWrapper}>
    <span className={styles.title}>{title}</span>
    {typeof content === 'string'
      ? <span className={`${styles.content} ${isSmallText ? styles.smallText : ''}`}>{content}</span>
      : (content.map && content.map(line => (<span className={styles.content}>{line}</span>))
      )
    }
  </div>
)

ProjectInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  isSmallText: PropTypes.bool
}

ProjectInfo.defaultProps = {
  isSmallText: false
}

export default ProjectInfo
