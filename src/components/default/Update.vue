<template>
    <v-scale-transition appear>
        <v-btn v-if="!dataStore.loading && dataStore.getStyles" aria-label="Update all" @click.stop="showToggleAll" icon
            class="text-white" :disabled="dataStore.getStyles.filter(searchFilter).length < 1">
            <v-icon icon="mdi-check-all"></v-icon>
            <!-- <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
                {{ `Update all displayed styles` }}
            </v-tooltip> -->
        </v-btn>
    </v-scale-transition>
    <v-dialog :close-on-back="true" scrollable v-model:model-value="toggleAll" :max-width="`36rem`"
        :max-height="$vuetify.display.smAndDown ? undefined : $vuetify.display.height - 192" transition="scale-transition"
        :scrim="`#212121`" :close-on-content-click="false">
        <div class="v-card__white-frame--top-left"></div>
        <div class="v-card__white-frame--bottom-right"></div>
        <v-card color="#312942aa" class="v-card--shadowless search elevation-0 rounded-0"
            :class="{ mobile: $vuetify.display.smAndDown }" v-click-outside="cancelToggleAll">
            <v-toolbar color="#ffffff00" height="64" class="top-toolbar pa-1">
                <v-toolbar-title class="text-HBR ml-3">
                    {{ `Notice`.toUpperCase() }}
                </v-toolbar-title>

                <template v-slot:prepend>
                    <v-icon icon="mdi-alert-outline" size="2rem"></v-icon>
                </template>


                <v-toolbar-items class="btn-toolbar__items align-center justify-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn v-bind="props" width="3.5rem" color="transparent" class="text-HBR"
                                @click="cancelToggleAll">
                                <v-img
                                    :src="isHovering ? `/ui/ButtonCloseSmallActive.webp` : `/ui/ButtonCloseSmallDefault.webp`"
                                    width="3.5rem" class="d-flex align-center justify-center">
                                </v-img>
                            </v-btn>
                        </template>
                    </v-hover>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text
                :class="`${$vuetify.display.smAndDown ? `ma-0 pa-0 mx-3` : `ma-0 pa-0 mx-4 ml-3 pr-3`} filter-list text-HBR`">
                <v-list density="compact" class="style-list pa-0 py-1 text-normal" bg-color="#1f1f1f88">
                    <v-list-item class="px-2" v-for="style in dataStore.getStyles?.filter(searchFilter)" :key="style.id"
                        :title="`${style.name}`">
                        <template v-slot:prepend>
                            <img width="32" height="32" class="mr-1"
                                :src="`https://hbr.quest/ui/IconRarity${style.tier}.webp`" />
                        </template>
                        <template v-slot:append>
                            <img width="32" height="32" :src="`https://hbr.quest/hbr/${style.image}`" />
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <div v-if="dataStore.getStyles" class="text-normal text-center text-HBR mx-3 mt-2">
                {{ dataStore.isAllVisibleOwned(dataStore.getStyles
                    .filter(searchFilter)
                    .map(s => [s.id, s.max_lb]))
                    ? `Reset the status of all displayed styles ?`
                    : `Set the status of all displayed styles to MAX LB ?`
                }}
            </div>

            <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3 pt-1">
                <v-toolbar-items class="btn-toolbar__items align-center justify-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn v-bind="props" width="13rem" color="transparent" class="text-HBR"
                                @click="confirmToggleAll">
                                <v-img
                                    :src="isHovering ? `/ui/ButtonFirstMiniActive.webp` : `/ui/ButtonFirstMiniNomal.webp`"
                                    width="13rem" class="d-flex align-center justify-center">
                                    <div class="text-white btn-text">{{ `Confirm` }}</div>
                                </v-img>
                            </v-btn>
                        </template>
                    </v-hover>
                </v-toolbar-items>
            </v-toolbar>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSearchStore, useStyleStore } from '@/store/app';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
    ElementType,
    WeaponType,
    CardRarity,
    CharacterTeam,
    CharacterRole,
} from '@/enums';
import { Style } from '@/types';

const dataStore = useStyleStore()
const searchStore = useSearchStore()
const toggleAll = ref(false)

const catchEsc = (e: KeyboardEvent) => {
    // ignore normal browsing behavior
    if (e.key === `Escape` && toggleAll.value) {
        e.preventDefault();
        cancelToggleAll()
    }
}
onMounted(() => document.addEventListener("keydown", catchEsc))
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc))

const searchFilter = (s: Style): boolean => {
    let result: boolean = true

    // Logic
    if (searchStore.status.length > 0) {
        result = result && ((searchStore.status.includes(0) && !dataStore.isOwned(s)) || (searchStore.status.includes(1) && dataStore.isOwned(s)))
    }
    if (searchStore.rarities.length > 0) {
        result = result && searchStore.rarities.includes(Number(CardRarity[s.tier]) - 1)
    }
    if (searchStore.roles.length > 0) {
        result = result && searchStore.roles.includes(Number(CharacterRole[s.role]))
    }
    if (searchStore.teams.length > 0) {
        result = result && searchStore.teams.includes(Number(CharacterTeam[s.team]))
    }
    if (searchStore.elements.length > 0) {
        result = result && (s.elements.length > 0
            ? s.elements.some(e => searchStore.elements.includes(Number(ElementType[e]) - 1))
            : searchStore.elements.includes(5))
    }
    if (searchStore.attackTypes.length > 0) {
        result = result && searchStore.attackTypes.includes(Number(ElementType[s.type]) - 10)
    }
    if (searchStore.weaponTypes.length > 0) {
        result = result && searchStore.weaponTypes.includes(Number(WeaponType[s.weapon]) - 1)
    }

    return result
}

const showToggleAll = () => {
    toggleAll.value = true
}

const cancelToggleAll = () => {
    toggleAll.value = false
}

const confirmToggleAll = () => {
    toggleAll.value = false
    // btnFocused.value = true
    // setTimeout(() => btnFocused.value = false, 150)
    if (dataStore.getStyles) {
        dataStore.toggleAllVisibleMax(dataStore.getStyles.filter(searchFilter).map(s => [s.id, s.max_lb]))
    }
}
</script>