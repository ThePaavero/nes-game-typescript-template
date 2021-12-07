import { Coordinates, Thing } from '../../types/GameTypes'
import { buttonIsPressed } from './Misc'
import { getThingById } from './ThingHelper'

export const round = (number: number): number => {
  // return parseFloat(number.toFixed(1))
  return parseFloat(number.toFixed(2))
}

export const updatePlayerForces = (player: Thing, keysDown: string[]): void => {
  const add = player.momentum.acceleration
  if (buttonIsPressed('up', keysDown)) {
    player.momentum.forces.y -= add
  }
  if (buttonIsPressed('down', keysDown)) {
    player.momentum.forces.y += add
  }
  if (buttonIsPressed('left', keysDown)) {
    player.momentum.forces.x -= add
  }
  if (buttonIsPressed('right', keysDown)) {
    player.momentum.forces.x += add
  }

  player.momentum.forces.x = round(player.momentum.forces.x)
  player.momentum.forces.y = round(player.momentum.forces.y)
}

export const updateForces = (things: Thing[], keysDown: string[]): void => {
  updatePlayerForces(getThingById('player'), keysDown)
  // TODO: Update the rest of moving things.
}

export const applyForces = (things: Thing[]): void => {
  getThingsThatMove(things).forEach((thing: Thing) => {
    thing.position.x += thing.momentum.forces.x
    thing.position.y += thing.momentum.forces.y
    thing.position.x = round(thing.position.x)
    thing.position.y = round(thing.position.y)
  })
}

export const applyInertia = (things: Thing[]): void => {
  // TODO: Still fucked. Works alright when moving to the right 🤷.
  getThingsThatMove(things).forEach((thing: Thing) => {
    if (Math.abs(thing.momentum.forces.x) < 0.1) {
      thing.momentum.forces.x = 0
    } else {
      if (thing.momentum.forces.x > 0) {
        thing.momentum.forces.x -= thing.momentum.inertia
      } else if (thing.momentum.forces.x < 0) {
        thing.momentum.forces.x += thing.momentum.inertia
      } else {
        thing.momentum.forces.x = 0
      }
    }
    if (Math.abs(thing.momentum.forces.y) < 0.1) {
      thing.momentum.forces.y = 0
    } else {
      if (thing.momentum.forces.y > 0) {
        thing.momentum.forces.y -= thing.momentum.inertia
      } else if (thing.momentum.forces.y < 0) {
        thing.momentum.forces.y += thing.momentum.inertia
      } else {
        thing.momentum.forces.y = 0
      }
    }
    thing.momentum.forces.x = round(thing.momentum.forces.x)
    thing.momentum.forces.y = round(thing.momentum.forces.y)
  })
}

export const getThingsThatMove = (things: Thing[]): Thing[] => {
  return things.filter((thing: Thing) => thing.traits.moves)
}
