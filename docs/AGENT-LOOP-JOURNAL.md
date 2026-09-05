# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-04 — D-1833 iactions.c itemactions Engrave vs Write, stack simpleonames, apply catalogue

**C locus:** `iactions.c` `itemactions` `:429–445` (E: Engrave vs Write + `surface`); `:309–400` apply otyp chain; `item_naming_classification` `:45–82` via `objnam.c` `simpleonames` `:2427–2442`; `item_reading_classification` `:91–124` cookie/shirt/apron/hawaiian before scroll.
**JS:** `js/iactions.js` `itemactions` / `item_naming_classification` / `item_reading_classification` / local `simpleonames`.
**Change:** E uses C `is_blade` (P_DAGGER..P_SABER) / wand / `oc_tough`. Local `simpleonames` `makeplural`s when `quan != 1`. Apply if-else matches C otyp order (candles `carrying(CANDELABRUM)`).
**Verify:** `node scripts/verify.mjs --fn itemactions` → PASS syntax (1 js file); PASS rule2; PASS hidden verify itemactions: 12 PASS, 2 moved past (2 re-attributed at the same step to `do_statusline1`: `ind-Tourist-662206027-62b71e69` step 19 food-rations leftover WIN_STATUS row 22; `ind-Wizard-971871364-8f1ba690` step 2 bell leftover WIN_STATUS row 22), 0 unchanged, 0 worse → PROGRESS; PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** W already-wearing `armor_simple_name` / `armcat_to_wornmask`; dungeon.c `surface` terrain nouns (ROOM → "floor", matching the four existing stubs); `cantwield` skip of `'w'`; objnam.js export `simpleonames` still omits `makeplural` (iactions/pickup local clones). Traditional itemize yn. doengrave non-hands stylus body.
**Next:** Open `invent.c` `getobj` (7 corpus blocks). Not `do_statusline1` leftover WIN_STATUS (D-1831/D-1832).
## 2026-09-04 — D-1832 wintty.c process_menu_window no redraw on unhandled key (D-1831 snapshot regression)

**C locus:** `wintty.c` `process_menu_window` `:1329–1768` (default: `tty_nhbell(); break;` — `page_start` stays); `iactions.c` `itemactions` `select_menu` PICK_ONE; `display.c` `docrt_flags` `:1765–1770` sets `disp.botlx` and does **not** call `bot()`; `pager.c` `dohelp` / `whatis_menu_choice`.
**JS:** `js/iactions.js` `itemactions`; `js/pager.js` `whatis_menu_choice` / `dohelp`; `js/invent.js` `dismiss_nhw_menu`; `js/display.js` `_buildScreenOutput`.
**Change:** Unhandled keys `tty_nhbell` only (no `docrt`/`cls`). Valid pick/cancel uses `dismiss_nhw_menu` (corner docorner). Fullscreen dismiss sets `_statusSuppressed` so the itemed leftover stays blank until `bot()`.
**Verify:** `node scripts/verify.mjs --fn process_menu_window --base ab55b818` → PASS syntax (4 js files); PASS rule2; PASS hidden verify process_menu_window: 19 PASS, 2 moved past (2 re-attributed at the same step to `do_statusline1`: `explore-seed0116` ×2), 0 unchanged, 0 worse → PROGRESS; PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `process_menu_window` paging `docorner` repair (`previous_page_lines`); PICK_ANY invert-all; itemactions apply catalogue; Traditional itemize yn. Not leftover WIN_STATUS on unhandled keys, MENU_SEARCH overlay wrap, per-window extra-page `cl_end`, or D-0467 fullscreen-invent blank.
**Next:** Open `iactions.c` `itemactions` (Engrave vs Write, cookie vs cookies). Not getobj.
## 2026-09-05 — human postmortem #2238–#2240 (D-1831 continuation)

**Found:** #2238 died on a provider quota error one call after a complete
verify (174 calls, 19 min); #2240 spent ~150 calls re-deriving it, then
four serial regression rounds — 359 calls, 17.2 M tokens, 43 min. Its
last edit (`_snapshotStatusGrid`) regressed 12 of the 21 corpus sessions;
verify's baseline had been consumed, so "PASS hidden" was vacuous.
Re-scored at HEAD: 164/265 (was claimed 176).
**Changed:** `hidden-proxy verify --base` (committed baseline, PASS→fail
= WORSE), `verify.mjs` FAIL triage + `note` for vacuous corpus checks,
`loop-resume-brief.mjs` embedded in the continue overlay, quota halt
without reset, continue prompt rewritten (verify by call ≤5).
**Next:** Must-fix `process_menu_window` regression. Not `itemactions` yet.
## 2026-09-04 — D-1831 wintty.c process_menu_window leftover WIN_STATUS + MENU_SEARCH overlay wrap

**C locus:** `wintty.c` `process_menu_window` `:1329–1768` (`:1501–1505`
**JS:** `js/display.js` `set_bot_disabled` / `_paintToplineOnlyOverOverlay` /
**Change:** `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv /
**Verify:** `node scripts/verify.mjs --fn process_menu_window` → PASS syntax
**Named:** `process_menu_window` paging `docorner` repair
**Next:** Open `iactions.c` `itemactions`. Not getobj.
## 2026-09-04 — D-1830 mkmaze.c makemaz Rog-strt/loca/goal/fila/filb load_special (Rogue quest 5/5)

**C locus:** `dat/Rog-strt.lua` / `Rog-loca.lua` / `Rog-goal.lua` /
**JS:** `js/mklev.js` `load_rog_strt` / `load_rog_loca` / `load_rog_fila` /
**Change:** `load_rog_strt` from the lua body: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `wintty.c` `process_menu_window`. Not fakewiz.
## 2026-09-04 — D-1829 mkmaze.c makemaz Kni-strt/loca/fila/filb load_special (Knight quest 5/5)

**C locus:** `dat/Kni-strt.lua` / `Kni-loca.lua` / `Kni-fila.lua` /
**JS:** `js/mklev.js` `load_kni_strt` / `load_kni_loca` / `load_kni_fila` /
**Change:** `load_kni_strt` from the lua body: solidfill ROOM + mines fg=bg="."
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` `makemaz` `Rog-strt`/`-loca`/`-goal`/`-fila`/`-filb`.
