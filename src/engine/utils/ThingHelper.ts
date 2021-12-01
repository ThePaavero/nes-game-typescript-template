import { Image, Thing } from '../../types/GameTypes'

let things = []
let images = []

export const getThingById = (id: string): Thing | Error => {
  return things.find((t: Thing) => t.id === id) || new Error(`No thing with ID "${id}"`)
}

export const getThingImage = (id: string): Image | Error => {
  return images.find((i: Image) => i.id === id) || new Error(`No image with ID "${id}"`)
}

const ThingHelper = () => {
  const setThings = (data: Thing[]) => {
    things = data
  }

  const setImages = (data: Image[]) => {
    images = data
  }

  return {
    setThings,
    setImages,
  }
}

export default ThingHelper()
