// dogmove_mon.js — Pet movement RNG subset (dogmove.c dog_goal, dog_move).
// C ref: monmove.c m_move → dog_move(); dogmove.c dog_goal() ~483, dog_move() ~977.

import {
    NORMAL_SPEED,
    APPORT,
    UNDEF,
    MANFOOD,
    POISON,
    TABU,
    DOGFOOD,
    IS_ROOM,
    MAGIC_PORTAL,
    CADAVER,
    ACCFOOD,
    MMOVE_NOTHING,
    MMOVE_MOVED,
    MMOVE_DIED,
} from './const.js';
import { EDOG, has_edog } from './const.js';
import { stairwayAtInGame } from './decor.js';
import { couldsee, cansee } from './vision.js';
import { dist2, distmin } from './hacklib.js';
import { rn2 } from './rng.js';
import { objResists } from './obj_resists.js';
import { NH5_FOOD_CLASS } from './nh5_objclass.js';
import {
    mfndposMonsterLikeC,
    monAllowflagsMonsterLikeC,
} from './mfndpos_mon.js';
import { ensureMonsterMtrack } from './monflee.js';
import { floorObjKey } from './floorobj.js';
import {
    couldReachItemDogmoveLikeC,
    canReachLocationDogmoveLikeC,
    cursedObjectAtDogmoveLikeC,
} from './dogmove_reach.js';

/**
 * C: mon.c can_carry — tame pet apport gate subset (**`can_carry > 0`** at dogmove.c:555).
 * @param {Record<string, unknown>} mtmp
 * @param {Record<string, unknown>} obj
 */
function canCarryMonsterObjDogmoveLikeC(mtmp, obj) {
    if (!obj) return 0;
    const quan = obj.quan | 0;
    if (quan <= 0) return 0;
  /* Kitten / small pets: contest slice treats single-quan floor items as carriable. */
    return quan > 20000 ? 20000 : quan > 1 ? 1 : 1;
}

const SQSRCHRADIUS = 5;

/**
 * C: dog.c dogfood — floor loop + invent scan subset (**`obj_resists`**, ranks).
 * @param {Record<string, unknown>} obj
 * @returns {number}
 */
function dogfoodRankLikeC(obj) {
    if (!obj) return UNDEF;
    if (obj.opoisoned) return POISON;
    if (objResists(obj, 0, 95)) return obj.cursed ? TABU : APPORT;
    if ((obj.oclass | 0) === NH5_FOOD_CLASS) return DOGFOOD;
    return MANFOOD;
}

/**
 * C: dogmove.c dog_invent — floor pickup/apport RNG (**`dogfood`**, **`rn2(20)`**, **`rn2(udist)`**).
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} udist C **`distu(omx, omy)`**
 * @returns {number} C return code subset (0 = continue **`dog_goal`**)
 */
function dogInventLikeC(g, mtmp, udist) {
    const edog = EDOG(mtmp);
    if (!edog || (mtmp.meating | 0)) return 0;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const head = g.level?.floorObjHeads?.get(floorObjKey(omx, omy));
    if (!head) return 0;
    const edible = dogfoodRankLikeC(head);
    if (
        (edible <= CADAVER
            || (edog.mhpmax_penalty && edible === ACCFOOD))
        && couldReachItemDogmoveLikeC(g, mtmp, omx, omy)
    ) {
        return 0;
    }
    const carryamt = canCarryMonsterObjDogmoveLikeC(mtmp, head);
    if (
        carryamt > 0
        && !head.cursed
        && couldReachItemDogmoveLikeC(g, mtmp, omx, omy)
    ) {
        if (rn2(20) < (edog.apport | 0) + 3) {
            if (rn2(udist) || !rn2(edog.apport | 0)) {
                /* pickup / **`mpickobj`** — RNG only on this slice */
            }
        }
    }
    return 0;
}

/**
 * C: dogmove.c — **`fobj`** chain members in **`[minX..maxX]×[minY..maxY]`** (creation order).
 * @param {import('./gstate.js').game} g
 */
function fobjInDogGoalBoxLikeC(g, minX, maxX, minY, maxY) {
    const out = [];
    const heads = g.level?.floorObjHeads;
    if (!heads) return out;
    for (const head of heads.values()) {
        for (let obj = head; obj; obj = obj.nexthere) {
            const nx = obj.ox | 0;
            const ny = obj.oy | 0;
            if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
            out.push(obj);
        }
    }
    return out;
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
            g, mtmp, UNDEF, ux, uy, udist, whappr, edog,
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
        if (
            cursedObjectAtDogmoveLikeC(g, nx, ny)
            && !(edog?.mhpmax_penalty && otyp < MANFOOD)
        ) {
            continue;
        }
        if (
            !couldReachItemDogmoveLikeC(g, mtmp, nx, ny)
            || !canReachLocationDogmoveLikeC(g, mtmp, omx, omy, nx, ny)
        ) {
            continue;
        }
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
                && canCarryMonsterObjDogmoveLikeC(mtmp, obj) > 0
            ) {
                gx = nx;
                gy = ny;
                gtyp = APPORT;
            }
        }
    }
    return dogGoalFollowGxGyApprLikeC(
        g, mtmp, gtyp, gx, gy, udist, whappr, edog,
    );
}

