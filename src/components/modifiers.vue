<script setup lang="ts">

import {onMounted, ref} from "vue";
import GameState from "../plugins/store/gameState";

const state: any = ref({
  effects: {}
});
const statics: any = ref({
  effects: {}
})
const effectDialog = ref(false);

function save() {
  GameState.saveState()
}

function getImage(name: string) {
  return new URL(name, import.meta.url).href;
}

onMounted(() => {
  state.value = GameState.getState();
  statics.value = GameState.getStatics();
})
</script>

<template>
  <v-dialog v-model="effectDialog">
    <v-card>
      <v-card-title class="text-center">
        <h1>Effects</h1>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center flex-wrap">
          <div v-for="effect in statics.effects" :key="effect" class="align-self-baseline text-center ma-3"
               style="width: 230px">
            <v-tooltip
            >
              <template v-slot:activator="{ props }">
                <div @click="state.effects[effect.prop].active=!state.effects[effect.prop].active">
                  <v-badge icon="mdi-chevron-triple-down" v-if="effect.type === 'debuff'" color="red-darken-4">
                    <img v-bind="props" :src="getImage(effect.icon)" style="width: 80px; position: absolute"/>
                    <img src="@/assets/icons/debuff_combo.png" style="width: 80px;">
                  </v-badge>
                  <v-badge icon="mdi-chevron-triple-up" v-else-if="effect.type === 'buff'" color="blue-darken-1">
                    <img v-bind="props" :src="getImage(effect.icon)" style="width: 80px; position: absolute"/>
                    <img src="@/assets/icons/buff_combo.png" style="width: 80px;">
                  </v-badge>
                </div>
              </template>
              <p v-html="effect.tip.replace(/\n/g,'<br>')"></p>

            </v-tooltip>
            <v-switch v-model="state.effects[effect.prop].active" inset color="primary" style="width: 100%"
                      :label="effect.name" class="pa-3" @update:model-value="save"></v-switch>
            <v-select
              class="pl-5 pr-5"
              v-if="effect.hasOwnProperty('tokenRange')"
              label="Tokens"
              :items="effect.tokenRange"
              v-model="state.effects[effect.prop].tokens"
              @update:model-value="save"
            ></v-select>
            <v-select
              class="pl-5 pr-5"
              v-if="effect.hasOwnProperty('tierRange')"
              label="Tier"
              :items="effect.tierRange"
              v-model="state.effects[effect.prop].tier"
              @update:model-value="save"
            ></v-select>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="100%" @click="effectDialog=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="fix">
    <v-tooltip text="Effects">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" variant="outlined" @click="effectDialog=true">
          <img src="@/assets/icons/madness.webp" class="addon"/>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.fix {
  position: fixed;
  right: 10px;
  top: calc(50% - 37px);
}

.addon {
  width: 40px;
}
</style>
