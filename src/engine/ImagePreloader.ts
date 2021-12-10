import { Image } from '../types/GameTypes'

const preloadSingleImage = async (imageName: string): Promise<Image> => {
  const img = document.createElement('img')
  img.src = `/images/${imageName}.png`
  await img.decode()
  return {
    id: imageName,
    element: img,
  }
}

export default async (images: string[]): Promise<Image[]> => Promise.all(images.map(preloadSingleImage))
