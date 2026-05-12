/**
 * router/index.js
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { setupLayouts } from 'virtual:generated-layouts'
import { createWebHashHistory } from 'vue-router'
// Composables
import { createRouter } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: setupLayouts(routes),
})

export default router
