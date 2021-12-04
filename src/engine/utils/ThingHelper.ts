import { Image, Thing } from '../../types/GameTypes'

let things: Thing[] = []
let images: Image[] = []

export const getThingById = (id: string): Thing => {
  return things.find((t: Thing) => t.id === id)
}

export const getThingImage = (id: string): CanvasImageSource => {
  return images.find((i: Image) => i.id === id)?.element
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
