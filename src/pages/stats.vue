<script setup>
  import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  } from 'chart.js'
  import { computed, onMounted, ref } from 'vue'
  import { Bar, Doughnut, Line } from 'vue-chartjs'
  import { clearHistory, getHistory } from '../plugins/store/sessionManager'

  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  )

  const MODE_COLORS = {
    generator: '#4CAF50',
    ds: '#2196F3',
    glyph: '#9C27B0',
    wiggle: '#FF9800',
  }
  const MODE_LABELS = {
    generator: 'Generator',
    ds: 'Decisive Strike',
    glyph: 'Glyph',
    wiggle: 'Wiggle',
  }
  const MODES = ['generator', 'ds', 'glyph', 'wiggle']

  const history = ref([])
  const modeFilter = ref('all')
  const showClearDialog = ref(false)

  onMounted(() => {
    history.value = getHistory()
  })

  const filteredHistory = computed(() =>
    modeFilter.value === 'all'
      ? history.value
      : history.value.filter(s => s.mode === modeFilter.value),
  )

  // ── Summary cards ────────────────────────────────────────────────────────────
  const totalSessions = computed(() => filteredHistory.value.length)

  const overallAccuracy = computed(() => {
    let great = 0
    let total = 0
    for (const s of filteredHistory.value) {
      great += s.results.great
      total += s.results.great + s.results.good + s.results.fail
    }
    return total === 0 ? 0 : Math.round((great / total) * 100)
  })

  const avgDuration = computed(() => {
    if (filteredHistory.value.length === 0) {
      return '–'
    }
    const avg = filteredHistory.value.reduce((sum, s) => sum + s.duration, 0) / filteredHistory.value.length
    return `${Math.round(avg / 1000)}s`
  })

  const completionRate = computed(() => {
    if (filteredHistory.value.length === 0) {
      return 0
    }
    const done = filteredHistory.value.filter(s => s.completed).length
    return Math.round((done / filteredHistory.value.length) * 100)
  })

  // ── Sessions per day (last 30 days) ─────────────────────────────────────────
  function getDayLabels (n) {
    const labels = []
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      labels.push(
        `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`,
      )
    }
    return labels
  }

  function dayKey (ts) {
    const d = new Date(ts)
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  }

  const sessionsPerDayChart = computed(() => {
    const labels = getDayLabels(30)
    const labelSet = new Set(labels)

    const datasets = MODES.map(mode => {
      const counts = {}
      for (const s of history.value) {
        if (s.mode !== mode) {
          continue
        }
        const k = dayKey(s.startTime)
        if (!labelSet.has(k)) {
          continue
        }
        counts[k] = (counts[k] ?? 0) + 1
      }
      return {
        label: MODE_LABELS[mode],
        data: labels.map(l => counts[l] ?? 0),
        borderColor: MODE_COLORS[mode],
        backgroundColor: MODE_COLORS[mode] + '33',
        fill: false,
        tension: 0.3,
      }
    })

    return {
      labels,
      datasets,
    }
  })

  // ── Hit distribution doughnut ────────────────────────────────────────────────
  const hitDistributionChart = computed(() => {
    let great = 0
    let good = 0
    let fail = 0
    for (const s of filteredHistory.value) {
      great += s.results.great
      good += s.results.good
      fail += s.results.fail
    }
    return {
      labels: ['Great', 'Good', 'Fail'],
      datasets: [{
        data: [great, good, fail],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderWidth: 0,
      }],
    }
  })

  // ── Accuracy by mode bar chart ───────────────────────────────────────────────
  const accuracyByModeChart = computed(() => {
    const data = MODES.map(mode => {
      const sessions = history.value.filter(s => s.mode === mode)
      let great = 0
      let total = 0
      for (const s of sessions) {
        great += s.results.great
        total += s.results.great + s.results.good + s.results.fail
      }
      return total === 0 ? 0 : Math.round((great / total) * 100)
    })
    return {
      labels: MODES.map(m => MODE_LABELS[m]),
      datasets: [{
        label: 'Great %',
        data,
        backgroundColor: MODES.map(m => MODE_COLORS[m]),
        borderRadius: 6,
      }],
    }
  })

  // ── Accuracy trend (last 60 sessions) ───────────────────────────────────────
  const accuracyTrendChart = computed(() => {
    const sessions = filteredHistory.value.slice(-60)
    const data = sessions.map(s => {
      const total = s.results.great + s.results.good + s.results.fail
      return total === 0 ? null : Math.round((s.results.great / total) * 100)
    })
    return {
      labels: sessions.map((_, i) => `#${i + 1}`),
      datasets: [{
        label: 'Great %',
        data,
        borderColor: '#00BCD4',
        backgroundColor: '#00BCD422',
        fill: true,
        tension: 0.4,
        spanGaps: true,
        pointRadius: 3,
      }],
    }
  })

  // ── Chart options ────────────────────────────────────────────────────────────
  const lineOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#aaa' }, grid: { color: '#333' } },
      y: { ticks: { color: '#aaa' }, grid: { color: '#333' }, beginAtZero: true },
    },
  }

  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#aaa' }, grid: { color: '#333' } },
      y: {
        ticks: { color: '#aaa', callback: v => `${v}%` },
        grid: { color: '#333' },
        beginAtZero: true,
        max: 100,
      },
    },
  }

  const doughnutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#fff' } } },
  }

  const trendOpts = {
    ...lineOpts,
    scales: {
      ...lineOpts.scales,
      y: {
        ...lineOpts.scales.y,
        max: 100,
        ticks: { color: '#aaa', callback: v => `${v}%` },
      },
    },
  }

  function handleClear () {
    clearHistory()
    history.value = []
    showClearDialog.value = false
  }
