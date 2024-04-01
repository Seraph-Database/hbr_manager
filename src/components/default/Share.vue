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
    :max-width="`68.625rem`"
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
        <template v-if="false">
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
                    fontSize: `0.75rem`,
                    lineHeight: `0.75rem`,
                    padding: `0.125rem`,
                    borderRadius: `0.25rem`,
                    width: `4rem`,
                    textShadow: `1px 1px 0px #21212133`,
                    background: `linear-gradient(90deg, #ffffffaa 75%, #ffffff00 100%)`,
                  }"
                >
                  {{ `LB ${dataStore.getStyle(style.id)[1]}/4` }}
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
        </template>
        <div v-if="styleGroups" class="mx-auto" :style="{ width: `65rem` }">
          <div ref="styleList" class="py-3 pb-6">
            <div
              v-for="(g, gi) in styleGroups"
              :key="gi"
              class="d-flex flex-wrap align-center justify-center"
              :style="{ gap: `0.125rem` }"
            >
              <div
                v-for="style in g"
                :key="style.id"
                :style="{
                  position: `relative`,
                  backgroundImage: `url(${`/hbr/${style.strip.replace(
                    `Party`,
                    `StylePiece`
                  )}`})`,
                  // backgroundColor: `#000`,
                  width: `5rem`,
                  height: `5rem`,
                  backgroundSize: `135%`,
                  backgroundPosition: `center`,
                  marginRight: `-0.125rem`,
                  marginLeft: `-0.125rem`,
                  marginBottom: `-0.75rem`,
                  // boxShadow: `0px 0px 0px 0px #000`,
                  // opacity: dataStore.getStyle(style.id)[1] > -1 ? 1 : 0.25,
                  clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                }"
              >
                <div
                  v-if="dataStore.getStyle(style.id)[1] > 0"
                  :style="{
                    position: `absolute`,
                    top: `0.0625rem`,
                    left: `calc(50% - 0.5rem)`,
                    color: `black`,
                    fontSize: `0.75rem`,
                    lineHeight: `0.75rem`,
                    padding: `0.125rem`,
                    borderRadius: `50%`,
                    width: `1rem`,
                    height: `1rem`,
                    textAlign: `center`,
                    clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                    textShadow: `1px 1px 0px #21212133`,
                    background: `linear-gradient(180deg, #ffffffaa 100%, #ffffff00 100%)`,
                  }"
                >
                  {{ `${dataStore.getStyle(style.id)[1]}` }}
                  <!-- <img :src="`/ui/ExchangeBadgeicon.webp`" :width="24" :height="24" /> -->
                </div>
                <div v-if="dataStore.getStyle(style.id)[1] < 0" :style="{
                  width: `100%`,
                  height: `100%`,
                  background: `#000000bb`,
                }"></div>
            </div>
              <template v-if="gi === styleGroups.length - 1">
                <div
                  v-for="n in (gi % 2 === 0 ? 13 : 12) - g.length"
                  :key="`empty-${n}`"
                  :style="{
                    position: `relative`,
                    background: `transparent`,
                    width: `5rem`,
                    height: `5rem`,
                    backgroundSize: `135%`,
                    backgroundPosition: `center`,
                    marginRight: `-0.125rem`,
                    marginLeft: `-0.125rem`,
                    marginBottom: `-0.75rem`,
                    clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                  }"
                ></div>
              </template>
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
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

const styleGroups = computed(() => {
  return dataStore.getStyles
    ?.filter((s) => Number(CardRarity[s.tier]) === 3)
    .reduce((acc, s) => {
      if (acc.length < 1) {
        return [[s]];
      } else if (
        acc[acc.length - 1].length < ((acc.length - 1) % 2 === 0 ? 13 : 12)
      ) {
        return acc.map((sg, sgi) => (sgi === acc.length - 1 ? [...sg, s] : sg));
      }
      return [...acc, [s]];
    }, [] as Style[][]);
});

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
          link.download = "my-style-list.png";
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