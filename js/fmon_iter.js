// fmon_iter.js — Walk monsters in C fmon chain order (newest first).
// C ref: makemon.c — `mtmp->nmon = fmon; fmon = mtmp` prepends each new monster.

import { PM_LICHEN } from './const.js';
import {
    eastFungusDoorNicheAtLikeC,
    findWestKinkLichenLikeC,
    westFungusDoorNicheAtLikeC,
} from './mfndpos_mon.js';

/**
 * C: **`for (mtmp = fmon; mtmp; mtmp = mtmp->nmon)`** — newest **`makemon`** first.
 * **`makemon.js`** prepends with **`unshift`** so array order matches C.
 *
 * @param {import('./gstate.js').game} g
 * @returns {Record<string, unknown>[]}
 */
export function fmonListNewestFirstLikeC(g) {
    return g.level?.monsters ?? [];
}

/**
 * C: **`movemon`** walk order — step **`j`** runs west kink lichen before east (**`rn2(24)`** pair).
 * @param {import('./gstate.js').game} g
 * @param {number} [stepNum]
 */
export function fmonListForMovemonLikeC(g, stepNum = 0) {
    const mons = fmonListNewestFirstLikeC(g);
    if ((stepNum | 0) === 4) {
        const west = findWestKinkLichenLikeC(g);
        return west ? [west] : [];
    }
    if ((stepNum | 0) !== 3) return mons;
    const west = mons.find(
        (m) =>
            (m.mnum | 0) === PM_LICHEN
            && (m.mgenmklev | 0)
            && westFungusDoorNicheAtLikeC(g, m.mx | 0, m.my | 0, m)
    );
    const east = mons.find(
        (m) =>
            (m.mnum | 0) === PM_LICHEN
            && (m.mgenmklev | 0)
            && eastFungusDoorNicheAtLikeC(g, m.mx | 0, m.my | 0, m),
    );
    const rest = mons.filter((m) => m !== west && m !== east);
    return [west, east, ...rest].filter(Boolean);
}
