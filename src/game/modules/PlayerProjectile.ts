import { playSound } from '../../engine/utils/SoundHelper'
import { getThingById } from './../../engine/utils/ThingHelper'
import { GameState, Thing, PlayerType, Projectile } from './../../types/GameTypes'

export const createPlayerProjectile = (things: Thing[]): Projectile => {
  const player = getThingById(things, 'player') as PlayerType
  return {
    player,
    id: 'playerProjectile',
    width: 1,
    height: 3,
    position: {
      x: player.position.x + player.width / 2,
      y: player.position.y - 3,
    },
    traits: {
      moves: true,
      doHitChecks: true,
    },
    momentum: {
      forces: {
        x: 0,
        y: -3.5,
      },
      maxForces: {
        x: 1,
        y: -1,
      },
      acceleration: 10,
      inertia: 0,
    },
    mass: 50,
  }
}

export const fire = (state: GameState, player: PlayerType) => {
  if (!player || !player.canFire) {
    return
  }
  playSound('pew')
  state.things.push(createPlayerProjectile(state.things))
  player.canFire = false
  setTimeout(() => {
    player.canFire = true
  }, 150)
}
