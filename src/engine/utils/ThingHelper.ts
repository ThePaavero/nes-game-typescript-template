import { Image, Thing } from '../../types/GameTypes'

let things: Thing[] = []
let images: Image[] = []

export const getThingById = (id: string): Thing => {
  return things.find((t: Thing) => t.id === id)
}

export const getThingImage = (id: string): CanvasImageSource => {
  return images.find((i: Image) => i.id === id)?.element
}

export const keepThingWithinScreen = (thing: Thing, canvas: HTMLCanvasElement) => {
  if (thing.position.x <= 0) {
    thing.position.x = 0
    thing.momentum.forces.x = 0
  } else if (thing.position.x >= canvas.width - thing.width) {
    thing.position.x = canvas.width - thing.width
    thing.momentum.forces.x = 0
  }
  if (thing.position.y <= 0) {
    thing.position.y = 0
    thing.momentum.forces.y = 0
  } else if (thing.position.y >= canvas.height - thing.height) {
    thing.position.y = canvas.height - thing.height
    thing.momentum.forces.y = 0
  }
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

export default ThingHelper()
