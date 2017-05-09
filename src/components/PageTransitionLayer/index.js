import React, { Component } from 'react'
import styles from './page-transition-layer.module.scss'

class PageTransitionLayer extends Component {
  /* eslint-disable no-useless-constructor */
  // A constructor is required to call the animate methods from other components, using a ref.
  constructor (props) {
    super(props)
  }
  /* eslint-enable no-useless-constructor */

  animateOut (timeline) {
    timeline.set(this.base, { width: '0' })
    timeline.to(this.base, 1, { width: '100%' })
  }

  animateIn (timeline) {
    timeline.set(this.base, { width: '100%', right: '0' })
    timeline.to(this.base, 1, { width: '0' })
  }

  render () {
    return (
      <div className={styles.root} />
    )
  }
}

export default PageTransitionLayer
