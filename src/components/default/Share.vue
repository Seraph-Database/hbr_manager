<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-scale-transition appear>
        <v-btn
          v-if="!dataStore.loading"
          aria-label="Save & Load"
          v-bind="props"
          :stacked="true"
          class="text-white"
          color="white"
          :flat="true"
          :width="`100%`"
          :max-width="$vuetify.display.smAndUp ? `9rem` : `5rem`"
          @click.stop="showBox"
        >
          <v-img
            :src="
              isHovering
                ? `/ui/ButtonFifthCircleActive.webp`
                : `/ui/ButtonFifthCircleDefault.webp`
            "
            width="3.0625rem"
            height="3.0625rem"
            class="d-flex align-center justify-center"
          >
            <v-icon
              :style="{ marginLeft: `-2px` }"
              color="white"
              icon="mdi-dots-hexagon"
            ></v-icon>
          </v-img>
          <div class="text-HBR text-white mb-1">
            {{ `${$vuetify.display.smAndUp ? `View ` : ``}Box` }}
          </div>
        </v-btn>
      </v-scale-transition>
    </template>
  </v-hover>
  <v-dialog
    :close-on-back="true"
    scrollable
    v-model:model-value="share"
    transition="scale-transition"
    :max-width="`54.06125rem`"
    :max-height="
      $vuetify.display.smAndDown ? undefined : $vuetify.display.height - 144
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
          {{ `Box Share`.toUpperCase() }}
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
        <div
          v-if="templateSelection > 1 && templateSelection < 5 && styleGroups"
          class="mx-auto"
          :style="{ width: `${5 * imagePerHexagonLine}rem` }"
        >
          <div ref="styleList" class="py-3 pb-6 pl-10">
            <div
              v-for="(elg, eli) in styleGroups"
              :key="eli"
              class="pt-1 pb-5"
              :style="
                true
                  ? {}
                  : {
                      filter: `drop-shadow(-1px -1px 0 #9f4f4f) drop-shadow(0 -1px 0 #9f4f4f) drop-shadow(1px -1px 0 #9f4f4f) drop-shadow(1px 0 0 #9f4f4f) drop-shadow(1px 1px 0 #9f4f4f) drop-shadow(0 1px 0 #9f4f4f) drop-shadow(-1px 1px 0 #9f4f4f) drop-shadow(-1px 0 0 #9f4f4f`,
                    }
              "
            >
              <div
                v-for="(g, gi) in elg.groups.length > 1
                  ? elg.groups
                  : [...elg.groups, []]"
                :key="gi"
                class="d-flex flex-wrap align-center justify-center"
                :style="{ gap: `0.125rem` }"
              >
                <div v-if="gi === 1" :style="{ marginLeft: `-4.625rem` }">
                  <div
                    :key="`element-${elg.element}`"
                    :style="{
                      position: `relative`,
                      background: templateSelection < 4 ? `url('/svg/${elg.element}.svg')` : `url('https://assets.hbr.quest/v1/ui/IconRarity${elg.element}.webp')`,
                      width: `5rem`,
                      height: `5rem`,
                      backgroundSize: templateSelection < 4 ? `105%` : `80%`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `center`,
                      marginRight: `-0.25rem`,
                      marginLeft: `-0.25rem`,
                      marginBottom: `-1rem`,
                      clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                    }"
                  ></div>
                </div>
                <div
                  v-for="style in g"
                  :key="style.id"
                  @click.stop="
                    dataStore.forceToggleStyle(style.id, style.max_lb)
                  "
                  :style="{
                    position: `relative`,
                    backgroundImage: `url(${`https://assets.hbr.quest/v1/hbr/${style.strip.replace(
                      `Party`,
                      `StylePiece`
                    )}`})`,
                    // backgroundColor: `#000`,
                    width: `5rem`,
                    height: `5rem`,
                    backgroundSize: `135%`,
                    backgroundPosition: `center`,
                    marginRight: `-0.25rem`,
                    marginLeft: `-0.25rem`,
                    marginBottom: `-1rem`,
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
                      left: `calc(50% - 0.75rem)`,
                      color: `black`,
                      borderRadius: `50%`,
                      width: `1.5rem`,
                      height: `1.5rem`,
                      textAlign: `center`,
                      userSelect: `none`,
                      clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                      // textShadow: `1px 1px 0px #21212133`,
                      background: `linear-gradient(180deg, #ffffffaa 100%, #ffffff00 100%)`,
                    }"
                    class="d-flex align-center justify-center"
                  >
                    <span
                      class="d-block"
                      :style="{
                        fontSize: `1rem`,
                        lineHeight: `1rem`,
                      }"
                      >{{ `${dataStore.getStyle(style.id)[1]}` }}</span
                    >
                    <!-- <img :src="`/ui/ExchangeBadgeicon.webp`" :width="24" :height="24" /> -->
                  </div>
                  <div
                    v-if="false && dataStore.getStyle(style.id)[1] > 0"
                    :style="{
                      position: `absolute`,
                      top: `0.5rem`,
                      left: `calc(50% - 20.5px)`,
                      color: `black`,
                      fontSize: `0.75rem`,
                      lineHeight: `0.75rem`,
                      // borderRadius: `50%`,
                      width: `41.55555555555556px`,
                      height: `12px`,
                      textAlign: `center`,
                      // clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                      // textShadow: `1px 1px 0px #21212133`,
                      filter: `drop-shadow(0px 0px 0px #000)`,
                      // background: `linear-gradient(180deg, #ffffffaa 100%, #ffffff00 100%)`,
                    }"
                  >
                    <!-- {{ `${dataStore.getStyle(style.id)[1]}` }} -->
                    <img
                      :src="`/ui/ImageStarScore0${
                        dataStore.getStyle(style.id)[1]
                      }.webp`"
                      :width="41.55555555555556"
                      :height="12"
                    />
                  </div>
                  <div
                    v-if="dataStore.getStyle(style.id)[1] < 0"
                    :style="{
                      width: `100%`,
                      height: `100%`,
                      background: `#000000bb`,
                    }"
                  ></div>
                </div>
                <template
                  v-if="
                    (elg.groups.length > 1 && gi === elg.groups.length - 1) ||
                    elg.groups.length === 1
                  "
                >
                  <div
                    v-for="n in (gi % 2 === 0
                      ? imagePerHexagonLine
                      : imagePerHexagonLine - 1) - g.length"
                    :key="`empty-${n}`"
                    :style="{
                      position: `relative`,
                      background: `transparent`,
                      width: `5rem`,
                      height: `5rem`,
                      backgroundSize: `135%`,
                      backgroundPosition: `center`,
                      marginRight: `-0.25rem`,
                      marginLeft: `-0.25rem`,
                      marginBottom: `-1rem`,
                      clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                    }"
                  ></div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <template v-else-if="templateSelection === 5">
          <div
            :style="{
              width: `${
                imagePerLine * 160 + 0.125 * 16 * (imagePerLine - 1)
              }px`,
            }"
            class="mx-auto"
          >
            <div
              ref="styleList"
              class="d-flex flex-wrap align-center justify-start"
              :style="{ gap: `0.125rem` }"
            >
              <div
                v-for="style in dataStore.getStyles?.filter(
                  (s) => Number(CardRarity[s.tier]) >= 3
                )"
                :key="style.id"
                :style="{
                  position: `relative`,
                }"
                @click.stop="dataStore.forceToggleStyle(style.id, style.max_lb)"
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
                  :src="`https://assets.hbr.quest/v1/hbr/${style.strip.replace(
                    `Party`,
                    `Select`
                  )}`"
                  :style="{
                    opacity: dataStore.getStyle(style.id)[1] > -1 ? 1 : 0.5,
                  }"
                />
              </div>
            </div>
          </div>
        </template>
        <div
          v-else
          class="mx-auto"
          :style="{ width: `${5 * imagePerHexagonLine - 2}rem` }"
        >
          <div ref="styleList" class="py-3">
            <div
              class="pt-1 pb-5"
              :style="
                true
                  ? {}
                  : {
                      filter: `drop-shadow(-1px -1px 0 #9f4f4f) drop-shadow(0 -1px 0 #9f4f4f) drop-shadow(1px -1px 0 #9f4f4f) drop-shadow(1px 0 0 #9f4f4f) drop-shadow(1px 1px 0 #9f4f4f) drop-shadow(0 1px 0 #9f4f4f) drop-shadow(-1px 1px 0 #9f4f4f) drop-shadow(-1px 0 0 #9f4f4f`,
                    }
              "
            >
              <div
                v-for="(g, gi) in hexagonGroups"
                :key="gi"
                class="d-flex flex-wrap align-center justify-center"
                :style="{ gap: `0.125rem` }"
              >
                <div
                  v-for="style in g"
                  :key="style.id"
                  @click.stop="
                    dataStore.forceToggleStyle(style.id, style.max_lb)
                  "
                  :style="{
                    position: `relative`,
                    backgroundImage: `url(${`https://assets.hbr.quest/v1/hbr/${style.strip.replace(
                      `Party`,
                      `StylePiece`
                    )}`})`,
                    // backgroundColor: `#000`,
                    width: `5rem`,
                    height: `5rem`,
                    backgroundSize: `135%`,
                    backgroundPosition: `center`,
                    marginRight: `-0.25rem`,
                    marginLeft: `-0.25rem`,
                    marginBottom: `-1rem`,
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
                      left: `calc(50% - 0.75rem)`,
                      color: `black`,
                      borderRadius: `50%`,
                      width: `1.5rem`,
                      height: `1.5rem`,
                      textAlign: `center`,
                      userSelect: `none`,
                      clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                      // textShadow: `1px 1px 0px #21212133`,
                      background: `linear-gradient(180deg, #ffffffaa 100%, #ffffff00 100%)`,
                    }"
                    class="d-flex align-center justify-center"
                  >
                    <span
                      class="d-block"
                      :style="{
                        fontSize: `1rem`,
                        lineHeight: `1rem`,
                      }"
                      >{{ `${dataStore.getStyle(style.id)[1]}` }}</span
                    >
                    <!-- <img :src="`/ui/ExchangeBadgeicon.webp`" :width="24" :height="24" /> -->
                  </div>
                  <div
                    v-if="false && dataStore.getStyle(style.id)[1] > 0"
                    :style="{
                      position: `absolute`,
                      top: `0.5rem`,
                      left: `calc(50% - 20.5px)`,
                      color: `black`,
                      fontSize: `0.75rem`,
                      lineHeight: `0.75rem`,
                      // borderRadius: `50%`,
                      width: `41.55555555555556px`,
                      height: `12px`,
                      textAlign: `center`,
                      // clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                      // textShadow: `1px 1px 0px #21212133`,
                      filter: `drop-shadow(0px 0px 0px #000)`,
                      // background: `linear-gradient(180deg, #ffffffaa 100%, #ffffff00 100%)`,
                    }"
                  >
                    <!-- {{ `${dataStore.getStyle(style.id)[1]}` }} -->
                    <img
                      :src="`/ui/ImageStarScore0${
                        dataStore.getStyle(style.id)[1]
                      }.webp`"
                      :width="41.55555555555556"
                      :height="12"
                    />
                  </div>
                  <div
                    v-if="dataStore.getStyle(style.id)[1] < 0"
                    :style="{
                      width: `100%`,
                      height: `100%`,
                      background: `#000000bb`,
                    }"
                  ></div>
                </div>
                <template v-if="gi === hexagonGroups.length - 1">
                  <div
                    v-for="n in (gi % 2 === 0
                      ? imagePerHexagonLine
                      : imagePerHexagonLine - 1) - g.length"
                    :key="`empty-${n}`"
                    :style="{
                      position: `relative`,
                      background: `transparent`,
                      width: `5rem`,
                      height: `5rem`,
                      backgroundSize: `135%`,
                      backgroundPosition: `center`,
                      marginRight: `-0.25rem`,
                      marginLeft: `-0.25rem`,
                      marginBottom: `-1rem`,
                      clipPath: `polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%)`,
                    }"
                  ></div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3 pb-1">
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
                    {{ `Download` }}
                  </div>
                </v-img>
              </v-btn>
            </template>
          </v-hover>
        </v-toolbar-items>
        <template v-slot:extension>
          <v-sheet
            flat
            color="transparent"
            widith="100%"
            class="d-flex flex-row align-center justify-center"
          >
            <v-radio-group
              v-model="templateSelection"
              type="number"
              class="text-white"
              inline
              hide-details
              name="Template Selector"
            >
              <v-radio :value="1"></v-radio>
              <v-radio :value="2"></v-radio>
              <v-radio :value="3"></v-radio>
              <v-radio :value="4"></v-radio>
              <v-radio :value="5"></v-radio>
            </v-radio-group>
          </v-sheet>
        </template>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useStyleStore, useSearchStore } from "@/store/app";
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useDisplay } from "vuetify";
import {
  ElementList,
  ElementListGroup,
  RarityList,
  RarityListGroup,
  RoleList,
  RoleListGroup,
  Style,
} from "@/types";

