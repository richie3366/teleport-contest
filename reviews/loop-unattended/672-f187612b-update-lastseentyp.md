# Review 672 — f187612b — dungeon.c update_lastseentyp DRAWBRIDGE_UP / furniture-mimic (D-1711)

## Metadata
- Full / short hash: `f187612baef7004b541badab0e03d37fad905062` / `f187612b`
- Parent: `b5cb56e6` (D-1710). This file audits **this SHA only** (fourth of nine `js/` commits since review **668**). Archive **Addressed:** D-1711 `f187612b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:01:59 +0200
- D-id: **D-1711**
- Stats: `js/dungeon.js` +209/−2; `js/const.js` +46. Total `js/` insertions **252** >250. Band **200–450** (id >454).
- Claims to close: Open `update_lastseentyp` DRAWBRIDGE_UP under-typ + visible furniture-mimic `cmap_to_type`. Not knox/drawbridge print (D-1693). Not `display.c` `display_monster` lastseentyp override. Not `hhmmss`. `reviews/loop-2026-08-15/` has no unpaid lastseentyp Must-fix.
- JS / map: `dungeon.js` `update_lastseentyp` / `cmap_to_type`; `const.js` cmap `S_*`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: none written; map-driven after D-1693 stored raw `levl.typ`.

## Intent vs deliverable

Git subject promises: `lastseentyp` stores under-typ and disguise terrain, instead of raw `levl.typ`.

`node scripts/csym.mjs update_lastseentyp` → `dungeon.c:2926–2938`. `--callers`: `display.c:257` `map_background`; `:469` `_map_location`; `dungeon.c:3192` recalc `!Levitation`; `trap.c:5053` `float_down`. `cmap_to_type` `mkroom.c:910–1030` (`--callers` `display.c:559` `display_monster`; `dungeon.c:2936`). `db_under_typ` `dbridge.c:115–128`. `defsym.h` PCHAR idx 0–48.

```2926:2938:nethack-c/upstream/src/dungeon.c
void
update_lastseentyp(coordxy x, coordxy y)
{
    struct monst *mtmp;
    int ltyp = levl[x][y].typ;

    if (ltyp == DRAWBRIDGE_UP)
        ltyp = db_under_typ(levl[x][y].drawbridgemask);
    if ((mtmp = m_at(x, y)) != 0
        && M_AP_TYPE(mtmp) == M_AP_FURNITURE && canseemon(mtmp))
        ltyp = cmap_to_type(mtmp->mappearance);
    svl.lastseentyp[x][y] = ltyp;
}
```

Parent: `lst[x][y] = loc.typ` with a comment deferring both arms. The diff **does** `db_under_typ(drawbridgemask)` then visible furniture `cmap_to_type(mappearance)`; ports the full C switch; exports the `S_*` that switch names. It **does not** add `update_lastseentyp` to JS `map_background` (`display.js:606` still stops at `show_glyph_cell`). Named. It **does not** write lastseentyp from `display_monster` (`display.c:559`). Named. It **does not** call it from JS `float_down` (C `:5053`). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `update_lastseentyp` | LIVE repaired | both C arms |
| `cmap_to_type` | LIVE new | `mkroom.c:910–1030` 1:1 switch; STONE catchall |
| `db_under_typ` | LIVE import | `hack.js:1301` (D-1103). Do **not** add #2 |
| `m_at` | LIVE import | `mon.js`; 4 other files still clone — do **not** add #5 |
| `canseemon` | LIVE import | `display.js:339`; 5 clones elsewhere — do **not** add #6 |
| `M_AP_TYPE` / `M_AP_FURNITURE` | LIVE | `const.js` |
| `S_*` 0–20, 22–23, 25–28, 33–48 | LIVE new exports | PCHAR idx; **not** `levl.typ` |
| `S_engroom` / `S_engrcorr` / `S_brupstair`… | OMIT from const | C `cmap_to_type` has no cases → STONE. Do **not** add unless a later writer needs the name |
| `map_background` lastseentyp | OMIT named | C `:257`; JS `:606` does not call |
| `display_monster` furniture lastseentyp | OMIT named | C `:559` |
| `float_down` lastseentyp / `prev_decor` | OMIT named | C `:5053–5054` |

`node scripts/sym.mjs`:

```
update_lastseentyp js/dungeon.js:1148   sync
cmap_to_type     js/dungeon.js:1025   sync
db_under_typ     js/hack.js:1301   sync
m_at             js/mon.js:1234   sync  (+ 4 local clones — IMPORT)
canseemon        js/display.js:339   sync  (+ 5 local clones — IMPORT)
M_AP_TYPE        js/const.js:3068   sync
S_stone / S_ndoor / S_tree / S_corr  const.js exports
S_engroom        NOT FOUND
S_brupstair      NOT FOUND
```

Re-points: new imports `db_under_typ` from `hack.js`, `m_at` from `mon.js`, `canseemon` from `display.js`. `--can js/dungeon.js js/hack.js db_under_typ` / `js/mon.js m_at` / `js/display.js canseemon`: **ALREADY** (this SHA added them). `display.js` already imported `update_lastseentyp` from `dungeon.js` — new edge completes a cycle. `canseemon` / `update_lastseentyp` / `In_tutorial` are used **inside functions**, not at module top level. D-log `--can` SAFE hoisted. Cycle is not a TDZ blocker (`js/` is one SCC). Do **not** add `canseemon` #6 in `dungeon.js`. Do **not** add `db_under_typ` #2. `vision.js` still has local `S_ndoor = 12`; this SHA exported the table instead of a third copy. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

JS body (`dungeon.js:1148–1159`): extra `if (!loc) return` vs C indexing `levl[x][y]` after `isok`. Then `ltyp = loc.typ`, DRAWBRIDGE_UP → `db_under_typ(drawbridgemask)`, then `m_at`/`M_AP_FURNITURE`/`canseemon` → `cmap_to_type(mappearance)`, then `lst[x][y] = ltyp`. Order **Match `:2926–2938`.** The null-cell return is a JS guard, not a scored fork.

**DRAWBRIDGE_UP.** C `:2932–2933` replaces typ with `db_under_typ(drawbridgemask)`. `dbridge.c:115–128`: `mask & DB_UNDER` → ICE / LAVAPOOL / MOAT / else STONE. JS `hack.js:1301–1311` the same arms (D-1103). `DB_MOAT` is 0; a floor-under mask falls to STONE, not MOAT. Live import, not clone #2. **Match.** `lastseentyp` for a raised bridge is water/ice/lava under it, not typ 19. That is what D-1693 `count_feat` reads for castle/knox.

**Furniture mimic.** C `:2934–2936`: `m_at` && `M_AP_TYPE==M_AP_FURNITURE` && `canseemon` → `cmap_to_type(mappearance)`. JS `:1154–1156` the same short-circuit (`canseemon` only if the first two pass). `mappearance` is an S_* from makemon. Hallu is not in this function in C; JS does not invent it. **Match.**

**`cmap_to_type` (`mkroom.c:910–1030` vs `dungeon.js:1025–1141`).** C `typ = STONE` catchall; `default: break`. JS the same. Walked every C `case`: walls/corners/crwall/tu/td/tl/tr → matching `*WALL`/`*CORNER`; five door S_* (`S_ndoor`/`S_vodoor`/`S_hodoor`/`S_vcdoor`/`S_hcdoor`) → DOOR; `S_bars` → IRONBARS; `S_tree` → TREE; room/darkroom → ROOM; corr/litcorr → CORR; up/dn stair → STAIRS; ladders → LADDER; altar/grave/throne/sink/fountain → same typs; `S_pool` → POOL (not WATER); `S_ice` → ICE; `S_lava` → **LAVAPOOL** (not LAVAWALL); open db `S_vodbridge`/`S_hodbridge` → DRAWBRIDGE_DOWN; closed `S_vcdbridge`/`S_hcdbridge` → **DBWALL** (not DRAWBRIDGE_UP); `S_air`/`S_cloud`/`S_water`/`S_lavawall` → AIR/CLOUD/WATER/LAVAWALL. **Match `:910–1030` call-for-call.** No RNG.

**S_* vs typ.** `defsym.h` PCHAR idx: `S_ndoor=12` / `S_tree=18` vs topology `DBWALL=12` / `TREE=13`. JS `const.js` uses the PCHAR numbers, including the holes (`S_corr=22` skips `S_engroom=21`; `S_upstair=25` skips `S_engrcorr=24`). C `cmap_to_type` has **no** cases for engraving or branch-stair cmaps — they stay STONE. JS the same. Do **not** “fill in” `S_engroom` as ROOM.

**Callers (`csym --callers`).** `display.c:257` `map_background` always `update_lastseentyp` after `show_glyph`. JS `map_background` (`display.js:606–616`) writes remembered_glyph / `show_glyph_cell` and **stops** — no lastseentyp. `detect.js` still has a **local** `map_background` clone (`:747`) that this SHA did not re-point. `_map_location` / JS `map_location` **does** call after each arm (`:3299`/`:3307`/`:3324`); magic-map too (`:3067`). Recalc `!Levitation` **does** (`dungeon.js:1599`; extra `u.ux>0` is pre-existing). `trap.c:5053–5054` `float_down` then `iflags.prev_decor = lastseentyp`; JS `float_down` still ends at `pickup(1)` — named. `display.c:559` furniture `!sensed` writes `lastseentyp = cmap_to_type(sym)` **without** going through `update_lastseentyp` (overrides real topology with the mimic). JS `display_monster` comment already names that omit (`:816`). Missing writers are not “callee stubbed”: `cmap_to_type` is LIVE.

**Callee closure (`update_lastseentyp`).** LIVE: `db_under_typ`, `m_at`, `M_AP_TYPE`, `canseemon`, `cmap_to_type`. CLONE: none in the new arms. STUB: none. OMIT named: other writers. Combined-arm ships.

JS `update_lastseentyp` (guard + both C arms):

```1148:1158:js/dungeon.js
export function update_lastseentyp(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc) return;
    let ltyp = loc.typ | 0;
    if (ltyp === DRAWBRIDGE_UP)
        ltyp = db_under_typ(loc.drawbridgemask);
    const mtmp = m_at(x, y);
    if (mtmp && M_AP_TYPE(mtmp) === M_AP_FURNITURE && canseemon(mtmp))
        ltyp = cmap_to_type(mtmp.mappearance);
    const lst = ensure_lastseentyp();
