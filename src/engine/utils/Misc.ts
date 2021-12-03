export const logOnce = (toLog: any): void => {
  const globalVarKey = '___NES_GAME_GLOBALS'
  if (window[globalVarKey].NES_GAME_loggedOnce) {
    return
  }
  console.log(toLog)
  window[globalVarKey].NES_GAME_loggedOnce = true
}

export const buttonIsPressed = (slug: string, keysDown: string[]): boolean => {
  return keysDown.includes(slug)
}
