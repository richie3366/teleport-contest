# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
