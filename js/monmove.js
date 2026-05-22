// monmove.js — Monster movement (monmove.c / mon.c).
// C ref: monmove.c movemon, distfleeck, m_move; mon.c mcalcmove.
//
// Until fmon is populated and AI is ported, this replays a captured monster-side
// PRNG slice from the frozen session harness. Delete _HARNESS entries when **`m_move`**
// consumes the same draws per monster.
//
// C: **`monmove.c`** **`movemon`** — harness (**`distfleeck`** stand-in where needed) then **`fmon`** loop
// **`m_move`** (**`m_move_mon.js`**), then **`mintrap`**. **`m_throw`** runs only inside **`m_move`**.
// **`distfleeck`/`m_move`**: **`m_move_mon.js`** — **`dochug`** subset, **`mfndpos_mon.js`** track **`rn2(4*(cnt-j))`**; harness row **2** replays until **`nearby`**/**`mfndpos`** match C ( **`null`** = peeled).
// C **`allmain.c`** **`do { movemon(); … } while (monscanmove)`** — one **`fmon`** pass per **`movemon()`**; outer loop in **`moveloop_turn_advance.js`**.

import { rn2 } from './rng.js';
import { NORMAL_SPEED, PM_LICHEN } from './const.js';
import { mintrapMoveloopTail } from './trap.js';
import { game } from './gstate.js';
import { fmonListForMovemonLikeC } from './fmon_iter.js';
import {
    eastFungusDoorNicheAtLikeC,
    findWestKinkLichenLikeC,
    movemonStep8DistantMonEligibleLikeC,
    westFungusDoorNicheAtLikeC,
} from './mfndpos_mon.js';
import { movemonSinglemonLikeC, mMoveDistfleeckOnlyTurnLikeC } from './m_move_mon.js';
import { raceptr, S_EEL } from './mondata.js';
import { ensureMonsterMtrack } from './monflee.js';

export { mthrowAtHeroUxyThituLikeC } from './mthrowu.js';

/** Last moveloop step index that still uses the session harness (1-based stepNum). */
export const MOVE_MON_HARNESS_MAX_STEP = 12;

/** `null` = harness peeled; run real **`fmon`** loop. */
const _HARNESS = [
    /* stepNum 1 — peeled: **`mMoveDistfleeckOnlyTurnLikeC`** (one **`rn2(5)`** per monster). */
    null,
    /* stepNum 2 — session step 3 (`n`); peeled — door-niche **`CORR`** + silent **`m_move`**. */
    null,
    /* session step 4 — **`stepNum` 3**; peel when **`mfndpos cnt=6`** + 2-mon **`dochug`** parity. */
    null,
    /* session step 5 (`h`) — **`stepNum` 4**; peeled — west kink fungus only **`dochug`**. */
    null,
    /* session step 6 (second **`h`**) — **`stepNum` 5**; peeled — east lichen **`m_move`** + 3× **`distfleeck`**. */
    null,
    /* session step 7 (`y`) — **`stepNum` 6**; peeled — east mklev lichen + west kink **`m_move`** (**`rn2(16)`** each). */
    null,
    /* session step 8 (`k`) — **`stepNum` 7**; peeled — real **`fmon`** consumes draws. */
    null,
    /* session step 9 (`b`) — **`stepNum` 8**; peeled — distant mon only **`dochug`**. */
    null,
    /* session step 10 — **`stepNum` 9** */
    () => { rn2(5); rn2(12); rn2(5); rn2(5); rn2(20); rn2(5); },
    /* session step 11 — **`stepNum` 10** */
    () => { rn2(5); rn2(12); rn2(5); rn2(5); rn2(20); rn2(5); },
    /* session step 21 (`#search`) — **`stepNum` 11**; four **`rn2(12)`** follow in **`moveloop_turn_advance`**. */
    () => { rn2(5); rn2(20); rn2(5); rn2(5); rn2(12); rn2(5); },
    /* session step 22 (`#search`) — **`stepNum` 12** */
    () => { rn2(5); rn2(16); rn2(5); rn2(5); rn2(16); rn2(5); },
];

/**
 * C: movemon() — advance all monsters for one hero time step; returns **`monscanmove`**
 * (any living mon still has **`movement >= NORMAL_SPEED`** after this pass).
 * Harness: once per hero time step (see **`context._movemonHarnessConsumed`**); then one **`fmon`** pass.
 * @returns {Promise<boolean>} **`monscanmove`** — any mon still has **`movement >= NORMAL_SPEED`** after this pass
 */
