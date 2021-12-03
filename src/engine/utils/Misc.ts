let loggedOnce = false

export const logOnce = (toLog: any): void => {
  if (loggedOnce) {
    return
  }
  console.log(toLog)
  loggedOnce = true
}

export const buttonIsPressed = (slug: string, keysDown: string[]): boolean => {
  return keysDown.includes(slug)
}
