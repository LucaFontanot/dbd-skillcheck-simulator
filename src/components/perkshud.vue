<script setup lang="ts">
import {onMounted, ref} from "vue";
import GameState from "../plugins/store/gameState";

defineProps({
  showPerks: Boolean,
  showEffects: Boolean,
})
const perks: any = ref({
  perks: {},
  state: {}
})
const effects: any = ref({
  effects: {},
  state: {}
})

function getImage(name: string) {
  return new URL(name, import.meta.url).href;
}

onMounted(() => {
  perks.value.perks = GameState.getStatics().perks;
  perks.value.state = GameState.getState().perks;
  effects.value.effects = GameState.getStatics().effects;
  effects.value.state = GameState.getState().effects;
})
</script>

<template>
  <div class="effectpos">
    <div class="d-flex justify-center flex-wrap" v-if="showEffects">
      <div v-for="effect in effects.effects" :key="effect" class="align-self-baseline text-center">
        <div v-if="effects.state[effect.prop].active" style="width: 70px">
          <div v-if="effects.state[effect.prop].tokens">
            <v-badge v-if="effect.type === 'debuff'" color="red-darken-4">
              <img :src="getImage(effect.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/debuff_combo.png" style="width: 60px;">
              <template v-slot:badge>{{ effects.state[effect.prop].tokens }}</template>
            </v-badge>
            <v-badge :content="effects.state[effect.prop].tokens" v-else-if="effect.type === 'buff'" color="blue-darken-1">
              <img :src="getImage(effect.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/buff_combo.png" style="width: 60px;">
            </v-badge>
          </div>
          <div v-else>
            <div v-if="effect.type === 'debuff'">
              <img :src="getImage(effect.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/debuff_combo.png" style="width: 60px;">
            </div>
            <div v-else-if="effect.type === 'buff'">
              <img :src="getImage(effect.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/buff_combo.png" style="width: 60px;">
            </div>
          </div>

          <p style="font-size: 10px">{{ effect.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="perkspos">
    <div class="d-flex justify-center flex-wrap" v-if="showPerks">
      <div v-for="perk in perks.perks" :key="perk" class="align-self-baseline text-center">
        <div v-if="perks.state[perk.prop].active" style="width: 70px">
          <div v-if="perks.state[perk.prop].tokens">
            <v-badge v-if="perk.type === 'debuff'" color="red-darken-4">
              <img :src="getImage(perk.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/debuff_combo.png" style="width: 60px;">
              <template v-slot:badge>{{ perks.state[perk.prop].tokens }}</template>
            </v-badge>
            <v-badge :content="perks.state[perk.prop].tokens" v-else-if="perk.type === 'buff'" color="blue-darken-1">
              <img :src="getImage(perk.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/buff_combo.png" style="width: 60px;">
            </v-badge>
          </div>
          <div v-else>
            <div v-if="perk.type === 'debuff'">
              <img :src="getImage(perk.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/debuff_combo.png" style="width: 60px;">
            </div>
            <div v-else-if="perk.type === 'buff'">
              <img :src="getImage(perk.icon)" style="width: 60px; position: absolute"/>
              <img src="@/assets/icons/buff_combo.png" style="width: 60px;">
            </div>
          </div>

          <p style="font-size: 10px">{{ perk.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perkspos {
  max-width: 300px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}
.effectpos {
  max-width: 100px;
  position: fixed;
  right: 0px;
  top: calc(50% - 200px);
  transform: translate(0, -50%);
  z-index: 100;
}
</style>
