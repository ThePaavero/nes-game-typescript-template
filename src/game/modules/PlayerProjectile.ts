import { logOnce } from './../../engine/utils/Misc'
import { getThingById } from './../../engine/utils/ThingHelper'
import { Thing, GameState, PlayerType, Projectile } from './../../types/GameTypes'

const PlayerProjectile = (): Projectile => {
  const player = getThingById('player') as PlayerType
  return {
    player,
    id: 'playerProjectile',
    width: 1,
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
        y: -1,
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

export const fire = (state: GameState, player: PlayerType) => {
  if (!player || !player.canFire) {
    return
  }
  state.things.push(PlayerProjectile())
  player.canFire = false
  setTimeout(() => {
    player.canFire = true
  }, 150)
}

export default PlayerProjectile
