import { Canvas, Coordinates, Image, Images, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'

const Game = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, images: Image[], state: GameState) => {
  const things = state.things

  const updateState = (state) => {
    // ...
  }

  const draw = (context) => {}

  const tick = () => {
    updateState(state)
    draw(context)
    requestAnimationFrame(tick)
  }

  const startGame = () => {
    tick()
  }

  startGame()
}

export default Game
