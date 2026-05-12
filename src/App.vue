<template>
  <v-app>
    <v-alert
      class="infobanner"
      type="info"
    >V2 is still under development, some features may not work as expected
      and/or be missing. Please share any feedbacks
      <a href="https://github.com/LucaFontanot/dbd-skillcheck-simulator/issues">on github</a>
      by opening an issue</v-alert>

    <v-app-bar class="mobile" prominent style="z-index: 106">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>Skill Check Trainer</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" style="top: 0; height: 100%">
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-circle-outline"
          title="Account"
        />
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item title="Custom mode" to="/">
          <template #prepend>
            <img
              src="@/assets/icons/generator.png"
              style="margin-right: 32px"
              width="24px"
            >
          </template>
        </v-list-item>

        <v-list-item title="Decisive Strike" to="/ds">
          <template #prepend>
            <img
              src="@/assets/icons/decisiveStrike.png"
              style="margin-right: 32px"
              width="24px"
            >
          </template>
        </v-list-item>

        <v-list-item title="Glyph" to="/gliph">
          <template #prepend>
            <img
              src="@/assets/icons/glyph.png"
              style="margin-right: 32px"
              width="24px"
            >
          </template>
        </v-list-item>

        <v-list-item title="Wiggle" to="/wiggle">
          <template #prepend>
            <img
              src="@/assets/icons/wiggle.png"
              style="margin-right: 32px"
              width="24px"
            >
          </template>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-tune"
          title="Modifiers"
          to="/modifiers"
        />

        <v-list-item
          prepend-icon="mdi-chart-line"
          title="Your stats"
          to="/stats"
        />

        <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
          to="/settings"
        />

        <v-list-item
          prepend-icon="mdi-information-outline"
          title="Privacy & Terms And Condition"
        />

        <v-list-item
          prepend-icon="mdi-skip-backward-outline"
          title="Old version"
          @click="old"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { controllerInit } from './plugins/controller'
  import GameState from './plugins/store/gameState'

  const drawer = ref(true)

  function old () {
    window.location.href = 'https://dbd.lucaservers.com'
  }

  function load () {
    if (GameState.pinia === null) {
      return setTimeout(load, 100)
    }
    const state = GameState.getState()
    document.addEventListener('contextmenu', e => {
      if (state.settings.mouse) {
        e.preventDefault()
        document.dispatchEvent(new Event('skillchedkClick'))
      }
      return false
    })
    window.addEventListener('wheel', e => {
      if (state.settings.wheel) {
        e.preventDefault()
        document.dispatchEvent(new Event('skillchedkClick'))
      }
    })
    let isDown = false
    window.addEventListener('mousedown', e => {
      if (state.settings.mouse && !isDown) {
        e.preventDefault()
        document.dispatchEvent(new Event('skillchedkClick'))
        isDown = true
      }
    })
    window.addEventListener('mouseup', e => {
      isDown = false
    })
    let isTouchDown = false
    window.addEventListener('touchstart', e => {
      if (state.settings.click && !isTouchDown) {
        e.preventDefault()
        document.dispatchEvent(new Event('skillchedkClick'))
        isTouchDown = true
      }
    })
    window.addEventListener('touchend', e => {
      isTouchDown = false
    })
    let isKeyDown = false
    window.addEventListener('keydown', e => {
      if (
        state.settings.keyboard.startKey === e.code
        && (state.playStatus === 'stop' || state.playStatus === 'pause')
      ) {
        state.playStatus = 'start'
      } else if (
        state.settings.keyboard.stopKey === e.code
        && (state.playStatus === 'start' || state.playStatus === 'pause')
      ) {
        state.playStatus = 'stop'
      }
      if (state.settings.keyboard.keys.includes(e.code) && !isKeyDown) {
        document.dispatchEvent(new Event('skillchedkClick'))
        isKeyDown = true
      }
    })
    window.addEventListener('keyup', e => {
      isKeyDown = false
    })
    if (state.settings.specialMouse) {
      history.pushState(null, null, location.href)
      window.addEventListener('popstate', function () {
        history.go(1)
      })
    } else {
      window.addEventListener('popstate', function () {})
    }
    controllerInit()
  }

  onMounted(() => {
    load()
  })
</script>
<style scoped>
@media only screen and (max-width: 1280px) {
  .mobile {
    display: block !important;
  }
}

.mobile {
  display: none;
}
.infobanner {
  position: fixed;
  height: 100px;
  max-width: 700px;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  opacity: 0.5;
}
</style>
