import { Thing, GameState } from './types/GameTypes'
import Config from './../GameConfig'
import ImagePreloader from './engine/ImagePreloader'
import Controls from './engine/Controls'
import Player from './modules/Player'
import './scss/main.scss'
import imageNames from './../images.json'
import Game from './game/Game'
import ThingHelper from './engine/utils/ThingHelper'
import { setUpDebugger } from './engine/utils/StateDebugger'

const init = async () => {
  const images = await ImagePreloader.preloadImages(imageNames)

  const things: Thing[] = []
  const player: Thing = Player
  things.push(player)

  const state: GameState = {
    things,
    paused: false,
    keysDown: [],
  }

  Controls.init(Config.controlKeyMap, state)

  const canvas = document.createElement('canvas')
  canvas.width = Config.width
  canvas.height = Config.height
  document.querySelector('.game').appendChild(canvas)

  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = false

  ThingHelper.setThings(things)
  ThingHelper.setImages(images)

  if (Config.useDebugger) {
    setUpDebugger(state, 100)
  }

  if (Config.scanLines) {
    document.querySelector('.game').classList.remove('scanlines')
  }

  Game(canvas, context, images, state)
}

init()

window.___NES_GAME_GLOBALS = {}
