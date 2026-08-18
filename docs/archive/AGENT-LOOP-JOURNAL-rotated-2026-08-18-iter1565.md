# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-18 22:50 — #1565 review D-1230–D-1233 + cadence

**Objective:** audit — C-fidelity reviews **192–195** of JS SHAs
since `f8231830`, plus full `sessions` score. No `js/` port.
**C locus:** `cmd.c` `#teleport`/`doextcmd`; `mhitm.c` gulpmm
`m_at` swap + AT_ENGL; `uhitm.c` `hmon_hitmon` / `damageum`
`troll_baned`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: rolling-boulder TELEP, snuff_lit/`!goodpos`/
AD_DGST eat, AT_HUGS/EXPL/ENGL, altwep, `demonpet` spawn). Filled
D-1233 archive hash `976094e5`. Open 12 (no refill). Rule #2: no fs.
**Score:** cadence **#1565** HEAD `976094e5` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.847). seed0383 PASS. Next audit @**#1570**.
**Verified:** `__RESULTS_JSON__` at HEAD `976094e5`; branch-by-branch
vs pinned C (`dotelecmd` live; gulpmm occupancy stand-in;
TRUE-only vs ternary wraps; Upolyd→hmonas).
**Next:** Open `do.c` `revive_corpse` unique/pname `corpse_xname`
(named). Not Soundeffect.
**Blocked:** none.

## 2026-08-18 22:40 — #1564 D-1233 hmonas damageum troll_baned

**Objective:** Open `uhitm.c` `hmonas` `troll_baned`
`mkcorpstat_norevive` (named). Not hmon_hitmon.
**C locus:** `uhitm.c` `damageum` 4866–4880 (ternary
`troll_baned(mdef, uwep)` on AT_WEAP||AT_CLAW then killed/xkilled
then FALSE); `do_attack` Upolyd → `hmonas`.
**Change:** `damageum` wrap + thin `hmonas` (weapon → `known_hitum`;
natural → `damageum`) + `do_attack` Upolyd. Did not pull
AT_HUGS/EXPL/ENGL, altwep, or `demonpet` spawn. Filled D-1232
archive hash `83624a46`. Open 7 after archive → refill to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1560** **44**/44; next
audit @**#1565**).
**Verified:** private canary **38**/38; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Public-unhit unless Upolyd Trollsbane troll melee.
**Next:** Open `do.c` `revive_corpse` unique/pname `corpse_xname`
(named). Not Soundeffect.

## 2026-08-18 22:15 — #1563 D-1232 hmon_hitmon troll_baned

**Objective:** Open `uhitm.c` `hmon_hitmon` `troll_baned` around
`killed` (named). Not hmonas.
**C locus:** `monst.h` `troll_baned`; `uhitm.c` `hmon_hitmon`
1906–1909 (TRUE-only then `killed` then FALSE).
**Change:** `hmon` sets `mkcorpstat_norevive` only when
`troll_baned(mon, obj)` (uses hitting `obj`, not `uwep`); always
resets after `killed`. Did not pull hmonas AT_WEAP||AT_CLAW
ternary/`uwep`, poison `already_killed`, or remaining `pline_mon`.
Filled D-1231 archive hash `5cd4ab5c`. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1560** **44**/44; next
audit @**#1565**).
**Verified:** private canary **31**/31 (C TRUE-only vs hmonas
ternary; Trollsbane troll corpse `norevive`+twitch; plain/ogre
unset; leftover TRUE copies; flag reset); green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless hero Trollsbane troll kill.
**Next:** Open `uhitm.c` `hmonas` `troll_baned` `mkcorpstat_norevive`
(named). Not hmon_hitmon.

## 2026-08-18 22:05 — #1562 D-1231 gulpmm m_at swap

**Objective:** Open `mhitm.c` gulpmm `m_at` swap (named). Not
passivemm.
**C locus:** `mhitm.c` `mdamagem` 1075–1080; `gulpmm` 849–967;
`mattackm` AT_ENGL 510–536; `engulf_target` 807–844;
`failed_grab` 597–639.
**Change:** `gulpmm` puts magr on mdef's cell (`MON_OFFMAP` for
C grid); `m_at` skips that bit; `mdamagem` re-places mdef
before `monkilled`. AT_ENGL shade/usteed/distmin/`engulfing_u`/
`failed_grab`. Did not pull snuff_lit, `!goodpos` return-home,
AD_DGST eat, passivemm, or uhitm troll_baned. Filled D-1230
archive hash `a3c04dd7`. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1560** **44**/44; next
audit @**#1565**).
**Verified:** private canary **38**/38; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless mon-vs-mon engulf.
**Next:** Open `uhitm.c` `hmon_hitmon` `troll_baned` around
`killed` (named). Not hmonas.

## 2026-08-18 21:50 — #1561 D-1230 #teleport doextcmd

**Objective:** Open `teleport.c` `#teleport` `doextcmd` (named from
D-1209). Not energy-spellcast.
**C locus:** `cmd.c` extcmdlist `"teleport"` 1890–1891 /
`doextcmd` 493–519 / `accept_menu_prefix` 3508–3512;
`getline.c` `tty_get_ext_cmd` ECM_IGNOREAC|ECM_EXACTMATCH;
callee `teleport.c` `dotelecmd` already live.
**Change:** EXT_CMDS `"teleport"` → `dotelecmd` (no AUTOCOMPLETE).
rhack `#` keeps `menu_requested`; `doextcmd` clears with C's
prefix-no-effect pline unless the resolved name is CMD_M_PREFIX.
Did not pull rolling-boulder TELEP `pline_xy`, directional
`weffects`, or Amulet drain. Filled D-1229 archive hash
`0ddfb189` already present. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1560** **44**/44; next
audit @**#1565**).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless `#teleport` (plain `^T`
unchanged).
**Next:** Open `mhitm.c` gulpmm `m_at` swap (named). Not
passivemm.
**Blocked:** none.

## 2026-08-18 21:35 — #1560 review D-1226–D-1229 + cadence

**Objective:** C-fidelity review of JS-touching SHAs since review
**187**; cadence full `sessions`.
**C locus:** `hack.c` `test_move` 1216–1230 /
`could_move_onto_boulder` 145–163; `monmove.c` remaining
`pline_mon` 493–1610; `msg_mon_movement` 32–48;
`impact_disturbs_zombies` 1787–1794.
**Change:** reviews **188–191** ACCEPT-WITH-DEBT. Filled archive
**Addressed:** D-1229 `0ddfb189`. Must-fix empty. No `js/` edits.
**Score:** cadence **#1560** HEAD `0ddfb189` **44**/44 Scr
**11405**/11405 RNG **100%** speed `36+0.30/turn` (R² 0.852).
Next audit @**#1565**.
**Verified:** full `sessions` this iter. Public-unhit admitted in
188–191 (mention_walls / accessiblemsg / mon_movement Off;
impact unless heavy land over buried ZOMBIFY).
**Next:** Open `teleport.c` `#teleport` `doextcmd` (named from
D-1209). Not energy-spellcast.
**Blocked:** none.
