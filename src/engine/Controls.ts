import { GameState } from '../types/GameTypes'

interface KeyMaps {
  a: string[]
  b: string[]
  up: string[]
  down: string[]
  left: string[]
  right: string[]
  select: string[]
  start: string[]
}

const Controls = () => {
  const onNesButtonDown = (keysDown: string[], nesButton: string) => {
    if (!keysDown.includes(nesButton)) {
      keysDown.push(nesButton)
    }
  }

  const init = (keyMap: KeyMaps, keysDown: string[]) => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      Object.keys(keyMap).forEach((nesControllerButton) => {
        const keyArray = keyMap[nesControllerButton]
        if (!keyArray.includes(e.key.toLowerCase())) {
          return
        }
        onNesButtonDown(keysDown, nesControllerButton)
      })
    })
  }

  return { init }
}

export default Controls()
