# Review 835 — 11f88a30 — mhitu mhitm_ad_phys_u dmgval defender null → youmonst (D-1865)

Metadata: SHA `11f88a30`, D-1865, `js/mhitu.js` (+3/−2, one call site + comment),
docs + queue/archive stamps. Closes review 834 Must-fix item 1
(`**Addressed:** D-1865` stamped on 834 in this commit).

## Intent vs deliverable

Subject promises exactly the review-834 Must-fix: pass the hero to `dmgval`
instead of `null`. Diff delivers exactly that: `dmgval(otmp, null)` →
`dmgval(otmp, game.youmonst)` plus a C-citation comment. No other JS change.

## Inventory

Changed: one expression in `mhitm_ad_phys_u` (`js/mhitu.js:716`). No new
functions, no new imports (`game.youmonst` already used in the same arm for
`artifact_hit`/`rustm`), no deleted symbols. Nothing to run `sym.mjs`
deletion checks on.

## C ↔ JS fidelity

C locus `weapon.c:215–218`: `struct permonst *ptr = mon->data;` —
unconditional deref, so the defender argument is never nullable. Call site
`uhitm.c:4061`: `mhm->damage += dmgval(otmp, mdef)` inside `mhitm`, where
`mdef` is `&youmonst` (mhitu context — the hero is being hit). JS
`dmgval` (`js/weapon.js:210`, sync, LIVE) branches on `bigmonst(ptr)`:
small-dice `wsdam` vs large-dice `wldam` plus per-weapon bonus draws
(e.g. battle-axe `d(2,4)` vs `rnd(4)` per review 834). Passing
`game.youmonst` gives the defender's real `data`, so a polymorphed-big hero
now rolls large dice — branch-for-branch confirm against C. The old `null`
relied on `bigmonst(undefined) === false` (always small dice): confirmed
C-wrong, now fixed. Comment cites `weapon.c:215` and `dmgval(otmp, mdef)` —
accurate.

## Hallucinations / overclaim

None. One-line fix, one falsifier (polymorph-big hero taking a battle-axe
hit), no dispatch-vs-callee gap, no invented coverage.

## Density

Must-fix single item shipped alone — per queue rules Must-fix stays one
item, not glued to Open. Correct density by construction.

## Verification

D-log Verify bullet is honest: says `verify --fn mhitm_ad_phys` at HEAD is
vacuous (no corpus session blocked — not a corpus PASS) and separately cites
`--base 8ab2608f~1` → 2 PASS PROGRESS. Re-ran myself:
`hidden-proxy.mjs verify mhitm_ad_phys --base 11f88a30~1` → 0 blocked at
that baseline (expected: D-1864 already cleared them); `--base 8ab2608f~1`
→ `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (5f79bc6a,
c87ff7c9). Claim true, no regression. Green 2/2 + strict ×2 + cohort 7/7
per D-log; full suite skipped (single-expression change in one module —
reasonable). `imports.mjs --rulecheck`: clean. No FORCE/DIAG/seed/coordinate
hits in the diff.

## Actionable C-wrongs

None. Review 834 debt (`do_stone_u` clone killer attribution) stays named in
the map (`turns.md`), not Must-fix — correct placement.

Verdict: **ACCEPT**
