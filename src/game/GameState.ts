import { Projectile } from './GameTypes'

export interface CustomGameState {
  gavePoints?: boolean
  projectiles: Projectile[]
  loopingBackgroundPosition: number
}

export const gameState: CustomGameState = {
  projectiles: [],
  loopingBackgroundPosition: 0,
  gavePoints: false,
}
