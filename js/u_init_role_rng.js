// u_init_role_rng.js — C u_init.c / mkobj.c leaf RNG for role inventory (narrow port).
// Used while ini_inv is still stubbed so ISAAC matches upstream before init_attr(75).
// C refs: u_init.c u_init_role (PM_ROGUE / PM_SAMURAI / PM_VALKYRIE / PM_KNIGHT / PM_MONK), ini_inv(), trquan(), mkobj.c mksobj+mksobj_init,
//         mkbox_cnts (SACK empty at moves<=1), blessorcurse().

import { game } from './gstate.js';
import { rnd, rn2, rne, rn1 } from './rng.js';
import { OTYP_LEATHER_ARMOR, P_BOW, P_SHURIKEN } from './const.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';
import { iniInvMkobjFilterScrollClassMonkLikeC } from './mkobj_scroll_class_rng_like_c.js';
import {
    gnIniInvFreshLikeC,
    iniInvGnAfterUndefAcceptLikeC,
    iniInvMkobjFilterWizardHumanLikeC,
} from './mkobj_wizard_ini_inv_filter_like_c.js';
import {
    NH5_ARMOR_CLASS,
    NH5_POTION_CLASS,
    NH5_RING_CLASS,
    NH5_SCROLL_CLASS,
    NH5_SPBOOK_CLASS,
    NH5_TOOL_CLASS,
    NH5_WAND_CLASS,
    NH5_WEAPON_CLASS,
} from './nh5_objclass.js';

/** C objects_nums — OBJECTS_ENUM (nethack-c/upstream/include/objects.h). */
const OTYP_DAGGER = 34;
const OTYP_YA = 22;
const OTYP_SHORT_SWORD = 46;
const OTYP_KATANA = 56;
const OTYP_YUMI = 86;
/** NH5 — matches **`OBJECTS_A_AC_ARMOR`** splint row **125** (`u_init_find_ac.js`). */
const OTYP_SPLINT_MAIL = 125;
/** C `OC_SKILL_ROW_BY_OTYP` key for **`SPEAR`** (NH5 invent **`otyp`** = **27**, same **−1** pattern as Rogue short sword **46** vs map **47**). */
const OTYP_SPEAR_MK = 28;
/** C `OC_SKILL_ROW_BY_OTYP` — **`LONG_SWORD`** / **`LANCE`** (`mksobj_init` WEAPON). */
const OTYP_LONG_SWORD_MK = 55;
const OTYP_LANCE_MK = 73;
const OTYP_SACK = 216;
const OTYP_LOCK_PICK = 221;
const OTYP_POT_SICKNESS = 317;
/** C Wizard[] — `OBJECTS_ENUM` / `objects.h`. */
const OTYP_QUARTERSTAFF = 79;
const OTYP_CLOAK_OF_MAGIC_RESISTANCE = 148;

/** C: mkobj.c next_ident — ident += rnd(2) */
function nextIdentLikeC() {
    rnd(2);
}

/** C: mkobj.c blessorcurse(otmp, chance) — fresh obj: !blessed && !cursed */
function blessorcurseLikeC(chance) {
    if (!rn2(chance)) {
        rn2(2);
    }
}

/** C: mkobj.c mksobj_init — WEAPON_CLASS (artif always FALSE for ini_inv). */
function mksobjInitWeaponLikeC(otyp, artif) {
    const row = OC_SKILL_ROW_BY_OTYP.get(otyp);
    const sk = row?.oc_skill ?? 0;
    const multigen = row?.oclass === 2 && sk >= -P_SHURIKEN && sk <= -P_BOW;
    if (multigen) {
        rn2(6);
    }
    if (!rn2(11)) {
        rne(3);
        rn2(2);
    } else if (!rn2(10)) {
        rne(3);
    } else {
        blessorcurseLikeC(10);
    }
    const poisonable = row?.oclass === 2 && sk >= -P_SHURIKEN && sk <= -P_BOW;
    if (poisonable && !rn2(100)) {
        /* otmp->opoisoned = 1 */
    }
    if (artif) {
        /* mk_artifact — ini_inv uses artif FALSE */
    }
}

