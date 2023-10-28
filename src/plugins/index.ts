/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { gtag, gconfig } from './gtag'
// @ts-ignore
// import { vscroller } from './scroller'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  loadFonts()
  app
    .use(gtag, gconfig)
    .use(vuetify)
    .use(router)
    .use(pinia)
    // .use(vscroller)
}
