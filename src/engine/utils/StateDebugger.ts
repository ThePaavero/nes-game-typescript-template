import { GameState } from '../../game/GameTypes'

export const setUpDebugger = (state: GameState, delay: number) => {
  const element = document.querySelector('.debugger')
  setInterval(() => {
    element.innerHTML = `
<pre>
${JSON.stringify(state, null, 2)}
</pre>
      `
  }, delay)
}
