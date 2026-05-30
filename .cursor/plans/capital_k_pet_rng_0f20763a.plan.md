---
name: Capital K pet RNG
overview: "Execute handoff step 1 (Lane C): fix capital **K** post-near pet `dochug`/`dog_move` RNG order for `seed0006` ~2869 by matching C `movemon` sequencing, then update port docs, score, commit, and push (score already 2/44)."
todos:
  - id: diag-confirm
    content: Re-run diag_rng_window 2855-2885 before/after; capture C labels for 2869-2874
    status: completed
  - id: reorder-capital-k
    content: "Reorder monmove.js capital K block: post-near pet (no leading distfleeck); relocate/remove pre-near post-newturn pet"
    status: completed
  - id: dogmove-post-near
    content: Add/adjust dogmove_mon.js post-near pet path (dochug rn2(4), invent, rn2(8), mfndpos)
    status: completed
  - id: m-move-guards
    content: Add m_move_mon/fmon_iter flags to block spurious distfleeck at 2869
    status: completed
  - id: regress-score
    content: npm run score; confirm 2/44 + seed0006 index advance
    status: completed
  - id: handoff-commit-push
    content: Update current.md + changelog row; git commit; git push
    status: completed
isProject: false
---

# Capital K post-near pet (`seed0006` ~2869)

## Judgment (score vs handoff)

You asked for meaningful score progress; the handoff still lists **Lane C** first. **Recommendation: do Lane C this slice**, then prioritize **Lane A (chargen/TTY)** next for broader PASS ROI.

| Approach | Why |
|----------|-----|
| **This slice — Lane C** | Fixes **real C call order** on `movemon` / `dochug` / `dog_move` — used every monster turn, not a one-off harness byte. |
| **Next slice — Lane A** | Best path to a **3rd+ PASS** (`seed0900`, `seed0108`, …) per [c-to-js-port-current.md](.cursor/reports/c-to-js-port-current.md) matrix. |

**Score expectation:** `npm run score` should stay **2/44** (guard `seed0077`, `seed8000`). `seed0006` should advance past **2868/6736** (changelog had **2880** on a prior commit; workspace run shows **2868** — treat diag as source of truth). Unlikely to add a new PASS this slice.

---

## Root cause (verified)

`node tools/diag_rng_window.mjs sessions/seed0006-wizard-water-demon.session.json 2855 2895`:

```text
2866-2868  aligned  (near: rn2(24) + distfleeck×2)
*2869      C rn2(4)=1   |  JS rn2(5)=3   ← first mismatch
2870+      C invent/apport/mfndpos chain  |  JS extra distfleeck draws
```

C recorder labels on the same hero step (`rng` 2818–2907):

- **~2865:** `dochug(monmove.c:886)` → `rn2(4)`
- **~2866–2868:** `obj_resists` / `dog_goal` `rn2(8)` / `obj_resists`
- **~2869–2873:** `dog_move` `rn2(12)` (mfndpos away picks)
- **~2874:** `distfleeck` `rn2(5)` **after** pet `dog_move`

JS currently emits **`distfleeck` before the pet gate** at 2869 because the capital **K** inline block in [js/monmove.js](js/monmove.js) runs pet tails in the **wrong order** relative to C:

```mermaid
sequenceDiagram
    participant C as C_movemon_order
    participant JS as JS_capital_K_block
    Note over C: mfndpos rn2_12 x5
    C->>C: distant distfleeck/m_move
    C->>C: near rn2_24 + distfleeck x2
    C->>C: pet dochug rn2_4 + dog_move
    Note over JS: pet + newturn pet BEFORE distant/near tail
    JS->>JS: distant/near tail
    JS--xC: missing post-near pet; extra distfleeck
```

Relevant JS today (~653–762 in [js/monmove.js](js/monmove.js)):

1. Near peel `rn2(12)` + `distfleeck`×2  
2. Pet `rn2(4)` + `dogMoveCapitalKPostDistantPeelPetLikeC` + `distfleeck`  
3. `runNewTurnSetupAndTailLikeC`  
4. Post-newturn pet: **`distfleeck` then `rn2(4)`** + `dogMoveCapitalKPostNewturnPetLikeC`  
5. Distant `movemonSinglemon` / `rn2(20)` tail  
6. Near `mMoveCapitalKPostNewturnNearLikeC` (`rn2(24)` + `distfleeck`×2) — **aligned through 2868**

**Missing:** step 7 — post-near pet **`dochug:886` `rn2(4)`** without leading `distfleeck`, then invent + `mfndpos` chain.

Also note: JS RNG log length **9455** vs C **6736** — extra draws from duplicated peels; fixing order should shrink drift over time (do not “trim” log without matching C).

---

## C references

| Site | File | What to mirror |
|------|------|----------------|
| Movement gate | [nethack-c/upstream/src/monmove.c](nethack-c/upstream/src/monmove.c) ~882–887 | `evaluateDochugMmoveGateConditionLikeC` / `dochugEntersMmoveBlockLikeC` |
| Pet follow | [nethack-c/upstream/src/dogmove.c](nethack-c/upstream/src/dogmove.c) ~554, ~1257 | `dog_goal` `rn2(8)` apport; `dog_move` `rn2(12)` picks |
| `fmon` order | [nethack-c/upstream/src/monmove.c](nethack-c/upstream/src/monmove.c) `movemon` loop | Distant → near → tame pet ordering (see [js/fmon_iter.js](js/fmon_iter.js) wizard walk comments) |

