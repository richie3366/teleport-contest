# Review 2661 — 7f838064f — mdamagem lifesave gate ×2 tails (D-3797)

Metadata. SHA `7f838064f` (2026-10-10), D-3797, parent
`22d838e30`. js diff: `js/mhitm.js` +8/−0 — the
lifesaved gate in the shared fall-through tail and
the AD_POLY arm. Works cliffs row-2 passivemm
(95223 → PASS).

## Intent vs deliverable

Promise: 95223@625 — an AD_PHYS killing blow on a
shifted vampire: C's mdamagem returns hitflags after
the revive (no DEF_DIED, no grow_up) and the mattackm
loop runs passivemm's `rn2(3)`; JS split C's single
tail into per-adtyp copies and two of them called
grow_up unconditionally after monkilled, treating a
revived defender as a kill (DEF_DIED + `rnd(19)`).
Diff adds exactly the gate in both ungated tails.
Promise and diff match.

## Inventory

Changed JS (1 writer, 2 tails):

- mdamagem shared tail `:5708` + AD_POLY arm `:4725`
  (`sym.mjs`: module-local; C is `staticfn`, so
  correct). C: `mhitm.c:1015–1119` (csym range;
  kill tail `:1088–1118` read in full).

## C ↔ JS fidelity

**C-exact.** C `:1091–1094`: `if
(!DEADMONSTER(mdef)) return mhm.hitflags; else if
(hitflags == AGR_DIED) return DEF_DIED|AGR_DIED;`
JS mirrors both lines in the exact sibling shape
(`(mdef.mhp|0) > 0` ⟺ !DEADMONSTER since
DEADMONSTER ≡ mhp<1; the AGR_DIED arm). The other
15 per-adtyp copies already carried the gate, so
this completes the family rather than inventing a
shape. The D-entry correctly scopes what it does
not touch (shared tail's `:1118` non-kill return,
POLY arm's `hitflags||HIT` return — both pre-date,
no divergence) and why the POLY arm rides along
(same C lines, no monst.c AD_POLY attacker). No
imports, no signature change. No symbol deleted
or re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. "No mon_poly draws →
the shared tail, not the POLY arm" is the right
read of the C log, and the test pins both the
revive (no DEF_DIED, no attacker growth) and the
unsaved control.

## Density

Cliff-phase §2b: one row-2 writer, both tails of
one C block. Row-1 randomize falsifier re-verified
unfired live.

## Verification

D-log Verify: focused 1/2 → 2/2; passivemm 1 PASS;
reach 80/80 spreads; gates PASS.

Re-measured by this audit (`verify
passivemm,mdamagem --base 7f838064f~1 --reach-all`,
re-run on HEAD code):

```text
verify passivemm: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Monk-95223: PASS
reach passivemm: 307 PASS, 0 regressed → REACH-OK
reach mdamagem: 339 PASS, 0 regressed → REACH-OK (writer, vacuous as logged)
```

Matches the D-log; `--reach-all` runs the full
307+339 instead of the shipped 80-spreads.
Committed scoreboard: 1044 → 1045 (+95223),
0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
