<script setup>
  import { onMounted, ref } from 'vue'
  import Stopwatch from '@/components/stopwatch.vue'

  defineProps({
    onStart: Function,
    onStop: Function,
    onPause: Function,
    onResume: Function,
  })
  const model = defineModel()

  const stopwatch = ref(null)

  onMounted(() => {
    console.log('Mounted startstop component')
    console.log(stopwatch.value)
  })
</script>

<template>
  <div class="fix">
    <div class="d-flex">
      <v-btn
        v-if="model === 'stop' || model === ''"
        class="ma-3"
        prepend-icon="mdi-play"
        variant="outlined"
        @click="onStart()"
      >
        START
      </v-btn>

      <v-btn
        v-if="model === 'start' || model === 'pause' || model === 'softStop'"
        class="ma-3"
        prepend-icon="mdi-stop"
        variant="outlined"
        @click="onStop()"
      >
        STOP
      </v-btn>

      <v-btn
        v-if="model === 'start' || model === 'softStop'"
        class="ma-3"
        prepend-icon="mdi-pause"
        variant="outlined"
        @click="onPause()"
      >
        PAUSE
      </v-btn>

      <v-btn
        v-if="model === 'pause'"
        class="ma-3"
        prepend-icon="mdi-play"
        variant="outlined"
        @click="onResume()"
      >
        RESUME
      </v-btn>
    </div>

    <Stopwatch ref="stopwatch" class="d-none" />
  </div>
</template>

<style scoped>
.fix {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>
