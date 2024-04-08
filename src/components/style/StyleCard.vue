<template>
  <v-skeleton-loader
    :loading="dataStore.loading"
    color="grey"
    width="356"
    height="144"
    class="style-placeholder"
  >
    <v-slide-y-transition leave-absolute appear>
      <div
        v-ripple
        @click.stop="
          dataStore.toggleStyle(
            (dataStore.getStyles as Style[])[styleIndex - 1].id
          )
        "
      >
        <v-img
          width="356"
          height="144"
          :aspect-ratio="356 / 144"
          class="style-strip"
          :src="`https://hbr.quest/hbr/${(dataStore.getStyles as Style[])[styleIndex - 1].strip.replace(`Party`, `Select`)}`"
        >
          <style-header :style="(dataStore.getStyles as Style[])[styleIndex - 1]" />

          <div class="style-status">
            <v-btn
              @click.stop="
                dataStore.setStyleLv(
                  (dataStore.getStyles as Style[])[styleIndex - 1].id,
                  (dataStore.getStyles as Style[])[styleIndex - 1].max_lb
                )
              "
              class="pa-0 px-3 pr-1 ml-1 mb-2"
              color="transparent"
              rounded="pill"
              flat
              variant="text"
              v-if="dataStore.getOwned.findIndex(s => s[0] === (dataStore.getStyles as Style[])[styleIndex - 1].id) > -1"
            >
              <v-row no-gutters class="align-center">
                <v-col cols="auto" class="text-HBR text-label text-HBR--stroke">
                  {{ `Lv.` }}
                </v-col>
                <v-col
                  cols="auto"
                  class="px-1 text-HBR text-LB text-HBR--stroke"
                >
                  {{
                    `${
                      dataStore.getStyle(
                        (dataStore.getStyles as Style[])[styleIndex - 1].id
                      )[1]
                    }`
                  }}
                </v-col>
                <v-col
                  v-if="dataStore.getStyle((dataStore.getStyles as Style[])[styleIndex - 1].id)[1] < (dataStore.getStyles as Style[])[styleIndex - 1].max_lb"
                  cols="auto"
                  class="px-0 text-HBR text-LB text-HBR--stroke"
                >
                  <v-btn
                    width="1.5rem"
                    height="1.5rem"
                    variant="text"
                    icon
                    color="#d64f92"
                    @click.stop="
                      dataStore.setStyleLv(
                        (dataStore.getStyles as Style[])[styleIndex - 1].id,
                        (dataStore.getStyles as Style[])[styleIndex - 1].max_lb,
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
              <v-col cols="auto" class="px-3 text-HBR text-HBR--stroke">
                {{ (dataStore.getStyles as Style[])[styleIndex - 1].name }}
              </v-col>
            </v-row>
          </div>
        </v-img>
      </div>
    </v-slide-y-transition>
  </v-skeleton-loader>
</template>

<script lang="ts" setup>
import { useStyleStore } from "@/store/app";
import { Style } from "@/types";
import StyleHeader from "@/components/style/StyleHeader.vue";

defineProps<{
  styleIndex: number;
}>();

const dataStore = useStyleStore();
</script>

<style lang="scss" scoped>
.style-strip {
  transform: translateZ(0);
}

.style-placeholder {
  border-radius: 1.25rem;
  overflow: hidden;
  user-select: none;
}

.style-ripple {
  width: 100%;
  max-width: 356px;
}

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
