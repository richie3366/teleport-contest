# Review 697 — 3afed6b0 — display.c display_monster Protection sensed (D-1736)

## Metadata
- Full / short hash: `3afed6b0d317579d5b5a360084ea1425e3af72c1` / `3afed6b0`
- Parent: `8b2be954` (D-1735). This file audits **this SHA only** (second of five `js/` commits since review **695**). Archive **Addressed:** D-1736 `3afed6b0`. This SHA also filled review **688** D-1735 `%h`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 21:15:27 +0200
- D-id: **D-1736**
- Stats: `js/display.js` +30/−12. Total `js/` insertions **30** <250. Band **150–350**.
- Claims to close: Open `display_monster` Protection_from_shape_changers sensed after D-1734 / review **695** (what_mon LIVE; `sensed` still `sensemon` only). Not M_AP_FURNITURE lastseentyp. Not Detect_monsters cansee. `reviews/loop-2026-08-15/` has no unpaid Protection Must-fix.
- JS / map: `display.js` `display_monster` / `Protection_from_shape_changers` / `mimic_object_appearance_glyph` / `gbuf_show_kind`. `c-js-map/turns.md`.
- Prior: **695** named `:522–523` as omit. **687** named the same OR.

## Intent vs deliverable

Git subject promises: `Protection_from_shape_changers` ORs into `sensed` with `sensemon`, instead of `sensemon`-only after D-1734.

`node scripts/csym.mjs display_monster` → `display.c:513–622`. `--callers`: `:904` feel; `:1027` newsym cansee; `:1053` !cansee. `Protection_from_shape_changers` is a header macro (`youprop.h:355–360`), not a `.c` function. `sensemon` `display.c:172–177` → `_sensemon` `display.h:55–58`.

```518:523:nethack-c/upstream/src/display.c
    int sensed = (mon_mimic && (Protection_from_shape_changers
                                || sensemon(mon))),
        mgendercode = mon->female ? FEMALE : MALE;
```

```355:360:nethack-c/upstream/include/youprop.h
#define HProtection_from_shape_changers \
    u.uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic
#define EProtection_from_shape_changers \
    u.uprops[PROT_FROM_SHAPE_CHANGERS].extrinsic
#define Protection_from_shape_changers \
    (HProtection_from_shape_changers || EProtection_from_shape_changers)
```

Parent: `sensed = mon_mimic && sensemon(mon)`; object helper and `gbuf_show_kind` stubbed Protection false. The diff **does** OR the youprop helper into `sensed`, skip furniture show/lastseentyp when sensed, null the object disguise helper, and classify `gbuf` as `monster`. It **does not** call `map_object(&obj, !sensed)`. Named. It **does not** pass `see_it ? PHYSICALLY_SEEN : DETECTED` from `newsym`. Named Detect_monsters cansee. It **does not** port pet/detected/`show_mon_or_warn`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `Protection_from_shape_changers` display.js | CLONE of C macro | youprop H\|\|E + JS sticky/uprops; LOCAL |
| `display_monster` sensed | LIVE repaired | C `:518–519` |
| `mimic_object_appearance_glyph` | LIVE re-point | skip disguise when sensed |
| `gbuf_show_kind` | LIVE re-point | same OR |
| `sensemon` | LIVE same-file | Detect_monsters / tp / MATCH_WARN |
| `PROT_FROM_SHAPE_CHANGERS` | LIVE const | added to existing const import |
| map_object observe | OMIT named | C still writes memory when sensed |
| Detect_monsters cansee | OMIT named | newsym still see_it-only |
| monmove/were/do_wear/apply/potion clones | leftover locals | do **not** add display #4 as export |

`node scripts/sym.mjs` (new local; no delete of a LIVE export):

```
Protection_from_shape_changers NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
               js/display.js:409  js/monmove.js:663  js/were.js:46
             => Do NOT write clone #4.
sensemon         js/display.js:486   sync
PROT_FROM_SHAPE_CHANGERS js/const.js:2576   sync   export const
```

`--can display.js const.js PROT_FROM_SHAPE_CHANGERS`: ALREADY. A cycle is not a blocker; this is not a top-level TDZ read. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`sensed` (`:518–519`).** C `mon_mimic && (Protection_from_shape_changers \|\| sensemon(mon))`. JS `mon_mimic && (Protection_from_shape_changers() \|\| sensemon(mon))`. **Match the OR.** Parent missed PfSC so a visible fountain mimic stayed `{` when the hero had the ring and not Detect_monsters/telepathy. With PfSC, C paints appearance then overwrites with the real monster (`:589`). JS second `if (!mon_mimic \|\| sensed)` now takes that arm.

