# Review 2654 — fd2c769ce — Antimagic worn-fallback delete (D-3790)

Metadata. SHA `fd2c769ce` (2026-10-10), D-3790, parent
`603f1f8e6` (HEAD). js diff: `js/muse.js` +10/−9 —
Antimagic() loses the worn-cloak/armor fallback
+ dead const removed; focused test. Works cliffs
row-2 mbhitm (95204).

## Intent vs deliverable

Promise: 95204@297 — C takes the `rnd(20)`
STRIKING gate ("wand hits you!") while JS
Boings: Antimagic() read true via the worn MR
cloak with uprops[ANTIMAGIC]={0,0,0} — the
tutorial-gamestate strip/restore clobber (E 2→0,
temp-C measured), same shape as D-3763
Displaced.

Diff deletes the fallback (uarmc/uarm arms +
dead const), keeping the flats+uprops union.
Promise and diff match.

## Inventory

Changed JS (1 writer predicate):

- Antimagic — `js/muse.js:471–476`. C:
  `youprop.h:55–57` (H||E over uprops only —
  read; C never reads worn gear live).
- Call site: `js/muse.js:791` (cites
  `muse.c:1611–1616`). C: `muse.c:1608–1630`
  (Boing arm vs `rnd(20)` arm — read).
- Siblings verified union-only, no fallback:
  mcastu `:97–101`, zap `:636–641`, sit
  `:187–192` (cloak mentions are confer-source
  comments). GRAY_* consts live at
  `:2985–2989` (dragon-scale map);
  CLOAK_OF_MAGIC_RESISTANCE fully gone from
  muse.js. No symbol deleted or re-pointed
  (local const + two arms), so no sym.mjs
  paste is owed.

## C ↔ JS fidelity

**Delete C-exact.** The macro is bits-only, so
the worn-gear read was C-absent by definition;
with it gone the clobbered state (cloak worn,
extrinsic 0) reads false on both sides and JS
takes the `rnd(20)` gate like C. Union shape
now identical to the mcastu/zap/sit readers
(D-1089/D-3775 house shape; flats kept for
eat/poly paths). The gamestate strip+memcpy
mechanism matches C per the D-log (tutorial
port untouched — correct, since C clobbers
identically and only the reader was wrong).

## Hallucinations / overclaim

None. Diff grep: zero hits. The clobber is
temp-C measured (uarmc=148, E 2→0 across the
restore), not inferred; the probe was reverted.

## Density

Cliff-phase §2b: one row-2 writer predicate,
no bundling. 95204 → PASS. muse.js not shared
— full suite correctly skipped.

## Verification

D-log Verify: mbhitm 1 PASS; REACH-OK 20/20;
gates + cohort PASS.

Re-measured by this audit (`verify mbhitm
--base fd2c769ce~1 --reach-all`):

```text
verify mbhitm: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-95204: PASS
reach mbhitm: 20 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
