import { createExplosion } from './../../engine/utils/EffectsHelper'
import { playSound } from './../../engine/utils/SoundHelper'
import { randomIntFromInterval } from '../../engine/utils/Misc'
import { Enemy, GameState } from '../GameTypes'
import { Thing } from '../../engine/BaseTypes'

export const createEnemy = (): Enemy => {
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
  createExplosion(state, enemy)
}

export const shouldSpawnEnemy = (): boolean => {
  return randomIntFromInterval(0, 100) === 0
}

export const spawnEnemy = (things: Thing[], canvas: HTMLCanvasElement) => {
  const enemy: Thing = createEnemy()
  enemy.position.y = enemy.height * -1
  enemy.position.x = randomIntFromInterval(0, canvas.width - enemy.width)
  enemy.momentum.forces.y = 0.3
  enemy.momentum.maxForces.y = randomIntFromInterval(0.3, 1)
  things.push(enemy)
}
