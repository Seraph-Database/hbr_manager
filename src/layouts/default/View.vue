<template>
  <v-img
    cover
    :src="
      route.name?.toString().startsWith(`GachaSim`) &&
      lotteryStore.getLotteryData
        ? `https://assets.hbr.quest/v1/${
            route.name?.toString().endsWith(`En`) ? `en/` : ``
          }hbr/${lotteryStore.getLotteryData.banner.replace(
            `Banner`,
            `Bg`
          )}`
        : undefined
    "
  >
    <v-main class="main">
      <router-view />
    </v-main>
  </v-img>
</template>

<script lang="ts" setup>
import { useLotteryStore } from "@/store/app";
import { useRoute } from "vue-router";

const lotteryStore = useLotteryStore();
const route = useRoute();
</script>

<style lang="scss">
.main {
  // background: url('/ui/Arena_Battle.webp');
  background-attachment: fixed;
  background-position: center;
  // filter: blur(4px);
  background-size: cover;
  background-repeat: no-repeat;
}

.v-application {
  background: #212121 !important;
}
</style>
