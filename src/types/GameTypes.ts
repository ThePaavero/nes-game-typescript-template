export interface Canvas {
  width: number
  height: number
}

export interface Coordinates {
  x: number
  y: number
}

export interface Image {
  id: string
  element: HTMLImageElement
}

export interface ThingTraits {
  moves: boolean
  doHitChecks: boolean
}

export interface Forces {
  x: number
  y: number
}

export interface Momentum {
  forces: Forces
  inertia: number
  maxForces: Forces
  acceleration: number
}

export interface Thing {
  id: string | undefined
  image?: Image | undefined
  width: number | undefined
  height: number | undefined
  position: Coordinates | undefined
  traits: ThingTraits | undefined
  momentum: Momentum | undefined
  mass?: number | undefined
}

export interface GameState {
  things: Thing[]
  paused: boolean
  keysDown: string[]
}

// export enum NesButtons {
//   'up',
//   'down',
//   'left',
//   'right',
//   'a',
//   'b',
//   'start',
//   'select',
// }

declare global {
  interface Window {
    ___NES_GAME_GLOBALS: any
  }
}