// @ts-ignore
import domtoimage from "dom-to-image-more";
import { CardRarity, CharacterRole, ElementType } from "@/enums";
const route = useRoute();
const router = useRouter();

const searchStore = useSearchStore();
const dataStore = useStyleStore();
const { width } = useDisplay();
const share = ref(route.query.v === `box`);
const styleList = ref(null as HTMLElement | null);
// const fileData = ref(undefined)

// const imagePerLine = ref(5);
// const imagePerHexagonLine = ref(10);
const imagePerLine = computed(() => {
  return 5;
  // return width.value > 960 ? Math.trunc((width.value - 128) / 160) : 5;
});
const imagePerHexagonLine = computed(() => {
  return 10;
  // return width.value > 960 ? Math.trunc((width.value - 128) / 80) : 10;
});

const templateSelection = ref(1);

const fileName = ref(
  `t${templateSelection.value}-${
    route.name === `RosterManEn` ? `memoria` : `style`
  }-box.png`
);

const catchEsc = (e: KeyboardEvent) => {
  // ignore normal browsing behavior
  if (e.key === `Escape` && share.value) {
    e.preventDefault();
  }
};
onMounted(() => document.addEventListener("keydown", catchEsc));
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc));

watch(route, () => {
  // displayed.value = 40
  // activeFilters.value = []
  share.value = route.query.v === `box`;
  searchStore.menuFlag = route.query.v === `box`;
  // initialize()
});

