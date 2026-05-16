// hold_another_hero.js — invent.c hold_another_object + ball.c litter (hitfloor callers).
// C ref: invent.c hold_another_object(); ball.c litter() → dothrow.c hitfloor(obj, FALSE);
//
// Omits **`observe_object`**, **`touch_artifact`** / crysknife / **`Upolyd`** revert, corpse **`wishedfor`** /
// **`u_safe_from_fatal_corpse`**, **`autoquiver`**, **`splitobj`** merge undo, **`prinv`/`xprname`**,
// full **`canletgo`** (welded uwep, bimanual), **`setnotworn`** side effects beyond **`remove_worn_item`** subset.

import { pline } from './display.js';
import { doname } from './objnam.js';
import { removeObjFromHeroInvent } from './water_damage.js';
import { dropxHeroAfterFreeinvLikeC, hitfloorHeroLikeC } from './hitfloor_hero.js';
import { canReachFloor } from './engrave.js';
import { updateInventory } from './invent.js';
import { encumberMsg } from './pickup.js';
import { rnd } from './rng.js';
import {
    calcCapacityXtraWtLikeC,
    nearCapacity,
    syncHeroInvWeightNetLikeC,
} from './encumbr.js';
import { MOD_ENCUMBER, W_ACCESSORY, W_ARMOR, W_SADDLE } from './const.js';
import { NH5_COIN_CLASS } from './nh5_objclass.js';
import { removeWornItemHeroShipObjectLikeC } from './remove_worn_item_hero.js';

/** C: hack.h **`invlet_basic`** (52). */
const INVLET_BASIC = 52;

/** C: objects.h **`LOADSTONE`**. */
const OTYP_LOADSTONE = 471;
/** C: objects.h **`LEASH`**. */
const OTYP_LEASH = 237;

/**
 * C: hack.c **`inv_cnt(boolean incl_gold)`** — JS uses **`oclass`** coin vs C **`invlet != GOLD_SYM`**.
 * @param {import('./gstate.js').game} g
 * @param {boolean} inclGold
 */
export function invCntHeroLikeC(g, inclGold) {
    let ct = 0;
    for (let o = g.invent; o; o = o.nobj) {
        if (inclGold || (o.oclass | 0) !== NH5_COIN_CLASS) ct++;
    }
    return ct;
}

/** C: **`flag.h`** **`pickup_burden`** default stressed (**`MOD_ENCUMBER`**). */
function pickupBurdenHeroLikeC(g) {
    const p = g.iflags?.pickup_burden;
    return p != null && p !== undefined ? p | 0 : MOD_ENCUMBER;
}

function prependHeroInventLikeC(g, obj) {
    obj.nobj = g.invent ?? null;
    g.invent = obj;
}

/**
 * C: **`do.c`** **`canletgo(struct obj *obj, const char *word)`** — subset (**`word`** non-empty
 * plines mostly omitted until **`Norep`** / body parts ported).
 * @param {import('./gstate.js').game} g
 * @param {*} obj
 * @param {string} word
 */
export function canletgoHeroLikeC(g, obj, word) {
    void word;
    const wm = obj.owornmask | 0;
    if (wm & (W_ARMOR | W_ACCESSORY)) return false;
    /* C: **`uwep` + `welded`** — not ported; no extra block */
    if ((obj.otyp | 0) === OTYP_LOADSTONE && (obj.cursed | 0)) return false;
    if ((obj.otyp | 0) === OTYP_LEASH && (obj.leashmon | 0)) return false;
    if (wm & W_SADDLE) return false;
    return true;
}

function formatDropFmtLikeC(fmt, arg) {
    if (!fmt) return '';
    if (arg != null && arg !== '' && fmt.includes('%s')) return fmt.replace('%s', String(arg));
    return String(fmt);
}

/**
 * C: **`invent.c`** **`hold_another_object`** **`drop_it`** (**`dropx`** vs **`freeinv`+`hitfloor`**).
 * @param {import('./gstate.js').game} g
 * @param {*} obj — must **not** already be in **`g.invent`** (caller **`obj_extract_self`**’s first).
 * @param {string|null|undefined} dropFmt
 * @param {string|null|undefined} dropArg
 */
