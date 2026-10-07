# Review 2467 — 0fcddf3d7 — tut loaders set rndmongen, not dead nomongen (D-3585)

**Metadata.** SHA `0fcddf3d7` (2026-10-07, D-3585). Type: **cliff**:
writer port for the cliffs heads `eat.c gethungry` + companion
`allmain.c u_calc_moveamt`. `js/` insertions: 6 (`js/mklev.js`
+6/−2) + committed test.

## Intent vs deliverable

Promise: the compiled tut-1/tut-2 loaders wrote a dead
`flags.nomongen` nobody reads, leaving `rndmongen=true`, so JS
spawned random monsters on tutorial levels C vetoes; both loaders
now write `rndmongen=false` per sp_lev.c:3812–3813. 4 PASS + 2
moved, 0 worse.

Diff actually adds: the two flag writes + cites. Promise matches
diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | load_tut1 level-flags arm | ported (lspo_level_flags row) | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:20108) | sp_lev.c:3758–3831, dat/tut-1.lua:30–31 |
| 2 | load_tut2 level-flags arm | ported (lspo_level_flags row) | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:20494) | sp_lev.c:3758–3831, dat/tut-2.lua:3–4 |

Helpers: none added. No clone→import re-point, so no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

**The arm is exactly C's.** `csym lspo_level_flags` →
sp_lev.c:3758–3831; :3812–3813 (read) `nomongen →
svl.level.flags.rndmongen = 0` ✓. Both tut luae carry the flag at
the cited lines (read) and are the only dat/ users (repo grep) ✓.
`csym makemon` → makemon.c:1146–1510; gate :1168 (read)
`debug_mongen || (!rndmongen && !ptr) → return 0`, placed before
the location RNG — the draw-free veto ✓. JS gate makemon.js:3328
(read) is the identical condition before `makemon_rnd_goodpos` ✓;
defaults rndmongen=true at mklev.js:3007/:3111 (read) explain why
the dead write left spawns on ✓; the live lspo arm :20965–20967
(read) already maps nomongen→false, so the compiled loaders were
the only bypass ✓. Remaining `nomongen` hits in `js/` are comments
+ the live case string — zero dead readers/writers ✓. No RNG in
the touched arms; the step-7 fork (C draw-free veto vs JS
placement draws) is the explained consequence.

## Hallucinations / overclaim

None. Tool-label quirk (not the subject's): verify prints
`moved → js-throw` when the new owner is null
(hidden-proxy.mjs:604 `r.owner || 'js-throw'`). Both "moved"
sessions are error-null screen diffs at the D-log's predicted
steps — confirmed via `show`, not the label.

## Density

Cliff §10.18: cliffs-head writer (two parked heads, one writer),
two arms of one ported row, own `Ledger:` touch (lspo_level_flags
gains D-3585). Per-function verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message's own
  "no DIAG/FORCE/seed gates" — code clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `tut-nomongen-rndmongen.test.mjs`: 1/1 PASS now
  (pre-fix FAIL false-vs-true claimed in-ship).
- Re-measure (mine, one call): `verify
  gethungry,u_calc_moveamt --base 0fcddf3d7~1 --reach-all` →
  gethungry **3 PASS, 2 moved past, 0 worse** + full reach
  **800/800 REACH-OK**; u_calc_moveamt **1 PASS, 0 worse** + full
  reach **242/242 REACH-OK** — the D-log's numbers exactly
  (Caveman 37→146 owner-null «Really save?», Healer 72→78).
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
