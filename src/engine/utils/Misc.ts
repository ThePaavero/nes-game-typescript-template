let loggedOnce = false

export const logOnce = (toLog: any) => {
  if (loggedOnce) {
    return
  }
  console.log(toLog)
  loggedOnce = true
}
