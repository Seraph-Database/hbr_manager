<template>
  <img
    class="style-rarity__icon"
    :src="`https://hbr.quest/ui/IconRarity${style.tier}.webp`"
    width="54"
    height="54"
  />
  <v-img
    class="style-strip__gradient"
    :gradient="`to left, rgba(0, 0, 0, 0), ${CharacterRoleGradient[String(style.role) as keyof typeof CharacterRoleGradient]} 35%, ${CharacterRoleGradient[String(style.role) as keyof typeof CharacterRoleGradient]} 85%, rgba(0, 0, 0, 0)`"
    height="1.5rem"
    width="66.66%"
  >
  </v-img>
  <v-chip label color="transparent" class="style-role__chip text-HBR">
    <span>{{ String(style.role).toUpperCase() }}</span>
  </v-chip>
  <img
    class="style-type__icon"
    width="44"
    height="44"
    :src="`https://hbr.quest/ui/${style.type}.webp`"
  />
  <img
    v-for="(ele, eleIndex) in style.elements"
    :key="eleIndex"
    class="style-element__icon"
    width="44"
    height="44"
    :style="{ right: `${4 + 44 * (eleIndex + 1)}px` }"
    :src="`https://hbr.quest/ui/${ele}.webp`"
  />
</template>

<script lang="ts" setup>
import { Style } from "@/types";
import { CharacterRoleGradient } from "@/enums";

defineProps<{
  style: Style;
}>();
</script>

<style lang="scss" scoped>
.style-rarity__icon,
.style-type__icon,
.style-element__icon,
.style-strip__gradient {
  transform: translateZ(0);
  position: absolute;
  z-index: 3;
}

.style-role__chip {
  position: absolute;
  top: 0.8125rem;
  left: 3.125rem;
  height: 1.5rem !important;
  z-index: 2;

  span {
    margin-bottom: 0.125rem;
    font-size: 1.0625rem;
    color: white;
    letter-spacing: 1px;
    text-shadow: 0px 0px 5px #212121;
  }
}

.style-rarity__icon {
  top: -2px;
  left: 7px;
}

.style-type__icon,
.style-element__icon {
  top: 2px;
  right: 3px;
}

.style-strip__gradient {
  z-index: 1;
  top: 0.75rem;
  left: 0;
}
</style>
