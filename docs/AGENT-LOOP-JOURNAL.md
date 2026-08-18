# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```
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
## 2026-08-18 19:15 — D-1224 dotele LEVEL_TELEP yn + level_tele_trap

**Objective:** Open — `teleport.c` LEVEL_TELEP `y_n` (named from
D-1209). Not energy-spellcast.
**C locus:** `teleport.c` `dotele` 1046–1053 / `level_tele_trap`
1538–1571; `trap.c` `trapeffect_level_telep` 2093–2095.
**Change:** seen LEVEL_TELEP `y_n` then `level_tele_trap(FORCETRAP)`
or `trap=0`. Callee: trigger vs step-onto; AM wrench unless
intentional; endgame wrench always; deltrap+`level_tele`; Hallu/TC
briefly feel else disoriented; !TC `make_confused` after port.
Hero trapeffect `seetrap`+call. Did not pull energy/`spelleffects`
or `#teleport` doextcmd. Filled D-1223 archive hash `d4f9b432`.
Rotated #1540. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1550** then D-1221
**44**/44; next audit @**#1555**).
**Verified:** private canary **49**/49; green+strict
seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007.
Public-unhit unless `^T`/step/sit on a seen LEVEL_TELEP.
**Next:** Open `spell.c` energy/`spelleffects` teleport (named from
D-1209). Not `#teleport` doextcmd.
**Blocked:** none.
## 2026-08-18 18:55 — D-1223 mhitm troll_baned mkcorpstat_norevive

**Objective:** Open — `mhitm.c` `troll_baned` `mkcorpstat_norevive`
(named). Not gulpmm.
**C locus:** `monst.h` `troll_baned`; `mhitm.c` `mdamagem`
1081–1082 / 1090; `mkobj.c` `mkcorpstat` 2087.
**Change:** `troll_baned` (S_TROLL + Trollsbane). Helper sets
`mkcorpstat_norevive` on AT_WEAP||AT_CLAW around `monkilled`,
then reset with zombify. Did not pull gulpmm swap or uhitm
hmon_hitmon/hmonas. Filled D-1222 archive hash `7b0f9da7`.
Rotated #1539. Open 7 after archive; refill to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1550** then D-1221
**44**/44; next audit @**#1555**).
**Verified:** private canary **37**/37; green+strict
seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007.
Public-unhit unless Trollsbane AT_WEAP/AT_CLAW troll kill.
**Next:** Open `teleport.c` LEVEL_TELEP `y_n` (named from D-1209).
Not energy-spellcast.
**Blocked:** none.
## 2026-08-18 18:39 — D-1222 revive_corpse Soundeffect se_scratching

**Objective:** Open — `do.c` `revive_corpse` `Soundeffect`
se_scratching (named). Not BURIED pit.
**C locus:** `do.c` `revive_corpse` 2230; `sndprocs.h`
`Soundeffect` empty `!SND_LIB_INTEGRATED`; `seffects.h`
`se_scratching=145`.
**Change:** extract seffects enum; `sndprocs.js` `Soundeffect`
matches contest empty macro; call `Soundeffect(se_scratching, 50)`
then `You_hear` on the buried hear arm. Pit/claw/`fill_pit` /
FALLTHROUGH unchanged. Did not pull other Soundeffect sites.
Filled D-1221 archive/review hash `c7071a4a`. Rotated #1536–#1538.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1550** then D-1221
**44**/44; next audit @**#1555**).
**Verified:** private canary **33**/33; green+strict
seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007.
Public-unhit unless buried zomb/reviver `!cansee` within 5².
**Next:** Open `mhitm.c` `troll_baned` `mkcorpstat_norevive`
(named). Not gulpmm.
**Blocked:** none.
## 2026-08-18 18:10 — supervisor continues on suite FAIL

**Objective:** human — do not park the loop on green/full-suite
regression; next iter recovers (Must-fix / Open).
**Change:** `agent-port-loop.sh` warns and continues on post-iter
green and audit/cadence full-suite FAIL (no STOP, no revert).
Density / bans / protected / empty port / QUALITY-RISK-without-Must-fix
still halt. Launch preflight green still refuses a dirty start.
**Next:** restart the supervisor after this commit lands.
## 2026-08-18 18:00 — D-1221 gbuf_show_kind stop Hallu reroll

**Objective:** Must-fix review **181** — `display.c` `show_glyph` /
JS `gbuf_show_kind` must not re-call `mon_glyph`/`obj_glyph` on
every `show_glyph_cell`. Keep mention_map addr. seed0383.
**C locus:** `display.c` `show_glyph` 2011–2028; `glyphs.c`
`glyph_to_cmap`; `display.h` `glyph_is_monster`.
**Change:** classifier uses displayable-monster occupancy +
`M_AP_TYPE` mimic, cansee floor object, trap/terrain ch match.
No Hallu `rn2_on_display_rng`. Addr/`in_docrt` unchanged. Did
not pull integer glyphs / Soundeffect. Stamped review **181**
**Addressed:** D-1221 (hash next SHA). Open 9 after archive
(no refill). Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `38+0.31/turn` (R² 0.848).
seed0383 PASS. Next audit @**#1555**.
**Verified:** private canary **17**/17; green+strict
seed8000/0900; focused seed0383; cohort + full `sessions`.
**Next:** Open `do.c` `revive_corpse` `Soundeffect` se_scratching
(named). Not BURIED pit.
**Blocked:** none.
## 2026-08-18 13:05 — #1550 review D-1217–D-1220 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `cmd.c` `dolookaround` 1262–1368 / `getpos.c`
482–503 / `allmain.c` 845–848; `optlist.h` 140–142 /
`options.c` `optfn_boolean` 5286 / 5428–5440; `display.c`
`show_glyph` 2011–2070 / `docrt_flags` 1717–1772 /
`optlist.h` 427–428; `do.c` `revive_corpse` 2217–2241.
**Change:** reviews **179** ACCEPT-WITH-DEBT D-1217 (`dolookaround`
+ GLOC_INTERESTING; firstmatch is lookat clone), **180** ACCEPT
D-1218 (`a11y.accessiblemsg` addr + in-game loc zero), **181**
QUALITY-RISK D-1219 (`gbuf_show_kind` Hallu `mon_glyph`/`obj_glyph`
on every `show_glyph_cell`; mention_map addr kept), **182** ACCEPT
D-1220 (BURIED FALLTHROUGH live `impossible`). Filled D-1220
archive hash `b09b013d`. Must-fix prepend review **181** item 1.
Open 9 + Must-fix 1 = 10 (no refill). Rotated #1535. Rule #2: no fs.
**Score:** cadence **#1550** **43**/44 Scr **11353**/11405 RNG
**787315**/792838 (99.30%) speed `35+0.29/turn` (R² 0.849).
**Notable FAIL:** seed0383-wizard-hallucinate. Next audit @**#1555**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix `gbuf_show_kind` stop Hallu reroll. Keep
mention_map addr. Not Soundeffect.
**Blocked:** none.