watch(share, () => {
  searchStore.menuFlag = route.query.v === `box`;
});

const showBox = () => {
  setTimeout(
    () =>
      router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: `box` },
      }),
    150
  );
};

// const showShare = () => {
//   share.value = true;
// };

const closeShare = () => {
  setTimeout(
    () =>
      router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: undefined },
      }),
    150
  );
};

const styleGroups = computed(() => {
  return dataStore.getStyles
    ? templateSelection.value > 2
      ? templateSelection.value > 3
        ? groupByTier(dataStore.getStyles)
        : groupByNatureElement(dataStore.getStyles)
      : groupByRole(dataStore.getStyles)
    : [];
});

const hexagonGroups = computed(() => {
  return dataStore.getStyles ? groupForHexagonList(dataStore.getStyles) : [];
});

const groupByNatureElement = (styleList: Style[]): ElementListGroup[] => {
  return styleList
    .filter((s) => Number(CardRarity[s.tier]) >= 3)
    .reduce((acc, s) => {
      let styleElement = s.elements.length > 0 ? s.elements[0] : ElementType[6];
      let elementIndex = acc.findIndex((sl) => styleElement === sl.element);

      if (elementIndex > -1) {
        return acc.map((sl) =>
          sl.element === styleElement ? { ...sl, list: [...sl.list, s] } : sl
        );
      }
      return [...acc, { element: styleElement, list: [s] }];
    }, [] as ElementList[])
    .map((sl) => {
      return { element: sl.element, groups: groupForHexagonList(sl.list) };
    })
    .sort((a, b) => ElementType[a.element] - ElementType[b.element]);
};

