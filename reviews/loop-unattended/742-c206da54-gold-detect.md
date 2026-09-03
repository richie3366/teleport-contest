# Review 742 — c206da54 — detect.c gold_detect / o_in o_material (D-1773)

## Metadata
- Full / short hash: `c206da5475c9da97d68f3d7b6aa33a17d8274653` / `c206da54`
- Parent: `81276343` (D-1772). **Re-audit** of review **732** (ACCEPT-WITH-DEBT). Independent pinned-C walk. **397** `js/` insertions → band **200–450**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 08:19:14 +0200
- D-id: **D-1773**
- Stats: `js/detect.js` +296/−8; `js/display.js` +59; `js/read.js` +28/−4; `js/steal.js` +14/−1.
- Claims to close: Open `gold_detect` after D-1753. Not `food_detect`. Not `object_detect` `clear_stale_map` caller. Review **714** named gold.
- JS / map: `detect.js` `gold_detect`/`o_in`/`o_material`/`clear_stale_map`; `read.js` `seffect_gold_detection`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1773 `c206da54`.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `gold_detect` so `SCR_GOLD_DETECTION` maps floor/minvent gold via `o_in`/`o_material`/`clear_stale_map` instead of the unimplemented scroll gate after D-1753.

`node scripts/csym.mjs gold_detect` → `detect.c:334–475`. `--callers`: `read.c:2041`. `o_in` `:200–223`. `o_material` `:228–246`. `check_map_spot` `:261–309`. `clear_stale_map` `:317–331`. `findgold` `steal.c:44–52`.

Parent: scroll otyp unimplemented; no `gold_detect`. The diff **does** port the helper family, wire `seffect_gold_detection` (`confused||scursed` → `trap_detect` else `gold_detect`), export `findgold`, add `glyph_is_object`/`glyph_to_obj`. It **does not** call `clear_stale_map` from `object_detect`. Named. It **does not** port `food_detect`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `gold_detect` | LIVE new | `:334–475` |
| `o_in` | LIVE new | nested; SchroedingersBox skip |
| `o_material` | LIVE new | nested; **no** Schroedinger skip |
| `check_map_spot` | LIVE new | material arm hardcodes GOLD |
| `clear_stale_map` | LIVE new | C `staticfn`; local JS |
| `findgold` | LIVE export | steal.js; makemon/monmove clones remain |
| `glyph_is_object` / `glyph_to_obj` | LIVE new | display.h |
| `seffect_gold_detection` | LIVE new | read.js local |
| `money_cnt` | CLONE avoided | invent COIN_CLASS inlined — do **not** write #7 |
| `food_detect` | OMIT named | later D-1781 |
| `object_detect` `clear_stale_map` | OMIT named | later D-1782 |

`node scripts/sym.mjs`:

```
gold_detect      js/detect.js:1783   ASYNC — await required
o_in             js/detect.js:1483   sync
o_material       js/detect.js:1502   sync
clear_stale_map  NOT EXPORTED — local js/detect.js
check_map_spot   NOT EXPORTED — local js/detect.js
findgold         js/steal.js:52   sync
             !! ALSO 2 LOCAL CLONE(S)  js/makemon.js  js/monmove.js
glyph_is_object  js/display.js:711   sync
glyph_to_obj     js/display.js:721   sync
unmap_object     js/display.js:1131   sync
map_object       js/display.js:1907   sync
strange_feeling  js/detect.js:224   ASYNC
trap_detect      js/detect.js:1988   ASYNC
seffect_gold_detection NOT EXPORTED — local js/read.js
money_cnt        NOT EXPORTED — 6 LOCAL CLONES — Do NOT write clone #7
```

`--can read.js detect.js gold_detect`: **ALREADY**. `--can detect.js steal.js findgold`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. Rule #2 **clean**. RNG: gold-golem map arm `rnd(10)` only (`detect.c:442`). Search phase has **no** `rn2`/`rnd`.

## C ↔ JS fidelity

**`clear_stale_map` runs first (`:343–344`).** C: `gk.known = stale = clear_stale_map(COIN_CLASS, blessed?GOLD:0)` before any `fmon`/`fobj` walk. JS `:1790–1794` the same. **Match.** A later `object_detect` caller is a different SHA.

**Search order / C `goto outgoldmap` (`:347–382`).** C walks `fmon` first. `findgold(minvent)` or gold golem: steed sets `steedgold`, else `gk.known=TRUE` and **goto map** (skips remaining monsters **and** the floor walk). Else nested `o_material`/`o_in`. Floor walk only if that goto did not fire; underfoot gold sets `known` without goto. JS `show_map` + `break` is that goto: when a non-steed monster trips it, `if (!show_map)` skips `floor_objects()`. **Match the skip.** Search phase has **no** `rn2`/`rnd`.

