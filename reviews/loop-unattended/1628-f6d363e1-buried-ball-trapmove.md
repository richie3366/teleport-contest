# Review 1628 — f6d363e1 — dig.c buried_ball last-caller wiring + dist2 clone removal (D-2669)

**Metadata:** SHA `f6d363e1`, `dig.c` `buried_ball`
+ `hack.c` `trapmove` TT_BURIEDBALL arms, D-2669. JS:
`js/dig.js` (clone deleted + `dist2` import join) +
`js/hack.js` (+26/−4: radius-1 arm + wriggle_free arm
+ 3 import joins). Plus 2 Stale parks in-commit.

## Intent vs deliverable

Subject promises: wire the last C caller (`trapmove`
radius-1 free move `:1633–1647` + wriggle_free
`buried_ball_to_punishment :1677–1678`), remove the
`dist2` clone for the live hacklib export, park 2 stale
rows. Diff delivers all of it. Promise matches
deliverable.

## Inventory

- `trapmove` TT_BURIEDBALL arm (hack.js:2117, async,
  exported) — two arms added, rest untouched.
- `dist2` (dig.js file-local): deleted; `dist2` joins
  the existing hacklib import (no new edge). Required
  `sym.mjs` paste:

```text
dist2            js/hacklib.js:23   sync
                 js/mon.js:1091   sync
             !! multiple exports — import the C-locus one; do NOT add another
```

The join points at the C-home (hacklib.c:673,
byte-identical `(x1−x2)²+(y1−y2)²`). The mon.js:1091
duplicate is pre-existing (still imported by
eat/cmd/steal/trap) — identical computation, noted as
debt, not this SHA's scope. `buried_ball` (dig.js:547,
sync) + `buried_ball_to_punishment` (:577, async,
awaited ✓) both live. hack.js→dig.js / hack.js→hacklib
edges pre-existed (import-line joins only).

## C ↔ JS fidelity

C loci read: `buried_ball :1884–1932` (49 L, body
above), `trapmove :1631–1680` (read at hack.c lines).
No RNG. Confirm:

- Radius-1 arm: `anchored = (utraptype ==
  TT_BURIEDBALL)` ✓; `cc = {ux, uy}` ✓;
  `buried_ball(&cc) && dist2(x, y, cc) <= 2` ✓ (JS
  `buried_ball` mutates cc like C's `&cc` ✓);
  verbose `Norep("You move within the chain's reach.")`
  with the ugly-hack comment carried ✓; `return TRUE`
  ✓.
- Decrement `--u.utrap` + verbose predicament block:
  untouched (pre-existing) ✓.
- Wriggle_free: `else if (anchored)` → wrench-ball
  pline + `await buried_ball_to_punishment()` ≡ C
  `:1676–1679` ✓.
- Caller closure — all 5 C `buried_ball` sites wired:
  dig.c:1942/1965/2094 → dig.js:580/598/515,
  hack.c:1639 → hack.js:2126 (this SHA), trap.c:3957 →
  trap.js:2973 ✓ ("last caller" claim true).
- OMITs named in-commit: trapmove steed/Sting/
  `surface()` culprit arms (pre-existing deferrals).

## Hallucinations / overclaim

None.

## Density

Breadth phase: caller-wiring + clone removal, 2 files
+ 2 stale parks — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax 2 files ·
rule2 · hidden note 0 blocked · REACH-OK smoke 24/24 ·
green · strict · cohort 7/7 · full 44/44 shared-file).
Re-measured here: `hidden-proxy.mjs verify buried_ball
--base f6d363e1~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled) + smoke 24/24, 0
regressed → REACH-OK. Claim true. Diff grep: 0 hits for
FORCE/DIAG/getRngLog/fastforward/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
