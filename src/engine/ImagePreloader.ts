import { Image, Images } from '../GameTypes'

const ImagePreloader = () => {
  const promises = []

  const loadImage = (imageName: string) => {
    console.log(`Loading image "${imageName}"`)
    promises.push(
      new Promise((resolve, reject) => {
        const imgElement = document.createElement('img')
        imgElement.src = `http://localhost:8080/images/${imageName}.png`
        imgElement.onload = () => {
          resolve({
            id: imageName,
            element: imgElement,
          })
        }
        imgElement.onerror = reject
      })
    )
    Promise.all(promises).then((images) => {
      console.log(images)
      // resolve(images)
    })
  }

  const preload = async (images: string[]) => {
    return await images.map(loadImage)
  }

  return { preload }
}

export default ImagePreloader()
