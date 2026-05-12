# AGENTS.md

## Project map
- This is a Vite + Vue 3 + Vuetify app for Dead by Daylight skill-check training.
- `src/main.js` bootstraps the app; `src/plugins/index.js` registers Pinia, Vuetify, router, and toast notifications.
- `src/App.vue` is the global shell: drawer/navigation plus global input listeners that dispatch skill-check clicks.

## Routing and pages
- Routes are generated from `src/pages/*.vue` via `unplugin-vue-router` in `src/router/index.js`.
- Layouts are wired with `setupLayouts(routes)` even though there is no `src/layouts/` folder today.
- Main modes live in `src/pages/index.vue` (generator), `ds.vue`, `gliph.vue` (intentional spelling), and `wiggle.vue`.

## State and persistence
- `src/plugins/store/gameState.js` exports a singleton store wrapper, not a normal Pinia store file.
- Read state with `GameState.getState()` and persist after mutations with `GameState.saveState()`.
- Persistent state is stored in `localStorage` under `gameState`; `updateObjProps()` is used to merge older saves.
- `src/plugins/store/static.js` contains the default perk/effect/modifier catalog; `state` is cloned from it at startup.

## Input flow
- Keyboard, mouse, touch, wheel, and controller input all funnel into the custom `skillchedkClick` event.
- `src/plugins/controller.js` maps gamepad buttons to Xbox/PlayStation labels and shows toast feedback on connect/disconnect.
- Keep the `skillchedkClick` typo and `gliph` naming unless doing a coordinated migration across routes, stats, and UI.

## Canvas/game logic
- `src/plugins/drawer/skillcheck.js` renders and animates the circular skill-check UI; pages instantiate it directly.
- Asset lookup goes through `src/plugins/drawer/assets.js`, which loads runtime files from `public/assets/game/*`.
- UI badges/icons use the asset paths in `src/assets/icons/*` and the static definitions in `static.js`.

## Conventions to preserve
- Use `<script setup>` and 2-space indentation, matching the existing Vue files.
- Most UI changes mutate the shared game state and then call `GameState.saveState()` immediately.
- `src/components/modifiers.vue`, `perks.vue`, `perkshud.vue`, and `startstop.vue` show the preferred component patterns.
- Generated files such as `auto-imports.d.ts`, `typed-router.d.ts`, and `components.d.ts` should be treated as read-only.

## Developer workflow
- Install and run with the scripts in `package.json`: `npm install`, `npm run dev`, `npm run build`, `npm run lint`.
- Vite serves on port `3000`; the app uses hash history and `base: './'` in `vite.config.mjs`.
- If you need to inspect assets or naming, check `public/assets/game/*`, `public/assets/perks/*`, and `src/assets/icons/*`.

