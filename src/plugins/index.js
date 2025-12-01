/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
// Types
import { createPinia } from "pinia";

export function registerPlugins(app) {
  console.log("Registering plugins");
  app.use(createPinia()).use(vuetify).use(router).use(ToastPlugin);
}
