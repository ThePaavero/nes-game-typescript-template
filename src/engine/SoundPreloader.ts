import { Sound } from '../types/GameTypes'

const preloadSound = async (sound: HTMLAudioElement, amount: number) => {
  return new Promise((resolve, reject) => {
    let loadedFiles = 0
    sound.addEventListener('oncanplay', (e) => {
      loadedFiles++
      if (loadedFiles === amount) {
        console.log('Audios loaded', loadedFiles, amount)
        resolve(true)
      }
    })
  })
}

export default async (sounds: string[], ext: string): Promise<Sound[]> =>
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
