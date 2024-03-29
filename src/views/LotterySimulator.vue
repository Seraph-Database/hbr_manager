<template>
    <page-title :title="`${dataStore.getLotteryData ? `${dataStore.getLotteryData.name} - ` : ``}Gacha Simulator`" />
    <v-container fluid v-if="dataStore.getGachaList !== undefined">
        <v-slide-y-transition appear>
            <v-row v-if="dataStore.getLastRollNum > 0" no-gutters>
                <v-col>
                    <!-- <v-sheet v-if="false" :max-width="`${dataStore.getLastRollNum < 10 ? 6 : 53}rem`" height="6rem"
                        color="#ffffffc0" rounded="pill" class="gacha-results d-flex flex-row align-center pa-2">
                        <swiper :key="dataStore.getAmountSpent" :slides-per-view="dataStore.getLastRollNum"
                            :space-between="4" :grab-cursor="true" :loop="false">
                            <swiper-slide v-for="card in dataStore.getGachaResults.slice(0, dataStore.getLastRollNum)">
                                <v-img transition="scale-transition" :src="`https://hbr.quest/hbr/${card}`" width="5rem"
                                    height="5rem">
                                    <v-img transition="scale-transition"
                                        :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="3rem" />
                                </v-img>
                            </swiper-slide>
                        </swiper>
                    </v-sheet> -->
                </v-col>
                <v-col cols="auto">
                    <v-sheet color="#ffffffc0" rounded="pill" class="quartz-num px-2">
                        <v-row no-gutters align="center" justify="space-between">
                            <v-col cols="auto">
                                <v-img :src="`https://hbr.quest/hbr/IconHcSmall.webp`" width="1.5rem" />
                            </v-col>
                            <v-col cols="auto" class="px-1 text-HBR">
                                {{ `${(dataStore.getAmountSpent).toLocaleString()}` }}
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-slide-y-transition>
        <v-slide-y-transition appear>
            <v-row v-if="dataStore.getTotalResults.length > 0" no-gutters>
                <v-col>
                </v-col>
                <v-col cols="auto">
                    <v-sheet rounded="pill" class="quartz-num px-2 mt-2" color="#ffffffc0">
                        <v-row no-gutters align="center" justify="space-between">
                            <v-col cols="auto">
                                <v-img :src="`/ui/R3.webp`" width="1.5rem" />
                            </v-col>
                            <v-col cols="auto" class="px-1 text-HBR">
                                {{ `×${dataStore.getTotalResults.filter((r) => r.includes(`R3`)).length}
                                                                (${((dataStore.getTotalResults.reduce((acc, r) => r.includes(`R3`) ? acc + 1 : acc, 0) /
                                        dataStore.getTotalResults.length) * 100).toFixed(2)}%)` }}
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-slide-y-transition>
        <v-slide-y-reverse-transition appear>
            <v-row v-if="!dataStore.activeResults" no-gutters :class="`gacha-actions`" justify="end">
                <v-col></v-col>
                <v-col cols="auto">
                    <v-btn variant="text" color="transparent" @click="rollGacha(1, 300)" width="14rem" height="5.779375rem">
                        <v-img class="gacha-btn" :src="`/ui/ButtonLottery_GoldNomal.webp`" width="14rem">
                            <v-img class="gacha-btn--focused"
                                :src="gachaBtnFocus === 1 ? `/ui/ButtonLottery_GoldActive.webp` : `/ui/ButtonLottery_GoldFocused.webp`"
                                width="14rem" />
                            <v-sheet :class="`gacha-cost`" width="10rem" color="#ffffff00" rounded="pill" class="px-2 pl-3">
                                <v-row class="mb-n1 guarantee-text" no-gutters align="center" justify="space-between">
                                    <v-col></v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        <br />
                                    </v-col>
                                    <v-col></v-col>
                                </v-row>
                                <v-row no-gutters align="center" justify="space-between">
                                    <v-col cols="auto">
                                        <v-img :src="`https://hbr.quest/hbr/IconHcSmall.webp`" width="1.25rem" />
                                    </v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        {{ `${rollCost[0].toLocaleString()}` }}
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-n1 times-text" align="center" justify="space-between">
                                    <v-col></v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        {{ `1×` }}
                                    </v-col>
                                    <v-col></v-col>
                                </v-row>
                            </v-sheet>
                        </v-img>
                    </v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn variant="text" color="transparent" @click="rollGacha(10, 3000)" width="14rem"
                        height="5.779375rem">
                        <v-img class="gacha-btn" :src="`/ui/ButtonLottery_GoldNomal.webp`" width="14rem">
                            <v-img class="gacha-btn--focused"
                                :src="gachaBtnFocus === 10 ? `/ui/ButtonLottery_GoldActive.webp` : `/ui/ButtonLottery_GoldFocused.webp`"
                                width="14rem" />
                            <v-sheet :class="`gacha-cost`" width="10rem" color="#ffffff00" rounded="pill" class="px-2 pl-3">
                                <v-row class="mb-n1 guarantee-text" no-gutters align="center" justify="space-between">
                                    <v-col></v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        <br />
                                    </v-col>
                                    <v-col></v-col>
                                </v-row>
                                <v-row no-gutters align="center" justify="space-between">
                                    <v-col cols="auto">
                                        <v-img :src="`https://hbr.quest/hbr/IconHcSmall.webp`" width="1.25rem" />
                                    </v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        {{ `${rollCost[1].toLocaleString()}` }}
                                    </v-col>
                                </v-row>
                                <v-row class="mt-n1 times-text" no-gutters align="center" justify="space-between">
                                    <v-col></v-col>
                                    <v-col cols="auto" class="px-1 text-HBR">
                                        {{ `10×` }}
                                    </v-col>
                                    <v-col></v-col>
                                </v-row>
                            </v-sheet>
                        </v-img>
                    </v-btn>
                </v-col>
            </v-row>
        </v-slide-y-reverse-transition>
    </v-container>
    <v-bottom-navigation v-if="dataStore.getGachaList !== undefined" :height="70" bg-color="#212121c0">
        <v-container fluid class="pa-1 ma-0">
            <swiper slide-to-clicked-slide :slides-per-view="Math.floor($vuetify.display.width / 160)" :space-between="0"
                @swiper="onSwiper" @slideChange="onSlideChange" :centered-slides="true" :grab-cursor="true"
                :initial-slide="dataStore.getCurrentIndex" :loop="false">
                <swiper-slide v-for="lottery, lotIndex in dataStore.getGachaList
                    .filter(g => g.count === `multi` || g.count === `stepup`)
                    .sort((a, b) => b.in_date.localeCompare(a.in_date))">
                    <v-img :class="lotIndex === dataStore.getCurrentIndex ? `lottery--selected` : `lottery`"
                        :src="`https://hbr.quest/hbr/${lottery.banner}?h=ABC`" width="10rem"
                        height="calc(10rem * 56 / 144)">

                    </v-img>
                </swiper-slide>
            </swiper>
        </v-container>
    </v-bottom-navigation>
    <v-dialog :scrim="true" scrollable :max-width="$vuetify.display.smAndUp ? `32rem` : `20rem`"
        :min-height="$vuetify.display.smAndUp ? `18rem` : `13rem`" v-model:model-value="dataStore.activeResults">
        <div class="v-card__white-frame--top-left"></div>
        <div class="v-card__white-frame--bottom-right"></div>
        <v-card rounded="0" class="v-card--shadowless" :max-width="$vuetify.display.smAndUp ? `32rem` : `20rem`"
            color="#ffffffc0" :height="$vuetify.display.smAndUp ? `18rem` : `13rem`">

            <template v-slot:image>
                <v-img cover src="/ui/BgLotteryCommon.webp" />
            </template>

            <!-- <v-card-title>
                <span class="text-h5">Gacha Results</span>
            </v-card-title> -->

            <v-card-text class="gacha-results pa-1">
                <v-slide-y-transition appear leave-absolute>
                    <v-row v-if="$vuetify.display.smAndUp" no-gutters align="center" justify="center">
                        <v-col cols="auto" v-for="card in dataStore.getGachaResults.slice(0, dataStore.getLastRollNum)">
                            <v-img class="ma-2" transition="scale-transition"
                                :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="5rem" height="5rem">
                                <v-img
                                    v-if="dataStore.getDisplayCardFlag && (dataStore.getDisplayTrashFlag || card.split(`_`)[1].replace(`a`, ``) === `R3`)"
                                    transition="scale-transition" :src="`https://hbr.quest/hbr/${card}`" width="5rem"
                                    height="5rem">
                                    <v-hover>
                                        <template v-slot:default="{ isHovering, props }">
                                            <v-btn v-bind="props" icon variant="flat" class="card-link" color="transparent"
                                                width="5rem" height="5rem">
                                                <v-img v-if="isHovering" class="card-rarity" transition="scale-transition"
                                                    :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="3rem">
                                                </v-img>
                                            </v-btn>
                                        </template>
                                    </v-hover>
                                </v-img>
                            </v-img>
                        </v-col>
                    </v-row>
                    <v-row v-else no-gutters align="center" justify="center">
                        <v-col cols="auto" v-for="card in dataStore.getGachaResults.slice(0, dataStore.getLastRollNum)">
                            <v-img class="gacha-icon" transition="scale-transition"
                                :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="3.5rem" height="3.5rem">
                                <v-img
                                    v-if="dataStore.getDisplayCardFlag && (dataStore.getDisplayTrashFlag || card.split(`_`)[1].replace(`a`, ``) === `R3`)"
                                    transition="scale-transition" :src="`https://hbr.quest/hbr/${card}`" width="3.5rem"
                                    height="3.5rem">
                                    <v-hover>
                                        <template v-slot:default="{ isHovering, props }">
                                            <v-btn v-bind="props" icon variant="flat" class="card-link" color="transparent"
                                                width="3.5rem" height="3.5rem">
                                                <v-img v-if="isHovering" class="card-rarity" transition="scale-transition"
                                                    :src="`/ui/${card.split(`_`)[1].replace(`a`, ``)}.webp`" width="2rem">
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
            <v-card-actions class="pb-2">
                <v-slide-y-transition appear hide-on-leave>
                    <v-row no-gutters justify="space-between" align="center" class="mx-2">
                        <v-col cols="auto">
                            <v-btn disabled icon class="text-white">

                            </v-btn>
                        </v-col>
                        <v-col cols="auto" v-if="dataStore.getLastRollNum < 10">
                            <v-img class="gacha-btn" :src="`/ui/ButtonLottery01Normal.webp`" width="10rem">
                                <v-img class="gacha-btn--focused"
                                    :src="gachaBtnFocus === 1 ? `/ui/ButtonLottery01Active.webp` : `/ui/ButtonLottery01Focused.webp`"
                                    width="14rem" />
                                <v-btn variant="text" color="transparent" @click="rollGacha(1, 300)" width="12rem"
                                    height="3.78076062639821rem" class="repeat-gacha-btn">
                                    <span>{{ `Roll Again` }}</span>
                                </v-btn>
                            </v-img>
                        </v-col>
                        <v-col v-else cols="auto">
                            <v-img class="gacha-btn" :src="`/ui/ButtonLottery01Normal.webp`" width="10rem">
                                <v-img class="gacha-btn--focused"
                                    :src="gachaBtnFocus === 10 ? `/ui/ButtonLottery01Active.webp` : `/ui/ButtonLottery01Focused.webp`"
                                    width="14rem" />
                                <v-btn variant="text" color="transparent" @click="rollGacha(10, 3000)" width="12rem"
                                    height="3.78076062639821rem" class="repeat-gacha-btn">
                                    <span>{{ `Roll Again` }}</span>
                                </v-btn>
                            </v-img>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn icon class="text-white" @click="dataStore.toggleTrash(!dataStore.getDisplayTrashFlag)">
                                <v-icon :icon="`mdi-delete${dataStore.getDisplayTrashFlag ? `` : `-off`}`"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-slide-y-transition>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import PageTitle from '@/components/default/PageTitle.vue'
