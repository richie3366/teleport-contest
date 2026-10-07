# Review 2487 — 3a6c5602f — obj_nutrition live data (D-3606)

**Metadata.** SHA `3a6c5602f` (2026-10-07, D-3606). Type: **cliff**:
writer fix for the cliffs head `eat.c lesshungry` (1 corpus
block) — the meal-length value is written by `obj_nutrition`,
which returned 0 for the meat family. `js/` insertions: 8
(`js/eat.js` +2/−28 table delete, `js/generated/objects_data.js`
regen) + extractor + new test.

## Intent vs deliverable

Promise: the extractor emits `oc_nutrition` (r22), the table
regenerates, the hand table dies, `obj_nutrition` becomes the
C 3-arm shape over live data; Tourist-91125 → PASS.

Diff actually adds: extractor field + regen + 3-arm body.
Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | obj_nutrition (live oc arm) | ported | [eat.js](/home/debian/dev/teleport-contest/js/eat.js:992) | eat.c:322–332 + objects.h:1033/FOOD rows |

Helpers: none (data fix; `game.objects` from
`createObjectsArray`, js/objects.js:70).

## C ↔ JS fidelity

**C body confirmed.** `csym obj_nutrition` → eat.c:322–332:
CORPSE→`mons[].cnutrit`, globby→`owt`, else
`objects[].oc_nutrition` ✓. JS is the same 3 arms in C order
(+ a `!otmp→0` null guard C never needs — safe extension) ✓.

**Data verified against C.** Extractor appends
`(int)o->oc_nutrition` as r[22] (dump + row + mapping, read)
— r[0..21] untouched, so the regen can only add the field ✓.
Generated values match C objects.h FOOD rows (re-read):
ENORMOUS_MEATBALL 2000 (:1059), MEATBALL/MEAT_STICK 5
(:1054/:1056), APPLE 50, MELON 100, FOOD_RATION 800,
ROYAL_JELLY 200, FORTUNE_COOKIE 40, EUCALYPTUS 1, TRIPE 200 —
all 7 sampled hand-table values agreed with C, so the fix
adds the missing family (meat 0→5/2000, kelp 0→30) without
changing any previously-covered item ✓.

**Leftovers are named, not silent.** dogmove.js keeps its
hand table with a now-wrong `ENORMOUS_MEATBALL: 5` — but
`food_oc_nutrition` reads live `oc_nutrition` first (:432–
433, read), so the table is dead when `game.objects` is set,
exactly as the D-log states; mkobj.js fallbacks likewise.
Other C files' JS, shadowed by live data — legitimate deferral.

## Hallucinations / overclaim

None. "Byte-reproducible before the change" is a method claim
consistent with the append-only extractor diff; the dead-table
values are disclosed with their wrong entry quoted, not
hidden.

## Density

Cliff §10.18: parent queue head is lesshungry (Tourist-91125
— re-read from `3a6c5602f~1:docs/LOOP-QUEUE.md`) ✓. One
cliff, own `Ledger:` touch (D-3606 on obj_nutrition), probe →
PASS. Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (data + 3-arm body; no gates).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `obj-nutrition-meatball.test.mjs`: PASS now.
- Re-measure (mine): `verify lesshungry --base 3a6c5602f~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0
  worse** (Tourist-91125 PASS) + smoke 24/24 REACH-OK. No
  REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