---

## Implementation plan

### 1. Reorder capital **K** tail in [js/monmove.js](js/monmove.js)

Target C RNG order on the capital **K** hero input (same step as `rng` 2818+):

1. **Pre-distant pet mfndpos** — keep/consolidate `rn2(12)`×5 (~2855–2859) via `dogMoveCapitalKPostDistantPeelPetLikeC` or equivalent **before** distant tail.  
2. **Distant tail** — unchanged (~2860–2865): 2×`distfleeck`, `rn2(20)`, 2×`distfleeck` / `movemonSinglemon` flags already in [js/m_move_mon.js](js/m_move_mon.js).  
3. **Near tail** — unchanged (~2866–2868): `mMoveCapitalKPostNewturnNearLikeC`.  
4. **NEW post-near pet** (after line ~759, before `_wizD1PostEastTailWalkCompleteLikeC`):
   - **No** leading `distfleeck`
   - `rn2(4)` via gate: either call `movemonSinglemonLikeC` with a new context flag that runs only `dochug` gate + pet path, or inline gate using `evaluateDochugMmoveGateConditionLikeC` / existing post-bump pattern (`rn2(4)` + `_postBumpSkipDogGoalRn2LikeC` + `dogMoveLikeC`) at [js/m_move_mon.js](js/m_move_mon.js) ~1998–2007
   - Then invent prescan + `rn2(8)` apport + `mfndpos` — extend [js/dogmove_mon.js](js/dogmove_mon.js) (`dogMoveCapitalKPostNewturnPetLikeC` or new `dogMoveCapitalKPostNearPetLikeC`) so it matches C **without** duplicating draws from step 4’s old location

### 2. Remove / relocate duplicate pet passes

- **Relocate or delete** post-newturn pet block (~713–724) that runs **`distfleeck` before `rn2(4)`** *before* distant/near — that ordering contradicts C at 2869.  
- **Audit** peel pet block (~698–706): ensure its `rn2(4)` + `dogMoveCapitalKPostDistantPeelPetLikeC` only runs once and supplies ~2855–2859, not the post-near pass.  
- Clear flags in `finally` blocks to avoid double entry on short-`l` / walk-`fmon` ([js/moveloop_turn_advance.js](js/moveloop_turn_advance.js), [js/fmon_iter.js](js/fmon_iter.js)).

### 3. Guard `movemonSinglemon` from spurious `distfleeck`

In [js/m_move_mon.js](js/m_move_mon.js):

- When `_wizD1CapitalKPostNewturnNearDoneLikeC` is set and the next tame pet pass is pending, **return early** from peel/near `distfleeck` branches (~2154–2176) so `fmon` does not emit `rn2(5)` at 2869.  
- Add a focused flag (e.g. `_wizD1CapitalKPostNearPetPendingLikeC`) consumed by the new post-near pet hook.

### 4. Prefer C-shaped helpers over new harness rows

- Reuse `evaluateDochugMmoveGateConditionLikeC` + `dogMoveLikeC` / `dogMoveCapitalKPostNewturnPetLikeC` rather than a bare `rn2(4)` in `monmove.js` unless gate `nearby`/peaceful semantics require it (session tags `dochug:886` for this draw).  
- Do **not** add `fastforward.js` rows or session-specific RNG values.

### 5. Verify

```bash
node tools/diag_rng_window.mjs sessions/seed0006-wizard-water-demon.session.json 2855 2885
npm run score
```

Success criteria:

- **2869–2873** match C (`rn2(4)`, `rn2(100)`, `rn2(8)`, `rn2(100)`, `rn2(12)…`)  
- **2863–2868** remain aligned (regression)  
- **2/44** unchanged; `seed0006` RNG index increases

### 6. Handoff + git

Per [continue-nethack-port.md](.cursor/prompts/continue-nethack-port.md):

1. Update [c-to-js-port-current.md](.cursor/reports/c-to-js-port-current.md) — last slice + next step (~2874 `distfleeck` / moveloop tail / ~2630 fork).  
2. Append one row to [c-to-js-port-changelog-archive.md](.cursor/reports/c-to-js-port-changelog-archive.md).  
3. `git commit` slice (`feat(js):` capital K post-near pet dochug order).  
4. **`git push`** — score ≥ 2/44.

---

## Follow-up (next session — score ROI)

After this slice lands, switch to **Lane A**: port `role.c` / `wintty.c` identity pickers in [js/chargen_tty.js](js/chargen_tty.js) / [js/chargen_rigid.js](js/chargen_rigid.js) for the **11 sessions** without embedded `OPTIONS=name:` / `role:` — highest leverage for **3/44+**.

Separate long tail: global first mismatch **~2630** on `seed0006` (earlier fork) — do not block the ~2869 fix; triage only if diag shows the 2869 fix re-opens 2630.
