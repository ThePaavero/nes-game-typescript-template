import Config from '../../../BaseTypes'

// TODO: Support for same sound playing on top of itself.
export const playSound = (soundName: string, volume?: number): void => {
  const audioElement: HTMLAudioElement = document.querySelector(`.audio-${soundName}`)
  audioElement.volume = volume || Config.audioVolume
  if (!audioElement) {
    console.warn(`Could not load audio element by name "${soundName}"`)
    return
  }
  audioElement.play()
}
