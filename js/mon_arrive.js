// mon_arrive.js — C dog.c mon_arrive subset (migrating_mons on level entry).
// C ref: dog.c mon_arrive(), mon_catchup_elapsed_time(); stairs.c stairway_find*.

import {
    COLNO, ROWNO, ROOMOFFSET, MAGIC_PORTAL,
    MIGR_RANDOM, MIGR_APPROX_XY, MIGR_EXACT_XY,
    MIGR_STAIRS_UP, MIGR_STAIRS_DOWN, MIGR_LADDER_UP, MIGR_LADDER_DOWN,
    MIGR_SSTAIRS, MIGR_PORTAL, MIGR_WITH_HERO, MIGR_LEFTOVERS,
    In_endgame,
} from './const.js';
import { rn1, rn2 } from './rng.js';
import { newsym } from './display.js';
import { goodposNullMonLikeC, goodposNewMonster, enextoNearMon } from './walkable.js';
import { monArriveLeftoversDeliverLikeC } from './deliver_obj_to_mon.js';
import { stairwayFindFromLikeC, stairwayFindLikeC } from './decor.js';
import { inRoomsTypewantedRoomnos } from './shop.js';

/**
 * C: dog.c `mon_catchup_elapsed_time` — status timers + rn2 recovery (subset).
 * @param {object} mtmp
 * @param {number} nmv
 */
function monCatchupElapsedTimeLikeC(mtmp, nmv) {
    let imv = nmv | 0;
    if (imv <= 0) return;
    if (imv > 0x7fffffff) imv = 0x7fffffff;

    if (mtmp.mblinded) {
        mtmp.mblinded = imv >= (mtmp.mblinded | 0) ? 1 : (mtmp.mblinded | 0) - imv;
    }
    if (mtmp.mfrozen) {
        mtmp.mfrozen = imv >= (mtmp.mfrozen | 0) ? 1 : (mtmp.mfrozen | 0) - imv;
    }
    if (mtmp.mfleetim) {
        mtmp.mfleetim = imv >= (mtmp.mfleetim | 0) ? 1 : (mtmp.mfleetim | 0) - imv;
    }
    if (mtmp.mtrapped && rn2(imv + 1) > 20) mtmp.mtrapped = 0;
    if (mtmp.mconf && rn2(imv + 1) > 25) mtmp.mconf = 0;
    if (mtmp.mstun && rn2(imv + 1) > 5) mtmp.mstun = 0;
}

/** C: mkroom.c `somexy` — non-irregular room fast path. */
function somexyMonArriveLikeC(g, croom, c) {
    if (!croom) return false;
    if (croom.irregular) return false;
    c.x = rn1((croom.hx | 0) - (croom.lx | 0) + 1, croom.lx | 0);
    c.y = rn1((croom.hy | 0) - (croom.ly | 0) + 1, croom.ly | 0);
    return true;
}

/**
 * C: dog.c `mon_arrive` wander block after locale resolved.
 * @param {import('./gstate.js').game} g
 */
function monArriveWanderLikeC(g, xlocale, ylocale, wander) {
    const w = wander | 0;
    if (!w) return { x: xlocale | 0, y: ylocale | 0 };

    const rnos = inRoomsTypewantedRoomnos(g, xlocale, ylocale, 0);
    if (rnos.length) {
        const croom = g.level?.rooms?.[(rnos[0] | 0) - ROOMOFFSET];
        const c = { x: 0, y: 0 };
        if (croom && somexyMonArriveLikeC(g, croom, c)) return c;
        return { x: 0, y: 0 };
    }

    let i = Math.max(1, (xlocale | 0) - w);
    let j = Math.min(COLNO - 1, (xlocale | 0) + w);
    const x = rn1(j - i, i);
    i = Math.max(0, (ylocale | 0) - w);
    j = Math.min(ROWNO - 1, (ylocale | 0) + w);
    const y = rn1(j - i, i);
    return { x, y };
}

