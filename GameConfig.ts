import { GameConfig } from './src/types/GameTypes'

export default {
  name: 'Example Game',
  width: 256,
  height: 240,
  fps: 60,
  scanLines: true,
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
} as GameConfig
