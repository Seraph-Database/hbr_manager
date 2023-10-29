<template>
    <v-slide-y-transition appear>
        <v-btn v-if="!dataStore.loading" aria-label="Save & Load" @click.stop="showShare" icon class="text-white" disabled>
            <v-icon icon="mdi-download"></v-icon>
            <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
                {{ `Save & Load Data` }}
            </v-tooltip>
        </v-btn>
    </v-slide-y-transition>
    <v-dialog :close-on-back="true" scrollable v-model:model-value="share" transition="scale-transition"
        :max-width="$vuetify.display.smAndDown ? undefined : `32rem`" :scrim="`#212121`" :close-on-content-click="false">
        <div class="v-card__white-frame--top-left"></div>
        <div class="v-card__white-frame--bottom-right"></div>
        <v-card color="#312942aa" class="v-card--shadowless search elevation-0 rounded-0"
            :class="{ mobile: $vuetify.display.smAndDown }" v-click-outside="closeShare">
            <v-toolbar color="#ffffff00" height="48" class="top-toolbar pa-1">
                <v-toolbar-title class="text-HBR ml-3">
                    {{ `Save & Load Data`.toUpperCase() }}
                </v-toolbar-title>

                <template v-slot:prepend>
                    <v-icon icon="mdi-download" size="2rem"></v-icon>
                </template>
            </v-toolbar>

            <v-card-text
                :class="`${$vuetify.display.smAndDown ? `ma-0 pa-0 mx-3` : `ma-0 pa-0 mx-4 ml-3 pr-3`} filter-list text-HBR`">
                <v-list density="compact" class="style-list pa-0 py-1 text-normal" bg-color="#1f1f1f88">
                    <v-list-item class="px-2" v-for="style in dataStore.getStyles?.filter(dataStore.isOwned)"
                        :key="style.id" :title="`${style.name}`">
                        <template v-slot:prepend>
                            <img width="32" height="32" class="mr-1"
                                :src="`https://hbr.quest/ui/IconRarity${style.tier}.webp`" />
                        </template>
                        <template v-slot:append>
                            <img width="32" height="32" :src="`https://hbr.quest/hbr/${style.image}`" />
                        </template>
                    </v-list-item>
                <v-sheet v-if="dataStore.getStyles && dataStore.getStyles.filter(dataStore.isOwned).length < 1" class="text-center" color="transparent">
                    {{ `No data` }}
                </v-sheet>
                </v-list>
            </v-card-text>

            <v-file-input class="mr-4 mt-4" single-line hide-details density="compact" v-model:model-value="fileData"
                variant="outlined" accept="application/json" label="Load data" prepend-icon="">
                <template v-slot:prepend>
                </template>
            </v-file-input>

            <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3">
                <v-toolbar-items class="btn-toolbar__items align-center justify-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn v-bind="props" width="13rem"
                                :href="`data:application/json;charset=utf-8,${encodeURIComponent(getEncodedData())}`"
                                :download="`data.json`" color="transparent" class="text-HBR" @click.stop>
                                <v-img
                                    :src="isHovering ? `/ui/ButtonFirstMiniActive.webp` : `/ui/ButtonFirstMiniNomal.webp`"
                                    width="13rem" class="d-flex align-center justify-center">
                                    <div class="text-white btn-text text-center">{{ `Save` }}</div>
                                </v-img>
                            </v-btn>
                        </template>
                    </v-hover>
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn v-bind="props" width="3.75rem" color="transparent" class="text-HBR" @click="closeShare">
                                <v-img
                                    :src="isHovering ? `/ui/ButtonCloseSmallActive.webp` : `/ui/ButtonCloseSmallDefault.webp`"
                                    width="3.75rem" class="d-flex align-center justify-center">
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
import { useStyleStore } from '@/store/app';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dataStore = useStyleStore()
const share = ref(false)
const fileData = ref(undefined)

const catchEsc = (e: KeyboardEvent) => {
    // ignore normal browsing behavior
    if (e.key === `Escape` && share.value) {
        e.preventDefault();
    }
}
onMounted(() => document.addEventListener("keydown", catchEsc))
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc))

const showShare = () => {
    share.value = true
}

const closeShare = () => {
    share.value = false
}

// const readFile = () => {
//     this.file = this.$refs.doc.files[0];
//     const reader = new FileReader();
//     if (this.file.name.includes(".txt")) {
//         reader.onload = (res) => {
//             this.content = res.target.result;
//         };
//         reader.onerror = (err) => console.log(err);
//         reader.readAsText(this.file);
//     } else {
//         this.content = "check the console for file output";
//         reader.onload = (res) => {
//             console.log(res.target.result);
//         };
//         reader.onerror = (err) => console.log(err);
//         reader.readAsText(this.file);
//     }
// }

const getEncodedData = (): string => {
    return dataStore.getOwned.length > 0 ? window.btoa(JSON.stringify(dataStore.getOwned)) : `No data`
}
</script>