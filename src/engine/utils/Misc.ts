const globalVarKey = '___NES_GAME_GLOBALS'

export const logOnce = (toLog: any): void => {
  if (window[globalVarKey].NES_GAME_loggedOnce) {
    return
  }
  console.log(toLog)
  window[globalVarKey].NES_GAME_loggedOnce = true
}

export const buttonIsPressed = (slug: string, keysDown: string[]): boolean => {
  return keysDown.includes(slug)
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const playSound = (soundName: string) => {
  const audioElement: HTMLAudioElement = document.querySelector(`.audio-${soundName}`)
  console.log(audioElement)
  if (!audioElement) {
    return
  }
  audioElement.play()
}
