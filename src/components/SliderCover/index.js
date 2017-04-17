import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import SwagButton from '../SwagButton'
import styles from './slider-cover.module.scss'

const SliderCover = ({ project }) => {
  const { shortTitle, type, title } = project

  return (

    <div>
      <div className={styles.rectangle}>

        <h1 className={styles.title}>{shortTitle}</h1>

        <div className={styles.projectInfo}>
          <span className={styles.projectType}>{type}</span>
          <span className={styles.projectName}>{title}</span>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 724 324"
        >
          <polyline
            className={styles.grey}
            points="0.5,208.5 0.5,318.5 721.5,318.5 721.5,0.5 0.5,0.5 0.5,110.5 "
          />
          <polyline
            className={styles.white}
            points="0.5,208.5 0.5,318.5 721.5,318.5 721.5,0.5 0.5,0.5 0.5,110.5 "
          />
        </svg>

      </div>

      <div className={styles.buttonWrapper}>
        <SwagButton text="View project" href={prefixLink('/project/anna-le-film')} />
      </div>

    </div>

  )
}

SliderCover.propTypes = {
  project: PropTypes.object.isRequired
}

export default SliderCover
