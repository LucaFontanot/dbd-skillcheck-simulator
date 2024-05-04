<script setup lang="ts">
defineProps({
  onStart: Function,
  onStop: Function,
  onPause: Function,
  onResume: Function,
})
const model = defineModel()
</script>

<template>
  <div class="fix">
    <div class="d-flex">
      <v-btn variant="outlined" @click="onStart" prepend-icon="mdi-play" class="ma-3" v-if="model==='stop' || model===''">
        START
      </v-btn>
      <v-btn variant="outlined" @click="onStop" prepend-icon="mdi-stop" class="ma-3" v-if="model==='start' || model==='pause'">
        STOP
      </v-btn>
      <v-btn variant="outlined" @click="onPause" prepend-icon="mdi-pause" class="ma-3" v-if="model==='start'">
        PAUSE
      </v-btn>
      <v-btn variant="outlined" @click="onResume" prepend-icon="mdi-play" class="ma-3" v-if="model==='pause'">
        RESUME
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.fix{
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>
