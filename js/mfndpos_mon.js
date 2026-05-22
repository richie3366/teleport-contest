// mfndpos_mon.js — Monster neighbor positions (mon.c mfndpos / mon_allowflags).
// C ref: mon.c mfndpos() ~2140+, mon_allowflags() ~2064+; include/mfndpos.h.

import {
    ALLOW_M,
    ALLOW_SANCT,
    ALLOW_SSM,
    ALLOW_U,
    ALLOW_ROCK,
    NOGARLIC,
    OTYP_BOULDER,
    PM_GRID_BUG,
    COLNO,
    ROWNO,
    TEMPLE,
    isok,
} from './const.js';
import { floorObjKey } from './floorobj.js';
import { accessibleAtMonmoveLikeC } from './walkable.js';
import { onScaryMonsterLikeC, inYourSanctuaryMonsterLikeC } from './distfleeck_mon.js';
import {
    raceptr,
    isRiderMnum,
    passesWalls,
    throwsRocks,
    isHumanPtrLikeC,
    isUndeadPtr,
    isVampshifterMonsterLikeC,
} from './mondata.js';
import { inRoomsTypewantedRoomnos } from './shop.js';

/** @typedef {{ cnt: number, poss: {x:number,y:number}[], info: number[] }} MfndposData */

/** C: monsters.h **PM_MINOTAUR**. */
const PM_MINOTAUR = 176;

/** @param {import('./gstate.js').game} g */
function monAtXY(g, x, y) {
    return g.level?.monsters?.find((m) => (m.mx | 0) === x && (m.my | 0) === y && (m.mhp | 0) > 0) ?? null;
}

/** C: floorobj — boulder blocks unless **ALLOW_ROCK**. */
function sobjAtBoulder(g, x, y) {
    const heads = g.level?.floorObjHeads;
    if (!heads) return false;
    for (let o = heads.get(floorObjKey(x, y)) ?? null; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

/**
 * C: mon.c **`mon_allowflags(mtmp)`** (hostile/peaceful dungeon monsters subset).
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 */
export function monAllowflagsMonsterLikeC(g, mtmp) {
    let allowflags = 0;
    const ptr = raceptr(mtmp);
    const u = g.u;

    if (mtmp.mtame | 0) allowflags |= ALLOW_M | ALLOW_SANCT | ALLOW_SSM;
    else if (mtmp.mpeaceful | 0) allowflags |= ALLOW_SANCT | ALLOW_SSM;
    else allowflags |= ALLOW_U;

    if ((u?.Conflict | 0) && !(mtmp.iswiz | 0)) allowflags |= ALLOW_U;
    if (mtmp.isshk | 0) allowflags |= ALLOW_SSM;
    if (mtmp.ispriest | 0) allowflags |= ALLOW_SSM | ALLOW_SANCT;
    if (passesWalls(ptr)) allowflags |= ALLOW_ROCK | 0x04000000; /* ALLOW_WALL */
    if (throwsRocks(ptr)) allowflags |= ALLOW_ROCK;
    if (isRiderMnum(ptr?.mnum | 0) || (mtmp.isminion | 0)) allowflags |= ALLOW_SANCT;
    if (isHumanPtrLikeC(ptr) || (ptr?.mnum | 0) === PM_MINOTAUR) allowflags |= ALLOW_SSM;
    if (
        (isUndeadPtr(ptr) && (ptr?.mlet | 0) !== 54 /* S_GHOST */)
        || isVampshifterMonsterLikeC(mtmp)
    ) {
        allowflags |= NOGARLIC;
    }
    return allowflags;
}

/**
 * C: mon.c **`mfndpos(mon, data, flag)`** — subset for **`m_move`** position pick on normal floors.
 *
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} flag
 * @returns {MfndposData}
 */
export function mfndposMonsterLikeC(g, mtmp, flag) {
    const data = { cnt: 0, poss: [], info: [] };
    const x = mtmp.mx | 0;
    const y = mtmp.my | 0;
    const u = g.u;
    const ux = u?.ux | 0;
    const uy = u?.uy | 0;
    const maxx = Math.min(x + 1, COLNO - 1);
    const maxy = Math.min(y + 1, ROWNO - 1);
    const nodiag = (raceptr(mtmp)?.mnum | 0) === PM_GRID_BUG;

    if (!(mtmp.mcansee | 0)) flag |= ALLOW_SSM;

    for (let nx = Math.max(1, x - 1); nx <= maxx; nx++) {
        for (let ny = Math.max(0, y - 1); ny <= maxy; ny++) {
            if (nx === x && ny === y) continue;
            if (!isok(nx, ny)) continue;
            if (nx !== x && ny !== y && nodiag) continue;
            if (!accessibleAtMonmoveLikeC(nx, ny, g)) continue;

            const other = monAtXY(g, nx, ny);
            if (other && other !== mtmp && !(flag & ALLOW_M)) continue;

            let info = 0;
            const dispx = nx;
            const dispy = ny;
            if (onScaryMonsterLikeC(g, dispx, dispy, mtmp)) {
                if (!(flag & ALLOW_SSM)) continue;
                info |= ALLOW_SSM;
            }

            if ((nx === ux && ny === uy) || (nx === (mtmp.mux | 0) && ny === (mtmp.muy | 0))) {
                if (!(flag & ALLOW_U)) continue;
                if (nx === ux && ny === uy) {
                    mtmp.mux = ux;
                    mtmp.muy = uy;
                }
                info |= ALLOW_U;
            }

            if (other && other !== mtmp && (flag & ALLOW_M)) {
                info |= ALLOW_M;
            }

            if (g.level?.flags?.has_temple) {
                const tins = inRoomsTypewantedRoomnos(g, nx, ny, TEMPLE);
                const here = inRoomsTypewantedRoomnos(g, x, y, TEMPLE);
                if ((tins[0] | 0) && !(here[0] | 0) && inYourSanctuaryMonsterLikeC(g, mtmp)) {
                    if (!(flag & ALLOW_SANCT)) continue;
                    info |= ALLOW_SANCT;
                }
            }

            if (sobjAtBoulder(g, nx, ny)) {
                if (!(flag & ALLOW_ROCK)) continue;
                info |= ALLOW_ROCK;
            }

            const cnt = data.cnt;
            data.poss[cnt] = { x: nx, y: ny };
            data.info[cnt] = info;
            data.cnt = cnt + 1;
            if (data.cnt >= 9) return data;
        }
    }
    return data;
}
