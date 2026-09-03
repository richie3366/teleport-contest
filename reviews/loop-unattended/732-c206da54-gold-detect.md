# Review 732 — c206da54 — detect.c gold_detect / o_in o_material (D-1773)

## Metadata
- Full / short hash: `c206da5475c9da97d68f3d7b6aa33a17d8274653` / `c206da54`
- Parent: `81276343` (D-1772). Fifth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 08:19:14 +0200
- D-id: **D-1773**
- Stats: `js/detect.js` +296/−8; `js/display.js` +59/−0; `js/read.js` +28/−4; `js/steal.js` +14/−1. Total `js/` insertions **397** >250. Band **200–450**.
- Claims to close: Open `gold_detect` after D-1753 `sense_trap`. Not `food_detect`. Not `object_detect` `clear_stale_map` caller. Review **714** named gold. `reviews/loop-2026-08-15/` has no unpaid gold-detect Must-fix.
- JS / map: `detect.js` `gold_detect`/`o_in`/`o_material`/`clear_stale_map`; `read.js` `seffect_gold_detection`; `steal.js` `findgold`; display glyph predicates. `c-js-map/turns.md`.
- Prior: D-1753 trap_detect. Archive **Addressed:** D-1773 `c206da54`.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `gold_detect` so `SCR_GOLD_DETECTION` maps floor/minvent gold via `o_in`/`o_material`/`clear_stale_map` instead of the unimplemented scroll gate after D-1753.

`node scripts/csym.mjs gold_detect` → `detect.c:334–475`. `--callers`: `read.c:2041`. `o_in` `:200–223`. `o_material` `:228–246`. `check_map_spot` `:261–309`. `clear_stale_map` `:317–331`. `findgold` `steal.c:44–52`.

```334:345:nethack-c/upstream/src/detect.c
int
gold_detect(struct obj *sobj)
{
    /* ... */
    gk.known = stale = clear_stale_map(COIN_CLASS,
                                       (unsigned) (sobj->blessed ? GOLD : 0));
    /* fmon findgold / gold golem / o_material GOLD / o_in COIN → outgoldmap */
}
```

Parent: scroll otyp unimplemented; no `gold_detect`. The diff **does** port the helper family, wire `seffect_gold_detection` (`confused||scursed` → `trap_detect` else `gold_detect`), export `findgold`, add `glyph_is_object`/`glyph_to_obj`. It **does not** call `clear_stale_map` from `object_detect`. Named. It **does not** port `food_detect`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `gold_detect` | LIVE new | `:334–475`; search then map or strange_feeling |
| `o_in` | LIVE new | nested contents; SchroedingersBox skip |
| `o_material` | LIVE new | nested; no Schroedinger skip (C none) |
| `check_map_spot` | LIVE new | staticfn; material arm hardcodes GOLD |
| `clear_stale_map` | LIVE new | staticfn; COLNO×ROWNO `unmap_object` |
| `findgold` | LIVE export | steal.js; makemon/monmove clones remain |
| `glyph_is_object` / `glyph_to_obj` | LIVE new | display.h |
| `seffect_gold_detection` | LIVE new | read.js local (C is static in seffects) |
| `map_object` / `unmap_object` | LIVE | |
| `strange_feeling` / `trap_detect` / `browse_map` | LIVE | |
| `money_cnt` | CLONE avoided | invent COIN_CLASS inlined — do **not** write #7 |
| `food_detect` | OMIT named | |
| `object_detect` `clear_stale_map` | OMIT named | helper lives; caller does not |

`node scripts/sym.mjs`:

```
gold_detect      js/detect.js:1593   ASYNC — await required
o_in             js/detect.js:1483   sync
o_material       js/detect.js:1502   sync
clear_stale_map  NOT EXPORTED — local js/detect.js:1570  (C staticfn)
check_map_spot   NOT EXPORTED — local js/detect.js:1530
findgold         js/steal.js:52   sync
             !! ALSO 2 LOCAL CLONE(S)  js/makemon.js:2164  js/monmove.js:156
glyph_is_object  js/display.js:711   sync
glyph_to_obj     js/display.js:721   sync
unmap_object     js/display.js:1131   sync
map_object       js/display.js:1907   sync
strange_feeling  js/detect.js:224   ASYNC
trap_detect      js/detect.js:1988   ASYNC
seffect_gold_detection NOT EXPORTED — local js/read.js:1046
money_cnt        NOT EXPORTED — 6 LOCAL CLONES — Do NOT write clone #7
hidden_gold      js/vault.js:74   sync
SchroedingersBox js/pickup.js:171   sync
```

