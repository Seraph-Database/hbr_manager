<template>
    <v-btn v-if="dataStore.getStyles" aria-label="Toggle all" @click.stop="showToggleAll" icon class="text-white">
        <v-icon icon="mdi-check-all"></v-icon>
        <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
            {{ `Toggle all visible styles` }}
        </v-tooltip>
    </v-btn>
    <v-btn @click="showSearch" :loading="dataStore.loading" icon class="text-white" aria-label="Show filters">
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-tooltip v-if="!$vuetify.display.smAndDown" activator="parent" location="bottom">
            {{ `Display filters` }}
        </v-tooltip>
    </v-btn>
    <v-dialog :close-on-back="true" :persistent="true" scrollable
        v-model:model-value="search" transition="scale-transition"
        :max-width="$vuetify.display.smAndDown ? undefined : `48rem`"
        :height="$vuetify.display.smAndDown ? undefined : $vuetify.display.height - 192" :scrim="`#212121`"
        :close-on-content-click="false">
        <div  class="v-card__white-frame--top-left"></div>
        <div class="v-card__white-frame--bottom-right"></div>
        <v-card color="#312942aa" class="v-card--shadowless search elevation-0 rounded-0"
            :class="{ mobile: $vuetify.display.smAndDown }" v-click-outside="hideSearch">
            <v-toolbar color="#ffffff00" height="48" class="top-toolbar pa-1">
                <v-toolbar-title class="text-HBR ml-3">
                    {{ `Style Filters`.toUpperCase() }}
                </v-toolbar-title>

                <!-- <template v-slot:image>
                    <v-img gradient="to top, rgba(49, 42, 71, 0.72), rgba(168, 89, 141, 0.48)"></v-img>
                </template> -->

                <template v-slot:prepend>
                    <v-icon icon="mdi-filter-variant" size="2rem"></v-icon>
                </template>
            </v-toolbar>

            <v-card-text :class="`${$vuetify.display.smAndDown ? `ma-0 pa-0 mx-3` : `ma-0 pa-0 mx-4 ml-3 pr-3`} filter-list text-HBR`">
                <v-expansion-panels readonly v-model="activeFilters" multiple variant="accordion">
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Rarity` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.rarities" column multiple>
                                <template v-for="rarity, index in CardRarity">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index))" :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img :src="`https://hbr.quest/ui/IconRarity${rarity}.webp`" width="2rem" />
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Role` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.roles" column multiple>
                                <template v-for="role, index in CharacterRole">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index))" :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img width="1.5rem" height="1.5rem" class="rounded-circle"
                                                :gradient="`to top, ${CharacterRoleGrandient[String(role) as keyof typeof CharacterRoleGrandient]}, ${CharacterRoleGrandient[String(role) as keyof typeof CharacterRoleGrandient]}`" />
                                            <span class="px-2">
                                                {{ role }}
                                            </span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Team` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.teams" column multiple>
                                <template v-for="squad, index in CharacterTeam">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index))" :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img
                                                :src="`https://hbr.quest/ui/${String(squad).replace(/\s/g, ``).toLowerCase()}.webp`"
                                                width="2rem" height="2rem" />
                                            <span class="pr-2">{{ CharacterTeamName[Number(index)] }}</span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Element` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.elements" column multiple>
                                <template v-for="element, index in ElementType">
                                    <v-chip filter variant="text"
                                        v-if="!isNaN(Number(index)) && Number(index) > 0 && Number(index) < 10"
                                        :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img :src="`https://hbr.quest/ui/${String(element)}.webp`" width="2rem"
                                                height="2rem" />
                                            <span class="px-2">{{ ElementTypeName[Number(index)] }}</span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Type` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.attackTypes" column multiple>
                                <template v-for="attackType, index in ElementType">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index)) && Number(index) > 9"
                                        :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img :src="`https://hbr.quest/ui/${String(attackType)}.webp`" width="2rem"
                                                height="2rem" />
                                            <span class="px-2">{{ attackType }}</span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `Weapon` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.weaponTypes" column multiple>
                                <template v-for="weapon, index in WeaponType">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index)) && Number(index) > 0"
                                        :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <v-img :src="`https://hbr.quest/ui/${String(weapon)}.webp`" width="2rem"
                                                height="2rem" />
                                            <span class="px-0">{{ WeaponTypeName[Number(index)] }}</span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category">
                        <v-expansion-panel-title hide-actions>
                            {{ `Status` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.status" column multiple>
                                <template v-for="status, index in CardStatus">
                                    <v-chip filter variant="text" v-if="!isNaN(Number(index))" :key="index">
                                        <div class="d-flex flex-row align-center">
                                            <span class="px-1">
                                                {{ status }}
                                            </span>
                                        </div>
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <!-- <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `SkillType` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.skillTypes" column multiple>
                                <template v-for="skill, index in SkillType">
                                    <v-chip filter size="3rem" rounded="0" variant="text"
                                        v-if="!isNaN(Number(index)) && Number(index) > 0" :key="index">
                                        <v-img :src="`https://hbr.quest/al/${String(skill)}.webp`" width="3rem" />
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `StatusType` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-chip-group class="filter-category__list" v-model="searchStore.statusTypes" column multiple>
                                <template v-for="status, index in SpecialStatusType">
                                    <v-chip size="3rem" rounded="0" variant="text"
                                        v-if="!isNaN(Number(index)) && Number(index) > 0" :key="index">
                                        <v-img :src="`https://hbr.quest/al/${String(status)}.webp`" width="3rem" />
                                    </v-chip>
                                </template>
                            </v-chip-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="filter-category mb-2">
                        <v-expansion-panel-title hide-actions>
                            {{ `TargetType` }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                        </v-expansion-panel-text>
                    </v-expansion-panel> -->
                </v-expansion-panels>
            </v-card-text>

            <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3">
                <v-toolbar-items class="btn-toolbar__items align-center justify-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn v-bind="props" width="13rem" color="transparent" class="text-HBR" @click="hideSearch">
                                <v-img
                                    :src="isHovering ? `/ui/ButtonFirstMiniActive.webp` : `/ui/ButtonFirstMiniNomal.webp`"
                                    width="13rem" class="d-flex align-center justify-center">
                                    <div class="text-white btn-text">{{ `Close` }}</div>
                                </v-img>
                            </v-btn>
                        </template>
                    </v-hover>
                </v-toolbar-items>

                <!-- <template v-slot:image>
                    <v-img gradient="to bottom, rgba(49, 42, 71, 0.72), rgba(168, 89, 141, 0.48)"></v-img>
                </template> -->
            </v-toolbar>
        </v-card>
    </v-dialog>
    <v-dialog :close-on-back="true" :persistent="true" scrollable v-model:model-value="toggleAll" :max-width="`36rem`"
        :height="$vuetify.display.smAndDown ? undefined : $vuetify.display.height - 192"
        transition="scale-transition" :scrim="`#212121`" :close-on-content-click="false">
        <div class="v-card__white-frame--top-left"></div>
        <div class="v-card__white-frame--bottom-right"></div>
        <v-card color="#312942aa" class="v-card--shadowless search elevation-0 rounded-0"
            :class="{ mobile: $vuetify.display.smAndDown }" v-click-outside="cancelToggleAll">
            <v-toolbar color="#ffffff00" height="48" class="top-toolbar pa-1">
                <v-toolbar-title class="text-HBR ml-3">
                    {{ `Notice`.toUpperCase() }}
                </v-toolbar-title>

                <template v-slot:prepend>
                    <v-icon icon="mdi-alert-outline" size="2rem"></v-icon>
                </template>
            </v-toolbar>

            <v-card-text
                :class="`${$vuetify.display.smAndDown ? `ma-0 pa-0 mx-3` : `ma-0 pa-0 mx-4 ml-3 pr-3`} filter-list text-HBR`">
                <v-list density="compact" class="style-list pa-0 py-1 text-normal" bg-color="#1f1f1f88">
                    <v-list-item class="px-2" v-for="style in dataStore.getStyles?.filter(searchFilter)" :key="style.id"
                        :title="`${style.name}`">
                        <template v-slot:prepend>
                            <img width="32" height="32" class="mr-1" :src="`https://hbr.quest/ui/IconRarity${style.tier}.webp`" />
                        </template>
                        <template v-slot:append>
                            <img width="32" height="32" :src="`https://hbr.quest/hbr/${style.image}`" />
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <div class="text-normal text-center text-HBR mx-3 mt-2">
                {{ `Would you like to set all displayed styles to MAX LB ?` }}
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
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore, useStyleStore } from '@/store/app';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import {
    SkillType,
    // SpecialStatusType,
    ElementType,
    ElementTypeURL,
    ElementTypeName,
    WeaponType,
    WeaponTypeURL,
    WeaponTypeName,
    CardRarity,
    CharacterTeam,
    CharacterTeamURL,
    CharacterTeamName,
    CharacterRole,
    // ElementCategory,
    CharacterRoleGrandient,
    CharacterRoleURL,
    CardStatus
} from '@/enums';
import { Style } from '@/types';
const route = useRoute()
const router = useRouter()

const dataStore = useStyleStore()
const searchStore = useSearchStore()
const search = ref(route.query.v === `search`)
const toggleAll = ref(false)
const activeFilters = ref([] as number[])

const initialize = async () => {
    await new Promise(r => setTimeout(r, 100))
    activeFilters.value = [0, 1, 2, 3, 4, 5, 6]
}
initialize()

const catchEsc = (e: KeyboardEvent) => {
    // ignore normal browsing behavior
    if (e.key === `Escape`) {
        e.preventDefault();
        hideSearch()
    }
}
onMounted(() => document.addEventListener("keydown", catchEsc))
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc))

