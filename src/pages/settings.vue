<script setup>
  import { onMounted, ref } from 'vue'
  import { useToast } from 'vue-toast-notification'
  import { isConnected, PSC, waitInput, XBOX } from '../plugins/controller'
  import GameState from '../plugins/store/gameState'

  const settings = ref({
    keyboard: {
      keys: [],
    },
    controller: {
      keys: [],
    },
  })
  const keyboardModel = ref(false)
  const controllerModal = ref(false)
  let callback = null
  function event (e) {
    if (keyboardModel.value) {
      callback(e.code)
      window.removeEventListener('keydown', event)
      save()
    }
  }

  function updateKeyboard (key) {
    keyboardModel.value = true
    callback = s => {
      settings.value.keyboard[key] = s
      keyboardModel.value = false
    }
    window.addEventListener('keydown', event)
  }

  async function updateController (key) {
    controllerModal.value = true
    const code = await waitInput()
    if (controllerModal.value === false) {
      return
    }
    settings.value.controller[key] = code[0]
    controllerModal.value = false
  }

  async function addController () {
    if (!isConnected()) {
      return useToast().error(
        'Please connect the controller first, if it is connected press a button on the controller to detect it',
      )
    }
    controllerModal.value = true
    const code = await waitInput()
    if (controllerModal.value === false) {
      return
    }
    if (!settings.value.controller.keys.includes(code[0])) {
      settings.value.controller.keys.push(code[0])
    }
    controllerModal.value = false
  }

  function changeMouseEvent () {
    if (settings.value.specialMouse) {
      history.pushState(null, null, location.href)
      window.addEventListener('popstate', function () {
        history.go(1)
      })
    } else {
      window.addEventListener('popstate', function () {})
    }
    save()
  }

  function addKeyboard () {
    keyboardModel.value = true
    callback = key => {
      if (!settings.value.keyboard.keys.includes(key)) {
        settings.value.keyboard.keys.push(key)
      }
      keyboardModel.value = false
    }
    window.addEventListener('keydown', event)
  }
  function cancelKeyboard () {
    keyboardModel.value = false
    window.removeEventListener('keydown', event)
  }
  function save () {
    GameState.saveState()
  }

  onMounted(() => {
    settings.value = GameState.getState().settings
  })
</script>