/**
 * C: dog.c `mon_arrive` — resolve destination before `MIGR_LEFTOVERS` delivery.
 * @param {import('./gstate.js').game} g
 * @param {object} entry
 * @returns {{ xlocale: number, ylocale: number, wander: number }}
 */
function resolveMonArriveLocaleLikeC(g, entry) {
    const u = g.u;
    const mtmp = entry.mtmp;
    const xyloc = entry.migrateTyp | 0;
    const fromdlev = {
        dnum: entry.fromDnum ?? u?.uz?.dnum ?? 0,
        dlevel: entry.fromDlevel ?? u?.uz?.dlevel ?? 0,
    };

    let xlocale = entry.xWas | 0;
    let ylocale = entry.yWas | 0;
    let wander = 0;

    const moves = g.moves | 0;
    const mlstmv = mtmp?.mlstmv | 0;
    if (mlstmv < moves - 1) {
        const nmv = moves - 1 - mlstmv;
        monCatchupElapsedTimeLikeC(mtmp, nmv);
        wander = Math.min(nmv, 8);
    }

    switch (xyloc) {
    case MIGR_APPROX_XY:
        break;
    case MIGR_EXACT_XY:
        wander = 0;
        break;
    case MIGR_WITH_HERO:
        xlocale = u?.ux | 0;
        ylocale = u?.uy | 0;
        break;
    case MIGR_STAIRS_UP:
    case MIGR_STAIRS_DOWN: {
        const st = stairwayFindFromLikeC(g, fromdlev, false);
        if (st) {
            xlocale = st.sx | 0;
            ylocale = st.sy | 0;
        } else {
            xlocale = 0;
            ylocale = 0;
        }
        break;
    }
    case MIGR_LADDER_UP:
    case MIGR_LADDER_DOWN: {
        const st = stairwayFindFromLikeC(g, fromdlev, true);
        if (st) {
            xlocale = st.sx | 0;
            ylocale = st.sy | 0;
        } else {
            xlocale = 0;
            ylocale = 0;
        }
        break;
    }
    case MIGR_SSTAIRS: {
        const st = stairwayFindLikeC(g, fromdlev);
        if (st) {
            xlocale = st.sx | 0;
            ylocale = st.sy | 0;
        } else {
            xlocale = 0;
            ylocale = 0;
        }
        break;
    }
    case MIGR_PORTAL:
        if (In_endgame(u?.uz)) {
            const box = g.updest;
            if (box) {
                xlocale = rn1((box.nhx | 0) - (box.nlx | 0) + 1, box.nlx | 0);
                ylocale = rn1((box.nhy | 0) - (box.nly | 0) + 1, box.nly | 0);
            }
            break;
        }
        for (const t of g.level?.traps || []) {
            if ((t.ttyp | 0) === MAGIC_PORTAL) {
                xlocale = t.tx | 0;
                ylocale = t.ty | 0;
                break;
            }
        }
        if (!xlocale && !ylocale) {
            xlocale = 0;
            ylocale = 0;
        }
        break;
    default:
    case MIGR_RANDOM:
        xlocale = 0;
        ylocale = 0;
        break;
    }

    if (xyloc === MIGR_EXACT_XY) wander = 0;
    if (xlocale && wander) {
        const w = monArriveWanderLikeC(g, xlocale, ylocale, wander);
        xlocale = w.x;
        ylocale = w.y;
    }

    return { xlocale, ylocale, wander };
}

/**
 * C: mon.c `mnearto(mtmp, x, y, FALSE, RLOC_NOMSG)` — placement subset.
 * @returns {boolean}
 */
