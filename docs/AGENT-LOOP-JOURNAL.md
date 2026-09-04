# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