import { useLotteryStore } from '@/store/app';
import { useRoute, useRouter } from 'vue-router';
import { GachaCard } from '@/types'
import { ref } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

const dataStore = useLotteryStore()
const route = useRoute()
const router = useRouter()
const swiperInstance = ref()
const gachaBtnFocus = ref(0 as number)
const rollCost = ref([300, 3000])

const loadData = async () => {
    if (dataStore.getGachaList === undefined) {
        await dataStore.loadGachaList()
    }
}

loadData().then(dataStore.cancelLoading).then(() => {
    if (String(route.params.label).length > 0 && dataStore.getGachaList) {
        let bannerIndex = dataStore.getGachaList
            ?.filter(b => b.count === `multi` || b.count === `stepup`)
            .map(b => {
                return { ...b, label: b.label.replace(`lottery_`, ``) }
            })
            .sort((a, b) => b.in_date.localeCompare(a.in_date))
            .findIndex((b, bi) => b.label.toLowerCase() === String(route.params.label).toLowerCase())

        dataStore.updateIndex(bannerIndex)
        swiperInstance.value?.slideTo(dataStore.getCurrentIndex)
    }
})

const onSwiper = (swiper: any) => {
    // console.log(swiper);
    swiperInstance.value = swiper
};
const onSlideChange = (swiper: any) => {
    // console.log(swiper.activeIndex);
    dataStore.updateIndex(swiper.activeIndex)
    dataStore.clearAll()

    router.replace({
        params: { ...route.params, label: dataStore.getLotteryData?.label }
    })
};

