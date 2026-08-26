# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1520 options.c fruitadd fruit_from_name walker

**Objective:** Open `options.c` fruitadd should call objnam
`fruit_from_name` (not the exact-only walker). Not
fruit_from_indx.
**C locus:** `options.c` `fruitadd` `:8264`; callee
`objnam.c` `fruit_from_name` `:443–519`; caller
`optfn_fruit` `:1735`.
**JS locus:** `js/options.js` `fruitadd`; `js/mklev.js`
`fruitadd_orc`; `js/hacklib.js` `str_end_is`.
**Change:** Drop local exact-only walker. Live objnam
`fruit_from_name(FALSE)` + max fid. Candify tin/corpse/egg
`name_to_mon`; overflow `rnd(127)`. Orc clone same walker.
Bones/restore ghostfruit named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
prefix/candify fruit public-unhit except seed4500 doset
path (still PASS).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict; seed4500 + strict.
**Next:** Open `objnam.c` doname_base slime-mold fake_arti.
Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — D-1519 mklev.c mktrap_victim gnome candle begin_burn

**Objective:** Open `mklev.c` `mktrap_victim` gnome candle
`begin_burn` (named). Not `m_initinv`.
**C locus:** `mklev.c` `mktrap_victim` `:1918–1919`.
**JS locus:** `js/mklev.js` `mktrap_victim`.
**Change:** After gnome `place_object`, `!levl.lit` → live
`begin_burn(otmp, false)`. Not D-1506 minvent. `create_object`
`o->lit` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
public-unhit unless gnome victim candle on unlit trap.
**Verified:** canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `options.c` fruitadd `fruit_from_name`.
Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — D-1518 makemon.c dprince MS_BRIBE / raven BEC_DE_CORBIN

**Objective:** Open `makemon.c` dprince MS_BRIBE / raven
`BEC_DE_CORBIN` (named). Not emin.
**C locus:** `makemon.c` `makemon` `:1397–1404`.
**JS locus:** `js/makemon.js` `makemon`.
**Change:** Bribe princes peace+invis; Excalibur/Demonbane
hostile+untame; raven+bec peace. Live `is_dprince`. Local
`u_wield_art` clone (artifact→display→mkobj cycle). Rule #2:
no fs.
**Score:** fortress **44**/44 (cadence #1900);
public-unhit until bribe prince / raven-with-bec.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mklev.c` `mktrap_victim` gnome candle
`begin_burn`. Not `m_initinv`.
**Blocked:** none.
## 2026-08-26 — D-1517 makemon.c set_mimic_sym maze/in_town statue

**Objective:** Open `makemon.c` `set_mimic_sym`
maze/sokoban/`in_town` (named). Not shop arm.
**C locus:** `makemon.c` `set_mimic_sym` `:2439–2443`;
callee `hack.c` `in_town` + `mkroom.c` `inside_room`.
**JS locus:** `js/makemon.js` `set_mimic_sym`.
**Change:** C `!(In_mines && in_town(u.ux,u.uy))` not
mines-only skip. Local `in_town` clone (hack→trap/mon
cycle; same as `t_at_local`). Sokoban already skipped
`rn2(2)`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
mines-maze statue public-unhit unless town skip.
**Verified:** canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` dprince MS_BRIBE / raven
`BEC_DE_CORBIN`. Not emin.
**Blocked:** none.
## 2026-08-26 — D-1516 makemon.c m_initweap S_LIZARD skip + PM_NINJA kit

**Objective:** Open `makemon.c` non-salamander S_LIZARD
`m_initweap` (named). Not S_KOP.
**C locus:** `makemon.c` `m_initweap` S_LIZARD `:495–499`;
S_HUMAN `PM_NINJA` `:270–272`; callee `mongets`.
**JS locus:** `js/makemon.js` `m_initweap`.
**Change:** Keep lizard `if (mm==PM_SALAMANDER)` then break
(`!is_armed` skip). Port ninja SHURIKEN|DART then
SHORT_SWORD|AXE. Same function; live `mongets`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
ninja public-unhit until quest create.
**Verified:** canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym`
maze/sokoban/`in_town`. Not shop arm.
**Blocked:** none.
## 2026-08-26 — D-1515 makemon.c m_initweap S_KOP cream pie / club / hose

**Objective:** Open `makemon.c` S_KOP `m_initweap`
specials (named). Not throws_rocks.
**C locus:** `makemon.c` `m_initweap` S_KOP `:402–409`;
callees `m_initthrow` / `mongets`.
**JS locus:** `js/makemon.js` `m_initweap`.
**Change:** `!rn2(4)` `m_initthrow(CREAM_PIE,2)` then
`!rn2(3)` CLUB or RUBBER_HOSE. Not a clone. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
kops public-unhit until `makekops`.
**Verified:** canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` non-salamander S_LIZARD
`m_initweap`. Not S_KOP.
**Blocked:** none.
## 2026-08-26 — D-1514 artifact.c SPFX_WARN conferral + MATCH_WARN

**Objective:** Open `artifact.c` SPFX_WARN conferral /
MATCH_WARN (named). Not Sting_effects.
**C locus:** `artifact.c` `set_artifact_intrinsic`
`:824–839`; `spec_m2` `:1065–1072`; `hack.h`
`MATCH_WARN_OF_MON`.
**JS locus:** `js/artifact.js`; `js/display.js`.
**Change:** spec_m2 → EWarn_of_mon + warntype.obj +
see_monsters; else EWarning. MATCH_WARN in sensemon
and newsym see_it. Not confer_oc_oprop. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
Sting glow public-unhit until wielded.
**Verified:** canary **44**/44; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` S_KOP `m_initweap`
specials. Not throws_rocks.
**Blocked:** none.
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
