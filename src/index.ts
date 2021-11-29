import { Canvas, Coordinates, Thing, Image } from './GameTypes'
import Config from './../GameConfig'
import './scss/main.scss'

console.log('Ready to go!')

console.log(Config)

document.addEventListener('keydown', (e) => {
  console.log('KEYDOWN:', e.key)
})
