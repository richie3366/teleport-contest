// wear.js — Side effects of worn equipment.
// C ref: do_wear.c set_wear()

import { game } from './gstate.js';

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
    g._wearInitialDon = false;
}
