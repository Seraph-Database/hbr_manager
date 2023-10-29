<template>
    <v-skeleton-loader :loading="dataStore.loading" color="grey" width="356" height="144" class="style-placeholder">
        <v-slide-y-transition leave-absolute appear>
            <div v-ripple @click.stop="dataStore.toggleStyle((dataStore.getStyles as Style[])[styleIndex - 1].id)">
                <v-img width="356" height="144" class="style-strip"
                    :src="`https://hbr.quest/hbr/${(dataStore.getStyles as Style[])[styleIndex - 1].strip.replace(`Party`, `Select`)}`">

                    <img class="style-rarity__icon"
                        :src="`https://hbr.quest/ui/IconRarity${(dataStore.getStyles as Style[])[styleIndex - 1].tier}.webp`"
                        width="54" height="54" />

                    <v-img class="style-strip__gradient"
                        :gradient="`to left, rgba(0, 0, 0, 0), ${CharacterRoleGradient[String((dataStore.getStyles as Style[])[styleIndex - 1].role) as keyof typeof CharacterRoleGradient]} 35%, ${CharacterRoleGradient[String((dataStore.getStyles as Style[])[styleIndex - 1].role) as keyof typeof CharacterRoleGradient]} 85%, rgba(0, 0, 0, 0)`"
                        height="1.5rem" width="66.66%">
                    </v-img>

                    <v-chip label color="transparent" class="style-role__chip text-HBR">
                        <span>{{ String((dataStore.getStyles as Style[])[styleIndex - 1].role).toUpperCase() }}</span>
                    </v-chip>

                    <img class="style-type__icon" width="44" height="44"
                        :src="`https://hbr.quest/ui/${(dataStore.getStyles as Style[])[styleIndex - 1].type}.webp`" />
                    <img class="style-element__icon" width="44" height="44"
                        v-if="(dataStore.getStyles as Style[])[styleIndex - 1].elements.length > 0"
                        :src="`https://hbr.quest/ui/${(dataStore.getStyles as Style[])[styleIndex - 1].elements[0]}.webp`" />

                    <div class="style-status">
                        <v-btn
                            @click.stop="dataStore.setStyleLv((dataStore.getStyles as Style[])[styleIndex - 1].id, (dataStore.getStyles as Style[])[styleIndex - 1].limit_break.bonus_per_level.length - 1)"
                            class="pa-0 px-3 pr-1 ml-1 mb-2" color="transparent" rounded="pill" flat variant="text"
                            v-if="dataStore.getOwned.findIndex(s => s[0] === (dataStore.getStyles as Style[])[styleIndex - 1].id) > -1">
                            <v-row no-gutters class="align-center">
                                <v-col cols="auto" class="text-HBR text-label text-HBR--stroke">
                                    {{ `Lv.` }}
                                </v-col>
                                <v-col cols="auto" class="px-1 text-HBR text-LB text-HBR--stroke">
                                    {{ `${dataStore.getStyleLv((dataStore.getStyles as Style[])[styleIndex - 1].id)}` }}
                                </v-col>
                                <v-col
                                    v-if="dataStore.getStyleLv((dataStore.getStyles as Style[])[styleIndex - 1].id) < (dataStore.getStyles as Style[])[styleIndex - 1].limit_break.bonus_per_level.length - 1"
                                    cols="auto" class="px-0 text-HBR text-LB text-HBR--stroke">
                                    <v-btn width="1.5rem" height="1.5rem" variant="text" icon color="#d64f92"
                                        @click.stop="dataStore.setStyleLv((dataStore.getStyles as Style[])[styleIndex - 1].id, (dataStore.getStyles as Style[])[styleIndex - 1].limit_break.bonus_per_level.length - 1, true)">
                                        <v-icon class="text-HBR--stroke" color="#ffb9b9" size="1.5rem"
                                            icon="mdi-chevron-double-up"></v-icon>
                                    </v-btn>

                                </v-col>
                            </v-row>
                        </v-btn>
                        <v-row no-gutters class="style-name">
                            <v-col cols="auto" class="px-3 text-HBR text-HBR--stroke">
                                {{ (dataStore.getStyles as Style[])[styleIndex - 1].name }}
                            </v-col>
                        </v-row>
                    </div>
                </v-img>
            </div>
        </v-slide-y-transition>
    </v-skeleton-loader>
</template>


<script lang="ts" setup>
import { useStyleStore } from '@/store/app';
import { Style } from '@/types';
import { CharacterRoleGradient } from '@/enums';


defineProps<{
    styleIndex: number
}>()


const dataStore = useStyleStore()
</script>

<style lang="scss" scoped>
.style-strip,
.style-rarity__icon,
.style-type__icon,
.style-element__icon,
.style-strip__gradient {
    transform: translateZ(0);
}

.style-placeholder {
    border-radius: 1.25rem;
    overflow: hidden;
}

.style-rarity__icon,
.style-type__icon,
.style-element__icon,
.style-strip__gradient {
    position: absolute;
    z-index: 3;
}

.style-status {
    position: absolute;
    bottom: 0;
    border-top-right-radius: 0.5rem;
    padding-bottom: 0.125rem;

    .style-name {
        cursor: default;
        user-select: none;
    }
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

.style-element__icon {
    right: 48px;
}

.style-strip__gradient {
    z-index: 1;
    top: 0.75rem;
    left: 0;
}</style>