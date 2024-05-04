/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
// Types
import type { App } from 'vue'
import {createPinia} from 'pinia';

export function registerPlugins (app: App) {
  console.log('Registering plugins')
  app
    .use(createPinia())
    .use(vuetify)
    .use(router)
    .use(ToastPlugin)
}
