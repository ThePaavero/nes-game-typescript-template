import { Image, Images } from '../GameTypes'

const ImagePreloader = () => {
  const loadImage = (imageName: string) => {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement('img')
      imgElement.src = `${__dirname}/../images/${imageName}.png`
      imgElement.onload = () => {
        resolve({
          id: imageName,
          element: imgElement,
        })
      }
    })
  }

  const preload = async (imageNames: string[]) => {
    return await imageNames.map(loadImage)
  }

  return { preload }
}

export default ImagePreloader()
