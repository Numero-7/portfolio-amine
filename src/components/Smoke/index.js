import React, { Component, PropTypes } from 'react'
import TweenLite from 'gsap/TweenLite'
import Scene from './Scene'
import Emitter from './Emitter'
import styles from './smoke.module.scss'

class Smoke extends Component {
  static propTypes = {
    opacity: PropTypes.number.isRequired
  }

  getDefaultProps () {
    return {
      opacity: 0
    }
  }

  componentDidMount () {
    this.scene = new Scene()
    this.base.appendChild(this.scene.renderer.view)
    this.emitter = new Emitter(this.scene)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.opacity && !this.tickerStarted) {
      // By default, the opacity is set to 0. If we start having an opacity superior to 0, it means
      // that we should start animating the smoke.
      this.startTicker()
    } else if (!nextProps.opacity) {
      // The opacity will be reset to 0 only before switching project in the slider. If this is the
      // case, we should pause the ticker for performance reasons.
      this.removeTicker()
    }
  }

  componentWillUnmount () {
    this.removeTicker()
  }

  startTicker () {
    this.tickerStarted = true
    this.tickListener = () => this.update()
    TweenLite.ticker.addEventListener('tick', this.tickListener)
  }

  removeTicker () {
    if (this.tickerStarted) {
      this.tickerStarted = false
      TweenLite.ticker.removeEventListener('tick', this.tickListener)
    }
  }

  update () {
    this.emitter.update()
    this.scene.render()
  }

  render () {
    const { opacity } = this.props

    return (
      <div
        className={styles.root}
        style={{ opacity }}
      />
    )
  }
}

export default Smoke
