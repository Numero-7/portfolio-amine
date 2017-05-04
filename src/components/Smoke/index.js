import React, { Component } from 'react'
import { TweenLite } from 'gsap'
// import * as PIXI from 'pixi.js'
// import Particle from './Particle'
import Scene from './Scene'
import Emitter from './Emitter'
// import styles from './smoke.module.scss'

class Smoke extends Component {
  componentDidMount () {
    this.init()
  }

  init () {
    // this.app = new PIXI.Application(800, 250)
    // this.root.appendChild(this.app.view)

    // const sprites = new PIXI.particles.ParticleContainer(100, {
    //   scale: true,
    //   position: true,
    //   rotation: true,
    //   uvs: true,
    //   alpha: true
    // })

    // this.app.stage.addChild(sprites)

    // const particles = []

    // for (let i = 0; i < 100; i++) {
    //   const p = new Particle()
    //   particles.push(p)
    //   sprites.addChild(p)
    // }

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
      <div ref={(component) => { this.root = component }} />
    )
  }
}

export default Smoke
