# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-26 — D-1507 makemon.c throws_rocks Sokoban first-try

**Objective:** Open `makemon.c` `throws_rocks` Sokoban first-try
(named). Not gnome candle.
**C locus:** `makemon.c` `makemon` 1226–1230; `throws_rocks` /
`In_sokoban`; `goodpos` short-circuit.
**JS locus:** `js/makemon.js` `makemon` random loop.
**Change:** `tryct==1 && throws_rocks && In_sokoban` retries
before `goodpos`; later tries fair game. Explicit ptr
skips. S_KOP / lizard named. C is that small. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
unless a public session rolls a random Sokoban monster.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `polyself.c` `body_part` aliases
(`body_part_head` / `_hand`). Not zap (D-1496).
**Blocked:** none.

## 2026-08-26 — D-1506 makemon.c m_initinv S_GNOME begin_burn

**Objective:** Open `makemon.c` gnome candle `begin_burn` after
`!mpickobj` (named). Not add_to_minv.
**C locus:** `makemon.c` `m_initinv` S_GNOME 809–816;
callee `timeout.c` `begin_burn`; `steal.c` `mpickobj` 1=freed.
**JS locus:** `js/makemon.js` `m_initinv` S_GNOME.
**Change:** `!mpickobj && !levl.lit` → live `begin_burn`.
Merge-freed skip. mktrap_victim floor candle named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
unless a gnome candle lands on an unlit tile.
**Verified:** canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` `throws_rocks` Sokoban first-try
(named). Not gnome candle.
**Blocked:** none.

## 2026-08-25 — D-1505 dog.c mon_arrive MIGR_LEFTOVERS DF_ALL

**Objective:** Open `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL
(named). Not stolen_booty.
**C locus:** `dog.c` `mon_arrive` 576–580 after xyloc, before
`my=xyflags`/place; callee `dokick.c` `deliver_obj_to_mon`.
**JS locus:** `js/dog.js` `mon_arrive_after_you`.
**Change:** `migflags&MIGR_LEFTOVERS` and `migrating_objs` →
`deliver_obj_to_mon(mtmp, 0, DF_ALL)`. With_you still
returns first. wander/`somexy` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
until minetn-1 captain arrives.
**Verified:** canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` gnome candle `begin_burn` after
`!mpickobj` (named). Not add_to_minv.
**Blocked:** none.

## 2026-08-25 — D-1504 mklev.c minetn-7 load_special Bazaar Town

**Objective:** Open `mklev.c` minetn-7 load_special (named).
Not minetn-6.
**C locus:** `dat/minetn-7.lua` via `mkmaze.c` `makemaz` /
`sp_lev.c` `load_special` / `lspo_room` / `lspo_door` pos /
`lspo_feature` sink.
**JS locus:** `js/mklev.js` `load_minetn_7` /
`load_special_proto`.
**Change:** dispatch + clone: nested 30×15 town, percent(75)
nests, chance shops, pos=0 door, sink, temple align[1],
watch. Door helper forwards pos. `ensure_way_out` named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
unless `rnd` hits variant 7.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL
(named). Not stolen_booty.
**Blocked:** none.

## 2026-08-25 — review D-1494–D-1503 (audit #1890)

**Objective:** audit — C-fidelity reviews **455–464** of JS SHAs
`27a1f4b6` / `4722df06` / `08854746` / `377302b9` /
`51ea77da` / `089a9829` / `b96ac27f` / `83b29455` /
`89b85fcc` / `1f64431d` plus full `sessions` score.
**C locus:** `artifact.c` `:1787` Blinded; `trap.c` untrap
door; `polyself.c` body_part callers; `potion.c` dip
poison/oil/poly/`dip_into`/H2O; `artifact.c` TAMING/CHARGE/
PORTAL/BANISH; `dat/minetn-6.lua`.
**Change:** no `js/` edits. All ten **ACCEPT** or
**ACCEPT-WITH-DEBT**. No Must-fix. Filled archive D-1503
`1f64431d`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.30/turn` (R² 0.849).
**Verified:** full `sessions` at HEAD `1f64431d`; public-unhit
of the new arms.
**Next:** Open `mklev.c` minetn-7 load_special (named). Not
minetn-6.
**Blocked:** none.

## 2026-08-25 — D-1503 mklev.c minetn-6 load_special Bustling Town

**Objective:** Open `mklev.c` minetn-6 load_special (named).
Not minetn-1.
**C locus:** `dat/minetn-6.lua` via `mkmaze.c` `makemaz` /
`sp_lev.c` `load_special` / `lspo_map` / `lspo_region`.
**JS locus:** `js/mklev.js` `load_minetn_6` /
`load_special_proto`.
**Change:** dispatch + clone: solidfill then mines lit=1
bg HWALL, top-aligned 40×20 map (`'x'` skip), shops/temple
`priestini`, peaceful watch. `ensure_way_out` named.
Rule #2: no fs.
**Verify:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mklev.c` minetn-7 load_special (named). Not
minetn-6.
