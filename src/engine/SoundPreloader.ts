import { Sound } from '../types/GameTypes'

const preloadSound = async (sound: HTMLAudioElement): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    sound.oncanplay = (e) => {
      resolve(true)
    }
  })
}

export default async (sounds: string[], ext: string): Promise<Sound[]> => {
  return Promise.all(
    sounds.map(async (soundName: string): Promise<Sound> => {
      const soundElement = document.createElement('audio')
      soundElement.src = `/sounds/${soundName}.${ext}`
      soundElement.classList.add(`audio-${soundName}`)
      await preloadSound(soundElement)
      document.body.appendChild(soundElement)
      return {
        id: soundName,
        element: soundElement,
      }
    })
  )
}
