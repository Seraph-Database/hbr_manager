<template>
    <v-navigation-drawer color="#ffffffc0" :scrim="false"
        temporary touchless
        floating v-model:model-value="searchStore.menuFlag">
        <v-slide-y-transition appear leave-absolute>
            <div class="pa-2 py-0">
            </div>
        </v-slide-y-transition>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useSearchStore } from '@/store/app';

const searchStore = useSearchStore()
</script>