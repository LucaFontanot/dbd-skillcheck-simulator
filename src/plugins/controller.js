import { useToast } from 'vue-toast-notification'
import GameState from './store/gameState'

let gameState = null

const controllers = {}
const buttonbefore = {}
const gamepadmap = {}
let callbacks = []
const XBOX = {
  0: 'A',
  1: 'B',
  2: 'X',
  3: 'Y',
  4: 'LB',
  5: 'RB',
  6: 'LT',
  7: 'RT',
  8: '⛒',
  9: '⚌',
  10: 'LS',
  11: 'RS',
  12: 'UP',
  13: 'DOWN',
  14: 'LEFT',
  15: 'RIGHT',
  16: '⛌',
}
const PSC = {
  0: 'X',
  1: 'O',
  2: '□',
  3: '△',
  4: 'L1',
  5: 'R1',
  6: 'L2',
  7: 'R2',
  8: '⚇',
  9: '⚌',
  10: 'LS',
  11: 'RS',
  12: 'UP',
  13: 'DOWN',
  14: 'LEFT',
  15: 'RIGHT',
  16: '⛌',
}

function updateStatus () {
  for (const i in controllers) {
    const controller = navigator.getGamepads()[i]
    for (const [j, button] of controller.buttons.entries()) {
      let pressed = button === 1
      let val = button

      if (typeof button === 'object') {
        pressed = val.pressed
        val = val.value
      }
      if (buttonbefore[i] === undefined) {
        buttonbefore[i] = {}
      }
      if (buttonbefore[i]['buttons'] === undefined) {
        buttonbefore[i]['buttons'] = {}
      }
      if (pressed) {
        let valid = false

        if (buttonbefore[i]['buttons'].hasOwnProperty(j)) {
          if (buttonbefore[i]['buttons'][j].pressed === false) {
            valid = true
          }
        } else {
          valid = true
        }
        if (valid) {
          for (const callback of callbacks) {
            callback(j, gamepadmap[i][j])
          }
          callbacks = []
          if (gameState.settings.controller.keys.includes(j)) {
            document.dispatchEvent(new Event('skillchedkClick'))
          }
          if (
            j === gameState.settings.controller.startKey
            && gameState.playStatus === 'stop'
          ) {
            // event.startGame()
          } else if (
            j === gameState.settings.controller.stopKey
            && gameState.playStatus === 'start'
          ) {
            // event.pauseGame()
          } else if (
            j === gameState.settings.controller.startKey
            && gameState.playStatus === 'pause'
          ) {
            // event.resumeGame()
          }
        }
      }
      buttonbefore[i]['buttons'][j] = {
        pressed,
        val,
      }
    }
  }
  requestAnimationFrame(updateStatus)
}

function addgamepad (gamepad, map) {
  controllers[gamepad.index] = gamepad
  gamepadmap[gamepad.index] = map
  buttonbefore[gamepad.index] = {}
  requestAnimationFrame(updateStatus)
  useToast().success('Controller connected')
}

function removegamepad (gamepad) {
  delete controllers[gamepad.index]
  delete gamepadmap[gamepad.index]
  delete buttonbefore[gamepad.index]
  useToast().warning('Controller disconnected')
}

window.addEventListener('gamepadconnected', e => {
  console.log('GAMEPAD CONNECTED')
  const controller = navigator.getGamepads()[e.gamepad.index]
  if (controller.id.toLowerCase().includes('xbox')) {
    addgamepad(e.gamepad, XBOX)
  } else {
    addgamepad(e.gamepad, PSC)
  }
})

window.addEventListener('gamepaddisconnected', e => {
  removegamepad(e.gamepad)
})

function getMap () {
  return gamepadmap
}
async function waitInput () {
  return new Promise(resolve => {
    callbacks.push(function (key, value) {
      resolve([key, value])
    })
  })
}
function controllerInit () {
  gameState = GameState.getState()
}
function isConnected () {
  let i = 0
  for (const controller in controllers) {
    i += 1
  }
  return i > 0
}
export { controllerInit, getMap, isConnected, PSC, waitInput, XBOX }
