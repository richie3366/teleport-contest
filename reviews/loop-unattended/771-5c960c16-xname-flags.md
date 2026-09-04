# Review 771 — 5c960c16 — objnam.c xname_flags tshirt/apron/hawaiian/xcalled (D-1802)

## Metadata
- Full / short hash: `5c960c168a8ee16f80d80ddf345de6012c569035` / `5c960c16`
- Parent: `e532a792` (D-1801 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 03:22:52 +0200
- D-id: **D-1802**
- Stats: `js/objnam.js` +266/−15; `js/attrib.js` +1/−13; `js/read.js` +6/−4; `js/engrave.js` +2/−1. Total `js/` insertions **275** >250 → ceiling **450**. Band **80–450**.
- Claims to close: Open `objnam.c` `xname_flags` tshirt/apron/hawaiian/`xcalled`. Not xname article arms.
- JS / map: `objnam.js` tables + helpers; attrib `ysimple_name` import; engrave late-binds `wipeout_text`. `c-js-map/turns.md`. Archive **Addressed:** D-1802 `5c960c16`.

## Intent vs deliverable

Git subject promises: Match C `objnam.c` `xname_flags` so `tshirt_text`, `apron_text`, `hawaiian_motif`, and `xcalled` actually run at gameover and called-names, instead of omitting slogan/motif tables and inlining `" called "` strings.

`node scripts/csym.mjs xcalled` → `objnam.c:557–572`. `tshirt_text` `read.c:99–187`. `hawaiian_motif` `:189–221`. `apron_text` `:253–281`. `candy_wrapper_text` `:295–300`. `erode_obj_text` `:88–97`. Gameover switch `xname_flags` `:971–996`.

Parent inlined `" called "` and skipped the disclosure switch. The diff **does** add those tables/helpers and wire `xcalled` / gameover suffix. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `xcalled` | LIVE local | C `staticfn`; `%.*s` truncate; panic **OMIT named** |
| `tshirt_text` / `apron_text` / `hawaiian_motif` / `candy_wrapper_text` | LIVE | tables match C SIZE/order |
| `erode_obj_text` | LIVE local | inlined `max(oeroded,oeroded2)`; do **not** add `greatest_erosion` #5 |
| `xname_gameover_suffix` | LIVE | dummy `o_id==0` skip |
| `ysimple_name` | LIVE import in attrib | pickup.js clone stays |
| `wipeout_text` | LIVE late-bind | `set_wipeout_text` from engrave.js |
| `hawaiian_design` | OMIT named | NOT FOUND; doread |

`node scripts/sym.mjs`:

```
tshirt_text / hawaiian_motif / apron_text / candy_wrapper_text  js/objnam.js  sync
xcalled          NOT EXPORTED — 1 LOCAL (objnam.js:593)
ysimple_name     js/objnam.js:2255   sync  + pickup.js clone — do NOT add #3
wipeout_text     js/engrave.js:225   sync
greatest_erosion NOT EXPORTED — 4 LOCALS — do NOT write #5
hawaiian_design  NOT FOUND
```

`--can attrib.js objnam.js ysimple_name`: **ALREADY**. `--can engrave.js objnam.js set_wipeout_text`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Tables.** Python dump of C initializers vs JS arrays: `shirt_msgs` 70 identical; `hawaiian_motifs` 16; `apron_msgs` 10; `candy_wrappers` 13 (index 0 empty). **Match.**

**Index.** T-shirt/apron: `o_id % SIZE` then `erode_obj_text`. Hawaiian: `(o_id ^ ubirthday) % SIZE` (contest `ubirthday = getnow()`). Candy: `spe % SIZE`; empty label skipped. Erode: `strlen * erosion / (2*MAX_ERODE)` with seed `o_id ^ ubirthday`. **Match.** Inlined erosion is C `greatest_erosion` (`max` of the two counters).

**`xcalled` (`:557–572`).** `pfxlen = strlen(pfx)+8` (`sizeof " called "` minus `""`). `%.*s` truncates sfx to `bufsiz-pfxlen`. JS `xcalled_xname` uses `BUFSZ-PREFIX` like C’s `xname_flags` sites (`:847` potion empty pfx after `"potion"` already in buf; wand/ring/spellbook pass the class word). **Match the append.** C `panic` if prefix will not fit — **named**.

**Gameover (`:971–996`).** `program_state.gameover && obj->o_id`. T_SHIRT/ALCHEMY_SMOCK `with text "…"`; CANDY_BAR `labeled` if non-empty; HAWAIIAN `with ${an(motif)} motif`. Wired after pluralize in `xname` and `doname`. **Match.** `bufspaceleft` PREFIX paniclog **named**.

**Callee closure.** `an`/`wipeout_text` LIVE. `hawaiian_design` / doread shirts **OMIT**. `armor_simple_name` for called still `dn` **OMIT**. No STUB in a shipped live arm. attrib’s `cxname` clone **deleted** (import, not clone #2).

## Hallucinations / overclaim

Subject is **true** for gameover disclosure and `xcalled`. Do **not** stamp “Match C `hawaiian_design` / doread / xname article arms / `find_artifact`.” Do **not** add `greatest_erosion` clone #5 or a second `xcalled`. Do **not** import pickup.js’s remaining `ysimple_name` clone as a third export.

## Density

§2b: `xname_flags` called-name + gameover envelope and the `read.c` text helpers those arms call. +275. Did **not** glue article arms. Right size.

## Verification

D-log: green + named cohort. save-oracle skip. Public-unhit for gameover T-shirt slogans. This audit: `csym` `:557–572` / `:971–996` / `read.c:99–300` vs HEAD `js/objnam.js:403–634`; tables byte-compared. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: xname article arms; `armor_simple_name`; `find_artifact`; PREFIX paniclog; `hawaiian_design`/doread; pickup.js `ysimple_name` clone.

Verdict: **ACCEPT-WITH-DEBT**
