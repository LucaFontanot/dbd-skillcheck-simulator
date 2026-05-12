/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const dbdTheme = {
  dark: true,
  colors: {
    'background': '#0c0b0a',
    'surface': '#1e1b18',
    'surface-variant': '#2a2622',
    'primary': '#b82000',
    'primary-darken-1': '#8b1600',
    'secondary': '#c8960a',
    'secondary-darken-1': '#a07a00',
    'error': '#8b1600',
    'warning': '#3d1200',
    'on-warning': '#cc9966',
    'info': '#5a2478',
    'success': '#4a7a20',
    'on-background': '#e2d9c8',
    'on-surface': '#e2d9c8',
    'on-primary': '#f0e8d8',
    'on-secondary': '#1a1410',
    'on-error': '#ffaaaa',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dbdTheme',
    themes: { dbdTheme },
  },
})
