import Config from './../GameConfig'
import Controls from './engine/Controls'
import ThingHelper from './engine/utils/ThingHelper'
import Game from './game/Game'
import imageNames from './../images.json'
import preloadImages from './engine/ImagePreloader'
import { Thing, GameState } from './types/GameTypes'
import { setUpDebugger } from './engine/utils/StateDebugger'
import './scss/main.scss'

const init = async () => {
  const images = await preloadImages(imageNames)
  const things: Thing[] = []
  const state: GameState = {
    things,
    paused: false,
    keysDown: [],
    projectiles: [],
    loopingBackgroundPosition: 0,
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

  if (!Config.scanLines) {
    document.querySelector('.game').classList.remove('scanlines')
  }

  Game(canvas, context, images, state)
}

init()

window.___NES_GAME_GLOBALS = {}
