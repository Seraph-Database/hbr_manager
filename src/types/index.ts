import { CharacterRole, ElementType, WeaponType, ItemCategory, CardRarity, CharacterTeam } from '@/enums'

// HBR types

export type DataStore = {
    styles?: Style[]
    gachaList?: Lottery[]
}


export type Index = {
    id: number
    name: string[]
}


export type Character = {
    // todo
}


export type StyleData = {
    id: number
    lbLv: number
    abilityLv: number
    styleLv: number
}


export type Lottery = {
    // todo
    id: number
    label: string
    version: string
    name: string
    in_date: string
    banner: string
    banner_title: string
    currency: string
    count: number
    cost: number
    ticket: {
        image: string
    } | null
    draw_limit: {
        max_daily: number
        max_draws: number
    }
    is_free: boolean
    is_gauge: boolean
    rates: GachaRate[]
    gss_step: number
    gss_rates: GachaRate[]
    notices: {
        gacha: number
        exchange: number
    }
    tab: string
    steps: {
        step: number
        cost: number
        count: number
        text: string
        rates: GachaRate[]
        gss_step: number
        gss_rates: GachaRate[]
    } | null
}


export type GachaRate = {
    rarity: number
    rate: number
    cards: GachaCard[]
}


export type GachaCard = {
    id: number
    image: string
    label: string
    in_date: string
    name: string
}


export type ElementList = {
    element: string | ElementType,
    list: Style[]
}


export type RoleList = {
    element: string | CharacterRole,
    list: Style[]
}


export type RarityList = {
    element: string | CardRarity,
    list: Style[]
}


export type ElementListGroup = {
    element: string | ElementType,
    groups: Style[][]
}


export type RoleListGroup = {
    element: string | CharacterRole,
    groups: Style[][]
}


export type RarityListGroup = {
    element: string | CardRarity,
    groups: Style[][]
}


export type Style = {
    id: number
    image: string
    strip: string
    bg: string
    team: CharacterTeam
    chara: Character
    chara_label: string
    chara_icon: string
    name: string[]
    in_date: string
    label: string
    tier: CardRarity // StyleRarity
    piece: Piece
    role: CharacterRole // StyleRole
    type: ElementType // AttackType
    elements: ElementType[] // AttackElement[]
    // weapon: Weapon
    weapon: string
    base_param: BaseParam
    skills: Skill[]
    growth_abi: GrowthAbility
    limit_break: LimitBreak
    max_lb: number
    tree_count: number
    ability_tree: AbilityTree[]
    passives: PassiveSkill[]
    generalize: boolean
}


export type BaseParam = {
    // todo
}


export type Skill = {
    id: number
    label: string
    name: string
    desc: string
    hit_count: number
    target_type: string
    is_restricted: number
    auto_priority: number
    is_adv: boolean
    use_count: number
    sp_cost: number
    max_level: number
    overwrite: number
    effect: string
    parts: SkillPart[]
    hits: SkillHit[]
    in_date: string
}


export type SkillPart = {
    skill_type: string
    target_type: string
    type: string
    elements: string[]
    power: number[]
    value: number[]
    strval: (Skill | number)[]
    cond: string
    dv: number
    multipliers: {
        dp: number
        hp: number
        dr: number
    }
    diff_for_max: number
    parameters: {
        str: number
        wis: number
        dex: number
        spr: number
        luk: number
        con: number
    }
    growth: number[]
    hits: SkillHit[]
    effect: {
        category: string
        limitType: string
        exitCond: string
        exitVal: number[]
    }
}


export type SkillHit = {
    // todo
}


export type GrowthAbility = {
    // todo
}


export type AbilityTree = {
    // todo
}


export type LimitBreak = {
    stat_per_level: number,
    bonus_per_level: LimitBreakBonus[]
}


export type LimitBreakBonus = {
    // todo
}


export type PassiveSkill = {
    // todo
}


export type Piece = {
    id: number,
    category: ItemCategory,
    rarity: number,
    image: string,
    label: string,
    name: string[],
    text: string[],
    value: number,
    limit: number,
    location: string[],
    almightyRate: number
}


export type Weapon = {
    type: WeaponType,
    name: string
}


export type UserData = {
    charaId: number,
    styleList: number[]
}


export type StyleList = {
    RKayamori: number[]
    YIzumi: number[]
    MAikawa: number[]
    TTojo: number[]
    KAsakura: number[]
    TKunimi: number[]
    EAoi: number[]
    IMinase: number[]
    SMinase: number[]
    SHiguchi: number[]
    KHiiragi: number[]
    Byakko: number[]
    BIYamawaki: number[]
    SSakuraba: number[]
    MTenne: number[]
    YBungo: number[]
    AKanzaki: number[]
    MSatsuki: number[]
    YShirakawa: number[]
    MTsukishiro: number[]
    MKiryu: number[]
    CSugahara: number[]
    HOgasawara: number[]
    SKura: number[]
    MNikaido: number[]
    IIshii: number[]
    FMikoto: number[]
    RMurohushi: number[]
    ADate: number[]
    AMizuhara: number[]
    IcOhshima: number[]
    NiOhshima: number[]
    MiOhshima: number[]
    YoOhshima: number[]
    IrOhshima: number[]
    MuOhshima: number[]
    MYanagi: number[]
    KMaruyama: number[]
    SHanamura: number[]
    CMatsuoka: number[]
    INatsume: number[]
    MKurosawa: number[]
    CReaper: number[]
    LShanhua: number[]
    IRedmayne: number[]
    VBalakrishnan: number[]
    MdAngelis: number[]
    CSkopovskaya: number[]
    AliceA: number[]
    AliceB: number[]
    AliceC: number[]
}