`--can read.js detect.js gold_detect`: **ALREADY** (`do_mapping`). `--can detect.js steal.js findgold`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. RNG: gold-golem map arm `rnd(10)` only (`detect.c:442`). Search phase has **no** `rn2`/`rnd`.

## C ↔ JS fidelity

**`o_in` / `o_material`.** Class/material on self; else contents walk with recurse. `o_in` skips `SchroedingersBox`; `o_material` does not. JS the same. **Match.**

**`check_map_spot`.** `glyph_is_object`; ALL_CLASSES stale if no floor pile and no minvent; material arm compares shown glyph’s material then searches **GOLD** (C hardcode, not the `material` argument) via `o_material`; class arm `o_in`. JS `glyph_at_gbuf` = `disp_glyph` (D-1767). **Match the C hardcode.** Do not “fix” it to use `material`.

**`clear_stale_map`.** zx 1..COLNO-1, zy 0..ROWNO-1; `unmap_object` if check. JS same. **Match.** C `staticfn` — local JS is correct.

**Search phase (`:346–412`).** fmon: skip dead / gd without mx; `findgold(minvent)` or gold golem → steed flag or `known`+goto map; else blessed GOLD/`o_in` COIN same. Then fobj: blessed GOLD or COIN; `known`; goto map only if not underfoot. `!known` → gold-golem / `money_cnt||hidden_gold` / steed / poor `strange_feeling` return 1. `stale` → `docrt`; underfoot notice return 0. JS `show_map` stands in for `goto outgoldmap` (break out of loops). Invent coins inlined vs `money_cnt` — COIN_CLASS vs gold-piece count; ordinary gold is COIN_CLASS. **Match control flow.** `findgold` is the steal export (otyp `GOLD_PIECE` nobj walk, no containers). **Match.**

**Map phase (`:413–473`).** `cls`; `unconstrain_map`; fobj map via `o_material`/`o_in` (copy ox/oy if nested); fmon fake `GOLD_PIECE` `quan=rnd(10)` for findgold/golem else first matching invent obj at monster xy; `ugold` if any mapped at hero; else `newsym` + `TER_MON`; You_feel greedy; `exercise(A_WIS)`; `browse_map`; `map_redisplay`. JS `floor_objects()` is a raster of `objects_at` (no `fobj` chain). Paint order can differ from C `fobj` nobj; **no RNG** on that walk. Golem `rnd(10)` follows `fmon` order. Extra `flush_topl_more` before browse is this port’s More split, not a skipped C call. `unconstrain_map`/`reconstrain_map` are LIVE flag save/restore. **Match the map arm.**

**`seffect_gold_detection` (`read.c:2034–2043`).** `(confused||scursed)?trap_detect:gold_detect`; if that returns 1, seffects returns 1 (`*sobjp=0`). JS `usedUp` → `return null`. On gold success, C `gk.known` already true from the helper; JS sets `known=true` when not trap path. **Match the caller.** Confused gold scroll still hits LIVE `trap_detect` (D-1753), not a stub.

**Callee closure (`gold_detect`).** LIVE: `o_in`, `o_material`, `clear_stale_map`, `check_map_spot`, `findgold`, `map_object`, `unmap_object`, `strange_feeling`, `browse_map`, `cls`, `docrt`, `glyph_is_object`, `hidden_gold`, `exercise`. OMIT named: `food_detect`; object_detect stale-map caller. STUB: **none** in the gold arms. Not “dispatch ported, callee stubbed.”

**Search vs map (goto stand-in).** C `goto outgoldmap` from the first off-hero or monster gold skips remaining search. JS `show_map` + `break` out of fmon then skips the floor search with `if (!show_map)`. Steed gold does **not** set `show_map` (C does not goto). Underfoot-only gold: `known` true, `show_map` false → notice-between-feet, no `cls`. **Match.**