const groupByRole = (styleList: Style[]): RoleListGroup[] => {
  return styleList
    .filter((s) => Number(CardRarity[s.tier]) >= 3)
    .reduce((acc, s) => {
      let styleRole = s.role;
      let elementIndex = acc.findIndex((sl) => styleRole === sl.element);

      if (elementIndex > -1) {
        return acc.map((sl) =>
          sl.element === styleRole ? { ...sl, list: [...sl.list, s] } : sl
        );
      }
      return [...acc, { element: styleRole, list: [s] }];
    }, [] as RoleList[])
    .map((sl) => {
      return { element: sl.element, groups: groupForHexagonList(sl.list) };
    })
    .sort((a, b) => CharacterRole[a.element] - CharacterRole[b.element]);
};

const groupByTier = (styleList: Style[]): RarityListGroup[] => {
  return styleList
    .filter((s) => Number(CardRarity[s.tier]) >= 3)
    .reduce((acc, s) => {
      let styleRarity = s.tier;
      let elementIndex = acc.findIndex((sl) => styleRarity === sl.element);

      if (elementIndex > -1) {
        return acc.map((sl) =>
          sl.element === styleRarity ? { ...sl, list: [...sl.list, s] } : sl
        );
      }
      return [...acc, { element: styleRarity, list: [s] }];
    }, [] as RarityList[])
    .map((sl) => {
      return { element: sl.element, groups: groupForHexagonList(sl.list) };
    })
    .sort((a, b) => CardRarity[b.element] - CardRarity[a.element]);
};

