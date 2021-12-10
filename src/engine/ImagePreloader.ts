import { Image } from '../types/GameTypes'

const ImagePreloader = () => {
  const preloadSingleImage = async (imageName: string): Promise<Image> => {
    const img = document.createElement('img')
    img.src = `/images/${imageName}.png`
    await img.decode()
    return {
      id: imageName,
      element: img,
    }
  }

  const preloadImages = async (images: string[]): Promise<Image[]> => {
    return Promise.all(images.map(preloadSingleImage))
  }

  return { preloadImages }
}

export default ImagePreloader()