async function dropItHoldAnotherLikeC(g, obj, dropFmt, dropArg) {
    if (dropFmt) await pline(formatDropFmtLikeC(dropFmt, dropArg));
    obj.nomerge = 0;
    const u = g.u;
    const swallow = (u?.uswallow | 0) !== 0;
    if (canReachFloor(false) || swallow) {
        removeObjFromHeroInvent(g, obj);
        syncHeroInvWeightNetLikeC(g);
        await dropxHeroAfterFreeinvLikeC(g, obj);
    } else {
        removeObjFromHeroInvent(g, obj);
        syncHeroInvWeightNetLikeC(g);
        await hitfloorHeroLikeC(g, obj, false);
    }
}

/**
 * C: **`invent.c`** **`hold_another_object()`** — fumble / slot / encumbrance vs **`pickup_burden`**;
 * **`drop_it`** → **`dropx`** or **`hitfloor(FALSE)`**.
 * @param {import('./gstate.js').game} g
 * @param {*} obj — not yet in hero invent
 * @param {string|null|undefined} dropFmt
 * @param {string|null|undefined} dropArg
 * @param {string|null|undefined} holdMsg
 * @returns {Promise<*>} **`obj`** if held, **`null`** if dropped (**`drop_it`**)
 */
export async function holdAnotherObjectHeroLikeC(g, obj, dropFmt, dropArg, holdMsg) {
    if (!g?.u || !obj) return null;

    let dropArgUse = dropArg;
    if (dropArgUse) dropArgUse = String(dropArgUse);

    if ((g.u.Fumbling | 0) !== 0) {
        obj.nomerge = 1;
        prependHeroInventLikeC(g, obj);
        syncHeroInvWeightNetLikeC(g);
        await dropItHoldAnotherLikeC(g, obj, dropFmt, dropArgUse);
        return null;
    }

    const wc = g.u.weight_cap | 0;
    if (wc > 1) syncHeroInvWeightNetLikeC(g);
    const prevEnc = Math.max(
        wc > 1 ? calcCapacityXtraWtLikeC(g, 0) : nearCapacity(g),
        pickupBurdenHeroLikeC(g),
    );

    prependHeroInventLikeC(g, obj);
    syncHeroInvWeightNetLikeC(g);

    const tooMany = invCntHeroLikeC(g, false) > INVLET_BASIC;
    const loadstoneCursed = (obj.otyp | 0) === OTYP_LOADSTONE && (obj.cursed | 0) !== 0;
    const encWorse =
        !loadstoneCursed
        && wc > 1
        && calcCapacityXtraWtLikeC(g, 0) > prevEnc;

    if (tooMany || encWorse) {
        await dropItHoldAnotherLikeC(g, obj, dropFmt, dropArgUse);
        return null;
    }

    obj.nomerge = 0;
    if (holdMsg || dropFmt) {
        const p = holdMsg ? (String(holdMsg).endsWith(':') ? `${holdMsg} ` : `${holdMsg} `) : '';
        await pline(`${p}${doname(obj, g)}`);
    }
    updateInventory();
    syncHeroInvWeightNetLikeC(g);
    await encumberMsg();
    return obj;
}

/**
 * C: **`ball.c`** **`litter()`** — iron ball drag: random inventory loss → **`hitfloor(obj, FALSE)`**.
 * Call only when **`drag_down`**-style context already decided (**`rnd(capacity) <= owt`**, **`canletgo`**).
 * @param {import('./gstate.js').game} g
 */
export async function litterHeroBallChainDragDownLikeC(g) {
    const u = g?.u;
    if (!u) return;
    const uball = g.uball;
    const cap = Math.max(1, u.weight_cap | 0);
    /** @type {unknown[]} */
    const objs = [];
    for (let o = g.invent; o; o = o.nobj) objs.push(o);
    for (const otmp of objs) {
        if (!otmp || otmp === uball) continue;
        if (rnd(cap) > (otmp.owt | 0)) continue;
        if (!canletgoHeroLikeC(g, otmp, '')) continue;
        const q = otmp.quan | 0;
        const subj = q === 1 ? 'it' : 'they';
        const v = q === 1 ? 'falls' : 'fall';
        await pline(`You drop ${doname(otmp, g)} and ${subj} ${v} down the stairs with you.`);
        removeWornItemHeroShipObjectLikeC(g, otmp, false);
        removeObjFromHeroInvent(g, otmp);
        syncHeroInvWeightNetLikeC(g);
        await hitfloorHeroLikeC(g, otmp, false);
    }
}
