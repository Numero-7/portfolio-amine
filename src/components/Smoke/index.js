import React, { Component } from 'react'
import { TweenLite } from 'gsap'
// import * as PIXI from 'pixi.js'
// import Particle from './Particle'
import Scene from './Scene'
import Emitter from './Emitter'
import styles from './smoke.module.scss'

class Smoke extends Component {
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
    return (
      <div
        className={styles.root}
        ref={(component) => { this.root = component }}
      />
    )
  }
}

export default Smoke
