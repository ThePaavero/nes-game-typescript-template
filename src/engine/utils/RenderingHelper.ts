import { Coordinates, GameState, Image, Thing, Traits } from './../../types/GameTypes'
import { randomIntFromInterval } from './Misc'
import { getThingImage } from './ThingHelper'

export const drawThings = (context: CanvasRenderingContext2D, things: Thing[]): void => {
  things.forEach((thing: Thing) => {
    const img: CanvasImageSource | null = getThingImage(thing.id)
    if (!img) {
      context.beginPath()
      context.arc(
        thing.position.x + thing.width / 2,
        thing.position.y + thing.height / 2,
        thing.width,
        0,
        2 * Math.PI,
        false
      )
      context.fillStyle = thing.color || '#fff'
      context.fill()
      return
    }
    context.drawImage(img, thing.position.x, thing.position.y, thing.width, thing.height)
  })
}

export const getImage = (images: Image[], id: string): Image => {
  return images.find((i) => i.id === id)
}

export const preloadFont = async (): Promise<FontFace> => {
  const nesFont = await new FontFace('PixelEmulatorxq08', 'url("fonts/PixelEmulatorxq08.ttf")').load()
  const doc = document as any
  doc.fonts.add(nesFont)
  return nesFont
}

export const write = (
  context: CanvasRenderingContext2D,
  text: string,
  size: number,
  x: number,
  y: number,
  color?: string
): void => {
  context.textBaseline = 'top'
  context.fillStyle = color || 'white'
  context.font = `${size}px PixelEmulatorxq08`
  context.fillText(text, x, y)
}
