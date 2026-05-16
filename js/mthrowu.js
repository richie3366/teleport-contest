// mthrowu.js — Hero struck by launched objects (trap missiles, &c.).
// C ref: mthrowu.c thitu(); trap.c t_missile(); weapon.c dmgval() (arrow/dart/boulder subset);
//        end.c losehp() (minimal).

import { game } from './gstate.js';
import { rnd, d } from './rng.js';
import { OTYP_BOULDER } from './const.js';
import { raceptr, bigmonst } from './mondata.js';
import { pline } from './display.js';
import { placeFloorObject, unlinkFloorObject } from './floorobj.js';

export const OBJ_ARROW = 349;
export const OBJ_DART = 353;
/** C: objects.c ROCK */
export const OBJ_ROCK = 467;

function nextIdent() {
    rnd(2);
}

/** C: trap.c t_missile(int otyp, struct trap *trap) */
export function tMissile(otyp, _trap) {
    void _trap;
    nextIdent();
    const isRock = otyp === OBJ_ROCK;
    return {
        otyp,
        oclass: isRock ? 14 : 6, /* GEM_CLASS vs WEAPON_CLASS — NH object classes */
        ox: -1,
        oy: -1,
        quan: 1,
        owt: isRock ? 10 : 1,
        spe: 0,
        opoisoned: 0,
    };
}

/**
 * C: weapon.c dmgval(struct obj *otmp, struct monst *mon) — missiles + **BOULDER** (**`oc_wsdam`/`oc_wldam`** subset).
 * @param {{ otyp: number }} otmp
 * @param {{ data?: object }|null|undefined} mon
 */
export function dmgval(otmp, mon) {
    const t = otmp?.otyp ?? 0;
    if (t === OTYP_BOULDER) {
        if (!mon) return Math.max(1, d(2, 6));
        const ptr = raceptr(mon);
        const tmp = bigmonst(ptr) ? d(2, 6) + rnd(6) : d(2, 6);
        return Math.max(1, tmp);
    }
    if (t === OBJ_ARROW) return rnd(6);
    if (t === OBJ_DART) return rnd(3);
    if (t === OBJ_ROCK) return rnd(6);
    return rnd(4);
}

/** C: hack.h Maybe_Half_Phys */
export function maybeHalfPhys(dam) {
    return game.u?.Half_physical_damage ? Math.trunc((dam + 1) / 2) : dam;
}

/** C: end.c losehp(int n, const char *str, int kprefix) — no killer naming yet. */
export function losehp(n, _knm, _kprefix) {
    void _knm;
    void _kprefix;
    const u = game.u;
    if (!u) return;
    const k = Math.max(0, n | 0);
    u.uhp = Math.max(0, (u.uhp ?? 0) - k);
    game.disp = game.disp || {};
    game.disp.botl = true;
}

function heroBlind() {
    const u = game.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

/**
 * C: mthrowu.c thitu(int tlev, int dam, struct obj **objp, const char *name)
 * @param {{ o: object|null }} objRef
 * @returns {Promise<number>} 1 if hit, 0 if miss
 */
export async function thitu(tlev, dam, objRef, name) {
    const u = game.u;
    if (!u) return 0;

    const dieroll = rnd(20);
    const ac = u.uac ?? 10;
    const verbose = !!(game.flags?.verbose);
    const blind = heroBlind();

    if (ac + tlev <= dieroll) {
        if (blind || !verbose) {
            await pline('It misses.');
        } else if (ac + tlev <= dieroll - 2) {
            await pline(`The ${name} misses you.`);
        } else {
            await pline(`You are almost hit by ${name ? `the ${name}` : 'something'}.`);
        }
        return 0;
    }

    if (blind || !verbose) await pline('You are hit!');
    else await pline(`You are hit by ${name ? `the ${name}` : 'something'}!`);

    losehp(dam, name, 0);
    return 1;
}

/** C: shk.c / invent obfree — remove object from floor list and level.objects. */
export function obfree(otmp) {
    if (!otmp) return;
    unlinkFloorObject(otmp);
    const arr = game.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/** C: trap.c poisoned — stub until full poison/exercise port. */
export async function poisoned(_x, _attr, _knm, _dmg, _fatal) {
    void _x; void _attr; void _knm; void _dmg; void _fatal;
    await pline("The poison doesn't seem to affect you.");
}
