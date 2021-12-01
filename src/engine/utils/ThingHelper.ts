import { Thing } from '../../types/GameTypes'

let things = []

export const getThingById = (id: string): Thing | null => {
  return things.find((t: Thing) => t.id === id) || null
}

const ThingHelper = () => {
  const setThings = (_things: Thing[]) => {
    things = _things
  }

  return {
    setThings,
  }
}

export default ThingHelper()
