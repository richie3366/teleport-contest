// keepdogs_hero.js — dog.c keepdogs() subset for goto_level.
// C ref: dog.c keepdogs(), mondata.c levl_follower(); mon.c helpless().

import {
    STRAT_WAITFORU,
    ESHK,
    EPRI,
    EGD,
    NO_TRAP_FLAGS,
    MIGR_EXACT_XY,
} from './const.js';
import { pline, newsym } from './display.js';
import { onLevelLikeC } from './hacklib.js';
import { monnearMonsterXYLikeC } from './mon_geom.js';
import {
    levlFollowerLikeC,
    monHasAmulet,
    humanoidLikeC,
    raceptr,
} from './mondata.js';
import { migrateMonToLevelLikeC } from './mon_limbo.js';
import { cansee } from './vision.js';
import { mintrap, mUnleashMonLikeC } from './trap.js';

/** C: mon.c **`helpless(mtmp)`** — **`mfrozen`/`mcanmove`** subset. */
function helplessMonsterKeepdogsLikeC(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/** C: mondata.h **`canseemon`** subset for **`keepdogs`** plines. */
function canseemonKeepdogsLikeC(g, mtmp) {
    const u = g.u;
    if (!mtmp || !u) return false;
    if (u.usteed === mtmp) return true;
    if ((mtmp.minvis | 0) && !(u.See_invisible | 0)) return false;
    return cansee(mtmp.mx, mtmp.my);
}

/** C: mon.c **`Monnam`** — stub until **`x_monnam`**. */
function monnamKeepdogsLikeC(mtmp) {
    const n = mtmp?.data?.mname || mtmp?.monnam;
    if (n) return `the ${n}`;
    return 'the monster';
}

/** C: dog.c **`keep_mon_accessible`**. */
function keepMonAccessibleLikeC(g, mtmp) {
    if (mtmp?.iswiz) return true;
    const uz = g.u?.uz;
    if (!uz || !mtmp?.mextra) return false;
    if ((mtmp.isshk | 0) && ESHK(mtmp)?.shoplevel && !onLevelLikeC(uz, ESHK(mtmp).shoplevel)) {
        return true;
    }
    if ((mtmp.ispriest | 0) && EPRI(mtmp)?.shrlevel && !onLevelLikeC(uz, EPRI(mtmp).shrlevel)) {
        return true;
    }
    if ((mtmp.isgd | 0) && EGD(mtmp)?.gdlevel && !onLevelLikeC(uz, EGD(mtmp).gdlevel)) {
        return true;
    }
    return false;
}

/**
 * C: dog.c **`keepdogs(boolean pets_only)`** — pets / followers near hero → **`gm.mydogs`**.
 * Deferred: **`finish_meating`**, worm **`mon_leave`**, **`mdrop_special_objs`** (steed amulet).
 * @param {import('./gstate.js').game} g
 * @param {boolean} petsOnly
 */
export async function keepdogsHeroLikeC(g, petsOnly) {
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

        if (follows) {
            if (mtmp.mtrapped) await mintrap(mtmp, NO_TRAP_FLAGS);

            let stayBehind = false;

            if (mtmp === u.usteed) {
                mtmp.mtrapped = 0;
                mtmp.meating = 0;
            } else if ((mtmp.meating | 0) || (mtmp.mtrapped | 0)) {
                if (canseemonKeepdogsLikeC(g, mtmp)) {
                    const who = monnamKeepdogsLikeC(mtmp);
                    const what = (mtmp.meating | 0) ? 'eating' : 'trapped';
                    await pline(`${who} is still ${what}.`);
                }
                stayBehind = true;
            } else if (monHasAmulet(mtmp)) {
                if (canseemonKeepdogsLikeC(g, mtmp)) {
                    await pline(`${monnamKeepdogsLikeC(mtmp)} seems very disoriented for a moment.`);
                }
                stayBehind = true;
            }

            if (stayBehind) {
                if (mtmp.mleashed) {
                    const ptr = raceptr(mtmp);
                    const pron = humanoidLikeC(ptr)
                        ? ((mtmp.female | 0) ? 'Her' : 'His')
                        : 'Its';
                    await pline(`${pron} leash suddenly comes loose.`);
                    await mUnleashMonLikeC(g, mtmp, false);
                }
                continue;
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
            continue;
        }

        if (keepMonAccessibleLikeC(g, mtmp)) {
            const uz = u.uz;
            if (uz) migrateMonToLevelLikeC(g, mtmp, uz, MIGR_EXACT_XY);
            continue;
        }

        if (mtmp.mleashed) {
            await pline(`${monnamKeepdogsLikeC(mtmp)}'s leash goes slack.`);
            await mUnleashMonLikeC(g, mtmp, false);
        }
    }

    g.gd.keepdogs_last_tame_seen = tame;
}

/** @deprecated alias — use **`keepdogsHeroLikeC`**. */
export const keepdogsHeroStubLikeC = keepdogsHeroLikeC;
