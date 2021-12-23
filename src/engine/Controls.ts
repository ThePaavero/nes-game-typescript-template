import { logOnce } from './utils/Misc'
import { GameState, ControlKeyMap } from '../types/GameTypes'
import gamepads from 'html5-gamepad'

const Controls = () => {
  const onNesButtonDown = (state: GameState, nesButton: string): void => {
    if (!state.keysDown.includes(nesButton)) {
      state.keysDown.push(nesButton)
    }
  }

  const onNesButtonUp = (state: GameState, nesButton: string): void => {
    state.keysDown = state.keysDown.filter((k: string) => k !== nesButton)
  }

  const processButtonEvent = (eventType: string, state: GameState, nesControllerButton: string): void => {
    switch (eventType) {
      case 'down':
        onNesButtonDown(state, nesControllerButton)
        break
      case 'up':
        onNesButtonUp(state, nesControllerButton)
        break
    }
  }

  const listenToGamepad = (gamepad: any, keyMap: ControlKeyMap, state: GameState): void => {
    const keys: string[] = Object.keys(gamepad.mapping.buttons)
    keys.forEach((buttonName: string) => {
      console.log(`Setting listener for "${buttonName}"`)
      if (gamepad && gamepad.buttonIsPressed(buttonName)) {
        console.log(`Gamepad button is pressed: "${buttonName}"`)
      }
    })
  }

  const init = (keyMap: ControlKeyMap, state: GameState): void => {
    // Keyboard.
    const eventTypes = ['up', 'down']
    eventTypes.forEach((eventType) => {
      document.addEventListener(`key${eventType}`, (e: KeyboardEvent) => {
        const keys: string[] = Object.keys(keyMap)
        keys.forEach((nesControllerButton) => {
          const keyArray = keyMap[nesControllerButton]
          if (!keyArray.includes(e.key.toLowerCase())) {
            return
          }
          processButtonEvent(eventType, state, nesControllerButton)
        })
      })
    })

    // Gamepad.
    const gamepadPollerId = setInterval(() => {
      if (gamepads.length) {
        clearInterval(gamepadPollerId)
        listenToGamepad(gamepads[0], keyMap, state)
      }
    }, 500)
  }

  return { init }
}

export default Controls()
