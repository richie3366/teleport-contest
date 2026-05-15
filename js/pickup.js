// pickup.js — Autopickup, encumbrance messages, pickup_prev flags.
// C ref: pickup.c reset_justpicked(), encumber_msg(), pickup(), check_here(); hack.c near_capacity via encumbr.js

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { stagger, raceptr } from './mondata.js';
import { nearCapacity } from './encumbr.js';
import { OBJ_AT, IS_POOL, IS_LAVA, is_pit } from './const.js';
import { readEngrAt, canReachFloor } from './engrave.js';
import { describeDecor, levlTypAt, dfeatureAt, an } from './decor.js';
import { doname } from './objnam.js';
import { tAt } from './search.js';

/** C: reset_justpicked(olist) — clear pickup_prev on each object in the chain. */
export function resetJustPicked(olist) {
    const list = olist ?? game.invent;
    if (!list) return;
    for (let o = list; o; o = o.nobj) o.pickup_prev = 0;
}

/**
 * C: raceptr(&youmonst) for encumber_msg stagger(..., 'stagger').
 * @returns {import('./mondata.js').Permonst}
 */
function encumberStaggerPtr() {
    return raceptr(game.youmonst);
}

/**
 * C: encumber_msg() — pline when near_capacity() crosses go.oldcap.
 */
export async function encumberMsg() {
    const g = game;
    const newcap = nearCapacity();
    const old = g._encumberOldCap ?? 0;

    if (old < newcap) {
        switch (newcap) {
        case 1:
            await pline('Your movements are slowed slightly because of your load.');
            break;
        case 2:
            await pline('You rebalance your load.  Movement is difficult.');
            break;
        case 3:
            await pline(`You ${stagger(encumberStaggerPtr(), 'stagger')} under your heavy load.  Movement is very hard.`);
            break;
        default:
            await pline(
                newcap === 4
                    ? 'You can barely move a handspan with this load!'
                    : "You can't even move a handspan with this load!",
            );
            break;
        }
        g.disp = g.disp || {};
        g.disp.botl = true;
    } else if (old > newcap) {
        switch (newcap) {
        case 0:
            await pline('Your movements are now unencumbered.');
            break;
        case 1:
            await pline('Your movements are only slowed slightly by your load.');
            break;
        case 2:
            await pline('You rebalance your load.  Movement is still difficult.');
            break;
        case 3:
            await pline(`You ${stagger(encumberStaggerPtr(), 'stagger')} under your load.  Movement is still very hard.`);
            break;
        default:
            break;
        }
        g.disp = g.disp || {};
        g.disp.botl = true;
    }
    g._encumberOldCap = newcap;
}

/** C: hack.h LOOKHERE_SKIP_DFEATURE */
const LOOKHERE_SKIP_DFEATURE = 2;

/** C: pickup.c LOOKHERE_PICKED_SOME */
const LOOKHERE_PICKED_SOME = 1;

function heroSurfaceTyp() {
    const u = game.u;
    return levlTypAt(u?.ux, u?.uy);
}

/**
 * C: invent.c look_here() — non-blind subset: dfeature line, pile summary, doname list.
 * @param {number} objCnt — object count (excluding uchain), from check_here
 * @param {number} lhflags — LOOKHERE_*
 */
