import { Image } from '../types/GameTypes'

const ImagePreloader = () => {
  const preloadSingleImage = async (imageName: string): Promise<Image> => {
    const img = new Image()
    img.src = `/images/${imageName}.png`
    await img.decode()
    return {
      id: imageName,
      element: img,
    }
  }

  const preloadImages = async (images: string[]): Promise<Image[]> => {
    return new Promise((resolve, reject) => {
      const promises = []
      images.forEach((imageName) => {
        promises.push(preloadSingleImage(imageName))
      })
      Promise.all(promises).then(resolve).catch(reject)
    })
  }

  return { preloadImages }
}

export default ImagePreloader()
