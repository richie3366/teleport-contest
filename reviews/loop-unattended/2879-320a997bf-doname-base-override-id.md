# Review 2879 — 320a997bf — doname_base override_ID staging (D-4038)

- SHA: `320a997bf` (cliff, 1 function: `doname_base`)
- D-entry: D-4038; Ledger: objnam.c (doname_base)
- `js/` diff: `js/objnam.js` +24/−7 (stage + try/finally reindent);
  test `scripts/doname-base-flags.test.mjs` extended (6 tests)

## Intent vs deliverable

Promise: display_pickinv-head writer — Debug-Identify menu showed
appearance names («hexagonal amulet») instead of true names because
`doname_base` staged override_ID into prefix-flag locals but
`pretty_base` reads raw obj/ocl fields; stage `known/dknown/bknown=1`
+ `oc_name_known=1` around the base-name if/else with `finally`
restore. Diff actually does exactly that. No new imports, no helpers,
no clones. Promise = diff.

## Inventory

- `doname_base` (js/objnam.js:3306–3345): changed — staging block.
  C: `objnam.c` xname override arm `:632–639`, `the_unique_obj`
  `:1108–1110`, `wiz_identify` (`wizcmds.c:53–62`) — verified in pinned
  source via grep + read.

## C ↔ JS fidelity

C (`objnam.c:632–639`, verified): under `iflags.override_ID`,
`known = dknown = bknown = TRUE; nn = 1` for xname's whole switch; C
uses locals, so no state persists. JS stages the same four C writes
onto the fields `pretty_base` actually reads and restores all four in
`finally` — observably identical to C's locals. The staging is
byte-shape-verbatim the `xname_flags` sibling (js/objnam.js:1075–1090,
verified: same savedID/restore pattern, same C cites). Scope claims
checked: `pretty_base` (js/objnam.js:696+) reads only
`obj.known/dknown` + `oc_name_known` (grep over the body shows no
`cknown`/`lknown`/`rknown` reads) — the staged fields are exactly the
needed ones; the isPname branch reads ONAME/oartifact only, unaffected.
The C `:656` real-dknown `find_artifact` gate is not in the staged
region (`find_artifact`/`observe_object` hits in the 696–1100 window
are all xname_flags lines 1036+, pre-existing and realDknown-gated).
`overrideID` (`!!game.iflags?.override_ID`, :3283) matches C's nonzero
use (wizcmds.c:53–62 sets a cmd char). No RNG either side. No symbol
deleted or re-pointed; nothing to `sym.mjs`.

## Hallucinations / overclaim

None. The region-heuristic caveat (jsOwner/cEntry null, owner from the
screen diff) is disclosed in the subject line itself. Named (2) owns
the misattributed doname_base-blocked chain-Priest session with a
concrete writer claim (monmove, map-row diff + stepFns) instead of
counting it. Named (3) discloses the 7 `js-throw` verify labels with a
replay-clean falsifier run named; current scoreboard shows zero
`js-throw` owners (checked this review), consistent with transient
worker artifact rather than a live throw.

## Density

Cliff-phase: display_pickinv-head writer (51 extcmd blocks), one C
locus, whole-arm fix, `Ledger` updated. Standing partial omits named
untouched. Not a no-op: `js/` + test + mass movement.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify display_pickinv --base 320a997bf~1 --no-reach`
  → `36 PASS, 15 moved past, 0 unchanged, 0 worse` over the same 51
  baseline-blocked sessions. The D-log line (1+50) was measured at ship
  time; HEAD's code includes D-4039, which healed the extcmd family
  further — strictly more PASS, 0 worse, 0 unchanged. Direction
  corroborates the claim; no session the D-log calls moved now reads
  WORSE or stuck. Non-vacuous (51 blocked at baseline).
- Focused test re-run: `# pass 6, # fail 0` (pins exact corpus text).
- D-log Verify bullet: syntax, rule2, REACH-OK smoke 24/24 + doname
  smoke 24/24, green + strict ×2, cohort 7/7, full 44/44 — shipped;
  final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); diff has no
  imports, no FORCE/DIAG/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
