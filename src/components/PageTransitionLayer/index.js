import React, { Component } from 'react'
import { TimelineLite } from 'gsap'
import { TRANSITION_LAYER_DURATION } from 'src/values/animations'
import styles from './page-transition-layer.module.scss'

class PageTransitionLayer extends Component {
  /* eslint-disable no-useless-constructor */
  // A constructor is required to call the animate methods from other components, using a ref.
  constructor (props) {
    super(props)
  }
  /* eslint-enable no-useless-constructor */

  animateOut (onComplete, reverse) {
    const timeline = new TimelineLite({ onComplete })
    const initialProperties = { width: 0 }

    if (reverse) {
      initialProperties.right = 0
    }

    timeline.set(this.base, initialProperties)
    timeline.to(this.base, TRANSITION_LAYER_DURATION, { width: '100%' })
    this.resetTimelineProperties(timeline)
  }

  animateIn (onComplete, reverse) {
    const timeline = new TimelineLite({ onComplete })
    const initialProperties = { width: '100%', [reverse ? 'left' : 'right']: 0 }

    timeline.set(this.base, initialProperties)
    timeline.to(this.base, TRANSITION_LAYER_DURATION, { width: 0 })
    this.resetTimelineProperties(timeline)
  }

  animate (direction, onComplete, reverse) {
    if (direction === 'in') {
      this.animateIn(onComplete, reverse)
    } else if (direction === 'out') {
      this.animateOut(onComplete, reverse)
    }
  }

  resetTimelineProperties (timeline) {
    // Always reset timelines properties after they have finished animating so that we don’t have
    // to manually reset styles everytime.
    timeline.set(this.base, { clearProps: 'all' })
  }

  render () {
    return (
      <div className={styles.root} />
    )
  }
}

export default PageTransitionLayer
