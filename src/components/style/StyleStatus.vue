<template>
  <v-slide-x-transition appear leave-absolute>
    <v-sheet
      class="style-status pr-12 d-flex flex-column align-start justify-end"
      color="transparent"
      v-if="
        !dataStore.readOnly &&
        dataStore.getOwned.findIndex((s) => s[0] === style.id) > -1
      "
    >
      <div :style="{ width: `100%` }">
        <v-row v-if="String(style.tier) === `SS`" no-gutters class="align-center ma-1 mx-2 mb-3 pa-0">
          <v-col @click.stop cols="3" class="text-HBR text-label text-HBR--stroke">
            {{ `S Lv` }}
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="transparent"
              flat
              width="2rem"
              height="1.5rem"
              variant="text"
              icon
              class="d-flex justify-end align-center"
              :disabled="dataStore.readOnly"
              @click.stop="styleLv < 10 ? styleLv++ : styleLv = 0"
            >
              <div class="text-HBR text-LB text-HBR--stroke">
                {{ `${styleLv}` }}
              </div>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="ml-1 text-HBR text-HBR--stroke">
            <v-btn
              v-if="styleLv < 10"
              width="1.5rem"
              height="1.5rem"
              variant="text"
              class="d-flex justify-start align-center"
              icon
              color="#d64f92"
              :disabled="dataStore.readOnly"
              @click.stop="styleLv = 10"
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
        <v-row no-gutters class="align-center ma-1 mx-2 mb-6 pa-0">
          <v-col @click.stop cols="3" class="text-HBR text-label text-HBR--stroke">
            {{ `LB` }}
          </v-col>
          <v-col cols="auto">
            <v-btn
              @click.stop="dataStore.setStyleLv(style.id, style.max_lb)"
              color="transparent"
              width="2rem"
              height="1.5rem"
              flat
              class="d-flex justify-end align-center"
              variant="text"
              icon
              :disabled="dataStore.readOnly"
            >
              <div class="text-HBR text-LB text-HBR--stroke">
                {{ `${dataStore.getStyle(style.id)[1]}` }}
              </div>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="ml-1 text-HBR text-HBR--stroke">
            <v-btn
              v-if="dataStore.getStyle(style.id)[1] < style.max_lb"
              width="1.5rem"
              height="1.5rem"
              variant="text"
              class="d-flex justify-start align-center"
              icon
              color="#d64f92"
              :disabled="dataStore.readOnly"
              @click.stop="dataStore.setStyleLv(style.id, style.max_lb, true)"
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
      </div>

      <!-- <v-sheet color="transparent" class="style-chips d-flex flex-column align-center justify-space-between">
        <v-btn color="transparent" flat icon width="36" height="36">
          <img
            :src="`https://hbr.quest/hbr/ThumbnailMaterial_Lv7_Light.webp`"
            width="36"
            height="36"
          />
        </v-btn>
        <v-btn color="transparent" flat icon width="36" height="36">
          <img
            :src="`https://hbr.quest/hbr/ThumbnailMaterial_SkillEvolution.webp`"
            width="36"
            height="36"
          />
        </v-btn>
      </v-sheet> -->

      <v-row v-if="false" no-gutters class="style-name">
        <v-col cols="auto" class="px-3 text-HBR text-normal text-HBR--stroke">
          {{ style.name }}
        </v-col>
      </v-row>
    </v-sheet>
  </v-slide-x-transition>
</template>

<script lang="ts" setup>
import { type Style } from "@/types";
import { useStyleStore } from "@/store/app";
import { ref } from "vue";

defineProps<{
  style: Style;
}>();

const styleLv = ref(0);
const lbLv = ref(0);

const dataStore = useStyleStore();
</script>

<style lang="scss" scoped>
.style-status {
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  top: 0rem;
  left: 0rem;
  background: linear-gradient(90deg, #212121aa 25%, #21212100 50%) !important;

  .style-name {
    cursor: default;
    user-select: none;
  }

  .style-chips {
    position: absolute;
    right: 0.375rem;
    top: 0.375rem;
    bottom: 0.375rem;
  }

  .v-btn--disabled {
    opacity: 1;
  }

  .text-label {
    color: #ffb9b9;
    font-size: 1.25rem;
    line-height: 1.25rem;
    text-transform: capitalize;
  }

  .text-label2 {
    color: #ffb9b9;
    font-size: 1rem;
    line-height: 1rem;
    text-transform: capitalize;
  }

  .text-LV {
    color: #f6e5e5;
    font-size: 1rem;
    line-height: 1rem;
  }

  .text-LB {
    color: #f6e5e5;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
}
</style>
