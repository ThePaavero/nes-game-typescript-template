import { Canvas, GameState, Image, Thing } from '../../types/GameTypes'
import { getThingsThatMove } from './MovementHelper'

let things: Thing[] = []
let images: Image[] = []

export const getThingById = (id: string): Thing => {
  return things.find((t: Thing) => t.id === id)
}

export const getThingImage = (id: string): HTMLImageElement | CanvasImageSource | null => {
  return images.find((i: Image) => i.id === id).element || null
}

export const keepThingWithinScreen = (thing: Thing, canvas: HTMLCanvasElement) => {
  const axes = ['x', 'y']
  axes.forEach((axis: string) => {
    const dimension = axis === 'x' ? 'width' : 'height'
    if (thing.position[axis] <= 0) {
      thing.position[axis] = 0
      thing.momentum.forces[axis] = 0
    } else if (thing.position[axis] >= canvas[dimension] - thing[dimension]) {
      thing.position[axis] = canvas[dimension] - thing[dimension]
      thing.momentum.forces[axis] = 0
    }
  })
}

export const removeThing = (state: GameState, thing: Thing): void => {
  state.things = state.things.filter((t) => t !== thing)
}

const ThingHelper = () => {
  const setThings = (data: Thing[]): void => {
    things = data
  }

  const setImages = (data: Image[]): void => {
    images = data
  }

  return {
    setThings,
    setImages,
  }
}

export const killOffScreenThings = (canvas: Canvas, state: GameState): void => {
  const things = state.things
  const floor = canvas.height

  getThingsThatMove(things).forEach((thing: Thing) => {
    const ceiling = thing.height * -1
    const walls = {
      left: 0,
      right: canvas.width + thing.width,
    }
    if (
      thing.position.y >= floor ||
      thing.position.y <= ceiling ||
      thing.position.x < walls.left ||
      thing.position.x > walls.right
    ) {
      console.log('Removed thing', thing)
      removeThing(state, thing)
    }
  })
}

export const doHitChecks = (things: Thing[], callbackFunction: Function) => {
  const thingsOfInterest = things.filter((t) => t.traits.doHitChecks)
  thingsOfInterest.forEach((thingA: Thing, index: number): void => {
    thingsOfInterest.forEach((thingB: Thing, index: number): void => {
      if (!thingB || thingA === thingB) {
        return
      }
      if (
        thingA.position.x < thingB.position.x + thingB.width &&
        thingA.position.x + thingA.width > thingB.position.x &&
        thingA.position.y < thingB.position.y + thingB.height &&
        thingA.position.y + thingA.height > thingB.position.y
      ) {
        callbackFunction([thingA, thingB])
      }
    })
  })
}

export default ThingHelper()
