import Particle from './Particle'

class Emitter {
  constructor (scene) {
    this.scene = scene
    this.particles = []
    this.particlesCount = 42
    this.populate()
  }

  populate () {
    for (let i = 0; i <= this.particlesCount; i += 1) {
      const particle = new Particle(i, this.particlesCount)
      this.particles.push(particle)
      this.scene.addChild(particle)
    }
  }

  update () {
    this.particles.forEach(particle => particle.update())
  }
}

export default Emitter
