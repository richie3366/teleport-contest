// keepdogs_hero.js — dog.c keepdogs() subset for goto_level.
// C ref: dog.c keepdogs(), mondata.c levl_follower(); mon.c helpless().

import { STRAT_WAITFORU } from './const.js';
import { ESHK } from './const.js';
import { newsym } from './display.js';
import { monnearMonsterXYLikeC } from './mon_geom.js';
import { levlFollowerLikeC, monHasAmulet } from './mondata.js';

/** C: mon.c **`helpless(mtmp)`** — **`mfrozen`/`mcanmove`** subset. */
function helplessMonsterKeepdogsLikeC(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/**
 * C: dog.c **`keepdogs(boolean pets_only)`** — pets / followers near hero → **`gm.mydogs`**.
 * Deferred: **`mintrap`**, **`finish_meating`**, **`stay_behind`** plines, **`keep_mon_accessible`**,
 * **`migrate_to_level`**, leash slack, worm **`mon_leave`**.
 * @param {import('./gstate.js').game} g
 * @param {boolean} petsOnly
 */
export function keepdogsHeroLikeC(g, petsOnly) {
    g.gd = g.gd || {};
    g.gd.keepdogs_last_pets_only = !!petsOnly;

    const u = g.u;
    const mons = g.level?.monsters;
    if (!u || !mons?.length) {
        g.gd.keepdogs_last_tame_seen = 0;
        return;
    }

    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const uhaveAmulet = !!(u.uhave?.amulet);
    let tame = 0;

    for (let i = mons.length - 1; i >= 0; i--) {
        const mtmp = mons[i];
        if (!mtmp || (mtmp.mhp | 0) <= 0) continue;

        if ((mtmp.mtame | 0) > 0) {
            tame++;
            if (petsOnly) {
                mtmp.mtrapped = 0;
                mtmp.meating = 0;
                mtmp.msleeping = 0;
                mtmp.mfrozen = 0;
                mtmp.mcanmove = 1;
            }
        }

        const follows =
            ((monnearMonsterXYLikeC(mtmp, ux, uy) && levlFollowerLikeC(g, mtmp))
                || (uhaveAmulet && (mtmp.iswiz | 0)))
            && (!helplessMonsterKeepdogsLikeC(mtmp) || mtmp === u.usteed)
            && !((mtmp.mstrategy | 0) & STRAT_WAITFORU);

        if (!follows) continue;

        if (mtmp !== u.usteed && ((mtmp.meating | 0) || (mtmp.mtrapped | 0))) continue;
        if (mtmp !== u.usteed && monHasAmulet(mtmp)) continue;

        if (mtmp === u.usteed) {
            mtmp.mtrapped = 0;
            mtmp.meating = 0;
        }

        const mx = mtmp.mx | 0;
        const my = mtmp.my | 0;
        mons.splice(i, 1);
        if (!g.mydogs) g.mydogs = [];
        g.mydogs.push({
            mtmp,
            xWas: mx,
            yWas: my,
            wormno: 0,
            mlstmv: g.moves | 0,
        });
        mtmp.mx = 0;
        mtmp.my = 0;
        if (mx) newsym(mx, my);
    }

    g.gd.keepdogs_last_tame_seen = tame;
}

/** @deprecated alias — use **`keepdogsHeroLikeC`**. */
export const keepdogsHeroStubLikeC = keepdogsHeroLikeC;
