# Review 708 — a85a8aac — display.c show_mon_or_warn I-glyph unmap (D-1747)

## Metadata
- Full / short hash: `a85a8aacf6e225a7aec2cb1acd15dee372ebcbc9` / `a85a8aac`
- Parent: `df2bec69` (D-1746). This file audits **this SHA only** (eighth of nine `js/` commits since review **700**). Archive **Addressed:** D-1747 `a85a8aac`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 00:08:10 +0200
- D-id: **D-1747**
- Stats: `js/display.js` +43/−21. Total `js/` insertions **43** <250. Band **150–350**.
- Claims to close: Open `show_mon_or_warn` after D-1746 / reviews **698** / **700** / **706** (I left in memory after Detect / warning). Not pet/detected glyph ids. `reviews/loop-2026-08-15/` has no unpaid I-unmap Must-fix.
- JS / map: `display.js` helper + `display_monster` / `display_warning` / cansee `newsym`. `c-js-map/turns.md`.
- Prior: **700** named I-unmap; **706** named the helper as omit of the dark `display_monster` painter.

## Intent vs deliverable

Git subject promises: remembered I-glyphs are unmapped (and cansee `vobj_at` mapped as objects) instead of leaving I in memory after D-1746.

`node scripts/csym.mjs show_mon_or_warn` → `display.c:481–496`. `--callers show_mon_or_warn`: proto `:126`; `display_monster` `:619`; `display_warning` `:650`. `unmap_object` `:408–438`. `glyph_is_invisible` `display.h:773`. `vobj_at` `display.h:22`.

```481:496:nethack-c/upstream/src/display.c
show_mon_or_warn(coordxy x, coordxy y, int monglyph)
{
    struct obj *o;
    if (glyph_is_invisible(levl[x][y].glyph)) {
        unmap_object(x, y);
        if (cansee(x, y) && (o = vobj_at(x, y)) != 0)
            map_object(o, FALSE);
    }
    show_glyph(x, y, monglyph);
}
```

Parent: real-monster and warning arms called `show_glyph_cell`. Cansee `newsym` nulled `remembered_glyph` then `map_location_memory` as an I stand-in. The diff **does** add a local helper, wire both C callers, and drop that cansee stand-in so leftover I is the helper’s job. It **does not** port pet/detected `GLYPH_*` ids (still `worm_tail_glyph` / `mon_glyph` at this SHA). Named. Mimic PHYSICALLY_SEEN arms stay `show_glyph` / `map_object`. Integer `monglyph` stays the tty `{ch,color,attr}` adapter.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `show_mon_or_warn` | LIVE local | C `:481–496`; tty args not `int` glyph |
| `glyph_is_invisible` | LIVE adapter | `remembered_glyph.invisible` ≡ `GLYPH_INVISIBLE` |
| `unmap_object` | LIVE | C `:408–438` |
| `objects_at` | LIVE import | ≡ `vobj_at` pile top (`mkobj.js`) |
| `map_object` | LIVE | `show=false` ≡ C `FALSE` (D-1739) |
| `cansee` | LIVE import | `vision.js` |
| `show_glyph_cell` | LIVE tty | ≡ `show_glyph` |
| `display_monster` real arm | LIVE repaired | `:619`; mimic arms unchanged |
| `display_warning` | LIVE repaired | `:650`; glyph pick pre-existing |
| cansee `newsym` I-null | removed | now `_map_location` only |
| pet/detected glyphs | OMIT named | later D-1748 |
| `feel_location` `is_worm_tail` | OMIT named | |
| make_blinded `Sting_effects(-1)` | OMIT named | |

`node scripts/sym.mjs`:

```
show_mon_or_warn NOT EXPORTED — 1 LOCAL  js/display.js:799
unmap_object     js/display.js:741   sync
map_object       js/display.js:1469   sync
glyph_is_invisible js/display.js:715   sync
display_warning  NOT EXPORTED — 1 LOCAL  js/display.js:669
display_monster  NOT EXPORTED — 1 LOCAL  js/display.js:1179
objects_at       js/mkobj.js:2321   sync
cansee           js/vision.js:1059   sync
```

`--can display.js mkobj.js objects_at`: ALREADY. No clone→import re-point. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. Do **not** add `show_mon_or_warn` #2. Do **not** call it from mimic PHYSICALLY_SEEN arms.

