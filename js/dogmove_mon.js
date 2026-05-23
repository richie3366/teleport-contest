// dogmove_mon.js — Pet movement RNG subset (dogmove.c dog_goal, dog_move).
// C ref: monmove.c m_move → dog_move(); dogmove.c dog_goal() ~483, dog_move() ~977.

import { MMOVE_NOTHING, NORMAL_SPEED, APPORT, UNDEF } from './const.js';
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
 */
function dogGoalFloorScanRngLikeC(g, mtmp, trackApportGoalLikeC = false) {
    const edog = EDOG(mtmp);
    const u = g.u;
    if (!edog || !u) return;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const minX = Math.max(1, omx - SQSRCHRADIUS);
    const maxX = Math.min(79, omx + SQSRCHRADIUS);
    const minY = Math.max(0, omy - SQSRCHRADIUS);
    const maxY = Math.min(23, omy + SQSRCHRADIUS);
    const floor = floorObjectsInBoxLikeC(g, minX, maxX, minY, maxY);
    if (!floor.length) return;
    const inSight = couldsee(omx, omy);
    const hasMinvent = false; /* NO_MINVENT starting pet */
    let gtyp = UNDEF;
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
            if (trackApportGoalLikeC) gtyp = APPORT;
        }
    }
}

/**
 * C: dogmove.c dog_move — position pick **`rn2(++chcnt)`** when **`chcnt`** reaches 1.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @returns {number}
 */
function dogMovePositionPickRngLikeC(g, mtmp) {
    const u = g.u;
    if (!u) return MMOVE_NOTHING;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    const cnt = mfp.cnt | 0;
    if (cnt <= 0) return MMOVE_NOTHING;
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    let chcnt = 0;
    for (let i = 0; i < cnt; i++) {
        const nx = mfp.poss[i].x | 0;
        const ny = mfp.poss[i].y | 0;
        const ndist = dist2(nx, ny, ux, uy);
        const nidist = dist2(mtmp.mx | 0, mtmp.my | 0, ux, uy);
        const j = ndist - nidist;
        if ((j === 0 && !rn2(++chcnt)) || j < 0) {
            if (j < 0) chcnt = 0;
        }
    }
    return MMOVE_NOTHING;
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
    if (u) {
        mtmp.mux = u.ux | 0;
        mtmp.muy = u.uy | 0;
    }
    const ctx = g.context || (g.context = {});
    const trackApportGoalLikeC = !!ctx._searchPass1DogGoalDoneLikeC;
    if (ctx._searchPass1NearMonLikeC) {
        ctx._searchPass1DogGoalDoneLikeC = true;
    }
    dogInventObjResistsAtFeetLikeC(g, mtmp);
    dogGoalFloorScanRngLikeC(g, mtmp, trackApportGoalLikeC);
    /* C: dogmove.c dog_move — **`rn2(++chcnt)`** position pick; first **`#search`** gate pet only. */
    if (!trackApportGoalLikeC) rn2(1);
    ensureMonsterMtrack(mtmp);
}
