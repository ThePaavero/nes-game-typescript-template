import { GameState, ControlKeyMap, XboxControlKeyMap } from '../types/GameTypes'
import gamepads from 'html5-gamepad'

const xboxMap: XboxControlKeyMap = {
  'dpad up': 'up',
  'dpad down': 'down',
  'dpad left': 'left',
  'dpad right': 'right',
  back: 'select',
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
    const gamepadButtons: string[] = Object.keys(gamepad.mapping.buttons)

    gamepadButtons.forEach((buttonName: string) => {
      const nesControllerButton = xboxMap[buttonName]
      if (!nesControllerButton) {
        return
      }

      if (gamepad.button(buttonName)) {
        // Button is pressed.
        if (nesControllerButton) {
          processButtonEvent('down', state, nesControllerButton)
        }
      } else if (state.keysDown.includes(nesControllerButton)) {
        // Button is not pressed.
        state.keysDown = state.keysDown.filter((k: string) => k !== nesControllerButton)
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
        // TODO: Just noticed my own HOTAS gets registered here, so a temporary hack to avoid errors.
        if (gamepads[0].gamepad.id.toString().toLowerCase().includes('throttle')) {
          console.log('HOTAS...')
          return
        }
        listenToGamepad(gamepads[0], keyMap, state)
      }
    }, 500)
  }

  return { init }
}

export default Controls()
