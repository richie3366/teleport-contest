# Review 700 — 3c4dafe8 — display.c display_monster M_AP_OBJECT map_object (D-1739)

## Metadata
- Full / short hash: `3c4dafe8641f229515228bb110b2aabefc1a0ac6` / `3c4dafe8`
- Parent: `8a58906e` (D-1738). This file audits **this SHA only** (fifth of five `js/` commits since review **695**). Archive **Addressed:** D-1739 — this review commit fills `%h` `3c4dafe8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 22:20:42 +0200
- D-id: **D-1739**
- Stats: `js/display.js` +26/−28. Total `js/` insertions **26** <250. Band **150–350**.
- Claims to close: Open mimic `map_object` observe after D-1738 / reviews **687** and **697** (Protection LIVE; object arm still skipped the helper when sensed, else painted `obj_glyph` without `map_object`). Not M_AP_OBJECT glyph-only. Not furniture lastseentyp. `reviews/loop-2026-08-15/` has no unpaid `map_object` Must-fix.
- JS / map: `display.js` `display_monster` M_AP_OBJECT. `c-js-map/turns.md`.
- Prior: **697** named `:564–575` as omit. **687** named the same.

## Intent vs deliverable

Git subject promises: M_AP_OBJECT mimics write hero memory through `map_object(&obj, !sensed)` (and `observe_object` when generic+near) even when Protection/sensemon sees through the disguise, instead of skipping the object arm after D-1736.

`node scripts/csym.mjs display_monster` → `display.c:513–622`. `--callers map_object` includes `display.c:574`. `map_object` `display.c:332–366`. `observe_object` `o_init.c:441–451`. `has_mcorpsenm` / `MCORPSENM` `mextra.h:225–234`.

```564:575:nethack-c/upstream/src/display.c
        case M_AP_OBJECT: {
            struct obj obj;
            obj = cg.zeroobj;
            obj.ox = x;
            obj.oy = y;
            obj.otyp = mon->mappearance;
            obj.corpsenm = has_mcorpsenm(mon) ? MCORPSENM(mon) : PM_TENGU;
            map_object(&obj, !sensed);
            break;
        }
```

Parent: `mimic_object_appearance_glyph` returned null when sensed (no memory); else `show_glyph_cell` + `remembered_glyph` without `map_object`/`observe_object`. The diff **does** build a fake obj (`ox`/`oy`/`otyp`/`corpsenm`) and call live `map_object(obj, !sensed)`. It **does not** port pet/detected/`show_mon_or_warn`. Named. It **does not** call `display_monster` on the !cansee arm. Named. Helper kept for `reveal_terrain_getglyph` displayed layer only.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `display_monster` M_AP_OBJECT | LIVE repaired | C `:564–575` |
| `map_object` | LIVE callee | same file; memory even when `show` false |
| `observe_object` | LIVE import | invent.js D-1713 |
| `map_object_observe_near` | LIVE local | C generic+cansee+neardist |
| `has_mcorpsenm` / `MCORPSENM` | LIVE const | |
| `PM_TENGU` | LIVE local | default corpsenm |
| `mimic_object_appearance_glyph` | leftover CLONE | displayed layer only; do **not** add #2 |
| `obj_glyph` | CLONE tty of `obj_to_glyph` | inside `map_object` |
| pet/detected/`show_mon_or_warn` | OMIT named | |
| !cansee `display_monster` | OMIT named | |

`node scripts/sym.mjs`:

```
map_object       js/display.js:1350   sync
observe_object   js/invent.js:2564   sync
obj_glyph        js/display.js:1437   sync
has_mcorpsenm    js/const.js:3107   sync
mimic_object_appearance_glyph NOT EXPORTED — 1 LOCAL  js/display.js:867
```

`--can display.js invent.js observe_object`: ALREADY. No new TDZ edge. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Fake obj (`:566–573`).** C `zeroobj` then `ox`/`oy`/`otyp`/`corpsenm` (`has_mcorpsenm ? MCORPSENM : PM_TENGU`). JS `{ ox: x, oy: y, otyp: mappearance, corpsenm }`. Same four fields `map_object`/`obj_glyph`/`observe_object` read. Missing zeroed `quan`/`dknown` is C `zeroobj` (0). `obj_is_generic` uses `objects[otyp].oc_class` when `oclass` is absent. **Match the inputs.**

```1106:1118:js/display.js
        case M_AP_OBJECT: {
            const obj = {
                ox: x, oy: y,
                otyp: mon.mappearance | 0,
                corpsenm: has_mcorpsenm(mon) ? MCORPSENM(mon) : PM_TENGU,
            };
            map_object(obj, !sensed);
            break;
        }
