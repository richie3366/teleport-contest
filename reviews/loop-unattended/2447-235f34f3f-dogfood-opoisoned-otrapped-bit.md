# Review 2447 — 235f34f3f — dogfood reads the `opoisoned≡otrapped` bit (D-3564)

**Metadata.** SHA `235f34f3f` (2026-10-06, D-3564). Type: **cliff**:
writer port (one aliased-bit read in a callee) for the cliffs head
`dogmove.c dog_goal` (3 blocked). `js/` insertions: 4
(`js/dogmove.js` +4/−1) + 1 test file (56 lines).

## Intent vs deliverable

Promise: dogfood's poison head reads `opoisoned || otrapped` because C
has one bit under two names, so a trapped box classifies POISON
draw-free instead of falling through to `obj_resists`' `rn2(100)`; 3
sessions moved; zero-draw/APPORT test.

Diff actually adds: the union condition + 3 cite lines. Promise matches
diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `dogfood` (poison head; rest pre-existing per D-2760) | ported | [dogmove.js](/home/debian/dev/teleport-contest/js/dogmove.js:186) | dog.c:994–1005; obj.h:137–139; mkobj.c:1010–1014 |

Helpers: none. `resists_poison` live, untouched.

## C ↔ JS fidelity

**The alias:** obj.h:137–139 read — `Bitfield(otrapped,1)` +
`#define opoisoned otrapped`: one bit ✓. **The writer:**
mkobj.c:1012–1014 read — CHEST/LARGE_BOX `olocked = !!(rn2(5))`,
`otrapped = !(rn2(10))` ✓; JS mkobj.js:2545 mirrors both lines with the
same draws ✓. **The reader:** dog.c:1002
`if (obj->opoisoned && !resists_poison(mon)) return POISON;` read; JS
:186 is now `(obj.opoisoned || obj.otrapped) && !resists_poison(mon)`
— the union of the two JS fields C's single bit partitions into ✓.

**Union soundness (the load-bearing claim):** the union equals C's bit
on every reachable state iff JS writes mirror C writes to that bit and
no object carries both meanings across a one-sided clear. Spot-checked
both writer lists: `otrapped` sets touch containers/boulders only
(dokick boulder, trap container sites, mklev chest, lock box, zap
box→box); `opoisoned` sets touch weapons/ammo only (potion dip, dart
traps, orcish arrows, poisonable sites). Fresh-missile and naming
clears are class-consistent (other field 0 there). The one known
class-crossing path — poly_obj box↔weapon transfer — is disclosed in
Next as a sibling row with exact C/JS cites, not ridden here ✓. TEMP-C
evidence (C fobj[0] LARGE_BOX `pois=1` from moves=2 vs JS 0, all other
fields bit-identical) independently names the bit, not the theory.

**Draw order:** C :1002 returns before :1004's `obj_resists(obj,0,95)`
(`rn2(100)` inside); JS head likewise precedes its :188 `obj_resists`
call — draw-free POISON both sides ✓. Short-circuit, RNG, return
domain unchanged by the diff ✓.

## Hallucinations / overclaim

None. "bit-identical both sides", "3809/3809 RNG re-record", "1/2
pre-fix authentic red" are measured. The Next-bullet sibling list
(meatmetal/meatobj/mergable/poly_obj with C:line + JS:line each) is
disclosed future work with per-row discipline — the opposite of
overclaim.

## Density

Cliff §10.18: dog_goal-head writer (dog_goal itself faithful per
D-2141; its callee misread). One cliff, one head, own `Ledger:` entry
✓. 0 unchanged — the whole 3-session row moved, each to a strictly
later step with a new owner named. The 5 siblings stay out of the unit
by explicit rule. Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/dogfood-trapped-box.test.mjs`: 2/2 pass.
- Re-measure (mine, `--base 235f34f3f~1 --reach-all`, current code):
  `dogfood`: 0 blocked (honest writer shape), smoke 24/24 REACH-OK;
  `dog_goal`: **0 PASS, 3 moved past, 0 unchanged, 0 worse →
  PROGRESS** (94326 69→can_make_bones@82, 94096 72→wishymatch@108,
  94282 75→watch_dig@238 — owner+step exact vs the D-log);
  `reach dog_goal`: **499/499, 0 regressed → REACH-OK**. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
