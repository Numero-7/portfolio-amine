import { Sprite, Texture, BLEND_MODES } from 'pixi.js'
import getRandomBetween from 'src/utils/get-random-between'

class Particle extends Sprite {
  constructor () {
    super()
    const x = getRandomBetween(-100, 900)
    const y = getRandomBetween(0, 200)
    this.x = x
    this.y = y
    this.pivot.x = 92.5
    this.pivot.y = 124.5
    this.tint = 0x141414
    this.blendMode = BLEND_MODES.ADD
    this.texture = Texture.fromImage('http://martingoutry.com/smoke.png')
    this.rotationDirection = Math.round(Math.random())
  }

  update () {
    if (this.rotationDirection === 0) {
      this.rotation += 0.004
    } else {
      this.rotation -= 0.004
    }
  }
}

export default Particle
