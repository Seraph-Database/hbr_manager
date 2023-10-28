<template>
    <teleport to="head">
        <title>{{ title ? `${title} - Seraph Database` : `Seraph Database` }}</title>
    </teleport>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
    title?: string
}>()

const removeDefaultTitle = () => {
    if (document.getElementsByTagName("title").length > 0) {
        document.getElementsByTagName("title")[0].remove()
    }
}

removeDefaultTitle()
</script>