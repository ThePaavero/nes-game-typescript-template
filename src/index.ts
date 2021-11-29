import * as types from './GameTypes'
import Config from './../GameConfig'
import Player from './modules/Player'
import './scss/main.scss'

const things: types.Thing[] = []
const player: types.Thing = Player
const state: types.GameState = {
  things,
  paused: false,
  keysDown: [],
}

console.log('state:', state)
console.log('player:', player)
