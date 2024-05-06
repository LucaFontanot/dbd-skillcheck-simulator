<script setup lang="ts">
import {onMounted, ref} from "vue";
import GameState from "../plugins/store/gameState";
import Skillcheck from "../plugins/drawer/skillcheck";
import Assets from "../plugins/drawer/assets";
import {addGlyph, addGlyphFail, addGlyphSuccess} from "../plugins/store/statsManager";

let state: any = ref({});
let skillCheck = ref(null);
const maxTicks = ref(1000);
const tickTime = ref(500);
const ticks = ref(0);
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
function stopGame() {
  if (d) {
    d.animate = false;
    d.setDisplay(false);
  }
  state.value.playStatus = 'stop';
}
function tick() {
  if (state.value.playStatus === 'start') {
    ticks.value += tickTime.value;
    if (ticks.value >= maxTicks.value) {
      stopGame();
      addGlyph(state.value.effects)
      setTimeout(() => {
        startGame();
      }, 2000);
      return;
    }
  }
  if (state.value.playStatus === 'stop') {
    return;
  }
  setTimeout(tick, tickTime.value);
}
function startGame() {
  if (state.value.playStatus === 'start') {
    return;
  }
  state.value.playStatus = 'start';
  ticks.value = 0;
  d = new Skillcheck(skillCheck.value);
  d.drawGliphSkillcheck({
    effects: null,
    perks: {},
    autoApplyModifiers: true,
    autoApplyPerks: false,
  })
  let startTime = Date.now() - state.value.modifiers.advertisetime;
  let onSuccess=(status: string, angle: number) => {
    d.playStatusSound(status);
    if (status === "fail") {
      addGlyphFail(state.value.effects);
      getAudio('skillcheck_fail').then((audio) => {
        audio.volume = state.value.settings.surround / 100;
        audio.play();
      });
      d.shake(300);
      d.sleep(200);
      return stopGame()
    } else if (status === "good") {
      addGlyphSuccess(state.value.effects);
      d.drawGliphSkillcheck({
        effects: null,
        perks: {},
        autoApplyModifiers: true,
        autoApplyPerks: false,
      },angle)
      d.animateGliph({
        onSuccess: onSuccess,
        startTime: Date.now(),
        startPos:angle+90
      });
    }
  }
  d.animateGliph({
    onSuccess: onSuccess,
    startTime: startTime,
    startPos:0
  });
  setTimeout(() => {
    tick();
  }, state.value.modifiers.advertisetime);
}

function pauseGame() {
  state.value.playStatus = 'stop';
}

function resumeGame() {
  state.value.playStatus = 'start';
}

onMounted(() => {
  state.value = GameState.getState();
  state.value.playStatus = 'stop';
  maxTicks.value = state.value.modifiers.glyphduration;
})
</script>

<template>
  <div>
    <canvas ref="skillCheck" class="skillcheck hidden" height="200" width="200"></canvas>
    <modifiers></modifiers>
    <perkshud :show-effects="true" :show-perks="false"></perkshud>
    <startstop v-model="state.playStatus" :on-start="startGame" :on-stop="stopGame" :on-pause="pauseGame"
               :on-resume="resumeGame"></startstop>
    <div class="progress" v-if="state.playStatus === 'start'">
      <v-progress-linear color="grey-lighten-4" :model-value="ticks" :max="maxTicks" :height="12"></v-progress-linear>
    </div>
  </div>
</template>

<style scoped>
.skillcheck {
  position: fixed;
  top: calc(50% - 100px);
  left:  calc(50% - 100px);
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
.progress {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 1000;
}
</style>
