<template>
  <div ref="skill-check-element" class="skillcheck">
    <div ref="skill-check" class="skillcheckM">
      <div ref="skill-check-needle" class="skillcheck-center">
        <div class="skillcheck-bar"></div>
      </div>
      <div class="skillcheck-button">{{touch? 'Touch': keyboard[stopNeedleKey]+' / '+ mouse + controller || String.fromCharCode(stopNeedleKey) || 'Unknown' }}</div>
      <canvas ref="skill-check-circle" height="145px" width="145px"></canvas>
    </div>
  </div>
</template>

<script>

  import {initDom} from '@/js/skillchecks/dom/domElements'
  import keyCodes from '@/js/events/keyboard.js'
  import {getMap} from '@/js/events/controllerEvent.js'
  import mouseCodes from '@/js/events/mouse.js'
  import {XBOX} from "@/js/events/controller";

  // import {drawSkillCheck} from '@/js/drawSkillCheck.js'

  export default {
    name: 'Skillcheck',
    computed: {
      stopNeedleKey(){
        return this.$store.state.playerSettings.keyboard.skillCheckKey
      },
      keyboard(){
        return keyCodes
      },
      controller(){
        for (let i in getMap()){
          let g = getMap()[i];
          return " / " + g[this.$store.state.playerSettings.controller.skillCheckKey]
        }
        return " / " + XBOX[this.$store.state.playerSettings.controller.skillCheckKey];
      },
      mouse(){
        return mouseCodes.mouseCodes[this.$store.state.playerSettings.mouse.skillCheckKey]
      },
      touch(){
        let s = ('ontouchstart' in document.documentElement || navigator.maxTouchPoints) 
        return s == 1 || s == true ? true: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        initDom('skillcheck', this.$refs)

        console.log(document.querySelector('.skillcheck-center').toDataURL())
      })
    }
  }
  //skill-check-needle to png base64

</script>

<style scoped>
  .skillcheck {

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    height: var(--circle-height);
    width: var(--circle-width);
    z-index: 0;
    /* opacity: 0; */
  }
  
  .skillcheck-center {

    position: absolute;
    height: var(--circle-height);
    width: var(--circle-width);
    z-index: 1;
  }
  
  .skillcheck-bar {
    position: absolute;
    width: var(--skillcheck-bar-width);
    height: var(--skillcheck-bar-height);
    background: var(--skillcheck-bar-gradient);
    bottom: 60%;
    left: calc(50% - (var(--skillcheck-bar-width) / 2));
  }
  
  .skillcheck-button {
    box-shadow: 0 2px 5px 0 rgba(104, 104, 104, 0.4);

    position: absolute;
    color: var(--skillcheck-button-color);
    border: var(--skillcheck-button-border);
    border-radius: var(--skillcheck-button-borderRadius);
    padding: var(--skillcheck-button-padding);
    top: 50%;
    left: 50%;
    background: rgb(44, 44, 44);
    font-size: 13px;
    transform: translate(-50%, -50%);
  }

  .wiggleSkillCheck{
    animation: shake 0.5s cubic-bezier(.4,.1,.2, 1) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% { transform: translate(2px, 2px) rotate(0deg); }
    10% { transform: translate(-2px, -2px) rotate(0deg); }
    20% { transform: translate(-2px, 2px) rotate(0deg); }
    30% { transform: translate(2px, 2px) rotate(0deg); }
    40% { transform: translate(2px, -2px) rotate(0deg); }
    50% { transform: translate(-2px, 2px) rotate(0deg); }
    60% { transform: translate(-2px, 2px) rotate(0deg); }
    70% { transform: translate(2px, 2px) rotate(0deg); }
    80% { transform: translate(-2px, -2px) rotate(0deg); }
    90% { transform: translate(2px, 2px) rotate(0deg); }
    100% { transform: translate(2px, -2px) rotate(0deg); }
  }
</style>
