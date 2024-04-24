<template>
  <div class="style-status">
    <v-btn
      @click.stop="
        dataStore.setStyleLv(
          style.id,
          style.max_lb
        )
      "
      class="pa-0 px-3 pr-1 ml-1 mb-2"
      color="transparent"
      rounded="pill"
      flat
      variant="text"
      v-if="dataStore.getOwned.findIndex(s => s[0] === style.id) > -1"
    >
      <v-row no-gutters class="align-center">
        <v-col cols="auto" class="text-HBR text-label text-HBR--stroke">
          {{ `Lv.` }}
        </v-col>
        <v-col cols="auto" class="px-1 text-HBR text-LB text-HBR--stroke">
          {{
            `${
              dataStore.getStyle(
                style.id
              )[1]
            }`
          }}
        </v-col>
        <v-col
          v-if="dataStore.getStyle(style.id)[1] < style.max_lb"
          cols="auto"
          class="px-0 text-HBR text-HBR--stroke"
        >
          <v-btn
            width="1.5rem"
            height="1.5rem"
            variant="text"
            icon
            color="#d64f92"
            @click.stop="
              dataStore.setStyleLv(
                style.id,
                style.max_lb,
                true
              )
            "
          >
            <v-icon
              class="text-HBR--stroke"
              color="#ffb9b9"
              size="1.5rem"
              icon="mdi-chevron-double-up"
            ></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-btn>
    <v-row no-gutters class="style-name">
      <v-col cols="auto" class="px-3 text-HBR text-normal text-HBR--stroke">
        {{ style.name }}
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { Style } from "@/types";
import { useStyleStore } from "@/store/app";

defineProps<{
  style: Style;
}>();

const dataStore = useStyleStore();
</script>

<style lang="scss" scoped>
.style-status {
  position: absolute;
  bottom: 0;
  border-top-right-radius: 0.5rem;
  padding-bottom: 0.125rem;

  .style-name {
    cursor: default;
    user-select: none;
  }
}
</style>
