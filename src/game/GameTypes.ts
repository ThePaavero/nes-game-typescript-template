import { Thing } from '../engine/BaseTypes'

export interface Player extends Thing {
  canFire?: boolean
  firing?: boolean
  points?: number
}

export interface Enemy extends Thing {
  gavePoints?: boolean
}

export interface Projectile extends Thing {
  player?: Player
}

export interface GameState {
  things: Thing[]
  paused: boolean
  keysDown: string[]
  projectiles: Projectile[]
  loopingBackgroundPosition: number
}
