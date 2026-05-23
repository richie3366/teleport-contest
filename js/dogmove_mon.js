// dogmove_mon.js — Pet movement RNG subset (dogmove.c dog_goal, dog_move).
// C ref: monmove.c m_move → dog_move(); dogmove.c dog_goal() ~483, dog_move() ~977.

import {
    NORMAL_SPEED,
    APPORT,
    UNDEF,
    MANFOOD,
    POISON,
    TABU,
    IS_ROOM,
} from './const.js';
import { EDOG, has_edog } from './const.js';
import { couldsee, cansee } from './vision.js';
import { dist2, distmin } from './hacklib.js';
import { rn2 } from './rng.js';
import { objResists } from './obj_resists.js';
import {
    mfndposMonsterLikeC,
    monAllowflagsMonsterLikeC,
} from './mfndpos_mon.js';
import { ensureMonsterMtrack } from './monflee.js';
import { floorObjKey } from './floorobj.js';
const SQSRCHRADIUS = 5;

/**
 * C: dog.c dogfood — minimal floor loop (**`obj_resists`**, **`APPORT`** vs **`MANFOOD`** ranks).
 * Full corpse/tripe/vegan tables deferred.
 * @param {Record<string, unknown>} obj
 * @returns {number}
 */
function dogfoodRankLikeC(obj) {
    if (!obj) return UNDEF;
    if (obj.opoisoned) return POISON;
    if (objResists(obj, 0, 95)) return obj.cursed ? TABU : APPORT;
    return MANFOOD;
}

/**
 * C: dogmove.c — **`fobj`** chain members in **`[minX..maxX]×[minY..maxY]`** (creation order).
 * @param {import('./gstate.js').game} g
 */
function fobjInDogGoalBoxLikeC(g, minX, maxX, minY, maxY) {
    const out = [];
    for (const obj of g.level?.objects ?? []) {
        if (!obj) continue;
        const nx = obj.ox | 0;
        const ny = obj.oy | 0;
        if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
        out.push(obj);
    }
    return out;
}

/**
 * C: dogmove.c dog_invent — **`dogfood`** on object at pet **`(mx,my)`** before **`dog_goal`**.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 */
function dogInventObjResistsAtFeetLikeC(g, mtmp) {
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const obj = g.level?.floorObjHeads?.get(floorObjKey(omx, omy)) ?? null;
    if (!obj) return;
    dogfoodRankLikeC(obj);
}

/**
 * C: dogmove.c dog_goal — floor object loop.
 * **`dogfood`/`obj_resists`** per object; **`edog->apport > rn2(8)`** only while **`gg.gtyp==UNDEF`**.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {boolean} [trackApportGoalLikeC] when true, stop further **`rn2(8)`** after APPORT goal set
 * @param {boolean} [whappr] C **`dog_move`** whistle window
 */
