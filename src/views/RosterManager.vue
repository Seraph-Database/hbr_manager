<template>
  <page-title title="Style Manager" />
  <v-container class="pa-0 rounded-0 pt-2 pb-16" fluid>
    <v-slide-y-transition appear>
      <v-card class="ma-0 pa-0" color="transparent" flat>
        <v-row no-gutters justify="center" align="center">
          <template v-for="styleIndex in !dataStore.loading && dataStore.getStyles ? dataStore.getStyles.length : 100"
            :key="styleIndex">
            <v-col v-show="dataStore.getStyles && searchFilter((dataStore.getStyles as Style[])[styleIndex - 1])"
              cols="auto"
              :class="`style-wrapper ${!dataStore.loading && dataStore.getOwned.findIndex(s => s[0] === (dataStore.getStyles as Style[])[styleIndex - 1].id) < 0 ? `style--greyed ` : ``}${$vuetify.display.width > 720 ? `pa-2` : `pa-0 pt-2 pb-2`}`">
              <StyleCard :style-index="styleIndex" />
            </v-col>
          </template>
        </v-row>
      </v-card>
    </v-slide-y-transition>
    <v-sheet color="transparent" class="mt-4" v-if="dataStore.getReducedUserData()">
      <!-- <v-row no-gutters class="text-normal text-HBR">
        <v-col cols="auto">
          {{ encode(reducedUserData.map(d => [d.charaId, d.styleList])) }}
        </v-col>
      </v-row> -->
      <v-row no-gutters class="mt-4">
        <v-col cols="6">
        </v-col>
        <v-col cols="6" class="text-normal">
          <div v-for="line, index in dataStore.getReducedUserData()" :key="index">
            {{ line }}
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import PageTitle from '@/components/default/PageTitle.vue'
// import Gauge from '@/components/battle/Gauge.vue';
import StyleCard from '@/components/style/StyleCard.vue'
import { useStyleStore, useSearchStore } from '@/store/app';
// import { useRoute/*, useRouter */ } from 'vue-router';
import { ref/*, watch */ } from 'vue';
import { Style } from '@/types';
import { CardRarity, CharacterRole, CharacterTeam } from '@/enums';
import { ElementType } from '@/enums';
import { WeaponType } from '@/enums';
// import { encode, decode } from '@/helpers/encoder';

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

const loadData = async () => {
  if (dataStore.getStyles === undefined) {
    await dataStore.loadStyles()
  }
}

// const saveData = () => {
//   dataStore.setUserData()
// }
// onMounted(() => document.addEventListener("beforeunload", saveData))
// onBeforeUnmount(() => {
//   document.removeEventListener("beforeunload", saveData)
//   dataStore.setUserData()
// })

loadData().then(() => showAll())

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
  // if (searchStore.skillTypes.length > 0) {
  //   result = result && s.skills.length > 0
  //     && s.skills
  //       .some(sk => sk.parts
  //         .some(p => searchStore.skillTypes
  //           .includes(Number(SkillType[p.skill_type as keyof typeof SkillType]) - 1)
  //           || p.strval
  //             .some(subsk => {
  //               return typeof subsk !== `number` && subsk.parts
  //                 .some(subp => searchStore.skillTypes
  //                   .includes(Number(SkillType[subp.skill_type as keyof typeof SkillType]) - 1)
  //                 )
  //             }
  //             )
  //         )
  //       )
  // }

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
.style-wrapper {
  transition: 0.25s ease-in;
}

.style--greyed {
  opacity: 0.24;
}
</style>