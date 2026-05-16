// lock_hero.js — lock.c picklock() success on a floor container (harness; no occupation / rn2(100)).
// C ref: lock.c picklock() box branch after success — **`olocked`**, **`lknown`**, **`chest_trap(..., FINGER, FALSE)`**, **`exercise(A_DEX, TRUE)`**; **`lock_action()`** phrasing.

import { pline } from './display.js';
import { exercise } from './attrib.js';
import { A_DEX } from './const.js';
import { chestTrapHeroLikeC } from './trap.js';

/** @see water_damage.js / objects.h — CHEST 216; SKELETON_KEY / LOCK_PICK / CREDIT_CARD 222–224. */
const OTYP_CHEST = 216;
const OTYP_SKELETON_KEY = 222;
const OTYP_LOCK_PICK = 223;
const OTYP_CREDIT_CARD = 224;

/** C: lock.c `lock_action()` — locked box + unlock attempt: pick/card → **`picking the lock`**, else chest/box unlock strings. */
export function lockActionPhrasePicklockBoxUnlockLikeC(box, pickOtyp) {
    const p = pickOtyp | 0;
    if (p === OTYP_LOCK_PICK || p === OTYP_CREDIT_CARD) return 'picking the lock';
    if ((box?.otyp | 0) === OTYP_CHEST) return 'unlocking the chest';
    return 'unlocking the box';
}

/**
 * C: lock.c `autokey()`-style first choice — own key beats pick beats card (no quest-artifact nuance).
 * @returns {number|null} otyp of chosen tool, or null
 */
export function heroFirstLockToolOtypLikeC(g) {
    let key = null;
    let pick = null;
    let card = null;
    for (let o = g.invent; o; o = o.nobj) {
        const t = o.otyp | 0;
        if (t === OTYP_SKELETON_KEY) {
            if (!key) key = o;
        } else if (t === OTYP_LOCK_PICK) {
            if (!pick) pick = o;
        } else if (t === OTYP_CREDIT_CARD) {
            if (!card) card = o;
        }
    }
    const tool = key || pick || card;
    return tool ? tool.otyp | 0 : null;
}

/**
 * C: lock.c picklock() — **`You("succeed in %s.", lock_action())`**, **`box->olocked = !olocked`**, **`lknown = 1`**, **`if (otrapped) chest_trap(box, FINGER, FALSE)`**, **`exercise(A_DEX, TRUE)`**.
 * @param {import('./gstate.js').game} g
 * @param {object} box — floor container (**`Is_box`** subset: **`isContainerOtyp`** in JS)
 * @param {number} pickOtyp — tool **`otyp`** for **`lock_action()`** phrase only
 */
export async function applyPicklockSucceededOnFloorBoxHeroLikeC(g, box, pickOtyp) {
    if (!box) return;
    const phrase = lockActionPhrasePicklockBoxUnlockLikeC(box, pickOtyp);
    await pline(`You succeed in ${phrase}.`);
    box.olocked = (box.olocked | 0) ? 0 : 1;
    box.lknown = 1;
    if (box.otrapped | 0) {
        await chestTrapHeroLikeC(g, box, 3, false);
    }
    exercise(A_DEX, true);
}
