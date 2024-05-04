<script setup lang="ts">
import {onMounted, ref} from "vue";
import GameState from "../plugins/store/gameState";
import Assets from "../plugins/drawer/assets";

const modifiers: any = ref({});
const reset: any = ref({});
function save() {
  GameState.saveState()
}
async function playandsave(value: string) {
  const audio = new Audio();
  audio.oncanplay = function () {
    audio.play();
  }
  audio.src = await Assets.getAsset(value);
  save();
}
onMounted(() => {
  modifiers.value = GameState.getState().modifiers;
  reset.value = GameState.getStatics().modifiers;
})
</script>

<template>
  <div class="ma-5">
    <h2 class="text-center mb-5">Modifiers</h2>
    <div class="d-flex justify-center">
      <v-card style="width: 80vw; min-width: 300px;">
        <v-card-text>
          <v-alert type="warning" class="mb-5">Those options can significantly change the game experience, and make the game unplayable, use them wisely</v-alert>
          <h3 class="text-center mb-5">Skill Check Modifiers</h3>
          <v-row>
            <v-col cols="12" md="4">
              <v-slider v-model="modifiers.frequency" label="SkillCheck max delay" thumb-label min="2500" max="20000"
                        color="light-green-lighten-2" @update:model-value="save">
                <template v-slot:append>
                  <span>{{parseInt(modifiers.frequency)}}ms</span>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.frequency = reset.frequency" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-slider v-model="modifiers.advertisetime" label="SkillCheck advertise delay" thumb-label min="0" max="5000"
                        color="light-green-lighten-2" @update:model-value="save">
                <template v-slot:append>
                  <span>{{parseInt(modifiers.advertisetime)}}ms</span>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.advertisetime = reset.advertisetime" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-slider v-model="modifiers.speed" label="SkillCheck base speed" thumb-label min="0.1" max="10"
                        color="light-green-lighten-2" @update:model-value="save">
                <template v-slot:append>
                  <span>{{parseInt(modifiers.speed)}}x</span>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.speed = reset.speed" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-slider v-model="modifiers.dstime" label="SkillCheck DS Restart Delay" thumb-label min="2200" max="10000"
                        color="light-green-lighten-2" @update:model-value="save">
                <template v-slot:append>
                  <span>{{parseInt(modifiers.dstime)}}ms</span>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.dstime = reset.dstime" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
          </v-row>
          <h3 class="text-center mb-5">Generator modifiers</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-slider v-model="modifiers.gentime" label="Generator time" thumb-label min="10000" max="200000"
                        color="light-green-lighten-2" @update:model-value="save">
                <template v-slot:append>
                  <span>{{parseInt(modifiers.gentime)}}ms</span>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.gentime = reset.gentime" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="modifiers.advertise" label="Generator advertise theme" thumb-label
                        color="light-green-lighten-2" @update:model-value="playandsave(modifiers.advertise)"
                        :items="['advertise_01', 'advertise_02', 'advertise_03', 'advertise_04']"
              >
                <template v-slot:append>
                  <v-tooltip >
                    <template v-slot:activator="{ props }">
                      <v-btn variant="flat" @click="modifiers.advertise = reset.advertise" icon v-bind="props">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

  </div>
</template>

<style scoped>

</style>
