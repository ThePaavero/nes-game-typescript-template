import { Canvas, Coordinates, Image, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'
import { getThingById, getThingImage } from '../engine/utils/ThingHelper'

const Game = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, images: Image[], state: GameState) => {
  const player = getThingById('player')

  const updateState = (state: GameState): void => {
    // ...
  }

  const draw = (context: CanvasRenderingContext2D): void => {
    const image = getThingImage('player')
  }

  const tick = (): void => {
    updateState(state)
    draw(context)
    // requestAnimationFrame(tick)
  }

  const startGame = () => {
    console.log('Starting Game module with state:', state)
    tick()
  }

  startGame()
}

export default Game
