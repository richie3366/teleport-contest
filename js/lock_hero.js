// lock_hero.js — lock.c picklock() on a floor container: **`pick_lock`** **`ch`** + occupation **`rn2(100)`** loop; success tail.
// C ref: lock.c pick_lock() (floor **`Is_box`**: **`ch`** from **`picktyp`**, **`otmp->cursed`** halves); picklock() **`usedtime`/`rn2(100)`**;
//        **`is_magic_key`** + trapped box — **`chance += 20`**, **`tknown`**, **`y_n`** disarm (**`artifact.c`** **`is_magic_key`**);
//        success — **`olocked`**, **`lknown`**, **`chest_trap(..., FINGER, FALSE)`**, **`exercise(A_DEX, TRUE)`**; **`lock_action()`** phrasing.
// Omits door **`pick_lock`**, real multi-turn **`set_occupation`**.

import { pline, flush_screen } from './display.js';
import { nhgetch } from './input.js';
import { acurr, exercise } from './attrib.js';
import { A_DEX, A_WIS } from './const.js';
import { rn2 } from './rng.js';
import { raceptr } from './mondata.js';
import { nohandsPermonstLikeC } from './hero_hands.js';
import { chestTrapHeroLikeC } from './trap.js';

/** @see water_damage.js / objects.h — CHEST 216; SKELETON_KEY / LOCK_PICK / CREDIT_CARD 222–224. */
const OTYP_CHEST = 216;
const OTYP_SKELETON_KEY = 222;
const OTYP_LOCK_PICK = 223;
const OTYP_CREDIT_CARD = 224;

/** C: artilist.h / **`arti_enum`** — **`ART_MASTER_KEY_OF_THIEVERY`** (**`oartifact`** index). */
const ART_MASTER_KEY_OF_THIEVERY = 30;

/**
 * C: artifact.c **`is_magic_key(&youmonst, obj)`** — Master Key: rogue + non-cursed, else blessed.
 * @param {import('./gstate.js').game} g
 * @param {{ oartifact?: number, blessed?: number, cursed?: number }|null|undefined} obj
 */
export function isMagicKeyHeroToolLikeC(g, obj) {
    if (!obj || (obj.oartifact | 0) !== ART_MASTER_KEY_OF_THIEVERY) return false;
    const rogue = g?.urole?.abbr === 'Rog';
    if (rogue) return (obj.cursed | 0) === 0;
    return (obj.blessed | 0) !== 0;
}

/** C: lock.c `lock_action()` — locked box + unlock attempt: pick/card → **`picking the lock`**, else chest/box unlock strings. */
export function lockActionPhrasePicklockBoxUnlockLikeC(box, pickOtyp) {
    const p = pickOtyp | 0;
    if (p === OTYP_LOCK_PICK || p === OTYP_CREDIT_CARD) return 'picking the lock';
    if ((box?.otyp | 0) === OTYP_CHEST) return 'unlocking the chest';
    return 'unlocking the box';
}

/**
 * C: lock.c `autokey()`-style first choice — own key beats pick beats card (no quest-artifact nuance).
 * @returns {object|null}
 */
export function heroFirstLockToolObjLikeC(g) {
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
    return key || pick || card || null;
}

/**
 * @returns {number|null} otyp of chosen tool, or null
 */
export function heroFirstLockToolOtypLikeC(g) {
    const tool = heroFirstLockToolObjLikeC(g);
    return tool ? tool.otyp | 0 : null;
}

/**
 * C: lock.c **`pick_lock()`** at hero feet — **`switch (picktyp)`** **`ch`** for **`Is_box`**, **`otmp->cursed`** halves.
 * @param {import('./gstate.js').game} g
 * @param {{ cursed?: number, otyp?: number }} box
 * @param {number} pickOtyp
 * @returns {number}
 */
export function picklockFloorBoxChanceHeroLikeC(g, box, pickOtyp) {
    const dex = acurr(A_DEX) | 0;
    const rogue = g?.urole?.abbr === 'Rog' ? 1 : 0;
    const p = pickOtyp | 0;
    let ch = 0;
    if (p === OTYP_CREDIT_CARD) ch = dex + 20 * rogue;
    else if (p === OTYP_LOCK_PICK) ch = 4 * dex + 25 * rogue;
    else if (p === OTYP_SKELETON_KEY) ch = 75 + dex;
    if (box && (box.cursed | 0)) ch = Math.trunc(ch / 2);
    return ch + (box?._picklockChanceBonus | 0);
}

/**
 * C: lock.c **`picklock()`** occupation — **`usedtime++ >= 50 || nohands`**, then **`rn2(100) >= chance`** busy; else success tail
 * (including **`is_magic_key`** + **`otrapped`** **`y_n`** branch before normal unlock).
 * @param {import('./gstate.js').game} g
 * @param {object} box
 * @returns {Promise<'success'|'gave_up'|'disarmed_trap'|'stopped_at_trap'|null>}
 */
export async function tryPicklockFloorBoxOccupationRngHeroLikeC(g, box) {
    if (!box) return null;
    const pickObj = heroFirstLockToolObjLikeC(g);
    if (!pickObj) return null;
    const pickOtyp = pickObj.otyp | 0;
    let chance = picklockFloorBoxChanceHeroLikeC(g, box, pickOtyp);
    const phrase = lockActionPhrasePicklockBoxUnlockLikeC(box, pickOtyp);
    const ptr = raceptr(g.youmonst);
    let usedtime = 0;
    for (;;) {
        const idx = usedtime++;
        if (idx >= 50 || nohandsPermonstLikeC(ptr)) {
            await pline(`You give up your attempt at ${phrase}.`);
            exercise(A_DEX, true);
            return 'gave_up';
        }
        if (rn2(100) >= chance) continue;
        if ((box.otrapped | 0) && isMagicKeyHeroToolLikeC(g, pickObj)) {
            box._picklockChanceBonus = (box._picklockChanceBonus | 0) + 20;
            chance += 20;
            if (!(box.tknown | 0)) await pline('You find a trap!');
            box.tknown = 1;
            await pline('Do you want to try to disarm it? [yn]');
            await flush_screen(1);
            const ans = await nhgetch();
            const yes = ans === 121 || ans === 89;
            if (yes) {
                box.otrapped = 0;
                box.tknown = 0;
                const what = (box.otyp | 0) === OTYP_CHEST ? 'chest' : 'box';
                const alreadyUnlocked = !(box.olocked | 0);
                await pline(
                    `You succeed in disarming the trap.  The ${what} is still ${alreadyUnlocked ? 'un' : ''}locked.`,
                );
                exercise(A_WIS, true);
                return 'disarmed_trap';
            }
            await pline(`You stop ${phrase}.`);
            exercise(A_WIS, false);
            return 'stopped_at_trap';
        }
        await applyPicklockSucceededOnFloorBoxHeroLikeC(g, box, pickOtyp);
        return 'success';
    }
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
