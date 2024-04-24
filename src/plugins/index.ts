/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
// import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { gtag, gconfig } from './gtag'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// @ts-ignore
// import { vscroller } from './scroller'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  // loadFonts()
  app
    .use(gtag, gconfig)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .component('RecycleScroller', RecycleScroller)
    // .use(vscroller)
}
