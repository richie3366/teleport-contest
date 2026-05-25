// mon_arrive.js — C dog.c mon_arrive subset (migrating_mons on level entry).
// C ref: dog.c mon_arrive() MIGR_LEFTOVERS + MIGR_RANDOM placement (rloc / mnearto deferred).

import { COLNO, ROWNO, MIGR_RANDOM, MIGR_LEFTOVERS } from './const.js';
import { rn1, rn2 } from './rng.js';
import { newsym } from './display.js';
import { goodposNullMonLikeC } from './walkable.js';
import { monArriveLeftoversDeliverLikeC } from './deliver_obj_to_mon.js';

/**
 * C: dog.c `mon_arrive` — `MIGR_RANDOM` tail (`rloc(mtmp, RLOC_NOMSG)` when locale unset).
 * @param {import('./gstate.js').game} g
 * @param {object} mtmp
 * @returns {boolean} true when placed on level
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
        const mtmp = entry.mtmp;
        if (!mtmp) continue;

        monArriveLeftoversDeliverLikeC(g, mtmp);

        const typ = entry.migrateTyp | 0;
        let placed = false;
        if (typ === MIGR_RANDOM) {
            placed = placeMigratingMonRandomLikeC(g, mtmp);
        }
        if (placed) {
            mtmp.migflags = (mtmp.migflags | 0) & ~MIGR_LEFTOVERS;
        } else {
            remain.push(entry);
        }
    }

    g.migratingMons = remain;
}
