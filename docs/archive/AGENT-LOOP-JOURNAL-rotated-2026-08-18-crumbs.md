# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
