# Review 2478 — a4b394110 — restore lastinvnr 0→51 (D-3597)

**Metadata.** SHA `a4b394110` (2026-10-07, D-3597). Type: **cliff**:
writer port for the cliffs head `pickup.c loot_mon` (owner body
C-whole, untouched; the invlet is written by `assigninvlet`
reading `gl.lastinvnr`). `js/` insertions: 9 (`js/save.js` +9/−5)
+ extended test.

## Intent vs deliverable

Promise: D-3584's BSS-0 restore value is falsified by Knight-94336
(C prints «a − a saddle.» with 'a' free — unreachable from 0 with
b–h used); the fresh-process value is g_init_l's 51, so restore
sets 51 while the save-side omission stands. Knight →PASS.

Diff actually adds: the constant + the init-order cites.
Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | try_restore_save lastinvnr value | by-design (fresh-process value) | [save.js](/home/debian/dev/teleport-contest/js/save.js:1041) | decl.c:458 + :1080–1095, allmain.c:40, unixmain.c:66/:263, decl.h:536, invent.c:693–732 |

Helpers: none. `assigninvlet` (u_init.js:877) verified whole but
untouched.

## C ↔ JS fidelity

**The init chain is airtight.** `g_init_l` carries `51, /*
lastinvr */` (decl.c:458, read); `decl_globals_init` copies
`gl = g_init_l` (:1080–1095, read); `early_init` calls it
(allmain.c:40, read) and unixmain runs `early_init` at :66,
`dorecover` at :263 (both read) — every fresh process, including
each per-segment recorder spawn, restores with lastinvnr=51, and
restgamestate never touches it («never saved&restored»,
decl.h:536, read) ✓. The scan (`invent.c:693–732`, read): `for
(i = last+1; i != last; …)` with the 52→−1 wrap — from 51 the
first tried slot is 0 ('a'); from 0 the order is 1,2,…,51,0, so
with b–h used and i–Z free the result is 'i', exactly JS's old
wrong letter — while C printed 'a' ✓. The «try 'a'» reading is
confirmed by C itself: `gl.lastinvnr = 51; /* next inv letter to
try to use will be 'a' */` (nhlua.c:1783, read) ✓.

**JS rotation is identical to C.** JS tries last+1…last in
wraparound order (52 candidates), first free wins, `'#'` iff
none, sticky update only on take. C tries last+1…last−1 then
last's slot as fallback, NOINVSYM (`'#'`, hack.h:575, read) iff
used, `gl.lastinvnr = i` (no-op when nothing taken). Same order,
same fallback, same overflow symbol, same sticky semantics ✓
(coin arm, inuse map, prior-letter preserve all mirror C too).
The D-3584 Samurai ambiguity is behaviorally confirmed: Samurai
passes both pre- and post-fix (test 1/2→2/2 with Samurai green
throughout), so that probe could not discriminate — Knight does.

Record note: review 2466's ACCEPT of D-3584 stands as written
(the evidence then was consistent with 0); D-3597 falsifies the
BSS-0 claim with new evidence, which the D-log states plainly —
no retroactive edit needed.

## Hallucinations / overclaim

None. "Falsifies D-3584" is earned, not rhetoric: the C-prints-'a'
observation is incompatible with 0 in this inventory state, and
every cite in the chain was re-read here.

## Density

Cliff §10.18: cliffs-head writer, one value completing the
by-design row in both directions, own `Ledger:` touch (D-append
on dorecover). Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2471).
- Committed test `save-lastinvnr-gapfill.test.mjs`: 2/2 PASS now
  (Knight FAIL→PASS, Samurai PASS→PASS — the ambiguity made
  executable).
- Re-measure (mine): `verify loot_mon --base a4b394110~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0 worse**
  (Knight-94336 PASS) + smoke 24/24 REACH-OK. No REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
