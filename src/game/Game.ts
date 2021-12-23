import { updateForces, applyForces, applyInertia } from '../engine/utils/MovementHelper'
import { Image, Thing, GameState, PlayerType } from '../types/GameTypes'
import { doHitChecks, keepThingWithinScreen, removeThing } from '../engine/utils/ThingHelper'
import Player from './modules/Player'
import Enemy from './modules/Enemy'
import { fire } from './modules/PlayerProjectile'
import { randomIntFromInterval, logOnce, buttonIsPressed } from '../engine/utils/Misc'
import { killOffScreenThings } from './../engine/utils/ThingHelper'
import { drawThings, getImage, write } from './../engine/utils/RenderingHelper'

const loopingBackgroundHeight = 591

const Game = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  images: Image[],
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
    
    applyPlayerActions(state, player)
  }

  const scrollBackground = (state: GameState) => {
    state.loopingBackgroundPosition += 1 // TODO
    if (state.loopingBackgroundPosition >= 0) {
      state.loopingBackgroundPosition = (loopingBackgroundHeight / 2) * -1 // TODO: This isn't right.
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
      // TODO: Create an explosion or something. Debris flying and shit.
      removeThing(state, enemy)
    }
  }

  const shouldSpawnEnemy = (): boolean => {
    return randomIntFromInterval(0, 100) === 0
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
