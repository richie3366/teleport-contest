// wear.js — Side effects of worn equipment.
// C ref: do_wear.c set_wear(), prop.c extrinsic masks (subset: EProtection ring hands).

import { game } from './gstate.js';
import { OTYP_RIN_PROTECTION, W_RINGL, W_RINGR } from './const.js';

const _RING_PROT_MASK = W_RINGL | W_RINGR;

/**
 * C: prop.c — ring of protection on each hand sets W_RINGL / W_RINGR in EProtection
 * (eat.c gethungry cases 4/12 use this for duplicate +0 protection ring hunger).
 * Other EProtection sources (cloak, …) are not ported; preserve their bits if ever set.
 */
export function refreshEProtectionFromRings() {
    const u = game.u;
    if (!u) return;
    const base = (u.EProtection | 0) & ~_RING_PROT_MASK;
    let rings = 0;
    if (u.uleft && (u.uleft.otyp | 0) === OTYP_RIN_PROTECTION) rings |= W_RINGL;
    if (u.uright && (u.uright.otyp | 0) === OTYP_RIN_PROTECTION) rings |= W_RINGR;
    u.EProtection = base | rings;
}

/**
 * C: set_wear(obj) — if obj is null, refresh all worn slots; else only that obj.
 * gi.initial_don is mirrored as _wearInitialDon until Blindf_on / Ring_on / … exist.
 */
export function setWear(obj) {
    const g = game;
    g._wearInitialDon = !obj;
    if (!obj) {
        /* When ublindf, uright, uarm, … are real obj pointers, call the *_on helpers. */
    }
    refreshEProtectionFromRings();
    g._wearInitialDon = false;
}
