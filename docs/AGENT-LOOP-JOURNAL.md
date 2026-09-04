# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
