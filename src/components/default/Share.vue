<template>
  <v-scale-transition appear>
    <v-btn
      v-if="!dataStore.loading"
      aria-label="Save & Load"
      @click.stop="showShare"
      icon
      class="text-white"
    >
      <v-icon icon="mdi-share"></v-icon>
      <!-- <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
                {{ `Share collection` }}
            </v-tooltip> -->
    </v-btn>
  </v-scale-transition>
  <v-dialog
    :close-on-back="true"
    scrollable
    v-model:model-value="share"
    transition="scale-transition"
    :max-width="`74.375rem`"
    :max-height="
      $vuetify.display.smAndDown ? undefined : $vuetify.display.height - 192
    "
    :scrim="`#212121`"
    :close-on-content-click="false"
  >
    <div class="v-card__white-frame--top-left"></div>
    <div class="v-card__white-frame--bottom-right"></div>
    <v-card
      color="#312942aa"
      class="v-card--shadowless bg-blur search elevation-0 rounded-0"
      :class="{ mobile: $vuetify.display.smAndDown }"
      v-click-outside="closeShare"
    >
      <v-toolbar color="#ffffff00" height="64" class="top-toolbar pa-1">
        <v-toolbar-title class="text-HBR ml-3">
          {{ `Share`.toUpperCase() }}
        </v-toolbar-title>

        <template v-slot:prepend>
          <v-icon icon="mdi-share" size="2rem"></v-icon>
        </template>

        <v-toolbar-items class="btn-toolbar__items align-center justify-center">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                width="3.5rem"
                color="transparent"
                class="text-HBR"
                @click="closeShare"
              >
                <v-img
                  :src="
                    isHovering
                      ? `/ui/ButtonCloseSmallActive.webp`
                      : `/ui/ButtonCloseSmallDefault.webp`
                  "
                  width="3.5rem"
                  class="d-flex align-center justify-center"
                >
                </v-img>
              </v-btn>
            </template>
          </v-hover>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text
        :class="`${
          $vuetify.display.smAndDown
            ? `ma-0 pa-0 mx-3`
            : `ma-0 pa-0 mx-4 ml-3 pr-3`
        } filter-list text-HBR`"
      >
        <!-- <v-list
          density="compact"
          class="style-list pa-0 py-1 text-normal"
          bg-color="#1f1f1f88"
        >
          <v-list-item
            class="px-2"
            v-for="style in dataStore.getStyles
              ?.filter(dataStore.isOwned)
              .sort(sortByTier)"
            :key="style.id"
            :title="`${style.name}`"
          >
            <template v-slot:prepend>
              <img
                width="32"
                height="32"
                class="mr-1"
                :src="`https://hbr.quest/ui/IconRarity${style.tier}.webp`"
              />
            </template>
            <template v-slot:append>
              <img
                width="32"
                height="32"
                :src="`https://hbr.quest/hbr/${style.image}`"
              />
            </template>
          </v-list-item>
          <v-sheet
            v-if="
              dataStore.getStyles &&
              dataStore.getStyles.filter(dataStore.isOwned).length < 1
            "
            class="text-center"
            color="transparent"
          >
            {{ `No data` }}
          </v-sheet>
        </v-list> -->
        <div :style="{ width: `1132px` }">
          <div
            ref="styleList"
            class="d-flex flex-wrap align-center justify-start"
            :style="{ gap: `0.125rem` }"
          >
            <div
              v-for="style in dataStore.getStyles?.filter(
                (s) => Number(CardRarity[s.tier]) === 3
              )"
              :key="style.id"
              :style="{
                position: `relative`,
              }"
            >
              <div
                v-if="dataStore.getStyle(style.id)[1] > -1"
                :style="{
                  position: `absolute`,
                  top: `0rem`,
                  left: `0rem`,
                  color: `black`,
                  fontSize: `0.625rem`,
                  lineHeight: `0.75rem`,
                  padding: `0.125rem`,
                  textIndent: `0.125rem`,
                  borderTopLeftRadius: `0.375rem`,
                  borderTopRightRadius: `0.375rem`,
                  textShadow: `1px 1px 0px #21212133`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                  overflowX: `hidden`,
                  width: `160px`,
                  background: `linear-gradient(90deg, #ffffffaa 100%, #ffffff00 100%)`,
                }"
              >
                {{ style.name }}
              </div>
              <div
                v-if="dataStore.getStyle(style.id)[1] > -1"
                :style="{
                  position: `absolute`,
                  top: `1.25rem`,
                  left: `0.25rem`,
                  color: `black`,
                  fontSize: `0.5rem`,
                  lineHeight: `0.5rem`,
                  padding: `0.125rem`,
                  borderRadius: `0.25rem`,
                  width: `2.75rem`,
                  textShadow: `1px 1px 0px #21212133`,
                  background: `linear-gradient(90deg, #ffffffaa 75%, #ffffff00 100%)`,
                }"
              >
                {{ `LB ${dataStore.getStyle(style.id)[1]}/4` }}
              </div>
              <div
                v-if="dataStore.getStyle(style.id)[1] > -1"
                :style="{
                  position: `absolute`,
                  top: `2.125rem`,
                  left: `0.25rem`,
                  color: `black`,
                  fontSize: `0.5rem`,
                  lineHeight: `0.5rem`,
                  padding: `0.125rem`,
                  borderRadius: `0.25rem`,
                  width: `2.75rem`,
                  textShadow: `1px 1px 0px #21212133`,
                  background: `linear-gradient(90deg, #ffffffaa 75%, #ffffff00 100%)`,
                }"
              >
                {{ `Lv170` }}
              </div>
              <div
                v-if="dataStore.getStyle(style.id)[1] > -1"
                :style="{
                  position: `absolute`,
                  top: `3rem`,
                  left: `0.25rem`,
                  color: `black`,
                  fontSize: `0.5rem`,
                  lineHeight: `0.5rem`,
                  padding: `0.125rem`,
                  borderRadius: `0.25rem`,
                  width: `2.75rem`,
                  textShadow: `1px 1px 0px #21212133`,
                  background: `linear-gradient(90deg, #ffffffaa 75%, #ffffff00 100%)`,
                }"
              >
                {{ `??/${style.tree_count}` }}
              </div>
              <img
                class="d-block"
                width="160"
                height="64"
                :src="`/hbr/${style.strip.replace(`Party`, `Select`)}`"
                :style="{
                  opacity: dataStore.getStyle(style.id)[1] > -1 ? 1 : 0.5,
                }"
              />
            </div>
          </div>
        </div>
      </v-card-text>

      <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3">
        <v-toolbar-items class="btn-toolbar__items align-center justify-center">
          <v-hover v-if="false">
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                width="13rem"
                color="transparent"
                class="text-HBR"
                @click.stop="copyToClipboard()"
              >
                <v-img
                  :src="
                    isHovering
                      ? `/ui/ButtonFirstMiniActive.webp`
                      : `/ui/ButtonFirstMiniNomal.webp`
                  "
                  width="13rem"
                  class="d-flex align-center justify-center"
                >
                  <div class="text-white btn-text text-center">
                    {{ `Copy URL` }}
                  </div>
                </v-img>
              </v-btn>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                width="13rem"
                color="transparent"
                class="text-HBR"
                @click.stop="generateImage()"
              >
                <v-img
                  :src="
                    isHovering
                      ? `/ui/ButtonFirstMiniActive.webp`
                      : `/ui/ButtonFirstMiniNomal.webp`
                  "
                  width="13rem"
                  class="d-flex align-center justify-center"
                >
                  <div class="text-white btn-text text-center">
                    {{ `Save image` }}
                  </div>
                </v-img>
              </v-btn>
            </template>
          </v-hover>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useStyleStore } from "@/store/app";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Style } from "@/types";

