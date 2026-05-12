<script setup>
  import { onMounted, ref } from 'vue'
  import GameState from '../plugins/store/gameState'

  defineProps({
    showPerks: Boolean,
    showEffects: Boolean,
  })
  const perks = ref({
    perks: {},
    state: {},
  })
  const effects = ref({
    effects: {},
    state: {},
  })

  function getImage (name) {
    // return new URL(name, import.meta.url).href;
    return name
  }

  onMounted(() => {
    perks.value.perks = GameState.getStatics().perks
    perks.value.state = GameState.getState().perks
    effects.value.effects = GameState.getStatics().effects
    effects.value.state = GameState.getState().effects
  })
</script>

<template>
  <div class="effectpos">
    <div v-if="showEffects" class="d-flex justify-center flex-wrap">
      <div
        v-for="effect in effects.effects"
        :key="effect"
        class="align-self-baseline text-center"
      >
        <div v-if="effects.state[effect.prop].active" style="width: 70px">
          <div v-if="effects.state[effect.prop].tokens">
            <v-badge v-if="effect.type === 'debuff'" color="red-darken-4">
              <img
                :src="getImage(effect.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/debuff_combo.png" style="width: 60px">

              <template #badge>{{
                effects.state[effect.prop].tokens
              }}</template>
            </v-badge>

            <v-badge
              v-else-if="effect.type === 'buff'"
              color="blue-darken-1"
              :content="effects.state[effect.prop].tokens"
            >
              <img
                :src="getImage(effect.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/buff_combo.png" style="width: 60px">
            </v-badge>
          </div>

          <div v-else>
            <div v-if="effect.type === 'debuff'">
              <img
                :src="getImage(effect.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/debuff_combo.png" style="width: 60px">
            </div>

            <div v-else-if="effect.type === 'buff'">
              <img
                :src="getImage(effect.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/buff_combo.png" style="width: 60px">
            </div>
          </div>

          <p style="font-size: 10px">{{ effect.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="perkspos">
    <div v-if="showPerks" class="d-flex justify-center flex-wrap">
      <div
        v-for="perk in perks.perks"
        :key="perk"
        class="align-self-baseline text-center"
      >
        <div v-if="perks.state[perk.prop].active" style="width: 70px">
          <div v-if="perks.state[perk.prop].tokens">
            <v-badge v-if="perk.type === 'debuff'" color="red-darken-4">
              <img
                :src="getImage(perk.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/debuff_combo.png" style="width: 60px">

              <template #badge>{{
                perks.state[perk.prop].tokens
              }}</template>
            </v-badge>

            <v-badge
              v-else-if="perk.type === 'buff'"
              color="blue-darken-1"
              :content="perks.state[perk.prop].tokens"
            >
              <img
                :src="getImage(perk.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/buff_combo.png" style="width: 60px">
            </v-badge>
          </div>

          <div v-else>
            <div v-if="perk.type === 'debuff'">
              <img
                :src="getImage(perk.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/debuff_combo.png" style="width: 60px">
            </div>

            <div v-else-if="perk.type === 'buff'">
              <img
                :src="getImage(perk.icon)"
                style="width: 60px; position: absolute"
              >

              <img src="@/assets/icons/buff_combo.png" style="width: 60px">
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
