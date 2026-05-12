<script setup>
  import { onMounted, ref } from 'vue'
  import GameState from '../plugins/store/gameState'

  const state = ref({
    effects: {},
  })
  const statics = ref({
    effects: {},
  })
  const effectDialog = ref(false)

  function save () {
    GameState.saveState()
  }

  function getImage (name) {
    // return new URL(name, import.meta.url).href;
    return name
  }

  onMounted(() => {
    state.value = GameState.getState()
    statics.value = GameState.getStatics()
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
          <div
            v-for="effect in statics.effects"
            :key="effect"
            class="align-self-baseline text-center ma-3"
            style="width: 230px"
          >
            <v-tooltip>
              <template #activator="{ props }">
                <div
                  @click="
                    state.effects[effect.prop].active =
                      !state.effects[effect.prop].active
                  "
                >
                  <v-badge
                    v-if="effect.type === 'debuff'"
                    color="red-darken-4"
                    icon="mdi-chevron-triple-down"
                  >
                    <img
                      v-bind="props"
                      :src="getImage(effect.icon)"
                      style="width: 80px; position: absolute"
                    >

                    <img
                      src="@/assets/icons/debuff_combo.png"
                      style="width: 80px"
                    >
                  </v-badge>

                  <v-badge
                    v-else-if="effect.type === 'buff'"
                    color="blue-darken-1"
                    icon="mdi-chevron-triple-up"
                  >
                    <img
                      v-bind="props"
                      :src="getImage(effect.icon)"
                      style="width: 80px; position: absolute"
                    >

                    <img
                      src="@/assets/icons/buff_combo.png"
                      style="width: 80px"
                    >
                  </v-badge>
                </div>
              </template>

              <p v-html="effect.tip.replace(/\n/g, '<br>')" />
            </v-tooltip>

            <v-switch
              v-model="state.effects[effect.prop].active"
              class="pa-3"
              color="primary"
              inset
              :label="effect.name"
              style="width: 100%"
              @update:model-value="save"
            />

            <v-select
              v-if="effect.hasOwnProperty('tokenRange')"
              v-model="state.effects[effect.prop].tokens"
              class="pl-5 pr-5"
              :items="effect.tokenRange"
              label="Tokens"
              @update:model-value="save"
            />

            <v-select
              v-if="effect.hasOwnProperty('tierRange')"
              v-model="state.effects[effect.prop].tier"
              class="pl-5 pr-5"
              :items="effect.tierRange"
              label="Tier"
              @update:model-value="save"
            />
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn width="100%" @click="effectDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="fix">
    <v-tooltip text="Effects">
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          variant="outlined"
          @click="effectDialog = true"
        >
          <img class="addon" src="@/assets/icons/madness.webp">
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