</script>

<template>
  <v-container class="stats-page" fluid>
    <v-row align="center" class="mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-bold">
          Your Stats
        </h1>
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="error"
          size="small"
          variant="outlined"
          @click="showClearDialog = true"
        >
          Clear History
        </v-btn>
      </v-col>
    </v-row>

    <!-- Mode filter tabs -->
    <v-tabs v-model="modeFilter" class="mb-6" color="white">
      <v-tab value="all">
        All
      </v-tab>

      <v-tab
        v-for="mode in MODES"
        :key="mode"
        :value="mode"
      >
        {{ MODE_LABELS[mode] }}
      </v-tab>
    </v-tabs>

    <!-- Summary cards -->
    <v-row class="mb-6">
      <v-col
        v-for="card in [
          { label: 'Sessions', value: totalSessions, icon: 'mdi-gamepad-variant' },
          { label: 'Great accuracy', value: overallAccuracy + '%', icon: 'mdi-target' },
          { label: 'Avg duration', value: avgDuration, icon: 'mdi-timer-outline' },
          { label: 'Completion rate', value: completionRate + '%', icon: 'mdi-check-circle-outline' },
        ]"
        :key="card.label"
        cols="6"
        lg="3"
        md="3"
      >
        <v-card class="stat-card pa-4" rounded="lg">
          <div class="d-flex align-center gap-3">
            <v-icon :icon="card.icon" size="32" />

            <div>
              <div class="text-h5 font-weight-bold">
                {{ card.value }}
              </div>

              <div class="text-caption text-medium-emphasis">
                {{ card.label }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="history.length === 0" class="text-center text-medium-emphasis py-16">
      <v-icon class="mb-4" size="64">
        mdi-chart-line
      </v-icon>

      <div class="text-h6">
        No data yet
      </div>

      <div class="text-body-2">
        Play some sessions to see your stats here.
      </div>
    </div>

    <template v-else>
      <!-- Sessions per day -->
      <v-card class="chart-card mb-6 pa-4" rounded="lg">
        <div class="text-subtitle-1 font-weight-medium mb-3">
          Sessions per day (last 30 days)
        </div>

        <div class="chart-container">
          <Line
            :data="sessionsPerDayChart"
            :options="lineOpts"
          />
        </div>
      </v-card>

      <v-row class="mb-6">
        <!-- Hit distribution -->
        <v-col cols="12" md="5">
          <v-card class="chart-card pa-4" height="100%" rounded="lg">
            <div class="text-subtitle-1 font-weight-medium mb-3">
              Hit distribution
            </div>

            <div class="chart-container chart-container--sm">
              <Doughnut
                :data="hitDistributionChart"
                :options="doughnutOpts"
              />
            </div>
          </v-card>
        </v-col>

        <!-- Accuracy by mode -->
        <v-col cols="12" md="7">
          <v-card class="chart-card pa-4" height="100%" rounded="lg">
            <div class="text-subtitle-1 font-weight-medium mb-3">
              Great accuracy by mode
            </div>

            <div class="chart-container chart-container--sm">
              <Bar
                :data="accuracyByModeChart"
                :options="barOpts"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Accuracy trend -->
      <v-card class="chart-card pa-4" rounded="lg">
        <div class="text-subtitle-1 font-weight-medium mb-3">
          Accuracy trend (last 60 sessions)
        </div>

        <div class="chart-container">
          <Line
            :data="accuracyTrendChart"
            :options="trendOpts"
          />
        </div>
      </v-card>
    </template>

    <!-- Clear confirmation dialog -->
    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title>Clear history?</v-card-title>
        <v-card-text>This will permanently delete all your session history. This cannot be undone.</v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn @click="showClearDialog = false">
            Cancel
          </v-btn>

          <v-btn color="error" @click="handleClear">
            Clear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.stats-page {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 48px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
}

.chart-card {
  background: rgba(255, 255, 255, 0.05);
}

.chart-container {
  position: relative;
  height: 280px;
}

.chart-container--sm {
  height: 220px;
}
</style>
