import { doGenericPhysics } from '../engine/utils/MovementHelper'
import { Image, Sound, Thing, GameState, PlayerType } from '../types/GameTypes'
import { centerThing, doHitChecks, isInTuple, removeThing } from '../engine/utils/ThingHelper'
import Player, { applyPlayerActions } from './modules/Player'
import { enemyExplode, shouldSpawnEnemy, spawnEnemy } from './modules/Enemy'
import { killOffScreenThings } from './../engine/utils/ThingHelper'
import { drawThings, getImage, write } from './../engine/utils/RenderingHelper'

const loopingBackgroundHeight = 591

const Game = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  images: Image[],
  sounds: Sound[],
  state: GameState
): void => {
  const player: PlayerType = Player()

  const initializeGameState = (state: GameState) => {
    player.canFire = true
    player.firing = false
    player.points = 0

    state.projectiles = []
    state.loopingBackgroundPosition = (loopingBackgroundHeight / 2) * -1

    return state
  }

  state = initializeGameState(state)

  state.things.push(player)

  const updateState = (state: GameState): void => {
    doGenericPhysics(state, player, canvas, onThingsHit)
    killOffScreenThings(canvas, state)
    scrollBackground(state)

    if (shouldSpawnEnemy()) {
      spawnEnemy(state.things, canvas)
    }

    applyPlayerActions(state, player)
  }

  const scrollBackground = (state: GameState) => {
    state.loopingBackgroundPosition += 1 // TODO
    if (state.loopingBackgroundPosition >= 0) {
      state.loopingBackgroundPosition = (loopingBackgroundHeight / 2) * -1 // TODO: This isn't right.
    }
  }

  const onThingsHit = (thingPair: [Thing, Thing]) => {
    if (isInTuple(thingPair, 'player')) {
      if (!isInTuple(thingPair, 'playerProjectile')) {
        // Player hit something other than his own projectile.
        // TODO: Power-ups, weapon items, etc.
      }
      if (isInTuple(thingPair, 'playerProjectile')) {
        // Lol, player ran into his own projectile.
        console.log(':D')
      }
      if (isInTuple(thingPair, 'enemy')) {
        // Collision with enemy.
        console.log('HIT ENEMY')
      }
    } else if (isInTuple(thingPair, 'playerProjectile') && isInTuple(thingPair, 'enemy')) {
      // Player projectile hit an enemy.
      const enemy = thingPair.find((t) => t.id === 'enemy')
      enemyExplode(state, enemy)
      removeThing(state, enemy)
    }
  }

  const drawBackground = (context: CanvasRenderingContext2D, state: GameState): void => {
    context.drawImage(getImage(images, 'scrollingBackground').element, 0, state.loopingBackgroundPosition)
  }

  const drawStatusBar = (context: CanvasRenderingContext2D, points: number) => {
    write(context, `POINTS: ${points}`, 8, 3, 3)
  }

  const updateScreen = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(context, state)
    drawThings(context, state.things)
    drawStatusBar(context, player.points)
  }

  const tick = (): void => {
    updateState(state)
    updateScreen(context)

    requestAnimationFrame(tick)
  }

  const startGame = (): void => {
    console.log('Starting Game module with state:', state)
    console.log('Starting Game module with images:', images)
    console.log('Starting Game module with sounds:', sounds)
    centerThing(player, canvas)
    tick()
  }

  startGame()
}

export default Game