const groupForHexagonList = (styleList: Style[]): Style[][] => {
  return styleList
    .filter((s) => Number(CardRarity[s.tier]) >= 3)
    .reduce((acc, s) => {
      if (acc.length < 1) {
        return [[s]];
      } else if (
        acc[acc.length - 1].length <
        ((acc.length - 1) % 2 === 0
          ? imagePerHexagonLine.value
          : imagePerHexagonLine.value - 1)
      ) {
        return acc.map((sg, sgi) => (sgi === acc.length - 1 ? [...sg, s] : sg));
      }
      return [...acc, [s]];
    }, [] as Style[][]);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(getEncodedData());
    alert("Copied!");
  } catch ($e) {
    alert("Cannot copy.");
  }
};

watch(templateSelection, () => {
  fileName.value = `t${templateSelection.value}-${
    route.name === `RosterManEn` ? `memoria` : `style`
  }-box.png`;
});

const generateImage = async () => {
  try {
    if (styleList.value) {
      const scale = 1;
      await domtoimage
        .toPng(styleList.value, {
          cacheBust: true,
          width: styleList.value.clientWidth * scale,
          height: styleList.value.clientHeight * scale,
          style: {
            transform: "scale(" + scale + ")",
            transformOrigin: "top left",
          },
        })
        .then((dataUrl: any) => {
          // var img = new Image();
          // img.src = dataUrl;
          // document.body.appendChild(img);
          var link = document.createElement("a");
          link.download = fileName.value;
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

<style lang="scss">
.v-toolbar__extension {
  display: flex;
  flex-flow: column;
}
</style>