// @ts-ignore
import domtoimage from "dom-to-image-more";
import { CardRarity } from "@/enums";

const dataStore = useStyleStore();
const share = ref(false);
const styleList = ref(null);
// const fileData = ref(undefined)

const catchEsc = (e: KeyboardEvent) => {
  // ignore normal browsing behavior
  if (e.key === `Escape` && share.value) {
    e.preventDefault();
  }
};
onMounted(() => document.addEventListener("keydown", catchEsc));
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc));

const showShare = () => {
  share.value = true;
};

const closeShare = () => {
  share.value = false;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(getEncodedData());
    alert("Copied!");
  } catch ($e) {
    alert("Cannot copy.");
  }
};

const generateImage = async () => {
  try {
    if (styleList) {
      domtoimage
        .toPng(styleList.value)
        .then((dataUrl: any) => {
          // var img = new Image();
          // img.src = dataUrl;
          // document.body.appendChild(img);
          var link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error: any) => {
          console.error("Oops, something went wrong!", error);
        });
    }
  } catch ($e) {
    alert("Failed to produce image");
  }
};

// const readFile = () => {
//     this.file = this.$refs.doc.files[0];
//     const reader = new FileReader();
//     if (this.file.name.includes(".txt")) {
//         reader.onload = (res) => {
//             this.content = res.target.result;
//         };
//         reader.onerror = (err) => console.log(err);
//         reader.readAsText(this.file);
//     } else {
//         this.content = "check the console for file output";
//         reader.onload = (res) => {
//             console.log(res.target.result);
//         };
//         reader.onerror = (err) => console.log(err);
//         reader.readAsText(this.file);
//     }
// }

const getEncodedData = (): string => {
  return dataStore.getOwned.length > 0
    ? window.btoa(JSON.stringify(dataStore.getOwned))
    : `No data to copy`;
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  gap: 0.25rem;

  li {
    width: 4rem;
    height: 4rem;
  }
}
</style>
