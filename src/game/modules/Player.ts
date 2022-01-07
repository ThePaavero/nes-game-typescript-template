import { fire } from './PlayerProjectile'
import { buttonIsPressed } from '../../engine/utils/ControlsHelper'
import { GameState, PlayerType } from './../../types/GameTypes'

export const createPlayer = (): PlayerType => {
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
      acceleration: 0.15,
      inertia: 0.08,
    },
    mass: 50,
  }
}

export const applyPlayerActions = (state: GameState, player: PlayerType) => {
  if (buttonIsPressed('b', state.keysDown)) {
    fire(state, player)
  }
}
