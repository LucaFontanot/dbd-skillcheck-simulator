// import {updateDomData} from './dom.js'
import {gameOptions} from '@/js/status/options.js'
import {playerRateStatus} from '@/js/playerStats.js'
import {damageGenerator} from '@/js/gamemode/generator/damageGen.js'
import playTrack from '@/js/sound.js'
import {dom} from "@/js/skillchecks/dom/domElements";
import store from '@/store/store'

import {combo} from '@/js/combo.js'

import {skillcheckSpawnCoordinates} from '@/js/drawSkillCheck.js'
import {getSwitch} from "@/js/library/getSwitch";


const score = (status) => {
    playTrack(status)
    // Decisive Strike SKILLCHECKS
    store.state.playerStats.latestGame[status] += 1
    switch (store.state.gameStatus.now.gameMode){
        case "glyph":
            var timedif2 = new Date().getTime() - store.state.gameStatus.now.glyph.last ;
            timedif2 = parseInt(timedif2);
            if (timedif2 > (1100*5)){
                store.state.playerStats.stats.glyphGood += 1
                combo(true)
                store.commit('updateObjectivePoints',
                    {
                        objective: `Glyph`,
                        points: `+ 1500`
                    })
                dom.callbackComplete();
                store.state.playerStats.stats.bloodpoints += 1500;
                playerRateStatus(['glyphGood', 'glyphFailed'], ['rateGlyphGood', 'rateGlyphFailed']);

            }
            if (status != 'good') {
                store.state.playerStats.stats.glyphFailed += 1
                dom.callbackComplete(false);
                playerRateStatus(['glyphGood', 'glyphFailed'], ['rateGlyphGood', 'rateGlyphFailed']);

            }

            break;
        case "wiggle":
            var timedif = new Date().getTime() - store.state.gameStatus.now.wiggle.last ;
            timedif = parseInt(timedif);
            if (timedif > (1100*15)){
                store.state.playerStats.stats.escaped += 1
                store.commit('updateObjectivePoints',
                    {
                        objective: `Wiggle`,
                        points: `+ 3000`
                    })
                //dom.callbackComplete();
                store.state.playerStats.stats.bloodpoints += 3000;
                //playerRateStatus(['glyphGood', 'glyphFailed'], ['rateGlyphGood', 'rateGlyphFailed']);
                dom.callbackComplete(false);
            }
            if (status === 'great') {
                combo(true)

                store.state.playerStats.stats.wiggleGreat += 1
                store.state.gameStatus.now.wiggle.combo++;

            }else if (status === 'good') {
                combo(false)

                store.state.playerStats.stats.wiggleGood += 1
                store.state.gameStatus.now.wiggle.combo=0;
            }else{
                combo(false)

                store.state.playerStats.stats.wiggleFail += 1
                store.state.gameStatus.now.wiggle.combo=0;
            }
            playerRateStatus(['wiggleGreat','wiggleGood', 'wiggleFail'], ['ratewiggleGreat','ratewiggleGood', 'ratewiggleFail']);
            break;
        case "ds":
            if (status == 'great') {
                store.state.playerStats.stats.dsEscape += 1
                // base points + 50 * combo points, starting from the second combo point
                const points = gameOptions.dsEscape + (store.state.playerStats.stats.rowScore * 50)
                combo(true)
                store.commit('updateObjectivePoints',
                    {
                        objective: `Decisive Strike`,
                        points: `+ ${points}`
                    })

                store.state.playerStats.stats.bloodpoints += points
            }else{
                store.state.playerStats.stats.dsFailed += 1
                combo(false)
                store.state.playerStats.stats.bloodpoints += gameOptions.dsFailed
            }
            playerRateStatus(['dsEscape', 'dsFailed'], ['rateDsEscape', 'rateDsFailed']);

            break;
        case "easy":
        case "medium":
        case "hard":
        case "custom":
            var points;
            var isBrand = false;
            if (store.state.gameStatus.item) {
                const itemOn = store.state.playerItems.equipedItems
                const addOns = itemOn.addOns
                if (addOns.length > 0) {
                    for (var i = 0;i<addOns.length;i++) {
                        if (addOns[i].name === "brandNewPart") {
                            if (addOns[i].customProp.left > 0) {
                                addOns[i].customProp.left--;
                                isBrand = addOns[i].customProp.tickProgression;
                            }
                            if (addOns[i].customProp.left <= 0) {
                                addOns.splice(i,1);
                                i--;
                            }
                        }
                    }
                }
            }
            if (status == 'failed') {
                damageGenerator((10 / 100) * 80) // damage 10% from the generator
            }

            if (status == 'good') {

                if (skillcheckSpawnCoordinates.mode == 'hex') {
                    damageGenerator(((getSwitch(store.state.gameStatus.killerPerks.hexRuin, "tier").val + 2)  / 100) * 80) // damage 5% from the generator
                } else{
                    store.commit('updateObjectivePoints',
                        {
                            objective: `${status} skill check`.toUpperCase(),
                            points: `+ ${50}`
                        })
                }

            }
            if (status == 'great') {
                // base points + 50 * combo points, starting from the second combo point
                points = gameOptions[status] + (store.state.playerStats.stats.rowScore * 50)
                combo(true)
                // add bonus points in order to complete a generator 'x%' faster
                if (store.state.gameStatus.survivorPerks.fastTrack.active && getSwitch(store.state.gameStatus.survivorPerks.fastTrack, "tokens").val>0){
                    store.state.gameStatus.now.charges += (getSwitch(store.state.gameStatus.survivorPerks.fastTrack, "tokens").val / 100) * 80
                    getSwitch(store.state.gameStatus.survivorPerks.fastTrack, "tokens").val=0;
                }
                if (isBrand){
                    store.state.gameStatus.now.charges += (isBrand / 100) * 80
                }else if(store.state.gameStatus.survivorPerks.hyperfocus.active){
                    let tier = getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tier").val ;
                    let tokens = getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tokens").val;
                    let extraPerc = 1 + ((tier*10)*tokens)/100;
                    store.state.gameStatus.now.charges += (extraPerc / 100) * 80
                    getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tokens").val++;
                }else if (!isBrand &&!store.state.gameStatus.now.brokeGeneratorEffect && !store.state.gameStatus.now.brokeGeneratorEffectRunning && skillcheckSpawnCoordinates.mode !== 'hex') {
                    store.state.gameStatus.now.charges += (1 / 100) * 80 // add 1% bonus
                }
                store.commit('updateObjectivePoints',
                    {
                        objective: 'GREAT SKILL CHECK',
                        points: `+ ${ points}`
                    })

            } else{
                getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tokens").val = 0;
                points = gameOptions[status]
                combo(false)
            }



            // update player score
            store.state.playerStats.stats[`${status}Score`] += 1
            store.state.playerStats.stats.bloodpoints += points

            playerRateStatus(
                ['greatScore', 'goodScore', 'failedScore'],
                ['rateGreatScore', 'rateGoodScore', 'rateFailedScore']
            )
            break;
    }



} 


