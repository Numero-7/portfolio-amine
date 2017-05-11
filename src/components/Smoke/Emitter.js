import Particle from './Particle'

class Emitter {
  constructor (scene) {
    this.scene = scene
    this.particles = []
    this.particlesNumber = 42
    this.populate(Particle, this.particlesNumber)
  }

  populate (ClassEl, maxParticles) {
    for (let i = 0; i < maxParticles; i += 1) {
      const p = new ClassEl(i)
      this.particles.push(p)
      this.scene.addChild(p)
    }
  }

  update () {
    for (let i = 0; i < this.particles.length; i += 1) {
      this.particles[i].update()
    }
  }
}

export default Emitter
