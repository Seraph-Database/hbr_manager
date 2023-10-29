<template>
  <page-title title="Style Manager" />
  <v-container class="pa-0 rounded-0 pt-2 pb-16" fluid>
    <v-slide-y-transition appear>
      <v-card width="100%" color="transparent" flat>
        <RecycleScroller v-if="!dataStore.loading" page-mode class="scroller" :buffer="640" :items="dataStore.getStyles"
          :grid-items="itemsPerLine" :item-secondary-size="372" :item-size="160" key-field="label"
          v-slot="{ item }">
          <div :class="`pa-2 style-wrapper ${!dataStore.getOwned.includes(item.label) ? `style--greyed ` : ``}`">
            <v-skeleton-loader :loading="dataStore.loading" color="grey" width="356" height="144"
              class="style-placeholder">
              <v-slide-y-transition leave-absolute appear>
                <div v-ripple @click.stop="dataStore.toggleStyle(item.label)">
                  <v-img width="356" height="144" class="style-strip"
                    :src="`https://hbr.quest/hbr/${item.strip.replace(`Party`, `Select`)}`">

                    <v-img class="style-rarity__icon" :src="`https://hbr.quest/ui/IconRarity${item.tier}.webp`"
                      width="3.375rem" height="3.375rem" />

                    <v-img class="style-strip__gradient"
                      :gradient="`to left, rgba(0, 0, 0, 0), ${CharacterRoleGradient[String(item.role) as keyof typeof CharacterRoleGradient]} 35%, ${CharacterRoleGradient[String(item.role) as keyof typeof CharacterRoleGradient]} 85%, rgba(0, 0, 0, 0)`"
                      height="1.5rem" width="66.66%">
                    </v-img>

                    <v-chip label color="transparent" class="style-role__chip text-HBR">
                      <span>{{ String(item.role).toUpperCase() }}</span>
                    </v-chip>

                    <v-img class="style-type__icon" width="2.75rem" height="2.75rem"
                      :src="`https://hbr.quest/ui/${item.type}.webp`" />
                    <v-img class="style-element__icon" width="2.75rem" height="2.75rem" v-if="item.elements.length > 0"
                      :src="`https://hbr.quest/ui/${item.elements[0]}.webp`" />

                    <!-- <v-row no-gutters class="style-status">
                      <template v-for="skill in item.skills">
                        <template v-for="part in skill.parts">
                          <v-col cols="auto">
                            <v-img :src="`https://hbr.quest/al/${part.elements.length > 0
                                ? String(part.elements[0])
                                : ``}${String(part.skill_type)}.webp`" width="3rem" />
                            <v-tooltip activator="parent" location="top">
                              {{ `${part.target_type} ${part.skill_type}` }}
                            </v-tooltip>
                          </v-col>
                          <template v-for="subskill in part.strval">
                            <template v-if="(typeof subskill !== `number`)">
                              <v-col cols="auto" v-for="subpart in subskill.parts">
                                <v-img :src="`https://hbr.quest/al/${subpart.elements.length > 0
                                    ? String(subpart.elements[0])
                                    : ``}${String(subpart.skill_type)}.webp`" width="3rem" />
                                <v-tooltip activator="parent" location="top">
                                  {{ `${subpart.target_type} ${subpart.skill_type}` }}
                                </v-tooltip>
                              </v-col>
                            </template>
                          </template>
                        </template>
                      </template>
                    </v-row> -->

                    <!-- <edit-style :tree="style.ability_tree" :val="`00`" @editStyle="toggleEditor" /> -->

                    <div class="style-status">
                      <v-btn @click.stop class="pa-0 px-3 pr-1 ml-1 mb-2" color="transparent" rounded="pill" flat
                        v-if="dataStore.getOwned.includes(item.label)">
                        <v-row no-gutters class="align-start">
                          <v-col cols="auto" class="text-HBR text-label text-HBR--stroke">
                            {{ `Lv.` }}
                          </v-col>
                          <v-col cols="auto" class="px-1 text-HBR text-LB text-HBR--stroke">
                            {{ `${item.limit_break.bonus_per_level.length -
                              1}` }}
                          </v-col>
                        </v-row>
                      </v-btn>
                      <v-row no-gutters class="style-name text-normal">
                        <v-col cols="auto" class="px-3 text-HBR text-HBR--stroke">
                          {{ item.name }}
                        </v-col>
                      </v-row>
                    </div>
                  </v-img>
                </div>
              </v-slide-y-transition>
            </v-skeleton-loader>
          </div>
        </RecycleScroller>
      </v-card>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts" setup>
import PageTitle from '@/components/default/PageTitle.vue'
// import Gauge from '@/components/battle/Gauge.vue';
import { useStyleStore, useSearchStore } from '@/store/app';
import { useDisplay } from 'vuetify';
// import { useRoute/*, useRouter */ } from 'vue-router';
import { computed, ref/*, watch */ } from 'vue';
import { Style } from '@/types';
import { CardRarity, CharacterRole, CharacterTeam, CharacterRoleGradient, SkillType } from '@/enums';
import { ElementType } from '@/enums';
import { WeaponType } from '@/enums';

const dataStore = useStyleStore()
const searchStore = useSearchStore()
// const route = useRoute()
// const router = useRouter()
let displayedResults = ref(30)

const showAll = async (delay: number = 200) => {
  if (dataStore.getStyles && dataStore.getStyles.length > displayedResults.value) {
    await new Promise(r => setTimeout(r, delay))
    dataStore.loading = false
    displayedResults.value += dataStore.getStyles.length - displayedResults.value
  }
}

// const showAllAgain = () => {
//   dataStore.loading = true
//   displayedResults.value = 30
//   showAll()
// }

const itemsPerLine = computed(() => {
  return Math.trunc(useDisplay().width.value / 356)
})

// const itemsWidth = computed(() => {
//   return 356
// })

const loadData = async () => {
  if (dataStore.getStyles === undefined) {
    await dataStore.loadStyles()
  }
}

loadData().then(() => showAll())

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
  if (searchStore.skillTypes.length > 0) {
    result = result && s.skills.length > 0
      && s.skills
        .some(sk => sk.parts
          .some(p => searchStore.skillTypes
            .includes(Number(SkillType[p.skill_type as keyof typeof SkillType]) - 1)
            || p.strval
              .some(subsk => {
                return typeof subsk !== `number` && subsk.parts
                  .some(subp => searchStore.skillTypes
                    .includes(Number(SkillType[subp.skill_type as keyof typeof SkillType]) - 1)
                  )
              }
              )
          )
        )
  }

  return result
}

// const sorter = (a: Style, b: Style): number => {
//   let selection: string = route.query.s ? route.query.s as string : ''
//   let order: number = route.query.o && route.query.o === `Desc` ? 1 : 0
//   let weight: number

//   switch (selection) {
//     default:
//       weight = a.id - b.id
//       break
//   }

//   return (order < 1 ? weight : weight * -1 || a.id - b.id)
// }

// watch(route, showAllAgain, { flush: 'pre', immediate: true, deep: true })
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
}

.style-wrapper {
  transition: 0.25s ease-in;
}

.style--greyed {
  opacity: 0.24;
}
</style>