watch(route, () => {
    // displayed.value = 40
    // activeFilters.value = []
    search.value = route.query.v === `search`
    searchStore.searchFlag = route.query.v === `search`
    // initialize()
})

watch(search, () => {
    searchStore.searchFlag = route.query.v === `search`
})

watch(() => dataStore.loading, () => {
    searchStore.setRarity(route.query.t
        ? `${route.query.t}`.split(`,`).map(e => Number(CardRarity[e.toUpperCase() as keyof typeof CardRarity]) - 1)
        : [])
    searchStore.setRole(route.query.r
        ? `${route.query.r}`.split(`,`).map(e => Number(CharacterRoleURL[e.toUpperCase() as keyof typeof CharacterRoleURL]))
        : [])
    searchStore.setTeam(route.query.s
        ? `${route.query.s}`.split(`,`).map(e => Number(CharacterTeamURL[e.toUpperCase() as keyof typeof CharacterTeamURL]))
        : [])
    searchStore.setAtkType(route.query.at
        ? `${route.query.at}`.split(`,`).map(e => Number(ElementTypeURL[e.toUpperCase() as keyof typeof ElementTypeURL]) - 10)
        : [])
    searchStore.setElement(route.query.e
        ? `${route.query.e}`.split(`,`).map(e => Number(ElementTypeURL[e.toUpperCase() as keyof typeof ElementTypeURL]) - 1)
        : [])
    searchStore.setWpnType(route.query.w
        ? `${route.query.w}`.split(`,`).map(e => Number(WeaponTypeURL[e.toUpperCase() as keyof typeof WeaponTypeURL]) - 1)
        : [])
})

