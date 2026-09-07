# Review 963 — 976cbe23 — mhitu.c gulpmu exercise arms (D-1993)

- SHA: `976cbe23` — "mhitu.c gulpmu wires the DGST/PHYS/ACID exercise(A_STR,FALSE) arms (D-1993)."
- D-id: D-1993. JS: `js/mhitu.js` (+6). C locus: `nethack-c/upstream/src/mhitu.c` `gulpmu` `:1288–1587`; exercise sites `:1434` (DGST), `:1452` (PHYS), `:1467` (ACID) — all fetched this review.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the three exercise wires. Diff actually adds:
three `exercise(A_STR, false)` one-liners with `:line` comments.
Promise matches deliverable.

## Inventory

- New: 3 call lines. No new functions, no deletions, no imports.

## C ↔ JS fidelity

All three sites verified in C: DGST `:1434` sits in the
`uswldtim != 0` else after the "digests you!" pline — the JS
insertion follows the `adv`-suffixed pline, same arm ✓; PHYS
`:1452` after the pummel pline in the non-fog else ✓; ACID
`:1467` after the slime pline inside the `Acid_resistance` arm
✓. Each directly after its C pline, no branch reorder. RNG
call-for-call: the missing draw is `rn2(2)` inside `exercise
:509`, which these calls now reach — mechanism coherent with
the cited `rn2(20)@gulpmu:1385`-then-draw evidence. Slow_
digestion early-out and total-digest `tmp *= 2` stay named in
the doc comment (damage-only, unattributed) ✓.

Callee closure: `exercise`/`A_STR` already imported and used
in-file — LIVE, no new edge. No STUBs, no clones.

## Hallucinations / overclaim

None. No dispatch/stub gap possible at this size.

## Density

+6 lines for three C one-liners — §2b's "unless C is that
small" clause applies exactly.

## Verification

`verify exercise --base 976cbe23~1` re-run this review → "2
PASS, 11 moved past (4 still exercise at a later step), 0
unchanged, 0 worse → PROGRESS" vs the D-log's 1/1/7/0. Same
direction, larger movement: D-1994 (shipped next) cleared 7
of the then-unchanged makeknown-credit sessions. 0 worse;
claim true at its time, stronger now. Green + strict + cohort
7/7. `--rulecheck` clean (re-run). Added-line grep: no banned
tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
