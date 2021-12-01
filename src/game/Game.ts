import { Canvas, Coordinates, Image, Images, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'

const Game = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, images: Image[], state: GameState) => {
  const things = state.things

  const updateState = (state: GameState): void => {
    // ...
  }

  const draw = (context: CanvasRenderingContext2D): void => {}

  const tick = (): void => {
    updateState(state)
    draw(context)
    requestAnimationFrame(tick)
  }

  const startGame = () => {
    console.log('Starting Game module with state:', state)
    tick()
  }

  startGame()
}

export default Game
