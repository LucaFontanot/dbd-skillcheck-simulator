<template>
  <div>
    <canvas
      ref="skillCheck"
      class="skillcheck hidden"
      height="200"
      width="200"
    />

    <modifiers />
    <perkshud :show-effects="true" :show-perks="false" />

    <startstop
      v-model="state.playStatus"
      :on-pause="pauseGame"
      :on-resume="resumeGame"
      :on-start="startGame"
      :on-stop="stopGame"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import Assets from '@/plugins/drawer/assets'
  import Skillcheck from '@/plugins/drawer/skillcheck'
  import GameState from '@/plugins/store/gameState'
  import {
    endSession,
    recordResult,
    startSession,
  } from '@/plugins/store/sessionManager'
  import { addDs, addDsFail } from '@/plugins/store/statsManager'

  const skillCheck = ref(null)
  const state = ref({})
  const tickTime = ref(500)
  const ticks = ref(0)
  const nextSkillCheck = ref(1000)

  async function getAudio (name) {
    const audio = new Audio()
    const promise = new Promise((resolve, reject) => {
      audio.addEventListener('canplay', function () {
        resolve(audio)
      })
    })
    audio.src = await Assets.getAsset(name)
    return promise
  }

  function randomIntInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function tick () {
    if (state.value.playStatus === 'start') {
      nextSkillCheck.value -= tickTime.value
      if (nextSkillCheck.value <= 0) {
        nextSkillCheck.value = 5000
        const d = new Skillcheck(skillCheck.value)
        d.drawGeneratorSkillcheck({
          goodSize: 0,
          greatSize: 15,
          perks: {},
          modifiers: null,
          autoApplyModifiers: true,
          autoApplyPerks: false,
          color: 'white',
        })
        d.animateGenerator({
          maxrotation: 360,
          onSuccess: status => {
            nextSkillCheck.value = state.value.modifiers.dstime
            d.playStatusSound(status)
            if (status === 'fail') {
              recordResult('fail')
              addDsFail(state.value.effects)
              getAudio('skillcheck_fail').then(audio => {
                audio.volume = state.value.settings.surround / 100
                audio.play()
              })
              d.shake(300)
            } else if (status === 'great') {
              recordResult('great')
              addDs(state.value.effects)
            }
          },
        })
      }
    }
    if (state.value.playStatus === 'stop') {
      return
    }
    setTimeout(tick, tickTime.value)
  }

  function startGame () {
    state.value.playStatus = 'start'
    ticks.value = 0
    nextSkillCheck.value = 1000
    startSession('ds', {}, state.value.effects)
    tick()
  }

  function stopGame () {
    endSession(false)
    state.value.playStatus = 'stop'
  }

  function pauseGame () {
    state.value.playStatus = 'pause'
  }

  function resumeGame () {
    state.value.playStatus = 'start'
  }

  onMounted(() => {
    state.value = GameState.getState()
    state.value.playStatus = 'stop'
  })
</script>

<style scoped>
.skillcheck {
  position: fixed;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  z-index: 1000;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 0.1s,
    opacity 0.1s linear;
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
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
