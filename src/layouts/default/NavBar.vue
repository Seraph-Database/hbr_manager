<template>
    <v-navigation-drawer color="#ffffffc0" :scrim="false"
        :width="$vuetify.display.width > 960 && lotteryStore.getDisplayCardFlag && false ? 256 : 80" temporary touchless
        floating v-model:model-value="lotteryStore.activeResults">
        <v-slide-y-transition appear leave-absolute>
            <div class="pa-2 py-0">
                <swiper :modules="swiperModules"
                    :autoplay="{ delay: lotteryStore.getDisplayCardFlag ? 500 : 1000, disableOnInteraction: true, stopOnLastSlide: true }"
                    :height="$vuetify.display.height - 80" direction="vertical" :key="lotteryStore.getAmountSpent"
                    :slides-per-view="`auto`" :space-between="0" :grab-cursor="false" :loop="false">
                    <swiper-slide v-for="card, cindex in lotteryStore.getGachaResults.slice(0, lotteryStore.getLastRollNum)" :key="cindex">
                        <v-img class="my-2" transition="scale-transition"
                            :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="4rem" height="4rem">
                            <v-img v-if="lotteryStore.getDisplayCardFlag && (lotteryStore.getDisplayTrashFlag || card.split(`_`)[1].replace(`a`, ``) === `R3`)"
                                transition="scale-transition" :src="`https://hbr.quest/hbr/${card}`" width="4rem"
                                height="4rem">
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        <v-btn v-bind="props" icon variant="flat" class="card-link" color="transparent"
                                            width="4rem" height="4rem">
                                            <v-img v-if="isHovering" class="card-rarity" transition="scale-transition"
                                                :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="3rem">
                                            </v-img>
                                        </v-btn>
                                    </template>
                                </v-hover>
                            </v-img>
                        </v-img>
                    </swiper-slide>
                </swiper>
            </div>
        </v-slide-y-transition>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper';

import { useLotteryStore } from '@/store/app';
import { ref } from 'vue';

const lotteryStore = useLotteryStore()
const swiperModules = ref([Autoplay])
</script>

<style lang="scss">
.card-link {
    position: relative;
}

.card-rarity {
    position: absolute;
    z-index: -1;
}
</style>