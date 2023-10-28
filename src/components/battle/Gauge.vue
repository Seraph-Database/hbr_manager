<template>
    <div :class="`gauge gauge--${style}`">
        <div class="gauge__border">
            <div :class="`gauge__fillColor--${style}`"></div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
defineProps<{
    style?: string
}>()
</script>

<style lang="scss" scoped>
@import "@/styles/gauge.scss";
</style>