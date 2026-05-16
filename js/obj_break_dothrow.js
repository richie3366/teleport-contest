// obj_break_dothrow.js — dothrow.c breaktest / breakmsg / breaks() subset for dokick.c obj_delivery().
// C ref: dothrow.c breaktest(), breakmsg(), breaks(); potion.c potionbreathe() (**deferred** for vapors).

import { rn2 } from './rng.js';
import { pline, newsym } from './display.js';
import { cansee } from './vision.js';
import { objResists } from './obj_resists.js';
import { NH5_POTION_CLASS, NH5_ARMOR_CLASS, NH5_GEM_CLASS } from './nh5_objclass.js';
import { obliterateObjectInLevel } from './floorobj.js';
import { doname } from './objnam.js';
import { distmin } from './hacklib.js';

/** C: objects.h enum via **`OBJECTS_ENUM`** preprocessor dump (NH 5.0). */
const OTYP_EXPENSIVE_CAMERA = 229;
const OTYP_MIRROR = 230;
const OTYP_CRYSTAL_BALL = 231;
const OTYP_LENSES = 232;
const OTYP_EGG = 266;
const OTYP_MELON = 280;
const OTYP_CREAM_PIE = 287;
const OTYP_POT_WATER = 322;
const OTYP_BLINDING_VENOM = 478;
const OTYP_ACID_VENOM = 479;

const OC_GLASS = 19;

/**
 * C: dothrow.c **`breaktest(obj)`**.
 * @param {import('./gstate.js').game} g
 * @param {{ otyp?: number, oclass?: number, oartifact?: number, oc_material?: number, oc_crackable?: number }} obj
 * @returns {boolean}
 */
export function breaktestLikeC(g, obj) {
    void g;
    if (!obj) return false;
    let nonbreakchance = 1;
    if ((obj.oclass | 0) === NH5_ARMOR_CLASS && (obj.oc_material | 0) === OC_GLASS) {
        nonbreakchance = 90;
    }
    if (objResists(obj, nonbreakchance, 99)) return false;
    if (
        (obj.oc_material | 0) === OC_GLASS
        && !(obj.oartifact | 0)
        && (obj.oclass | 0) !== NH5_GEM_CLASS
    ) {
        return true;
    }
    const disc = (obj.oclass | 0) === NH5_POTION_CLASS ? OTYP_POT_WATER : obj.otyp | 0;
    switch (disc) {
        case OTYP_EXPENSIVE_CAMERA:
        case OTYP_POT_WATER:
        case OTYP_EGG:
        case OTYP_CREAM_PIE:
        case OTYP_MELON:
        case OTYP_ACID_VENOM:
        case OTYP_BLINDING_VENOM:
            return true;
        default:
            return false;
    }
}

function heroBlindLikeC(g) {
    const u = g.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

function next2uLikeC(g, x, y) {
    const u = g.u;
    if (!u) return false;
    return distmin(u.ux | 0, u.uy | 0, x | 0, y | 0) <= 1;
}

/**
 * C: dothrow.c **`breakmsg(obj, in_view)`** — subset (**`is_crackable`** early-out; **`Wand`** default impossible omitted).
 * @param {import('./gstate.js').game} g
 * @param {object} obj
 * @param {boolean} inView
 */
export async function breakmsgObjDeliveryLikeC(g, obj, inView) {
    if (obj?.oc_crackable) return;

    const disc = (obj.oclass | 0) === NH5_POTION_CLASS ? OTYP_POT_WATER : obj.otyp | 0;
    let toPieces = '';
    switch (disc) {
        case OTYP_LENSES:
        case OTYP_MIRROR:
        case OTYP_CRYSTAL_BALL:
        case OTYP_EXPENSIVE_CAMERA:
            toPieces = ' into a thousand pieces';
        // fallthrough
        case OTYP_POT_WATER:
            if (!inView) await pline('You hear something shatter!');
            else await pline(`${doname(obj, g)} shatter${(obj.quan | 0) === 1 ? 's' : ''}${toPieces}!`);
            break;
        case OTYP_EGG:
        case OTYP_MELON:
            await pline('Splat!');
            break;
        case OTYP_CREAM_PIE:
            if (inView) await pline('What a mess!');
            break;
        case OTYP_ACID_VENOM:
        case OTYP_BLINDING_VENOM:
            await pline('Splash!');
            break;
        default:
            break;
    }
}

/**
 * C: dothrow.c **`release_camera_demon`** — **`rn2(3)`** + **`rn2(3)?…:…`** makemon (**subset**: RNG only).
 */
function releaseCameraDemonRngLikeC() {
    if (rn2(3)) return;
    void rn2(3);
}

/**
 * C: dothrow.c **`breaks(obj, x, y)`** — hero sees breakage; **`breakobj`** subset (**no** full **`potionbreathe`** / shop **`stolen_value`** tail).
 * @returns {Promise<boolean>} true if object destroyed
 */
export async function breaksObjDeliveryLikeC(g, obj, x, y) {
    if (!breaktestLikeC(g, obj)) return false;
    const inView = !heroBlindLikeC(g) && cansee(x | 0, y | 0);
    await breakmsgObjDeliveryLikeC(g, obj, inView);
    const disc = (obj.oclass | 0) === NH5_POTION_CLASS ? OTYP_POT_WATER : obj.otyp | 0;
    if (disc === OTYP_EXPENSIVE_CAMERA) releaseCameraDemonRngLikeC();
    if (disc === OTYP_POT_WATER && next2uLikeC(g, x, y)) {
        /* C: potion.c **`potionbreathe`** — deferred; vapors would alter hero + **`makeknown`/`trycall`**. */
    }
    obliterateObjectInLevel(g, obj);
    newsym(x | 0, y | 0);
    return true;
}
