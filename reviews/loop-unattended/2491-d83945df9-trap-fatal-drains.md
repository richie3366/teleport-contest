# Review 2491 — d83945df9 — trap fatal-losehp drains (D-3610)

- SHA: `d83945df94b9e5fd5271ef09a154adb38a51072d`
- Subject: cliffs-head trapeffect_rocktrap: fatal trap losehp never drained
  done() (lifesave continues to dog_move@164) (D-3610)
- Type: cliff (10 functions + helper semantic fix, one file), js +36/−6 in
  `js/trap.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: 10 `finish_hero_losehp` drains; helper returns post-done gameover
(lifesave → callers continue); drown gates its bail on post-done gameover;
rocktrap hero-empty arm returns Trap_Effect_Finished; Caveman-94281 146 →
dog_move@164. Diff delivers exactly those hunks, no new imports. Matches.

## Inventory

Changed (drain/bail insertions + 1 return-value fix + helper):

- `finish_hero_losehp` (js/trap.js:2060) — now wail-first, returns post-done
  gameover. C: hack.c losehp :4269–4291.
- `float_down`, `b_trapped`, `trapeffect_bear_trap`, `trapeffect_rust_trap`,
  `trapeffect_rocktrap` (+ empty-arm return fix), `dofiretrap` ×2,
  `trapeffect_magic_trap`, `trapeffect_landmine`, `chest_trap` ×2, `drown`
  (bail gate). C: trap.c losehp sites incl. rocktrap :1332–1338/:1368–1373.
- No new/deleted symbols; end.js reached via the helper's existing dynamic
  import.

## C ↔ JS fidelity

Helper order: C losehp prints showdamage, then death → urgent_pline + done
noreturn, else survival-wail. JS `losehp` (hack.js:1902) sets
`_losehp_needs_done` on death and `_needs_maybe_wail` only on survival, so
running `finish_maybe_wail()` first inside the helper is a no-op on death
and drains showdamage/rehumanize in C order on both paths; the done-drain
then runs only when flagged. Return-value fix: previously `return true`
after done() even on lifesave (callers skipped trailing C statements); now
post-done gameover, so lifesaved execution continues to `exercise`/slime/
dismount in C order — the D-3608 semantics, and the probe's 149-lifesave →
30-more-steps shape confirms it live. drown's gated bail matches C (death
noreturns; lifesave continues). Rocktrap return: C hero-empty arm falls
through to `Trap_Effect_Finished` (:1400); only the monster arm returns
`Trap_Is_Gone` (:1388) — verified by direct read of trap.c:1320–1400, fix
correct. dofiretrap boil arm drains-then-returns unconditionally, matching C
(the arm ends there on both paths). Bail values on true death (float_down 1,
chestgone, false) feed the dotrap caller — scoped as the named Next item
(pickup.js:2400 post-true-death continuation), not hidden. No RNG in the
diff.

Cheat grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. "Same bare idiom as the pit sites" true (no wail else-branch — the
helper internalizes it). The 12 vacuous verifies are printed as notes, not
claimed as movement.

## Density

Cliff phase: one cliff (trapeffect_rocktrap owns the probe) + same-file
same-shape companions; post-true-death caller continuation correctly left as
a cross-file Next item. Movement claimed (not PASS) — honest. Per-function
verdicts: all 10 + helper ACCEPT.

## Verification

Re-measured myself, one call: all 13 fns `--base d83945df9~1 --reach-all`.
Reaches: rock 29/29, bear 22/22, rust 10/10, magic 40/40, landmine 15/15,
float_down smoke 24/24, dofiretrap 3/3, chest smoke 24/24, b_trapped smoke
24/24, drown smoke 24/24, pit 52/52, anti_magic 4/4, lava smoke 24/24 — 0
regressed everywhere. Probe session: my re-run shows Caveman-94281 PASS
where the D-log says "moved 146 → dog_move@164" — not a contradiction: the
D-3614 dog_goal fix later PASSED that same session on the current tree, and
dog_move@164 was exactly the stated landing owner. The D-log's movement
claim is consistent with the later history.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
