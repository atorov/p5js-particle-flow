class Particle {
    constructor(s, particleMaxSize, color) {
        this.s = s
        this.positionX = s.width / 2
        this.positionY = s.height / 2
        this.color = color
        this.particleMaxSize = particleMaxSize
    }

    draw(chainIndex, particleIndex) {
        const s = this.s

        const size = s.map(s.noise((s.frameCount + particleIndex) / 35, chainIndex) ** 3, 0, 1, 0, this.particleMaxSize)

        s.noStroke()
        s.fill(this.color)
        s.circle(this.positionX, this.positionY, size)
        s.circle(s.width - this.positionX, s.height - this.positionY, size)
    }

    move(chainIndex, particleIndex) {
        const s = this.s
        const deltaX = s.map(s.noise(s.frameCount / 210, chainIndex, particleIndex / 205), 0, 1, -1, 1) + (s.random(-0.3, 0.3) ** 2)
        let newX = (this.positionX + deltaX) % s.width
        if (newX < 0) {
            newX = s.width + newX
        }
        this.positionX = newX

        const deltaY = s.map(s.noise(s.frameCount / 210, chainIndex + 10, particleIndex / 205), 0, 1, -1, 1) + (s.random(-0.3, 0.3) ** 2)
        let newY = (this.positionY + deltaY) % s.height
        if (newY < 0) {
            newY = s.height + newY
        }
        this.positionY = newY
    }
}

window.Particle = Particle
