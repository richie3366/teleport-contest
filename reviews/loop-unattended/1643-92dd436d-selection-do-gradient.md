# Review 1643 — 92dd436d — `selvar.c` selection_do_gradient whole-body port (D-2684)

Metadata: commit `92dd436d`, D-2684, js/mklev.js +
scripts/selection-do-gradient.test.mjs (new, committed). No prior review
claimed closed.

## Intent vs deliverable

Subject promises: whole-body `selection_do_gradient` + staticfn
`line_dist_coord`. Diff actually adds: file-local `line_dist_coord`
(js/mklev.js:26986), exported `selection_do_gradient`
(js/mklev.js:27014), +2 const imports, committed test. Matches the
promise; no extras.

## Inventory

New JS: `line_dist_coord` (module-local — correct, C `staticfn`,
single call site); `selection_do_gradient` (exported — C is global,
caller is Lua `l_selection_gradient`, no JS bridge yet).

## C ↔ JS fidelity

C loci (csym): `selection_do_gradient` `selvar.c:569–622`;
`line_dist_coord` `:541–566`. Caller `nhlsel.c:912` correctly named as
unwired (no JS Lua bridge — map-named omission, not Must-fix).

Branch-by-branch confirm: mind/maxd swap; dofs floor at 1; switch with
default→impossible→FALLTHROUGH→radial; radial loop with C short-circuit
(`d0 <= mind² || (d0 <= maxd² && … < rn2(dofs))` — rn2 fires only past
mind, matching C evaluation order); square arm d1–d5 with
`min(d5,min(max(d1,d2),max(d3,d4)))` composition and the same gate.
`line_dist_coord`: px/py/s computation order, degenerate→dist2,
clamped projection, truncating assignment (Math.trunc — correct, C
assigns to `long`), squared return. Confirm throughout.

Checked, accepted observations (not C-wrongs):

- Float-vs-double: C `lu` is `float`; JS divides in double. With map
  magnitudes every input is exactly representable and non-integer
  rationals sit ≥ ~8e-5 from integers vs float error ~1e-5, so only an
  exactly-integer projection evaluated from below in float could flip —
  and the function has no JS caller today (Lua bridge unwired). The
  D-log documents the trunc-vs-floor half of this; the float half is
  noted here for the record. No action.
- `impossible(...)` called sync-style though it is async
  (js/display.js:8055) — file precedent (js/mklev.js:19268), C returns
  void here. Consistent; no action.
- `sym.mjs`: `selection_do_gradient js/mklev.js:27014 sync` (single
  live); `line_dist_coord` single module-local (correct for a
  staticfn). SEL_GRADIENT_* values verified 0/1 against sp_lev.h:63–64.

RNG: `rn2(dofs)` call-for-call in both arms, same short-circuit gates.
Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide). No new cross-module edge (const.js import only).

## Hallucinations / overclaim

None. MISSING→ported claim is real (no prior symbol existed).

## Density

Breadth-phase whole-function pair (C 54+26 L), ~80 JS lines + test —
right-sized. Same-iteration STALE park (growl_sound) claimed live;
spot-check below in review 1646's SHA (681d8a68 touches growl itself).

## Verification

D-log: test + syntax/rule2/hidden/reach/green/strict/cohort. Re-ran
test at HEAD: 6 pass, 0 fail (observed). Re-ran
`hidden-proxy.mjs verify selection_do_gradient --base 92dd436d~1
--reach-all`: "0 blocked (0 at baseline…)" — queue cited 0, vacuous
note properly stated — plus "24 PASS, 0 regressed → REACH-OK".
No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
