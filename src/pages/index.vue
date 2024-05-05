<template>
  <div>
    <canvas ref="skillCheck" class="skillcheck hidden" height="200" width="200"></canvas>
    <modifiers></modifiers>
    <perks></perks>
    <perkshud :show-effects="true" :show-perks="true"></perkshud>
    <startstop v-model="state.playStatus" :on-start="startGame" :on-stop="stopGame" :on-pause="pauseGame"
               :on-resume="resumeGame"></startstop>
    <div class="progress" v-if="state.playStatus === 'start'">
      <v-progress-linear color="grey-lighten-4" :model-value="ticks" :max="maxTicks" :height="12"></v-progress-linear>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import Skillcheck from "@/plugins/drawer/skillcheck";
import GameState from "../plugins/store/gameState";
import {addGenerator} from "../plugins/store/statsManager";
import Assets from "../plugins/drawer/assets";

let skillCheck = ref(null);
let state: any = ref({});
const maxTicks = ref(1000);
const tickTime = ref(500);
const pauseTicks = ref(0);
const ticks = ref(0);
const nextSkillCheck = ref(1000);
let d = null;
async function getAudio(name: string): Promise<HTMLAudioElement> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const audio = new Audio();
    audio.oncanplay = function () {
      resolve(audio);
    }
    audio.src = await Assets.getAsset(name);
  });
}

async function endGame() {
  let gen = await getAudio('generator_done');
  gen.volume = state.value.settings.surround / 100;
  gen.play();
  ticks.value = 0;
  nextSkillCheck.value = 1000;
  addGenerator();
  tick();
}

function randomIntInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function tick() {
  if (state.value.playStatus === 'start') {
    if (pauseTicks.value > 0) {
      setTimeout(tick, pauseTicks.value);
      return pauseTicks.value = 0;
    }
    ticks.value += tickTime.value;
    nextSkillCheck.value -= tickTime.value;
    if (ticks.value >= maxTicks.value) {
      return endGame();
    }
    //if 90%
    if (ticks.value >= maxTicks.value * 0.9) {
      //todo

    }
    if (nextSkillCheck.value <= 0) {
      nextSkillCheck.value = 5000;
      d.drawGeneratorSkillcheck({
        greatSize: 10,
        goodSize: 50,
        perks: null,
        modifiers: null,
        autoApplyModifiers: true,
        autoApplyPerks: true,
        color: 'white',
      })
      d.animateGenerator({
        maxrotation: 360,
        onSuccess: (status: string) => {
          nextSkillCheck.value = randomIntInterval(500, state.value.modifiers.frequency);
          d.playStatusSound(status);
          if (status === "fail") {
            getAudio('generator_explode').then((audio) => {
              audio.volume = state.value.settings.surround / 100;
              audio.play();
            });
            d.shake(300);
            let decrease = 5000;
            if (state.value.perks.deadline.active) {
              decrease = decrease * 0.5;
            }
            ticks.value = Math.max(1, ticks.value - decrease);
            pauseTicks.value = 2000;
            if (state.value.perks.hyperfocus.active && state.value.perks.hyperfocus.tokens>0) {
              state.value.perks.hyperfocus.tokens=0;
            }
          } else if (status === "great") {
            let increase = 1000;
            console.log(state.value.perks.hyperfocus.active, state.value.perks.hyperfocus.tokens)
            if (state.value.perks.hyperfocus.active && state.value.perks.hyperfocus.tokens>0) {
              increase += maxTicks.value * (0.04 * state.value.perks.hyperfocus.tokens);
              state.value.perks.hyperfocus.tokens++;
            }
            console.log(state.value.perks.fasttrack.active, state.value.perks.fasttrack.tokens)
            if (state.value.perks.fasttrack.active && state.value.perks.fasttrack.tokens>0){
              increase += maxTicks.value * (0.01 * state.value.perks.fasttrack.tokens);
              state.value.perks.fasttrack.tokens=0;
            }
            ticks.value+=increase;
          } else if (status === "good") {
            if (state.value.perks.ruin.active){
              ticks.value-= (ticks.value)*((2+state.value.perks.ruin.tier)/100);
              pauseTicks.value = 600;
            }
            if (state.value.perks.hyperfocus.active && state.value.perks.hyperfocus.tokens>0) {
              state.value.perks.hyperfocus.tokens=0;
            }
          }
        },
      });
    }

  }
  if (state.value.playStatus === 'stop') {
    return;
  }
  setTimeout(tick, tickTime.value);
}

function startGame() {
  state.value.playStatus = 'start';
  ticks.value = 0;
  nextSkillCheck.value = 1000;
  d = new Skillcheck(skillCheck.value);
  tick();
}

function stopGame() {
  state.value.playStatus = 'stop';
}

function pauseGame() {
  state.value.playStatus = 'pause';
}

function resumeGame() {
  state.value.playStatus = 'start';
}

onMounted(() => {
  state.value = GameState.getState();
  state.value.playStatus = 'stop';
  maxTicks.value = state.value.modifiers.gentime;
  //maxTicks.value = 9000;
})
</script>

<style scoped>
.skillcheck {
  position: fixed;
  top: calc(50% - 100px);
  left:  calc(50% - 100px);
  z-index: 1000;
}

.progress {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 1000;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.1s, opacity 0.1s linear;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s linear;
}
.shake {
  animation: horizontal-shaking 0.3s infinite;
}
@keyframes horizontal-shaking {
  0% { transform: translateX(0) }
  25% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  75% { transform: translateX(5px) }
  100% { transform: translateX(0) }
}
</style>