searchStore.$subscribe(() => {
    // When search is updated

    router.push({
        name: String(route.name),
        params: { ...route.params },
        query: {
            ...route.query,
            t: searchStore.rarities.length > 0 ? searchStore.rarities.map(e => String(CardRarity[e + 1]).toLowerCase()).join(`,`) : undefined,
            r: searchStore.roles.length > 0 ? searchStore.roles.map(e => String(CharacterRoleURL[e]).toLowerCase()).join(`,`) : undefined,
            s: searchStore.teams.length > 0 ? searchStore.teams.map(e => String(CharacterTeamURL[e]).toLowerCase()).join(`,`) : undefined,
            e: searchStore.elements.length > 0 ? searchStore.elements.map(e => String(ElementTypeURL[e + 1]).toLowerCase()).join(`,`) : undefined,
            w: searchStore.weaponTypes.length > 0 ? searchStore.weaponTypes.map(e => String(WeaponTypeURL[e + 1]).toLowerCase()).join(`,`) : undefined,
            at: searchStore.attackTypes.length > 0 ? searchStore.attackTypes.map(e => String(ElementTypeURL[e + 10]).toLowerCase()).join(`,`) : undefined,
            st: searchStore.skillTypes.length > 0 ? searchStore.skillTypes.map(e => String(SkillType[e + 1]).toLowerCase()).join(`,`) : undefined,
        }
    })
})

const searchFilter = (s: Style): boolean => {
    let result: boolean = true

    // Logic
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
        result = result && searchStore.weaponTypes.includes(Number(WeaponType[s.weapon.type]) - 1)
    }

    return result
}

const showSearch = () => {
    router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: `search` }
    })
}

const hideSearch = () => {
    router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: undefined }
    })
}


const showToggleAll = () => {
    toggleAll.value = true
}

const cancelToggleAll = () => {
    toggleAll.value = false
}

const confirmToggleAll = () => {
    toggleAll.value = false
    if (dataStore.getStyles) {
        dataStore.toggleAllVisibleMax(dataStore.getStyles.filter(searchFilter).map(s => [s.id, s.limit_break.bonus_per_level.length - 1]))
    }
}

// const addMore = (e: any) => {
//     if (display.height.value - e.target.scrollTop < 300 && displayed.value < 200) {
//         displayed.value += 20
//     }
// }
</script>

<style lang="scss">
// .white-line {

// }

.v-card__white-frame--top-left,
.v-card__white-frame--bottom-right {
    position: absolute;
    left: -0.125rem;
    right: 0.5rem;
    top: -0.125rem;
    bottom: 0;
    border-top: 0.125rem solid #fff;
    border-left: 0.125rem solid #fff;
    background: transparent;

    &:after {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        display: block;
        position: absolute;
        left: -0.3125rem;
        bottom: -0.3125rem;
        border-radius: 0.25rem;
        background-color: #fff;
        z-index: 2;
    }

    &.v-card__white-frame--bottom-right {
        border-top: none;
        border-left: none;
        border-bottom: 0.125rem solid #fff;
        border-right: 0.125rem solid #fff;
        right: -0.125rem;
        left: 0.5rem;
        bottom: -0.125rem;
        top: 0;

        &:after {
            top: -0.3125rem;
            right: -0.3125rem;
            bottom: unset;
            left: unset;
        }
    }
}

