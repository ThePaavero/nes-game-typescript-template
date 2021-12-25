import { Sound } from '../types/GameTypes'

let loadedFiles = 0

const preloadSound = async (sound: HTMLAudioElement, amount: number) => {
  return new Promise((resolve, reject) => {
    sound.oncanplay = (e) => {
      loadedFiles++
      if (loadedFiles === amount) {
        resolve(true)
      }
    }
  })
}

// TODO: Get rid of the any.
export default async (sounds: string[], ext: string): Promise<any> => {
  Promise.all(
    sounds.map(async (soundName: string): Promise<Sound> => {
      const sound = document.createElement('audio')
      sound.src = `/sounds/${soundName}.${ext}`
      await preloadSound(sound, sounds.length)
      return {
        id: soundName,
        element: sound,
      }
    })
  )
}