```

**`map_object` (`:332–366`).** C `obj_to_glyph`; if `glyph_is_generic_object && cansee && !Hallucination` and `distu <= neardist`, `observe_object` then glyph again; if `hero_memory` store (Hallu+STATUE → `random_obj_to_glyph`); `if (show) show_glyph`. JS `map_object_observe_near` then `obj_glyph` then `remembered_glyph` then `if (show) show_glyph_cell`. Observe runs **before** the show test, so sensed (`show=false`) still observes and writes memory. **Match that order.** `object_neardist` is `(r*r)*2 - r` with `r = xray>2 ? xray : 2`. **Match neardist.** `observe_object` is invent.js C-home (`otyp >= FIRST_OBJECT && !Hallucination()`). **Match the callee.** Sticky `game.u.Hallucination` in `map_object_observe_near` vs youprop in `observe_object` is pre-existing map_object, not this arm.

**show=`!sensed`.** C show_glyph only if !sensed; memory always. Then second `if (!mon_mimic || sensed)` paints the real monster (`:589`). JS `map_object(..., !sensed)` then the same second `if`. Under PfSC, screen is the mlet and memory is `$`/`!`. Parent skipped memory when sensed. **Match C’s split.**

**Helper leftover.** `mimic_object_appearance_glyph` still nulls when sensed — occupancy/reveal displayed layer, not memory. C gbuf classifies the already-chosen glyph (monster when sensed). Do **not** add #2. Do **not** restore the helper as the `display_monster` writer.

**Callee closure (M_AP_OBJECT arm).** LIVE: `map_object` (body ports C), `observe_object`, `obj_glyph` (verified tty CLONE), `has_mcorpsenm`, `MCORPSENM`, `show_glyph_cell` (inside `map_object` when !sensed). OMIT named: pet/detected/`show_mon_or_warn`; !cansee `display_monster`; `see_monsters` MON_STILL_ARRIVING; `feel_location` `is_worm_tail`. STUB in this arm: **none**. Reviews **687**/**697** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “memory through map_object even when Protection/sensemon sees through”: **true**. D-log “generic potion/gem/spell nearby still observe_object”: **true** when `obj_is_generic`. Do **not** stamp “Match C pet/detected glyphs / `show_mon_or_warn`.” Do **not** stamp “Match C !cansee `display_monster`.” Do **not** stamp “Match C `zeroobj` every field.” Journal “fortress held” is not a gold-mimic screen proof. Public sessions **do not** hit object mimics + PfSC; canary was node gold `$` mem vs `m` disp. Admit public-unhit.

## Density

§2b: one `display_monster` case + the C callee it already had live (`map_object`). +26; the C arm is 12 lines. Did not glue pet glyphs / !cansee `display_monster`. Did **not** reopen D-1736 Protection or D-1738 cmap.

## Verification

D-log: save-oracle skip (untagged `display.c:display_monster`); node gold `$` memory vs mimic `m` under PfSC, `$`/`$` without, potion `!` + `oc_encountered` when sensed; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (incl. seed2200/0383). Rule #2 clean. Object-mimic **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open object arm matches C). Named: pet/detected/`show_mon_or_warn` (`:588–619`); !cansee `display_monster` (`:1053`); `see_monsters` MON_STILL_ARRIVING; `feel_location` `is_worm_tail`. Do **not** restore helper-as-writer. Do **not** skip `map_object` when sensed. Do **not** add `mimic_object_appearance_glyph` #2. Do **not** re-port D-1736 Protection / D-1738 cmap / D-0297 obj_glyph-only.

Verdict: **ACCEPT-WITH-DEBT**
