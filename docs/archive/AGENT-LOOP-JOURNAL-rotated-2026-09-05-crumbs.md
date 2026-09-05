# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
