import { Image } from './types/BaseTypes'

export default async (images: string[]): Promise<Image[]> => {
  return Promise.all(
    images.map(async (imageName: string): Promise<Image> => {
      const img = document.createElement('img')
      img.src = `/images/${imageName}.png`
      await img.decode()
      return {
        id: imageName,
        element: img,
      }
    })
  )
}