/** C: mkobj.c mksobj_init — ARMOR_CLASS (leather armor: none of the named “bad” armors). */
function mksobjInitArmorLikeC(artif) {
    const r1 = rn2(10);
    let curseBranch = false;
    if (r1 !== 0) {
        curseBranch = !rn2(11);
    }
    if (curseBranch) {
        rne(3);
    } else if (!rn2(10)) {
        rn2(2);
        rne(3);
    } else {
        blessorcurseLikeC(10);
    }
    if (artif) {
        /* mk_artifact — ini_inv uses artif FALSE */
    }
}

/** C: mkobj.c mksobj_init — POTION_CLASS blessorcurse(otmp, 4) */
function mksobjInitPotionLikeC() {
    blessorcurseLikeC(4);
}

/** C: mkobj.c mksobj_init — SPBOOK_CLASS blessorcurse(otmp, 17) */
function mksobjInitSpellbookIniInvLikeC() {
    blessorcurseLikeC(17);
}

/** C: mkobj.c mksobj_init — MAGIC_MARKER `otmp->spe = rn1(70, 30)` */
function mksobjInitMagicMarkerSpeRn1LikeC() {
    rn1(70, 30);
}

/** C: mkobj.c mksobj_init — SACK → mkbox_cnts; moves<=1 && !in_mklev → n=0 → for (n = rn2(1); …) */
function mksobjInitSackStartInvLikeC() {
    rn2(1);
}

/** C: mkobj.c FOOD default tail — **`!rn2(6)`** sets **`quan`** **2** (food ration, apple, carrot, …). */
function mksobjInitDefaultFoodQuanMaybeDoubleLikeC() {
    return !rn2(6) ? 2 : 1;
}

/** C: mkobj.c FOOD_RATION path — same default **`quan`** tail as other non-corpse food. */
function mksobjInitFoodRationQuanLikeC() {
    return mksobjInitDefaultFoodQuanMaybeDoubleLikeC();
}

/** C: mkobj.c **`OIL_LAMP`** — **`age = rn1(500, 1000)`**, **`blessorcurse(otmp, 5)`**. */
function mksobjInitOilLampToolLikeC() {
    rn1(500, 1000);
    blessorcurseLikeC(5);
}

/**
 * C: u_init.c — **`if (!rn2(5)) ini_inv(Blindfold)`** after role **`trobj[]`** (Rogue, Samurai, Wizard).
 * **`ini_inv(Blindfold)`**: **`trquan`** (**`rn2(1)`**), **`mksobj`** **`next_ident`** (**`rnd(2)`**), **`ini_inv_adjust_obj`** **`trquan`** (**`rn2(1)`**).
 * @returns {boolean} gate open (Rogue / Samurai / Wizard linkers store on role-specific **`g._…IniBlindfold`**).
 */
export function consumeIniInvBlindfoldLeafRngIfGateLikeC() {
    const open = rn2(5) === 0;
    if (open) {
        rn2(1);
        nextIdentLikeC();
        rn2(1);
    }
    return open;
}

/**
 * C: u_init.c u_init_role PM_ROGUE + ini_inv(Rogue[]) for human (no race subs).
 * Order: trquan/mksobj/adjust per u_init.c ini_inv + ini_inv_adjust_obj.
 */
