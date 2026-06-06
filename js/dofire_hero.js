// dofire_hero.js — dothrow.c dofire() subset: quiver fire + fireassist launcher swap.
// C ref: dothrow.c dofire(), ok_to_throw(), throw_obj() getdir; cmd.c `f` → dofire.

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { readDirIntoU } from './dir_input.js';
import { nearCapacity } from './encumbr.js';
import { isok } from './hacklib.js';
import { blocksMovementAt } from './walkable.js';
import { ammoAndLauncherLikeC } from './weapon_kind.js';
import { runPostCommandTurnAdvanceLikeC } from './moveloop_turn_advance.js';

/**
 * C: dothrow.c ok_to_throw — capacity / notake / nohands gate (subset).
 * @param {import('./gstate.js').game} g
 * @returns {boolean}
 */
function okToThrowLikeC(g) {
    if (nearCapacity(g) >= 4) {
        return false;
    }
    return true;
}

/**
 * C: dothrow.c dofire — read direction via getdir; no hero domove.
 * Omits autoquiver, doquiver_core, multishot, full throw_obj / bhit RNG (exercised paths add later).
 *
 * @param {import('./gstate.js').game} [g]
 */
export async function doFireFromQuiverCmdLikeC(g = game) {
    const u = g.u;
    if (!u) {
        g.context.move = 0;
        return;
    }
    if (!okToThrowLikeC(g)) {
        g.context.move = 0;
        return;
    }

    let obj = u.uquiver ?? null;

    /* C: dofire — fireassist swaps to launcher when ammo matches uswapwep. */
    if (
        obj
        && g.flags?.fireassist !== false
        && !ammoAndLauncherLikeC(obj, u.uwep)
        && ammoAndLauncherLikeC(obj, u.uswapwep)
    ) {
        const tmp = u.uwep;
        u.uwep = u.uswapwep;
        u.uswapwep = tmp;
    }

    if (!obj) {
        await pline('You have no ammunition readied.');
        g._retainMessageAfterCommand = true;
        g.context.move = 0;
        return;
    }

    if (!(await readDirIntoU(g))) {
        await pline('Never mind.');
        g.context.move = 0;
        return;
    }

    const dx = u.dx | 0;
    const dy = u.dy | 0;
    const dz = u.dz | 0;
    if (!dx && !dy && !dz) {
        await pline('Never mind.');
        g.context.move = 0;
        return;
    }
    if (dz) {
        /* C: throw_obj vertical — defer full toss_up / hitfloor chain. */
        g.context.move = 0;
        return;
    }

    const tx = (u.ux | 0) + dx;
    const ty = (u.uy | 0) + dy;
    if (!isok(tx, ty) || blocksMovementAt(tx, ty, g)) {
        await pline('You cannot throw there.');
        g._retainMessageAfterCommand = true;
        g.context.move = 0;
        return;
    }

    /* C: throw_obj after getdir — ECMD_TIME moveloop tail even when shot aborts early
     * (session `f`/`l`/`i`/ESC: rng on step-14 ESC nhgetch boundary, not on `l`). */
    g.context.move = 1;
    g.context._dofireAwaitEscMoveloopLikeC = true;
}
