import * as types from './types/GameTypes'
import Config from './../GameConfig'
import ImagePreloader from './engine/ImagePreloader'
import Player from './modules/Player'
import './scss/main.scss'
import imageNames from './../images.json'
import Game from './game/Game'
import ThingHelper from './engine/utils/ThingHelper'

const init = async () => {
  let images = []
  if (imageNames.length) {
    console.info(`Preloading following ${imageNames.length} images:`)
    console.info(imageNames)
    images = await ImagePreloader.preload(imageNames)
    // console.info('The following images have been added to memory:')
    // console.info(images)
  }

  const things: types.Thing[] = []
  const player: types.Thing = Player
  things.push(player)
  const state: types.GameState = {
    things,
    paused: false,
    keysDown: [],
  }

  const canvas = document.createElement('canvas')
  canvas.width = Config.width
  canvas.height = Config.height
  document.querySelector('.game').appendChild(canvas)

  const context = canvas.getContext('2d')

  ThingHelper.setThings(things)
  ThingHelper.setImages(images)

  Game(canvas, context, images, state)
}

init()
