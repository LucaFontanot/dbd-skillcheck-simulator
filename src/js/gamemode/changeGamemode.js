import {notification} from "@/js/library/use";
import {generateKillerPerks} from "@/js/perks";
import {skillCheckInit} from "@/js/skillchecks/dom/skillCheckAnim";
import {getSwitch} from "@/js/library/getSwitch";
import store from "@/store/store";
var first = true;
var changeGameModeFunc = function (mode) {
    if (store.state.gameStatus.now.generatorStarted && !first) {
        notification('Stop your current game then select again')
        return
    }
    if (store.state.gameStatus.now.gameMode !== mode || first) {
        //first = false;
        store.state.gameStatus.now.gameMode = mode

        if (typeof store.state.gameStatus.killerPerks.oppression == "undefined") {
            generateKillerPerks()
        }
        skillCheckInit();

        for (var p in store.state.gameStatus.killerPerks) {
            if (mode === "custom") {
                break;
            }
            store.state.gameStatus.killerPerks[p].active = store.state.gameStatus.killerPerks[p].mode.includes(mode);
        }
        for (var s in store.state.gameStatus.survivorPerks) {
            if (mode === "custom") {
                break;
            }
            store.state.gameStatus.survivorPerks[s].active = store.state.gameStatus.survivorPerks[s].mode.includes(mode);
        }
        getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tokens").val = 0;
        switch (mode) {
            case "easy":
                getSwitch(store.state.gameStatus.survivorPerks.fastTrack, "tokens").val = 21;
                getSwitch(store.state.gameStatus.survivorPerks.stakeOut, "tokens").val = 4;
                getSwitch(store.state.gameStatus.survivorPerks.hyperfocus, "tier").val = 3;
                break;
            case "medium":
                getSwitch(store.state.gameStatus.killerPerks.huntressLullaby, "tokens").val = 3;
                getSwitch(store.state.gameStatus.killerPerks.unnervingPresence, "tier").val = 3;
                break;
            case "hard":
                getSwitch(store.state.gameStatus.killerPerks.huntressLullaby, "tokens").val = 5;
                getSwitch(store.state.gameStatus.killerPerks.unnervingPresence, "tier").val = 3;
                getSwitch(store.state.gameStatus.killerPerks.hexRuin, "tier").val = 3;

                break;
        }
    }
}

export {changeGameModeFunc}