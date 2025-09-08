<template>
  <page-title
    :title="`${
      dataStore.getLotteryData ? `${dataStore.getLotteryData.name} - ` : ``
    }Gacha Simulator`"
  />
  <v-container fluid v-if="dataStore.getGachaList !== undefined">
    <v-slide-y-transition appear>
      <v-row
        v-if="dataStore.getLotteryData && dataStore.getLastRollNum > 0"
        no-gutters
      >
        <v-spacer />
        <v-col cols="auto">
          <v-sheet color="#ffffffc0" rounded="pill" class="quartz-num px-2">
            <v-row
              v-if="dataStore.getLotteryData.ticket"
              no-gutters
              align="center"
              justify="space-between"
            >
              <v-col cols="auto">
                <v-img
                  :src="`${assetBucketUrl}/hbr/${dataStore.getLotteryData.ticket.image}`"
                  width="1.5rem"
                />
              </v-col>
              <v-col cols="auto" class="px-1 text-HBR">
                {{
                  `${(
                    dataStore.getLotteryData.cost * dataStore.getRollCount
                  ).toLocaleString()}`
                }}
              </v-col>
            </v-row>
            <v-row v-else no-gutters align="center" justify="space-between">
              <v-col cols="auto">
                <v-img
                  :src="`${assetBucketUrl}/hbr/IconHcSmall.webp`"
                  width="1.5rem"
                />
              </v-col>
              <v-col cols="auto" class="px-1 text-HBR">
                {{ `${dataStore.getAmountSpent.toLocaleString()}` }}
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-slide-y-transition>
    <v-slide-y-transition appear>
      <v-row v-if="dataStore.getTotalResults.length > 0" no-gutters>
        <v-spacer />
        <v-col cols="auto">
          <v-sheet
            rounded="pill"
            class="quartz-num px-2 mt-2"
            color="#ffffffc0"
          >
            <v-row no-gutters align="center" justify="space-between">
              <v-col cols="auto">
                <v-img :src="`${assetBucketUrl}/ui/R3.webp`" width="1.5rem" />
              </v-col>
              <v-col cols="auto" class="px-1 text-HBR">
                {{
                  `×${
                    dataStore.getTotalResults.filter((r) => r.includes(`R3`))
                      .length
                  }(${(
                    (dataStore.getTotalResults.reduce(
                      (acc, r) => (r.includes(`R3`) ? acc + 1 : acc),
                      0
                    ) /
                      dataStore.getTotalResults.length) *
                    100
                  ).toFixed(2)}%)`
                }}
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-slide-y-transition>
    <!-- <v-slide-y-transition appear>
      <v-row v-if="dataStore.getLotteryData" no-gutters>
        <v-spacer />
        <v-col cols="auto">
          <v-sheet
            rounded="pill"
            class="quartz-num px-2 mt-2"
            color="#ffffffc0"
          >
            <v-row no-gutters align="center" justify="space-between">
              <v-col cols="auto">
                <v-img :src="`${assetBucketUrl}/ui/R3.webp`" width="1.5rem" />
              </v-col>
              <v-col cols="auto" class="px-1 text-HBR">
                {{
                  `Prize List`
                }}
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-slide-y-transition> -->
    <template v-if="isStepUp">
      <v-slide-y-reverse-transition appear>
        <v-row
          v-if="
            dataStore.getLotteryData !== undefined &&
            !dataStore.activeResults &&
            dataStore.getLotteryData.steps !== null
          "
          no-gutters
          :class="`gacha-actions${
            $vuetify.display.mdAndDown ? ` gacha-actions--mobile` : ``
          }`"
          justify="end"
        >
          <v-spacer />
          <v-col cols="auto">
            <v-btn
              variant="text"
              color="transparent"
              @click="
                hasNextStep
                  ? rollGacha(
                      dataStore.getLotteryData.steps[dataStore.getRollCount]
                        .count,
                      dataStore.getLotteryData.steps[dataStore.getRollCount]
                        .cost
                    )
                  : rollGacha(0, 0)
              "
              width="14rem"
              height="5.779375rem"
              :disabled="atMaxDraws"
            >
              <v-img
                class="gacha-btn"
                :src="
                  atMaxDraws
                    ? `${assetBucketUrl}/ui/ButtonLottery_Disabled.webp`
                    : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Nomal.webp`
                "
                width="14rem"
              >
                <v-img
                  class="gacha-btn--focused"
                  :src="
                    gachaBtnFocus === 10
                      ? `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Active.webp`
                      : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Focused.webp`
                  "
                  width="14rem"
                />
                <v-sheet
                  :class="`gacha-cost`"
                  width="10rem"
                  color="#ffffff00"
                  rounded="pill"
                  class="px-2 pl-3"
                >
                  <v-row
                    class="mb-n1 guarantee-text"
                    no-gutters
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR text-small">
                      {{
                        dataStore.getLotteryData.draw_limit.max_draws > 0
                          ? `${dataStore.getLotteryData.draw_limit.max_draws}× max`
                          : `&nbsp;`
                      }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                  <v-row no-gutters align="center" justify="space-between">
                    <v-col cols="auto">
                      <v-img
                        :src="`${assetBucketUrl}/hbr/${`IconHcSmall.webp`}`"
                        width="1.625rem"
                        height="1.625rem"
                        class="quartz-icon"
                      />
                    </v-col>
                    <v-col cols="auto" class="px-2 text-HBR quartz-cost">
                      {{
                        hasNextStep
                          ? `${dataStore.getLotteryData.steps[
                              dataStore.getRollCount
                            ].cost.toLocaleString()}`
                          : `${dataStore.getLotteryData.steps[0].cost.toLocaleString()}`
                      }}
                    </v-col>
                  </v-row>
                  <v-row
                    class="times-text"
                    no-gutters
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR">
                      {{
                        hasNextStep
                          ? `${
                              dataStore.getLotteryData.steps[
                                dataStore.getRollCount
                              ].count
                            }×`
                          : `${dataStore.getLotteryData.steps[0].count}×`
                      }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                </v-sheet>
              </v-img>
            </v-btn>
          </v-col>
        </v-row>
      </v-slide-y-reverse-transition>
    </template>
    <template v-else>
      <v-slide-y-reverse-transition appear>
        <v-row
          v-if="dataStore.getLotteryData && !dataStore.activeResults"
          no-gutters
          :class="`gacha-actions${
            $vuetify.display.mdAndDown ? ` gacha-actions--mobile` : ``
          }`"
          justify="end"
        >
          <v-spacer />
          <v-col
            cols="auto"
            v-if="
              ([`Gem`, `TicketOrGem`].includes(
                dataStore.getLotteryData.currency
              ) &&
                !dataStore.getLotteryData.is_free) ||
              (dataStore.getLotteryData.count === 1 &&
                dataStore.getLotteryData.is_free)
            "
          >
            <v-btn
              variant="text"
              color="transparent"
              @click="
                rollGacha(1, dataStore.getLotteryData.is_free ? 0 : rollCost[0])
              "
              width="14rem"
              height="5.779375rem"
              :disabled="atMaxDraws"
            >
              <v-img
                class="gacha-btn"
                :src="
                  atMaxDraws
                    ? `${assetBucketUrl}/ui/ButtonLottery_Disabled.webp`
                    : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Nomal.webp`
                "
                width="14rem"
              >
                <v-img
                  class="gacha-btn--focused"
                  :src="
                    gachaBtnFocus === 1
                      ? `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Active.webp`
                      : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Focused.webp`
                  "
                  width="14rem"
                />
                <v-sheet
                  :class="`gacha-cost`"
                  width="10rem"
                  color="#ffffff00"
                  rounded="pill"
                  class="px-2 pl-3"
                >
                  <v-row
                    class="mb-n1 guarantee-text"
                    no-gutters
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR text-small">
                      {{
                        dataStore.getLotteryData.draw_limit.max_draws > 0
                          ? `${dataStore.getLotteryData.draw_limit.max_draws}× max`
                          : `&nbsp;`
                      }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                  <v-row no-gutters align="center" justify="space-between">
                    <v-col cols="auto">
                      <v-img
                        :src="`${assetBucketUrl}/hbr/${
                          (dataStore.getLotteryData.ticket &&
                            dataStore.getLotteryData.ticket.image) ||
                          `IconHcSmall.webp`
                        }`"
                        width="1.625rem"
                        height="1.625rem"
                        class="quartz-icon"
                      />
                    </v-col>
                    <v-col cols="auto" class="px-2 text-HBR quartz-cost">
                      {{
                        `${(dataStore.getLotteryData.is_free
                          ? 0
                          : rollCost[0]
                        ).toLocaleString()}`
                      }}
                    </v-col>
                  </v-row>
                  <v-row
                    no-gutters
                    class="times-text"
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR">
                      {{ `1×` }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                </v-sheet>
              </v-img>
            </v-btn>
          </v-col>
          <v-col cols="auto" v-if="dataStore.getLotteryData.count > 1">
            <v-btn
              variant="text"
              color="transparent"
              @click="
                rollGacha(
                  dataStore.getLotteryData.count,
                  dataStore.getLotteryData.is_free ? 0 : rollCost[1]
                )
              "
              width="14rem"
              height="5.779375rem"
              :disabled="atMaxDraws"
            >
              <v-img
                class="gacha-btn"
                :src="
                  atMaxDraws
                    ? `${assetBucketUrl}/ui/ButtonLottery_Disabled.webp`
                    : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Nomal.webp`
                "
                width="14rem"
              >
                <v-img
                  class="gacha-btn--focused"
                  :src="
                    gachaBtnFocus === 10
                      ? `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Active.webp`
                      : `${assetBucketUrl}/ui/ButtonLottery_${buttonColor}Focused.webp`
                  "
                  width="14rem"
                />
                <v-sheet
                  :class="`gacha-cost`"
                  width="10rem"
                  color="#ffffff00"
                  rounded="pill"
                  class="px-2 pl-3"
                >
                  <v-row
                    class="mb-n1 guarantee-text"
                    no-gutters
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR text-small">
                      {{
                        dataStore.getLotteryData.draw_limit.max_draws > 0
                          ? `${dataStore.getLotteryData.draw_limit.max_draws}× max`
                          : `&nbsp;`
                      }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                  <v-row no-gutters align="center" justify="space-between">
                    <v-col cols="auto">
                      <v-img
                        :src="`${assetBucketUrl}/hbr/${
                          (dataStore.getLotteryData.ticket &&
                            dataStore.getLotteryData.ticket.image) ||
                          `IconHcSmall.webp`
                        }`"
                        width="1.625rem"
                        height="1.625rem"
                        class="quartz-icon"
                      />
                    </v-col>
                    <v-col cols="auto" class="px-2 text-HBR quartz-cost">
                      {{
                        `${(dataStore.getLotteryData.is_free
                          ? 0
                          : dataStore.getLotteryData.cost
                        ).toLocaleString()}`
                      }}
                    </v-col>
                  </v-row>
                  <v-row
                    class="times-text"
                    no-gutters
                    align="center"
                    justify="space-between"
                  >
                    <v-spacer />
                    <v-col cols="auto" class="px-1 text-HBR">
                      {{ `10×` }}
                    </v-col>
                    <v-spacer />
                  </v-row>
                </v-sheet>
              </v-img>
            </v-btn>
          </v-col>
        </v-row>
      </v-slide-y-reverse-transition>
    </template>
  </v-container>
  <v-bottom-navigation
    v-if="dataStore.getGachaList !== undefined"
    :height="70"
    bg-color="#212121c0"
  >
    <v-container fluid class="pa-1 ma-0">
      <swiper
        slide-to-clicked-slide
        :slides-per-view="Math.floor($vuetify.display.width / 160)"
        :space-between="0"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :centered-slides="true"
        :grab-cursor="true"
        :initial-slide="dataStore.getCurrentIndex"
        :loop="false"
      >
        <swiper-slide
          v-for="(lottery, lotIndex) in dataStore.getGachaList
            .filter((g) => g.is_free || g.steps !== null || g.count > 1)
            .sort((a, b) => b.in_date.localeCompare(a.in_date))"
        >
          <v-img
            :class="
              lotIndex === dataStore.getCurrentIndex
                ? `lottery--selected`
                : `lottery`
            "
            :src="`${assetBucketUrl}/${
              route.name?.toString().endsWith(`En`) ? `en/` : ``
            }hbr/${lottery.banner}?h=ABC`"
            width="10rem"
            height="calc(10rem * 56 / 144)"
          >
          </v-img>
        </swiper-slide>
      </swiper>
    </v-container>
  </v-bottom-navigation>
  <v-dialog
    :scrim="true"
    scrollable
    :max-width="$vuetify.display.smAndUp ? `32rem` : `20rem`"
    :min-height="$vuetify.display.smAndUp ? `18rem` : `13rem`"
    v-model:model-value="dataStore.activeResults"
  >
    <div class="v-card__white-frame--top-left"></div>
    <div class="v-card__white-frame--bottom-right"></div>
    <v-card
      rounded="0"
      class="v-card--shadowless"
      :max-width="$vuetify.display.smAndUp ? `32rem` : `20rem`"
      color="#ffffffc0"
      :height="$vuetify.display.smAndUp ? `18rem` : `13rem`"
    >
      <template v-slot:image>
        <v-img cover src="/ui/BgLotteryCommon.webp" />
      </template>

      <!-- <v-card-title>
                <span class="text-h5">Gacha Results</span>
            </v-card-title> -->

      <v-card-text class="gacha-results pa-1">
        <v-slide-y-transition appear leave-absolute>
          <v-row
            v-if="$vuetify.display.smAndUp"
            no-gutters
            align="center"
            justify="center"
          >
            <v-col
              class="roll-slot"
              cols="auto"
              v-for="card in dataStore.getGachaResults.slice(
                0,
                dataStore.getLastRollNum
              )"
            >
              <v-img
                class="ma-2"
                transition="scale-transition"
                :src="`${assetBucketUrl}/ui/${card.split(`_`)[1].replace(/[a-z]/g, ``)}.webp`"
                width="5rem"
                height="5rem"
              >
                <v-img
                  v-if="
                    dataStore.getDisplayCardFlag &&
                    (dataStore.getDisplayTrashFlag ||
                      card.split(`_`)[1].replace(/[a-z]/g, ``) === `R3`)
                  "
                  transition="scale-transition"
                  :src="`${assetBucketUrl}/hbr/${card}`"
                  width="5rem"
                  height="5rem"
                >
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        icon
                        variant="flat"
                        class="card-link"
                        color="transparent"
                        width="5rem"
                        height="5rem"
                      >
                        <v-img
                          v-if="isHovering"
                          class="card-rarity"
                          transition="scale-transition"
                          :src="`${assetBucketUrl}/ui/${card
                            .split(`_`)[1]
                            .replace(/[a-z]/g, ``)}.webp`"
                          width="3rem"
                        >
                        </v-img>
                      </v-btn>
                    </template>
                  </v-hover>
                </v-img>
              </v-img>
            </v-col>
          </v-row>
          <v-row v-else no-gutters align="center" justify="center">
            <v-col
              class="roll-slot"
              cols="auto"
              v-for="card in dataStore.getGachaResults.slice(
                0,
                dataStore.getLastRollNum
              )"
            >
              <v-img
                class="gacha-icon"
                transition="scale-transition"
                :src="`${assetBucketUrl}/ui/${card.split(`_`)[1].replace(/[a-z]/g, ``)}.webp`"
                width="3.5rem"
                height="3.5rem"
              >
                <v-img
                  v-if="
                    dataStore.getDisplayCardFlag &&
                    (dataStore.getDisplayTrashFlag ||
                      card.split(`_`)[1].replace(/[a-z]/g, ``) === `R3`)
                  "
                  transition="scale-transition"
                  :src="`${assetBucketUrl}/hbr/${card}`"
                  width="3.5rem"
                  height="3.5rem"
                >
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        icon
                        variant="flat"
                        class="card-link"
                        color="transparent"
                        width="3.5rem"
                        height="3.5rem"
                      >
                        <v-img
                          v-if="isHovering"
                          class="card-rarity"
                          transition="scale-transition"
                          :src="`${assetBucketUrl}/ui/${card
                            .split(`_`)[1]
                            .replace(/[a-z]/g, ``)}.webp`"
                          width="2rem"
                        >
                        </v-img>
                      </v-btn>
                    </template>
                  </v-hover>
                </v-img>
              </v-img>
            </v-col>
          </v-row>
        </v-slide-y-transition>
      </v-card-text>
      <v-card-actions class="pb-2" v-if="dataStore.getLotteryData">
        <v-slide-y-transition appear hide-on-leave>
          <v-row no-gutters justify="space-between" align="center" class="mx-2">
            <v-col cols="auto">
              <v-btn disabled icon class="text-white"> </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-img
                class="gacha-btn"
                :src="`${assetBucketUrl}/ui/ButtonLottery01Normal.webp`"
                width="10rem"
              >
                <v-img
                  class="gacha-btn--focused"
                  :src="
                    gachaBtnFocus === 1
                      ? `${assetBucketUrl}/ui/ButtonLottery01Active.webp`
                      : `${assetBucketUrl}/ui/ButtonLottery01Focused.webp`
                  "
                  width="14rem"
                />
                <v-btn
                  v-if="
                    dataStore.getLotteryData.draw_limit.max_draws < 1 ||
                    dataStore.getRollCount <
                      dataStore.getLotteryData.draw_limit.max_draws
                  "
                  variant="text"
                  color="transparent"
                  @click="
                    isStepUp && dataStore.getLotteryData.steps !== null
                      ? rollGacha(
                          dataStore.getLotteryData.steps[dataStore.getRollCount]
                            .count,
                          dataStore.getLotteryData.steps[dataStore.getRollCount]
                            .cost
                        )
                      : rollGacha(
                          dataStore.getLastRollNum,
                          (dataStore.getLotteryData?.is_free
                            ? 0
                            : rollCost[0]) * dataStore.getLastRollNum
                        )
                  "
                  width="12rem"
                  height="3.78076062639821rem"
                  class="repeat-gacha-btn"
                >
                  <span>{{
                    isStepUp && dataStore.getLotteryData.steps !== null
                      ? `Roll ${
                          dataStore.getLotteryData.steps[dataStore.getRollCount]
                            .text
                        }`
                      : `Roll Again`
                  }}</span>
                </v-btn>
                <v-btn
                  v-else
                  variant="text"
                  color="transparent"
                  @click="dataStore.activeResults = false"
                  width="12rem"
                  height="3.78076062639821rem"
                  class="repeat-gacha-btn"
                >
                  <span>{{ `Close` }}</span>
                </v-btn>
              </v-img>
            </v-col>
            <v-col cols="auto">
              <v-btn
                icon
                class="text-white"
                @click="dataStore.toggleTrash(!dataStore.getDisplayTrashFlag)"
              >
                <v-icon
                  :icon="`mdi-delete${
                    dataStore.getDisplayTrashFlag ? `` : `-off`
                  }`"
                ></v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-slide-y-transition>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import PageTitle from "@/components/default/PageTitle.vue";
import { useLotteryStore } from "@/store/app";
import { useRoute, useRouter } from "vue-router";
import { GachaRate, type GachaCard, type Lottery } from "@/types";
import { computed, ref } from "vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

const dataStore = useLotteryStore();
const route = useRoute();
const router = useRouter();
const swiperInstance = ref();
const gachaBtnFocus = ref(0 as number);
const rollCost = ref([300, 3000]);
const assetBucketUrl = ref(`https://assets.hbr.quest/v1/`)