export function consumeRogueHumanIniInvUinitRoleRngLikeC() {
    /* SHORT_SWORD */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_SHORT_SWORD, false);
    rn2(1);

    /* DAGGER — C ini_inv: first trquan(trop) consumes RNG; adjust sets quan from second trquan() */
    rn2(10);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_DAGGER, false);
    game._rogueIniDaggerQuan = 6 + rn2(10);

    /* LEATHER_ARMOR */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);

    /* POT_SICKNESS */
    rn2(1);
    nextIdentLikeC();
    mksobjInitPotionLikeC();

    /* LOCK_PICK — no tool-specific mksobj_init RNG */
    rn2(1);
    nextIdentLikeC();
    rn2(1);

    /* SACK */
    rn2(1);
    nextIdentLikeC();
    mksobjInitSackStartInvLikeC();
    rn2(1);

    /* C u_init.c PM_ROGUE — optional Blindfold after Rogue[] (Samurai/Wizard share same gate when ported). */
    game._rogueIniBlindfold = consumeIniInvBlindfoldLeafRngIfGateLikeC();
}

/**
 * C: u_init.c **`PM_SAMURAI`** **`ini_inv(Samurai[])`** for human (no race subs) + **`!rn2(5)`** blindfold.
 * Order: **`trquan`** / **`mksobj`** / **`ini_inv_adjust_obj`** **`trquan`** per C **`ini_inv`** (weapons: two **`trquan`** each; YA quan from second **`trquan`** → **`g._samuraiIniYaQuan`**).
 */
export function consumeSamuraiHumanIniInvUinitRoleRngLikeC() {
    /* KATANA */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_KATANA, false);
    rn2(1);

    /* SHORT_SWORD (wakizashi) */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_SHORT_SWORD, false);
    rn2(1);

    /* YUMI */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_YUMI, false);
    rn2(1);

    /* YA — first **`trquan`** then adjust stack from second **`trquan`** */
    26 + rn2(20);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_YA, false);
    game._samuraiIniYaQuan = 26 + rn2(20);

    /* SPLINT_MAIL */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);

    /* C **`u_init_role`**: **`if (!rn2(5)) ini_inv(Blindfold)`** after **`Samurai[]`**. */
    game._samuraiIniBlindfold = consumeIniInvBlindfoldLeafRngIfGateLikeC();
}

/**
 * C: u_init.c **`PM_KNIGHT`** **`ini_inv(Knight[])`** for human (no **`Lamp`** / blindfold after pack).
 * Apples/carrots: per-obj **`mksobj`** (**`next_ident`** + default FOOD **`!rn2(6)`** stack quan); entering APPLE/CARROT **`quan = 10 + rn2(1)`** each.
 */
export function consumeKnightHumanIniInvUinitRoleRngLikeC() {
    /* LONG_SWORD +1 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_LONG_SWORD_MK, false);
    rn2(1);

    /* LANCE +1 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_LANCE_MK, false);
    rn2(1);

    /* RING_MAIL +1 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    /* HELMET +0 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    /* SMALL_SHIELD +0 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    /* LEATHER_GLOVES +0 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    game._knightIniAppleQuans = [];
    rn2(1);
    for (let i = 0; i < 10; i++) {
        nextIdentLikeC();
        game._knightIniAppleQuans.push(mksobjInitDefaultFoodQuanMaybeDoubleLikeC());
    }

    game._knightIniCarrotQuans = [];
    rn2(1);
    for (let i = 0; i < 10; i++) {
        nextIdentLikeC();
        game._knightIniCarrotQuans.push(mksobjInitDefaultFoodQuanMaybeDoubleLikeC());
    }
}

/**
 * C: u_init.c **`PM_VALKYRIE`** **`ini_inv(Valkyrie[])`** for human + optional **`!rn2(6)`** **`ini_inv(Lamp)`**.
 */
export function consumeValkyrieHumanIniInvUinitRoleRngLikeC() {
    /* SPEAR +1 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_SPEAR_MK, false);
    rn2(1);

    /* DAGGER */
    rn2(1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_DAGGER, false);
    rn2(1);

    /* SMALL_SHIELD +3 */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);

    /* FOOD_RATION */
    rn2(1);
    nextIdentLikeC();
    game._valkyrieIniFoodQuan = mksobjInitFoodRationQuanLikeC();

    /* C: **`if (!rn2(6)) ini_inv(Lamp)`** — oil lamp **`mksobj_init`**. */
    game._valkyrieIniLamp = !rn2(6);
    if (game._valkyrieIniLamp) {
        rn2(1);
        nextIdentLikeC();
        mksobjInitOilLampToolLikeC();
        rn2(1);
    }
}

