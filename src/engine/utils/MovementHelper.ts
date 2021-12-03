import { Thing } from '../../types/GameTypes'
import { buttonIsPressed } from './Misc'
import { getThingById } from './ThingHelper'

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
}

export const updateForces = (things: Thing[], keysDown: string[]): void => {
  updatePlayerForces(getThingById('player'), keysDown)
  // TODO: Update the rest of moving things.
}

export const applyForces = (things: Thing[]): void => {
  getThingsThatMove(things).forEach((thing: Thing) => {
    thing.position.x += thing.momentum.forces.x
    thing.position.y += thing.momentum.forces.y
  })
}

export const applyInertia = (things: Thing[]): void => {
  // TODO: This is fucked.
  // getThingsThatMove(things).forEach((thing: Thing) => {
  //   if (thing.momentum.forces.x > 0) {
  //     thing.momentum.forces.x -= thing.momentum.inertia
  //   } else if (thing.momentum.forces.x < 0) {
  //     thing.momentum.forces.x += thing.momentum.inertia
  //   } else {
  //     thing.momentum.forces.x = 0
  //   }
  // })
}

export const getThingsThatMove = (things: Thing[]): Thing[] => {
  return things.filter((thing: Thing) => thing.traits.moves)
}
