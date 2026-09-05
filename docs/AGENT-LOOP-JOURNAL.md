# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1854 pager.c do_screen_description blank-sym collapse ("can be many things (unexplored area)")

**C locus:** `pager.c` `do_screen_description` `:1246–1627` — looked sym
**JS:** `js/pager.js` `describe_looked` (~+15/−1).
**Change:** that branch now prints 9-space `can be many things (${look})`
**Verify:** `node scripts/verify.mjs --fn do_screen_description` → PASS
**Named:** full `do_screen_description` cmap/symbol table
**Next:** Open `pager.c` `dowhatdoes` (2 corpus blocks).
## 2026-09-05 — D-1853 mkmaze.c makemaz knox load_special (Fort Ludios magic-portal vault)

**C locus:** `dat/knox.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_knox` / `load_special_proto` (+ `knox` in
**Change:** `load_knox` from the lua body in order: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location` for water-likers;
**Next:** Open `pager.c` `do_screen_description` (4 corpus blocks).
## 2026-09-05 — D-1852 mkmaze.c makemaz Val-strt/loca/goal/fila/filb load_special (Valkyrie quest 5/5)

**C locus:** `dat/Val-strt.lua` / `Val-loca.lua` / `Val-goal.lua` /
**JS:** `js/mklev.js` `load_val_strt` / `load_val_loca` / `load_val_fila` /
**Change:** `load_val_strt` from the lua body: solidfill ICE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `ensure_way_out`;
**Next:** Open `mkmaze.c` `makemaz` `knox` (Fort Ludios). Not Sam.
## 2026-09-05 — D-1851 dothrow.c dofire empty-quiver You() NEED_MORE before getobj

**C locus:** `dothrow.c` `dofire` `:510–554` (`You("have no ammunition readied.")` then `doquiver_core("fire")`); `wield.c` `doquiver_core`; `invent.c` `getobj` / `win/tty/getline.c` `hooked_tty_getlin` `:53–54` / `topl.c` `tty_yn_function` (`toplin == NEED_MORE` → `more()` before the prompt). Also `:381–441` `autoquiver`; `:447–465` `find_launcher`; `:506–508` throw-and-return; `:512–525` pole/whip/uswap pole; `:557–579` fireassist; `:297–300` `ok_to_throw` shotlimit.
**JS:** `js/dothrow.js` `dofire` / `autoquiver` / `find_launcher` / `ok_to_throw`; `js/apply.js` `use_pole` / `use_whip` export.
**Change:** drop the pre-doquiver `mark_topline_seen` so `You()` leaves NEED_MORE and `doquiver_core` waits like C. Port C order: throw-and-return, empty-quiver pole/whip/swap/`You()`, autoquiver, `in_doagain=0`, doquiver, fireassist `could_pole_mon` / launcher swap / `find_launcher` canned wield, `throw_obj(shotlimit)`. Keep D-0485 mark after a successful ready so getdir does not More-eat direction keys.
**Verify:** `node scripts/verify.mjs --fn dofire` → PASS syntax (2 js files: js/apply.js js/dothrow.js); PASS rule2; PASS hidden verify dofire: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (random-seed0200-monk-north-search-d169ccc2 PASS; random-seed1500-rogue-explore-move-2a788f95 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file changed). VERIFY: PASS
**Named:** `ok_to_throw` `check_capacity((char *)0)` still. getdir remains in the JS caller (`throw_obj` assumes dx/dy). D-0485 `mark_topline_seen` after ready still.
**Next:** Open `mkmaze.c` `makemaz` `Val-strt`/`-loca`/`-goal`/`-fila`/`-filb`. Do not reopen the empty-quiver More skip (D-0484).
## 2026-09-05 — D-1850 invent.c display_inventory → display_pickinv PICK_ONE; farlook `i` "Weapons" stays

**C locus:** `invent.c` `display_inventory` `:3427–3452` (`cmdq_pop` then `display_pickinv(lets, 0, 0, FALSE, want_reply, 0)`); `display_pickinv` `:3380–3382` `select_menu(want_reply ? PICK_ONE : PICK_NONE)`; `wintty.c` `process_menu_window` `:1738–1740` (`PICK_NONE || !strchr(resp, morc)` → `tty_nhbell`, stay); `windows.c` `add_menu_heading` `:1815–1828` (`program_state.gameover` → `ATR_NONE`); `pager.c` `do_look` `:1822–1840` (`display_inventory(NULL, TRUE)`); callers `pickup.c:223` / `end.c:592` pass TRUE.
**JS:** `js/invent.js` `display_inventory` / `display_pickinv_reply` / `add_menu_heading_attr` / `dismiss_nhw_menu({ keep_status })`; `js/pickup.js` / `js/end.js` `display_inventory(null, true)`.
**Change:** `display_inventory` calls `display_pickinv_reply` with `want_reply`. PICK_NONE bells letters. Headings use `add_menu_heading` gameover `ATR_NONE`.
**Verify:** `node scripts/verify.mjs --fn inuse_classify --full` → PASS syntax (3 js files); PASS rule2; PASS hidden verify inuse_classify: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0015-valk-level2-pit-dog-wait-49ecd01f PASS; explore-seed0700-samurai-explore-descend-b922c948 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (--full). VERIFY: PASS
**Named:** `inuse_classify` body was already D-1589 (not this C-wrong). perm_invent `InvInUse` still D-1600. `invent_lines` remains exported. n==0 pickinv `"Not carrying anything appropriate."` vs C `"Not carrying anything."` for full invent.
**Next:** Open `dothrow.c` `dofire` (2 corpus blocks). Do not reopen the one-shot `display_inventory` dismiss or gameover heading inverse.
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
