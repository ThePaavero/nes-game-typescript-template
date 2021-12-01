import { Thing } from '../types/GameTypes'

const Player = (): Thing => {
  return {
    id: 'player',
    width: 23,
    height: 26,
    position: {
      x: 0,
      y: 0,
    },
    traits: {
      moves: true,
      doHitChecks: true,
      isControllable: true,
    },
    momentum: {
      forces: {
        x: 0,
        y: 0,
      },
      inertia: 5,
    },
    mass: 50,
  }
}

export default Player()
