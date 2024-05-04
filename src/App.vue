<template>
  <v-app>
    <v-alert type="info" class="infobanner">V2 is still under development, some features may not work as expected and/or be missing. Please share any feedbacks <a href="https://github.com/LucaFontanot/dbd-skillcheck-simulator/issues">on github</a> by opening an issue</v-alert>

    <v-app-bar
      class="mobile"
      prominent
      style="z-index: 106"
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Skill Check Trainer</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      style="top: 0; height: 100%"
    >
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account-circle-outline" title="Account"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          to="/"
          title="Custom mode"
        >
          <template v-slot:prepend>
            <img src="@/assets/icons/generator.png" width="24px" style="margin-right: 32px"/>
          </template>
        </v-list-item>
        <v-list-item
          title="Decisive Strike"
          to="/ds"
        >
          <template v-slot:prepend>
            <img src="@/assets/icons/decisiveStrike.png" width="24px" style="margin-right: 32px"/>
          </template>
        </v-list-item>
        <v-list-item
          title="Glyph"
        >
          <template v-slot:prepend>
            <img src="@/assets/icons/glyph.png" width="24px" style="margin-right: 32px"/>
          </template>
        </v-list-item>
        <v-list-item
          title="Wiggle"
        >
          <template v-slot:prepend>
            <img src="@/assets/icons/wiggle.png" width="24px" style="margin-right: 32px"/>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-tune" title="Modifiers" to="/modifiers"></v-list-item>
        <v-list-item prepend-icon="mdi-chart-line" title="Your stats"></v-list-item>
        <v-list-item prepend-icon="mdi-cog" title="Settings" to="/settings"></v-list-item>
        <v-list-item prepend-icon="mdi-information-outline" title="Privacy & Terms And Condition"></v-list-item>
        <v-list-item prepend-icon="mdi-skip-backward-outline" title="Old version" v-on:click="old"></v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

import {onMounted, ref, watch} from "vue";
import {controllerInit} from "./plugins/controller";
import GameState from "./plugins/store/gameState";

const drawer = ref(true);

function old() {
  window.location.href = 'https://dbd.lucaservers.com'
}

function load() {
  if (GameState.pinia === null) {
    return setTimeout(load, 100);
  }
  const state = GameState.getState();
  document.oncontextmenu = document.body.oncontextmenu = function () {
    if (state.settings.mouse) {
      document.dispatchEvent(new Event('skillchedkClick'));
    }
    return false;
  }
  window.addEventListener("wheel", (e) => {
    if (state.settings.wheel) {
      document.dispatchEvent(new Event('skillchedkClick'));
    }
  })
  window.addEventListener('mousedown', (e) => {
    if (state.settings.mouse) {
      document.dispatchEvent(new Event('skillchedkClick'));
    }
  })
  window.addEventListener('keydown', (e) => {
    if (state.settings.keyboard.startKey === e.code && (state.playStatus === 'stop' || state.playStatus === 'pause')) {
      state.playStatus = 'start';
    } else if (state.settings.keyboard.stopKey === e.code && (state.playStatus === 'start' || state.playStatus === 'pause')) {
      state.playStatus = 'stop';
    }
    if (state.settings.keyboard.keys.includes(e.code)) {
      document.dispatchEvent(new Event('skillchedkClick'));
    }
  })
  if (state.settings.specialMouse) {
    history.pushState(null, null, location.href)
    window.onpopstate = function () {
      history.go(1)
    }
  } else {
    window.onpopstate = function () {

    }
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
