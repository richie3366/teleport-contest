# Review 2517 — 21e50cfeb — Hallu statue glyph color (D-3637)

## Metadata

- SHA: `21e50cfeb` (2026-10-07) — cliffs-head writer, D-3637
- D-entry: D-3637 (obj_glyph Hallu statue arm)
- js diff: `js/display.js` +4/−1 (one const + C-cite comment)
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): under Hallucination a statue at map (15,15)
paints `D`/white where C paints `D`/blue (scen-impaired-Healer-94150 step
17, RNG 6791/6791, single-cell diff, 0 map-memory diffs per geom-probe);
C's Hallu statue glyph is `random_monster + GLYPH_MON_*_OFF` — a plain
monster glyph whose tty color is `mon_color(mnum)` — while JS used
`objects[STATUE].oc_color`. 1 corpus PASS.

Diff actually adds: exactly that — `const color = mcolors[mnum] ??
NO_COLOR` replacing `def?.oc_color ?? CLR_WHITE` in the Hallu statue arm.
Nothing else in `js/`.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `js/display.js:2537` Hallu-statue color | `display.h:950–953` + mapglyph mon arm | ports C |

`Ledger:` map_object ported — the arm lives in `obj_glyph` (map_object's
glyph computer); ledger entry names the owning envelope, consistent.

## C ↔ JS fidelity

C `display.h:950–953` (`statue_to_glyph`, Hallu arm):

```c
? ((random_monster(rng))
   + ((!(rng)(2)) ? GLYPH_MON_MALE_OFF : GLYPH_MON_FEM_OFF))
```

The result is a plain monster glyph; mapglyph's monster arm colors it via
`mon_color(mnum)` = `mons[mnum].mcolor` — never `objects[STATUE].oc_color`
(white). JS: `mcolors` is the complete `mcolor` table (verified: 383
entries, 0 undefined, NUMMONS 383 — the `?? NO_COLOR` fallback is dead,
exactly like C's total function), so `mcolors[mnum]` is `mon_color(mnum)`.
The sibling Hallu corpse-random arm in the same function
(`js/display.js:2505`) uses the identical expression — established house
pattern, not a new idiom.

Draw order: the diff adds/removes no RNG call (`rn2_on_display_rng(NUMMONS)`
+ `rn2_on_display_rng(2)` untouched above it), so «zero display-RNG delta»
holds trivially. The non-Hallu statue arm (`:954–961`: corpsenm + spe
gender + piletop banks) is present below the diff hunk, as the D-log's
Named bullet states — verified by reading `js/display.js:2539–2548`.

No helper involved (pure expression swap); no clone/stub/no-op question.

## Hallucinations / overclaim

None. One-line fix, one-cell symptom, geom-probe measurement cited (0
memory diffs ⇒ display-level color). The «dispatch equivalence» note
(statue-first in C vs Hallu-non-statue-first in JS) is checkable in the
same function and the session PASS corroborates it. No overclaim.

## Density

Cliff phase §10.18: one cliff, one writer arm, one `Ledger:` entry, code +
verify in one handoff. Owner-vs-writer explicit (make_hallucinated whole
per D-2200/D-2458; writer = statue glyph color). Minimal diff for a
single-value divergence — right-sized, not thin: the value chain (C macro
→ mapglyph color → JS table) is fully traced in the D-log.

## Verification

D-log claims: `verify make_hallucinated: 1 PASS` (scen-impaired-
Healer-94150), REACH-OK (smoke 24/24), green + strict + cohort, full 44/44
(shared file).

Re-measured:
`node scripts/hidden-proxy.mjs verify make_hallucinated --base 21e50cfeb~1 --reach-all`:

- `verify make_hallucinated: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Healer-94150: PASS)
- `smoke make_hallucinated: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`

PASS claim reproduces exactly; no REGRESSED. Rule #2 clean globally; diff
grep for FORCE/DIAG/getRngLog/fastforward/coords: 0 hits. No
seed/step/coordinate reads. (No committed focused test this SHA — the
one-cell symptom is covered by the corpus session itself reaching PASS.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
