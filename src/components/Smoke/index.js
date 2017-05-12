import React, { Component, PropTypes } from 'react'
import { TweenLite } from 'gsap'
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

    this.tickListener = () => this.update()
    TweenLite.ticker.addEventListener('tick', this.tickListener)
  }

  componentWillUnmount () {
    TweenLite.ticker.removeEventListener('tick', this.tickListener)
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
