# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
