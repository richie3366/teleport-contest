# Review 2516 — ec71b83d9 — mimic zeroobj generic collapse (D-3636)

## Metadata

- SHA: `ec71b83d9` (2026-10-07) — cliffs-head writer, D-3636
- D-entry: D-3636 (display_monster M_AP_OBJECT / map_object / mhidden)
- js diff: `js/display.js` +74/−24ish, `js/pager.js` +19/−5; one helper
  deleted (`map_object_observe_near`), none added
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): a `^G`-genesis giant mimic faking a JADE gem
paints `*` + «A green gem appears next to you.» where C paints `]` +
«A strange object appears next to you.» (scen-genesis-Healer-92189, RNG
3406/3406 matched — display-only divergence). Root cause chain: C builds
the fake from `cg.zeroobj` (oclass/dknown stay 0), which takes
`generic_obj_to_glyph` → `GLYPH_OBJ_OFF+0`, outside the generic range, so
C skips `observe_object` and renders/describes via `objects[0]`
(STRANGE_OBJECT). JS gave the fake no oclass/dknown and gated observe on
the obj instead of the computed glyph. 1 corpus PASS.

Diff actually adds: `oclass: 0, dknown: 0` on the M_AP_OBJECT fake;
`map_object` restructured to C order (compute → glyph-gate → observe →
recompute) with `map_object_observe_near` deleted; `obj_glyph` ch from
otyp class + OFF+0 generic-arm override via `objects[0]`; memory
glyphotyp reads via `glyph_to_obj` in `remembered_glyph_otyp` and
`hidden_object_glyphotyp` (otyp fallback kept).

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | fake `oclass:0, dknown:0` (`display.js:2098–2121`) | `display.c:564–575` zeroobj | ports C |
| 2 | `map_object` compute→gate→observe→recompute (`:2403`) | `display.c:333–355` | ports C |
| 3 | delete `map_object_observe_near` | (wrong-shape helper) | clean delete |
| 4 | `obj_glyph` otyp-class ch + OFF+0 override (`:2523/:2561`) | `display.h:902–913`, mapglyph `:2804` | ports C |
| 5 | `remembered_glyph_otyp` glyph-first read (`:1713`) | `display.h` glyph_to_obj | ports C |
| 6 | `hidden_object_glyphotyp` heroMem arm (`pager.js:1900`) | `pager.c:201–202` + `:213–222` | ports C |

`Ledger:` display_monster + map_object + mhidden_description ported —
consistent; the retired piletop-glyph-flags omit is covered below.

## C ↔ JS fidelity

Checked every cite against pinned C:

- **Fake** (`display.c:566–575`): `obj = cg.zeroobj; ox; oy; otyp =
  mappearance; corpsenm = has_mcorpsenm ? … : PM_TENGU` — C never sets
  oclass/dknown. JS fake now sets exactly `oclass: 0, dknown: 0` plus the
  same four fields. Exact.
- **Generic collapse** (`display.h:806–812,940–942`): `obj_is_generic`
  (¬dknown ∧ gem otyp) is true for the fake, so `generic_obj_to_glyph` =
  `oclass + OFF` = OFF+0. `glyph_is_normal_generic_obj` (`:839–840`) is
  strict `> OFF`, so OFF+0 is **outside** generic range — C's map_object
  gate (`display.c:340`) skips observe, and `glyph_to_obj` (`:902–913`)
  falls to the normal arm returning 0 = STRANGE_OBJECT. JS mirrors all
  three: `obj_is_generic` (`display.js:2361`, verified same disjunction),
  `glyph_is_generic_object` strict-`>` (`display.js:1017–1019`, verified),
  OFF+0 override rendering via `objects[0]` (`display.js:2561`), matching
  mapglyph's `objects[offset].oc_class` (`display.c:2804`, offset 0 →
  ILLOBJ `]`). The `ch = oc_display_sym(otypclass)` change is behavior-
  neutral everywhere else: real objects have oclass == otyp class, and
  oclass-less fakes already fell back to `def.oc_class` on the old line.
- **map_object order** (`display.c:336–355`): compute glyph first, gate
  `glyph_is_generic_object(glyph) && cansee && !Hallu && distu ≤ neardist`,
  observe + recompute, hero_memory store, show. JS `:2400–2410` is the same
  conjunction in the same order (predicate order within `&&` is
  immaterial — all pure). Retiring the piletop omit is valid: C's gate
  macro (`display.h:844–846`) includes piletop-generic, and JS gates on the
  same `glyph_is_generic_object`.
- **mhidden** (`pager.c:201–202`): `glyph = hero_memory && !isyou ?
  levl.glyph : glyph_at` — cited exactly; then `glyph_is_object` →
  `object_from_map` → `otyp != STRANGE_OBJECT ? simpleonames : "strange
  object"` (`:213–222`). JS heroMem arm now reads `glyph_to_obj(rg.glyph)`
  first, keeping the otyp fallback for glyph-less Hallu-STATUE memories.
  End-to-end confirmed by the probe topline reaching «strange object».

RNG call-for-call: the recompute `obj_glyph` fires only under the
non-Hallu gate, and non-Hallu `obj_to_glyph` draws nothing (only the
Hallu statue/random arms burn, both excluded); under Hallu both old and
new code call `obj_glyph` exactly once. Burn-neutral, as claimed — and the
RNG stream stayed 3406/3406 through the fix.

Deleted-helper check (required): `sym.mjs map_object_observe_near` →
`NOT FOUND in js/**`, and no references remain in `js/` — clean deletion,
no dangling caller. All newly referenced names (`glyph_is_object`,
`glyph_to_obj`, `observe_object`) are pre-existing LIVE exports; no new
module edge (D-log Callers confirms pager.js already imported them).

## Hallucinations / overclaim

None. «Stay whole» is claimed for three functions whose arms are all
verified above against cited C ranges; the D-log Callers bullet names per-
C-caller JS flow-through (newsym sites, makemon `:1487` probe path) with
unchanged signatures. No dispatch/callee overclaim.

## Density

Cliff phase §10.18: one cliff (that_is_a_mimic row), one C file family
(`display.c` + its `pager.c` describer — the describer is the same
divergence's second half, not foreign work), three `Ledger:` entries, code
+ verify in one handoff. Owner-vs-writer correct (writer = zeroobj fake
chain). No re-audit, no ledger-text content. Right-sized for the
six-change shape — each change is one link of a single C-proved chain.

## Verification

D-log claims: `verify that_is_a_mimic: 1 PASS` (scen-genesis-Healer-92189),
REACH-OK (smoke 24/24), green + strict + cohort, full 44/44 (shared files).
Focused test 3/4 → 4/4.

Re-measured:
`node scripts/hidden-proxy.mjs verify that_is_a_mimic --base ec71b83d9~1 --reach-all`:

- `verify that_is_a_mimic: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-genesis-Healer-92189: PASS)
- `smoke that_is_a_mimic: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`

PASS claim reproduces exactly; no REGRESSED. Rule #2 clean globally; diff
grep for DIAG/FORCE/etc: 1 hit, inspected — commit-message text («no
DIAG/FORCE/seed gates»), zero in code. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
