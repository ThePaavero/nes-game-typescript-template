export interface GameConfig {
  name: string
  width: number
  height: number
  fps: number
  audioExt: string
  audioVolume: number
  scanLines: boolean
  controlKeyMap: ControlKeyMap
  useDebugger: boolean
  fpsMeter: boolean
}

export interface ControlKeyMap {
  up: string[]
  down: string[]
  left: string[]
  right: string[]
  select: string[]
  start: string[]
  b: string[]
  a: string[]
  [index: string]: string[]
}

export interface XboxControlKeyMap {
  'dpad up': string
  'dpad down': string
  'dpad left': string
  'dpad right': string
  back: string
  start: string
  b: string
  a: string
  [index: string]: string
}

export interface Canvas {
  width: number
  height: number
}

export interface Coordinates {
  x: number
  y: number
  [index: string]: number
}

export interface Image {
  id: string
  element: HTMLImageElement
  [index: symbol]: string
}

export interface Sound {
  id: string
  element: HTMLAudioElement
  [index: symbol]: string
}

export interface Traits {
  moves: boolean
  doHitChecks: boolean
}

export interface Forces {
  x: number
  y: number
  [index: string]: number
}

export interface Momentum {
  forces: Forces
  inertia: number
  maxForces: Forces
  acceleration: number
}

export interface Thing {
  id: string | undefined
  width: number | undefined
  height: number | undefined
  position: Coordinates | undefined
  traits?: Traits
  momentum?: Momentum
  mass?: number
  image?: boolean
  color?: string
}

declare global {
  interface Window {
    ___NES_GAME_GLOBALS: any
  }
}
