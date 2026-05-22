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
    westFungusDoorNicheAtLikeC,
} from './mfndpos_mon.js';
import { movemonSinglemonLikeC } from './m_move_mon.js';
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
    /* session step 7 — **`stepNum` 6** */
    () => { rn2(5); rn2(16); rn2(5); rn2(5); rn2(16); rn2(5); },
    /* session step 8 — **`stepNum` 7** */
    () => { rn2(5); rn2(12); rn2(5); },
    /* session step 9 — **`stepNum` 8** */
    () => { rn2(5); rn2(20); rn2(5); rn2(5); rn2(8); rn2(5); },
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
    if ((stepNum | 0) === 4) {
        const west = findWestKinkLichenLikeC(g);
        if (west) {
            west.mx = 64;
            west.my = 12;
            ensureMonsterMtrack(west);
            west.mtrack[0].x = 63;
            west.mtrack[0].y = 11;
            /* C: west kink **`dochug`** at **(64,12)** after step **`j`** ( **`rn2(5)`** at session index **3019** ). */
            if ((west.movement | 0) < NORMAL_SPEED) west.movement = NORMAL_SPEED;
        }
    }
    let mons;
    try {
        mons = fmonListForMovemonLikeC(g, stepNum);
        for (const m of mons) await movemonSinglemonLikeC(g, m, stepNum);
        await mintrapMoveloopTail();
    } finally {
        delete g.context.movemonStepNum;
    }

    const monscanEligible = (mm) => {
        if ((stepNum | 0) === 4) return mm === findWestKinkLichenLikeC(g);
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
    return mons.some(
        (mm) =>
            monscanEligible(mm)
            && (mm.mhp | 0) > 0
            && (mm.movement | 0) >= NORMAL_SPEED,
    );
}
