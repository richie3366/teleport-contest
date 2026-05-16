// distfleeck_mon.js — Monster flee-from-hero checks (monmove.c distfleeck + onscary).
// C ref: monmove.c distfleeck(), onscary(); engrave.c sengr_at(); monst.h is_vampshifter.

import { BOLT_LIM, IS_ALTAR, In_endgame, A_LAWFUL } from './const.js';
import { rn2, rnd } from './rng.js';
import { monflee } from './monflee.js';
import { monnearMonsterXYLikeC } from './mon_geom.js';
import { dist2 } from './hacklib.js';
import { sengrAtLikeC } from './engrave.js';
import { levlTypAt } from './decor.js';
import { raceptr, isRiderMnum } from './mondata.js';
import { inHishop } from './shop.js';

/** C: objects.h — **`SCR_SCARE_MONSTER`** otyp (NH 5.0). */
const OTYP_SCR_SCARE_MONSTER = 279;

/** C: monflag.h **`G_UNIQ`** — **`unique_corpstat`** (mondata.h). */
const G_UNIQ = 0x1000;

/** C: **`mons[]`** indices from **`include/monsters.h`** MON order (NH 5.0). */
const PM_ANGEL = 122;
const PM_MINOTAUR = 176;
const PM_VAMPIRE = 224;
const PM_VAMPIRE_LEADER = 225;
const PM_VLAD_THE_IMPALER = 226;

/** C: defsym.h **`MONSYM(..., VAMPIRE, S_VAMPIRE, ...)`**. */
const S_VAMPIRE = 48;
/** C: defsym.h **`MONSYM(..., HUMAN, S_HUMAN, ...)`** — human or elf class letter **@**. */
const S_HUMAN_MONSYM = 53;

/** C: monflag.h **`M1_SEE_INVIS`** — **`perceives`** for **`Invis`** vs displaced hero in **`distfleeck`**. */
const M1_SEE_INVIS = 0x01000000;

function heroInvisLikeC(u) {
    if (!u) return false;
    return !!((u.HInvis | 0) || (u.EInvis | 0) || (u.BInvis | 0));
}

function perceivesDataLikeC(data) {
    return ((data?.mflags1 ?? 0) & M1_SEE_INVIS) !== 0;
}

function uniqueCorpstatLikeC(ptr) {
    return ((ptr?.geno ?? 0) & G_UNIQ) !== 0;
}

/**
 * C: monst.h **`is_vampshifter(mon)`** — **`cham`** targets (**subset**: fixed **`PM_*`** indices).
 * @param {Record<string, unknown>} mtmp
 */
export function isVampshifterMonsterLikeC(mtmp) {
    const c = mtmp?.cham | 0;
    return c === PM_VAMPIRE || c === PM_VAMPIRE_LEADER || c === PM_VLAD_THE_IMPALER;
}

function monAligntypMonsterLikeC(mtmp) {
    if (typeof mtmp?.maligntyp === 'number') return mtmp.maligntyp | 0;
    const a = raceptr(mtmp)?.maligntyp;
    return typeof a === 'number' ? a | 0 : 0;
}

/**
 * C: monst.h **`is_lminion(mon)`** — **`is_minion`** && lawful (**`mon_aligntyp`** **==** **`A_LAWFUL`**).
 * @param {Record<string, unknown>} mtmp
 */
export function isLminionMonsterSubsetLikeC(mtmp) {
    if (!(mtmp?.isminion | 0)) return false;
    return monAligntypMonsterLikeC(mtmp) === A_LAWFUL;
}

function sobjScareMonsterAtLikeC(g, x, y) {
    for (const o of g.level?.objects ?? []) {
        if ((o.ox | 0) === (x | 0) && (o.oy | 0) === (y | 0) && (o.otyp | 0) === OTYP_SCR_SCARE_MONSTER) return true;
    }
    return false;
}

function vobjAtLikeC(g, x, y) {
    for (const o of g.level?.objects ?? []) {
        if ((o.ox | 0) === (x | 0) && (o.oy | 0) === (y | 0)) return true;
    }
    return false;
}

function uAtLikeC(u, x, y) {
    if (!u) return false;
    return (u.ux | 0) === (x | 0) && (u.uy | 0) === (y | 0);
}

/**
 * C: monmove.c **`onscary(coordxy x, coordxy y, struct monst *mtmp)`**.
 * Omits **`inhistemple`** (no **`inhishop`**-equivalent for priests yet); **`Inhell`** stub false.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} mtmp
 */
export function onScaryMonsterLikeC(g, x, y, mtmp) {
    const xi = x | 0;
    const yi = y | 0;
    const auditory_scare = xi === 0 && yi === 0;
    const magical_scare = !auditory_scare;
    const ptr = raceptr(mtmp);
    const mnum = ptr?.mnum | 0;

    if ((mtmp?.iswiz | 0) || isLminionMonsterSubsetLikeC(mtmp) || mnum === PM_ANGEL || isRiderMnum(mnum)) {
        return false;
    }

    if (magical_scare && ((ptr?.mlet | 0) === S_HUMAN_MONSYM || uniqueCorpstatLikeC(ptr))) return false;

    if ((mtmp?.isshk | 0) && inHishop(g, mtmp)) return false;
    /* C: **`ispriest && inhistemple`** — **`inhistemple`** not ported. */

    if (auditory_scare) return true;

    const typ = levlTypAt(xi, yi) | 0;
    if (IS_ALTAR(typ) && ((ptr?.mlet | 0) === S_VAMPIRE || isVampshifterMonsterLikeC(mtmp))) return true;

    if (sobjScareMonsterAtLikeC(g, xi, yi)) return true;

    const ep = sengrAtLikeC(g, 'Elbereth', xi, yi, true);
    if (!ep) return false;

    const u = g?.u;
    const displaced = (u?.Displaced | 0) !== 0;
    const mux = mtmp.mux !== undefined && mtmp.mux !== null ? mtmp.mux | 0 : u?.ux | 0;
    const muy = mtmp.muy !== undefined && mtmp.muy !== null ? mtmp.muy | 0 : u?.uy | 0;

    const onElberethSquare =
        uAtLikeC(u, xi, yi) || (displaced && mux === xi && muy === yi) || ((ep.guardobjects | 0) && vobjAtLikeC(g, xi, yi));

    if (
        !onElberethSquare
        || (mtmp?.isshk | 0)
        || (mtmp?.isgd | 0)
        || !(mtmp?.mcansee | 0)
        || (mtmp?.mpeaceful | 0)
        || mnum === PM_MINOTAUR
        || false /* Inhell */
        || In_endgame(u?.uz)
    ) {
        return false;
    }
    return true;
}

/** @deprecated Prefer **`onScaryMonsterLikeC`** (full **`onscary`** port). */
export function onScarySquareMonsterSubsetLikeC(g, x, y, mtmp) {
    return onScaryMonsterLikeC(g, x, y, mtmp);
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

    const sawscary = onScaryMonsterLikeC(g, seescaryx, seescaryy, mtmp);
    const flees = fleesLightMonsterSubsetLikeC(g, mtmp);
    const sanct = inYourSanctuaryMonsterSubsetLikeC(g, mtmp);

    if (out.nearby && (sawscary || (flees && !bravegremlin) || (!(mtmp.mpeaceful | 0) && sanct))) {
        out.scared = 1;
        const fleeRoll = rn2(7) ? 10 : 100;
        await monflee(g, mtmp, rnd(fleeRoll), true, true);
    } else {
        out.scared = 0;
    }
    return out;
}
