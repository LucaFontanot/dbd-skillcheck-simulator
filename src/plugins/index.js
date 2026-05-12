/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Types
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import router from '../router'
// Plugins
import vuetify from './vuetify'
import 'vue-toast-notification/dist/theme-default.css'

export function registerPlugins (app) {
  console.log('Registering plugins')
  app.use(createPinia()).use(vuetify).use(router).use(ToastPlugin)
}
