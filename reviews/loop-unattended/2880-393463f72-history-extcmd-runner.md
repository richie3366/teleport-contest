# Review 2880 — 393463f72 — history EXT_CMDS runner (D-4039)

- SHA: `393463f72` (cliff, 1 table row: `history`)
- D-entry: D-4039; Ledger: pager.c (extcmd wiring; u_stuck body untouched)
- `js/` diff: `js/getline.js` +11 (one EXT_CMDS row); test
  `scripts/extcmd-history.test.mjs` (3 tests)

## Intent vs deliverable

Promise: u_stuck_cannot_go-head writer — all 83 «unknown extended
command» board rows are typed `#history`; C's extcmdlist has the row
but JS EXT_CMDS lacked it. Diff actually adds exactly one row with C
cite. No helper, no clone, no re-point. Promise = diff.

## Inventory

- EXT_CMDS `history` row (js/getline.js:594–604): added.
  C: `nethack-c/upstream/src/cmd.c:1738–1739` (verified in pinned
  source): `{ '\0', "history", "show a summary of the game's
  development", dohistory, IFBURIED | AUTOCOMPLETE | GENERALCMD, NULL }`.

## C ↔ JS fidelity

Row fields match C exactly: name `history`, non-wizard (C has no
WIZCMD flag), `autocomplete: true` (C AUTOCOMPLETE). Callee: `dohistory`
is LIVE — `sym.mjs` → `js/pager.js:3386 ASYNC`, and the row's `run` is
`async` and returns `dohistory()` (awaited through the async runner —
correct for an ASYNC export). Import shape is the version-row sibling
verbatim (dynamic `await import('./pager.js')`); getline.js already
carries that dynamic edge (:579, :590, :1250, :1254, … — verified), so
no new module edge. No RNG in the runner dispatch either side. "Whole
C function" here is the table row + live callee, both shipped — no
dispatch-ported-callee-stubbed gap. No symbol deleted or re-pointed.

## Hallucinations / overclaim

None. The "83/83 are #history" universality claim is load-bearing and
is corroborated by the verify totals (69+14 = 83, 0 unchanged — every
baseline-blocked session responded). The u_stuck owner body is
explicitly untouched with ledger standing, not claimed.

## Density

Cliff-phase: head writer, one C locus (one table entry), callee
verified live, `Ledger` updated. Named (1)–(2) audit the remaining
EXT_CMDS gaps (INTERNALCMD runnerless-by-design with the
extcmds_match mechanism; 24 MOVEMENTCMD + PREFIXCMD + GENERALCMD mates
unwired with the "no session types them" evidence bar for future
wiring) — genuine audit, not padding. Not a no-op: `js/` + test +
83-session movement.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify u_stuck_cannot_go --base 393463f72~1
  --no-reach` → `69 PASS, 14 moved past, 0 unchanged, 0 worse` —
  exact match to the D-log movement line. Non-vacuous (83 blocked).
- Focused test re-run: `# pass 3, # fail 0`.
- D-log Verify bullet: VERIFY PASS, REACH-OK smoke 24/24, green +
  strict ×2, cohort 7/7, full skipped per gate (getline.js not shared)
  — shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); diff adds no
  static import, no FORCE/DIAG/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
