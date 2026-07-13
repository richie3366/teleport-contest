// steed.js — Saddle / riding helpers.
// C ref: steed.c — can_saddle, put_saddle_on_mon (doride/mount deferred).

import { mksobj } from './mkobj.js';
import { makeknown } from './invent.js';
import {
    humanoid, noncorporeal, M1_AMORPHOUS, MZ_MEDIUM,
} from './monsters.js';
import { W_SADDLE } from './const.js';
import { objectNames } from './objects.js';

const SADDLE = objectNames.indexOf('SADDLE');

/** C steed.c steeds[] — mlets that may wear a saddle. */
const STEED_MLETS = new Set([
    'S_QUADRUPED', 'S_UNICORN', 'S_ANGEL', 'S_CENTAUR', 'S_DRAGON', 'S_JABBERWOCK',
]);

/** C ref: steed.c can_saddle — whirly/unsolid omitted (always false for steeds). */
export function can_saddle(mtmp) {
    const ptr = mtmp?.data;
    if (!ptr) return false;
    if (!STEED_MLETS.has(ptr.mlet)) return false;
    if ((ptr.msize ?? 0) < MZ_MEDIUM) return false;
    if (humanoid(ptr) && ptr.mlet !== 'S_CENTAUR') return false;
    if ((ptr.mflags1 ?? 0) & M1_AMORPHOUS) return false;
    if (noncorporeal(ptr)) return false;
    return true;
}

/** C ref: worn.c which_armor(W_SADDLE) — scan minvent owornmask. */
function which_armor_saddle(mtmp) {
    for (let o = mtmp.minvent; o; o = o.nobj) {
        if ((o.owornmask || 0) & W_SADDLE) return o;
    }
    return null;
}

/**
 * C ref: identify.c fully_identify_obj — known flags only (no RNG).
 * oerodeproof / oname / ckowned deferred.
 */
function fully_identify_obj(obj) {
    if (!obj) return;
    makeknown(obj.otyp);
    obj.known = 1;
    obj.bknown = 1;
    obj.dknown = 1;
    obj.rknown = 1;
}

/** Local mpickobj — avoid makemon↔steed import cycle; saddles never merge. */
function pick_saddle(mtmp, otmp) {
    otmp.nobj = mtmp.minvent || null;
    mtmp.minvent = otmp;
    return false; // not merged
}

/**
 * C ref: steed.c put_saddle_on_mon.
 * NULL saddle → mksobj(SADDLE, TRUE, FALSE) then identify + wear.
 * update_mon_extrinsics deferred (no RNG for ordinary saddle).
 */
export function put_saddle_on_mon(saddle, mtmp) {
    if (!can_saddle(mtmp) || which_armor_saddle(mtmp)) {
        return;
    }
    if (!saddle) {
        saddle = mksobj(SADDLE, true, false);
        if (!saddle) return;
        fully_identify_obj(saddle);
    }
    if (pick_saddle(mtmp, saddle)) {
        return;
    }
    mtmp.misc_worn_check = (mtmp.misc_worn_check || 0) | W_SADDLE;
    saddle.owornmask = W_SADDLE;
    saddle.leashmon = mtmp.m_id;
}