**Nothing-found messages (`:384–405`).** Gold-golem hero; else `money_cnt(invent) || hidden_gold(TRUE)` (worried); else `steedgold` (interested); else “materially poor”; then `strange_feeling` return 1. JS inlines invent `COIN_CLASS` (not `money_cnt` clone #7) and **does** call `hidden_gold(true)` from vault.js. **Match.**

**Underfoot-only (`:407–411`).** `stale` → `docrt`; “gold between your feet”; return 0. **Match.** No `rnd(10)` here.

**Map arm (`:413–474`).** `cls` + `unconstrain_map`; floor `o_material`/`o_in` with ox/oy copy when the match is nested; then `fmon` again: golem/`findgold` builds a stack `GOLD_PIECE` with **`quan = rnd(10)`** then `map_object`; else first `o_material`/`o_in` in minvent. `!ugold` → `newsym` + `TER_MON`. `You_feel` greedy, `exercise(A_WIS)`, `browse_map`, `map_redisplay`. JS the same **except** an extra `flush_topl_more` before `browse_map` (not in this C arm — display stand-in, not Must-fix). **`rnd(10)` is map-phase only**, after `cls`, once per qualifying monster. Search-phase `findgold` is a predicate, not a draw.

**`check_map_spot` GOLD hardcode (`:275–286`).** Material arm searches `o_material(otmp, GOLD)` even though the parameter is `material`. JS the same. **Match C’s hardcode.** Do not “fix” it to use `material`.

**`o_in` vs `o_material` Schroedinger.** `o_in` skips `SchroedingersBox`; `o_material` does not. JS the same. **Match.**

**Floor walk raster.** `floor_objects()` vs C `fobj` nobj: paint order can differ; **no RNG** on that walk. Not Must-fix.

**Callee closure.** LIVE: `o_in`, `o_material`, `clear_stale_map`, `findgold`, `hidden_gold`, `map_object`, `strange_feeling`, `trap_detect` (confused/cursed caller). OMIT named: `food_detect`; `object_detect` caller (later SHAs). STUB: **none** in gold arms. Extra `flush_topl_more` is not a stubbed callee.

## Hallucinations / overclaim

Subject “Match C `gold_detect`” is true for the helper and the `read.c:2041` caller. Review **732** holds under this re-walk. Do **not** stamp “Match C `food_detect`.” Do **not** stamp “Match C `object_detect` `clear_stale_map`.” Do **not** write `money_cnt` clone #7. Journal 44/44 is no-regression; gold-detection scroll **public-unhit**.

## Density

§2b: one C helper family (`gold_detect` + `o_in`/`o_material`/`clear_stale_map`) + the one C caller. +397 is large but one cluster. Did **not** glue `food_detect`. Ceiling 450 applies.

## Verification

D-log: save-oracle skip; green+strict; cohort. Direct probes of `o_in`/`o_material`/golem `rnd(10)`. Rule #2 clean. Public-unhit. This re-audit re-reads C.

## Actionable C-wrongs

None for Must-fix. Named: `food_detect` (later shipped); `object_detect` stale-map caller (later shipped); `findgold` clones. Do **not** write `clear_stale_map` clone #2. Do **not** skip Schroedinger in `o_material`. Do **not** “fix” `check_map_spot` to use the material argument instead of GOLD. Do **not** `rnd(10)` in the search phase.

**Pinned-C walk this overlay (397 insertions → band 200–450, floor 134).**
`csym.mjs gold_detect` → `detect.c:334–475`. `--callers`: `read.c:2041` only.
`o_in` `:200–223` skips `SchroedingersBox`; `o_material` `:228–246` does not.
`check_map_spot` `:261–309` material arm hardcodes **GOLD**.
`clear_stale_map` `:317–331` zx 1..COLNO-1, zy 0..ROWNO-1.

```343:368:nethack-c/upstream/src/detect.c
    gk.known = stale = clear_stale_map(COIN_CLASS,
                                       (unsigned) (sobj->blessed ? GOLD : 0));
    for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) {
        if (findgold(mtmp->minvent) || monsndx(mtmp->data) == PM_GOLD_GOLEM) {
            if (mtmp == u.usteed) {
                steedgold = TRUE;
            } else {
                gk.known = TRUE;
                goto outgoldmap; /* skip further searching */
            }
```

HEAD `js/detect.js:1790–1823` is that goto
(`show_map` + `break`, then skip `floor_objects()`).
Search phase: **zero** `rn2`/`rnd`.
Map phase `:439–445` `gold.quan = (long) rnd(10)` after `cls()`.
Nothing-found `:389–405` includes `hidden_gold(TRUE)` —
JS imports vault.js.
Invent gold is inlined COIN_CLASS (not `money_cnt` clone #7).
`seffect_gold_detection`
`(confused||scursed) ? trap_detect : gold_detect`.
Extra JS `flush_topl_more` before `browse_map` is not in this C arm
— display stand-in, not Must-fix.
FORCE/DIAG none. Rule #2 clean. Public-unhit.

`o_in` `:200–223` skips `SchroedingersBox`; `o_material` `:228–246`
does not. `check_map_spot` material arm hardcodes GOLD (`:280`).
`clear_stale_map` first (`:343–344`) before any search.
Confused/cursed scroll caller is `trap_detect`, not `gold_detect`.
Floor raster vs `fobj` nobj can differ paint order; no RNG there.
Do not write `clear_stale_map` clone #2.
Do not `rnd(10)` during the search-phase `findgold` predicate.

Verdict: **ACCEPT-WITH-DEBT**
