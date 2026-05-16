// melt_ice.js — Ice terrain melts to water (fire trap, zaps, etc.).
// C ref: zap.c melt_ice(), trap.c trap_ice_effects(); is_ice() is trap.c / rm semantics
//
// TODO vs C: spot_stop_timers(MELT_ICE_AWAY), obj_ice_effects, unearth_objs,
// boulder_hits_pool / sobj_at boulder loop, cnv_trap_obj for LANDMINE/BEAR_TRAP on ice
// (landmine/bear currently delTrap-only), minliquid for monsters on new pool.

import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { tAt, delTrap } from './search.js';
import { maybeHeroPoolEnter } from './drown.js';
import {
    ICE,
    POOL,
    MOAT,
    ICED_POOL,
    ICED_MOAT,
    DB_ICE,
    DB_UNDER,
    IS_DRAWBRIDGE,
    IS_POOL,
    u_at,
    LANDMINE,
    BEAR_TRAP,
    MAGIC_PORTAL,
    VIBRATING_SQUARE,
} from './const.js';

/** C: trap.c undestroyable_trap — subset for trap_ice_effects deltrap branch. */
function undestroyableTrapTtyp(ttyp) {
    return ttyp === MAGIC_PORTAL || ttyp === VIBRATING_SQUARE;
}

/**
 * C: is_ice(x,y) — ICE terrain, or drawbridge span with DB_ICE underneath.
 * @param {import('./gstate.js').game} g
 */
export function isIceAt(g, x, y) {
    const loc = g.level?.at(x, y);
    if (!loc) return false;
    if (loc.typ === ICE) return true;
    if (IS_DRAWBRIDGE(loc.typ) && (loc.flags & DB_UNDER) === DB_ICE) return true;
    return false;
}

/**
 * C: trap.c trap_ice_effects(x, y, ice_is_melting) when ice_is_melting TRUE.
 * @param {import('./gstate.js').game} g
 */
function trapIceEffectsOnMelt(g, x, y) {
    const ttmp = tAt(x, y);
    if (!ttmp) return;

    const mtmp = g.level?.monsters?.find((m) => m.mx === x && m.my === y);
    if (mtmp && (mtmp.mtrapped | 0)) mtmp.mtrapped = 0;

    if (ttmp.ttyp === LANDMINE || ttmp.ttyp === BEAR_TRAP) {
        /* C: cnv_trap_obj — creates floor obj + pit/moat handling; not ported. */
        delTrap(ttmp);
    } else if (!undestroyableTrapTtyp(ttmp.ttyp)) {
        delTrap(ttmp);
    }
}

/**
 * C: zap.c melt_ice(x, y, msg) — subset until timers/objects/boulders match C.
 * @param {import('./gstate.js').game} g
 * @param {string|null|undefined} msg — null/undefined → default Norep string
 */
export async function meltIceAt(g, x, y, msg) {
    if (!isIceAt(g, x, y)) return;

    const text = msg ?? 'The ice crackles and melts.';
    const loc = g.level?.at(x, y);
    if (!loc) return;

    if (IS_DRAWBRIDGE(loc.typ)) {
        loc.flags &= ~DB_ICE;
    } else if (loc.typ === ICE) {
        const moatIce = (loc.flags & ICED_MOAT) !== 0;
        const poolIce = (loc.flags & ICED_POOL) !== 0;
        loc.typ = !moatIce && poolIce ? POOL : MOAT;
        loc.flags &= ~(ICED_POOL | ICED_MOAT);
    }

    trapIceEffectsOnMelt(g, x, y);

    const u = g.u;
    if ((u?.underwater | 0) !== 0) vision_recalc(1);

    newsym(x, y);

    if (cansee(x, y) || u_at(x, y)) await pline(text);

    if (u_at(x, y) && u) {
        await maybeHeroPoolEnter(g, { fromDx: u.dx | 0, fromDy: u.dy | 0 });
    } else if (IS_POOL(loc.typ)) {
        /* C: minliquid(mtmp) — not ported */
    }
}
