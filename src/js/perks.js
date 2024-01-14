import store from '@/store/store'
import {changeGameModeFunc} from "@/js/gamemode/changeGamemode";

const perks = {
    killer: {
        hexRuin: {
            name: "[old] Hex: Ruin",
            mode:["hard"],
            icon: 'hexRuin',
            switches:[
                {
                    type:"int",
                    from:1,
                    to:3,
                    val:1,
                    name:"Tier",
                    attr:"tier",
                    display: false
                }
            ],
        },
        oppression: {
            name:"Opression / Overcharge",
            icon: 'oppression',
            mode:[],
            switches:[]
        },
        huntressLullaby: {
            mode:["medium","hard"],
            name:"Hex: Huntress Lullaby",
            switches:[
                {
                    type:"int",
                    from:0,
                    to:5,
                    val:0,
                    name:"Tokens",
                    attr:"tokens",
                    display:true
                }
            ],
            icon: 'huntressLullaby'
        },
        unnervingPresence: {
            mode:["medium","hard"],
            name:"Hex: Unnerving Presence",
            switches:[
                {
                    type:"int",
                    from:1,
                    to:3,
                    val:1,
                    name:"Tier",
                    attr:"tier",
                    display: true
                }
            ],
            icon: 'unnervingPresence',
        },
        coulrophobia: {
            mode:[],
            name:"Coulrophobia",
            switches:[

            ],
            icon: 'coulrophobia',
        }
    },
    survivor:{
        deadline:{
            mode: ["hard"],
            name: "Deadline",
            switches:[],
            icon: 'deadline'
        },
        thisIsNotHappening: {
            mode:["easy"],
            name:"This Is Not Happening",
            switches:[

            ],
            icon: 'thisIsNotHappening',
        },
        stakeOut: {
            mode:["easy"],
            name:"Stake Out",
            switches:[
                {
                    type:"int",
                    from:1,
                    to:4,
                    val:1,
                    name:"Tokens",
                    attr:"tokens",
                    display: true
                }
            ],
            icon: 'stakeOut',
        },
        fastTrack : {
            mode:["easy"],
            name:"Fast Track",
            switches:[
                {
                    type:"int",
                    from:1,
                    to:27,
                    val:1,
                    name:"Tokens",
                    attr:"tokens",
                    display: true
                }
            ],
            icon: 'fastTrack',
        },
        hyperfocus : {
            mode:["medium","hard"],
            name:"Hyperfocus",
            switches:[
                {
                    type:"int",
                    from:1,
                    to:3,
                    val:1,
                    name:"Tier",
                    attr:"tier",
                    display: false
                },
                {
                    type:"int",
                    from:0,
                    to:60,
                    val:0,
                    name:"Tokens",
                    attr:"tokens",
                    display:true
                }
            ],
            icon: 'hyperfocus',
        }
    }
}


const generateKillerPerks = () => {
    let possiblePerks = Object.keys(perks.killer)
    let killerPerks = {}
    for (let index = 0; index < possiblePerks.length; index++) {
        let currentPerk = possiblePerks[index]

        killerPerks[currentPerk] = perks.killer[possiblePerks[index]]
        killerPerks[currentPerk]["active"]=false;
    }
    store.state.gameStatus.killerPerks = killerPerks
    let survPossiblePerks = Object.keys(perks.survivor)
    let survivorPerks = {}
    for (let index = 0; index < survPossiblePerks.length; index++) {
        let currentPerk = survPossiblePerks[index]
        survivorPerks[currentPerk] = perks.survivor[survPossiblePerks[index]]
        survivorPerks[currentPerk]["active"]=false;

    }
    store.state.gameStatus.survivorPerks = survivorPerks
    changeGameModeFunc("easy");
}

export {perks, generateKillerPerks}