const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rollGacha = async (times: number, cost: number) => {
    // Get banner data
    dataStore.clearGachaResults()

    gachaBtnFocus.value = times
    setTimeout(() => gachaBtnFocus.value = 0, 150)


    // Process rolls
    if (dataStore.getLotteryData !== undefined) {
        // console.log(`Rolled ${times} times!`)
        dataStore.updateAmountSpent(cost)
        dataStore.updateLastRollNum(times)
        dataStore.openResults()

        for (let index = 0; index < times; index++) {
            dataStore.toggleCard(false)
            await new Promise(r => setTimeout(r, dataStore.getRollDelay))
            // let minNum = index < 9 ? 1 : 7901
            let num = randomIntFromInterval(1, 10000)
            // console.log(num)

            if (dataStore.getLotteryData.replace_rate !== null && index === 9) {
                dataStore.getLotteryData.replace_rate.every((r, ri) => {
                    if (num - r.rate > 0) {
                        num = num - r.rate
                        return true
                    } else {
                        num = ri
                        return false
                    }
                })

                try {
                    let result: GachaCard = dataStore.getLotteryData.replace_rate[num].cards[Math.floor(Math.random() * dataStore.getLotteryData.replace_rate[num].cards.length)]
                    dataStore.updateGachaResults(result.image)
                } catch (error) {
                    console.log(`Error`)
                }
                
            } else {
                dataStore.getLotteryData.rates.every((r, ri) => {
                    if (num - r.rate > 0) {
                        num = num - r.rate
                        return true
                    } else {
                        num = index < 9 || ri !== 0 ? ri : 1
                        return false
                    }
                })

                try {
                    let result: GachaCard = dataStore.getLotteryData.rates[num].cards[Math.floor(Math.random() * dataStore.getLotteryData.rates[num].cards.length)]
                    dataStore.updateGachaResults(result.image)
                } catch (error) {
                    console.log(`Error`)
                }
            }
        }
        await new Promise(r => setTimeout(r, 250))
        dataStore.toggleCard(true)
    } else {
        console.log(`Banner data not found.`)
    }
}
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
        content: '';
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

.quartz-num {
    color: #212121;
    line-height: 1.2rem;
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
        bottom: 3.25rem;
        right: -3rem;
        transform: scale(75%);

        >div {
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
    top: 0.8125rem;
    left: calc(50% - 5rem);
    font-size: 0.625rem;
    color: #fff;
    text-shadow: 0 0 0.25rem #212121;
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
}

.guarantee-text {
    font-size: 0.75rem;
}
</style>