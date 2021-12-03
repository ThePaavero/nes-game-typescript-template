export default {
  name: 'Example Game',
  width: 256,
  height: 240,
  fps: 60,
  scanLines: false,
  controlKeyMaps: {
    up: ['w', 'arrowup'],
    down: ['s', 'arrowdown'],
    left: ['a', 'arrowleft'],
    right: ['d', 'arrowright'],
    select: ['shift'],
    start: ['control', 'enter'],
    b: [','],
    a: ['.'],
  },
  useDebugger: true,
}