function mneartoMonArriveLikeC(g, mtmp, tx, ty) {
    const xi = tx | 0;
    const yi = ty | 0;
    const sx = mtmp.mx | 0;
    const sy = mtmp.my | 0;
    if (sx === xi && sy === yi) return true;

    const blocker = g.level?.monsters?.find(
        (m) => m !== mtmp && (m.mx | 0) === xi && (m.my | 0) === yi,
    );
    if (blocker) {
        const bdest = enextoNearMon(g, xi, yi, blocker);
        if (!bdest) return false;
        const bx0 = blocker.mx | 0;
        const by0 = blocker.my | 0;
        blocker.mx = bdest.x | 0;
        blocker.my = bdest.y | 0;
        newsym(bx0, by0);
        newsym(blocker.mx, blocker.my);
    }

    let nx = xi;
    let ny = yi;
    if (!goodposNewMonster(xi, yi, mtmp, g)) {
        const mm = enextoNearMon(g, xi, yi, mtmp);
        if (!mm) return false;
        nx = mm.x | 0;
        ny = mm.y | 0;
    }

    newsym(sx, sy);
    mtmp.mx = nx;
    mtmp.my = ny;
    const mons = g.level?.monsters;
    if (mons && !mons.includes(mtmp)) {
        mons.unshift(mtmp);
    } else if (g.level && !mons) {
        g.level.monsters = [mtmp];
    }
    newsym(nx, ny);
    return true;
}

/**
 * C: dog.c `mon_arrive` — `rloc(mtmp, RLOC_NOMSG)` when locale unset.
 * @param {import('./gstate.js').game} g
 * @param {object} mtmp
 */
function rlocMonArriveLikeC(g, mtmp) {
    return placeMigratingMonRandomLikeC(g, mtmp);
}

/**
 * C: dog.c `mon_arrive` — `MIGR_RANDOM` / `rloc` random placement.
 * @param {import('./gstate.js').game} g
 * @param {object} mtmp
 * @returns {boolean}
 */
function placeMigratingMonRandomLikeC(g, mtmp) {
    let tryLimit = 4000;
    let tx = 0;
    let ty = 0;
    do {
        tx = rn1(COLNO - 3, 2);
        ty = rn2(ROWNO);
        if (!--tryLimit) return false;
    } while (!goodposNullMonLikeC(tx, ty, g));
    mtmp.mx = tx | 0;
    mtmp.my = ty | 0;
    const mons = g.level?.monsters;
    if (mons) mons.unshift(mtmp);
    else if (g.level) g.level.monsters = [mtmp];
    newsym(tx, ty);
    return true;
}

/**
 * C: dog.c `mon_arrive` — place one migrating monster on current level.
 * @param {import('./gstate.js').game} g
 * @param {object} entry
 * @returns {boolean}
 */
function monArriveOneLikeC(g, entry) {
    const mtmp = entry.mtmp;
    if (!mtmp) return false;

    const { xlocale, ylocale } = resolveMonArriveLocaleLikeC(g, entry);
    monArriveLeftoversDeliverLikeC(g, mtmp);

    if (xlocale > 0 && ylocale >= 0) {
        return mneartoMonArriveLikeC(g, mtmp, xlocale, ylocale);
    }
    return rlocMonArriveLikeC(g, mtmp);
}

/**
 * Drain `g.migratingMons` entries destined for hero's current `u.uz`.
 * @param {import('./gstate.js').game} g
 */
export function arriveMigratingMonsForCurrentLevelLikeC(g) {
    const uz = g.u?.uz;
    const list = g.migratingMons;
    if (!uz || !list?.length) return;

    const dnum = uz.dnum | 0;
    const dlevel = uz.dlevel | 0;
    const remain = [];

    for (const entry of list) {
        if ((entry.mux | 0) !== dnum || (entry.muy | 0) !== dlevel) {
            remain.push(entry);
            continue;
        }
        if (monArriveOneLikeC(g, entry)) {
            entry.mtmp.migflags = (entry.mtmp.migflags | 0) & ~MIGR_LEFTOVERS;
        } else {
            remain.push(entry);
        }
    }

    g.migratingMons = remain;
}
