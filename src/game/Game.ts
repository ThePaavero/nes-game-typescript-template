import { updateForces, applyForces, applyInertia, getThingsThatMove } from '../engine/utils/MovementHelper'
import { Canvas, Coordinates, Image, Traits, Forces, Momentum, Thing, GameState, PlayerType } from '../types/GameTypes'
import {
  doHitChecks,
  getThingById,
  getThingImage,
  keepThingWithinScreen,
  removeThing,
} from '../engine/utils/ThingHelper'
import Player from './modules/Player'
import Enemy from './modules/Enemy'
import PlayerProjectile, { fire } from './modules/PlayerProjectile'
import { randomIntFromInterval, logOnce, buttonIsPressed } from '../engine/utils/Misc'
import { killOffScreenThings } from './../engine/utils/ThingHelper'
import { drawThings, getImage } from './../engine/utils/RenderingHelper'

const loopingBackgroundHeight = 591

const Game = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  images: Image[],
  state: GameState
): void => {
  const player: PlayerType = Player()

  const appendGameState = (state: GameState) => {
    player.canFire = true
    player.firing = false

    state.projectiles = []

    state.loopingBackgroundPosition = (loopingBackgroundHeight / 2) * -1

    return state
  }

  state = appendGameState(state)

  state.things.push(player)

  const updateState = (state: GameState): void => {
    updateForces(state.things, state.keysDown)
    applyForces(state.things)
    applyInertia(state.things)
    keepThingWithinScreen(player, canvas)
    killOffScreenThings(canvas, state)
    doHitChecks(state.things, onThingsHit)
    scrollBackground(state)

    if (shouldSpawnEnemy()) {
      spawnEnemy(state.things)
    }

    logOnce(player)
    applyPlayerActions(state, player)
  }

  const scrollBackground = (state: GameState) => {
    state.loopingBackgroundPosition += 1 // TODO
    if (state.loopingBackgroundPosition >= loopingBackgroundHeight - loopingBackgroundHeight) {
      state.loopingBackgroundPosition = (loopingBackgroundHeight / 2) * -1
    }
  }

  const applyPlayerActions = (state: GameState, player: PlayerType) => {
    if (buttonIsPressed('b', state.keysDown)) {
      fire(state, player)
    }
  }

  const isInTuple = (thingPair: [Thing, Thing], thingId: string) => {
    return !!thingPair.find((t) => t.id === thingId)
  }

  const onThingsHit = (thingPair: [Thing, Thing]) => {
    if (isInTuple(thingPair, 'player')) {
      if (!isInTuple(thingPair, 'playerProjectile')) {
        // Player hit something other than his own projectile.
      }
      if (isInTuple(thingPair, 'playerProjectile')) {
        // Lol, player ran into his own projectile.
        console.log(':D')
      }
      if (isInTuple(thingPair, 'enemy')) {
        // Collision with enemy.
        console.log('HIT ENEMY')
      }
    }
  }

  const shouldSpawnEnemy = (): boolean => {
    return randomIntFromInterval(0, 100) === 0
  }

  const drawBackground = (context: CanvasRenderingContext2D, state: GameState): void => {
    context.drawImage(getImage(images, 'scrollingBackground').element, 0, state.loopingBackgroundPosition)
  }

  const updateScreen = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(context, state)
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
