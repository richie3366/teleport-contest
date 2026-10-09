# Review 2587 — cc3120348 — makemon S_EEL birth → live hideunder

SHA: `cc3120348` (D-3717). Underwater-idiom family residual, 1 arm,
`js/makemon.js` only (+12/−9). Ledger: makemon stays partial (D-3430
audited omits unchanged).

## Intent vs deliverable

Promise: C births an in_mklev eel then calls `hideunder` (:1322–1326);
JS inlined the arm with dead-false sticky `u.Underwater` and dropped
`|| !couldsee` → arm now calls the live mon.js export (imported :185,
ALREADY). Diff actually adds: inline deletion + `if (game.in_mklev)
hideunder(mtmp)` + C-cite comment. Promise matches diff.

## Inventory

- `makemon` S_EEL arm (js/makemon.js:3584) ↔ C makemon.c
  `:1322–1326` (`case S_EEL: if (gi.in_mklev) (void) hideunder(mtmp);`,
  confirmed verbatim above) + mon.c `:4746–4747` predicate (verified
  in 2586). Helper classification: deleted CLONE (local inline) →
  LIVE callee (mon.js export).

## C ↔ JS fidelity

C calls the whole `hideunder`, unconditionally in mklev — no `mtmp.mx`
guard. The old inline's `&& mtmp.mx` check was therefore invented, and
dropping it is C-faithful, as is inheriting the full export: ustuck/
trapped gates, D-3716-fixed predicate, mundetected writeback, newsym on
change. all draw nothing (couldsee/newsym are display; seeit is 0 in
mklev since `game.in_mklev` short-circuits canseemon — the "no RNG
delta" claim holds structurally). sym.mjs: `hideunder` is a live sync
export (mon.js:3951) with 1 known local clone (monmove.js:1444,
postmov) — this diff imports the export (pre-existing :185 edge), no
new clone, no new edge. Required sym output pasted via that query. The
deleted inline's `IS_POOL(typ)`-via-`level.at` vs the export's
`is_pool(x, y)` is the same predicate through the canonical reader.

## Hallucinations / overclaim

None. D-log states the vacuous verify, the standing partial omissions,
and the full-44 gate (shared file) plainly.

## Density

One whole arm (clone → live call) + focused test (2/4 → 4/4 claimed) +
ledger + verify incl. full 44/44 on an empty queue. Right-sized; the
successor row (return_from_mtoss Deaf gates) is named.

## Verification

Re-measured stronger than the D-log's 80-spread: `verify makemon
--base cc3120348~1 --reach-all` → 0 blocked (vacuous, as stated) +
`reach: 936 baseline-PASS reach, 936 run: 936 PASS, 0 regressed →
REACH-OK` (410.9 s). No REGRESSED session. Rule #2 clean (no imports
touched). Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
