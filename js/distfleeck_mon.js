// distfleeck_mon.js — Monster flee-from-hero checks (monmove.c distfleeck + onscary subset).
// C ref: monmove.c distfleeck(), onscary() (scare-monster scroll on square only for now).

import { BOLT_LIM } from './const.js';
import { rn2, rnd } from './rng.js';
import { monflee } from './monflee.js';
import { monnearMonsterXYLikeC } from './mon_geom.js';
import { dist2 } from './hacklib.js';

/** C: objects.h — **`SCR_SCARE_MONSTER`** otyp (NH 5.0). */
const OTYP_SCR_SCARE_MONSTER = 279;

/** C: monflag.h **`M1_SEE_INVIS`** — **`perceives`** for **`Invis`** vs displaced hero in **`distfleeck`**. */
const M1_SEE_INVIS = 0x01000000;

function heroInvisLikeC(u) {
    if (!u) return false;
    return !!((u.HInvis | 0) || (u.EInvis | 0) || (u.BInvis | 0));
}

function perceivesDataLikeC(data) {
    return ((data?.mflags1 ?? 0) & M1_SEE_INVIS) !== 0;
}

/**
 * C: **`onscary`** subset — **`sobj_at(SCR_SCARE_MONSTER, x, y)`** only.
 * Omits Elbereth **`sengr_at`**, auditory **(0,0)**, rider/minion/shop/temple/altar/vampire, humans.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} _mtmp
 */
export function onScarySquareMonsterSubsetLikeC(g, x, y, _mtmp) {
    for (const o of g.level?.objects ?? []) {
        if ((o.ox | 0) === (x | 0) && (o.oy | 0) === (y | 0) && (o.otyp | 0) === OTYP_SCR_SCARE_MONSTER) return true;
    }
    return false;
}

/**
 * C: monmove.c **`flees_light(mtmp)`** — gremlin vs lit artifacts (**subset**: always false until **`artifact_light`** port).
 */
export function fleesLightMonsterSubsetLikeC(_g, _mtmp) {
    return false;
}

/**
 * C: monmove.c **`in_your_sanctuary(mtmp,0,0)`** — not ported; always false.
 */
export function inYourSanctuaryMonsterSubsetLikeC(_g, _mtmp) {
    return false;
}

/**
 * C: monmove.c **`distfleeck(mtmp, &inrange, &nearby, &scared)`** — **`bravegremlin`**, geometry,
 * **`onscary`/`flees_light`/`in_your_sanctuary`**, then **`monflee`** when **`scared`**.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @returns {{ inrange: number, nearby: number, scared: number }}
 */
export async function distfleeckMonsterApplyLikeC(g, mtmp) {
    const out = { inrange: 0, nearby: 0, scared: 0 };
    if (!mtmp) return out;

    const bravegremlin = rn2(5) === 0;

    const u = g?.u;
    const mux = mtmp.mux !== undefined && mtmp.mux !== null ? mtmp.mux | 0 : u?.ux | 0;
    const muy = mtmp.muy !== undefined && mtmp.muy !== null ? mtmp.muy | 0 : u?.uy | 0;
    const bx = mtmp.mx | 0;
    const by = mtmp.my | 0;

    const boltLimSq = BOLT_LIM * BOLT_LIM;
    out.inrange = dist2(bx, by, mux, muy) <= boltLimSq ? 1 : 0;
    out.nearby = out.inrange && monnearMonsterXYLikeC(mtmp, mux, muy) ? 1 : 0;

    let seescaryx;
    let seescaryy;
    if (!(mtmp.mcansee | 0) || (heroInvisLikeC(u) && !perceivesDataLikeC(mtmp.data))) {
        seescaryx = mux;
        seescaryy = muy;
    } else {
        seescaryx = u?.ux | 0;
        seescaryy = u?.uy | 0;
    }

    const sawscary = onScarySquareMonsterSubsetLikeC(g, seescaryx, seescaryy, mtmp);
    const flees = fleesLightMonsterSubsetLikeC(g, mtmp);
    const sanct = inYourSanctuaryMonsterSubsetLikeC(g, mtmp);

    if (
        out.nearby
        && (sawscary || (flees && !bravegremlin) || (!(mtmp.mpeaceful | 0) && sanct))
    ) {
        out.scared = 1;
        const fleeRoll = rn2(7) ? 10 : 100;
        await monflee(g, mtmp, rnd(fleeRoll), true, true);
    } else {
        out.scared = 0;
    }
    return out;
}
