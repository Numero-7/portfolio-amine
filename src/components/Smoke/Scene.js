import { WebGLRenderer, Container } from 'pixi.js'

class Scene {
  constructor () {
    this.width = 800
    this.height = 150
    this.renderer = new WebGLRenderer(
      this.width,
      this.height,
      { transparent: true, antialias: true }
    )
    this.stage = new Container()
  }

  addChild (child) {
    this.stage.addChild(child)
  }

  render () {
    this.renderer.render(this.stage)
  }
}

export default Scene
