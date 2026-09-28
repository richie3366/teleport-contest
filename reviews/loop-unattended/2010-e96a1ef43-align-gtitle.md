# Review 2010 — e96a1ef43 — align_gtitle default-arm port

Metadata: SHA `e96a1ef43`, D-3050, js/roles.js only (+27/−~7).

## Intent vs deliverable

Subject promises "`align_gtitle` default-arm port (unknown alignment →
`god`)". Diff actually restarts the whole export as an explicit switch.
Promise understated — the whole function ships, not just the default arm.
Matches (exceeds) promise.

## Inventory

- `align_gtitle` (restarted export js/roles.js:904) — C pray.c:2627–2649.

## C ↔ JS fidelity

Arm-by-arm vs C (csym range cited): `result = "god"` init :2631 ✓;
`A_LAWFUL → lgod` :2634 ✓; `A_NEUTRAL → ngod` :2637 ✓;
`A_CHAOTIC → cgod` :2640 ✓; `default → gnam = 0` :2643–2645 ✓;
`gnam && *gnam == '_' → "goddess"` :2647 ✓ (`gnam = 0` is falsy under
the `&&`, exactly C's null check); single `return result` ✓. The fixed
bug is real: the old if/else mapped every non-lawful/non-chaotic value
(including unknown) to `ngod`, returning "goddess" for `_`-prefixed
neutral names where C returns "god". 0 callees, no RNG. Exact.

Signature: C reads global `gu.urole`, JS threads `urole` as first param
— pre-existing convention, kept so callers stay wired. Both C callers
wired: questpgr.c:285 → js/questpgr.js:70 (`%r` path) and :730 (`%G`
path), both passing `game.urole` ✓; role.c:2085 → js/roles.js:1387
passing `game.urole` with the `=== 'goddess' ? 1 : 0` comparison ✓.
`urole || {}` default is defensive-only (C's global always exists).
Ledger "none / every caller wired" holds.

## Hallucinations / overclaim

None.

## Density

One 17-line leaf restarted whole (~27 insertions). Small but complete —
0 callees, closure holds nothing more. OK.

## Verification

D-log cites verify.mjs → PASS + vacuous hidden note + REACH-OK +
green/strict/cohort. Re-measured: `hidden-proxy.mjs verify align_gtitle
--base e96a1ef43~1 --reach-all` → 0 blocked at baseline and now
(vacuous, as stated — coverage row); smoke 24/24 PASS → REACH-OK, no
regressions. Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
