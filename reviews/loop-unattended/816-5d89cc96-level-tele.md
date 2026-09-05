# Review 816 — 5d89cc96 — teleport.c level_tele Nowhere / clamp + priestname + bigrm-2 (D-1846)

## Metadata
- Full / short hash: `5d89cc96af677fa1534f20619351f1d38fff465d` / `5d89cc96`
- Parent: `6d5ca30d` (D-1845). Map-driven Open: 3 corpus `^V` materialize first-diffs tagged `level_tele`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 06:04:07 +0200
- D-id: **D-1846**
- Stats: `js/teleport.js` +61/−13; `js/do_name.js` +99/−10; `js/mklev.js` +34/−7; `js/display.js` +8. `js/` insertions **202** ≤250. Band **80–350**.
- Claims to close: Open Nowhere ynq + Quest/mines/sanctum clamp. Continue-unfinished leftover also shipped the three first-diff owners (priestname, Rogue `S_ndoor`, bigrm-2 unlit).
- JS / map: `level_tele` / `priestname` / `dosdoor` / `load_bigrm_2`. `c-js-map/turns.md` + `data.md`. Archive **Addressed:** D-1846 `5d89cc96`.

## Intent vs deliverable

Git subject promises: Nowhere `ynq` suicide, deepest clamp + `"Sorry..."` / `"anywhere"`/`"here"`, `priestname` from `x_monnam`, Rogue `S_ndoor` `+`, bigrm-2 choice 0–2 unlit.

`node scripts/csym.mjs level_tele` → `teleport.c:1164–1441`. `--callers`: `artifact.c:2160`, `read.c:2022`, `teleport.c:1559`, `wizcmds.c:402`. Nowhere `:1254–1276`. Clamp `:1388–1422`. `priestname` `priest.c:301–367` (`do_name.c:898`). `dosdoor` `mklev.c:614–676` (`:647–648` Rogue). `init_rogue_symbols` `symbols.c:186–214`. `dat/bigrm-2.lua:34–48`.

The diff **does** those four pieces. Parent Nowhere was a cancel; clamp omitted; priests fell through `x_monnam`; Rogue doors ASCII `.`; `load_bigrm_2` burned `rn2(4)` then left the room lit.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `level_tele` Nowhere ynq | LIVE | `:1254–1276` |
| `level_tele` Quest/mines/sanctum clamp | LIVE | `:1397–1422` |
| `priestname` | CLONE in `do_name.js` | C `priest.c:301–367`; one clone |
| `mon_aligntyp_nam` | CLONE | third `mon_aligntyp` (also teleport/insight) |
| `x_monnam` priest arm | LIVE | `do_name.c:886–904` |
| `terrain_glyph` Rogue door/stair | CLONE | `init_rogue_symbols:196–198` |
| `dosdoor` Rogue `D_NODOOR` | LIVE | `:647–648` |
| `load_bigrm_2` unlit rects | LIVE | lua `:34–48`; `light_region(...,false)` does not grow |
| `splev_apply_*` `lit=false` | LIVE | C `lspo_map` string `lit = FALSE` (`sp_lev.c:6102`) |
| `print_dungeon` / debug_fuzzer / ice `selection:grow` / `halu_gname` | OMIT named | |

`node scripts/sym.mjs`:

