import { Sprite, Texture, BLEND_MODES } from 'pixi.js'
import getRandomBetween from 'src/utils/get-random-between'

class Particle extends Sprite {
  constructor (count, totalCount) {
    super()
    this.count = count
    this.totalCount = totalCount
    this.create()
  }

  create () {
    const halfTotalCount = (this.totalCount / 2)
    const multiplier = (this.count > halfTotalCount) ? (this.count - halfTotalCount) : this.count
    this.x = 175 + (40 * multiplier)
    this.y = getRandomBetween(100, 200, true)
    this.rotationDirection = Math.round(Math.random())

    this.tint = 0x616161
    this.alpha = getRandomBetween(0.15, 0.2, true)
    this.blendMode = BLEND_MODES.NORMAL

    const smokeNumber = Math.floor(getRandomBetween(1, 3, true))
    this.texture = Texture.fromImage(`/static/images/smoke-${smokeNumber}.png`)

    if (smokeNumber === 1) {
      this.pivot.x = 82.5
      this.pivot.y = 77
    } else {
      this.pivot.x = 100
      this.pivot.y = 84
    }
  }

  update () {
    const randomRotate = Math.round(Math.random())

    if (this.rotationDirection) {
      this.rotation -= randomRotate ? 0.003 : 0.002
    } else {
      this.rotation += randomRotate ? 0.003 : 0.002
    }
  }
}

export default Particle
