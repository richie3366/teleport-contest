# Review 1953 — e61bdd324 — uhitm.c stumble_onto_mimic whole-body port (D-2993)

## Metadata

- Full / short hash: `e61bdd324963c9c0956c284524d108c035069826` / `e61bdd324`
- Parent: `e74c75d1f` (D-2992, review 1952 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 21:42:42 +0200
- D-id: **D-2993**
- Stats: `js/uhitm.js` +14/−4, `js/mon.js` +5/−2 (export keyword +
  comment), new `scripts/stumble-onto-mimic.test.mjs`. `js/`
  insertions **~19**. Band 80–350.
- Claims to close: coverage row `stumble_onto_mimic` (0 blocks).

## Intent vs deliverable

Subject promises the whole-body port (AD_STCK stick + blind map arms).
Body promises C-order reveal/stick/wakeup/map tail, `m_next2u`
canonicalization via the mon.js export, and an 8/8 test.

Diff actually adds exactly that. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `stumble_onto_mimic` | LIVE repaired | `js/uhitm.js:4555`, async, 2→8 code lines |
| `m_next2u` | LIVE canonicalized | local → exported `js/mon.js:3830`, sync |
| 5 other `m_next2u` locals | CLONE pre-existing | disclosed untouched, not this row |
| all 8 callees | LIVE | that_is_a_mimic/dmgtype/m_next2u/set_ustuck/wakeup/canspotmon/memory_glyph_is_invisible/map_invisible |

`node scripts/sym.mjs m_next2u` (required: local → import re-point):

```
m_next2u         js/mon.js:3830   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/apply.js:1426  js/mhitu.js:308  js/muse.js:255  js/shk.js:4680  js/wizard.js:788
```

`--can uhitm.js mon.js m_next2u`: **ALREADY**. Diff grep hit is only
`NODIAG` in an unchanged import context line. Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs stumble_onto_mimic` →
`nethack-c/upstream/src/uhitm.c:6281-6297` (17 lines). 6 code callers:
`apply.c:3250`, `hack.c:1939`, `lock.c:573`, `lock.c:765`,
`trap.c:5962`, `uhitm.c:264`.

- `:6285` reveal → awaited `that_is_a_mimic(mtmp, MIM_REVEAL`). Match.
- `:6287–6291` stick arm → `!u0.ustuck && !mtmp.mflee &&
  dmgtype(mtmp.data, AD_STCK) && m_next2u(mtmp)` with `&&`
  short-circuit preserved and the polearm comment kept. `set_ustuck`
  is sync (`mhitu.js:1610`), correctly un-awaited. Match.
- `:6293` `wakeup(mtmp, FALSE)` → awaited. Match.
- `:6294–6297` blind tail → `!canspotmon && !memory_glyph_is_invisible
  (at(mx,my))` → `map_invisible`. The hero-memory-id rendering is the
  D-1774 idiom for `levl[][].glyph`; all three display callees sync.
  Match.
- `m_next2u` body `dx²+dy² ≤ 2` ≡ `you.h:560` `distu ≤ 2`. Match.
- Callers: apply.js:3515 ✓, cmd.js:5374 (C hack.c:1939 nopick arm —
  predicate and Pardon-me/move-into arms mirror C verbatim) ✓,
  lock.js:1323 (`:573`) + lock.js:791 door-mimic (`:765`) ✓,
  trap.js:7784 ✓, uhitm.js:4641 (`:264`) ✓. All 6 wired; the
  hack.js:1276 "Named" note belongs to `hero_mimic_unhide_after_move`
  (`hack.c:2953–2960`), not to these six.

No RNG in C; none in JS.

## Hallucinations / overclaim

None. "Every arm ported, every callee live, all 6 callers wired" is
accurate; the untouched clone drift is disclosed.

## Density

§2b: 17-line C function restarted whole, ~19 JS lines. Below ~40
insertions but C is that small. Right size.

## Verification

D-log: vacuous hidden note + REACH-OK, focused test 8/8 with a
falsification probe (thin body → exactly the 2 arm tests fail).
Re-ran here:

```
verify stumble_onto_mimic: baseline e61bdd324~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke stumble_onto_mimic: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
node --test scripts/stumble-onto-mimic.test.mjs → pass 8, fail 0
```

Honest vacuous + REACH-OK, no REGRESSED; test reproduced 8/8. Claims
hold.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
