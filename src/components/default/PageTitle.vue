<template>
    <teleport to="head">
        <title>{{ title ? `${title} - Seraph Database` : `Seraph Database` }}</title>
    </teleport>
</template>
  
<script lang="ts" setup>
defineProps<{
    title?: string
}>()

const removeDefaultTitle = () => {
    if (document.getElementsByTagName("title").length > 0) {
        document.getElementsByTagName("title")[0].remove()
    }
}

removeDefaultTitle()
</script>