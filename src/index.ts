import * as types from './types/GameTypes'
import Config from './../GameConfig'
import ImagePreloader from './engine/ImagePreloader'
import Controls from './engine/Controls'
import Player from './modules/Player'
import './scss/main.scss'
import imageNames from './../images.json'
import Game from './game/Game'
import ThingHelper from './engine/utils/ThingHelper'

const init = async () => {
  const images = await ImagePreloader.preloadImages(imageNames)

  const things: types.Thing[] = []
  const player: types.Thing = Player
  things.push(player)

  const state: types.GameState = {
    things,
    paused: false,
    keysDown: [],
  }

  Controls.init(Config.controlKeyMaps, state)

  const canvas = document.createElement('canvas')
  canvas.width = Config.width
  canvas.height = Config.height
  document.querySelector('.game').appendChild(canvas)

  const context = canvas.getContext('2d')

  ThingHelper.setThings(things)
  ThingHelper.setImages(images)

  if (Config.useDebugger) {
    const element = document.querySelector('.debugger')
    setInterval(() => {
      element.innerHTML = `
      <pre>
        ${JSON.stringify(state, null, 2)}
      </pre>
      `
    }, 50)
  }

  Game(canvas, context, images, state)
}

init()
