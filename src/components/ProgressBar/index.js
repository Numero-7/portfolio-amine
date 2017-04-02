import React, { PropTypes } from 'react'
import styles from './progress-bar.module.scss'

const BARS_COUNT = 40

const ProgressBar = ({ progress }) => {
  const filledBarsCount = BARS_COUNT * (progress / 100)
  const bars = []

  for (let i = 0; i < BARS_COUNT; i += 1) {
    bars.push(
      <span
        className={`${styles.bar} ${i < filledBarsCount ? styles.active : ''}`}
        key={i}
      />
    )
  }

  return (
    <div>
      <div>
        {bars}
      </div>

      <span className={styles.percentage}>
        {progress}%
      </span>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
}

export default ProgressBar
