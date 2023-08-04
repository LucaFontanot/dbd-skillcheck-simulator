import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'
import store from '@/store/store.js'

// skilcheck spawn

let skillCheckAnimation = window.skillCheckAnimation;

const skillCheckInit = (a=false) => {
    var props=store.state.gameStatus.now.props ;

    //document.getElementsByClassName("skillcheck-center")[0].style.transform="";
    skillCheckAnimation = anime.timeline({
        loop: false,
        autoplay: a
    })
    let mode = store.state.gameStatus.now.gameMode;
    skillCheckAnimation.add({
        targets: dom.skillcheck['skill-check-element'],
        easing: 'easeInOutQuad',
        opacity: [0, 1],
        duration: (mode !== "wiggle") ? 300 : 1,
        begin() {
            if (store.state.gameStatus.now.effects.includes('madness')) {
                dom.skillcheck['skill-check'].classList.toggle('wiggleSkillCheck')
                dom.skillcheck['skill-check'].classList.add('wiggleSkillCheck')
            }
        }
    });
    switch (mode) {
        case "ds":
        case "easy":
        case "medium":
        case "hard":
        case "custom":
            skillCheckAnimation.add({
                targets: dom.skillcheck['skill-check-needle'],
                easing: 'linear',
                rotate: [0, 360],
                duration: typeof props === "object"&&props.hasOwnProperty("speed")?props.speed:1100 ,
                begin(){
                    store.commit('updateGameStatus', [{
                        state: 'events',
                        event: "skillcheck",
                        to: true
                    }])
                },
                complete() {
                    dom.callbackComplete();
                }
            }, 100)
            break;
        case "glyph":
            skillCheckAnimation.add({
                targets: dom.skillcheck['skill-check-needle'],
                easing: 'linear',
                rotate: [0, 360*6],
                duration: 1100*6,
                begin(){
                    store.commit('updateGameStatus', [{
                        state: 'events',
                        event: "skillcheck",
                        to: true
                    }])
                },
                complete() {
                    dom.callbackComplete();
                }
            }, 100)
            break;
        case "wiggle":
            skillCheckAnimation.add({
                targets: dom.skillcheck['skill-check-element'],
                easing: 'easeInOutQuad',
                opacity: [0, 1],
                duration: 0,
                begin(){

                }
            });
            if (typeof dom.now =="undefined"){
                dom.now = 0;
            }

            skillCheckAnimation.add({
                targets: dom.skillcheck['skill-check-needle'],
                easing: 'linear',
                rotate: [dom.now, 360*6 * store.state.gameStatus.now.wiggle.direction + dom.now],
                duration: 8400,
                begin(){
                    store.commit('updateGameStatus', [{
                        state: 'events',
                        event: "skillcheck",
                        to: true
                    }])
                },
                complete() {
                    dom.callbackComplete();
                }
            }, 0)
    }
        skillCheckAnimation.add({
            targets: dom.skillcheck['skill-check-element'],
            easing: 'easeOutExpo',
            delay: 500,
            opacity: 0,
            duration: (mode !== "wiggle")?300:0,
            complete() {
                if (skillCheckAnimation.children[1].paused) {
                    skillCheckAnimation.restart()
                    skillCheckAnimation.pause()
                }
            }
        })
}

const removeSkillCheck = () => {
    if (skillCheckAnimation.children.length >=3 && skillCheckAnimation.children[1].began) {
        skillCheckAnimation.pause()
        skillCheckAnimation.children[2].play()
    } else {
        skillCheckAnimation.restart()
        skillCheckAnimation.pause()
    }
}

export {removeSkillCheck, skillCheckAnimation, skillCheckInit}
