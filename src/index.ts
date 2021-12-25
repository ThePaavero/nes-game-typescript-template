import { preloadFont, write } from './engine/utils/RenderingHelper'
import Config from './../GameConfig'
import Controls from './engine/Controls'
import ThingHelper from './engine/utils/ThingHelper'
import Game from './game/Game'
import imageNames from './../images.json'
import soundNames from './../sounds.json'
import preloadImages from './engine/ImagePreloader'
import preloadSounds from './engine/SoundPreloader'
import { Thing, GameState } from './types/GameTypes'
import { setUpDebugger } from './engine/utils/StateDebugger'
import './scss/main.scss'

const renderLoadingScreen = (context: CanvasRenderingContext2D, gameName: string): void => {
  write(context, `Loading ' ${gameName} ' . . .`, 10, 10, 10)
}

const init = async () => {
  await preloadFont()

  const canvas = document.createElement('canvas')
  const gameDiv = document.querySelector('.game')

  canvas.width = Config.width
  canvas.height = Config.height

  gameDiv.innerHTML = ''
  gameDiv.appendChild(canvas)

  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = false

  renderLoadingScreen(context, Config.name)

  const images = await preloadImages(imageNames)
  const sounds = await preloadSounds(soundNames, Config.audioExt)
  const things: Thing[] = []
  const state: GameState = {
    things,
    paused: false,
    keysDown: [],
    projectiles: [],
    loopingBackgroundPosition: 0,
  }

  Controls.init(Config.controlKeyMap, state)

  ThingHelper.setThings(things)
  ThingHelper.setImages(images)

  if (Config.useDebugger) {
    setUpDebugger(state, 100)
  }

  if (!Config.scanLines) {
    document.querySelector('.game').classList.remove('scanlines')
  }

  Game(canvas, context, images, sounds, state)
}

init()

window.___NES_GAME_GLOBALS = {}
