# Review 2637 — 9352b7e56 — m_canseeu live Invis import (D-3773)

Metadata. SHA `9352b7e56` (2026-10-10), D-3773, parent
`1eee984bc`. js diff: `js/mondata.js` +9/−6 (1
import + m_canseeu body) +
`scripts/m-canseeu-invis.test.mjs` (new, 4 its).
Ledger: `m_move` partial (D-3773 prepended — but
its `omit` text silently dropped, see Debt).
Works the parent queue's row-2 (`monmove.c` m_move,
1 blocked: 95347 — verified; row-1 randomize
exhausted, skipped per precedent).

## Intent vs deliverable

Promise: 95347@492 — JS's m_move returned
draw-free because `m_balks_at_approaching`
flipped appr 0→−1 while C kept 0 via its
`!m_canseeu` gate: JS's m_canseeu built Invis
from wrong-case flats (`u.Hinvis`/`u.Einvis`,
always undefined) + a single-writer mirror —
statically ~always-false, so every monster saw
an invisible hero. Fix: read the live `Invis()`
youprop export.

Diff delivers exactly the import + predicate
swap. Promise and diff match. One new edge
(mondata.js→timeout.js), declared SAFE.

## Inventory

Changed JS (1 macro):

- m_canseeu — `js/mondata.js:1096–1108`
  (`if (Invis() && !perceives) return false`,
  then uinwater + couldsee arms).
  C: `vision.h:50–53` (live #else arm:
  `(!Invis || perceives) && !Underwater &&
  couldsee` — read; the #if 0 buried arm is
  dead, correctly not ported) + `youprop.h:198`
  (`Invis ≡ (H||E)&&!B` — read) +
  `mondata.h:81` (perceives bit test — read).

## C ↔ JS fidelity

**Macro C-exact.** Early-return form is logically
identical to C's conjunction. The live callee
(`js/timeout.js:1735`, read: `(H||E)&&!BInvis()`
over flats + uprops slots) ports `youprop.h:198`
whole. The inline perceives test matches
`mondata.h:81` bit-for-bit (zero delta vs the
mon.js export, as claimed). The uinwater arm
keeps its C cite (`youprop.h:279`); couldsee arm
untouched.

**Wrong-case premise verified:** the only
`Hinvis`/`Einvis` hit left in `js/` is the new
doc comment itself — the fix removed the sole
wrong-case reader, as claimed.

**sym.mjs (re-point: local const → import):**

```text
Invis            js/timeout.js:1735   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/mhitu.js:264  js/potion.js:762  js/trap.js:4953  js/zap.js:750
```

No module-level symbol deleted (the old inline
was a function-local const); m_canseeu's export
shape unchanged, all 12 call sites inherit the
fix behavior-only. The 4 remaining clones are
other files' business (the D-log Next names the
separate `u.Invis`-mirror candidates with lines
— named, not Must-fix). New edge: full `sessions`
44/44 forced green post-ship is the TDZ evidence;
no top-level reads added (runtime calls only).

**Test.** 4 its (invisible unseen / perceiver /
visible / blocked). 3/4 → 4/4 is authentic.

## Hallucinations / overclaim

None on C. Diff grep: zero hits. The appr-chain
measurement (both sides `rn2(11)=4` + `rn2(25)=
10`, then C's `:1970` ladder vs JS's draw-free
−1 loop) isolates the single boolean exactly;
the cascade note (JS-only polyform revert) is
presented as cascade, not claimed fixed.

Debt (docs, not C — no Must-fix; ledger text is
never a row):

1. The `m_move` ledger row lost its `omit` text
   (the `:1769–1770` wormno early-goto gap) and
   its oldest D-tag in this commit's `ledger.mjs
   set` rewrite. The arm did not ship (no
   monmove.js change), so `partial` is now
   unexplained. Restore the omit via
   `ledger.mjs set m_move partial --omit "…"`
   inside the next real iteration.

## Density

Cliff-phase §2b: one row, writer = the macro the
appr path reads (owner read whole, untouched —
same park class as 2026-09-08). One C locus
(`vision.h:50–53` + 2 macros), no bundling.
95347 492→explode@824 (+332).

## Verification

D-log Verify: m_move 0 PASS + 1 moved
(492→824); reach spread 80/80 (of 912) +
smoke 24/24; gates + forced full 44/44 PASS.

Re-measured by this audit (`verify
m_move,m_canseeu --base 9352b7e56~1 --reach-all`):

```text
verify m_move: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Wizard-95347: moved → explode at step 824 (was 492)
reach m_move: 912 baseline-PASS session(s) reach it (912 run, 466.6s): 912 PASS, 0 regressed → REACH-OK
verify m_canseeu: no corpus session is blocked on it at 9352b7e56~1 — […] vacuous […]
smoke m_canseeu: no RNG-tagged reach; fixed smoke spread (24 run, 11.8s): 24 PASS, 0 regressed → REACH-OK
```

Movement matches exactly; full 912/912 reach, 0
regressed, supersedes the spread. The vacuous
writer line is honestly labeled.

## Actionable C-wrongs

None.

Verdict: **ACCEPT-WITH-DEBT**
