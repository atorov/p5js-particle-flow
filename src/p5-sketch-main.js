const p5Main = new p5((sketch) => {
    const s = sketch

    const CHAINS_NUMBER = 3

    const PARTICLE_MAX_SIZE = 75
    const PARTICLES_NUMBER = 1000

    const RELOAD_AFTER = -1 // 30000

    const SAVE_CANVAS_PROBABILITY = -1 // 0.001

    let chains

    s.setup = () => {
        s.createCanvas(800, 600)
        s.frameRate(30)

        chains = Array(CHAINS_NUMBER).fill().map((...[, chainIndex]) => {
            console.log('::: chain #:', chainIndex)

            const chainFactor = chainIndex / (CHAINS_NUMBER - 1)
            console.log('::: chainFactor:', chainFactor)

            const color = 64 * (1 - chainFactor)
            console.log('::: color:', color)

            const chainLength = Math.ceil(PARTICLES_NUMBER * s.map(chainFactor ** 4, 0, 1, 0.25, 1))
            console.log('::: chainLength:', chainLength)

            console.log('.....................')
            return Array(chainLength).fill().map(() => new window.Particle(s, PARTICLE_MAX_SIZE, color))
        })


        if (RELOAD_AFTER > 0) {
            setTimeout(() => {
                s.noLoop()
                window.location.reload()
            }, RELOAD_AFTER)
        }
    }

    s.draw = async () => {
        s.background(255)

        s.stroke(0, 63)
        s.strokeWeight(1)
        s.line(0, 0, 10, 0)
        s.line(0, 0, 0, 10)
        s.line(s.width - 10, 0, s.width, 0)
        s.line(s.width, 0, s.width, 10)
        s.line(0, s.height, 10, s.height)
        s.line(0, s.height, 0, s.height - 10)
        s.line(s.width - 10, s.height, s.width, s.height)
        s.line(s.width, s.height, s.width, s.height - 10)

        if (s.frameCount < 512) {
            s.noStroke()
            s.fill(0, 255 - s.frameCount / 2)
            s.circle(s.width / 2, s.height / 2, ((s.width + s.height) / 8) * ((1 - s.frameCount / 2048) ** 4))
        }

        chains.forEach((chain, chainIndex) => {
            chain.forEach((particle, particleIndex) => {
                particle.move(chainIndex, particleIndex)
                particle.draw(chainIndex, particleIndex)
            })
        })

        if (Math.random() <= SAVE_CANVAS_PROBABILITY) {
            s.saveCanvas(`${Date.now()}`)
        }

        // s.noLoop()
    }
}, 'p5-main')

window.p5Main = p5Main;
