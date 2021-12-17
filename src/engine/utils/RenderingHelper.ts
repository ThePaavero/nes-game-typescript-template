import { Thing } from './../../types/GameTypes'
import { getThingImage } from './ThingHelper'

export const drawThings = (context: CanvasRenderingContext2D, things: Thing[]): void => {
  things.forEach((thing: Thing) => {
    const img: CanvasImageSource | null = getThingImage(thing.id)
    if (!img) {
      return
    }
    context.drawImage(img, thing.position.x, thing.position.y, thing.width, thing.height)
  })
}