<template>
  <v-navigation-drawer
    color="transparent"
    :elevation="0"
    theme="dark"
    temporary
    :width="8 * 16"
    location="bottom"
    floating
    touchless
    v-model:model-value="searchStore.menuFlag"
  >
    <v-card
      class="list-menu ma-2 d-flex flex-row justify-center align-end"
      height="calc(100% - 1rem)"
      flat
      tile
      color="transparent"
    >
      <v-sheet flat tile color="transparent" width="8rem" height="6rem">
        <share />
      </v-sheet>
      <v-sheet
        flat
        tile
        color="transparent"
        class="btn-disabled"
        width="8rem"
        height="6rem"
      >
        <update />
      </v-sheet>
    </v-card>
    <gradual-blur />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import Update from "@/components/default/Update.vue";
import Share from "@/components/default/Share.vue";
import GradualBlur from "@/components/default/GradualBlur.vue";
import { useSearchStore } from "@/store/app";

const searchStore = useSearchStore();
</script>

<style lang="scss" scoped>
.list-menu {
  position: relative;
  z-index: 9;
}

.btn-disabled {
  // filter: grayscale(1);
  opacity: 0.25;
}
</style>
