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
    this.init()
  }

  init () {
    this.scene = new Scene()
    this.root.appendChild(this.scene.renderer.view)
    this.emitter = new Emitter(this.scene)

    this.addListeners()
  }

  addListeners () {
    TweenLite.ticker.addEventListener('tick', () => this.update())
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
        ref={(component) => { this.root = component }}
        style={{ opacity }}
      />
    )
  }
}

export default Smoke
