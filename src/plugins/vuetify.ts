/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
// import { fa } from 'vuetify/iconsets/fa'
import { mdi } from "vuetify/iconsets/mdi";
// import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { VDateInput } from "vuetify/labs/VDateInput";

const seraphGradient =
  "to top, rgba(49, 42, 71, 0.72), rgba(168, 89, 141, 0.48)";
const denchoGradient = "to top, rgba(9, 9, 35, 0.48), rgba(80, 135, 137, 0.72)";

const seraphTheme = {
  dark: false,
  colors: {
    // background: 'transparent',
    // surface: '#1f1e1a',
    primary: "#22152d",
    // secondary: '#302f2a',
    // third: '#1f1d1a',
    // error: '#B00020',
    // info: '#0099ad',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
};

const denchoTheme = {
  dark: false,
  colors: {
    // background: 'transparent',
    surface: '#302f3e',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#d64f92',
    'on-surface-variant': '#EEEEEE',
    primary: "#508789",
    // secondary: '#090923',
    // third: '#1f1d1a',
    // error: '#B00020',
    // info: '#0099ad',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: "mdi",
    sets: {
      // fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: "seraphTheme",
    themes: {
      seraphTheme,
      denchoTheme,
    },
  },
  components: {
    VDateInput,
    //   VSkeletonLoader,
  },
});
