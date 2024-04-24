// Utilities
import { defineStore } from "pinia";

import { DataStore, Lottery, Style, StyleData, UserData } from "@/types";
import { charaList } from "@/helpers/chara";
import { CardRarity } from "@/enums";

const myHeaders: HeadersInit = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
});

const myHeadersDefault: HeadersInit = new Headers();

const fetchConfig: RequestInit = {
  method: "GET",
  headers: myHeadersDefault,
  mode: "cors",
  cache: "no-cache",
};

const TIME = new Date();

const request = async (tableName: string): Promise<any[]> => {
  return await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? PROD.replace(`TABLE`, tableName)
        : DEV.replace(`TABLE`, tableName)
    }.json?${TIME.getTime()}`,
    fetchConfig
  ).then((response) => response.json());
};

const PROD =
  "https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/TABLE";
const DEV = "/db/TABLE";

const getUserData = (): number[][] => {
  return localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string)
    : [];
};

const getBoxData = (sList: Style[] | undefined): StyleData[] => {
  return (
    sList?.map((s) => {
      let d = JSON.parse(localStorage.getItem(`${s.id}`) || `"-1,0,0"`).split(
        `,`
      );
      return {
        id: s.id,
        lbLv: Number(d[0]),
        abilityLv: Number(d[1]),
        styleLv: Number(d[2]),
      };
    }) || []
  );
};

export const useStyleStore = defineStore("styles", {
  state: () => ({
    data: {} as DataStore,
    owned: getUserData() as number[][],
    box: [] as StyleData[],
    loading: true as boolean,
    selection: -1,
  }),
  getters: {
    getStyles(state): Style[] | undefined {
      return state.data.styles?.sort((a: Style, b: Style) =>
        a.chara_label == b.chara_label
          ? Number(CardRarity[a.tier]) - Number(CardRarity[b.tier])
          : a.id - b.id
      );
    },
    getSelectedStyle(state): Style | undefined {
      return this.getStyles?.find(s => s.id === state.selection);
    },
    getOwned(state): number[][] {
      return state.owned;
    },
    getBox(state): StyleData[] {
      return state.box;
    },
  },
  actions: {
    async loadStyles(): Promise<boolean> {
      return await request(`styles_s`).then((data) => {
        this.data = this.data
          ? { ...this.data, styles: data as Style[] }
          : { styles: data as Style[] };
        return true;
      });
    },
    toggleStyle(styleId: number): void {
      this.selection = styleId
      this.owned =
        this.owned.findIndex((s) => s[0] === styleId) > -1
          ? this.owned.filter((s) => s[0] !== styleId)
          : [...this.owned, [styleId, 0]];
      this.setUserData();
      // new
      // this.box = this.box.map((s) =>
      //   s.id === styleId ? { ...s, lbLv: s.lbLv > -1 ? -1 : 0 } : s
      // );
      // this.persistBoxData(this.box.find((s) => s.id === styleId));
    },
    isOwned(style: Style): boolean {
      return this.owned.findIndex((x) => x[0] === style.id) > -1;
    },
    isAllVisibleOwned(styleList: number[][]): boolean {
      return styleList.every(
        (s) => this.owned.findIndex((x) => x[0] === s[0]) > -1
      );
    },
    toggleAllVisibleMax(styleList: number[][]): void {
      this.owned = this.isAllVisibleOwned(styleList)
        ? this.owned.filter(
            (s) => styleList.findIndex((x) => x[0] === s[0]) < 0
          )
        : [
            ...this.owned.filter(
              (s) => styleList.findIndex((x) => x[0] === s[0]) < 0
            ),
            ...styleList,
          ];
      this.setUserData();
    },
    setStyleLv(
      styleId: number,
      maxLv: number,
      setToMax: boolean = false
    ): void {
      this.owned =
        this.owned.findIndex((s) => s[0] === styleId) > -1
          ? this.owned.map((s) =>
              s[0] === styleId
                ? [
                    s[0],
                    setToMax
                      ? maxLv
                      : s[1] < maxLv
                      ? Math.min(s[1] + 1, maxLv)
                      : 0,
                  ]
                : s
            )
          : this.owned;
      this.setUserData();
      // new
      // this.box = this.box.map((s) =>
      //   s.id === styleId
      //     ? {
      //         ...s,
      //         lbLv: setToMax
      //           ? maxLv
      //           : s.lbLv < maxLv
      //           ? Math.min(s.lbLv + 1, maxLv)
      //           : 0,
      //       }
      //     : s
      // );
      // this.persistBoxData(this.box.find((s) => s.id === styleId));
    },
    getStyle(styleId: number): number[] {
      return this.owned.find((s) => s[0] === styleId) || [-1, -1];
      // return this.owned.findIndex(s => s[0] === styleId) > -1
      //   ? Number(this.owned
      //     .filter(s => s[0] === styleId)
      //     .map(s => s[1])
      //     .join(``))
      //   : -1
    },
    getCharaIndex(label: string): number {
      return charaList.findIndex((c) => c === label) + 1;
    },
    getIncrementedStyleLv(index: number): number {
      return this.getStyle(index)[1] + 1;
    },
    getReducedUserData(): UserData[] | undefined {
      return this.getStyles?.reduce((acc, style) => {
        return acc.findIndex(
          (a) => a.charaId === this.getCharaIndex(style.chara_label)
        ) > -1
          ? acc.map((a) =>
              a.charaId === this.getCharaIndex(style.chara_label)
                ? {
                    charaId: a.charaId,
                    styleList: [...a.styleList, style.id],
                  }
                : a
            )
          : [
              ...acc,
              {
                charaId: this.getCharaIndex(style.chara_label),
                styleList: [style.id],
              },
            ];
      }, [] as UserData[]);
      // .map((e, i) => {
      //   return { ...e, styleList: Array.from(new Array(e.styleList.length)) }
      // })
    },
    setUserData(): void {
      localStorage.setItem("userData", JSON.stringify(this.owned));
    },
    initBoxData(): void {
      this.box = getBoxData(this.getStyles);
    },
    convertOwnedToBoxData(): void {
      if (this.owned && this.owned.length > 0) {
        this.box = this.box.map((s) => {
          let ownedStyle = this.owned.find((e) => e[0] === s.id);
          return ownedStyle
            ? { ...s, lbLv: ownedStyle[1], styleLv: 0, abilityLv: 0 }
            : s;
        });
        this.box.forEach((s) => this.persistBoxData(s));
      }
    },
    persistBoxData(s: StyleData | undefined): void {
      if (s) {
        localStorage.setItem(
          `${s.id}`,
          JSON.stringify([s.lbLv, s.abilityLv, s.styleLv].join(","))
        );
      }
    },
  },
});

export const useLotteryStore = defineStore("gachalist", {
  state: () => ({
    data: undefined as DataStore | undefined,
    loading: true as boolean,
    index: 0 as number,
    amountSpent: 0 as number,
    lastRollNum: 0 as number,
    rollDelay: 0 as number,
    gachaResults: [] as string[],
    totalResults: [] as string[],
    activeResults: false as boolean,
    cardDisplayFlag: false as boolean,
    trashDisplayFlag: false as boolean,
  }),
  getters: {
    getGachaList(state): Lottery[] | undefined {
      return state.data ? state.data.gachaList : undefined;
    },
    getCurrentIndex(state): number {
      return state.index;
    },
    getAmountSpent(state): number {
      return state.amountSpent;
    },
    getLastRollNum(state): number {
      return state.lastRollNum;
    },
    getRollDelay(state): number {
      return state.rollDelay;
    },
    getLoading(state): boolean {
      return state.loading;
    },
    getGachaResults(state): string[] {
      return state.gachaResults;
    },
    getTotalResults(state): string[] {
      return state.totalResults;
    },
    getDisplayCardFlag(state): boolean {
      return state.cardDisplayFlag;
    },
    getDisplayTrashFlag(state): boolean {
      return state.trashDisplayFlag;
    },
    getLotteryData(state): Lottery | undefined {
      return state.data?.gachaList
        ?.filter((b) => b.count === `multi` || b.count === `stepup`)
        .map((b) => {
          return { ...b, label: b.label.replace(`lottery_`, ``) };
        })
        .sort((a, b) => b.in_date.localeCompare(a.in_date))
        .find((b, bi) => bi === state.index);
    },
  },
  actions: {
    async loadGachaList(): Promise<boolean> {
      return await request(`banners`).then((data) => {
        this.data = this.data
          ? { ...this.data, gachaList: data as Lottery[] }
          : { gachaList: data as Lottery[] };
        return true;
      });
    },
    updateIndex(newIndex: number) {
      this.index = newIndex;
    },
    updateAmountSpent(amount: number) {
      this.amountSpent += amount;
    },
    updateLastRollNum(times: number) {
      this.lastRollNum = times;
    },
    clearAmountSpent() {
      this.amountSpent = 0;
    },
    clearGachaResults() {
      this.gachaResults = [];
      this.activeResults = false;
    },
    clearAll() {
      this.amountSpent = 0;
      this.lastRollNum = 0;
      this.gachaResults = [];
      this.totalResults = [];
      this.activeResults = false;
    },
    cancelLoading() {
      this.loading = false;
    },
    updateGachaResults(newStyle: string) {
      // this.gachaResults.unshift(newStyle)
      this.gachaResults.push(newStyle);
      this.totalResults.push(newStyle);
    },
    openResults() {
      this.activeResults = true;
    },
    toggleCard(flag: boolean) {
      this.cardDisplayFlag = flag;
    },
    toggleTrash(flag: boolean) {
      this.trashDisplayFlag = flag;
    },
  },
});

export const useSearchStore = defineStore("searchFlag", {
  state: () => ({
    menuFlag: false as boolean,
    searchFlag: false as boolean,
    status: [] as number[],
    rarities: [] as number[],
    roles: [] as number[],
    teams: [] as number[],
    elements: [] as number[],
    attackTypes: [] as number[],
    weaponTypes: [] as number[],
    skillTypes: [] as number[],
    statusTypes: [] as number[],
  }),
  getters: {
    getFlag(state): boolean {
      return state.searchFlag;
    },
  },
  actions: {
    setStatus(ls: number[]): void {
      this.status = [...ls];
    },
    setRarity(ls: number[]): void {
      this.rarities = [...ls];
    },
    setRole(ls: number[]): void {
      this.roles = [...ls];
    },
    setTeam(ls: number[]): void {
      this.teams = [...ls];
    },
    setAtkType(ls: number[]): void {
      this.attackTypes = [...ls];
    },
    setElement(ls: number[]): void {
      this.elements = [...ls];
    },
    setWpnType(ls: number[]): void {
      this.weaponTypes = [...ls];
    },
    setSkillType(ls: number[]): void {
      this.skillTypes = [...ls];
    },
  },
});
