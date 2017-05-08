import React, { Component } from 'react'
import styles from './page-transition-layer.module.scss'

class PageTransitionLayer extends Component {
  // Required to call animateLayer method from parent component.
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props)
  }
  /* eslint-enable no-useless-constructor */

  animateLayer (timeline, afterFillCallback) {
    timeline.to(this.base, 1, { width: '100%' })
    timeline.to(this.base, 0, { right: '0', left: 'initial' })
    timeline.add(afterFillCallback)
    timeline.to(this.base, 1, { width: '0%' })
    timeline.to(this.base, 0, { left: '0', right: 'initial' })
  }

  render () {
    return (
      <div className={styles.root} />
    )
  }
}

export default PageTransitionLayer
