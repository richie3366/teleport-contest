# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-04 — D-1828 mkmaze.c makemaz astral load_special (endgame plane 5 of 5)

**C locus:** `dat/astral.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_astral` / `load_special_proto`;
**Change:** `load_astral` from the lua body: solidfill + mazelevel+noteleport
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `ensure_way_out`;
**Next:** Open `mkmaze.c` `makemaz` `Kni-strt`/`-loca`/`-fila`/`-filb`.
## 2026-09-04 — D-1827 mkmaze.c makemaz water load_special + save_waterlevel

**C locus:** `dat/water.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_water` / `load_special_proto` /
**Change:** `load_water` from the lua body: solidfill + mazelevel+noteleport
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** water cons pickup / `maybe_adjust_hero_bubble`;
**Next:** Open `mkmaze.c` `makemaz` `astral`. Not Knight/Rogue quest.
## 2026-09-04 — D-1826 mkmaze.c makemaz medusa-2/4 load_special (Medusa 4/4)

**C locus:** `dat/medusa-2.lua`; `dat/medusa-4.lua`; `mkmaze.c` `makemaz`
**JS:** `js/mklev.js` `load_medusa_2` / `load_medusa_4` /
**Change:** `load_medusa_2` from the lua body: solidfill + mazelevel+noteleport,
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `ensure_way_out` /
**Next:** Open `mkmaze.c` `makemaz` `water` + `save_waterlevel` /
## 2026-09-04 — D-1825 mcastu.c mcast_spell remaining 14 arms + touch_of_death

**C locus:** `mcastu.c` `mcast_spell` `:800–897` (all 20 `MCAST_*`
**JS:** `js/mcastu.js` `mcast_spell` / `touch_of_death`; `js/attrib.js`
**Change:** port the remaining 14 arms from the C bodies; `mcast_spell`
**Verify:** `node scripts/verify.mjs --fn castmu` → PASS syntax
**Named:** `mon_spell_hits_spot` (fire-pillar/lightning
**Next:** Open `mkmaze.c` `makemaz` `medusa-2`/`-4`. Not buzzmu.
## 2026-09-04 — D-1824 dat/Bar-goal.lua fourteen empty des.object after Heart

**C locus:** `dat/Bar-goal.lua` `:44–57`; `sp_lev.c` `create_object` /
**JS:** `js/mklev.js` `load_bar_goal`.
**Change:** loop bound 14 matching lua `:44–57`. Heart, six traps, and
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mcastu.c` `castmu` remaining spell arms (`mcast_*` /
## 2026-09-04 — audit overlay 784–793 + cadence 44/44

**Objective:** review JS SHAs since `5c68c8c3` against pinned C;
cadence full `sessions` (no `js/` port).
**SHAs:** 784–788 ACCEPT/AWD (D-1815…D-1818, hidden-proxy). **789
QUALITY-RISK** D-1819 Bar-goal 15 extra `des.object()` vs lua 14 —
Must-fix stays first. 790–793 AWD (soko2-2, bigrm 13/13, minend-3).
**Cadence:** 44/44 at `171f6b02`; scr 11405/11405; RNG 792838/792838;
`43+0.33/turn` (R² 0.862). Hidden 157/265 (59.2%). Rule #2 clean.
**Next:** Must-fix Bar-goal lua `:44–57` fourteen objects. Not Open
`castmu`.