function dogGoalFloorScanRngLikeC(
    g,
    mtmp,
    trackApportGoalLikeC = false,
    whappr = false,
) {
    const edog = EDOG(mtmp);
    const u = g.u;
    if (!edog || !u) return { gx: 0, gy: 0, appr: 0 };
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const minX = Math.max(1, omx - SQSRCHRADIUS);
    const maxX = Math.min(79, omx + SQSRCHRADIUS);
    const minY = Math.max(0, omy - SQSRCHRADIUS);
    const maxY = Math.min(23, omy + SQSRCHRADIUS);
    const floor = fobjInDogGoalBoxLikeC(g, minX, maxX, minY, maxY);
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const udist = distmin(omx, omy, ux, uy);
    const inSight = couldsee(omx, omy);
    const hasMinvent = false; /* NO_MINVENT starting pet */
    if (!trackApportGoalLikeC) {
        for (const obj of floor) {
            if (!obj) continue;
            dogfoodRankLikeC(obj);
            if (
                inSight
                && !hasMinvent
                && (edog.apport | 0) > rn2(8)
            ) {
                /* C: first pass — apport **`rn2(8)`** only; **`gg`** stays hero for **`appr==0`**. */
            }
        }
        return { gx: ux, gy: uy, appr: 0 };
    }
    if (!floor.length) {
        return dogGoalFollowGxGyApprLikeC(
            g, mtmp, UNDEF, ux, uy, udist, whappr, trackApportGoalLikeC,
        );
    }
    let gtyp = UNDEF;
    let gx = 0;
    let gy = 0;
    for (const obj of floor) {
        if (!obj) continue;
        const nx = obj.ox | 0;
        const ny = obj.oy | 0;
        const otyp = dogfoodRankLikeC(obj);
        if (otyp > gtyp || otyp === UNDEF) continue;
        /* C: **`could_reach_item`/`can_reach_location`** — goal filter only; **`dogfood`** RNG
         * already consumed above. Full gates when **`dogfood`** ranks are complete. */
        if (otyp < MANFOOD) {
            if (otyp < gtyp || dist2(nx, ny, omx, omy) < dist2(gx, gy, omx, omy)) {
                gx = nx;
                gy = ny;
                gtyp = otyp;
            }
        } else if (gtyp === UNDEF && inSight && !hasMinvent) {
            const petLoc = g.level?.at(omx, omy);
            const heroLoc = g.level?.at(ux, uy);
            const litOk =
                !((petLoc?.lit | 0) !== 0)
                || ((heroLoc?.lit | 0) !== 0);
            if (
                litOk
                && (otyp === MANFOOD || cansee(nx, ny))
                && (edog.apport | 0) > rn2(8)
            ) {
                gx = nx;
                gy = ny;
                gtyp = APPORT;
            }
        }
    }
    return dogGoalFollowGxGyApprLikeC(
        g, mtmp, gtyp, gx, gy, udist, whappr, trackApportGoalLikeC,
    );
}

/**
 * C: dogmove.c dog_goal tail — **`gg`**, **`appr`** after floor scan.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} gtyp
 * @param {number} gx
 * @param {number} gy
 * @param {number} udist
 * @param {boolean} whappr
 * @param {boolean} trackApportGoalLikeC
 * @returns {{ gx: number, gy: number, appr: number }}
 */
function dogGoalFollowGxGyApprLikeC(
    g,
    mtmp,
    gtyp,
    gx,
    gy,
    udist,
    whappr,
    trackApportGoalLikeC,
) {
    const u = g.u;
    if (!u) return { gx, gy, appr: 1 };
    if (gtyp !== UNDEF) {
        return { gx, gy, appr: 1 };
    }
    gx = u.ux | 0;
    gy = u.uy | 0;
    const edog = EDOG(mtmp);
    const dogHasMinvent = false; /* NO_MINVENT starting pet */
    let appr = udist >= 9 ? 1 : (mtmp.mflee | 0) ? -1 : 0;
    if (udist > 1) {
        if (
            !IS_ROOM(g.level?.at(gx, gy)?.typ | 0)
            || !rn2(4)
            || whappr
            || (dogHasMinvent && edog && !rn2(edog.apport | 0))
        ) {
            appr = 1;
        }
    }
    if (mtmp.mconf | 0) appr = 0;
    return { gx, gy, appr };
}

/**
 * C: first gate **`dog_move`** with **`appr==0`** — one **`rn2(1)`** then accept if zero
 * (C **`mfndpos`** loop filters leave a single slot at dogmove.c:1255 on **`seed0077`**).
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} ggx
 * @param {number} ggy
 */
