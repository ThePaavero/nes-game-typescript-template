import * as types from './GameTypes'
import Config from './../GameConfig'
import Runtime from './engine/Runtime'
import ImagePreloader from './engine/ImagePreloader'
import Player from './modules/Player'
import './scss/main.scss'
import imageNames from './../images.json'

const init = async () => {
  let images = []
  if (imageNames.length) {
    console.log(`Preloading following ${imageNames.length} images:`)
    console.table(imageNames)
    images = await ImagePreloader.preload(images)
    console.log(images)
  }

  const things: types.Thing[] = []
  const player: types.Thing = Player
  const state: types.GameState = {
    things,
    paused: false,
    keysDown: [],
  }

  Runtime.start()
}

init()
