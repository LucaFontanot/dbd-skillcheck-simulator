<script setup lang="ts">

import {onMounted, ref} from "vue";
import GameState from "../plugins/store/gameState";

const state: any = ref({
  perks: {}
});
const statics: any = ref({
  perks: {}
})
const perkDialog = ref(false);

function save() {
  GameState.saveState()
}

function getImage(name: string) {
  return new URL(name, import.meta.url).href;
}

onMounted(() => {
  state.value = GameState.getState();
  statics.value = GameState.getStatics();
  console.log('mounted')
})
</script>

<template>
  <v-dialog v-model="perkDialog">
    <v-card>
      <v-card-title class="text-center">
        <h1>Perks</h1>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center flex-wrap">
          <div v-for="perk in statics.perks" :key="perk" class="align-self-baseline text-center ma-3"
               style="width: 230px">
            <v-tooltip
            >
              <template v-slot:activator="{ props }">
                <div @click="state.perks[perk.prop].active=!state.perks[perk.prop].active">
                  <v-badge icon="mdi-chevron-triple-down" v-if="perk.type === 'debuff'" color="red-darken-4">
                    <img v-bind="props" :src="getImage(perk.icon)" style="width: 80px; position: absolute"/>
                    <img src="@/assets/icons/debuff_combo.png" style="width: 80px;">
                  </v-badge>
                  <v-badge icon="mdi-chevron-triple-up" v-else-if="perk.type === 'buff'" color="blue-darken-1">
                    <img v-bind="props" :src="getImage(perk.icon)" style="width: 80px; position: absolute"/>
                    <img src="@/assets/icons/buff_combo.png" style="width: 80px;">
                  </v-badge>
                </div>
              </template>
              <p v-html="perk.tip.replace(/\n/g,'<br>')"></p>

            </v-tooltip>
            <v-switch v-model="state.perks[perk.prop].active" inset color="primary" style="width: 100%"
                      :label="perk.name" class="pa-3" @update:model-value="save"></v-switch>
            <v-select
              class="pl-5 pr-5"
              v-if="perk.hasOwnProperty('tokenRange')"
              label="Tokens"
              :items="perk.tokenRange"
              v-model="state.perks[perk.prop].tokens"
              @update:model-value="save"
            ></v-select>
            <v-select
              class="pl-5 pr-5"
              v-if="perk.hasOwnProperty('tierRange')"
              label="Tier"
              :items="perk.tierRange"
              v-model="state.perks[perk.prop].tier"
              @update:model-value="save"
            ></v-select>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="100%" @click="perkDialog=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="fix">
    <v-tooltip text="Perks">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" variant="outlined" @click="perkDialog=true">
          <img src="@/assets/icons/perks.webp" class="addon"/>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.fix {
  position: fixed;
  right: 10px;
  top: calc(50% + 37px);
}

.addon {
  width: 40px;
}
</style>