/** C **`M_spell[]`** order: Healing, Protection, Confuse monster. */
const OTYP_MONK_MSPELL_BOOKS = /** @type {const} */ ([373, 402, 376]);

/**
 * C: u_init.c **`PM_MONK`** **`u_init_role`** — **`ini_inv(Monk[])`**, **`M_spell[rn2(90)/30]`**,
 * **`!rn2(4)`** **`Magicmarker`**, **`else if (!rn2(10))`** **`Lamp`** (human; no race subs).
 */
/** C: `trquan()` when `trquan_min` non-zero — `min + rn2(max - min + 1)`. */
function trquanMinMaxLikeC(min, max) {
    if (!min) return 1;
    return min + rn2(max - min + 1);
}

/**
 * C: u_init.c **`PM_WIZARD`** **`ini_inv(Wizard[])`** for human (no race subs) + **`!rn2(5)`** blindfold.
 * Order: **`trquan`** / **`mksobj`** / **`ini_inv_adjust_obj`** per C **`ini_inv`** + **`ini_inv_mkobj_filter`** gn state.
 */
export function consumeWizardHumanIniInvUinitRoleRngLikeC() {
    const gn = gnIniInvFreshLikeC();

    /* QUARTERSTAFF +1 blessed */
    trquanMinMaxLikeC(1, 1);
    nextIdentLikeC();
    mksobjInitWeaponLikeC(OTYP_QUARTERSTAFF, false);
    rn2(1);

    /* CLOAK_OF_MAGIC_RESISTANCE +0 */
    trquanMinMaxLikeC(1, 1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    /* UNDEF wand */
    trquanMinMaxLikeC(1, 1);
    game._wizardIniWandOtyp = iniInvMkobjFilterWizardHumanLikeC(NH5_WAND_CLASS, false, gn, false);
    iniInvGnAfterUndefAcceptLikeC(NH5_WAND_CLASS, game._wizardIniWandOtyp | 0, gn);
    rn2(1);

    const ringQ = trquanMinMaxLikeC(2, 2);
    game._wizardIniRingQuan = ringQ;
    game._wizardIniRingOtyps = [];
    for (let i = 0; i < ringQ; i++) {
        const ro = iniInvMkobjFilterWizardHumanLikeC(NH5_RING_CLASS, false, gn, false);
        game._wizardIniRingOtyps.push(ro);
        iniInvGnAfterUndefAcceptLikeC(NH5_RING_CLASS, ro, gn);
        rn2(1);
    }

    const potQ = trquanMinMaxLikeC(3, 3);
    game._wizardIniPotionQuan = potQ;
    game._wizardIniPotionOtyps = [];
    for (let i = 0; i < potQ; i++) {
        const po = iniInvMkobjFilterWizardHumanLikeC(NH5_POTION_CLASS, false, gn, false);
        game._wizardIniPotionOtyps.push(po);
        iniInvGnAfterUndefAcceptLikeC(NH5_POTION_CLASS, po, gn);
        rn2(1);
    }

    const scrQ = trquanMinMaxLikeC(3, 3);
    game._wizardIniScrollQuan = scrQ;
    game._wizardIniScrollOtyps = [];
    for (let i = 0; i < scrQ; i++) {
        const so = iniInvMkobjFilterWizardHumanLikeC(NH5_SCROLL_CLASS, false, gn, false);
        game._wizardIniScrollOtyps.push(so);
        iniInvGnAfterUndefAcceptLikeC(NH5_SCROLL_CLASS, so, gn);
        rn2(1);
    }

    /* SPE_FORCE_BOLT — fixed; sets **`got_sp1`** in C before UNDEF spellbook */
    trquanMinMaxLikeC(1, 1);
    nextIdentLikeC();
    mksobjInitSpellbookIniInvLikeC();
    rn2(1);

    /* UNDEF spellbook — `got_level1_spellbook` TRUE */
    trquanMinMaxLikeC(1, 1);
    game._wizardIniSecondSpellbookOtyp = iniInvMkobjFilterWizardHumanLikeC(NH5_SPBOOK_CLASS, true, gn, false);
    iniInvGnAfterUndefAcceptLikeC(NH5_SPBOOK_CLASS, game._wizardIniSecondSpellbookOtyp | 0, gn);
    rn2(1);

    /* MAGIC_MARKER — C: `mksobj_init` **`rn1(70,30)`** then **`ini_inv_adjust_obj`** forces **`spe`** **19** + **`rn2(4)`** */
    trquanMinMaxLikeC(1, 1);
    nextIdentLikeC();
    mksobjInitMagicMarkerSpeRn1LikeC();
    game._wizardIniMagicmarkerSpe = 19 + rn2(4);
    rn2(1);

    game._wizardIniBlindfold = consumeIniInvBlindfoldLeafRngIfGateLikeC();
}

export function consumeMonkHumanIniInvUinitRoleRngLikeC() {
    /* `quan = trquan` — gloves `1+rn2(1)` */
    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    rn2(1);
    nextIdentLikeC();
    mksobjInitArmorLikeC(false);
    rn2(1);

    /* UNDEF scroll row: `quan = trquan` then mkobj filter */
    rn2(1);
    game._monkIniUndefScrollOtyp = iniInvMkobjFilterScrollClassMonkLikeC();

    const pq = 3 + rn2(1);
    game._monkIniPotionHealingQuan = pq;
    for (let i = 0; i < pq; i++) {
        nextIdentLikeC();
        mksobjInitPotionLikeC();
        rn2(1);
    }

    const rq = 3 + rn2(1);
    game._monkIniFoodRationQuan = rq;
    for (let i = 0; i < rq; i++) {
        nextIdentLikeC();
        mksobjInitFoodRationQuanLikeC();
        rn2(1);
    }

    const aq = 5 + rn2(1);
    game._monkIniAppleQuan = aq;
    for (let i = 0; i < aq; i++) {
        nextIdentLikeC();
        mksobjInitDefaultFoodQuanMaybeDoubleLikeC();
    }

    const oq = 5 + rn2(1);
    game._monkIniOrangeQuan = oq;
    for (let i = 0; i < oq; i++) {
        nextIdentLikeC();
        mksobjInitDefaultFoodQuanMaybeDoubleLikeC();
    }

    const fq = 3 + rn2(1);
    game._monkIniFortuneCookieQuan = fq;
    for (let i = 0; i < fq; i++) {
        nextIdentLikeC();
        mksobjInitDefaultFoodQuanMaybeDoubleLikeC();
    }

    /* C: `ini_inv(M_spell[rn2(90) / 30])` — **`rn2(90)`** before spell row **`trquan`**. */
    const spIdx = (rn2(90) / 30) | 0;
    game._monkIniMspellIdx = spIdx;
    const speOtyp = OTYP_MONK_MSPELL_BOOKS[spIdx] ?? OTYP_MONK_MSPELL_BOOKS[0];
    game._monkIniMspellSpeOtyp = speOtyp;
    rn2(1);
    nextIdentLikeC();
    mksobjInitSpellbookIniInvLikeC();
    rn2(1);

    game._monkIniMagicmarker = !rn2(4);
    if (game._monkIniMagicmarker) {
        rn2(1);
        nextIdentLikeC();
        mksobjInitMagicMarkerSpeRn1LikeC();
        game._monkIniMagicmarkerSpe = 19 + rn2(4);
        rn2(1);
    } else {
        game._monkIniLamp = !rn2(10);
        if (game._monkIniLamp) {
            rn2(1);
            nextIdentLikeC();
            mksobjInitOilLampToolLikeC();
            rn2(1);
        }
    }
}