const loadData = async () => {
  if (dataStore.getGachaList === undefined) {
    await dataStore.loadGachaList(
      route.name?.toString().endsWith(`En`) ? `en` : ``
    );
  }
};

const buttonColor = computed(() =>
  dataStore.getLotteryData && dataStore.getLotteryData.currency === `ChargeGem`
    ? `Pink`
    : dataStore.getLotteryData && dataStore.getLotteryData.is_free
    ? `Blue`
    : `Gold`
);

loadData()
  .then(dataStore.cancelLoading)
  .then(() => {
    if (String(route.params.label).length > 0 && dataStore.getGachaList) {
      let bannerIndex = dataStore.getGachaList
        ?.filter((b) => b.is_free || b.steps !== null || b.count > 1)
        .map((b) => {
          return { ...b, label: b.label.replace(`lotteryShop_`, ``) };
        })
        .sort((a, b) => b.in_date.localeCompare(a.in_date))
        .findIndex(
          (b, bi) =>
            b.label.toLowerCase() === String(route.params.label).toLowerCase()
        );

      dataStore.updateIndex(bannerIndex);
      swiperInstance.value?.slideTo(dataStore.getCurrentIndex);
    }
  });

const onSwiper = (swiper: any) => {
  // console.log(swiper);
  swiperInstance.value = swiper;
};
const onSlideChange = (swiper: any) => {
  // console.log(swiper.activeIndex);
  dataStore.updateIndex(swiper.activeIndex);
  dataStore.clearAll();

  router.replace({
    params: { ...route.params, label: dataStore.getLotteryData?.label },
  });
};

