import { Sound } from '../types/GameTypes'

let loadedFiles = 0

const preloadSound = async (sound: HTMLAudioElement, amount: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    sound.oncanplay = (e) => {
      loadedFiles++
      if (loadedFiles === amount) {
        resolve(true)
      }
    }
  })
}

export default async (sounds: string[], ext: string): Promise<Sound[]> => {
  return Promise.all(
    sounds.map(async (soundName: string): Promise<Sound> => {
      const soundElement = document.createElement('audio')
      soundElement.src = `/sounds/${soundName}.${ext}`
      // TODO: Well this sucks. The main function is fucked for now.
      // await preloadSound(sound, sounds.length)
      return {
        id: soundName,
        element: soundElement,
      }
    })
  )
}
