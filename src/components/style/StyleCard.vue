<template>
  <div
    class="style-placeholder"
    :style="{ width: `356px`, height: `144px`, background: `#999` }"
    @click.stop="dataStore.toggleStyle(style.id)"
  >
    <img
      width="356"
      height="144"
      class="d-block style-strip"
      :src="`https://hbr.quest/hbr/${style.strip.replace(`Party`, `Select`)}`"
    />
    <style-header :style="style" />
    <style-status :style="style" />
  </div>
</template>

<script lang="ts" setup>
import { useStyleStore } from "@/store/app";
import { type Style } from "@/types";
import StyleHeader from "@/components/style/StyleHeader.vue";
import StyleStatus from "@/components/style/StyleStatus.vue";
// import { useRoute } from "vue-router";

defineProps<{
  style: Style;
}>();

const dataStore = useStyleStore();
// const route = useRoute();
</script>

<style lang="scss" scoped>
// .style-strip {
//   transform: translateZ(0);
// }

.style-placeholder {
  border-radius: 1.25rem;
  width: 356px;
  height: 144px;
  overflow: hidden;
  user-select: none;
  position: relative;
}

.style-ripple {
  width: 100%;
  max-width: 356px;
}

// .style-hexagon {
//   position: absolute;
//   bottom: 1.25rem;
//   left: 0.5rem;
// }
</style>
