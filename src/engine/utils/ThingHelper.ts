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
