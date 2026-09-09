# Review 1172 — a234ca48 — trapeffect_sqky_board both arms (D-2206)

Metadata: SHA `a234ca48`, `js/trap.js` only (+47/−10 across two
hunks), D-2206. Queue row `trapeffect_sqky_board`
(scen-normal-Barbarian-92064 step 72/101, 0 blocked RNG: C «A board
beneath the kitten squeaks a B flat loudly.» vs JS «... your
kitten ...»).

Intent vs deliverable: subject promises the monster-arm namer fix
("the kitten" not "your kitten") + the absent hero arm. Diff actually
does both: `x_monnam_tame` → live `mon_nam` via `pline_mon` (pline
then seetrap, C order), and a new `is_youmonst` hero arm in C order.
Promise == diff.

Inventory: one extended function (`trapeffect_sqky_board`), no new
helpers. Import list only drops the now-unused `x_monnam_tame` —
grep confirms zero remaining uses in the file, so the removal is
safe. `_trflags` → `trflags` rename (now read by the forcetrap
computation).

**C ↔ JS fidelity**: arm-by-arm confirm vs `trap.c:1402–1476`
(body read). Monster in-sight arm: C `:1449–1452` prints via
`pline_mon` with `mon_nam(mtmp)` then `seetrap` — JS now does exactly
this; the old `x_monnam_tame` (ARTICLE_YOUR) contradicted C, which
uses ARTICLE_THE even for tame pets (the recorded divergence). Hero
arm: forcetrap from FORCETRAP/FAILEDUNTRAP/Flying+VIASITTING
(`:1414–1416`, computed pre-branch on both sides, hero-Flying on
both); Levitation/Flying notice branch with Blind gate + Hallu
linoleum variant (`:1419–1426`, `You()` rendered as `pline('You …')`
per file convention); else-branch seetrap + Deaf vibrates /
squeaks-note-loudly format (`:1428–1436`) + `wake_nearby(FALSE)`
(`:1436`) — all in C order, both formats byte-exact against the
`"%s%s%s"` construction. Early `return Trap_Effect_Finished` inside
the hero arm equals C's fall-through to the single `:1475` return.
Callee closure: `mon_nam` LIVE sync export (`sym.mjs`:
`js/do_name.js:1025`), `pline_mon` LIVE async and awaited;
`seetrap`/`trapnote`/`is_youmonst`/`hero_Levitation`/`hero_Flying`
file-live; `wake_nearby` is the pre-existing file-local sync subset
(`js/trap.js:2930`) with C ref + named omissions (wake_msg,
buried-zombie disturb, petcall whistletime) — a documented CLONE,
not a stub, and the arm ships nothing stubbed. Soundeffect/IndexOk
stays a named no-op (draws no RNG; trapnote is total in JS, so the
guard is subsumed as the map records). No RNG drawn by either arm's
new code, matching C.

Hallucinations / overclaim: none. No dispatch-with-stubbed-callee.
No FORCE/DIAG/seed/coordinate reads in the diff.

Density: 47 insertions completing a 70-line C function (recorded
one-line divergence + same-function omission retirement in one
module) — an allowed §2b cluster, not two unrelated items.

Verification: D-log Verify bullet shows hidden 1 PASS + green +
cohort + manual full 44/44. Re-measured myself:

```text
verify trapeffect_sqky_board: baseline a234ca48~1 — 1 blocked
  scen-normal-Barbarian-92064: PASS
1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine PASS on the blocked session, not vacuous. Full-suite
re-confirmed by this iteration's cadence run (44/44 below).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