<template>
  <div class="ma-5">
    <v-dialog v-model="keyboardModel" persistent width="500px">
      <v-card class="pa-5">
        <v-card-title class="text-center">Add Keyboard event</v-card-title>

        <v-card-text class="text-center">
          <p>Press a keyboard key</p>

          <v-progress-circular
            class="ma-10"
            color="primary"
            indeterminate
          />

          <p>Waiting for user input...</p>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="cancelKeyboard">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="controllerModal" persistent width="500px">
      <v-card class="pa-5">
        <v-card-title class="text-center">Add Controller event</v-card-title>

        <v-card-text class="text-center">
          <p>Press a controller button</p>

          <v-progress-circular
            class="ma-10"
            color="primary"
            indeterminate
          />

          <p>Waiting for user input...</p>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="controllerModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h2 class="text-center mb-5">Settings</h2>

    <div class="d-flex justify-center">
      <v-card style="width: 80vw; min-width: 300px">
        <v-card-text>
          <h3 class="text-center mb-5">Animation settings</h3>

          <v-row>
            <v-col cols="12" md="4">
              <v-slider
                v-model="settings.fps"
                color="light-blue-darken-1"
                label="SkillCheck FPS"
                max="120"
                min="15"
                thumb-label
                @update:model-value="save"
              >
                <template #append>
                  <p>{{ parseInt(settings.fps) }}</p>
                </template>
              </v-slider>
            </v-col>

            <v-col cols="12" md="4">
              <v-slider
                v-model="settings.sound"
                color="light-green-lighten-2"
                label="SkillCheck sound %"
                max="100"
                min="0"
                thumb-label
                @update:model-value="save"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-slider
                v-model="settings.surround"
                color="lime-darken-3"
                label="Surround Sounds %"
                max="100"
                min="0"
                thumb-label
                @update:model-value="save"
              />
            </v-col>
          </v-row>

          <h3 class="text-center mb-5">Keybinds</h3>

          <v-row>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="settings.mouse"
                label="Mouse L/R event"
                @update:model-value="save"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-tooltip
                text="Mouse M4/M5 event is a special event that is triggered by the mouse buttons M4 and M5. Those buttons are usually located on the side of the mouse. By activating you will not be able to go back in the browser history from this page."
                width="400px"
              >
                <template #activator="{ props }">
                  <v-checkbox
                    v-model="settings.specialMouse"
                    label="Mouse M4/M5 event"
                    v-bind="props"
                    @update:model-value="changeMouseEvent"
                  />
                </template>
              </v-tooltip>
            </v-col>

            <v-col cols="12" md="3">
              <v-checkbox
                v-model="settings.wheel"
                label="Mouse wheel event"
                @update:model-value="save"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-checkbox
                v-model="settings.click"
                label="Mobile touch screen event"
                @update:model-value="save"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <h3 class="text-center mb-5">Keyboard</h3>

              <v-list class="mb-5">
                <v-list-item
                  prepend-icon="mdi-swap-horizontal"
                  @click="updateKeyboard('startKey')"
                >
                  <v-list-item-title>{{
                    settings.keyboard.startKey
                  }}</v-list-item-title>

                  <v-list-item-subtitle>Keyboard Start/Resume Game key</v-list-item-subtitle>
                </v-list-item>

                <v-list-item
                  prepend-icon="mdi-swap-horizontal"
                  @click="updateKeyboard('stopKey')"
                >
                  <v-list-item-title>{{
                    settings.keyboard.stopKey
                  }}</v-list-item-title>

                  <v-list-item-subtitle>Keyboard Stop/Pause Game key</v-list-item-subtitle>
                </v-list-item>
              </v-list>

              <v-select
                v-model="settings.keyboard.keys"
                :items="settings.keyboard.keys"
                label="Keyboard SkillCheck events"
                multiple
                variant="underlined"
              >
                <template #selection="{ item, index }">
                  <v-chip v-if="index < 6">
                    <span>{{ item.title }}</span>
                  </v-chip>

                  <span v-else-if="index === 6">+{{ index - 5 }}</span>
                </template>

                <template #append>
                  <v-btn icon variant="flat" @click="addKeyboard">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>

                <template #item="{ item }">
                  <v-list-item
                    prepend-icon="mdi-trash-can"
                    :title="item.title"
                    @click="
                      settings.keyboard.keys.splice(
                        settings.keyboard.keys.indexOf(item.title),
                        1,
                      )
                    "
                  />
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <h3 class="text-center mb-5">Controller</h3>

              <v-list class="mb-5">
                <v-list-item
                  prepend-icon="mdi-swap-horizontal"
                  @click="updateController('startKey')"
                >
                  <v-list-item-title>{{ XBOX[settings.controller.startKey] }} /
                    {{ PSC[settings.controller.startKey] }}</v-list-item-title>

                  <v-list-item-subtitle>Controller Start/Resume Game key</v-list-item-subtitle>
                </v-list-item>

                <v-list-item
                  prepend-icon="mdi-swap-horizontal"
                  @click="updateController('stopKey')"
                >
                  <v-list-item-title>{{ XBOX[settings.controller.stopKey] }} /
                    {{ PSC[settings.controller.stopKey] }}</v-list-item-title>

                  <v-list-item-subtitle>Controller Stop/Pause Game key</v-list-item-subtitle>
                </v-list-item>
              </v-list>

              <v-select
                v-model="settings.controller.keys"
                :items="settings.controller.keys"
                label="Controller SkillCheck events"
                multiple
                variant="underlined"
              >
                <template #selection="{ item, index }">
                  <v-chip v-if="index < 6">
                    <span>{{ XBOX[parseInt(item.title)] }} /
                      {{ PSC[parseInt(item.title)] }}</span>
                  </v-chip>

                  <span v-else-if="index === 6">+{{ index - 5 }}</span>
                </template>

                <template #append>
                  <v-btn icon variant="flat" @click="addController">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>

                <template #item="{ item }">
                  <v-list-item
                    prepend-icon="mdi-trash-can"
                    @click="
                      settings.controller.keys.splice(
                        settings.controller.keys.indexOf(parseInt(item.title)),
                        1,
                      )
                    "
                  >
                    <v-list-item-title>{{ XBOX[parseInt(item.title)] }} /
                      {{ PSC[parseInt(item.title)] }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions />
      </v-card>
    </div>
  </div>
</template>

<style scoped></style>
