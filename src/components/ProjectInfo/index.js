import React from 'react'
import { string, oneOfType, arrayOf, bool } from 'prop-types'
import styles from './project-info.module.scss'

const ProjectInfo = ({ title, content, isSmallText }) => (
  <div className={styles.infoWrapper}>
    <span className={styles.title}>{title}</span>
    {typeof content === 'string'
      ? (
        <span
          className={`${styles.content} ${isSmallText ? styles.smallText : ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
      : (content.map && content.map(line => (<span className={styles.content}>{line}</span>))
      )
    }
  </div>
)

ProjectInfo.propTypes = {
  title: string.isRequired,
  content: oneOfType([
    string,
    arrayOf(string)
  ]).isRequired,
  isSmallText: bool
}

ProjectInfo.defaultProps = {
  isSmallText: false
}

export default ProjectInfo
