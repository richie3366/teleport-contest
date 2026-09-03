# Review 734 — b4d526e9 — detect.c findone flash / foundone / mimic tail (D-1775)

## Metadata
- Full / short hash: `b4d526e954fb5fc086957fb03bc6929ddec979d8` / `b4d526e9`
- Parent: `1f5d551a` (D-1774). Seventh of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:21:39 +0200
- D-id: **D-1775**
- Stats: `js/detect.js` +133/−22; `js/display.js` +49/−5. Total `js/` insertions **182** <250. Band **150–350**.
- Claims to close: Open `detect.c` findone after D-1774. Not `food_detect`. Not vision `do_clear_area` clone. Not FOUND_FLASH_COUNT==0 `tmp_at`. `reviews/loop-2026-08-15/` has no unpaid findone Must-fix.
- JS / map: `detect.js` `findone`/`foundone`; `display.js` `flash_glyph_at`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1775 `b4d526e9`. Subject also claims banned-pattern recovery on D-1774 comments.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `findone` so found doors/corridors/traps flash with a `foundone` viz pulse and the mimic/hider/invisible tail runs, instead of stopping at `detect_obj_traps`.

`node scripts/csym.mjs findone` → `detect.c:1637–1726`. `--callers`: `findit` → `do_clear_area(findone)`. `foundone` `:1607–1634`. `flash_glyph_at` `display.c:1304–1321`. `FOUND_FLASH_COUNT` is 6.

Parent: `findone` `newsym`’d terrain, used `recalc_block_point` on SCORR, set dummytrap `tseen` before flash, read `m_at` after mutate, stopped at `detect_obj_traps`. The diff **does** port `flash_glyph_at`/`foundone`, C statement order (t_at/m_at first; SDOOR `recalc_block_point` vs SCORR `unblock_point`; flash before `tseen`; mimic/`seemimic`; hider `mundetected=0`+`newsym`; memory I vs `unmap_invisible`), await `do_clear_area`, and `findit` invis messages. It **does not** port `#if FOUND_FLASH_COUNT == 0` `tmp_at`. Named (compiled out at 6).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `findone` | LIVE repaired | C `staticfn`; local detect.js |
| `foundone` | LIVE new | viz pulse + seenv SVALL |
| `flash_glyph_at` | LIVE new | display.js; `rpt*2` alt |
| `seemimic` | LIVE | mon.js |
| `unblock_point` / `recalc_block_point` | LIVE | vision.js |
| `sense_trap` / `detect_obj_traps` | LIVE | |
| `mon_to_glyph` | LIVE | default `rn2_on_display_rng` ≡ C arg |
| `memory_glyph_is_invisible` | LIVE | D-1774 |
| `invisible_glyph_cell` | CLONE stand-in | GLYPH_INVISIBLE as tty cell |
| FOUND_FLASH_COUNT==0 `tmp_at` | OMIT named | C `#if` off |
| commented mon `foundone` | OMIT | C comments them out too |
| vision.js `do_clear_area` | OMIT named | detect.js clone |

`node scripts/sym.mjs`:

```
findone          NOT EXPORTED — local js/detect.js:600  (C staticfn)
foundone         NOT EXPORTED — local js/detect.js:576
flash_glyph_at   js/display.js:3923   ASYNC — await required
seemimic         js/mon.js:880   sync
unblock_point    js/vision.js:401   sync
recalc_block_point js/vision.js:411   sync
sense_trap       js/detect.js:1863   sync
detect_obj_traps NOT EXPORTED — local js/detect.js:1894
unmap_invisible  js/display.js:1172   sync
map_invisible    js/display.js:1066   sync
memory_glyph_is_invisible js/display.js:1095   sync
mon_to_glyph     js/display.js:431   sync
```

`--can detect.js display.js flash_glyph_at`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: **none** in scored control flow. Diff minus-lines still show old `seed0014` comments replaced by D-1774 cites — **delete**, not a live seed gate. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Capture order (`:1642–1649`).** `t_at`, `m_at`, DEADMONSTER/gd-without-mx → NULL, then `ft_cc`. JS the same **before** SDOOR mutate. **Match.** Parent read `m_at` after typ change.

**SDOOR vs SCORR (`:1651–1667`).** SDOOR: flash cmap door, `cvt_sdoor_to_door`, `recalc_block_point`, `magic_map_background`, `foundone(back_to_glyph)`. SCORR: flash corr, typ=CORR, **`unblock_point`**, map, `foundone(cmap_to_glyph(S_corr))`. Parent used recalc on SCORR. JS now splits. **Match.**

**Trap / dummytrap (`:1669–1686`).** Flash **then** `tseen=1` then `sense_trap` then `foundone`. Parent set dummytrap `tseen` first. **Match.**

