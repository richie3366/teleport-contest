// m_respond_mon.js — C mon.c m_respond(); monmove.c dochug callsite (~752–755).
// C ref: mon.c m_respond ~4122–4130, m_respond_shrieker ~4088–4104, wizard.c aggravate ~494–510.

import { PM_ERINYS, PM_MEDUSA, inWTowerLikeC } from './const.js';
import { gazemuMedusaMrespondMonsterLikeC } from './gazemu_mhitu.js';
import { rn2 } from './rng.js';
import { couldsee } from './vision.js';
import { raceptr } from './mondata.js';
import { mCanSeeHeroMonsterLikeC } from './mon_seen_res.js';

/** C: monflag.h `MS_SHRIEK` — shrieker / mimics-with-shriek. */
const MS_SHRIEK = 18;

/** C: apply.c `um_dist(x,y,n)` — true if `|ux-x|>n` or `|uy-y|>n` (else hero within axis box). */
function umDistLikeC(g, x, y, n) {
    const ux = g.u?.ux | 0;
    const uy = g.u?.uy | 0;
    return Math.abs(ux - (x | 0)) > n || Math.abs(uy - (y | 0)) > n;
}

function heroDeafLikeC(g) {
    return (g.u?.timed?.deaf ?? 0) > 0;
}

/** C: monst.h `STRAT_WAITFORU` | `STRAT_APPEARMSG` — cleared by aggravate(). */
const STRAT_AGGR_MASK = 0x20000000 | 0x80000000;

/**
 * C: wizard.c aggravate() — wake same W-tower region; `rn2(5)` may unfreeze immobile mons.
 * **`In_W_tower`** via **`onWTowerLevelLikeC`** / **`game.dndest`** when **`wiz*_level`** + bounds are wired.
 * @param {import('./gstate.js').game} g
 */
export function aggravateMonstersLikeC(g) {
    const mons = g.level?.monsters;
    if (!mons?.length) return;
    const ux = g.u?.ux | 0;
    const uy = g.u?.uy | 0;
    const inWTowerHero = inWTowerLikeC(ux, uy, g);
    for (const m of mons) {
        if ((m.mhp | 0) <= 0) continue;
        const inWTowerMon = inWTowerLikeC(m.mx | 0, m.my | 0, g);
        if (inWTowerHero !== inWTowerMon) continue;
        m.mstrategy = (m.mstrategy | 0) & ~STRAT_AGGR_MASK;
        m.msleeping = 0;
        const can = m.mcanmove === undefined ? 1 : m.mcanmove | 0;
        if (!can && !rn2(5)) {
            m.mfrozen = 0;
            m.mcanmove = 1;
        }
    }
}

/**
 * C: mon.c m_respond(mtmp) — between flee-teleport and mflee courage in dochug.
 * Medusa → **`gazemu_mhitu.js`** **`gazemuMedusaMrespondMonsterLikeC`** (**`mhitu.c`** **`gazemu`** **`AD_STON`** subset).
 * @param {import('./gstate.js').game} g
 * @param {*} mtmp
 */
export function mRespondMonsterDochugLikeC(g, mtmp) {
    if (!mtmp) return;
    const ptr = raceptr(mtmp);
    if (!ptr) return;
    const mx = mtmp.mx | 0;
    const my = mtmp.my | 0;

    if ((ptr.msound | 0) === MS_SHRIEK && !umDistLikeC(g, mx, my, 1)) {
        if (!heroDeafLikeC(g)) {
            /* C: pline + stop_occupation — display only; no RNG. */
        }
        if (!rn2(10)) {
            /* C: makemon — not ported (worm / purple worm branch). */
        }
        aggravateMonstersLikeC(g);
    }

    if ((ptr.mnum | 0) === PM_MEDUSA && couldsee(mx, my)) {
        gazemuMedusaMrespondMonsterLikeC(g, mtmp);
    }

    if ((ptr.mnum | 0) === PM_ERINYS && !(mtmp.mpeaceful | 0) && mCanSeeHeroMonsterLikeC(mtmp)) {
        aggravateMonstersLikeC(g);
    }
}