## C ↔ JS fidelity

**I test (`:489`).** C `levl[x][y].glyph == GLYPH_INVISIBLE`. JS `loc.remembered_glyph.invisible` (set by `map_invisible`). Same memory bit in the tty model. **Match that predicate.**

**unmap then maybe remap (`:490–492`).** C `unmap_object` always when I; then `cansee && vobj_at` → `map_object(o, FALSE)`. JS the same split. `objects_at` is the `_objects_at` pile head ≡ `level.objects[x][y]`. `map_object` uses `obj.ox`/`oy` (place_object filled). No RNG in the helper. **Match.**

**show (`:495`).** C `show_glyph(x,y,monglyph)` after the memory update. JS `show_glyph_cell`. **Match the order.**

**Callers.** C real-monster arm (`!mimic || sensed`) only (`:619`). JS the same. C `display_warning` after warnsym / `MATCH_WARN` (`:650`). JS after `def_warnsyms` / `mon_glyph`. Mimic furniture/object/monster still `show_glyph` / `map_object` — C never unmaps I there. **Match the call sites.**

**Cansee `newsym`.** C `_map_location(x,y,FALSE)` then `display_monster` (`:1026–1028`). Parent JS extra-nulled I then `map_location_memory`. This SHA is `_map_location` only; leftover I is the helper (often already remapped by `_map_location`, as in C). **Match.** Dark Detect / warning never ran `_map_location` first — that is the path that actually needs the helper. Node: Detect I+gold no `$` when !cansee; Warning I+gold `$`+`1`.

**`map_invisible`.** JS stores `{ch:'I', invisible:true}` (`display.js:707–711`). C `GLYPH_INVISIBLE`. The helper’s predicate reads that flag. Without it, I would never unmap. **Match the tty stand-in C uses as `levl.glyph`.**

**`unmap_object`.** Already LIVE. `!hero_memory` returns without clearing I; then `map_object(FALSE)` is a no-op on memory too; `show_glyph` still paints. Same as C. Dark-room `S_room`→`S_stone` is in the JS body.

**Callee closure (helper).** LIVE: `glyph_is_invisible`, `unmap_object`, `cansee`, `objects_at`/`vobj_at`, `map_object`, `show_glyph_cell`. OMIT named: pet/detected ids (painter argument, not this helper); `feel_location` tail; `Sting_effects(-1)`. STUB: **none**. Not “dispatch ported, callee stubbed.” Reviews **700**/**706** named omit is now LIVE.

## Hallucinations / overclaim

Subject “I unmapped, cansee vobj mapped as objects”: **true**. D-log “cansee newsym is C `_map_location` only”: **true**. Do **not** stamp “Match C `pet_to_glyph` / `detected_mon_to_glyph`” — this SHA still used `mon_glyph` / `worm_tail_glyph`. Do **not** stamp “Match C integer `GLYPH_INVISIBLE`.” Do **not** stamp “Match C `feel_location` `is_worm_tail`.” Journal “fortress held” is not a public I-glyph screen. Public I-unmap **thin**; canary was node 24/24. Admit public-unhit.

## Density

§2b: one helper + the two C callers + dropping the cansee I stand-in. +43. C is 16 lines; the miss was painting without it. Did not glue pet glyphs. Did **not** reopen D-1746 / D-1745.

## Verification

D-log: save-oracle skip (untagged `display.c:show_mon_or_warn`); node 24/24 (Detect I→room+`o`; Detect I+gold no `$` when !cansee; Warning I+gold `$`+`1`; no-I room kept; cansee visible gold+`o`; Warning I→room; !cansee Warning I→room); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (incl. seed0383 hallu). Rule #2 clean. Public I-glyph **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (helper and both callers match C; tty glyph ids are the named next Open). Named: pet/detected worm_tail glyphs; `feel_location` `is_worm_tail`; make_blinded `Sting_effects(-1)`. Do **not** add `show_mon_or_warn` #2. Do **not** restore the cansee I-null stand-in. Do **not** call the helper from mimic PHYSICALLY_SEEN arms. Do **not** re-port D-1746.

Verdict: **ACCEPT-WITH-DEBT**
