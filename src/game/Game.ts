import { updateForces, applyForces, applyInertia, getThingsThatMove } from '../engine/utils/MovementHelper'
import { Canvas, Coordinates, Image, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'
import { getThingById, getThingImage, keepThingWithinScreen, removeThing } from '../engine/utils/ThingHelper'
import Player from './modules/Player'
import Enemy from './modules/Enemy'
import { randomIntFromInterval, logOnce } from '../engine/utils/Misc'
import { killOffScreenThings } from './../engine/utils/ThingHelper'

const Game = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  images: Image[],
  state: GameState
): void => {
  const player: Thing = Player
  state.things.push(player)

  const updateState = (state: GameState): void => {
    updateForces(state.things, state.keysDown)
    applyForces(state.things)
    applyInertia(state.things)
    keepThingWithinScreen(player, canvas)
    killOffScreenThings(canvas, state)

    if (shouldSpawnEnemy()) {
      spawnEnemy(state.things)
    }
  }

  const shouldSpawnEnemy = (): boolean => {
    return randomIntFromInterval(0, 100) === 0
  }

  const drawThings = (context: CanvasRenderingContext2D, things: Thing[]): void => {
    things.forEach((thing: Thing) => {
      const img: CanvasImageSource | null = getThingImage(thing.id)
      if (!img) {
        return
      }
      context.drawImage(img, thing.position.x, thing.position.y, thing.width, thing.height)
    })
  }

  const updateScreen = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawThings(context, state.things)
  }

  const tick = (): void => {
    updateState(state)
    updateScreen(context)

    requestAnimationFrame(tick)
  }

  const applyInitialPlayerPosition = () => {
    player.position.x = canvas.width / 2 - player.width / 2
    player.position.y = canvas.height / 2 - player.height / 2
  }

  const spawnEnemy = (things: Thing[]) => {
    const enemy: Thing = Enemy()
    enemy.position.y = enemy.height * -1
    enemy.position.x = randomIntFromInterval(0, canvas.width - enemy.width)
    enemy.momentum.forces.y = 0.3
    enemy.momentum.maxForces.y = randomIntFromInterval(0.3, 1)
    things.push(enemy)
  }

  const startGame = (): void => {
    console.log('Starting Game module with state:', state)
    console.log('Starting Game module with images:', images)
    applyInitialPlayerPosition()
    tick()
  }

  startGame()
}

export default Game
