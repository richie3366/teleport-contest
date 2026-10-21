# Review 3030 — 28d221b22 — postmov's unguarded newsym raises the C column-0 impossible

- SHA: `28d221b22` (cliff; board row newsym,
  scen-symset-Rogue-50350015 s683, C «newsym: attempting screen update
  for <0,0>» chain vs JS silence)
- D-entry: D-4190; Ledger: m_move partial (see Density)
- `js/` diff: monmove.js +14 −2

## Intent vs deliverable

Promise: monmove.c postmov ends the MMOVE_MOVED arm with an unguarded
`newsym(mtmp->mx, mtmp->my)` (`:1655–1657`). A vault guard that
gd_move_cleanup has just parked at <0,0> hits newsym's column-0
`impossible()` (display.c `:928–935`). JS hid this C bug behind a JS-only
`else if (mtmp.mx)`.

Diff: `else if (mtmp.mx)` becomes `else`. The sync newsym's pending
report (`game._newsym_misuse`) is cleared before the call and raised
after it with `await impossible(...)`, which is the same idiom
see_monsters uses (display.js:7063–7072). `impossible` joins the
display.js import. The promise matches the diff.

## Inventory

- postmov — monmove.js:1860–1890 (C monmove.c:1455+, arm `:1648–1657`).
- impossible — display.js export, new import (C pline.c impossible).
- newsym — display.js, unchanged. Column 0 sets `_newsym_misuse`
  (display.js:6710).

## C ↔ JS fidelity

C `:1648–1657`:

```c
if (engulfing_u(mtmp) && (mtmp->mx != omx || mtmp->my != omy)) {
    u.ux0 = u.ux; u.uy0 = u.uy;
    u_on_newpos(mtmp->mx, mtmp->my);
    swallowed(0);
} else {
    newsym(mtmp->mx, mtmp->my);
}
```

C newsym `:928–935`: `!isok(x, y)` → panic out of range, `impossible`
for column 0, then return. JS newsym records column 0 and returns, and
the caller raises `impossible` with the same format string. The
engulf arm is unchanged. The else arm is now unguarded, as in C. The
user rule "port C bugs faithfully" covers this: the bug is in game code,
not in the recorder.

The drain block is a third copy of a 5-line idiom (see_monsters,
here). It is a JS bridge for a sync newsym, not a C clone. The D-log
names the remaining non-draining newsym callers as an omission.

## Hallucinations / overclaim

None. The D-log is candid that its `verify impossible` probe showed NO
MOVEMENT on an unrelated row (worldtour-Archeologist s963), that this
alone printed VERIFY: FAIL, and that the row stays open.

## Density

A one-arm change on the cliffs-head writer. Right-sized. The ledger
bullet went on `m_move`, not `postmov`, because the C index does not
know postmov: `node scripts/csym.mjs postmov` → "no definition found
in pinned C", although monmove.c defines it at `:1454–1455`
(`staticfn int` / `postmov(`). This is a tooling gap, not a port fault.
It hides postmov from the ledger and from `verify --fn` callers
resolution. It is recorded here for the tooling owner, not queued
(Must-fix is for C-wrongs).

## Verification

```text
verify newsym,postmov --base 28d221b22~1 --no-reach
  newsym:  1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
           (scen-symset-Rogue-50350015: PASS)
  postmov: 0 blocked (vacuous; also unindexed in C, see above)
```

This reproduces the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
