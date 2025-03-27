<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-scale-transition appear>
        <v-btn
          :aria-label="`Show Filters`"
          v-bind="props"
          :stacked="true"
          class="text-white"
          color="white"
          :flat="true"
          :width="`100%`"
          :max-width="$vuetify.display.smAndUp ? `9rem` : `5rem`"
          @click="showSearch"
          v-if="!dataStore.loading"
        >
          <v-img
            :src="
              isHovering
                ? `/ui/ButtonFifthCircleActive.webp`
                : `/ui/ButtonFifthCircleDefault.webp`
            "
            width="3.0625rem"
            height="3.0625rem"
            class="d-flex align-center justify-center"
          >
            <v-icon
              :style="{ marginLeft: `-2px` }"
              color="white"
              :icon="`mdi-filter-variant`"
            ></v-icon>
          </v-img>
          <div class="text-HBR text-white mb-1">
            {{ `Filters` }}
          </div>
        </v-btn>
      </v-scale-transition>
    </template>
  </v-hover>
  <v-dialog
    :close-on-back="true"
    scrollable
    v-model:model-value="search"
    transition="scale-transition"
    :max-width="$vuetify.display.smAndDown ? undefined : `48rem`"
    :max-height="
      $vuetify.display.smAndDown ? undefined : $vuetify.display.height - 192
    "
    :scrim="`#212121`"
    :close-on-content-click="false"
  >
    <div class="v-card__white-frame--top-left"></div>
    <div class="v-card__white-frame--bottom-right"></div>
    <v-card
      color="#312942aa"
      class="v-card--shadowless bg-blur search elevation-0 rounded-0"
      :class="{ mobile: $vuetify.display.smAndDown }"
      v-click-outside="{
        handler: hideSearch,
        include,
      }"
    >
      <v-toolbar color="#ffffff00" height="64" class="top-toolbar pa-1">
        <v-toolbar-title class="text-HBR ml-3">
          {{
            `${
              String(route.name).endsWith(`En`) ? `Memoria` : `Style`
            } Filters`.toUpperCase()
          }}
        </v-toolbar-title>

        <!-- <template v-slot:image>
                    <v-img gradient="to top, rgba(49, 42, 71, 0.72), rgba(168, 89, 141, 0.48)"></v-img>
                </template> -->

        <template v-slot:prepend>
          <v-icon icon="mdi-filter-variant" size="2rem"></v-icon>
        </template>

        <v-toolbar-items class="btn-toolbar__items align-center justify-center">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                width="3.5rem"
                color="transparent"
                class="text-HBR"
                @click="hideSearch"
              >
                <v-img
                  :src="
                    isHovering
                      ? `/ui/ButtonCloseSmallActive.webp`
                      : `/ui/ButtonCloseSmallDefault.webp`
                  "
                  width="3.5rem"
                  class="d-flex align-center justify-center"
                >
                </v-img>
              </v-btn>
            </template>
          </v-hover>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text
        :class="`${
          $vuetify.display.smAndDown
            ? `ma-0 pa-0 mx-3`
            : `ma-0 pa-0 mx-4 ml-3 pr-3`
        } filter-list text-HBR`"
      >
        <!-- <v-tabs mandatory hide-slider class="mb-2 mx-2" v-model:model-value="filterTab">
          <v-tab>
            {{ `Rarity` }}
          </v-tab>
          <v-tab>
            {{ `Team` }}
          </v-tab>
          <v-tab>
            {{ `Element` }}
          </v-tab>
          <v-tab>
            {{ `Type` }}
          </v-tab>
          <v-tab>
            {{ `Weapon` }}
          </v-tab>
          <v-tab>
            {{ `Status` }}
          </v-tab>
        </v-tabs> -->

        <v-expansion-panels
          readonly
          v-model="activeFilters"
          multiple
          variant="accordion"
        >
          <v-expansion-panel class="filter-category mb-2">
            <v-expansion-panel-title hide-actions>
              {{ `Rarity` }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.rarities"
                column
                multiple
              >
                <template v-for="(rarity, index) in CardRarity">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index))"
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <img
                        :src="`https://assets.hbr.quest/v1/ui/IconRarity${rarity}.webp`"
                        width="32"
                        height="32"
                      />
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
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.roles"
                column
                multiple
              >
                <template v-for="(role, index) in CharacterRole">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index))"
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <v-sheet
                        rounded="circle"
                        width="1.5rem"
                        height="1.5rem"
                        :color="CharacterRoleGradient[String(role) as keyof typeof CharacterRoleGradient]"
                      ></v-sheet>
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
              {{ `Element` }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.elements"
                column
                multiple
              >
                <template v-for="(element, index) in ElementType">
                  <v-chip
                    filter
                    variant="text"
                    v-if="
                      !isNaN(Number(index)) &&
                      Number(index) > 0 &&
                      Number(index) < 10
                    "
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <img
                        :src="`https://assets.hbr.quest/v1/ui/${
                          String(route.name).endsWith(`En`) ? `en/` : ``
                        }${String(element)}.webp`"
                        width="32"
                        height="32"
                      />
                      <span class="px-2">
                        {{ ElementTypeName[Number(index)] }}
                      </span>
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
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.attackTypes"
                column
                multiple
              >
                <template v-for="(attackType, index) in ElementType">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index)) && Number(index) > 9"
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <img
                        :src="`https://assets.hbr.quest/v1/ui/${
                          String(route.name).endsWith(`En`) ? `en/` : ``
                        }${String(attackType)}.webp`"
                        width="32"
                        height="32"
                      />
                      <span class="px-2">{{
                        ElementTypeName[Number(index)]
                      }}</span>
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
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.teams"
                column
                multiple
              >
                <template v-for="(squad, index) in CharacterTeam">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index))"
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <img
                        :src="`https://assets.hbr.quest/v1/ui/${String(squad)
                          .replace(/\s/g, ``)
                          .toLowerCase()}.webp`"
                        width="32"
                        height="26.4"
                      />
                      <span class="pr-2">
                        {{ CharacterTeamName[Number(index)] }}
                      </span>
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
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.weaponTypes"
                column
                multiple
              >
                <template v-for="(weapon, index) in WeaponType">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index)) && Number(index) > 0"
                    :key="index"
                  >
                    <div class="d-flex flex-row align-center">
                      <img
                        :src="`https://assets.hbr.quest/v1/ui/${String(
                          weapon
                        )}.webp`"
                        width="32"
                        height="32"
                      />
                      <span class="px-0">
                        {{ WeaponTypeName[Number(index)] }}
                      </span>
                    </div>
                  </v-chip>
                </template>
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="filter-category">
            <v-expansion-panel-title hide-actions>
              {{ `Release Date` }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row no-gutters class="px-6 pb-2 pt-1">
                <v-col cols="12">
                  <v-date-input
                    v-model="searchStore.selectedDates"
                    label="Select range"
                    theme="denchoTheme"
                    max-width="368"
                    multiple="range"
                    hide-details
                    class="date-picker"
                    variant="plain"
                    width="100%"
                    :style="{ maxWidth: `unset` }"
                    clearable
                  ></v-date-input>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel v-if="false" class="filter-category">
            <v-expansion-panel-title hide-actions>
              {{ `Status` }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group
                class="filter-category__list"
                v-model="searchStore.status"
                column
                multiple
              >
                <template v-for="(status, index) in CardStatus">
                  <v-chip
                    filter
                    variant="text"
                    v-if="!isNaN(Number(index))"
                    :key="index"
                  >
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
        </v-expansion-panels>
      </v-card-text>

      <v-toolbar color="#ffffff00" class="btn-toolbar pa-0 py-3">
        <v-toolbar-items class="btn-toolbar__items align-center justify-center">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                width="13rem"
                color="transparent"
                class="text-HBR"
                @click="hideSearch"
              >
                <v-img
                  :src="
                    isHovering
                      ? `/ui/ButtonFirstMiniActive.webp`
                      : `/ui/ButtonFirstMiniNomal.webp`
                  "
                  width="13rem"
                  class="d-flex align-center justify-center"
                >
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
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useSearchStore, useStyleStore } from "@/store/app";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
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
  CharacterRoleGradient,
  CharacterRoleURL,
  CardStatus,
  CardStatusURL,
} from "@/enums";
// import { Style } from '@/types';
const route = useRoute();
const router = useRouter();

const dataStore = useStyleStore();
const searchStore = useSearchStore();
const search = ref(route.query.v === `filters`);
const activeFilters = ref([] as number[]);
// const filterTab = ref(0);
const dateRange = ref(null);

const initialize = async () => {
  await new Promise((r) => setTimeout(r, 100));
  activeFilters.value = [0, 1, 2, 3, 4, 5, 6];
};
initialize();

const catchEsc = (e: KeyboardEvent) => {
  // ignore normal browsing behavior
  if (e.key === `Escape` && search.value) {
    e.preventDefault();
    hideSearch();
  }
};
onMounted(() => document.addEventListener("keydown", catchEsc));
onBeforeUnmount(() => document.removeEventListener("keydown", catchEsc));

const getDatesBetween = (start: string, end: string) =>
  Array.from(
    {
      length:
        (new Date(end).getTime() - new Date(start).getTime()) / 86400000 + 1,
    },
    (_, i) =>
      new Date(new Date(start).setDate(new Date(start).getDate() + i))
        .toISOString()
        .split("T")[0]
  );

watch(route, () => {
  // displayed.value = 40
  // activeFilters.value = []
  search.value = route.query.v === `filters`;
  searchStore.searchFlag = route.query.v === `filters`;
  // initialize()
});

watch(search, () => {
  searchStore.searchFlag = route.query.v === `filters`;
});

watch(
  () => dataStore.loading,
  () => {
    searchStore.setStatus(
      route.query.is
        ? `${route.query.is}`
            .split(`,`)
            .map((e) =>
              Number(
                CardStatusURL[e.toUpperCase() as keyof typeof CardStatusURL]
              )
            )
        : []
    );
    searchStore.setRarity(
      route.query.t
        ? `${route.query.t}`
            .split(`,`)
            .map(
              (e) =>
                Number(CardRarity[e.toUpperCase() as keyof typeof CardRarity]) -
                1
            )
        : []
    );
    searchStore.setRole(
      route.query.r
        ? `${route.query.r}`
            .split(`,`)
            .map((e) =>
              Number(
                CharacterRoleURL[
                  e.toUpperCase() as keyof typeof CharacterRoleURL
                ]
              )
            )
        : []
    );
    searchStore.setTeam(
      route.query.s
        ? `${route.query.s}`
            .split(`,`)
            .map((e) =>
              Number(
                CharacterTeamURL[
                  e.toUpperCase() as keyof typeof CharacterTeamURL
                ]
              )
            )
        : []
    );
    searchStore.setAtkType(
      route.query.at
        ? `${route.query.at}`
            .split(`,`)
            .map(
              (e) =>
                Number(
                  ElementTypeURL[e.toUpperCase() as keyof typeof ElementTypeURL]
                ) - 10
            )
        : []
    );
    searchStore.setElement(
      route.query.e
        ? `${route.query.e}`
            .split(`,`)
            .map(
              (e) =>
                Number(
                  ElementTypeURL[e.toUpperCase() as keyof typeof ElementTypeURL]
                ) - 1
            )
        : []
    );
    searchStore.setWpnType(
      route.query.w
        ? `${route.query.w}`
            .split(`,`)
            .map(
              (e) =>
                Number(
                  WeaponTypeURL[e.toUpperCase() as keyof typeof WeaponTypeURL]
                ) - 1
            )
        : []
    );
    searchStore.setSelectedDates(
      route.query.d
        ? getDatesBetween(
            `${route.query.d}`.split(`,`)[0],
            `${route.query.d}`.split(`,`)[
              `${route.query.d}`.split(`,`).length - 1
            ]
          ).map((e, i) => {
            const [
              year,
              month,
              day,
              hours = i > 0 ? 23 : 0,
              minutes = i > 0 ? 59 : 0,
              seconds = i > 0 ? 59 : 0,
            ] = e.split(/[-:\s]/); // Split into components

            return new Date(
              Number(year),
              Number(month) - 1, // Months are 0-based in JS
              Number(day),
              Number(hours),
              Number(minutes),
              Number(seconds)
            );
          })
        : []
    );
  }
);

// const searchFilter = (s: Style): boolean => {
//     let result: boolean = true

//     // Logic
//     if (searchStore.roles.length > 0) {
//         result = result && searchStore.roles.includes(Number(CharacterRole[s.role]))
//     }
//     if (searchStore.teams.length > 0) {
//         result = result && searchStore.teams.includes(Number(CharacterTeam[s.team]))
//     }
//     if (searchStore.elements.length > 0) {
//         result = result && (s.elements.length > 0
//             ? s.elements.some(e => searchStore.elements.includes(Number(ElementType[e]) - 1))
//             : searchStore.elements.includes(5))
//     }
//     if (searchStore.attackTypes.length > 0) {
//         result = result && searchStore.attackTypes.includes(Number(ElementType[s.type]) - 10)
//     }
//     if (searchStore.weaponTypes.length > 0) {
//         result = result && searchStore.weaponTypes.includes(Number(WeaponType[s.weapon]) - 1)
//     }

//     return result
// }

searchStore.$subscribe(() => {
  // When search is updated

  router.push({
    name: String(route.name),
    params: { ...route.params },
    query: {
      ...route.query,
      is:
        searchStore.status.length > 0
          ? searchStore.status
              .map((e) => String(CardStatusURL[e]).toLowerCase())
              .join(`,`)
          : undefined,
      t:
        searchStore.rarities.length > 0
          ? searchStore.rarities
              .map((e) => String(CardRarity[e + 1]).toLowerCase())
              .join(`,`)
          : undefined,
      r:
        searchStore.roles.length > 0
          ? searchStore.roles
              .map((e) => String(CharacterRoleURL[e]).toLowerCase())
              .join(`,`)
          : undefined,
      s:
        searchStore.teams.length > 0
          ? searchStore.teams
              .map((e) => String(CharacterTeamURL[e]).toLowerCase())
              .join(`,`)
          : undefined,
      e:
        searchStore.elements.length > 0
          ? searchStore.elements
              .map((e) => String(ElementTypeURL[e + 1]).toLowerCase())
              .join(`,`)
          : undefined,
      w:
        searchStore.weaponTypes.length > 0
          ? searchStore.weaponTypes
              .map((e) => String(WeaponTypeURL[e + 1]).toLowerCase())
              .join(`,`)
          : undefined,
      at:
        searchStore.attackTypes.length > 0
          ? searchStore.attackTypes
              .map((e) => String(ElementTypeURL[e + 10]).toLowerCase())
              .join(`,`)
          : undefined,
      st:
        searchStore.skillTypes.length > 0
          ? searchStore.skillTypes
              .map((e) => String(SkillType[e + 1]).toLowerCase())
              .join(`,`)
          : undefined,
      d:
        searchStore.selectedDates !== null &&
        searchStore.selectedDates.length > 0
          ? searchStore.selectedDates
              .filter((_, i, a) => i === 0 || i === a.length - 1)
              .map((e) => e.toISOString().split("T")[0])
              .join(`,`)
          : undefined,
    },
  });
});

const include = () => {
  return [document.querySelector(".v-date-picker")];
};

const showSearch = () => {
  setTimeout(
    () =>
      router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: `filters` },
      }),
    150
  );
};

const hideSearch = () => {
  // btnFocused.value = true
  setTimeout(
    () =>
      router.push({
        name: String(route.name),
        params: { ...route.params },
        query: { ...route.query, v: undefined },
      }),
    150
  );
  // router.push({
  //     name: String(route.name),
  //     params: { ...route.params },
  //     query: { ...route.query, v: undefined }
  // })
};
</script>