**Gold-golem map RNG.** Only `rnd(10)` on the fake `GOLD_PIECE` when `findgold(minvent)` or `PM_GOLD_GOLEM`. Search phase has no `rn2`. JS `quan: rnd(10)` on a plain object passed to `map_object`. Display-only object; not added to `fobj`. **Match.**

**`seffects` used-up.** C `if ((confused||scursed)?trap_detect:gold_detect) { *sobjp=0; return 1; }`. JS `usedUp` → `return null` so the scroll is not `useup`’d twice (`strange_feeling` already consumed it). Trap path does not force `known=true` (C `gk.known` comes from `trap_detect`). **Match.**

**`glyph_is_object` / `glyph_to_obj`.** Needed so `check_map_spot` can read gbuf the way C `glyph_at`+`glyph_is_object` does after D-1765 integer banks. Body/statue/piletop arms match `display.h`. Stale COIN_CLASS glyphs with no floor/minvent gold become `unmap_object`. **Match the stale-map helper.**

## Hallucinations / overclaim

Subject / D-log “Match C `gold_detect`” is true for search+map+`seffects`. “via `o_in`/`o_material`/`clear_stale_map`” is true (all LIVE). Do **not** stamp “Match C `food_detect`.” Do **not** stamp “Match C `object_detect` `clear_stale_map`.” Do **not** stamp “Match C `money_cnt` export.” Journal “fortress held” is not a gold-detection screen (public sessions may never read that scroll).

## Density

§2b: `gold_detect` + the helpers only it needs + the one `seffects` caller + `findgold` so the first `fmon` test is not clone #3. +397. Did **not** glue `food_detect` / findone flash / object_detect stale. Did **not** invent a FAIL peel.

## Verification

D-log: save-oracle skip (untagged `detect.c:gold_detect`); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. No canary cited for `rnd(10)` golem or blessed GOLD material. **Public-unhit** for `SCR_GOLD_DETECTION`. Admit that.

## Actionable C-wrongs

None for Must-fix (gold path matches C; leftovers named). Named: `food_detect`; `object_detect` `clear_stale_map` caller; makemon/monmove `findgold` clones. Do **not** write `money_cnt` clone #7. Do **not** write `clear_stale_map` clone #2. Do **not** search `o_material(otmp, material)` in `check_map_spot` (C is GOLD). Do **not** restore the unimplemented gold-scroll gate. Do **not** re-port D-1753 `trap_detect`.

C `detect.c:350` `findgold(minvent) || monsndx==PM_GOLD_GOLEM` is steal.c `otyp==GOLD_PIECE` on the nobj chain, not nested `o_in`. Blessed GOLD material is a **second** walk of minvent when that test fails. Floor loop is `fobj` nobj; JS raster of `objects_at` visits every floor object once. `gk.known = stale` at entry so a stale-only map still takes the underfoot-notice path if no live gold remains. `browse_map(TER_DETECT|TER_OBJ)` plus `TER_MON` when `!ugold` so autodescribe can name the hero. `exercise(A_WIS, TRUE)` is live. `food_detect` and `object_detect`’s `clear_stale_map` caller remain named Open rows.

```334:344:nethack-c/upstream/src/detect.c
int
gold_detect(struct obj *sobj)
{
    struct obj *obj;
    struct monst *mtmp;
    struct obj gold, *temp = 0;
    boolean stale, ugold = FALSE, steedgold = FALSE;
    int ter_typ = TER_DETECT | TER_OBJ;

    gk.known = stale = clear_stale_map(COIN_CLASS,
                                       (unsigned) (sobj->blessed ? GOLD : 0));
```

```413:418:nethack-c/upstream/src/detect.c
 outgoldmap:
    cls();

    (void) unconstrain_map();
    /* Discover gold locations. */
```

C `outgoldmap` starts `cls(); unconstrain_map();` then two for-loops (fobj then fmon). JS `await cls(); unconstrain_map();` then `floor_objects()` then `fmon`. `You_feel("very greedy, and sense gold!")` then `exercise` then `browse_map` then `map_redisplay`. JS inserts `flush_topl_more` before browse (More split). `reconstrain_map` then `map_redisplay` (`docrt`+`flush_screen(1)`).

Verdict: **ACCEPT-WITH-DEBT**
