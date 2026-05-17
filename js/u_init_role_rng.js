// u_init_role_rng.js — C u_init.c / mkobj.c leaf RNG for role inventory (narrow port).
// Used while ini_inv is still stubbed so ISAAC matches upstream before init_attr(75).
// C refs: u_init.c u_init_role (PM_ROGUE), ini_inv(), trquan(), mkobj.c mksobj+mksobj_init,
//         mkbox_cnts (SACK empty at moves<=1), blessorcurse().

import { game } from './gstate.js';
import { rnd, rn2, rne } from './rng.js';
import { P_BOW, P_SHURIKEN } from './const.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';

/** C objects_nums — OBJECTS_ENUM (nethack-c/upstream/include/objects.h). */
const OTYP_DAGGER = 34;
const OTYP_SHORT_SWORD = 46;
const OTYP_LEATHER_ARMOR = 134;
const OTYP_SACK = 217;
const OTYP_LOCK_PICK = 222;
const OTYP_POT_SICKNESS = 318;

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

    /* C u_init.c u_init_role — if (!rn2(5)) ini_inv(Blindfold); */
    rn2(5);
}