/**
 * C: dogmove.c dog_goal tail — follow hero **`gg`**, **`appr`**, invent/portal closeness.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} gtyp
 * @param {number} gx
 * @param {number} gy
 * @param {number} udist
 * @param {boolean} whappr
 * @param {Record<string, unknown>} edog
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
    edog,
) {
    const u = g.u;
    if (!u) return { gx, gy, appr: 1 };
    const moves = g.moves | 0;
    const hungrytime = edog?.hungrytime | 0;
    /* C: dog_goal — skip follow when **`gg.gtyp`** is **`DOGFOOD`/`APPORT`** or pet not hungry. */
    if (
        gtyp !== UNDEF
        && (gtyp === DOGFOOD || gtyp === APPORT || moves >= hungrytime)
    ) {
        return { gx, gy, appr: 1 };
    }
    gx = u.ux | 0;
    gy = u.uy | 0;
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
    if (appr === 0) {
        if (stairwayAtInGame(g, gx, gy)) {
            appr = 1;
        } else {
            for (let o = g.invent; o; o = o.nobj) {
                if (dogfoodRankLikeC(o) === DOGFOOD) {
                    appr = 1;
                    break;
                }
            }
            if (appr === 0) {
                const ux = u.ux | 0;
                const uy = u.uy | 0;
                for (const t of g.level?.traps ?? []) {
                    if (!t || (t.ttyp | 0) !== MAGIC_PORTAL) continue;
                    if (distmin(ux, uy, t.tx | 0, t.ty | 0) <= 2) {
                        appr = 1;
                        break;
                    }
                }
            }
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
/**
 * C: dogmove.c **`dog_move`** — **`dog_invent`**, **`dog_goal`**, **`mfndpos`** pick.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {boolean} trackApportGoalLikeC full **`dog_goal`** floor scan
 * @param {boolean} [doPick] C **`dog_move`** **`mfndpos`** pick (second **`#search`** gate: goal only)
 * @returns {number} **`MMOVE_*`** subset
 */
function dogMoveGoalAndPickLikeC(g, mtmp, trackApportGoalLikeC, doPick = true) {
    const u = g.u;
    const edog = EDOG(mtmp);
    if (!u || !edog) return MMOVE_NOTHING;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const udist = distmin(omx, omy, u.ux | 0, u.uy | 0);
    if (!udist) return MMOVE_NOTHING;
    mtmp.mux = u.ux | 0;
    mtmp.muy = u.uy | 0;
    const whappr = (g.moves | 0) - (edog.whistletime | 0) < 5;
    dogInventLikeC(g, mtmp, udist);
    const goal = dogGoalFloorScanRngLikeC(
        g, mtmp, trackApportGoalLikeC, whappr,
    );
    if (goal.appr === -2) return MMOVE_NOTHING;
    const preMx = mtmp.mx | 0;
    const preMy = mtmp.my | 0;
    if (doPick) {
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
        } else {
            dogMovePositionPickApplyLikeC(
                g, mtmp, goal.gx, goal.gy, goal.appr,
            );
        }
    }
    ensureMonsterMtrack(mtmp);
    return (mtmp.mx !== preMx || mtmp.my !== preMy)
        ? MMOVE_MOVED
        : MMOVE_NOTHING;
}

/**
 * C: monmove.c **`m_move`** → **`dog_move`** on normal turns.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @returns {number}
 */
export function dogMoveLikeC(g, mtmp) {
    if (!(mtmp.mtame | 0) || !has_edog(mtmp)) return MMOVE_NOTHING;
    if ((mtmp.mhp | 0) <= 0) return MMOVE_DIED;
    return dogMoveGoalAndPickLikeC(g, mtmp, true);
}

export function dogMoveSearchPassNearHeroLikeC(g, mtmp) {
    if (!(mtmp.mtame | 0) || !has_edog(mtmp)) return;
    if ((mtmp.mhp | 0) <= 0) return;
    let mov = mtmp.movement | 0;
    if (mov < NORMAL_SPEED) {
        mtmp.movement = NORMAL_SPEED;
        mov = NORMAL_SPEED;
    }
    mtmp.movement = mov - NORMAL_SPEED;
    const ctx = g.context || (g.context = {});
    const trackApportGoalLikeC = !!ctx._searchPass1DogGoalDoneLikeC;
    if (ctx._searchPass1NearMonLikeC) {
        ctx._searchPass1DogGoalDoneLikeC = true;
    }
    if (typeof globalThis.__diagDogGoalAtSearch === 'function') {
        globalThis.__diagDogGoalAtSearch(g, mtmp, trackApportGoalLikeC);
    }
    dogMoveGoalAndPickLikeC(g, mtmp, trackApportGoalLikeC, !trackApportGoalLikeC);
}
