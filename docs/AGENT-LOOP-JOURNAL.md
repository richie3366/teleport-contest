# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-05 — D-1839 role.c roles[] ldrnum / homebase / intermed / guardnum / questarti

**C locus:** `role.c` `roles[]` `:30–573` (`homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti`); `questpgr.c` `ldrname` `:50–57` (`type_is_pname` ? `""` : `"the "` + `mons[i].pmnames[NEUTRAL]`); `convert_arg` `%l` `:260–262`.
**JS:** `js/roles.js` `roles[]`.
**Change:** copy C `roles[]` `homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti` for the remaining nine roles; Arc `PM_STUDENT` and Bar `PM_CHIEFTAIN` `guardnum`. `u_init` already copies them onto `game.urole`.
**Verify:** `node scripts/verify.mjs --fn attributes_enlightenment` → PASS syntax (1 js file); PASS rule2; PASS hidden verify attributes_enlightenment: 4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Rogue-70018, tour-Samurai-70002, tour-Tourist-70013, tour-Valkyrie-70001); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** `attributes_enlightenment` body still unported (heuristic owner). `roles[].filecode` still via `ROLE_FILECODE`.
**Next:** Open `selvar.c` `selection_filter_percent` (2 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1838 hack.c pickup_checks furniture / pool / lava / swallow

**C locus:** `hack.c` `pickup_checks` `:3788–3872` (uswallow tongue/`loot_mon`; pool/lava dive; `!OBJ_AT` throne/sink/grave/fountain/open-door/altar/`STAIRS`/`There`; `can_reach_floor(traphere && is_pit)`); `dopickup` `:3876–3892` (`ret==-2` → `loot_mon(u.ustuck, &tmpcount, 0)`).
**JS:** `js/pickup.js` `pickup_checks` / `dopickup`.
**Change:** port the C body: furniture-specific nothing-msgs (stairs affixed), pool/lava reach, swallow tongue/`-2`, pit-aware `can_reach_floor`. `dopickup` awaits that result; `-2` calls live `loot_mon`.
**Verify:** `node scripts/verify.mjs --fn pickup_checks` → PASS syntax (1 js file); PASS rule2; PASS hidden verify pickup_checks: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (ind-Archeologist-62907089-effc88a8 PASS; ind-Priest-554730944-a8c6389b PASS; ind-Tourist-666025142-d17728db → glibr step 29 was 1); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** dungeon.c `surface` (reach-fail default `"floor"`; HOLE/TRAPDOOR override live). Not leftover WIN_STATUS (`do_statusline1`).
**Next:** Open `insight.c` `attributes_enlightenment` (3 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1837 pickup.c doloot_core loot-at-feet + lootmon get_adjacent_loc

**C locus:** `pickup.c` `doloot` `:2166–2174` (`gl.loot_reset_justpicked`); `doloot_core` `:2178–2346` (lootcont `container_at` / Blind `feel_cockatrice` / grave; lootmon `get_adjacent_loc("Loot in what direction?")` / `u.dz<0` ceiling / `loot_mon`); `loot_mon` `:2430–2481`; `lock.c` `doopen_indir` `:808–811` (`u_at && (u.dz > 0 || !closed_door)` → `doloot()`).
**JS:** `js/lock.js` `doopen_indir` / `get_adjacent_loc`; `js/pickup.js` `doloot` / `doloot_core` / `loot_mon`; `js/u_init.js` `addinv`.
**Change:** `doopen_indir` returns `doloot()` on self/down unless a closed door is here. `doloot` wraps `doloot_core` with `loot_reset_justpicked`; `addinv` clears `pickup_prev` once. lootmon uses `get_adjacent_loc`; `loot_mon` saddle + swallowed `pickup`.
**Verify:** `node scripts/verify.mjs --fn doloot_core` → PASS syntax (3 js files); PASS rule2; PASS hidden verify doloot_core: 3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0360-wizard-world-tour-77350e1f → lookat step 832 was 822; explore-seed1150-caveman-explore-move-d93ea4ff PASS; explore-seed1500-rogue-explore-move-8ddad3bd PASS; ind-Priest-304886778-a693574f PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** Confusion `reverse_loot`; pit `"Open where? [.>]"`; door-mimic stumble; AUTOUNLOCK_KICK / AUTOUNLOCK_FORCE; PICK_ANY `@` invert / pages / >26 containers. Not leftover WIN_STATUS (`do_statusline1`).
**Next:** Open `hack.c` `pickup_checks` (3 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-05 — D-1836 sp_lev.c build_room nested themerms des.room chance

**C locus:** `sp_lev.c` `build_room` `:2807–2833` (`(!r->chance || rn2(100) < r->chance) ? r->rtype : OROOM`); `lspo_room` `:4081` `build_room(&tmproom, gc.coder->croom)`; `dat/themerms.lua` Fake Delphi / Room-in-a-room / Huge / Mausoleum / Twin nested `des.room`.
**JS:** `js/mklev.js` `splev_build_room` / `splev_roomtype` / `themeroom_fake_delphi_contents` / `themeroom_room_in_room_contents` / `themeroom_huge_contents` / `themeroom_mausoleum_contents` / `themeroom_twin_businesses_contents` / `themerooms_generate`.
**Change:** nested `des.room` via `splev_des_room`/`splev_build_room` (chance then `create_subroom`) for those five rooms. `splev_roomtype` maps `themed` / weapon+armor shop. `filled` defaults to 0 in `in_mk_themerooms`.
**Verify:** `node scripts/verify.mjs --fn build_room` → PASS syntax (1 js file); PASS rule2; PASS hidden verify build_room: 0 PASS, 4 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS (Caveman-70003 → js-throw step 3; Knight-70020 → mineralize step 3; Ranger-70021 → fill_zoo step 42; Tourist-70013 → attributes_enlightenment step 32); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44. VERIFY: PASS
**Named:** Random-feature center terrain; remaining themeroom_fill bodies (Ice/Boulder/Spider/Trap/Garden/Buried treasure/Massacre/Statuary/…); garden/dig postprocess; exclusion_zones save/rest.
**Next:** Open `pickup.c` `doloot_core` (4 corpus blocks). Not leftover WIN_STATUS (`do_statusline1`).
## 2026-09-04 — D-1835 pickup.c describe_decor + invent.c look_here seen-trap There()

**C locus:** `invent.c` `look_here` `:4162–4177` (`!skip_objects` seen `t_at` / `visible_region_at` → `There("is %s%s%s here.")`); `pickup.c` `describe_decor` `:350–426` (Fumbling TIMEOUT==1 `deferred_decor`; waterhere `waterbody_name`; ICE `Norep`; `back_on_ground`); `pickup.c` `pickup` `:710–718` `can_reach_floor(t && is_pit)`; `pickup.c` `force_decor` / `deferred_decor`; `timeout.c` `:926–930` catch-up; `zap.c` `:3761–3764` probing `force_decor(TRUE)`.
**JS:** `js/invent.js` `look_here`; `js/pickup.js` `describe_decor` / `force_decor` / `deferred_decor` / `pickup`; `js/trap.js` `back_on_ground` export; `js/region.js` `reg_damg`; `js/timeout.js` `nh_timeout`; `js/zap.js` `zap_map`.
**Change:** `look_here` plines the seen trap / visible region before the object list. `describe_decor` matches the C body. `pickup` floor arms (nopick / `can_reach_floor(pit)` / `read_engr`) live under `!uswallow`.
**Verify:** `node scripts/verify.mjs --fn describe_decor` → PASS syntax (6 js files); PASS rule2; PASS hidden verify describe_decor: 5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0015-valk-level2-pit-dog-wait ×4 + explore-seed1500-rogue-explore-move-780fb483); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** `ice_descr` thicker/thinner ice; `dfeature_at` ice/pool/lava/throne/drawbridge (so waterhere is rare); `look_here` Blind ice `force_decor` / engulfer stomach minvent; `pickup` unconscious skip. Not leftover WIN_STATUS (`do_statusline1`).
**Next:** Open `sp_lev.c` `build_room` (4 corpus blocks). Not `do_statusline1` leftover WIN_STATUS.
## 2026-09-04 — D-1834 invent.c getobj wear/puton/throw/drink/remove live getobj + equip_ok/throw_ok

**C locus:** `invent.c` `getobj` `:1751–2089` (`:1912–1914` empty `!forceprompt`; `:2058–2062` missing letter); `do_wear.c` `equip_ok` `:3403–3447` / `wear_ok` / `puton_ok` / `remove_ok` / `doremring` `:1873–1889`; `dothrow.c` `throw_ok` `:316–348`; `potion.c` `dodrink` `:535–571` `drink_ok_extra`.
**JS:** `js/invent.js` `getobj`; `js/do_wear.js` `equip_ok` / `wear_ok` / `puton_ok` / `remove_ok` / `doremring`; `js/dothrow.js` `throw_ok`; `js/potion.js` `dodrink`; `js/cmd.js` `'R'`.
**Change:** `dowear`/`doputon`/`dothrow`/`dodrink`/`doremring` call live `getobj`. `equip_ok` GETOBJ ranks (worn XOR removing → `EXCLUDE_INACCESS`; accessory vs armor → `DOWNPLAY`; covering cloak/suit/gloves). `throw_ok` matches C (`!uslinging` weapons, sling gems, `throws_rocks` boulder, hands `EXCLUDE`).
**Verify:** `node scripts/verify.mjs --fn getobj` → PASS syntax (5 js files); PASS rule2; PASS hidden verify getobj: 5 PASS, 2 moved past (`random-seed0015` → `menu_remarm` step 42; `random-seed0200` → `js-throw` step 29), 0 unchanged, 0 worse → PROGRESS; PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** getobj_* clones still in drop/wield/apply/write/takeoff/dip; `canwearobj` polyform (cantweararm/horns/slithy/centaur, welded bimanual, shield+twoweap, utrap boots, Glib gloves); underwater `drink_ok_extra`; Strangled `dodrink`; `item_action_in_progress` unset. Not leftover WIN_STATUS (`do_statusline1`).
**Next:** Open `pickup.c` `describe_decor` (5 corpus blocks). Not `do_statusline1` leftover WIN_STATUS.