const checkNeedlePos = (pos) => {
        switch (store.state.gameStatus.now.gameMode){
            case "easy":
            case "medium":
            case "hard":
            case "custom":
            case "ds":
                if (skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start <= pos && pos <= skillcheckSpawnCoordinates.greatSkillCheckCoordinates.end) {
                    score('great')
                } else if (skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start < pos && pos <= skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) {
                    if (store.state.gameStatus.survivorPerks.stakeOut.active && getSwitch(store.state.gameStatus.survivorPerks.stakeOut, "tokens").val>0){
                        getSwitch(store.state.gameStatus.survivorPerks.stakeOut, "tokens").val--;
                        score('great')
                    }else{
                        score('good')
                    }
                } else {
                    score('failed')
                }
                break;
            case "wiggle":
                if ((store.state.gameStatus.now.wiggle.data.great1<=pos && store.state.gameStatus.now.wiggle.data.great1end >=pos)||
                    (store.state.gameStatus.now.wiggle.data.great2<=pos && store.state.gameStatus.now.wiggle.data.great2end >=pos)){
                    score('great')

                }else if ((store.state.gameStatus.now.wiggle.data.good1<= pos && store.state.gameStatus.now.wiggle.data.great1>=pos) ||
                    (store.state.gameStatus.now.wiggle.data.great1end <= pos && store.state.gameStatus.now.wiggle.data.end1 >=pos) ||
                    (store.state.gameStatus.now.wiggle.data.good2<= pos && store.state.gameStatus.now.wiggle.data.great2>=pos) ||
                    (store.state.gameStatus.now.wiggle.data.great2end <= pos && store.state.gameStatus.now.wiggle.data.end2 >=pos)
                ){
                    score('good')
                }else{
                    score('failed')
                }
                break;

            case "glyph":
                if (skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start < pos && pos <= skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) {
                    score('good')
                } else {
                    score('failed')
                }
                break;
        }
}

export {checkNeedlePos}
