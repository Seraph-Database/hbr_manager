<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-scale-transition appear>
        <v-btn
          v-if="!dataStore.loading"
          :aria-label="
            dataStore.readOnly ? `Enable Edit Mode` : `Disable Edit Mode`
          "
          v-bind="props"
          :stacked="true"
          class="text-white"
          color="white"
          :flat="true"
          :width="`100%`"
          max-width="9rem"
          @click.stop="toggleEditMode"
        >
          <v-img
            :src="
              isHovering || !dataStore.readOnly
                ? `/ui/ButtonFifthCircleActive.webp`
                : `/ui/ButtonFifthCircleDefault.webp`
            "
            width="3.125rem"
            height="3.125rem"
            class="d-flex align-center justify-center"
          >
            <v-icon
              color="white"
              :icon="dataStore.readOnly ? `mdi-eye` : `mdi-pencil`"
            ></v-icon>
          </v-img>
          <div class="text-HBR text-white mb-1">
            {{ dataStore.readOnly ? `View-Mode` : `Edit-Mode` }}
          </div>
        </v-btn>
      </v-scale-transition>
    </template>
  </v-hover>
</template>

<script lang="ts" setup>
import { useStyleStore } from "@/store/app";
const dataStore = useStyleStore();

const toggleEditMode = () => {
  dataStore.toggleEditMode()
};
</script>
