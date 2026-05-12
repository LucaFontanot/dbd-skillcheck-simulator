<script setup>
  import { onMounted, ref } from 'vue'
  import GameState from '../plugins/store/gameState'

  const state = ref({
    perks: {},
  })
  const statics = ref({
    perks: {},
  })
  const perkDialog = ref(false)

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
  <v-dialog v-model="perkDialog">
    <v-card>
      <v-card-title class="text-center">
        <h1>Perks</h1>
      </v-card-title>

      <v-card-text>
        <div class="d-flex justify-center flex-wrap">
          <div
            v-for="perk in statics.perks"
            :key="perk"
            class="align-self-baseline text-center ma-3"
            style="width: 230px"
          >
            <v-tooltip>
              <template #activator="{ props }">
                <div
                  @click="
                    state.perks[perk.prop].active =
                      !state.perks[perk.prop].active
                  "
                >
                  <v-badge
                    v-if="perk.type === 'debuff'"
                    color="red-darken-4"
                    icon="mdi-chevron-triple-down"
                  >
                    <img
                      v-bind="props"
                      :src="getImage(perk.icon)"
                      style="width: 80px; position: absolute"
                    >

                    <img
                      src="@/assets/icons/debuff_combo.png"
                      style="width: 80px"
                    >
                  </v-badge>

                  <v-badge
                    v-else-if="perk.type === 'buff'"
                    color="blue-darken-1"
                    icon="mdi-chevron-triple-up"
                  >
                    <img
                      v-bind="props"
                      :src="getImage(perk.icon)"
                      style="width: 80px; position: absolute"
                    >

                    <img
                      src="@/assets/icons/buff_combo.png"
                      style="width: 80px"
                    >
                  </v-badge>
                </div>
              </template>

              <p v-html="perk.tip.replace(/\n/g, '<br>')" />
            </v-tooltip>

            <v-switch
              v-model="state.perks[perk.prop].active"
              class="pa-3"
              color="primary"
              inset
              :label="perk.name"
              style="width: 100%"
              @update:model-value="save"
            />

            <v-select
              v-if="perk.hasOwnProperty('tokenRange')"
              v-model="state.perks[perk.prop].tokens"
              class="pl-5 pr-5"
              :items="perk.tokenRange"
              label="Tokens"
              @update:model-value="save"
            />

            <v-select
              v-if="perk.hasOwnProperty('tierRange')"
              v-model="state.perks[perk.prop].tier"
              class="pl-5 pr-5"
              :items="perk.tierRange"
              label="Tier"
              @update:model-value="save"
            />
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn width="100%" @click="perkDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="fix">
    <v-tooltip text="Perks">
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          variant="outlined"
          @click="perkDialog = true"
        >
          <img class="addon" src="@/assets/icons/perks.webp">
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
