import { getThingById } from './../../engine/utils/ThingHelper'
import { Thing, GameState, PlayerType } from './../../types/GameTypes'

const player = getThingById('player') as PlayerType

const PlayerProjectile = (): Thing => {
  return {
    id: 'playerProjectile',
    width: 2,
    height: 3,
    position: {
      x: player.position.x + player.width / 2,
      y: player.position.y,
    },
    traits: {
      moves: true,
      doHitChecks: true,
    },
    momentum: {
      forces: {
        x: 0,
        y: -0.5,
      },
      maxForces: {
        x: 1,
        y: -1,
      },
      acceleration: 1,
      inertia: 0,
    },
    mass: 50,
  }
}

export const fire = (state: GameState) => {
  if (!player.canFire) {
    return
  }
  state.things.push(PlayerProjectile())
  player.canFire = false
  setTimeout(() => {
    player.canFire = true
  }, 100)
}

export default PlayerProjectile
