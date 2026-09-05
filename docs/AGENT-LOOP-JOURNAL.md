# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1849 shknam.c stock_room closed-shop engraving cell via shk.c inside_shop edge; mineralize 2 corpus PASS

**C locus:** `shknam.c` `stock_room` `:750–766` (locked shop door: `inside_shop(sx+1,sy)`→`m--` / `(sx-1,sy)`→`m++` / `(sx,sy+1)`→`n--` / `(sx,sy-1)`→`n++`, engrave `"Closed for inventory"` at `(m,n)`, then `typ != CORR && typ != ROOM` → `(Is_special(&u.uz) || *in_rooms(m,n,0)) ? ROOM : CORR`); `shk.c` `inside_shop` `:567–576` (`rno < ROOMOFFSET || levl[x][y].edge || !IS_SHOP` → `NO_ROOM`); `mklev.c` `topologize` `:1633`/`:1642` (wall cells get `edge`, so the door's wall neighbours are outside the shop).
**JS:** `js/shknam.js` `stock_room`; `js/dungeon.js` `Is_special` export.
**Change:** delete the clone and import `shk.js` `inside_shop`; port the ROOM/CORR choice with `Is_special` (now exported from `dungeon.js`) and `hack.js` `in_rooms`.
**Verify:** `node scripts/verify.mjs --fn mineralize --full` → PASS syntax (2 js files); PASS rule2; PASS hidden verify mineralize: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Knight-70020-d5-8-15-17-22 PASS; tour-Monk-70009-d3-6-10-11-12 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (--full). VERIFY: PASS. Geometry probe after the fix: C `^F` map vs JS `^F` map, 0 differing cells, eligible 410/410 (Knight) and 472/472 (Monk).
**Named:** `Is_special` clones in `end.js` / `quest.js` and the `mineralize` inline `on_level` walk still not deduped onto the export; rest of `stock_room` (`stock_room_goodpos`, tribute spot, Orcus arm) unchanged. `mklev.c` `mineralize` was the symptom owner, never the C-wrong.
**Next:** Open `invent.c` `inuse_classify` (2 corpus blocks). Do not reopen the 1-cell TRC: the C map falsified it.
## 2026-09-05 — D-1848 pager.c lookat cmap default defsyms; newsym DARKROOMSYM

**C locus:** `pager.c` `lookat` `:779–795` (cmap switch: altar / ndoor / cloud / waterbody / engraving / `S_stone` / `default` `defsyms[]`); `display.c` `newsym` `:1079–1096` (Rogue unlit ROOM → `S_stone`; else `!waslit || (flags.dark_room && iflags.use_color)`: `S_litcorr`→`S_corr`, `S_room`→`DARKROOMSYM`).
**JS:** `js/pager.js` `lookat`; `js/display.js` `newsym` / `memory_is_cmap`.
**Change:** delete the extra lookat arms so floor strings come from `defsyms[]`. Port `newsym` out-of-sight DARKROOMSYM (keep floor tty; Rogue unlit → `S_stone`) so `glyph_at` already holds `S_darkroom`.
**Verify:** `node scripts/verify.mjs --fn lookat --base 70d84800~1` → PASS syntax (2 js files); PASS rule2; PASS hidden verify lookat: 0 PASS, 4 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0360-wizard-world-tour-19199bfa → do_screen_description step 836 was 826; 77350e1f → do_screen_description step 835 was 832; explore-seed0367-priest-quest-tour-1cbaa856 → do_screen_description step 314 was 313; b0096089 → do_screen_description step 326 was 323); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `do_screen_description` ROOM parenthetical still uses `room_cmap_explanation` (Open, later owner of those four); `look_at_monster` health/stuck/leash/trap/hallu/tail; doname_with_price / buried-embedded suffixes.
**Next:** Open `mklev.c` `mineralize` (2 corpus). Not leftover lookat floor arms.
## 2026-09-05 — audit overlay 811–817 + cadence 44/44

**Objective:** review JS SHAs since `35920b53` (D-1841–D-1847) against
pinned C; cadence full `sessions` (no `js/` port).
**SHAs:** 811 AWD fakewiz. 812 AWD do_statusline1. **813 QUALITY-RISK**
D-1843 lookat extra `S_room`/`S_darkroom` arms — Must-fix live. 814 AWD
summonmu were. 815 AWD getpos matching/`#`. 816 AWD level_tele/priestname/
bigrm-2. 817 AWD mineralize gold loop; hidden NO MOVEMENT named 1-cell TRC.
**Cadence:** 44/44 at `2c9f2ad0`; scr 11405/11405; RNG 792838/792838;
`44+0.37/turn` (R² 0.864). Hidden 217/265 (81.9%). Rule #2 clean.
**Next:** Must-fix `pager.c` `lookat` extra room arms. Open `mineralize`
still (2 corpus). Do not re-port the gold loop.
## 2026-09-05 — D-1847 mklev.c mineralize gold/gem loop; 1-cell TRC named

