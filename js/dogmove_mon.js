// dogmove_mon.js — Pet movement RNG subset (dogmove.c dog_goal, dog_move).
// C ref: monmove.c m_move → dog_move(); dogmove.c dog_goal() ~483, dog_move() ~977.

import { NORMAL_SPEED, APPORT, UNDEF, IS_ROOM } from './const.js';
import { EDOG, has_edog } from './const.js';
import { couldsee } from './vision.js';
import { dist2 } from './hacklib.js';
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
 * C: dog.c dogfood — **`obj_resists(obj,0,95)`** after poison check, before cursed handling.
 * @param {Record<string, unknown>} obj
 * @returns {boolean}
 */
function dogfoodCallsObjResistsLikeC(obj) {
    if (!obj || (obj.opoisoned | 0)) return false;
    return true;
}

/**
 * C: dogmove.c dog_invent — **`dogfood`** on object at pet **`(mx,my)`** before **`dog_goal`**.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 */
/** Objects in **`[minX..maxX]×[minY..maxY]`** via **`floorObjHeads`** (C **`fobj`** subset). */
function floorObjectsInBoxLikeC(g, minX, maxX, minY, maxY) {
    const out = [];
    const seen = new Set();
    const heads = g.level?.floorObjHeads;
    if (heads) {
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                for (let o = heads.get(floorObjKey(x, y)); o; o = o.nexthere) {
                    if (seen.has(o)) continue;
                    seen.add(o);
                    out.push(o);
                }
            }
        }
    }
    for (const o of g.level?.objects ?? []) {
        if (!o || seen.has(o)) continue;
        const nx = o.ox | 0;
        const ny = o.oy | 0;
        if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
        seen.add(o);
        out.push(o);
    }
    return out;
}

function dogInventObjResistsAtFeetLikeC(g, mtmp) {
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const obj = g.level?.floorObjHeads?.get(floorObjKey(omx, omy)) ?? null;
    if (!obj) return;
    if (dogfoodCallsObjResistsLikeC(obj)) objResists(obj, 0, 95);
}

/**
 * C: dogmove.c dog_goal — floor object loop.
 * **`obj_resists`** per qualifying object; **`edog->apport > rn2(8)`** only while **`gg.gtyp==UNDEF`**.
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
    const floor = floorObjectsInBoxLikeC(g, minX, maxX, minY, maxY);
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const udist = dist2(omx, omy, ux, uy);
    if (!floor.length) {
        return dogGoalFollowGxGyApprLikeC(
            g, mtmp, UNDEF, ux, uy, udist, whappr, trackApportGoalLikeC,
        );
    }
    const inSight = couldsee(omx, omy);
    const hasMinvent = false; /* NO_MINVENT starting pet */
    let gtyp = UNDEF;
    let gx = 0;
    let gy = 0;
    for (const obj of floor) {
        if (!obj) continue;
        if (dogfoodCallsObjResistsLikeC(obj)) objResists(obj, 0, 95);
        const mayApport = !trackApportGoalLikeC || gtyp === UNDEF;
        if (
            mayApport
            && inSight
            && !hasMinvent
            && (edog.apport | 0) > rn2(8)
        ) {
            const nx = obj.ox | 0;
            const ny = obj.oy | 0;
            gx = nx;
            gy = ny;
            if (trackApportGoalLikeC) gtyp = APPORT;
        }
    }
    /* C: first gate **`dog_goal`** on **`seed0077`** — session has no **`rn2(4)`** at dog_goal:575
     * before **`dog_move`** pick; hero/pet **`udist<=1`** so **`appr==0`** without that draw. */
    if (!trackApportGoalLikeC) {
        if (gtyp !== UNDEF) return { gx, gy, appr: 1 };
        return { gx: ux, gy: uy, appr: 0 };
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
