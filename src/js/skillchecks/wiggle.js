

import * as ffs from '@/js/library/math.js'

import {playerOptions} from '@/js/status/options'
import store from '@/store/store.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import {skillCheckAnimation, removeSkillCheck} from '@/js/skillchecks/dom/skillCheckAnim'
import {drawWiggleSkillCheck} from "@/js/skillchecks/drawer/wiggle";

const wiggleSkillcheck = async (now=0,stop=false) => {
    dom.now=0;
    const gameStatusValid = () => {
        return store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame
    }
    let props = {
        now:now,

    }
    if (gameStatusValid() && !stop) {
        if (!store.state.gameStatus.now.wiggle.started){
            await ffs.delay(ffs.getRandomArbitraryRange(playerOptions.skillCheckDelayMin.value, playerOptions.skillCheckDelayMax.value))
        }

        //ffs.outOf(0)
        if (gameStatusValid()) {
            if (store.state.gameEvents.events.skillcheck && !store.state.gameStatus.now.wiggle.started) {
                skillCheckAnimation.restart()
                skillCheckAnimation.pause()
            }
            let ranEl = dom.skillcheck['skill-check-element']
            if (store.state.gameStatus.now.effects.includes('madness')) {
                let minSpace = (15 / 100) * window.innerHeight
                ranEl.style.top = `${ffs.getRandomArbitraryRange(minSpace, window.innerHeight - minSpace)}px`
                ranEl.style.left = `${ffs.getRandomArbitraryRange(minSpace, window.innerWidth - minSpace)}px`
            } else {
                ranEl.style.top = '50%'
                ranEl.style.left = '50%'
            }
            let callbackComplete = function (end=true) {
                store.commit('updateGameStatus', [{
                    state: 'events',
                    event: "wiggle",
                    to: false
                }])
                store.state.gameStatus.now.wiggle.started = false;
                dom.now=0;
                removeSkillCheck()

                if (end){
                    wiggleSkillcheck();
                }

            };
            props.callbackComplete = callbackComplete;
            await drawWiggleSkillCheck(props);

        }
    }

}

export {wiggleSkillcheck}
