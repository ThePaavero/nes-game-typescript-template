import { GameState } from '../types/GameTypes'
import { logOnce } from './utils/Misc'

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

  const onNesButtonDown = (state: GameState, nesButton: string) => {
    console.log('DOWN')
    if (!state.keysDown.includes(nesButton)) {
      state.keysDown.push(nesButton)
    }
  }

  // const onNesButtonUp = (keysDown: string[], nesButton: string) => {
  //   console.log('UP')
  //   keysDown = keysDown.filter((k) => k !== nesButton)
  // }

  const onNesButtonUp = (state: GameState, nesButton: string) => {
    state.keysDown = state.keysDown.filter((k) => k !== nesButton)
  }

  const processButtonEvent = (eventType: string, state: GameState, nesControllerButton: string) => {
    switch (eventType) {
      case 'down':
        onNesButtonDown(state, nesControllerButton)
        break
      case 'up':
        onNesButtonUp(state, nesControllerButton)
        break
    }
  }

  const init = (keyMap: KeyMaps, state: GameState) => {
    eventTypes.forEach((eventType) => {
      document.addEventListener(`key${eventType}`, (e: KeyboardEvent) => {
        Object.keys(keyMap).forEach((nesControllerButton) => {
          const keyArray = keyMap[nesControllerButton]
          if (!keyArray.includes(e.key.toLowerCase())) {
            return
          }
          processButtonEvent(eventType, state, nesControllerButton)
        })
      })
    })
  }

  return { init }
}

export default Controls()
