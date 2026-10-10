# Review 2647 — 1841f1954 — Aggravate uprops union (D-3783)

Metadata. SHA `1841f1954` (2026-10-10), D-3783, parent
`f3651d1cd` (HEAD). js diff: 3 files, +~15/−~5 —
every Aggravate reader gains the uprops union +
`scripts/abuse-dog-aggravate-halve.test.mjs` (new).
Ledger: `abuse_dog` ported-note. Works the abuse_dog
cliff (95308).

## Intent vs deliverable

Promise: 95308@318 — both sides inside the
`rn2(mtame)` gate with post-decrement mtame 6 vs
11: C halved (Aggravate via worn ring → uprops
extrinsic), JS decremented (flats-only read).
Fix: all 3 Aggravate readers read the union
(D-3775 house shape).

Diff delivers exactly that + 3 ALREADY const
imports. Promise and diff match.

## Inventory

Changed JS (1 writer family, 3 predicates):

- abuse_dog gate — `js/dog.js:1442`. C:
  `dog.c:1362–1393` (whole body read: halve
  :1368–1369, abuse++ :1372–1373, unleash
  :1375–1376, yelp/growl `rn2(mtame)` :1381–1384,
  newsym/worm :1386–1391).
- disturb Aggravate_monster — `js/monmove.js:769`.
  C: `monmove.c:349` (full macro — read).
- level_difficulty ring arm — `js/hacklib.js:182`.
  C: `dungeon.c:2081` (E-only — read).
- Macro: `youprop.h:211–213` (H||E over uprops —
  read; the `:212–214` comment cite is off by one
  line, content exact — de minimis).

## C ↔ JS fidelity

**Union reads C-exact.** abuse_dog and disturb use
C's full H||E macro → full union; level_difficulty
uses E-only → extrinsic arm only (intrinsic
correctly excluded). JS abuse_dog matches C arm by
arm incl. the post-decrement `rn2(mtame)` gate and
the mx!=0 sound skip. Mechanism same as D-3775
(confer writes uprops extrinsic only); the D-log's
post-move probe (ring still worn, extrinsic
legit, 3 interim abuse draws matched) rules out a
stuck bit. hero_conflict (live, mondata.js) kept
as the Conflict arm — pre-existing superset, false
here both sides. No symbol deleted or re-pointed,
so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The mtame 6-vs-11
split is exactly halve-vs-decrement evidence, and
the new owner (432 themerms-lua throw) is named,
not hidden — it becomes the cliffs block's throw
row for the next iter, not this commit's debt.

## Density

Cliff-phase §2b: one row, writer family shipped
whole (all 3 readers, one macro), no bundling.
95308 318 → 432 (+2770 RNG). Full 44/44 ran
(shared file).

## Verification

D-log Verify: abuse_dog 1 moved; full reach
269/269; gates + cohort + full PASS.

Re-measured by this audit (`verify abuse_dog
--base 1841f1954~1 --reach-all`):

```text
verify abuse_dog: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Ranger-95308: moved → js-throw at step 432 (was 318)
reach abuse_dog: 269 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly, 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
