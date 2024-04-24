<template>
  <v-btn
    :loading="dataStore.loading"
    @click="searchStore.menuFlag = !searchStore.menuFlag"
    icon
    class="text-white"
    aria-label="Show settings"
  >
    <v-icon icon="mdi-dots-vertical"></v-icon>
    <!-- <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
          {{ `Display filters` }}
      </v-tooltip> -->
  </v-btn>
</template>

<script lang="ts" setup>
import { useStyleStore, useSearchStore } from "@/store/app";
import { ref } from "vue";

const dataStore = useStyleStore();
const searchStore = useSearchStore();
</script>
