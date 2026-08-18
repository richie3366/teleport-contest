# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-18 21:20 — #1559 D-1229 impact_disturbs_zombies

**Objective:** Open `hack.c` `impact_disturbs_zombies` (named from
D-1214). Not hideunder.
**C locus:** `hack.c` `impact_disturbs_zombies` 1787–1794;
callers `do.c:832` dropz; `dothrow.c:1831` throwit `!IS_SOFT`;
`dokick.c:642/:786` kick place.
**Change:** owt/flimsy gate then disturb ox,oy after place.
Violent 10 / gentle 100. `is_flimsy` ≤LEATHER or rubber hose.
Did not pull container_impact, hitfloor `dropz(TRUE)`, hideunder,
or local wake clones. Filled D-1228 archive hash `23f3f19e`.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1555** **44**/44; next
audit @**#1560**).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless a ≥10 (throw/kick) or ≥100
(drop) non-flimsy object lands on hard terrain over a buried
ZOMBIFY corpse.
**Next:** Open `teleport.c` `#teleport` `doextcmd` (named from
D-1209). Not energy-spellcast.
**Blocked:** none.

## 2026-08-18 21:05 — #1558 D-1228 msg_mon_movement

**Objective:** Open `hack.c` `msg_mon_movement` (named). Not
pline_mon. C is `monmove.c`.
**C locus:** `monmove.c` `msg_mon_movement` 32–48 / `m_move`
2051–2053 after `place_monster`.
**Change:** dest `pline_xy` after place (not `pline_mon`);
`a11y.mon_movement` + `canspotmon` + `mspotted`; next2u/closer/
further/distance + `vtense(null, locomotion(…,"move"))`. Did not
wire optlist addr, `worm_move`, remaining `pline_mon`, or TELEP
`pline_xy`. Filled D-1227 archive hash `1da251ee`. Refill Open
to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1555** **44**/44; next
audit @**#1560**).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless `mon_movement` On (default
Off) and already `mspotted`.
**Next:** Open `hack.c` `impact_disturbs_zombies` (named from
D-1214). Not hideunder.
**Blocked:** none.

## 2026-08-18 20:55 — #1557 D-1227 monmove remaining pline_mon

**Objective:** Open remaining `pline.c` `pline_mon` callers
(named). Not msg_mon_movement.
**C locus:** `monmove.c` `monflee` 493–517 / `itsstuck` 1056 /
`maybe_spin_web` 1286 / `postmov` door 1551–1610.
**Change:** live flee/web/door/itsstuck `pline`→`pline_mon`;
You_see/You_hear stay `pline`; fog/S_LIGHT flows; Adjmonnam
immobile + upstart(y_monnam). Did not pull `msg_mon_movement`,
flees_light `rn2(10)`, mind_blast, bee_eat, iron bars, or
`mon_yells`. Filled D-1226 archive hash `7998cb1e`. Open 8 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1555** **44**/44; next
audit @**#1560**).
**Verified:** private canary **33**/33; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless `accessiblemsg` On (default
Off).
**Next:** Open `hack.c` `msg_mon_movement` (named). Not pline_mon.
**Blocked:** none.

## 2026-08-18 19:55 — #1556 D-1226 test_move run>=2 boulder pline_dir

**Objective:** Open — `hack.c` run>=2 boulder `pline_dir`
(named). Not mention_walls.
**C locus:** `hack.c` `test_move` 1216–1221 /
`could_move_onto_boulder` 145–163.
**Change:** run>=2 abort before moverock; DO_MOVE +
`flags.mention_walls` `pline_dir(xytodir(dx,dy), "A boulder
blocks your path.")`; TEST_MOVE silent; Passes_walls skip
outer arm. Did not pull cannot_push squeeze / sokoban_guilt /
mention_walls `"It's %s."`. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1555** **44**/44; next
audit @**#1560**).
**Verified:** private canary **35**/35; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. Public-unhit unless g/G/travel onto a boulder
with mention_walls On (default Off).
**Next:** Open remaining `pline.c` `pline_mon` callers (named).
Not msg_mon_movement.
**Blocked:** none.

## 2026-08-18 19:50 — #1555 review D-1221–D-1225 + cadence score

**Objective:** audit — C-fidelity reviews **183–187** of JS SHAs
since `7b24ec10`, plus full `sessions` score. No `js/` port.
**C locus:** `display.c` `gbuf_show_kind`; `do.c` `Soundeffect`;
`mhitm.c` `troll_baned`; `teleport.c` LEVEL_TELEP / energy;
`spell.c` `known_spell` / `spelleffects` SPE_TELEPORT_AWAY atme.
**Change:** five reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: integer glyphs, other Soundeffect, gulpmm/
uhitm troll_baned, `#teleport`, weffects, Amulet drain). Filled
D-1225 archive hash `89588300`. Open 10 (no refill). Rotated #1542.
Rule #2: no fs.
**Score:** cadence **#1555** **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 (100%) speed `34+0.31/turn` (R² 0.878).
seed0383 PASS. Next audit @**#1560**.
**Verified:** `__RESULTS_JSON__` at HEAD `89588300`; branch-by-branch
vs pinned C (no Hallu reroll; empty contest `Soundeffect`; live
`norevive`/`level_tele`/`zapyourself` tele).
**Next:** Open `hack.c` run>=2 boulder `pline_dir` (named). Not
mention_walls.
**Blocked:** none.

## 2026-08-18 19:35 — D-1225 dotele energy/spelleffects SPE_TELEPORT_AWAY

**Objective:** Open — `spell.c` energy/`spelleffects` teleport
(named from D-1209). Not `#teleport` doextcmd.
**C locus:** `teleport.c` `dotele` 1070–1142; `spell.c`
`known_spell` 2363–2375 / `spelleffects` SPE_TELEPORT_AWAY atme /
`spelleffects_check` `check_capacity` 1279–1283.
**Change:** `known_spell` enum; dotele hunger/STR/`uen`/capacity
then `castit` → `spelleffects(SPE_TELEPORT_AWAY, TRUE)` (return
before `tele`/`morehungry(100)`) else debit `5*oc_level`.
SPE_TELEPORT_AWAY self-zap; capacity TIME in check. Did not pull
`#teleport` doextcmd, amulet drain, or directional `weffects`.
Filled D-1224 archive hash `790ca8b7`. Rotated #1541. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1550** then D-1221
**44**/44; next audit @**#1555**).
**Verified:** private canary **61**/61; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/
2200/0383. Public-unhit unless `^T` without a trap.
**Next:** Open `hack.c` run>=2 boulder `pline_dir` (named). Not
mention_walls.
**Blocked:** none.
