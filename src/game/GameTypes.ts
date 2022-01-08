import { Thing } from '../engine/types/BaseTypes'

export interface PlayerType extends Thing {
  canFire?: boolean
  firing?: boolean
  points?: number
}

export interface Projectile extends Thing {
  player?: PlayerType
}

export interface GameState {
  things: Thing[]
  paused: boolean
  keysDown: string[]
  projectiles: Projectile[]
  loopingBackgroundPosition: number
}