```

`cmap_to_type` grouped arms vs C (`mkroom.c:918–1026`), one family per line:

- `S_stone` → STONE
- `S_vwall`/`S_hwall` → VWALL/HWALL
- `S_tlcorn`/`S_trcorn`/`S_blcorn`/`S_brcorn` → TLCORNER/TRCORNER/BLCORNER/BRCORNER
- `S_crwall`/`S_tuwall`/`S_tdwall`/`S_tlwall`/`S_trwall` → CROSSWALL/TUWALL/TDWALL/TLWALL/TRWALL
- `S_ndoor`/`S_vodoor`/`S_hodoor`/`S_vcdoor`/`S_hcdoor` → DOOR
- `S_bars` → IRONBARS; `S_tree` → TREE
- `S_room`/`S_darkroom` → ROOM; `S_corr`/`S_litcorr` → CORR
- `S_upstair`/`S_dnstair` → STAIRS; `S_upladder`/`S_dnladder` → LADDER
- `S_altar`/`S_grave`/`S_throne`/`S_sink`/`S_fountain` → ALTAR/GRAVE/THRONE/SINK/FOUNTAIN
- `S_pool` → POOL (not WATER); `S_ice` → ICE
- `S_lava` → LAVAPOOL (not LAVAWALL); `S_lavawall` → LAVAWALL
- `S_vodbridge`/`S_hodbridge` → DRAWBRIDGE_DOWN
- `S_vcdbridge`/`S_hcdbridge` → DBWALL (not DRAWBRIDGE_UP)
- `S_air`/`S_cloud`/`S_water` → AIR/CLOUD/WATER
- default / missing `S_engroom`/`S_engrcorr`/`S_brupstair` → STONE

C `map_background` tail (`display.c:251–257`) always writes lastseentyp after `show_glyph`. JS (`display.js:606–616`) does not. C `display_monster` furniture (`:553–561`) writes lastseentyp on `!sensed` from `cmap_to_type(sym)` — a **second** writer, not a call to `update_lastseentyp`. JS omits that assignment. Named, not a stub inside the shipped body.

## Hallucinations / overclaim

Subject “stores under-typ and disguise terrain instead of raw levl.typ”: **true when `update_lastseentyp` runs**. It does **not** make JS `map_background` remember under-typ (that function still never calls). Journal “Named: map_background caller” is **accurate**, not theater. Do **not** stamp “Match C `map_background` `:257`.” Do **not** stamp “Match C `display_monster` `:559`.” Do **not** stamp “Match C `float_down` `:5053`.” Do **not** stamp “Match C `S_engroom`.” “cmap 26/26” is a canary of the switch arms they implemented, not MAXPCHARS. Journal “fortress held” is not a castle-drawbridge feat proof.

## Density

§2b: `update_lastseentyp` + its `cmap_to_type` callee + the S_* table that switch needs. One cluster. +252 is the 120-line C switch plus constants — allowed, not “finish display.c.” Did not glue sokosolved flags or `hhmmss`.

## Verification

D-log / journal: save-oracle skip (untagged); cmap_to_type 26/26 + DRAWBRIDGE_UP lastseentyp MOAT/ICE smoke; green+strict; cohort 7/7 + seed0106 overview. Public mapping **is** hit via `map_location` / magic-map. Standalone `map_background` and furniture-mimic `canseemon` **public-unhit**. Admit that. Smoke is the under-typ check.

## Actionable C-wrongs

None for Must-fix (the Open body matches C). Named: `map_background` must call `update_lastseentyp` (`display.c:257`); `display_monster` M_AP_FURNITURE `lastseentyp = cmap_to_type(sym)` when `!sensed` (`:559`); `float_down` lastseentyp + `prev_decor` (`trap.c:5053–5054`); sokosolved/roguelevel/quest recalc flags; `hhmmss`. Do **not** add `S_engroom`/`S_brupstair` as ROOM/STAIRS (C catchall is STONE). Do **not** add `cmap_to_type` #2. Do **not** add `db_under_typ` #2. Do **not** add `canseemon` #6. Do **not** use `levl.typ` numbers as S_*. Do **not** restore raw `lst[x][y] = loc.typ`.

Verdict: **ACCEPT-WITH-DEBT**
