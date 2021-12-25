import { playSound } from '../../engine/utils/Misc'
import { GameState, Thing } from './../../types/GameTypes'

const Enemy = (): Thing => {
  return {
    id: 'enemy',
    width: 24,
    height: 21,
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
        x: 0.7,
        y: 0.7,
      },
      acceleration: 0,
      inertia: 0.005,
    },
    mass: 50,
  }
}

export const enemyExplode = (state: GameState, enemy: Thing) => {
  playSound('explosion')
  // TODO: Animations, etc.
}

export default Enemy
