import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import SwagButton from '../SwagButton'
import styles from './slider-cover.module.scss'

const SliderCover = ({ project }) => {
  const { shortTitle, type, title, path } = project

  return (
    <div>
      <div className={styles.rectangle}>
        <h1 className={styles.title}>{shortTitle}</h1>

        <div className={styles.projectInfo}>
          <span className={styles.projectType}>{type}</span>
          <span className={styles.projectName}>{title}</span>
        </div>

        <svg className={styles.svg}>
          {['grey', 'white'].map(lineColor => (
            <polyline
              key={lineColor}
              className={styles[lineColor]}
              points="1,208 1,318 721,318 721,1 1,1 1,110"
            />
          ))}
        </svg>
      </div>

      <div className={styles.buttonWrapper}>
        <SwagButton
          href={prefixLink(path)}
          text="View project"
        />
      </div>
    </div>
  )
}

SliderCover.propTypes = {
  project: PropTypes.object.isRequired
}

export default SliderCover
