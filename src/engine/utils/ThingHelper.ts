import { logOnce, randomIntFromInterval } from './Misc'
import { Canvas, Coordinates, GameState, Image, Thing } from '../../types/GameTypes'
import { getThingsThatMove } from './MovementHelper'

let things: Thing[] = []
let images: Image[] = []
let previousHitCheckPairHit: [Thing, Thing] | undefined

export const getThingById = (things: Thing[], id: string): Thing => {
  return things.find((t: Thing) => t.id === id)
}

export const getThingsById = (things: Thing[], id: string): Thing[] | [] => {
  return things.filter((t: Thing) => t.id === id)
}

export const getThingImage = (id: string): HTMLImageElement | CanvasImageSource | null => {
  return images.find((i: Image) => i.id === id)?.element || null
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
      removeThing(state, thing)
    }
  })
}

export const doHitChecks = (things: Thing[], callbackFunction: Function) => {
  const thingsOfInterest = things.filter((t) => t.traits.doHitChecks)
  thingsOfInterest.forEach((thingA: Thing, index: number): void => {
    thingsOfInterest.forEach((thingB: Thing, index: number): void => {
      if (
        thingA.position.x < thingB.position.x + thingB.width &&
        thingA.position.x + thingA.width > thingB.position.x &&
        thingA.position.y < thingB.position.y + thingB.height &&
        thingA.position.y + thingA.height > thingB.position.y &&
        previousHitCheckPairHit !== [thingB, thingA]
      ) {
        callbackFunction([thingA, thingB])
        previousHitCheckPairHit = [thingA, thingB]
      }
    })
  })
}

export const centerThing = (thing: Thing, canvas: HTMLCanvasElement) => {
  thing.position.x = canvas.width / 2 - thing.width / 2
  thing.position.y = canvas.height / 2 - thing.height / 2
}

export const isInTuple = (thingPair: [Thing, Thing], thingId: string) => {
  return !!thingPair.find((t) => t.id === thingId)
}

export const createExplosion = (state: GameState, thing: Thing, forceMultiplier = 1): void => {
  const center: Coordinates = {
    x: thing.position.x + thing.width / 2,
    y: thing.position.y + thing.height / 2,
  }
  const numberOfDebrisParticles = randomIntFromInterval(5, 10) * forceMultiplier
  const particles = [...Array(numberOfDebrisParticles)].map((_: null, i: number): Thing => {
    const size = randomIntFromInterval(0.5, 2)
    return {
      id: 'debrisParticle',
      width: size,
      height: size,
      color: '#e45c10',
      position: {
        x: center.x,
        y: center.y,
      },
      traits: {
        moves: true,
        doHitChecks: false,
      },
      momentum: {
        forces: {
          x: randomIntFromInterval(-2, 2) * forceMultiplier,
          y: randomIntFromInterval(1, -3) * forceMultiplier,
        },
        maxForces: {
          x: 0.7,
          y: 0.7,
        },
        acceleration: 1,
        inertia: 0,
      },
      mass: 10,
    }
  })
  state.things.push(...particles)
}

export default ThingHelper()
