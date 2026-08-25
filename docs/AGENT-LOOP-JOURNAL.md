# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1513 mklev.c minetn-7 town-floor three gnomes

**Objective:** Must-fix `load_minetn_7` three town gnomes
not four (review **465**). Not SPFX_WARN.
**C locus:** `dat/minetn-7.lua` `:155–165`; callee
`sp_lev.c` `create_monster` `induced_align(80)`.
**JS locus:** `js/mklev.js` `load_minetn_7`.
**Change:** delete the extra
`splev_room_monster(town, 'gnome')` so lua×3 matches.
Nested / stair gnomes unchanged. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
Bazaar Town public-unhit unless variant 7.
**Verified:** canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `artifact.c` SPFX_WARN conferral /
MATCH_WARN. Not Sting_effects.
**Blocked:** none.
## 2026-08-26 — review D-1504–D-1512 (audit #1900)

**Objective:** audit — C-fidelity reviews **465–473** of JS SHAs
`eeb0e912` / `cac06f86` / `1e1d1864` / `a4a370f4` /
`be542317` / `7092fab7` / `57d22857` / `85c341a7` /
`79744185` plus full `sessions` score.
**C locus:** `dat/minetn-7.lua`; `dog.c` leftovers;
`makemon.c` gnome candle / `throws_rocks`; `body_part`
aliases; `potion.c` lichen; `zap.c` worn `set_wear`;
`objnam.c` `fruit_from_indx`; `region.c` `any_visible_region`.
**Change:** no `js/` edits. Eight **ACCEPT-WITH-DEBT**;
**465 QUALITY-RISK** Must-fix extra town gnome. Filled
archive D-1512 `79744185`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `79744185`.
**Next:** Must-fix `load_minetn_7` three gnomes not four
(review 465). Not SPFX_WARN.
**Blocked:** none.
## 2026-08-26 — D-1512 region.c any_visible_region + allmain

**Objective:** Open `display.c` `any_visible_region`
(named). Not Hallu/Warn_of_mon. C is `region.c`.
**C locus:** `region.c` `any_visible_region` `:658–670`;
caller `allmain.c` `:462–468`.
**JS locus:** `js/region.js`; `js/allmain.js`.
**Change:** scan `visible && ttl != -2`; OR into
once-per-input else-if. Hallu arm unchanged.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890);
gas-cloud refresh public-unhit.
**Verified:** canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `artifact.c` SPFX_WARN conferral /
MATCH_WARN. Not Sting_effects.
**Blocked:** none.
## 2026-08-26 — D-1511 objnam.c fruit_from_indx + xname SLIME_MOLD

**Objective:** Open `objnam.c` `fruit_from_indx`
(named). Not the().
**C locus:** `objnam.c` `fruit_from_indx` `:431–439`;
caller `xname_flags` FOOD SLIME_MOLD `:747–774`;
`options.c` `initoptions_finish` fruitadd.
**JS locus:** `js/objnam.js`; `js/options.js`
`init_fruit_chain`; `js/jsmain.js`.
**Change:** lookup by `fid`; slime mold `xname`/`doname`
use `fname` (quan ick); default chain fid 1 so Tourist
`"slime mold"` still matches. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); default
fruit still public-hit; custom `#name` fruit public-unhit.
**Verified:** canary **16**/16; green+strict seed8000/0900;
focused seed0060; cohort **7**/7 + strict.
**Next:** Open `display.c` `any_visible_region`.
Not Hallu/Warn_of_mon.
**Blocked:** none.
## 2026-08-26 — D-1510 zap.c poly_obj worn set_wear

**Objective:** Open `zap.c` `poly_obj` worn `set_wear`
(named). Not potion_dip.
**C locus:** `zap.c` `poly_obj` `:1921–1950`; callees
`worn.c` `wearslot` / `wearmask_to_obj`; `steal.c`
`remove_worn_item`; `do_wear.c` `set_wear`.
**JS locus:** `js/zap.js` `poly_obj`; `js/worn.js`.
**Change:** invent worn remap after `freeinv_core`:
W_WEAPONS keep slot else `wearslot&old`; then
`setuwep`/`setuswapwep`/`setuqwep` or
`setworn`+`set_wear`+`wearmask_to_obj`. `poly_obj`
async. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
until a session polys worn gear.
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `objnam.c` `fruit_from_indx`.
Not the().
**Blocked:** none.
## 2026-08-26 — D-1509 potion.c potion_dip lichen corpse / acid-erode

**Objective:** Open `potion.c` `potion_dip` lichen corpse /
acid-erode (named). Not H2O useeit.
**C locus:** `potion.c` `potion_dip` `:2596–2606` +
`:2638–2643`; callee `trap.c` `erode_obj`.
**JS locus:** `js/potion.js` `potion_dip`.
**Change:** acid+lichen corpse wrinkle/color, no poof,
`trycall` if dknown. Else POT_ACID `erode_obj`
ERODE_CORRODE EF_GREASE; poof unless ER_NOTHING.
Dynamic trap import. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
until a session #dips acid onto a lichen corpse or
corrodeable.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `zap.c` `poly_obj` worn `set_wear`.
Not potion_dip.
**Blocked:** none.
## 2026-08-26 — D-1508 polyself.c body_part HEAD/HAND aliases

**Objective:** Open `polyself.c` `body_part` aliases:
`body_part_head` (mcastu), `body_part_hand` (pickup).
Not zap (D-1496).
**C locus:** `polyself.c` `body_part`; callers
`mcastu.c` `mcast_psi_bolt` HEAD; `pickup.c`
`u_handsy` / `able_to_loot` / Sokoban `lift_object` HAND.
**JS locus:** `js/mcastu.js`; `js/pickup.js` latebound.
**Change:** drop local clones; mcastu imports
`body_part(HEAD)`; pickup `body_part_latebound(HAND)`
(polyself→do cycle). Freehand loot + Sokoban boulder.
`mcast_blind_you` EYE named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
unless poly prints those anatomy lines.
**Verified:** canary **9**/9; green+strict seed8000/0900;
focused seed4500; cohort **7**/7 + strict.
**Next:** Open `potion.c` `potion_dip` lichen corpse /
acid-erode. Not H2O useeit.
**Blocked:** none.
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
