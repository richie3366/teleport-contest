# Review 2618 — 6af5aea14 — makemon MON_AT gate via live m_at (D-3751)

Metadata. SHA `6af5aea14` (2026-10-09), D-3751, parent
`91497e5d4`. js diff: `js/makemon.js` +12/−22 (gate body
+ comment, `worm_mon_at` import dropped) +
`scripts/makemon-monat-dead-gate.test.mjs` (new, 2 its).
Ledger: `makemon` partial (D-3751 appended). Works its
HEAD's cliffs head (`mkobj.c` next_ident, 5 blocked:
95420, 95229, 95237, 95247, 95248 — verified in the parent
queue; owner proved symptom per D-2228, writer = the
summon-makemon occupancy gate).

## Intent vs deliverable

Promise (subject + D-log): 95229@248 C `rnd(2) @
next_ident` (2nd summon makemon creates) vs JS `rn2(44) @
pick_nasty` (3rd pick, zero intervening draws) — JS
makemon voided creation on a cell its own enexto/goodpos
had called free. Root cause measured (instrumented /tmp
copy, 7 NULL pairs all at 9,17 with an mhp=0 hit): the
hand-rolled fmon scan treated a dead salamander husk
(awaiting dmonsfree) as occupying, while C's MON_AT is
the live grid. Replace the scan with the live `m_at()`;
drop the `worm_mon_at` import.

Diff actually adds exactly that. Promise and diff match.
No new edges, no signature change.

## Inventory

Changed JS (1 gate):

- makemon MON_AT gate — `js/makemon.js:3355–3370`
  (gate `:3364`).
  C: `makemon.c` `:1193–1199` (`if (MON_AT(x, y))` +
  MM_ADJACENTOK / enexto_core / re-point — verified in
  the printed body); `MON_AT` = `level.monsters[x][y]`
  non-null (`rm.h`, grid, verified); `m_at` = the grid
  occupant.

## C ↔ JS fidelity

**Contract exact.** The gate arms (ADJACENTOK return,
enexto_core re-point) are untouched and match C. The
occupancy predicate is now `m_at(x, y)`
(`js/mon.js:1725`, body read): grid lookup via
`level_mon_at` (worm-seg-aware head pointer) then an
fmon scan skipping steed, `mhp<=0` (DEADMONSTER), and
MON_OFFMAP — exactly C's live-grid contract (dead mons
linger on fmon off-grid until dmonsfree; the mounted
steed is remove_monster'd; gulped mons are off-grid).

**No coverage lost.** `worm_mon_at(x, y)` is literally
`level_mon_at(x, y)` (`js/worm.js:80–82`), which is
`m_at`'s first line — so the D-0545 worm-tail rejection
is preserved identically, and the fmon scan is a
superset-or-equal for every live mon while ceasing to
fire on dead/offmap/steed cells. Strictly C-closer; the
old scan was a diverging CLONE, now a LIVE import.

**Callees:** m_at (LIVE, already imported), enexto_core
(LIVE, untouched). No stubs. `worm_mon_at` still
exported from worm.js with live in-file users — only
makemon.js's import went away (no orphan).

**Test.** Dead-husk-on-fmon → creation succeeds at its
cell; live mon → NULL control. 1 fail pre-fix on the
stashed tree (authentic), 2/2 post-fix. Pins the exact
mechanism.

## Hallucinations / overclaim

None. The mechanism is measured twice (matched 45-draw
enexto prefix + /tmp instrumented NULL pairs), and the
falsified alternatives (nasties order, alt-substitution,
collect/goodpos) are named as measured, not assumed.
Diff grep (FORCE / DIAG / getRngLog / fastforward / seed
/ coords): zero hits. Local clone → import re-point:
`sym.mjs` paste required and below — both single sync
exports, no clones.

```text
m_at             js/mon.js:1725   sync
worm_mon_at      js/worm.js:80   sync
```

Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is next_ident (5 blocked,
RNG lost 97653); this commit ships one writer whole (2
FULL PASS + 1 moved +245 at ship), names the row's other
writers for regen (95420 bones-remap, 95248 gas-cloud
state, 95229's new 493 — each with its locus). One
cliff, one C locus, no bundling. Correct gates
(green/strict/cohort + full 44/44 on the shared file).

## Verification

D-log Verify (`verify.mjs --fn next_ident,makemon`): 2
PASS + 1 moved (+245, still next_ident) + 1 unchanged
(95420, separate writer) + **1 worse** (95248,
nominal — stash A/B drift proof: worker rngM 29458
identically with and without the change, board 29530
predating intervening iters, FAIL→FAIL never PASS);
reach 80/80 spreads → REACH-OK; REACH-all makemon
1008/1008 → REACH-OK; green/strict/cohort/full PASS.

Re-measured by this audit (`verify next_ident,makemon
--base 6af5aea14~1 --reach-all`; HEAD code includes 4
later SHAs):

```text
verify next_ident: 4 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach next_ident: 1011 baseline-PASS session(s) reach it (1011 run, 448.4s): 1011 PASS, 0 regressed → REACH-OK
reach makemon: 1008 baseline-PASS session(s) reach it (1008 run, 446.9s): 1008 PASS, 0 regressed → REACH-OK
```

The ship-time "worse" 95248 is now FULL PASS under
later SHAs and 95229 sits at toss_up@554 (past the named
493); 0 worse stands on current code and full
(non-spread) reach on both functions is 2019 sessions
with 0 regressed. The drift claim is moot — no
regression, no Must-fix. No vacuous check (row cited 5;
all 5 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
