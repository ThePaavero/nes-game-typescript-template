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
  const eventTypes = ['up', 'down']

  const onNesButtonDown = (keysDown: string[], nesButton: string) => {
    if (!keysDown.includes(nesButton)) {
      keysDown.push(nesButton)
    }
  }

  const onNesButtonUp = (keysDown: string[], nesButton: string) => {
    keysDown = keysDown.filter((k) => k !== nesButton)
  }

  const init = (keyMap: KeyMaps, keysDown: string[]) => {
    eventTypes.forEach((eventType) => {
      document.addEventListener(`key${eventType}`, (e: KeyboardEvent) => {
        Object.keys(keyMap).forEach((nesControllerButton) => {
          const keyArray = keyMap[nesControllerButton]
          if (!keyArray.includes(e.key.toLowerCase())) {
            return
          }
          switch (eventType) {
            case 'down':
              onNesButtonDown(keysDown, nesControllerButton)
              break
            case 'up':
              onNesButtonUp(keysDown, nesControllerButton)
              break
          }
        })
      })
    })
  }

  return { init }
}

export default Controls()
