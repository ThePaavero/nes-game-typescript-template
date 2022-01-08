import { Thing } from '../BaseTypes'
import { randomIntFromInterval } from './Misc'
import { GameState } from '../../game/GameTypes'
import { Coordinates } from '../BaseTypes'

export const createExplosion = (state: GameState, thing: Thing, forceMultiplier = 1): void => {
  const center: Coordinates = {
    x: thing.position.x + thing.width / 2,
    y: thing.position.y + thing.height / 2,
  }

  const numberOfDebrisParticles = randomIntFromInterval(5, 10) * forceMultiplier
  const particles = [...Array(numberOfDebrisParticles)].map((_: null, i: number): Thing => {
    const size = randomIntFromInterval(0.5, 2) * forceMultiplier
    return {
      id: 'debrisParticle',
      width: size,
      height: size,
      color: '#e45c10',
      position: {
        x: center.x,
        y: center.y,
      },
      traits: {
        moves: true,
        doHitChecks: false,
      },
      momentum: {
        forces: {
          x: randomIntFromInterval(-2, 2) * forceMultiplier,
          y: randomIntFromInterval(1, -3) * forceMultiplier,
        },
        maxForces: {
          x: 0.7,
          y: 0.7,
        },
        acceleration: 1,
        inertia: 0,
      },
      mass: 10,
    }
  })
  state.things.push(...particles)
}
