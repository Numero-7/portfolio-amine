import { WebGLRenderer, Container } from 'isomorphic-pixi'

class Scene {
  constructor () {
    this.width = 1200
    this.height = 300
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
