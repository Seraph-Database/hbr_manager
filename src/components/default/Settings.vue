<template>
  <v-btn
    :loading="dataStore.loading"
    @click="searchStore.menuFlag = !searchStore.menuFlag"
    icon
    class="ml-3 text-white"
    aria-label="Show menu"
  >
    <v-icon icon="mdi-dots-vertical"></v-icon>
    <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="left">
          {{ `Show Menu` }}
      </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import { useStyleStore, useSearchStore } from "@/store/app";
import { ref } from "vue";

const dataStore = useStyleStore();
const searchStore = useSearchStore();
</script>
