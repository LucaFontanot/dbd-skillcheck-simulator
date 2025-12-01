<script setup>
import { onMounted, ref } from "vue";
import GameState from "../plugins/store/gameState";
import Assets from "../plugins/drawer/assets";

const modifiers = ref({});
const reset = ref({});

function save() {
  GameState.saveState();
}

async function playandsave(value) {
  const audio = new Audio();
  audio.oncanplay = function () {
    audio.play();
  };
  audio.src = await Assets.getAsset(value);
  save();
}

onMounted(() => {
  modifiers.value = GameState.getState().modifiers;
  reset.value = GameState.getStatics().modifiers;
});
</script>

<template>
  <div class="ma-5">
    <h2 class="text-center mb-5">Modifiers</h2>
    <div class="d-flex justify-center">
      <v-card style="width: 80vw; min-width: 300px">
        <v-card-text>
          <v-alert type="warning" class="mb-5"
            >Those options can significantly change the game experience, and
            make the game unplayable, use them wisely
          </v-alert>
          <h3 class="text-center mb-5">Skill Check Modifiers</h3>
          <v-row>
            <v-col cols="12" md="4">
              <v-label>SkillCheck max delay</v-label>
              <v-slider
                v-model="modifiers.frequency"
                label=""
                thumb-label
                min="2500"
                max="20000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.frequency) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.frequency = reset.frequency"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-label>SkillCheck advertise delay</v-label>
              <v-slider
                v-model="modifiers.advertisetime"
                label=""
                thumb-label
                min="0"
                max="5000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.advertisetime) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.advertisetime = reset.advertisetime"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-label>SkillCheck base speed</v-label>
              <v-slider
                v-model="modifiers.speed"
                thumb-label
                min="0.1"
                max="10"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.speed) }}x</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.speed = reset.speed"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-label>SkillCheck DS Restart Delay</v-label>
              <v-slider
                v-model="modifiers.dstime"
                thumb-label
                min="2200"
                max="10000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.dstime) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.dstime = reset.dstime"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
          </v-row>
          <h3 class="text-center mb-5">Perks Modifiers</h3>
          <v-row>
            <v-col cols="12" md="2">
              <v-number-input
                v-model="modifiers.hyperfocusStacksMax"
                label="Max Hyperfocus stacks"
                min="1"
                color="light-green-lighten-2"
                @update:model-value="save"
                variant="underlined"
              ></v-number-input>
            </v-col>
          </v-row>
          <h3 class="text-center mb-5">Generator modifiers</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-label>Generator time</v-label>
              <v-slider
                v-model="modifiers.gentime"
                thumb-label
                min="10000"
                max="200000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.gentime) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.gentime = reset.gentime"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="modifiers.advertise"
                label="Generator advertise theme"
                thumb-label
                color="light-green-lighten-2"
                variant="underlined"
                @update:model-value="playandsave(modifiers.advertise)"
                :items="[
                  'advertise_01',
                  'advertise_02',
                  'advertise_03',
                  'advertise_04',
                ]"
              >
                <template v-slot:append>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.advertise = reset.advertise"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <h3 class="text-center mb-5">Glyph modifiers</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-label>Glyph Duration</v-label>
              <v-slider
                v-model="modifiers.glyphduration"
                thumb-label
                min="1000"
                max="15000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.glyphduration) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.glyphduration = reset.glyphduration"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-label>Glyph Size</v-label>
              <v-slider
                v-model="modifiers.glyphbasesize"
                thumb-label
                min="20"
                max="100"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.glyphbasesize) }}</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.glyphbasesize = reset.glyphbasesize"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
          </v-row>
          <h3 class="text-center mb-5">Wiggle modifiers</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-label>Wiggle Duration</v-label>
              <v-slider
                v-model="modifiers.wiggleDuration"
                thumb-label
                min="1000"
                max="30000"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.wiggleDuration) }}ms</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.wiggleDuration = reset.wiggleDuration"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-label>Wiggle Great Size</v-label>
              <v-slider
                v-model="modifiers.wiggleGreat"
                thumb-label
                min="0"
                max="45"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.wiggleGreat) }}</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.wiggleGreat = reset.wiggleGreat"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <v-label>Wiggle Good Size</v-label>
              <v-slider
                v-model="modifiers.wiggleGood"
                thumb-label
                min="0"
                max="45"
                color="light-green-lighten-2"
                @update:model-value="save"
              >
                <template v-slot:append>
                  <span>{{ parseInt(modifiers.wiggleGood) }}</span>
                  <v-tooltip>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="flat"
                        @click="modifiers.wiggleGood = reset.wiggleGood"
                        icon
                        v-bind="props"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset default</span>
                  </v-tooltip>
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped></style>
