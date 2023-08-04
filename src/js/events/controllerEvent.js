import {PSC, XBOX} from "@/js/events/controller";
import store from "@/store/store";
import {handleScore} from "@/js/needlePosition";
import * as event from "@/js/events/controlGameEvents";


var controllers = {};
var buttonbefore = {}
var gamepadmap = {};
var callbacks = [];
function updateStatus() {
    for (let i in controllers){
        let controller = navigator.getGamepads()[i];
        controller.buttons.forEach((button, j) => {
            let pressed = button === 1.0;
            let val = button;

            if (typeof button === "object") {
                pressed = val.pressed;
                val = val.value;
            }
            if (typeof buttonbefore[i] === "undefined"){
                buttonbefore[i]={};
            }
            if (typeof buttonbefore[i]["buttons"] === "undefined"){
                buttonbefore[i]["buttons"]={};
            }
            if (pressed){

                let valid = false;
                // eslint-disable-next-line no-prototype-builtins
                if (!buttonbefore[i]["buttons"].hasOwnProperty(j)){
                    valid=true;
                }else{
                    if (buttonbefore[i]["buttons"][j].pressed === false){
                        valid=true;
                    }
                }
                if (valid){
                    for (let callback of callbacks){
                        callback(j,gamepadmap[i][j])
                    }
                    callbacks=[];
                    if (j === store.state.playerSettings.controller.skillCheckKey && store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame) {
                        handleScore()
                    }
                    if (j === store.state.playerSettings.controller.startKey && !store.state.gameEvents.events.startGame) {
                        event.startGame()
                    }else if (j === store.state.playerSettings.controller.stopKey && store.state.gameEvents.events.startGame) {
                        event.stopGame()
                    }else if (j=== store.state.playerSettings.controller.pauseKey && !store.state.gameEvents.events.pauseGame) {
                        event.pauseGame()
                    }else if (j === store.state.playerSettings.controller.resumeKey && store.state.gameEvents.events.pauseGame) {
                        event.resumeGame()
                    }
                }
            }
            buttonbefore[i]["buttons"][j] = {
                pressed,
                val
            }
        });
    }
    requestAnimationFrame(updateStatus);
}

function addgamepad(gamepad,map) {
    controllers[gamepad.index] = gamepad;
    gamepadmap[gamepad.index] = map;
    buttonbefore[gamepad.index] = {};
    requestAnimationFrame(updateStatus);
}

function removegamepad(gamepad) {
    delete controllers[gamepad.index];
    delete gamepadmap[gamepad.index];
    delete buttonbefore[gamepad.index];

}

window.addEventListener("gamepadconnected", (e) => {
    console.log("GAMEPAD CONNECTED")
    let controller = navigator.getGamepads()[e.gamepad.index];
    if (controller.id.toLowerCase().includes("xbox")){
        addgamepad(e.gamepad,XBOX)
    }else{
        addgamepad(e.gamepad,PSC)
    }


});

window.addEventListener("gamepaddisconnected", (e) => {
    removegamepad(e.gamepad);
});


let getMap=function (){
    return gamepadmap
}
let waitInput=async function(){
    return new Promise(resolve => {
        callbacks.push(function (key){
            resolve(key)
        })
    })
}
export {getMap,waitInput}
