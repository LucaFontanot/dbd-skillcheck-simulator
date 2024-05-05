import Static from "@/plugins/store/static";
import { defineStore } from 'pinia'

class GameState {
  private gameState: {
    settings: {
      mouse: boolean;
      keyboard: { startKey: string; stopKey: string; keys: any[] };
      controller: { startKey: number; stopKey: number; keys: any[] };
      wheel: boolean;
      sound: number;
      fps: number;
      specialMouse: boolean;
      click: boolean;
      surround: number
    };
    stats: {};
    modifiers: {
      frequency: number;
      speed: number;
      gentime: number;
      advertise: string;
      advertisetime: number;
      dstime: number;
      v: number
      gliphbasesize: number;
      glyphduration: number;
    };
    perks: {};
    effects: {};
    statslog: {};
    currentMode: string,
    playStatus: string,
  };
  pinia = null;

  updateObjProps(obj: any, props: any) {
    for (const key in props) {
      if (typeof props[key] === "object" && !Array.isArray(props[key])) {
        this.updateObjProps(obj[key], props[key]);
        continue;
      }
      obj[key] = props[key];
    }
  }
  getStatics() {
    return Static;
  }
  loadGameState(gst: any) {
    const storage = localStorage.getItem("gameState");
    this.updateObjProps(gst, JSON.parse(storage));
  }
  saveState() {
    localStorage.setItem("gameState", JSON.stringify(this.gameState));
  }
  getState() {
    if (!this.pinia) {
      this.pinia = defineStore('gamestate', {
        state: () => {
          return this.gameState;
        },
      })();
    }
    return this.pinia;
  }
  constructor() {
    this.gameState = {
      stats: {},
      currentMode: "generator",
      playStatus: "stop",
      statslog: {},
      modifiers: JSON.parse(JSON.stringify(this.getStatics().modifiers)),
      effects:{
        madness: {
          active: false
        },
        correctiveaction: {
          active: false
        }
      },
      perks: {
        lullaby: {
          active: false,
          tokens: 5,
          tier: 3,
        },
        oppression: {
          active: false,
        },
        ruin: {
          active: false,
          tier:3
        },
        coulrophobia: {
          active: false,
        },
        unnervingPresence: {
          active: false,
          tier:3
        },
        deadline: {
          active: false,
        },
        thisisnothappening: {
          active: false,
        },
        stakeout: {
          active: false,
          tokens: 4,
        },
        fasttrack: {
          active: false,
          tokens: 27
        },
        hyperfocus: {
          active: false,
          tokens: 0
        },
        mercilessStorm: {
          active: false,
        }
      },
      settings:{
        fps: 120,
        mouse: true,
        specialMouse: false,
        wheel: true,
        click: true,
        sound: 100,
        surround: 100,
        keyboard:{
          startKey: "Enter",
          stopKey: "Enter",
          keys:["Space"],
        },
        controller:{
          startKey: 2,
          stopKey: 2,
          keys:[1],
        },
      }
    }
    this.loadGameState(this.gameState);
  }
}
const gameState = new GameState();

export default gameState;
