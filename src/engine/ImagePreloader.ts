// import { Image, Images } from '../types/GameTypes'

const ImagePreloader = () => {
  const promises = []

  const loadImage = (imageName: string) => {
    console.log(`Loading image "${imageName}"`)
    promises.push(
      new Promise((resolve, reject) => {
        const imgElement = document.createElement('img')
        imgElement.src = `http://localhost:8080/images/${imageName}.png`
        imgElement.onload = () => {
          console.log(`Successfully loaded image "${imageName}.png"`)
          resolve({
            id: imageName,
            element: imgElement,
          })
        }
        imgElement.onerror = reject
      })
    )

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(resolve).catch(reject)
    })
  }

  const preload = async (images: string[]) => {
    return Promise.all(images.map(loadImage))
  }

  return { preload }
}

export default ImagePreloader()
