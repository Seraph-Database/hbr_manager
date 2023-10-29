<template>
  <v-app-bar color="#212121c0">
    <!-- <template v-slot:image>
      <v-img gradient="to top, rgba(49, 42, 71, 0.72), rgba(168, 89, 141, 0.48)"></v-img>
    </template> -->

    <template v-slot:prepend>
      <v-img :src="`https://hbr.quest/ui/${route.name === `DimensionBattle`
        ? `IconHomeDimensionBattleDefault`
        : `LoginBonus_Stamp`}.webp`" width="4rem" height="4rem" :position="`0 0`" />
    </template>

    <v-app-bar-title class="text-HBR text-white font-italic ml-2">
      <v-row no-gutters align="center" v-if="route.name === `GachaSim`">
        <v-col class="text-title mb-n1" cols="12">ガチャシミュ</v-col>
        <v-col class="text-subtitle" cols="12">Gacha Simulator</v-col>
      </v-row>
      <!-- <v-row no-gutters align="center" v-else-if="route.name === `RosterMan`">
        <v-col class="text-title mb-n1" cols="12">スタイル一覧</v-col>
        <v-col class="text-subtitle" cols="12">Style List</v-col>
      </v-row> -->
      <v-row no-gutters align="center" v-else-if="route.name === `RosterMan`">
        <v-col class="text-title mb-n1" cols="12">スタイル選択</v-col>
        <v-col class="text-subtitle" cols="12">Style Manager</v-col>
      </v-row>
      <v-row no-gutters align="center" v-else-if="route.name === `DimensionBattle`">
        <v-col class="text-title mb-n1" cols="12">恒星掃戦線</v-col>
        <v-col class="text-subtitle" cols="12">Solraker Front</v-col>
      </v-row>
    </v-app-bar-title>

    <!-- <v-spacer /> -->

    <!-- <v-btn icon>
      <v-icon icon="mdi-magnify"></v-icon>
    </v-btn> -->

    <template v-if="route.name === `GachaSim`">
      <v-btn icon class="text-white" @click="lotteryStore.clearAll" :disabled="lotteryStore.getAmountSpent === 0">
        <v-icon icon="mdi-restore"></v-icon>
      </v-btn>

      <v-btn :loading="lotteryStore.getLoading" icon class="text-white" :target="`_blank`"
        :href="`https://api.heaven-burns-red.wfs.games/web/announcement/${lotteryStore.getLotteryData?.notice_id}?version=${lotteryStore.getLotteryData?.version}&region=1&language=1&phoneType=4`">
        <v-icon icon="mdi-information-outline"></v-icon>
      </v-btn>
    </template>
    <template v-else-if="route.name === `RosterMan`">
      <update />
      <save />
      <search />
    </template>

  </v-app-bar>
</template>

<script lang="ts" setup>
import Update from '@/components/default/Update.vue';
import Save from '@/components/default/Save.vue';
import Search from '@/components/default/Search.vue';
import { useRoute } from 'vue-router';
import { useLotteryStore } from '@/store/app';

const lotteryStore = useLotteryStore()
const route = useRoute()
// const router = useRouter()

</script>

<style lang="scss" scoped>
.text-subtitle {
  font-size: 0.9375rem;
}
</style>

<style lang="scss">
@import "@/styles/modal.scss";
</style>