import { Image } from '../BaseTypes'

let images: Image[] = []

export const setImages = (_images: Image[]): void => {
  images = _images
}

export const getImages = (): Image[] => {
  return images
}
