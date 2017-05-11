import { Sprite, Texture, BLEND_MODES } from 'pixi.js'
import getRandomBetween from 'src/utils/get-random-between'

class Particle extends Sprite {
  constructor (count) {
    super()
    this.count = count
    this.create()
  }

  create () {
    let offsetX = 175 + (40 * this.count)
    let newCount

    if (this.count > 21) {
      newCount = this.count - 21
      offsetX = 175 + (40 * newCount)
    }

    const y = getRandomBetween(100, 200)
    const smokeNumber = Math.floor(getRandomBetween(1, 3))
    this.x = offsetX
    this.y = y
    this.tint = 0x616161
    this.alpha = getRandomBetween(0.15, 0.2)
    this.blendMode = BLEND_MODES.NORMAL
    this.texture = Texture.fromImage(`http://martingoutry.com/smoke-${smokeNumber}.png`)
    this.rotationDirection = Math.round(Math.random())

    if (smokeNumber === 1) {
      this.pivot.x = 82.5
      this.pivot.y = 77
    } else {
      this.pivot.x = 100
      this.pivot.y = 84
    }
  }

  update () {
    if (this.rotationDirection === 0) {
      const randomRotate = Math.round(Math.random())
      if (randomRotate === 0) {
        this.rotation += 0.002
      } else {
        this.rotation += 0.003
      }
    } else {
      const randomRotate = Math.round(Math.random())
      if (randomRotate === 0) {
        this.rotation -= 0.002
      } else {
        this.rotation -= 0.003
      }
    }
  }
}

export default Particle
