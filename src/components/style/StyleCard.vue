<template>
  <div
    class="style-placeholder"
    :style="{ width: `356px`, height: `144px`, background: `#999` }"
    @click.stop="dataStore.toggleStyle(style.id)"
    v-ripple="{ class: 'text-white style-ripple' }"
  >
    <a
      :href="`https://${String(route.name).endsWith(`En`) ? `en.` : ``}hbr.quest/styles/${style.label.toLowerCase()}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        width="356"
        height="144"
        class="d-block style-strip"
        :src="`https://assets.hbr.quest/v1/hbr/${style.strip.replace(
          `Party`,
          `Select`
        )}`"
      />
      <style-header :style="style" />
      <style-status v-if="!dataStore.readOnly" :style="style" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import { useStyleStore } from "@/store/app";
import { useRoute } from "vue-router";
import { type Style } from "@/types";
import StyleHeader from "@/components/style/StyleHeader.vue";
import StyleStatus from "@/components/style/StyleStatus.vue";
// import { useRoute } from "vue-router";

defineProps<{
  style: Style;
}>();

const route = useRoute();
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

  a {
    display: block;
    text-decoration: none;
  }
}

.style-ripple {
  // width: 100%;
  // max-width: 356px;
  z-index: 1;
}

// .style-hexagon {
//   position: absolute;
//   bottom: 1.25rem;
//   left: 0.5rem;
// }
</style>
