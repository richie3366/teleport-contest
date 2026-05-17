// u_init_role_rng.js — C u_init.c / mkobj.c leaf RNG for role inventory (narrow port).
// Used while ini_inv is still stubbed so ISAAC matches upstream before init_attr(75).
// C refs: u_init.c u_init_role (PM_ROGUE / PM_SAMURAI / PM_VALKYRIE), ini_inv(), trquan(), mkobj.c mksobj+mksobj_init,
//         mkbox_cnts (SACK empty at moves<=1), blessorcurse().

import { game } from './gstate.js';
import { rnd, rn2, rne, rn1 } from './rng.js';
import { OTYP_LEATHER_ARMOR, P_BOW, P_SHURIKEN } from './const.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';

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
const OTYP_SACK = 216;
const OTYP_LOCK_PICK = 221;
const OTYP_POT_SICKNESS = 317;

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

/** C: mkobj.c mksobj_init — SACK → mkbox_cnts; moves<=1 && !in_mklev → n=0 → for (n = rn2(1); …) */
function mksobjInitSackStartInvLikeC() {
    rn2(1);
}

/** C: mkobj.c FOOD_RATION path — after switch, **`!rn2(6)`** doubles **`quan`** to **2**. */
function mksobjInitFoodRationQuanLikeC() {
    return !rn2(6) ? 2 : 1;
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
