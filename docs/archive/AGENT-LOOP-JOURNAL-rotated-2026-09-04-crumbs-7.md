# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-04 — D-1823 mkmaze.c makemaz minend-3 load_special (Catacombs / Mine's End 3/3)

**C locus:** `dat/minend-3.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_minend_3` / `load_special_proto`.
**Change:** `load_minend_3` from the lua body: solidfill HWALL (so
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** ensure_way_out; link_doors_rooms; map_cleanup;
**Next:** Open `mcastu.c` `castmu` remaining spell arms (`mcast_*` /

## 2026-09-04 — D-1822 mkmaze.c makemaz bigrm-1/10/13 load_special (completes Big Room 13/13)

**C locus:** `dat/bigrm-{1,10,13}.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_bigrm_1` / `load_bigrm_10` / `load_bigrm_13` /
**Change:** `load_bigrm_1` (solidfill + 18×75 room; `percent(80)` then
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** ensure_way_out; humidity-aware `get_location`;
**Next:** Open `mkmaze.c` makemaz `minend-3` from `dat/minend-3.lua`.

## 2026-09-04 — D-1821 mkmaze.c makemaz bigrm-5/6/11 load_special (three smallest Big Rooms)

**C locus:** `dat/bigrm-{5,6,11}.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_bigrm_5` / `load_bigrm_6` / `load_bigrm_11` /
**Change:** `load_bigrm_5` (solidfill + 19×74 diamond; `percent(25)`
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** ensure_way_out; humidity-aware `get_location`;
**Next:** Open `mkmaze.c` makemaz `bigrm-1`/`-10`/`-13` from

## 2026-09-04 — D-1820 mkmaze.c makemaz soko2-2 load_special (Sokoban 2 second variant)

**C locus:** `dat/soko2-2.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_soko2_2` / `load_special_proto`.
**Change:** `load_soko2_2` from the lua body: solidfill + mazelevel 22×13
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** ensure_way_out; humidity-aware `get_location`;
**Next:** Open `mkmaze.c` makemaz `bigrm-5`/`-6`/`-11` from

## 2026-09-04 — D-1819 mkmaze.c makemaz Bar-goal load_special (Thoth Amon / Heart of Ahriman)

**C locus:** `dat/Bar-goal.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_bar_goal` / `load_special_proto`.
**Change:** `load_bar_goal` from the lua body: solidfill + mazelevel map,
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` makemaz `soko2-2` from `dat/soko2-2.lua`.

## 2026-09-04 — D-1818 mkmaze.c makemaz Wiz-goal load_special (Dark One / Eye)

**C locus:** `dat/Wiz-goal.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_wiz_goal` / `load_special_proto`;
**Change:** `load_wiz_goal` from the lua body: solidfill + mazelevel map,
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` makemaz `Bar-goal` from `dat/Bar-goal.lua`.