.v-card--shadowless {
    box-shadow: unset !important;
}

.search {
    color: #fff;
    // border: 0.125rem solid #fff;
    // box-shadow: 0 0 1rem #ffffffc8 !important;
    backdrop-filter: blur(0.5rem);

    // &.mobile {
    //     border: 0.125rem solid #fff;
    // }

    .top-toolbar {
        // background: linear-gradient(0deg, #302f2aff 0%, #1f1e1a00 75%);
        background: transparent;
        // border-bottom: 0.0625rem solid #fff;
        color: #fff;
    }

    .filter-list {
        border-radius: unset;
        background: #ffffff00;

        .filter-category {
            background: #1f1f1f88;
            border: 0.1875rem solid #50454f;
            border-radius: 0.5rem;
            color: #fff;

            &.v-expansion-panel {

                .v-expansion-panel__shadow {
                    box-shadow: unset;
                }

                >.v-expansion-panel-title {
                    min-height: unset;
                    // background: #d64f9280;
                    cursor: default;
                    color: #cabfc1;
                    // background: url('/ui/TabButtonToggleDefaultL.webp'), transparent;
                    background-repeat: no-repeat;
                    background-size: calc(348 * 4rem / 96) 4rem;
                    background-position: -0.5rem;
                    // padding: 0.5rem 1rem;
                    padding-left: 1.5rem;
                    padding-top: 0.75rem;
                    padding-bottom: 0.75rem;
                    padding-right: 0;

                    &:after {
                        content: '';
                        height: 0.0625rem;
                        background: #cabfc1;
                        position: absolute;
                        bottom: 0;
                        left: 1rem;
                        right: 1rem;
                    }

                    // &:before {
                    //     content: '';
                    //     width: 0.375rem;
                    //     height: 0.375rem;
                    //     display: block;
                    //     position: absolute;
                    //     bottom: -0.15625rem;
                    //     left: 0.875rem;
                    //     border-radius: 0.25rem;
                    //     background-color: #fff;
                    //     // box-shadow: 0 0 0.25rem #fff;
                    //     opacity: 1;
                    // }

                    .v-expansion-panel-title__overlay {
                        opacity: 0;
                    }
                }

                .v-expansion-panel-text__wrapper {
                    padding: 0;
                    background: transparent;

                    .filter-category__list {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        align-items: start;
                        justify-items: stretch;
                        padding: 0.5rem;
                        // padding-top: 0;

                        // .v-chip__filter {
                        //     position: absolute;
                        //     left: 1.1875rem;
                        //     z-index: 2;
                        // }

                        span {
                            line-height: 1rem;
                            // height: 1rem;
                        }
                    }
                }
            }


            &.v-expansion-panel--active {
                >.v-expansion-panel-title {
                    // background: url('/ui/TabButtonToggleActiveL.webp'), transparent;
                    background-repeat: no-repeat;
                    background-size: calc(348 * 4rem / 96) 4rem;
                    background-position: -0.5rem;
                }
            }

            &:after {
                display: none;
            }
        }

        .v-expansion-panels--variant-accordion> :not(:first-child):not(:last-child),
        .v-expansion-panels--variant-accordion> :first-child,
        .v-expansion-panels--variant-accordion> :last-child {
            border-radius: 0.75rem !important;
        }
    }



    .btn-toolbar {
        background: transparent;
        // border-top: 0.0625rem solid #fff;

        .btn-toolbar__items {
            width: 100%;

            .btn-text {
                font-size: 1rem;
                line-height: 1rem;
                text-shadow: 0px 0px 3px #212121;
            }
        }

        .v-pagination {
            background: linear-gradient(0deg, #e4d7ac 0%, #f3eccd 100%);
            color: #382300;
            border: 3px solid #b9a17f;
            border-radius: 2rem;
            width: 100%;
            height: 3.75rem;
        }
    }

    .v-pagination__list {
        margin: 0.1875rem 0;
    }

    .v-pagination__item,
    .v-pagination__first,
    .v-pagination__prev,
    .v-pagination__next,
    .v-pagination__last {
        margin: 0 0.125rem
    }
}

.search-input .v-field {
    background: linear-gradient(0deg, #e4d7ac 0%, #f3eccd 100%);
    color: #382300;
    border: 3px solid #b9a17f;
    border-radius: 1.5rem;
}

.style-list {
    border: 0.1875rem solid #50454f !important;
    border-radius: 0.5rem !important;
}
</style>