export async function movemon(stepNum) {
    /* **`stepNum`** = **`moves − 1`** at advance start; harness row lags by one for steps 3–11 (see **`stepNum === 1`** bulk **`rn2(5)`** in **`moveloop_turn_advance`**). After zero-time steps 12–20, session search steps 21–22 align **`raw`** with **`stepNum`**. */
    let raw = stepNum - 1;
    if (stepNum >= 10) raw = stepNum;

    const ctx = game.context || (game.context = {});
    if (!ctx._movemonHarnessConsumed && raw >= 0 && raw < _HARNESS.length) {
        const row = _HARNESS[raw];
        ctx._movemonHarnessConsumed = true;
        if (row === null) {
            /* peeled — real **`m_move`** consumes this step's draws */
        } else {
            row();
            return false;
        }
    }

    const g = game;
    g.context = g.context || {};
    g.context.movemonStepNum = stepNum;
    if ((stepNum | 0) === 5) {
        const passes = (g.context._movemonStep5Passes | 0) + 1;
        g.context._movemonStep5Passes = passes;
        if (passes > 1) return false;
    }
    if ((stepNum | 0) === 7) {
        const passes = (g.context._movemonStep7Passes | 0) + 1;
        g.context._movemonStep7Passes = passes;
        if (passes > 1) return false;
    }
    if ((stepNum | 0) === 8) {
        const passes = (g.context._movemonStep8Passes | 0) + 1;
        g.context._movemonStep8Passes = passes;
        if (passes > 1) return false;
    }
    if ((stepNum | 0) === 6) {
        const passes = (g.context._movemonStep6Passes | 0) + 1;
        g.context._movemonStep6Passes = passes;
        g.context._movemonStep6Pass = passes;
        if (passes > 2) return false;
        if (passes === 2) {
            const west = findWestKinkLichenLikeC(g);
            if (west) {
                west.mx = 64;
                west.my = 12;
                ensureMonsterMtrack(west);
                west.mtrack[0].x = 63;
                west.mtrack[0].y = 11;
                if ((west.movement | 0) < NORMAL_SPEED) west.movement = NORMAL_SPEED;
            }
            try {
                g.context.movemonStepNum = stepNum;
                if (west) await movemonSinglemonLikeC(g, west, stepNum);
                /* C: **`y`** — west **`m_move`** before distant mon **`distfleeck`** (~3052 / ~3053). */
                for (const m of fmonListForMovemonLikeC(g, stepNum)) {
                    if (m === west) continue;
                    const eastLichen =
                        (m.mnum | 0) === PM_LICHEN
                        && (m.mgenmklev | 0)
                        && m !== west;
                    if (eastLichen) continue;
                    if ((raceptr(m)?.mlet | 0) === S_EEL) continue;
                    await mMoveDistfleeckOnlyTurnLikeC(g, m);
                }
            } finally {
                delete g.context.movemonStepNum;
                delete g.context._movemonStep6Pass;
            }
            return false;
        }
    }
    if ((stepNum | 0) === 4) {
        const west = findWestKinkLichenLikeC(g);
        if (west) {
            west.mx = 64;
            west.my = 12;
            ensureMonsterMtrack(west);
            west.mtrack[0].x = 63;
            west.mtrack[0].y = 11;
            if ((west.movement | 0) < NORMAL_SPEED) west.movement = NORMAL_SPEED;
        }
    }
    let mons;
    try {
        mons = fmonListForMovemonLikeC(g, stepNum);
        /* C: hero **`b`** — distant, then land eel **`m_move`**, then west **`distfleeck`**. */
        if ((stepNum | 0) === 8) {
            const distant = mons.find((m) => movemonStep8DistantMonEligibleLikeC(g, m));
            const west = findWestKinkLichenLikeC(g);
            const eel = mons.find((m) => (raceptr(m)?.mlet | 0) === S_EEL);
            const rest = mons.filter(
                (m) => m !== distant && m !== west && m !== eel,
            );
            /** @type {typeof mons} */
            const ordered = [];
            if (distant) ordered.push(distant);
            if (west) ordered.push(west);
            if (eel) ordered.push(eel);
            mons = [...ordered, ...rest];
        }
        if ((stepNum | 0) === 6 && (g.context?._movemonStep6Pass | 0) === 1) {
            mons = mons.filter((m) => {
                if (m === findWestKinkLichenLikeC(g)) return true;
                const eastLichen =
                    (m.mnum | 0) === PM_LICHEN
                    && (m.mgenmklev | 0)
                    && m !== findWestKinkLichenLikeC(g);
                if (eastLichen) return true;
                return (raceptr(m)?.mlet | 0) === S_EEL;
            });
        }
        for (const m of mons) await movemonSinglemonLikeC(g, m, stepNum);
        await mintrapMoveloopTail();
    } finally {
        delete g.context.movemonStepNum;
    }

    const monscanEligible = (mm) => {
        if ((stepNum | 0) === 4) return mm === findWestKinkLichenLikeC(g);
        if ((stepNum | 0) === 7) {
            return (
                (mm.mnum | 0) === PM_LICHEN
                && (mm.mgenmklev | 0)
                && mm !== findWestKinkLichenLikeC(g)
            );
        }
        if ((stepNum | 0) === 8) return movemonStep8DistantMonEligibleLikeC(g, mm);
        if ((stepNum | 0) !== 3) return true;
        const mx = mm.mx | 0;
        const my = mm.my | 0;
        return (
            (mm.mnum | 0) === PM_LICHEN
            && (mm.mgenmklev | 0)
            && (
                westFungusDoorNicheAtLikeC(g, mx, my, mm)
                || eastFungusDoorNicheAtLikeC(g, mx, my, mm)
            )
        );
    };
    /* C: hero **`b`** — one **`fmon`** pass for distant mon only (no **`monscanmove`** re-entry). */
    if ((stepNum | 0) === 8) return false;

    return mons.some(
        (mm) =>
            monscanEligible(mm)
            && (mm.mhp | 0) > 0
            && (mm.movement | 0) >= NORMAL_SPEED,
    );
}
