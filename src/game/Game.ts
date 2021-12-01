import { Canvas, Coordinates, Image, Images, ThingTraits, Forces, Momentum, Thing, GameState } from '../GameTypes'

const Game = (canvas, context, images: Image[], state) => {
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