**C locus:** `mklev.c` `mineralize` `:1448–1541`; `mkmaze.c` `bound_digging`; `mklev.c` `join`; `sp_lev.c` `reset_xystart_size`.
**JS:** `js/mklev.js` `mineralize` / `bound_digging` / `join` / `reset_xystart_size` / `level_finalize_topology`.
**Change:** port gold/gem skip arithmetic (`y+=2`/`y+=1` then for `y++`), `on_level` Is_special, `dunlev` 0, `bound_digging` earth/`W_NONPASSWALL`, `join` arboreal ROOM, xstart resets. Continue-unfinished of iter-2258 leftover. Did not pop `LOOP-QUEUE.md`.
**Verify:** `node scripts/verify.mjs --fn mineralize` → PASS syntax (1 js file); PASS rule2; FAIL hidden NO MOVEMENT (2 unchanged); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44. VERIFY: FAIL (hidden).
**Named:** 1-cell `ly=15` east HWALL+TRC (Knight d5 409 vs 410; C STONE at (76,14)/(77,14); `wall_cleanup` blocked by interior ROOM). Do not re-port the gold loop.
**Next:** Open `mklev.c` `mineralize` still (2 corpus). Next peel is `wall_cleanup` / room-paint, not another gold-loop pass.
## 2026-09-05 — D-1846 teleport.c level_tele Nowhere ynq / clamp + priestname + bigrm-2 unlit

