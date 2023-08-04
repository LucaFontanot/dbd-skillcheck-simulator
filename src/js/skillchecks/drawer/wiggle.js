import * as ffs from '@/js/library/math.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import playTrack from "@/js/sound";
import {skillcheckSpawnCoordinates} from "@/js/drawSkillCheck";
import {skillCheckAnimation} from "@/js/skillchecks/dom/skillCheckAnim";
import store from "@/store/store";
//import store from "@/store/store";
import {skillCheckInit} from "@/js/skillchecks/dom/skillCheckAnim";

const drawWiggleSkillCheck = async (props) => {
    dom.now = props.now;

    var firstart = false;
    var canvas = dom.skillcheck['skill-check-circle']
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (! store.state.gameStatus.now.wiggle.started){
        skillcheckSpawnCoordinates.mode="wiggle";
        firstart=true;
        playTrack('advertise')
        await ffs.delay(500)
        store.state.gameStatus.now.wiggle.started=true;
        store.state.gameStatus.now.wiggle.last=new Date().getTime();
        store.state.gameStatus.now.wiggle.combo=0;
        store.state.gameStatus.now.wiggle.doanim=false;
        store.state.gameStatus.now.wiggle.direction=1;

    }else{
        store.state.gameStatus.now.wiggle.doanim=false;
        store.state.gameStatus.now.wiggle.direction*=-1;


    }


    var x = canvas.height / 2
    var y = canvas.width / 2
    var lineSize = 2
    var sSize = 3.6
    var radius = 65

    const rad = (deg) => {
        return (Math.PI / 180) * (deg-90)
    }
    let zonegreat = 8;
    let color = "#ffffff";
    if (store.state.gameStatus.now.wiggle.combo>0){
        color = "#f3da55";
    }
    if (store.state.gameStatus.now.wiggle.combo>5){
        store.state.gameStatus.now.wiggle.combo=5;
    }
    zonegreat -= store.state.gameStatus.now.wiggle.combo;
    let drawValues = {
        good1: 50,
        great1: 90 - zonegreat,
        great1end: 90+zonegreat,
        end1: 130,
        good2: 230,
        great2: 270 - zonegreat,
        great2end: 270+zonegreat,
        end2: 310,
    };
    store.state.gameStatus.now.wiggle.data=drawValues;
    var counterClockwise = false;
    context.clearRect(0, 0, canvas.width, canvas.height)

    // circle element1
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.end2),
        rad(drawValues.good1),
        counterClockwise
    )

    context.lineWidth = 2
    context.strokeStyle = color
    context.stroke()
    // circle element2
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.end1),
        rad(drawValues.good2),
        counterClockwise
    )

    context.lineWidth = 2
    context.strokeStyle = color
    context.stroke()


    // border bottom1
    context.beginPath()
    context.arc(
        x,
        y,
        radius - sSize,
        rad(drawValues.good1),
        rad(drawValues.end1),
        counterClockwise
    )
    context.lineWidth = lineSize
    context.strokeStyle = color
    context.stroke()

    // border bottom2
    context.beginPath()
    context.arc(
        x,
        y,
        radius - sSize,
        rad(drawValues.good2),
        rad(drawValues.end2),
        counterClockwise
    )
    context.lineWidth = lineSize
    context.strokeStyle = color
    context.stroke()

    // border top1
    context.beginPath()
    context.arc(
        x,
        y,
        radius + sSize,
        rad(drawValues.good2),
        rad(drawValues.end2),
        counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = color
    context.stroke()
    // border top2
    context.beginPath()
    context.arc(
        x,
        y,
        radius + sSize,
        rad(drawValues.good1),
        rad(drawValues.end1),
        counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = color
    context.stroke()

    // miniborder right1
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.good1) - 0.02,
        rad(drawValues.good1),
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()
    // miniborder right2
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.good2) - 0.02,
        rad(drawValues.good2),
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()

    // border left1
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.end1),
        rad(drawValues.end1) + 0.02,
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()
    // border left2
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.end2),
        rad(drawValues.end2) + 0.02,
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()
    
    //great1
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.great1),
        rad(drawValues.great1end),
        counterClockwise)

    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()
    //great2
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(drawValues.great2),
        rad(drawValues.great2end),
        counterClockwise)

    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = color
    context.stroke()
    if (firstart){
        dom.callbackComplete = props.callbackComplete;
        skillCheckAnimation.restart()
    }else{
        skillCheckAnimation.pause();
        skillCheckAnimation.reset();
        skillCheckInit();
        skillCheckAnimation.restart()

        //skillCheckAnimation.restart();
    }

}


export {drawWiggleSkillCheck, skillcheckSpawnCoordinates}