async function lookHere(objCnt, lhflags) {
    const g = game;
    const u = g.u;
    if (!u) return;

    const pickedSome = (lhflags & LOOKHERE_PICKED_SOME) !== 0;
    const skipDfeature = (lhflags & LOOKHERE_SKIP_DFEATURE) !== 0;
    const pileLimit = g.flags?.pile_limit ?? 0;
    const skipObjects = pileLimit > 0 && objCnt >= pileLimit;

    const ohead = g.level?.floorObjHeads?.get(`${u.ux},${u.uy}`) ?? null;
    const objs = [];
    for (let o = ohead; o; o = o.nexthere) {
        if (o !== g.uchain) objs.push(o);
    }
    if (objs.length === 0) {
        await readEngrAt(u.ux, u.uy);
        return;
    }

    let dfeature = dfeatureAt(u.ux, u.uy);
    if (dfeature === 'pool of water' && u.underwater) dfeature = null;

    async function plineThereIsDfeature() {
        if (!dfeature || skipDfeature) return;
        let art = dfeature;
        if (art !== 'molten lava' && art !== 'ice' && !String(art).startsWith('frozen ')) art = an(art);
        await pline(`There is ${art} here.`);
    }

    if (u.ublind) {
        /* C: invent.c look_here() blind branch — port feel_location / You() when Blind */
        await readEngrAt(u.ux, u.uy);
        return;
    }

    const ltyp = levlTypAt(u.ux, u.uy);
    const inLavaFeet = IS_LAVA(ltyp);
    const inPoolFeet = IS_POOL(ltyp) && !u.underwater;

    if (inLavaFeet || inPoolFeet) {
        await plineThereIsDfeature();
        await readEngrAt(u.ux, u.uy);
        if (!skipObjects) await pline('You see no objects here.');
        return;
    }

    if (skipObjects) {
        await plineThereIsDfeature();
        await readEngrAt(u.ux, u.uy);
        if (objCnt === 1 && objs[0] && (objs[0].quan ?? 1) === 1) {
            await pline(pickedSome ? 'There is another object here.' : 'There is an object here.');
        } else {
            const w = objCnt === 2 ? 'two'
                : objCnt < 5 ? 'a few'
                    : objCnt < 10 ? 'several'
                        : 'many';
            await pline(`There are ${w}${pickedSome ? ' more' : ''} objects here.`);
        }
        return;
    }

    if (objs.length === 1) {
        await plineThereIsDfeature();
        await readEngrAt(u.ux, u.uy);
        await pline(`You see here ${doname(objs[0])}.`);
        return;
    }

    await plineThereIsDfeature();
    await pline('Things that are here:');
    for (const ob of objs) await pline(`  ${doname(ob)}`);
    await readEngrAt(u.ux, u.uy);
}

/**
 * C: pickup.c check_here(boolean picked_some)
 */
async function checkHere(pickedSome) {
    const g = game;
    const u = g.u;
    if (!u) return;
    if (g.flags?.mention_decor) {
        await describeDecor();
    }

    let ct = 0;
    let o = g.level?.floorObjHeads?.get(`${u.ux},${u.uy}`) ?? null;
    while (o) {
        if (o !== g.uchain) ct++;
        o = o.nexthere;
    }

    if (ct) {
        if (g.context?.run) g.context.run = 0;
        await flush_screen(1);
        const lhflags = pickedSome ? LOOKHERE_PICKED_SOME : 0;
        await lookHere(ct, lhflags);
    } else {
        await readEngrAt(u.ux, u.uy);
    }
}

/** C: notake(ptr) — hero cannot pick up (e.g. worm belly). Stub: false. */
function notake() {
    return false;
}

/**
 * C: pickup.c pickup(int what) — partial port: swallow, levitation/pool/lava,
 * autopickup + !flags.pickup, and early returns that match moveloop_preamble(1).
 * @param {number} what — >0 autopickup, 0 interactive, <0 count (not ported)
 * @returns {Promise<number>} 1 if pickup attempted, else 0 (C uses mixed semantics)
 */
export async function pickup(what) {
    const g = game;
    const u = g.u;
    if (!u) return 0;

    const autopickup = what > 0;
    if (what < 0) return 0;

    if (u.uswallow) return 0;

    const typ = heroSurfaceTyp() ?? 0;
    const underwater = !!u.underwater;
    const inPool = IS_POOL(typ) && !underwater;
    const inLava = IS_LAVA(typ);

    if (autopickup && (g.context?.nopick || !OBJ_AT(u.ux, u.uy) || inPool || inLava)) {
        if (g.flags?.mention_decor) await describeDecor();
        await readEngrAt(u.ux, u.uy);
        return 0;
    }

    const tr = tAt(u.ux, u.uy);
    if (!canReachFloor(!!(tr && is_pit(tr.ttyp)))) {
        await describeDecor();
        const multi = g.multi ?? 0;
        const run = g.context?.run;
        if ((multi && !run) || (autopickup && !g.flags?.pickup)) await readEngrAt(u.ux, u.uy);
        return 0;
    }

    const multi = g.multi ?? 0;
    const run = g.context?.run;
    if ((multi && !run) || (autopickup && !g.flags?.pickup) || notake()) {
        await checkHere(false);
        return 0;
    }

    /* Full interactive / autopick menu pickup deferred (pickup.c remainder). */
    return 0;
}
