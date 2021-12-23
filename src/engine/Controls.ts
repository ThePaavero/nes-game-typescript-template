import { logOnce } from './utils/Misc'
import { GameState, ControlKeyMap } from '../types/GameTypes'
import gamepads from 'html5-gamepad'

interface XboxControlKeyMap {
  up: string
  down: string
  left: string
  right: string
  select: string
  start: string
  b: string
  a: string
  [index: string]: string
}

const xboxMap: XboxControlKeyMap = {
  up: 'dpad up',
  down: 'dpad down',
  left: 'dpad left',
  right: 'dpad right',
  select: 'back',
  start: 'start',
  b: 'b',
  a: 'a',
}

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
    const nesButtons = Object.keys(keyMap)
    const gamepadButtons: string[] = Object.keys(gamepad.mapping.buttons)

    gamepadButtons.forEach((buttonName: string) => {
      if (gamepad.button(buttonName)) {
        const nesControllerButton = xboxMap[buttonName]
        console.log(nesControllerButton)
        if (nesControllerButton) {
          processButtonEvent('down', state, nesControllerButton)
        }
      }
    })

    window.requestAnimationFrame(() => {
      listenToGamepad(gamepad, keyMap, state)
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
