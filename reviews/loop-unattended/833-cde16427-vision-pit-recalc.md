# Review 833 — cde16427 — vision.c pit 3×3 + post-rhack recalc (D-1863)

Metadata: SHA `cde16427`, D-1863, `js/vision.js` (+14/−3) + `js/allmain.js`
(+7). No Must-fix open.

## Intent vs deliverable

Subject promises the TT_PIT 3×3 arm in C order plus the post-rhack/
deferred_goto `vision_full_recalc` consume. Diff delivers both, plus doc
lines. Matches.

## Inventory

Changed: `vision_recalc` (new pit branch), `moveloop_core` (new consume site).
`TT_PIT` imported from const.js (`=2`, matches `you.h:348` utrap enum). No new
module edges; no deleted symbols.

## C ↔ JS fidelity

C loci read: `vision.c:609–622` pit arm, `allmain.c:538–542` consume. Confirm:

- Pit arm: row guards (`row<0 continue`, `row>=ROWNO break`), *direct assign*
  `next_rmin[row] = max(1,ux−1)` / `next_rmax[row] = min(COLNO−1,ux+1)` (not
  min/max-accumulate — matches C exactly), inner loop stamps
  `IN_SIGHT|COULD_SEE`. xray/night-vision/light/update flow below untouched, as
  in C (`:625–700` still apply after the pit branch). No RNG in the arm.
- One structural note: C tests `Underwater` *before* pit
  (`vision.c:595–609`); JS has pit first because the underwater pool arm is a
  still-named omission. Combined underwater+pit is near-impossible (pits fill),
  but when the pool arm is ported it must take the FIRST branch to preserve C
  `if/else-if` priority. Guidance, not a wrong.
- Consume site: C order `rhack()` → `deferred_goto()` → `if
  (vision_full_recalc) vision_recalc(0)`; JS identical including placement after
  the `utotype` gate. Early-`return` occupation path skips it, as in C
  (`allmain.c:510` returns pre-rhack). Explicit `flag=0` after the call is
  harmless redundancy — `vision.js:900` already resets at recalc entry like C
  (`vision.c:534`). The pre-existing pre-display consume (allmain.js:1029) is
  untouched; double-consume is idempotent (no RNG in recalc).
- Named omits (underwater nv=0 + pool 3×3, `climb_pit` body) in code + map.
  The D-log's callee audit for the split row (`m_easy_escape_pit` missing,
  `Passes_walls` triple-cloned) is exactly the required STUB→own-row discipline.
  No FORCE/DIAG/seed hits.

## Hallucinations / overclaim

None. The first-diff chain (`trapeffect_pit rn2(6)/rnd(6)` → exercise ×2 →
`distfleeck rn2(5)` → `linedup rn2(2)`) is a measured C draw order, and the
review honestly reports the next owner (`climb_pit` at step 46) instead of
claiming PASS.

## Density

One vision arm + one consume site, ~21 lines across two coupled modules.
Right-sized (below the ~40-line soft floor, but C is exactly this small —
allowed).

## Verification

D-log: syntax, rule2, hidden 0 PASS / 1 moved past, green, strict ×2, cohort
7/7, full 44/44. Re-ran `hidden-proxy.mjs verify linedup --base cde16427~1`
myself: `0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(tour-Healer-70025: moved → climb_pit at step 46, was 45). Claim true; no
regression.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
