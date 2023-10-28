// Live Enums

export enum InputResultType {
	NONE = 0,
	PERFECT = 1,
	GREAT = 2,
	GOOD = 3,
	BAD = 4,
	MISS = 5
}

export enum LiveLevel {
    NONE = 0,
    EASY = 1,
    NORMAL = 2,
    HARD = 3,
    EXPERT = 4
}

export enum LiveMarkerType {
    NONE = 0,
    TAP,
    FLICK,
    LONG,
    SKILL
}

export enum LiveScoreRank {
    D = 0,
    C,
    B,
    A,
    S,
    SS
}

export enum LiveSkillCategory {
    NONE = 0,
    SCORE_UP,
    PERFECT_SCORE_UP,
    LIFE_HEAL,
    RESULT_UP,
    COMBO_BONUS_UP,
    DAMAGE_GUARD,
    TEAM_SKILL_LV_UP
}

export enum LiveSkillEffectType {
    NONE = 0,
    SCORE_UP,
    LIFE_HEAL,
    RESULT_UP,
    COMBO_BONUS_UP,
    DAMAGE_GUARD,
    SKILL_LV_UP
}

export enum LiveSkillTriggerType {
    NONE = 0,
    LIFE_OR_OVER,
    LIFE_UNDER,
    ADAPT_INPUT_RESULT_OR_OVER,
    UNTIL_INPUT_RESULT_OR_UNDER,
    SINCE_INPUT_RESULT_OR_UNDER
}