**C locus:** `teleport.c` `level_tele` `:1254–1276` / `:1388–1422`; `priest.c` `priestname` `:302–367`; `dat/bigrm-2.lua` `:34–48`; `symbols.c` `init_rogue_symbols`; `mklev.c` `dosdoor` `:647–648`.
**JS:** `js/teleport.js` `level_tele`; `js/do_name.js` `priestname`; `js/display.js` `terrain_glyph`; `js/mklev.js` `load_bigrm_2` / `dosdoor`.
**Change:** Nowhere `ynq` + Quest/mines/sanctum clamp + invoked `"Sorry..."`; `priestname`; Rogue `S_ndoor`/`dosdoor` D_NODOOR; `bigrm-2` darkness unlit (Healer was not `lspo_map` lit=FALSE). Continue-unfinished of iter-2256 leftover.
**Verify:** `node scripts/verify.mjs --fn level_tele` → PASS syntax (4 js files); PASS rule2; PASS hidden verify level_tele: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Barbarian-70024 PASS; tour-Healer-70012 → m_move step 48 was 22; tour-Ranger-70008 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** bymenu=FALSE `print_dungeon`; debug_fuzzer; ice `selection:grow`; hallu `halu_gname` pantheon RNG. Healer later owner is `m_move`.
**Next:** Open `mklev.c` `mineralize` (2 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1845 getpos.c getpos matching[] '/' + AUTODESC '#'

**C locus:** `getpos.c` `getpos` `:960–972` (`NHKF_GETPOS_AUTODESC` toggle + pline); `:1008–1114` (LIMITVIEW / MENU / SELF / MOVESKIP / mMoOdDxXaAzZ then matching[] defsyms; k>0 scan or `"Can't find dungeon feature '%c'."`).
**JS:** `js/getpos.js` `getpos` / `build_feature_matching` / `find_dungeon_feature`.
**Change:** port matching[] from `defsyms[].sym` (walls/room/corr/door/ndoor skipped) so `/` is k>0 then Can't find; AUTODESC / LIMITVIEW / MENU / MOVESKIP before matching; `aAzZ` cycle; `getloc_moveskip` glyph-skip; pick_chars LOOK_*; restore `u.dx`.
**Verify:** `node scripts/verify.mjs --fn getpos` → PASS syntax (1 js file); PASS rule2; PASS hidden verify getpos: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0360-wizard-world-tour-db38e7fa → moverock_core step 856 was 850; random-seed0367-priest-quest-tour-01388a3a → getpos_help step 342 was 316); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** `getpos_menu` (usemenu still cycles); GFILTER_AREA flood; full `gs.showsyms`; cmdq_pop at getpos start; mouse `c==0`; do_run/do_rush prefix + second `readchar_poskey`; `cmd_from_func` force-note visctrl. Priest later owner is `getpos_help`.
**Next:** Open `teleport.c` `level_tele` (2 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1844 mhitu.c summonmu were new_were / were_summon

**C locus:** `mhitu.c` `summonmu` `:956–1030` (`is_were` human `!Protection && !rn2(5-(night()*2))` / beast `Protection || !rn2(30)` then `!rn2(10)` helpers); `were.c` `were_summon` `:142–189` (`rnd(5)` then species `rn2` + `makemon`/`tamedog`); `were.c` `new_were` already live.
**JS:** `js/mhitu.js` `summonmu`; `js/were.js` `were_summon`; `js/sounds.js` `growl_sound` export.
**Change:** port the C were arm (form change, then maybe summon helpers / plines). Port `were_summon` in `were.js` (Protection early-out, `rnd(5)` loop, rat/jackal/wolf typ `rn2`, `tamedog` when `yours`). Export `growl_sound` for the unseen `Something growls!` arm.
**Verify:** `node scripts/verify.mjs --fn summonmu` → PASS syntax (3 js files); PASS rule2; PASS hidden verify summonmu: 1 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS (tour-Knight-70007-d3-6-10-11-12 PASS; tour-Priest-70006-d3-6-10-11-12 → dog_invent step 45 was 45; RNG 16489/16489); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** `msummon` is_lminion/angel (demon arm otherwise live); howl `You_hear`/`wake_nearto`; `mon_break_armor`. Priest same-step later owner is `dog_invent` (`dogmove.c:460`) chain-mail pickup.
**Next:** Open `getpos.c` `getpos` (2 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1843 pager.c lookat glyph_is_unexplored "unexplored area"

**C locus:** `pager.c` `lookat` `:656–802` (`glyph_is_unexplored` → `"unexplored area"`; cmap `S_stone` + `!seenv` → `"unexplored"`; else `"unexplored area"`); `glyphs.c` `glyph_to_cmap` `:199–231`; `getpos.c` `auto_describe` `:639–662` (prints `do_screen_description` firstmatch after lookat overwrite).
**JS:** `js/pager.js` `lookat` / `brief_at`; `js/display.js` `glyph_to_cmap`; `js/getpos.js` `auto_describe_text`.
**Change:** port `lookat` glyph-first (self / swallow / mon / obj / trap / warning / invisible / nothing / unexplored / cmap switch / else). `glyph_to_cmap` peels the cmap banks. `brief_at` and `auto_describe_text` take lookat's buf plus the didlook blocked-staircase rewrite.
**Verify:** `node scripts/verify.mjs --fn lookat` → PASS syntax (3 js files); PASS rule2; PASS hidden verify lookat: 0 PASS, 4 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0360-wizard-world-tour-19199bfa → do_screen_description step 836 was 826; explore-seed0360-wizard-world-tour-77350e1f → do_screen_description step 835 was 832; explore-seed0367-priest-quest-tour-1cbaa856 → do_screen_description step 314 was 313; explore-seed0367-priest-quest-tour-b0096089 → do_screen_description step 326 was 323); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `do_screen_description` cmap/symbol table (now the later owner of those four sessions); `ice_descr` didlook rewrite; `look_at_monster` health/stuck/leashed/trapped/hallu/worm-tail look coords; doname_with_price / buried-embedded suffixes; underwater `unreconnoitered` didlook skip.
**Next:** Open `mhitu.c` `summonmu` (2 corpus blocks). Not leftover WIN_STATUS under item-action menu.
## 2026-09-05 — D-1842 botl.c do_statusline1 leftover WIN_STATUS under item-action menu

**C locus:** `botl.c` `do_statusline1` `:47–98`; `botl.c` `bot` `:255–256` (`gb.bot_disabled` returns before putstr); `botl.c` `bot_via_windowport` `:1007` BL_TITLE `"%-30s"` (tty `VIA_WINDOWPORT`); `wintty.c` `docorner` `:3650–3720` (`cl_end` from xmin, `bot()` when `ymax >= WIN_STATUS.offy`); `windows.c` `select_menu` `:1858–1863`.
**JS:** `js/display.js` `do_statusline1` / `docorner` / `_buildScreenOutput`; `js/invent.js` `dismiss_nhw_menu`.
**Change:** named `do_statusline1` (BOTL_NSIZ, windowport title pad so `St:` starts at col 31). Corner dismiss is `docorner(offx, maxrow+1, 0)` (`--x` cl_end). `_buildScreenOutput` does not clear or repaint rows 22–23 while `bot_disabled`.
**Verify:** `node scripts/verify.mjs --fn do_statusline1` → PASS syntax (2 js files); PASS rule2; PASS hidden verify do_statusline1: 3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0116-wizard-wear-shop-71e90577 PASS; explore-seed0116-wizard-wear-shop-cfabc006 → dopush step 127 was 120; ind-Tourist-662206027-62b71e69 PASS; ind-Wizard-971871364-8f1ba690 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `wintty.c` paging `docorner` `ystart_between_menu_pages` repair; TTY_PERM_INVENT refresh; `bot_via_windowport` remaining BL_ fields / hitpointbar; `do_statusline1` `mrank_sz+15` !VIA_WINDOWPORT putstr and SCORE_ON_BOTL.
**Next:** Open `pager.c` `lookat` (3 corpus blocks). Not leftover WIN_STATUS under item-action menu.
## 2026-09-05 — D-1841 mkmaze.c makemaz fakewiz1/fakewiz2 load_special

**C locus:** `mkmaze.c` `makemaz` `:1126–1223` (`load_special(protofile)`); `sp_lev.c` `load_special` `:6453–6502`; `dat/fakewiz1.lua` (portal→`wizard3`, irregular arrival_room); `dat/fakewiz2.lua` (`des.object("\"",04,04)`); both mazegrid + center 9×9 island + east mazewalk + Lich / vampire lord / kraken / four board traps + `hell_tweaks`.
**JS:** `js/mklev.js` `load_fakewiz1` / `load_fakewiz2` / `load_fakewiz_tower`.
**Change:** port both lua bodies: mazegrid + center map + `l_levregion`/`l_teleport_region` while map origin is set, `splev_mazewalk(8,5,east)`, fakewiz1 irregular OROOM + portal→wizard3, shared monsters/traps, fakewiz2 amulet, `hell_tweaks`, then C `load_special` epilogue (link_doors / remove_boundary / map_cleanup / wallify / flip / `fixup_special`).
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax (1 js file); PASS rule2; note hidden verify makemaz: no corpus session is blocked on it at HEAD (vacuous — queue row was PORT-GAP-HELDOUT content, 0 proxy blocks); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `ensure_way_out`; arrival_room migrate flag beyond ordinary OROOM; humidity-aware `get_location`; `count_level_features`; `create_maze` `makemaz("")` fallback; hellfill `rnd_hell_prefab`.
**Next:** Open `botl.c` `do_statusline1` (4 corpus blocks). Not leftover WIN_STATUS under item-action menu.
## 2026-09-05 — audit overlay 794–810 + cadence 44/44

**Objective:** review JS SHAs since `171f6b02` against pinned C;
cadence full `sessions` (no `js/` port).
**SHAs:** 794 ACCEPT D-1824. 795–800 AWD (mcast 14, medusa-2/4, water,
astral, Kni/Rog quest). **801 QUALITY-RISK** D-1831 snapshot/`docrt`
leftover WIN_STATUS — Must-fix shipped in **802** D-1832 (not live at
HEAD). 803–810 AWD (itemactions, getobj, describe_decor, build_room,
doloot, pickup_checks, roles[], selection_filter_percent).
**Cadence:** 44/44 at `bf310d98`; scr 11405/11405; RNG 792838/792838;
`43+0.33/turn` (R² 0.853). Hidden 209/265 (78.9%). Rule #2 clean.
**Next:** Open `makemaz` `fakewiz1`/`fakewiz2`. Must-fix empty.
## 2026-09-05 — D-1840 selvar.c selection_filter_percent themed-room fills

**C locus:** `selvar.c` `selection_filter_percent` `:223–245` (`rn2(100) < percent` per set cell, x-outer); `nhlsel.c` `l_selection_filter_percent` `:388–401`; `l_selection_iterate` `:924–957` (y-outer, `cvt_to_relcoord`); `dat/themerms.lua` Ice / Boulder / Spider nest / Trap room fills; `sp_lev.c` `create_trap` `:1812–1846` (`get_free_room_loc` then `mktrap` with `tm`).
**JS:** `js/mklev.js` `themeroom_fill_ice` / `_boulder` / `_spider` / `_trap` / `splev_mktrap_at` / `splev_create_trap_coord` / `get_free_room_loc_coord` / `nhl_start_timer_at`.
**Change:** port Ice (`des.terrain` ICE + `percent(25)` melt-ice timers), Boulder / Spider / Trap (`percentage(30)` then y-outer iterate). `splev_create_trap_coord` matches `create_trap` with croom; spider `and percent(80)` short-circuits; trap names shuffled then `traps[1]`.
**Verify:** `node scripts/verify.mjs --fn selection_filter_percent` → PASS syntax (1 js file); PASS rule2; PASS hidden verify selection_filter_percent: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Barbarian-70024-d5-8-15-17-22 → level_tele step 32 was 0; tour-Monk-70022-d5-8-15-17-22 → js-throw step 45 was 12); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** Garden / Buried treasure / Massacre / Statuary fills; garden/dig postprocess; icedpool on ICE (`splev_init_present`); humidity-aware `get_location`. Not leftover WIN_STATUS (`do_statusline1`).
**Next:** Open `mkmaze.c` `makemaz` `fakewiz1`/`fakewiz2`. Not leftover WIN_STATUS (`do_statusline1`).
