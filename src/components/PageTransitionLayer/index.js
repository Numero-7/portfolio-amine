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

  animate (onComplete, reverse) {
    const timeline = new TimelineLite({ onComplete })
    const initialProperties = { width: '0' }
    if (reverse) {
      initialProperties.right = 0
    }

    const endProperties = reverse ? { right: 'initial' } : { right: 0 }
    timeline.set(this.base, initialProperties)
    timeline.to(this.base, TRANSITION_LAYER_DURATION, { width: '115%' })
    timeline.set(this.base, endProperties)
    timeline.to(this.base, TRANSITION_LAYER_DURATION, { width: 0 })
    // Reset all props
    timeline.set(this.base, { clearProps: 'all' })
  }

  render () {
    return (
      <div className={styles.root} />
    )
  }
}

export default PageTransitionLayer
