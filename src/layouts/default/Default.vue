<template>
  <v-app>
    <default-bar />
    <!-- <default-nav /> -->
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
// import DefaultNav from './NavBar.vue'
import DefaultView from './View.vue'
</script>

<style lang="scss">
@font-face {
  font-family: HBRFont;
  font-style: normal;
  font-weight: 400;
  src: local("HBRFont"), url("@/assets/A-OTF-SOFTGOSTD-DEBOLD.otf") format("opentype");
  font-display: swap;
}

.text-JP {
  font-family: 'Noto Sans JP', sans-serif;
}

.text-TW {
  font-family: 'Noto Sans TC', sans-serif;
}

.text-CN {
  font-family: 'Noto Sans SC', sans-serif;
}

.text-KR {
  font-family: 'Noto Sans KR', sans-serif;
}

.text-DF {
  font-family: 'Noto Sans', sans-serif;
}

.text-HBR {
  font-family: HBRFont, 'Noto Sans', sans-serif;
}

.text-HBR--stroke {
  text-shadow:
    -1px -1px 0 #443f4b,
    0 -1px 0 #443f4b,
    1px -1px 0 #443f4b,
    2px 0 0 #443f4b,
    2px 2px 0 #443f4b,
    0 2px 0 #443f4b,
    -1px 1px 0 #443f4b,
    -1px 0 0 #443f4b;
}

// .text-header {
// //  color: #be9898;
//  color: #ffccf5;
// //  text-shadow: 0 0 0 #fff;
// }

.text-label {
  color: #ffb9b9;
  font-size: 1.5rem;
  line-height: 1.5rem;
  text-transform: capitalize;
}

.text-normal {
  color: #f6e5e5;
  font-size: 1rem;
}

.text-LB {
  color: #f6e5e5;
  font-size: 1.5rem;
  line-height: 1.5rem;
}

.text-title {
  font-size: 1.125rem;
}

// .active {
//   background: linear-gradient(90deg, #5d57d3 0%, #089bd7 100%) !important;
//   text-shadow: 0px 0px 3px #000000;
//   color: #fff;
// }

.v-overlay[role=tooltip] {
  .v-overlay__content {
    opacity: 1;
    border: 0.125rem solid #fdf7f7;
    box-shadow: 0px 0px 3px #212121;
    text-shadow: 1px 1px 0px #000;
    letter-spacing: 1px;
    line-height: 1rem;
    border-radius: 0.25rem;
    padding: 0.375rem 0.5rem;
    font-size: 1rem;
    background: linear-gradient(15deg, rgba(49, 42, 71, 1) 0%, rgba(168, 89, 141, 1) 100%);
  }
}



// Custom scrollbar
@media (min-width: 60rem) {

  /* FIREFOX */
  body {
    scrollbar-width: thin;
    scrollbar-color: #a8a498 #21212100;
  }

  // .optimized {
  //   image-rendering: -webkit-optimize-contrast;
  // }

  /* WEBKIT */
  ::-webkit-scrollbar {
    width: 11px;
    height: 11px;
  }

  ::-webkit-scrollbar-track {
    background: #21212100;
  }

  body::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a8a498;
    border-radius: 6px;
    border: 3px solid #21212100;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>