```
level_tele       js/teleport.js:2202   ASYNC — await required
ynq              js/getline.js:1524   sync
priestname       NOT EXPORTED — 1 LOCAL do_name.js:765
mon_aligntyp_nam NOT EXPORTED — 1 LOCAL do_name.js:750
mon_aligntyp     NOT EXPORTED — 2 LOCAL insight.js:906 teleport.js:352
             => clone #3 is this SHA's mon_aligntyp_nam
halu_gname       NOT EXPORTED — 1 LOCAL pray.js:1904
align_gname      js/roles.js:809   sync
surface          NOT EXPORTED — 4 LOCAL dig.js:235 dokick.js:251 engrave.js:121 sit.js:465
is_silent        NOT EXPORTED — 1 LOCAL region.js:214
dosdoor          NOT EXPORTED — 1 LOCAL mklev.js:22728
terrain_glyph    js/display.js:3313   sync
light_region     NOT EXPORTED — 1 LOCAL mklev.js:20578
load_bigrm_2     NOT EXPORTED — 1 LOCAL mklev.js:1969
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed gates: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Nowhere (`:1254–1276`).** `ynq` not `'y'` → return. `is_silent` writhe/scream; `display_nhwindow`; cease to exist; invent → possessions thud; killer `"committed suicide"`; `done(DIED)`; then coalesce + rematerialize. JS same; `msound===0` ≡ `MS_SILENT` (`sounds.js`). Possessions line hardcodes `"floor"` instead of C `surface(u.ux,u.uy)` — suicide not in this corpus. **Match the ynq / done / rematerialize order.**

**Clamp (`:1388–1422`).** `qbranch` Quest / mines / sanctum; `deepest`; `!wizard && Inhell && !invoked && newlev >= deepest` → `deepest-1` + `"Sorry..."`; Quest `newlev < depth(qstart)` clamp; `get_level`; `on_level` + `newlev != depth` → `"anywhere"` vs `"here"`. JS same. **Match those branches.** `debug_fuzzer` still named.

**`priestname` (`:308–365`) via `x_monnam` (`:886–904`).** Save `EHalluc_resistance` / `minvis`; `do_exact` is `EXACT_NAME`; strip leading `"the "` on `ARTICLE_NONE`. Hallu `rndmonnam` / poohbah; high priestess; renegade; Astral conceal unless reveal / `distmin<=1` / gameover. Non-hallu `" of "` uses JS `align_gname(urole, …)` not C `halu_gname` (named; `pray.js` `halu_gname` already falls through to `align_gname`). Ranger `"The priestess of Mars intones:"` is this arm. **Match the non-hallu name.**

**Rogue doors/stairs.** C `:196–198` `S_ndoor`/`S_*odoor` `+`, `S_*stair` `%`; `dosdoor` `:647–648` `D_NODOOR` before mimic. JS `terrain_glyph` + `dosdoor`. **Match those glyphs / doormask.** Full `rogue_syms` object/mon class table still a clone of `init_rogue_symbols`.

**bigrm-2 (`lua:34–48`).** `0+rn2(4)`; choice 3 no darkness; 0/1/2 `des.region(sel,"unlit")`. C `lspo_region` argc=2: `if (rlit) selection_do_grow` then `sel_set_lit`. JS `light_region` grows **only** when `litstate` (`mklev.js:20581–20586`), so unlit does not grow. Rects match lua areas. Ice `percent(25)` `selection:grow` still empty (named). **Match choice 0–2 unlit.** Map-wide `loc.lit=false` after string `sel_set_ter` matches C `terr.tlit = lit` with `lit = FALSE`.

**Callee closure.** Four first-diff owners, not one `level_tele` arm. Nowhere / clamp LIVE. `priestname` verified CLONE; `x_monnam` LIVE. Rogue glyph CLONE + `dosdoor` LIVE. `light_region` unlit LIVE. Named OMITs only. No STUB in a shipped arm.

## Hallucinations / overclaim

Do **not** stamp `print_dungeon`, debug_fuzzer, ice grow, or hallu pantheon RNG. Two PASS (Barbarian, Ranger); Healer moved to `m_move` step 48 — later owner, not `level_tele` PASS. D-log 2 PASS / 1 moved is true.

## Density

§2b: continue-unfinished leftover of three proxy-tagged first-diffs plus the `level_tele` ynq/clamp the Open row named. Unrelated C files (`teleport.c` / `priest.c` / `symbols.c`+`dosdoor` / `bigrm-2.lua`). +202. Did **not** glue `mineralize`. Acceptable leftover, not a Must-fix.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify level_tele --base 5d89cc96~1` → `3 session(s) blocked`. Summary: **`2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`** (`tour-Barbarian-70024-d5-8-15-17-22` PASS; `tour-Healer-70012-d3-6-10-11-12` → `m_move` step 48 was 22; `tour-Ranger-70008-d3-6-10-11-12` PASS). Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map. Third `mon_aligntyp` clone is clone-drift debt, not this SHA's C-wrong.

Verdict: **ACCEPT-WITH-DEBT**