**Chests (`:1688–1693`).** buried / fobj / minvent / invent `detect_obj_traps`. JS `floor_objects()` for fobj. **Match the calls.**

**Monster tail (`:1695–1725`).** `!canspotmon || mundetected || M_AP_TYPE`: mimic flash `mon_to_glyph(..., rn2_on_display_rng)` + `seemimic` (C’s `foundone` commented out); else hider/eel flash + `mundetected=0` + `newsym`. Then `!glyph_is_invisible(lev->glyph)` → flash I + `map_invisible` + `num_invis`; else `num_kept_invis`. Else `unmap_invisible` → flash I + `num_cleared_invis`. JS `mon_to_glyph(mtmp)` defaults display RNG. Memory I via `memory_glyph_is_invisible(lev)`. **Match.** Display RNG is not gameplay `rn2`.

**`foundone` (`:1612–1623`).** cmap/unexplored → `seenv=SVALL`; save viz; `!Blind` → `COULD_SEE|IN_SIGHT`; `newsym`; restore. JS normalises cell-or-id. **Match.** `#if FOUND_FLASH_COUNT==0` skipped.

**`flash_glyph_at` (`:1304–1321`).** `rpt*=2`; glyph[0]=tg; glyph[1]=hero_memory `levl.glyph` else `back_to_glyph`; loop `show_glyph`+`flush_screen(1)`+`nh_delay_output`; **no** `newsym`. JS copies `remembered_glyph` cell vs `terrain_glyph`+`back_to_glyph`; `show_glyph_cell`. **Match the loop.** Null mapcell skips a frame if memory empty — C would still `show_glyph` an unexplored id. Edge; not Must-fix (findit is usually on seen tiles).

**Callee closure.** LIVE: `flash_glyph_at`, `foundone`, `seemimic`, `unblock_point`, `recalc_block_point`, `sense_trap`, `detect_obj_traps`, `map_invisible`, `unmap_invisible`, `mon_to_glyph`. OMIT named: tmp_at arm; vision `do_clear_area`. STUB: **none** in a live arm. Not “dispatch ported, callee stubbed.”

**`findit` messages.** C prints “You reveal …” then “You detect … unseen monster(s)” using `num_invis`/`num_kept_invis`, then “You feel less paranoid” from `num_cleared_invis`. Parent left those counts at 0. JS now increments them on the tail. **Match the findit keep.** `do_clear_area` in detect.js is async and awaits `findone` so flash order is sequential like C’s inline callback.

## Hallucinations / overclaim

Subject “flash + foundone + mimic/hider/invisible tail” is true. “instead of stopping at `detect_obj_traps`” is true. Do **not** stamp “Match C FOUND_FLASH_COUNT==0 tmp_at.” Do **not** stamp “Match C vision.js `do_clear_area`.” Journal “44/44” is no-regression, not a findit screen. **Public-unhit** for findit.

## Density

§2b: `findone` + `foundone` + `flash_glyph_at` the arms call. +182. Related `findit` messages. Did **not** glue food_detect / object_detect stale. Did **not** invent a FAIL peel.

## Verification

D-log: save-oracle skip (untagged `detect.c:findone`); green+strict seed8000/0900; cohort **7**/7; full `sessions` **44**/44. Rule #2 clean. findit flash **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (order, SCORR unblock, flash-before-tseen, tail, memory I match C). Named: FOUND_FLASH_COUNT==0 `tmp_at`; vision `do_clear_area` clone. Do **not** `recalc_block_point` SCORR. Do **not** `newsym` inside `flash_glyph_at`. Do **not** use gbuf I in the tail. Do **not** write `findone` clone #2. Do **not** re-port D-1774 newsym.

C `FOUND_FLASH_COUNT` is 6 (`detect.c:19`); the `tmp_at`/`--More--` arm is `#if 0` equivalent. C comments out both monster `foundone()` calls; JS does not add them. `detect.js` `do_clear_area` is hero-centred and now async; `vision.js` export is a separate clone (Open row). `invisible_glyph_cell()` is the tty-cell stand-in for `GLYPH_INVISIBLE` because `flash_glyph_at` takes the same cell shape as `tmp_at`.

```1607:1623:nethack-c/upstream/src/detect.c
staticfn void
foundone(coordxy zx, coordxy zy, int glyph)
{
    if (glyph_is_cmap(glyph) || glyph_is_unexplored(glyph))
        levl[zx][zy].seenv = SVALL;
    {
        seenV save_viz = gv.viz_array[zy][zx];
        if (!Blind)
            gv.viz_array[zy][zx] = COULD_SEE | IN_SIGHT;
        newsym(zx, zy);
        gv.viz_array[zy][zx] = save_viz;
    }
}
```

Verdict: **ACCEPT-WITH-DEBT**