```1077:1080:js/display.js
    const mon_mimic = ap !== M_AP_NOTHING;
    const sensed = mon_mimic && (Protection_from_shape_changers()
        || sensemon(mon));
```

**Youprop helper.** C is H\|\|E via `uprops[PROT_FROM_SHAPE_CHANGERS]`. JS flats + sticky `u.Protection_from_shape_changers` + `uprops` intrinsic/extrinsic — same JS property model as `do_wear.js` `Protection_from_shape_changers_dw` and `Warn_of_mon` in this file. Not a second C function. LOCAL clone of the macro; do **not** export a #4. Sticky-only true without H/E is the JS fallback used by restore_cham/eat copies, not a PfSC seed gate.

**Furniture (`:545–561`).** C always `levl[x][y].glyph = cmap_to_glyph(sym)`; `if (!sensed)` `show_glyph` + `lastseentyp=cmap_to_type`. JS writes `remembered_glyph` then skips show/lastseentyp when sensed. `show_glyph_cell` stamps `disp_*`, not memory, so the later monster paint does not erase furniture memory. **Match the !sensed guard.** D-1726 lastseentyp writer is unchanged.

**M_AP_OBJECT (`:564–575`).** C `map_object(&obj, !sensed)` — memory + `observe_object` even when `show` is false. JS helper returns null when sensed, so **no** object memory write; then the real-monster arm paints. **Named omit** (next Open after this SHA). Display of the live mlet when sensed **matches** C’s second `if`. Do **not** stamp “Match C `map_object`.”

**M_AP_MONSTER (`:578–584`).** Still paints `what_mon(mappearance)` then overwrites if sensed. C does not skip the appearance arm when sensed. **Match that order** (D-1734).

**`gbuf_show_kind`.** Classifier used `!sensemon` for object/furniture kinds; now `!(Protection \|\| sensemon)`. Occupancy kind follows the C glyph already chosen (monster when sensed). **Match the tty kind.**

**Callee closure (`sensed` predicate).** LIVE: `Protection_from_shape_changers` (verified CLONE of youprop.h), `sensemon`. OMIT named: `map_object`; Detect_monsters cansee (`:1016–1029`); pet/detected/`show_mon_or_warn` (`:588–619`). STUB in the **sensed assignment**: **none**. Review **695**’s named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “Protection ORs into sensed with sensemon”: **true**. D-log “furniture skips show/lastseentyp; object disguise null; kind monster”: **true**. Do **not** stamp “Match C `map_object(&obj, !sensed)`.” Do **not** stamp “Match C `newsym` `see_it ? PHYSICALLY_SEEN : DETECTED`.” Do **not** stamp “Match C pet/detected glyphs / `show_mon_or_warn`.” Journal “fortress held” is not a PfSC-mimic screen proof. Public sessions **do not** hit PfSC + furniture mimic; canary was node fountain `{` vs mimic `m`. Admit public-unhit.

## Density

§2b: one C predicate + the two JS sites that duplicated the stub (object helper, `gbuf`). +30. Did not glue Detect_monsters cansee / `map_object` (next Open rows). Did **not** reopen D-1734 `what_mon` or D-1726 furniture lastseentyp.

## Verification

D-log: save-oracle skip (untagged `display.c:display_monster`); node fountain `{` vs `m` on H/E/sticky/uprops + object/kobold appearance overwrite; Detect_monsters still senses; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict (incl. seed0383 hallu). Rule #2 clean. PfSC mimic **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open predicate matches C). Named: `map_object` observe (`:564–575` — memory even when sensed); Detect_monsters cansee (`:1016–1029` / `:1053`); male/fem offsets; pet/detected/`show_mon_or_warn` (`:588–619`). Do **not** export display `Protection_from_shape_changers` (#4). Do **not** restore `sensemon`-only `sensed`. Do **not** skip M_AP_MONSTER appearance when sensed. Do **not** re-port D-1734 `what_mon` / D-1726 furniture.

Verdict: **ACCEPT-WITH-DEBT**
