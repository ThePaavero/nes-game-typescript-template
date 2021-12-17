import { Thing } from '../../types/GameTypes'

const PlayerProjectile = (): Thing => {
  return {
    id: 'playerProjectile',
    width: 1,
    height: 3,
    position: {
      x: 0,
      y: 0,
    },
    traits: {
      moves: true,
      doHitChecks: true,
    },
    momentum: {
      forces: {
        x: 0,
        y: 0,
      },
      maxForces: {
        x: 1,
        y: 1,
      },
      acceleration: 1,
      inertia: 0,
    },
    mass: 50,
  }
}

export default PlayerProjectile
