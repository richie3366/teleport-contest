# Review 2037 — 01a639d1b — random_dir port + 5 stale (D-3077)

Metadata: SHA `01a639d1b`, D-3077, js/worm.js (+24/−1).
1 function ported + 5 stale retired (2 ahead-of-head,
3 same-file).

## Intent vs deliverable

Promise: port random_dir (MISSING dead staticfn), retire
2 stale pops + 3 same-file PARTIALs. Diff adds the local
+ COLNO/ROWNO consts on the existing edge. Kept.

## Inventory

- `random_dir` (NEW worm.js:668, sync local — C
  staticfn): x-step ternary, y-step / forced-y arms,
  out.nx/out.ny. Sole callee rn2 LIVE. No callers (as
  in C). No clones, no deleted symbols.

## C ↔ JS fidelity

C worm.c:802–822 (csym range). X-step ternary mirrors
C :805–809 token-for-token (x>1 ? x<COLNO−1 ?
rn2(3)−1 : −rn2(2) : rn2(2)) ✓; y-step :810–815 with
y>0 (C "y==0 is ok" note kept) ✓; forced-y :816–821
(rn2(2)?1:−1 interior, −1 bottom, +1 top) ✓. JS
ternary evaluates only the taken branch, so edge
checks precede the single draw per axis exactly like
C short-circuit ✓; draw order x-then-y ✓. C refs:
decl :22 only (csym) → unwired local correct ✓.
Stale ×5: all notes carry js:line + caller/rationale
evidence; spot-checked count_wsegs (:126 ✓) and
doffing (:3920 ✓). count_wsegs names its one unwired
caller arm (trap.c:1975) in the note — disclosed like
a named omission, not hidden. Confirm.

## Hallucinations / overclaim

None. "No full sessions (js/worm.js not shared)" is
stated, not hidden; per-function REACH + green/cohort
still ran.

## Density

1 whole function + 5 stales — minimal but §2b-shaped
(dead staticfn, closure exhausted: "worm.c holds no
more Open"). `Ledger:` 1 ported + 4 ported + 1 split
✓. Verdict ACCEPT.

## Verification

Re-measured `hidden-proxy verify random_dir --base
01a639d1b~1 --reach-all`: 0 blocked (honestly vacuous)
+ smoke 24/24 → REACH-OK, 0 regressed ✓. Ban-grep
clean. Rulecheck clean (2033).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
