import { updateForces, applyForces, applyInertia } from '../engine/utils/MovementHelper'
import { Canvas, Coordinates, Image, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'
import { getThingById, getThingImage, keepThingWithinScreen } from '../engine/utils/ThingHelper'
import Player from './modules/Player'
import { logOnce } from '../engine/utils/Misc'

const Game = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, images: Image[], state: GameState): void => {
  const player: Thing = Player
  state.things.push(player)

  const updateState = (state: GameState): void => {
    updateForces(state.things, state.keysDown)
    applyForces(state.things)
    applyInertia(state.things)
    keepThingWithinScreen(player, canvas)
  }

  const drawPlayer = (context: CanvasRenderingContext2D): void => {
    const img = getThingImage('player')
    context.drawImage(img, player.position.x, player.position.y, player.width, player.height)
  }

  const updateScreen = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer(context)
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

  const startGame = (): void => {
    console.log('Starting Game module with state:', state)
    console.log('Starting Game module with images:', images)
    applyInitialPlayerPosition()
    tick()
  }

  startGame()
}

export default Game
