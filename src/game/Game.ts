import { logOnce } from '../engine/utils/Misc'
import { Canvas, Coordinates, Image, ThingTraits, Forces, Momentum, Thing, GameState } from '../types/GameTypes'
import { getThingById, getThingImage } from '../engine/utils/ThingHelper'

const Game = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, images: Image[], state: GameState) => {
  const player = getThingById('player')

  const applyForces = (things: Thing[]) => {
    things
      .filter((thing) => thing.traits.moves)
      .forEach((thing: Thing): void => {
        logOnce(thing)
        thing.position.x += thing.momentum.forces.x
        thing.position.y += thing.momentum.forces.y
      })
  }

  const updateState = (state: GameState): void => {
    applyForces(state.things)
  }

  const drawPlayer = () => {
    const img = getThingImage('player')
    context.drawImage(img, player.position.x, player.position.y, player.width, player.height)
  }

  const draw = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer()
  }

  const tick = (): void => {
    updateState(state)
    draw(context)
    requestAnimationFrame(tick)
  }

  const startGame = () => {
    console.log('Starting Game module with state:', state)
    console.log('Starting Game module with images:', images)
    tick()
  }

  startGame()
}

export default Game
