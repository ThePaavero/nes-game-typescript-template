export interface Canvas {
  width: number
  height: number
}

export interface Things {
  things: Thing[]
}

export interface Coordinates {
  x: number
  y: number
}

export interface Image {
  id: string
  data: Blob
}

export interface ThingTraits {
  moves: boolean
  isHittable: boolean
  isControllable: boolean
}

export interface Forces {
  x: number
  y: number
}

export interface Momentum {
  forces: Forces
  inertia: number
}

export interface Thing {
  id: string
  image?: Image
  width: number
  height: number
  position: Coordinates
  traits: ThingTraits
  momentum: Momentum
  mass?: number
}

export interface GameState {
  things: Things
  paused: boolean
  keysDown: string[]
}
