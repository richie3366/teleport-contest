// mkobj_corpse.js — Floor corpse drops (minimal mkobj.c parity).
// C ref: mkobj.c mksobj (next_ident) + place_object; mon.c make_corpse.
// Caller should skip when mondata.monsterLeavesCorpse is false (G_NOCORPSE / mvitals).

import { rnd } from './rng.js';
import { placeFloorObject } from './floorobj.js';
import { NH5_FOOD_CLASS } from './nh5_objclass.js';

/** NH5 objects_nums corpse otyp (matches mklev.js CORPSE). */
const CORPSE_OTYP = 471;

/**
 * Place a single corpse on the floor like mksobj(CORPSE) + place_object.
 * Consumes one `rnd(2)` draw (C `next_ident`) when creating the stack.
 * @param {{ mnum?: number, data?: { mnum?: number } }} mtmp
 */
export function placeCorpseForMonster(mtmp, x, y) {
    rnd(2);
    const corpsenm = (mtmp?.mnum ?? mtmp?.data?.mnum ?? 0) | 0;
    const otmp = {
        otyp: CORPSE_OTYP,
        oclass: NH5_FOOD_CLASS,
        ox: -1,
        oy: -1,
        quan: 1,
        owt: 1,
        cursed: false,
        blessed: false,
        olocked: false,
        spe: 0,
        corpsenm,
    };
    placeFloorObject(otmp, x, y);
    return otmp;
}
