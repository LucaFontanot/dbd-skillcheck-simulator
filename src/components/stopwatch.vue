<script setup>
import { ref, computed, onBeforeUnmount } from "vue";

const ticks = ref(0);
const timerId = ref(null);
const isRunning = ref(false);
const stoppedHistory = ref([]);

function formatTicks(t) {
  const totalSeconds = Math.floor(t / 10);
  const tenths = t % 10;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}.${tenths}`;
}

const currentDisplay = computed(() => formatTicks(ticks.value));
const lastStopped = computed(() =>
  stoppedHistory.value.length ? stoppedHistory.value[0] : null,
);
const lastStoppedDisplay = computed(() =>
  lastStopped.value !== null ? formatTicks(lastStopped.value) : null,
);
const diffDisplay = computed(() => {
  if (lastStopped.value === null) return null;
  const diffTicks = ticks.value - lastStopped.value; // negativo se corrente < ultimo fermo
  const sign = diffTicks >= 0 ? "+" : "-";
  const absTicks = Math.abs(diffTicks);
  return `${sign}${formatTicks(absTicks)}`;
});

function start() {
  if (isRunning.value) return;
  timerId.value = window.setInterval(() => {
    ticks.value += 1; // +0.1s
  }, 100);
  isRunning.value = true;
}

function pause() {
  if (timerId.value !== null) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
  isRunning.value = false;
}

function stop() {
  if (ticks.value > 0 || isRunning.value) {
    pause();
    stoppedHistory.value.unshift(ticks.value);
    if (stoppedHistory.value.length > 5) stoppedHistory.value.pop();
    ticks.value = 0;
  }
}

function reset() {
  pause();
  ticks.value = 0;
}

function clearHistory() {
  stoppedHistory.value = [];
}

onBeforeUnmount(() => {
  if (timerId.value !== null) clearInterval(timerId.value);
});

defineExpose({
  start,
  pause,
  stop,
  reset,
  clearHistory,
  getTicks: () => ticks.value,
  isRunning,
  stoppedHistory,
  formatTicks,
});
</script>

<template>
  <div class="stopwatch">
    <div class="displays">
      <div class="current">
        <div class="label">Corrente</div>
        <div class="time">{{ currentDisplay }}</div>
        <div class="status" v-if="isRunning">Running</div>
        <div class="status" v-else>Paused</div>
      </div>

      <div class="last" v-if="lastStoppedDisplay">
        <div class="label">Last time</div>
        <div class="time">{{ lastStoppedDisplay }}</div>
        <div class="diff">
          Difference: <span>{{ diffDisplay }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stopwatch {
  font-family: system-ui, Arial, Helvetica, sans-serif;
  max-width: 420px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.displays {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}
.current,
.last {
  flex: 1;
  padding: 8px;
  background: #fafafa;
  border-radius: 4px;
  text-align: center;
}
.label {
  font-size: 0.85rem;
  color: #666;
}
.time {
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 6px;
}
.status {
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
}
.controls button {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
.controls button:hover {
  background: #f3f3f3;
}
.history ul {
  padding-left: 18px;
  margin: 6px 0 0 0;
}
</style>