const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isStepUp = computed((): boolean => {
  // if (dataStore.getLotteryData) {
  //   const isFree = dataStore.getLotteryData.is_free;
  //   const isStandard =
  //     dataStore.getLotteryData.draw_limit.max_draws < 4 &&
  //     dataStore.getLotteryData.currency.endsWith(`Gem`);
  //   const isTicket = dataStore.getLotteryData.currency.endsWith(`Ticket`);
  //   return !isStandard && !isFree && !isTicket;
  // }
  // return true;
  return dataStore.getLotteryData?.steps !== null;
});

const hasNextStep = computed((): boolean => {
  return (
    dataStore.getLotteryData !== undefined &&
    dataStore.getRollCount < dataStore.getLotteryData.draw_limit.max_draws
  );
});

const atMaxDraws = computed((): boolean => {
  return (
    dataStore.getLotteryData !== undefined &&
    dataStore.getLotteryData.draw_limit.max_draws > 0 &&
    dataStore.getRollCount >= dataStore.getLotteryData.draw_limit.max_draws
  );
});

const rollGacha = async (
  times: number,
  cost: number,
  useSteps: boolean = false
) => {
  // Get banner data
  dataStore.clearGachaResults();

  gachaBtnFocus.value = times;
  setTimeout(() => (gachaBtnFocus.value = 0), 150);

  // Process rolls
  if (dataStore.getLotteryData !== undefined) {
    dataStore.openResults();

    for (let index = 0; index < times; index++) {
      dataStore.toggleCard(false);
      await new Promise((r) => setTimeout(r, dataStore.getRollDelay));
      // let minNum = index < 9 ? 1 : 7901
      let num = randomIntFromInterval(1, 10000);
      // console.log(num)

      if (isStepUp && dataStore.getLotteryData.steps !== null && hasNextStep) {
        pickRatesAndRoll(
          dataStore.getLotteryData.steps[dataStore.getRollCount].rates,
          dataStore.getLotteryData.steps[dataStore.getRollCount].gss_rates,
          dataStore.getLotteryData.steps[dataStore.getRollCount].gss_step,
          num,
          index
        );
      } else {
        pickRatesAndRoll(
          dataStore.getLotteryData.rates,
          dataStore.getLotteryData.gss_rates,
          dataStore.getLotteryData.gss_step,
          num,
          index
        );
      }
      // await new Promise((r) => setTimeout(r, 250));
    }
    // console.log(`Rolled ${times} times!`)
    dataStore.updateAmountSpent(cost);
    dataStore.updateLastRollNum(times);
    dataStore.updateRollCount();
    await new Promise((r) => setTimeout(r, 250));
    dataStore.toggleCard(true);
  } else {
    console.log(`Banner data not found.`);
  }
};

