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


export type Lottery = {
    // todo
    id: number
    label: string
    name: string
    banner: string
    count: string
    in_date: string
    rates: GachaRate[]
    notice_id: number
    ex_notice_id: number
    version: string
    replace_step: number
    replace_rate: GachaRate[]
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