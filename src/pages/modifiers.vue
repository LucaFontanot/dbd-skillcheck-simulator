<script setup>
  import { onMounted, ref } from 'vue'
  import Assets from '../plugins/drawer/assets'
  import GameState from '../plugins/store/gameState'

  const modifiers = ref({})
  const reset = ref({})

  function save () {
    GameState.saveState()
  }

  async function playandsave (value) {
    const audio = new Audio()
    audio.addEventListener('canplay', function () {
      audio.play()
    })
    audio.src = await Assets.getAsset(value)
    save()
  }

  onMounted(() => {
    modifiers.value = GameState.getState().modifiers
    reset.value = GameState.getStatics().modifiers
  })
</script>

<template>
  <div class="ma-5">
    <h2 class="dbd-page-title mb-7">Modifiers</h2>

    <div class="d-flex justify-center">
      <v-card style="width: 80vw; min-width: 300px">
        <v-card-text>
          <v-alert
            class="mb-8"
            type="warning"
          >Those options can significantly change the game experience, and
            make the game unplayable, use them wisely
          </v-alert>

          <h3 class="dbd-section-title mb-6">Skill Check Modifiers</h3>

          <v-row>
            <v-col cols="12" md="4">
              <v-label>SkillCheck max delay</v-label>

              <v-slider
                v-model="modifiers.frequency"
                color="secondary"
                label=""
                max="20000"
                min="2500"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.frequency) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.frequency = reset.frequency"
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
                color="secondary"
                label=""
                max="5000"
                min="0"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.advertisetime) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.advertisetime = reset.advertisetime"
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
                color="secondary"
                max="10"
                min="0.1"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.speed) }}x</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.speed = reset.speed"
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
                color="secondary"
                max="10000"
                min="2200"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.dstime) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.dstime = reset.dstime"
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

          <h3 class="dbd-section-title mt-10 mb-6">Perks Modifiers</h3>

          <v-row>
            <v-col cols="12" md="2">
              <v-number-input
                v-model="modifiers.hyperfocusStacksMax"
                color="secondary"
                label="Max Hyperfocus stacks"
                min="1"
                variant="underlined"
                @update:model-value="save"
              />
            </v-col>
          </v-row>

          <h3 class="dbd-section-title mt-10 mb-6">Generator Modifiers</h3>

          <v-row>
            <v-col cols="12" md="6">
              <v-label>Generator time</v-label>

              <v-slider
                v-model="modifiers.gentime"
                color="secondary"
                max="200000"
                min="10000"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.gentime) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.gentime = reset.gentime"
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
                color="secondary"
                :items="[
                  'advertise_01',
                  'advertise_02',
                  'advertise_03',
                  'advertise_04',
                ]"
                label="Generator advertise theme"
                thumb-label
                variant="underlined"
                @update:model-value="playandsave(modifiers.advertise)"
              >
                <template #append>
                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.advertise = reset.advertise"
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

          <h3 class="dbd-section-title mt-10 mb-6">Glyph Modifiers</h3>

          <v-row>
            <v-col cols="12" md="6">
              <v-label>Glyph Duration</v-label>

              <v-slider
                v-model="modifiers.glyphduration"
                color="secondary"
                max="15000"
                min="1000"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.glyphduration) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.glyphduration = reset.glyphduration"
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
                color="secondary"
                max="100"
                min="20"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.glyphbasesize) }}</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.glyphbasesize = reset.glyphbasesize"
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

          <h3 class="dbd-section-title mt-10 mb-6">Wiggle Modifiers</h3>

          <v-row>
            <v-col cols="12" md="6">
              <v-label>Wiggle Duration</v-label>

              <v-slider
                v-model="modifiers.wiggleDuration"
                color="secondary"
                max="30000"
                min="1000"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.wiggleDuration) }}ms</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.wiggleDuration = reset.wiggleDuration"
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
                color="secondary"
                max="45"
                min="0"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.wiggleGreat) }}</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.wiggleGreat = reset.wiggleGreat"
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
                color="secondary"
                max="45"
                min="0"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <span class="dbd-slider-value">{{ parseInt(modifiers.wiggleGood) }}</span>

                  <v-tooltip>
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        v-bind="props"
                        @click="modifiers.wiggleGood = reset.wiggleGood"
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
