# Review 2827 — a858bd5e1 — Strngl predicates narrowed to intrinsic-only

- SHA: `a858bd5e1` (D-3982)
- Files: `js/display.js` + `js/botl.js` (+~14/−8), focused test
  `scripts/strangled-statusline-intrinsic-only.test.mjs`
- Method: cliff owner fix (2 predicates, 1 C macro); whole Method.
- Cites: C `botl.c:177` (`if (Strangled)`), `botl.c:1201`
  (`bl_strngl` condtest), `youprop.h:110`
  (`Strangled ≡ uprops[STRANGLED].intrinsic`), `worn.c:123–125`
  (oc_oprop extrinsic confer), all read directly.

## Intent vs deliverable

Promise: both Strngl predicates read the worn-amulet extrinsic C never
reads; narrowing to flat-OR-intrinsic fixes Wizard-50050007 s373 (dust
vortex wearing a strangulation amulet shows no Strngl) → PASS. Diff
actually narrows exactly the two predicates and their comments. Promise
and diff agree.

## Inventory

- `_statusLine2` Strngl arm — `js/display.js:7447` vs C `botl.c:177`.
- `bl_strngl` condtest — `js/botl.js:3489` vs C `botl.c:1201`.
  Status: both repaired to the C-exact read.

## C ↔ JS fidelity

- C `botl.c:177` and `:1201` both test `(Strangled)`, which is
  `uprops[STRANGLED].intrinsic` **only** (`youprop.h:110`, Maladies
  block) ✓. C has no `HStrangled`/`EStrangled` macros at all (zero
  hits in `src/`+`include/`) — pure JS inventions ✓.
- `worn.c:123–125` confers `oc_oprop` into `uprops[p].extrinsic` on
  every don ✓ — so the amulet's extrinsic is real state C writes but
  no Strangled reader consumes; display reads intrinsic only. The
  vortex case (Amulet_on gate false → intrinsic 0, extrinsic set)
  therefore shows no Strngl in C ✓ mechanism exact.
- JS is now `u.Strangled || uprops[STRANGLED].intrinsic`, matching the
  adjacent Slime/Stone arms' shape and the `bl_slippery` precedent ✓.
  Predicate-only change: no RNG, no branch reorder, no new import.
- "H/E flats have no writers anywhere": literally imprecise —
  `pray.js:683–684` writes `u.HStrangled = 0; u.EStrangled = 0`. But
  those are the *only* writes repo-wide and only clear to 0, so the
  reads were behaviorally dead as claimed. Not a C-wrong.
- Untouched siblings keep wider Strangled reads (`insight.js:1814`
  enlightenment, `eat.js:2896`, `pray.js:565`, `mondata.js:1149`,
  `apply.js:4546`) — separate C functions' ports, no session names
  them; correctly out of this cliff's scope. Observation only.

Nothing deleted or re-pointed → `sym.mjs` re-point check N/A. Diff
grep: no `FORCE`/`DIAG`/`getRngLog`/seed/`fastforward`/coordinates.
Rule #2 clean (this-iteration `--rulecheck`).

## Hallucinations / overclaim

None material beyond the "no writers" phrasing (corrected above: two
zero-clearing writes exist; behaviorally dead stands).

## Density

Cliff head of its parent (`do_statusline2` x13, Must-fix empty) ✓. One
cause, both C readers of the macro repaired together (same macro, two
emitters — correctly one iteration, not two), `Ledger:` updated,
focused test on the exact session/step, full 44/44 run (shared files)
✓.

## Verification

Ship-time: `verify do_statusline2: 1 PASS (Wizard full 1085), 12
unchanged`; smoke REACH-OK; green/strict/cohort + full 44/44 green.
Re-measure (`verify do_statusline2 --base a858bd5e1~1 --jobs 4` on
HEAD): `2 PASS, 0 moved, 11 unchanged, 0 worse → PROGRESS` — claimed
Wizard PASS present; +1 PASS is Valkyrie (D-3983, later SHA on HEAD
code), the expected superset. Smoke 24/24 REACH-OK. No REGRESSED
session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
