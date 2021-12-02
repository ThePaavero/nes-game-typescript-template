import { Image } from '../types/GameTypes'

const ImagePreloader = () => {
  const loadImage = async (imageName: string) => {
    const img = new Image()
    img.src = `/images/${imageName}.png`
    await img.decode()
    return {
      id: imageName,
      element: img,
    }
  }

  const loadImages = async (images: string[]) => {
    return new Promise((resolve, reject) => {
      const promises = []
      images.forEach((imageName) => {
        promises.push(loadImage(imageName))
      })
      Promise.all(promises).then(resolve)
    })
  }

  const preload = async (images: string[]) => {
    return await loadImages(images)
  }

  return { preload }
}

export default ImagePreloader()
