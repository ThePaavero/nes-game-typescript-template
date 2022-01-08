import { GameConfig } from './src/engine/types/BaseTypes'

export default {
  name: 'Example Game',
  width: 256,
  height: 240,
  fps: 60,
  scanLines: true,
  audioExt: 'ogg',
  audioVolume: 0.2,
  controlKeyMap: {
    up: ['w', 'arrowup'],
    down: ['s', 'arrowdown'],
    left: ['a', 'arrowleft'],
    right: ['d', 'arrowright'],
    select: ['shift'],
    start: ['control', 'enter'],
    b: [',', 'z'],
    a: ['.', 'x'],
  },
  useDebugger: false,
  fpsMeter: true,
} as GameConfig