const pickRatesAndRoll = (
  rates: GachaRate[],
  gssRates: GachaRate[],
  gssStep: number,
  num: number,
  index: number
) => {
  if (dataStore.getLotteryData !== undefined) {
    if (gssStep > 0 && index === gssStep - 1) {
      gssRates.every((r, ri) => {
        if (num - r.rate > 0) {
          num = num - r.rate;
          return true;
        } else {
          num = ri;
          return false;
        }
      });

      try {
        let result: GachaCard =
          gssRates[num].cards[
            Math.floor(Math.random() * gssRates[num].cards.length)
          ];
        dataStore.updateGachaResults(result.image);
      } catch (error) {
        console.log(`Error`);
      }
    } else {
      rates.every((r, ri) => {
        if (num - r.rate > 0) {
          num = num - r.rate;
          return true;
        } else {
          num = index < 9 || ri !== 0 ? ri : 1;
          return false;
        }
      });

      try {
        let result: GachaCard =
          rates[num].cards[Math.floor(Math.random() * rates[num].cards.length)];
        dataStore.updateGachaResults(result.image);
      } catch (error) {
        console.log(`Error`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lottery {
  opacity: 0.36;

  &.lottery--selection,
  &:hover {
    opacity: 1;
  }
}

.v-card__white-frame--top-left,
.v-card__white-frame--bottom-right {
  position: absolute;
  left: -0.125rem;
  right: 0.5rem;
  top: -0.125rem;
  bottom: 0;
  border-top: 0.125rem solid #fff;
  border-left: 0.125rem solid #fff;
  background: transparent;

  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    position: absolute;
    left: -0.3125rem;
    bottom: -0.3125rem;
    border-radius: 0.25rem;
    background-color: #fff;
    z-index: 2;
  }

  &.v-card__white-frame--bottom-right {
    border-top: none;
    border-left: none;
    border-bottom: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    right: -0.125rem;
    left: 0.5rem;
    bottom: -0.125rem;
    top: 0;

    &:after {
      top: -0.3125rem;
      right: -0.3125rem;
      bottom: unset;
      left: unset;
    }
  }
}

.v-card--shadowless {
  box-shadow: unset !important;
}

.quartz-icon {
  margin-top: -0.25rem;
}

.quartz-cost {
  padding-bottom: 0.0625rem !important;
}

.quartz-num {
  color: #212121;
  line-height: 1.5rem;
  box-shadow: 0 0 0.125rem #212121;
  min-width: 12rem;
  position: relative;

  // &:before {
  //     top: -0.25rem;
  //     left: 2rem;
  //     font-size: 0.5rem;
  //     position: absolute;
  //     display: block;
  //     content: 'TOTAL SPENT';
  //     font-weight: bold;
  // }
}

.gacha-results {
  background: linear-gradient(180deg, #212142c0 15%, #21212100 100%);
}

.gacha-icon {
  margin: 0.125rem;
}

.gacha-actions {
  position: fixed;
  bottom: 5rem;
  left: 0;
  right: 0.5rem;

  &.gacha-actions--mobile {
    // bottom: 3.25rem;
    // right: -3rem;

    > div {
      margin-top: -0.5rem;
    }
  }
}

.gacha-btn {
  position: relative;

  .gacha-btn--focused {
    display: none;
    position: absolute;
  }

  &:hover {
    .gacha-btn--focused {
      display: block;
    }
  }

  // &:hover:before {
  //     display: block;
  //     content: '';
  //     position: absolute;
  //     top: calc(100% - calc(167 * 5.779375rem / 180));
  //     left: calc(100% - calc(432 * 14rem / 436));
  //     width: calc(432 * 14rem / 436);
  //     height: calc(167 * 14rem / 436);
  //     background-image: url('/ui/ButtonLottery_GoldFocused.webp');
  //     background-size: contain;
  // }
}

.gacha-cost {
  position: absolute;
  top: calc(50% - 2.0625rem);
  left: calc(50% - 5rem);
  font-size: 0.625rem;
  color: #fff;
  text-shadow: 0 0 0.25rem #212121;
}

.gacha-actions--mobile {
  .gacha-cost {
    top: calc(50% - 2.3125rem);
  }
}

.repeat-gacha-btn {
  span {
    font-size: 1rem;
    color: #fff;
    text-shadow: 0 0 0.25rem #660000;
  }
}

.times-text {
  font-size: 0.9374rem;
  margin-top: -0.25rem !important;
  text-shadow: 0 0 0.25rem #660000;
}

.guarantee-text {
  font-size: 0.875rem;
  text-shadow: 0 0 0.25rem #660000;
}
</style>
