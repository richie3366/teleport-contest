# Review 2539 — ac9a658bd — dorecover restore suppression

Metadata: SHA `ac9a658bd20c2aafe299b8188896ad196428de7`, D-3662,
cliff-head `welcome` (region heuristic) via writer dorecover/restgamestate.
js diff +28/−2 in `js/save.js` (REST_GSTATE + defer setters) and
`js/jsmain.js` (pre-docrt recalc deletion); + focused test
`scripts/restore-suppression-94001.test.mjs`.

## Intent vs deliverable

Promise: 94001 (2-segment save/restore, Hallu on) diverged at seg1 step 0
(global 227): kitten cell (22,15) C GHOST-space vs JS letter — the
restore path never suppressed map display. Port C's `:795` restoring
gate, `:684` defer_see_monsters, and delete the uncited pre-docrt
`vision_recalc(0)` that burned 3 display draws. Diff does exactly that,
nothing bundled: two setters + one deletion + cites.

## Inventory

- `try_restore_save` (`js/save.js:920`): `restoring = REST_GSTATE` at
  `:949` (post-validation, pre-hydration); `defer_see_monsters = true` at
  `:1026` (post-mvitals, pre-worn). C: `dorecover`,
  `restore.c:788–951`, and `restgamestate`, `restore.c:521–736` (per
  `csym.mjs`).
- `NethackGame.start` restore block (`js/jsmain.js:238–268`): bare
  `vision_recalc(0)` deleted, cite comment added.
- No new helpers, no re-pointed symbols (`sym.mjs` not required — nothing
  deleted or re-pointed; `REST_GSTATE` joins an existing import).

## C ↔ JS fidelity

- C `dorecover :794–795`: "suppress map display…" + `restoring =
  REST_GSTATE` at entry ✓ (direct read). JS `:949` placement matches
  (entry; JSON single pass covers C's three phases — pre-existing
  by-design shape, honestly Named).
- C `restgamestate :680–684`: defer_see_monsters after mvitals `:676–678`,
  before worn loop `:687–690` ✓ (direct read). JS `:1019/:1026/:1147`
  same order ✓.
- C tail `:926–948`: vision_reset + full_recalc=1, `restoring = 0`
  (`:944`), `docrt()` — no vision_recalc between ✓. JS: `:1236` clear
  before jsmain `docrt()` ✓; deleted recalc had no C counterpart ✓.
  (Nit: JS comment cites `:941–948`; the reset pair sits ~`:926–931`.
  Cite drift only.)
- Gates pre-wired and faithful: `suppress_map_output`
  (`js/display.js:5538`, in_mklev/saving/restoring ✓ vs C `:703–708`);
  `see_monsters` defer gate (`:6125` ✓ vs C `:1492`); moveloop catch-up
  (`js/allmain.js:326–329` ✓ vs C `allmain.c:92–94`, direct read).
- `restoring` readers all audited correctly: do_wear talk
  (`:568`, C talk=!restoring during the `:687` loop ✓); shk price arms
  (`:3425/:3508`, C restoring skip ✓); do.js `:1500` checks
  `=== REST_LEVELS` (JS never sets 2 — dead either way ✓);
  `set_uasmon` (`:1225`) runs after the pre-existing `:1216` set point,
  so the polyself `:866` gate already skipped pre-fix ✓.
- Failure paths: all three try_restore_save `return false` (`:925/932/936`)
  precede the `:949` setter ✓ (`:1360` is the lua parser's, not this fn).
- RNG: deletion removes 3 display draws (TEMP trace, reverted); setters
  only gate paints. Consistent with RNG flat 8682/8682 ✓.

## Hallucinations / overclaim

None. The `restoring` audit reads like a boast but every reader checks
out. The harness-vs-direct glyph discrepancy (`a` vs `i`) is disclosed,
same desync class, both space post-fix.

## Density

Cliff-phase §2b: one cliff, writer (not the `welcome` symptom) ported
whole with all C gates wired, callers table complete, Ledger entry
updated. Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward` in
  `js/`. Rule #2: `imports.mjs --rulecheck` clean on all of scored `js/`.
- D-log Verify: 94001 227→do_mgivenname@238 + reaches + green/strict/
  cohort/full 44/44.
- Re-measure on the SHA's own code (scratch worktree + symlinked
  `.cache`/pinned C): `verify welcome --base ac9a658bd~1` →
  `0 PASS, 1 moved past (227→do_mgivenname@238), 0 worse → PROGRESS` +
  smoke 24/24 REACH-OK. Claim reproduced exactly; no REGRESSED.
  (At HEAD the session reads PASS via D-3663 — strictly further.)
- Focused test: `node --test` 2/2 green (D-3662 pin + D-3663 sibling).
- Residual debt (not a C-wrong): `vision_recalc` is now an unused import
  in `js/jsmain.js:21` (comment-only reference at `:245`). Harmless in
  ESM; the next iter touching that file should drop it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