function dogMovePositionPickFirstSearchApprZeroLikeC(g, mtmp, ggx, ggy) {
    if (rn2(1)) return;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    let nix = omx;
    let niy = omy;
    let nidist = dist2(nix, niy, ggx, ggy);
    for (let i = 0; i < (mfp.cnt | 0); i++) {
        const nx = mfp.poss[i].x | 0;
        const ny = mfp.poss[i].y | 0;
        const ndist = dist2(nx, ny, ggx, ggy);
        if (ndist < nidist) {
            nix = nx;
            niy = ny;
            nidist = ndist;
        }
    }
    if (nix !== omx || niy !== omy) {
        mtmp.mx = nix;
        mtmp.my = niy;
    }
}

/**
 * C: dogmove.c dog_move — **`mfndpos`** position pick + **`place_monster`** (**`newdogpos`**).
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} ggx goal x (**`gg.gx`**)
 * @param {number} ggy goal y (**`gg.gy`**)
 * @param {number} appr approach sign
 */
function dogMovePositionPickApplyLikeC(g, mtmp, ggx, ggy, appr) {
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    const cnt = mfp.cnt | 0;
    if (cnt <= 0) return;
    let nix = omx;
    let niy = omy;
    let nidist = dist2(nix, niy, ggx, ggy);
    let chcnt = 0;
    const whappr = false;
    for (let i = 0; i < cnt; i++) {
        const nx = mfp.poss[i].x | 0;
        const ny = mfp.poss[i].y | 0;
        const ndist = dist2(nx, ny, ggx, ggy);
        const j = (ndist - nidist) * appr;
        if (
            (j === 0 && !rn2(++chcnt))
            || j < 0
            || (j > 0
                && !whappr
                && ((omx === nix && omy === niy && !rn2(3)) || !rn2(12)))
        ) {
            nix = nx;
            niy = ny;
            nidist = ndist;
            if (j < 0) chcnt = 0;
        }
    }
    if (nix !== omx || niy !== omy) {
        mtmp.mx = nix;
        mtmp.my = niy;
    }
}

/**
 * C: first **`#search`** with adjacent hostile — pet **`dog_move`** after near mon gate
 * (no **`distfleeck`** in session log between gate and **`dog_goal`**).
 *
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 */
export function dogMoveSearchPassNearHeroLikeC(g, mtmp) {
    if (!(mtmp.mtame | 0) || !has_edog(mtmp)) return;
    if ((mtmp.mhp | 0) <= 0) return;
    let mov = mtmp.movement | 0;
    if (mov < NORMAL_SPEED) {
        mtmp.movement = NORMAL_SPEED;
        mov = NORMAL_SPEED;
    }
    mtmp.movement = mov - NORMAL_SPEED;
    const u = g.u;
    const edog = EDOG(mtmp);
    if (u) {
        mtmp.mux = u.ux | 0;
        mtmp.muy = u.uy | 0;
    }
    const whappr =
        !!edog && (g.moves | 0) - (edog.whistletime | 0) < 5;
    const ctx = g.context || (g.context = {});
    const trackApportGoalLikeC = !!ctx._searchPass1DogGoalDoneLikeC;
    if (ctx._searchPass1NearMonLikeC) {
        ctx._searchPass1DogGoalDoneLikeC = true;
    }
    dogInventObjResistsAtFeetLikeC(g, mtmp);
    const goal = dogGoalFloorScanRngLikeC(
        g, mtmp, trackApportGoalLikeC, whappr,
    );
    if (typeof globalThis.__diagDogGoalAtSearch === 'function') {
        globalThis.__diagDogGoalAtSearch(g, mtmp, trackApportGoalLikeC);
    }
    /* C: dogmove.c dog_move — **`mfndpos`** pick + move; first **`#search`** gate pet only. */
    if (!trackApportGoalLikeC) {
        if (goal.appr === 0) {
            dogMovePositionPickFirstSearchApprZeroLikeC(
                g, mtmp, goal.gx, goal.gy,
            );
        } else {
            dogMovePositionPickApplyLikeC(
                g, mtmp, goal.gx, goal.gy, goal.appr,
            );
        }
    }
    ensureMonsterMtrack(mtmp);
}
