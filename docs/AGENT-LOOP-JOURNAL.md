# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-16 17:06 — #1388 D-1091 goodpos is_pool()/is_lava()

**Objective:** Open queue — `teleport.c` `goodpos` must call
`is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros
(named from D-1077 review **38**).
**C locus:** `teleport.c` `goodpos` 134–175; `dbridge.c`
`is_pool`/`is_lava`; `rm.h` `IS_POOL` range includes
DRAWBRIDGE_UP.
**Change:** `teleport.js` `goodpos` uses shared `hack.js`
`is_pool`/`is_lava`. UP+`DB_LAVA` takes the lava arm
(flyer/`likes_lava`), not the swimmer arm. Dropped JS-only
`!mtmp` pool/lava early-out. Stamped review **38** named omit
**Addressed:** D-1091. Filled D-1090 hash `43caa8ff`. Rotated
#1373. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **44**/44 (POOL/MOAT/WATER/lava;
UP+lava swimmer false / flyer·sala true; UP+moat swimmer true;
UP+ICE/FLOOR neither; ignore flags; null mtmp); green+strict
seed8000/0900; cohort **14**/14 (1500/1800/0060/0102/0700/
0017/0106/0107/4500/0014/0360/2200/0009/0367) + sit/liquid
strict. Path public-unhit for DRAWBRIDGE_UP lava placement.
**Next:** Open `makemon.c` S_ORC/S_ELF/unicorn mlet peace.
Audit @**#1390**.
**Blocked:** none.

## 2026-08-16 16:56 — #1387 D-1090 is_pool/is_moat DRAWBRIDGE_UP+DB_MOAT

**Objective:** Open queue — `dbridge.c` `is_pool` / `is_moat`
DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`.
**C locus:** `dbridge.c` `is_pool` 46–58 / `is_moat` 100–113;
`rm.h` `DB_MOAT=0` / `DB_UNDER=28`.
**Change:** shared `hack.js` `is_pool`/`is_moat` match C
(Juiblex MOAT is pool not moat). Deleted `mfndpos_is_pool`;
dig/zap import shared `is_moat`. Stamped review **38** named
omit **Addressed:** D-1090. Filled D-1089 hash `f91650c0`.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **41**/41 (POOL/MOAT/WATER;
UP+DB_MOAT ± dir; UP+LAVA/ICE/FLOOR false; DOWN false;
juiblex MOAT pool-not-moat / UP+MOAT neither); green+strict
seed8000/0900; cohort **13**/13 (1500/1800/0060/0102/0700/
0017/0106/0107/4500/0014/0360/2200/0009) + sit/liquid strict.
Path public-unhit for DRAWBRIDGE_UP moat.
**Next:** Open `teleport.c` `goodpos` `is_pool()`/`is_lava()`
not `IS_POOL`/`IS_LAVA`. Audit @**#1390**.
**Blocked:** none.

## 2026-08-16 16:50 — #1386 D-1089 rndcurse Antimagic via uprops

**Objective:** Must-fix from review **48** — `sit.c` `rndcurse`
`Antimagic()` via `uprops[ANTIMAGIC]` (invent.js `hero_Antimagic`
shape). Not `is_pool`. Not `update_inventory` / hcolor.
**C locus:** `youprop.h` Antimagic 55–57; `sit.c` `rndcurse`
581–593; confer `oc_oprop` ANTIMAGIC (cloak / gray DSM).
**Change:** sit `Antimagic()` ORs flats **and**
`uprops[ANTIMAGIC]` intrinsic/extrinsic. Did not rewrite
`confer_oc_oprop` or other `Antimagic()` clones. Stamped review
**48** **Addressed:** D-1089. Rotated #1372 to archive. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **21**/21 (`setworn` cloak W_ARMC
extrinsic, `EAntimagic` unset, 21 frames + `rnd(3)`; no-cloak 0
+ `rnd(6)`; gray DSM; cloak+Half `rnd(2)`; `HAntimagic`);
green+strict seed8000/0900; cohort **9**/9
(0106/0107/0108/4500/1500/1800/0017/0360/2200) + sit strict.
Path public-unhit for worn-cloak `rndcurse`.
**Next:** Open `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP +
`DB_MOAT`. Audit @**#1390**.
**Blocked:** none.

## 2026-08-16 16:40 — #1385 review D-1085–D-1088 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`dfe4f198` closed D-1081–D-1084) against
pinned C. Cadence full `sessions` in the same iter.
**C locus:** `youprop.h` Flying 247–255; `steal.c` `remove_worn_item`
213–290; `display.c` `shieldeff` 1110–1124; `makemon.c` `m_initweap`
263–327 / `quest_mon_represents_role` 11–13; `youprop.h` Antimagic
55–57.
**Change:** reviews **46** ACCEPT (D-1085 Flying uprops), **47**
ACCEPT-WITH-DEBT (D-1086 armor `*_off`), **48** QUALITY-RISK (D-1087
`shieldeff` body matches; sit `Antimagic()` misses
`uprops[ANTIMAGIC]`), **49** ACCEPT (D-1088 priest/guardian msound).
Must-fix prepend sit Antimagic. Filled D-1088 hash `049af16e`.
Rotated #1371 + cadence-policy crumb. No `js/` edits. Rule #2: no fs.
**Score:** cadence **#1385** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1390**.
**Verified:** C read of the four loci + `confer_oc_oprop` 261–288;
JS hunks grepped FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix sit `rndcurse` `Antimagic()` via uprops. Not
`is_pool`.
**Blocked:** none.

## 2026-08-16 16:25 — #1384 D-1088 m_initweap priest/guardian ptr.msound

**Objective:** Open queue — `makemon.c` `m_initweap` `ptr.msound`
for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not
peace_minded.
**C locus:** `makemon.c` `m_initweap` 263–327; `m_initinv` 721–727;
`quest_mon_represents_role` 11–13; `monflag.h` MS_PRIEST=41 /
MS_GUARDIAN=38.
**Change:** priest/guardian kits (and `m_initinv` priest) gate on
`ptr.msound`; `quest_mon_represents_role` uses LEADER/NEMESIS
msound not ldrnum/neminum. Did not pull PM_NINJA weap or
MS_NEMESIS mitem. Filled D-1087 hash `d5038ac7`. Rotated #1370
to archive. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary (synth HUMAN+MS_PRIEST mace; silent
chieftain no sword; Priest-role Twoflower mace); green+strict
seed8000/0900; cohort **16**/16 (incl. 0361/0367/0373 quest) +
strict 0367/0361/0373/0014/4500/0360/2200. Synth public-unhit.
**Next:** Open `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP +
`DB_MOAT`. Audit @**#1385**.
**Blocked:** none.

## 2026-08-16 16:05 — #1383 D-1087 rndcurse Antimagic shieldeff

**Objective:** Open queue — `sit.c` `rndcurse` `shieldeff` (named
omit). Not update_inventory / hcolor.
**C locus:** `sit.c` `rndcurse` (~581–583); `display.c` `shieldeff`
(~1109–1124); `decl.c` `shield_static`; `display.h` SHIELD_COUNT 21.
**Change:** `display.js` `shieldeff` matches C (sparkle opt_out On;
`cansee`; 21 ASCII S_ss1..4 + `flush_screen(1)` + `nh_delay_output`;
`newsym` restore). `rndcurse` awaits it on Antimagic. Did not pull
`update_inventory` / hcolor / other callers. Filled D-1086 hash
`89a97acc`. Rotated #1369 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 8/8 (21-frame `shield_static`; `!sparkle`
/ `!cansee` skip; `rndcurse` Antimagic 21 vs !Antimagic 0);
green+strict seed8000/0900; cohort **9**/9 (0106/0107/0108/4500/
1500/1800/0017/0360/2200) + sit strict.
**Next:** Open `makemon.c` `m_initweap` `ptr.msound` MS_GUARDIAN /
MS_PRIEST.
**Blocked:** none.

## 2026-08-16 15:32 — #1382 D-1086 steal.c remove_worn_item armor *_off

**Objective:** Open queue — `steal.c` `remove_worn_item` armor
`*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit
take_gold D-1049).
**C locus:** `steal.c` `remove_worn_item` (~213–290); `do_wear.c`
`Armor_off`/`Cloak_off`/`Boots_off`/`Gloves_off`/`Helmet_off`/
`Shield_off`/`Shirt_off`; `worn.c` `setnotworn`; `read.c` `unpunish`.
**Change:** steal.js export matches C dispatch (W_ARMOR `*_off`,
W_WEAPONS `*gone`, unchain → `unpunish`, leftover → `setnotworn`).
Exported `Armor_off`/`Shirt_off`. sit `take_gold` dynamic-imports
it. Filled D-1085 hash `3e1a74e8`. Rotated #1368 to archive.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 24/24 (fedora luck; DSM drain; five
other armor slots; stale quiver pointer-walk; live `*gone`/
`unweapon`; unpunish TRUE vs FALSE; take_gold quiver); green+strict
seed8000/0900; cohort **9**/9 (0106/0107/0108/4500/1500/1800/0017/
0360/2200) + sit strict.
**Next:** Open `sit.c` `rndcurse` `shieldeff`.
**Blocked:** none.

## 2026-08-16 15:20 — #1381 D-1085 can_reach_floor Flying via uprops

**Objective:** Must-fix — `engrave.c` `can_reach_floor` `Flying()`
via `uprops[FLYING]` (review **43**). Not steal.c `remove_worn_item`.
**C locus:** `youprop.h` Flying (~247–255); `engrave.c`
`can_reach_floor` (~206–207); `do_wear.c` Amulet_on flying
(~1056–1058).
**Change:** `Flying()` ORs H/E flats **and** `uprops[FLYING]`
intrinsic/extrinsic; keep steed `is_flyer`; keep `!BFlying` /
`prop.blocked` (eat.js shape, no sticky skip of blocked).
Worn amulet skips `check_pit`. Did not rewrite `confer_oc_oprop`.
Stamped review **43** **Addressed:** D-1085 (hash next SHA).
Rotated #1367 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 20/20 (confer amulet EFlying unset
skips pit; HFlying; unskilled rider still false; BFlying;
MZ_HUGE; shaft; swallow/ceiling before Flying); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0101/0103/
0360/2200/4500.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.

## 2026-08-16 15:05 — #1380 review D-1081–D-1084 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `eat.c` `cprefx` 831–849 / `do.c` `revive_corpse`
2111–2246; `engrave.c` `can_reach_floor` 203–211 / `youprop.h`
Flying / `mondata.h` `ceiling_hider`; `trap.c` teeter/shaft;
`sit.c` `throne_sit_effect` 48–61.
**Change:** reviews **42** ACCEPT D-1081, **43** QUALITY-RISK
D-1082 (`Flying()` misses `uprops[FLYING]` for amulet of flying),
**44** ACCEPT D-1083, **45** ACCEPT D-1084. Must-fix prepend
Flying uprops (copy `eat.js`). Filled D-1084 archive hash
`83a3ada5`. Rotated #1366 to archive. Rule #2: no fs.
**Score:** cadence **#1380** **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Next @**#1385**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the four loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Must-fix `engrave.c` `can_reach_floor` `Flying()` via
`uprops[FLYING]`. Not steal.c `remove_worn_item`.
**Blocked:** none.

## 2026-08-16 14:54 — #1379 D-1084 throne_sit_effect wizard getlin

**Objective:** Open queue — `sit.c` `throne_sit_effect` wizard getlin
"Throne sit effect (1..13)" (named). Not Analyze y_n.
**C locus:** `sit.c` `throne_sit_effect` (~48–61).
**Change:** after `rnd(13)`, `wizard && !iflags.debug_fuzzer`
getlin; ESC Never_mind return (turn still elapses); atoi 1..13
overrides; 0/empty/junk keep the roll. Did not retouch Analyze
`y_n` vanish. Filled D-1083 Addressed hash `e6167027`. Rotated
#1365 to archive. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (non-wizard/fuzzer skip; ESC gold+throne
kept + Never_mind; atoi 5 take_gold; atoi 13 pretzel; 0/empty keep
rnd); green+strict seed8000/0900; cohort **12**/12 + strict
1800/4500/2200.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.

## 2026-08-16 14:38 — #1378 D-1083 can_reach_floor check_pit teeter/shaft

**Objective:** Open queue — `engrave.c` `can_reach_floor(check_pit)`
teeter/shaft (named from D-1073). Not ceiling_hider.
**C locus:** `engrave.c` `can_reach_floor` (~209–211); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`.
**Change:** after Flying||MZ_HUGE, `check_pit && t_at &&
(uteetering || uescaped)` returns FALSE. In-pit / unseen still
reach. Did not pull invent/pickup `trap&&is_pit` callers or
`cant_reach_floor`. Filled D-1082 Addressed hash `453e759c`.
Rotated #1364 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary 16/16 (teeter/in-pit/unseen/shaft/
Flying/MZ_HUGE/swallow/Levitation); green+strict seed8000/0900;
cohort **14**/14 + strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `sit.c` `throne_sit_effect` wizard getlin.
**Blocked:** none.

## 2026-08-16 14:24 — #1377 D-1082 can_reach_floor ceiling_hider / MZ_HUGE

**Objective:** Open queue — `engrave.c` `can_reach_floor` ceiling_hider /
MZ_HUGE (named from D-1069/D-1071). Not check_pit.
**C locus:** `engrave.c` `can_reach_floor` (~203–207); `mondata.h`
`ceiling_hider`; `youprop.h` Flying; `monflag.h` `MZ_HUGE`.
**Change:** undetected ceiling hiders return FALSE (piercer/lurker;
trapper HIDE-only still reaches; large mimic S_MIMIC excluded).
Then `Flying() || msize >= MZ_HUGE` TRUE. Flying is youprop.h
`(H||E||steed is_flyer)&&!B`, not sticky `u.Flying`. Did not
pull check_pit. Filled D-1081 Addressed hash `cd5af20a`.
Rotated #1362/#1363 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (piercer/lurker/trapper/mimic/giant/
HFlying/steed-skill); green+strict seed8000/0900; cohort **20**/20
+ strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `engrave.c` `can_reach_floor(check_pit)` teeter/shaft.
**Blocked:** none.

## 2026-08-16 14:15 — #1376 D-1081 cprefx rider revive_corpse after lifesave

**Objective:** Open queue — `eat.c` `cprefx` `revive_corpse` after
rider lifesave (debt.md).
**C locus:** `eat.c` `cprefx` 831–849; `do.c` `revive_corpse`
2111–2246.
**Change:** after `done(DIED)`+`exercise`, revive CORPSE
`victual.piece` (tins skip) then `zero_victual`. Moved helper to
`do.js` (C home); floor Death/Pestilence/Famine suffixes.
Did not pull MINVENT/CONTAINED/BURIED / Adjmonnam. Filled no prior
missing Addressed hash. Rotated #1361 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (tin-skip/norevive keep; lizard zeros
victual; invent/uwep; rider `data.mndx`); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0361/4500/0360/2200.
**Next:** Open `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE.
**Blocked:** none.

## 2026-08-16 13:55 — #1375 review D-1078/D-1079/D-1080 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `makemon.c` `clone_mon` 837–943 / `potion.c`
`split_mon` 2899–2912; `makemon.c` `peace_minded` 2268–2308 /
`set_malign` 2321–2366; `shk.c` `deserted_shop` 723–747 /
`u_entered_shop` 751–917.
**Change:** reviews **39** ACCEPT D-1078, **40** ACCEPT D-1079,
**41** ACCEPT-WITH-DEBT D-1080 (youprop sticky / `in_rooms`
static-buf pointer named, not Must-fix). Filled D-1080 archive
hash `0a4a5df3`. Must-fix empty. Queue 11 Open (no refill).
Rotated #1360 to archive. Rule #2: no fs.
**Score:** cadence **#1375** **44**/44 Scr **11405**/11405 RNG
**100%** speed `32+0.27/turn` (R² 0.87). Next @**#1380**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the three loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave (debt.md).
**Blocked:** none.

## 2026-08-16 13:40 — #1374 D-1080 u_entered_shop deserted/angry/Invis/doorway

**Objective:** Open queue — `shk.c` `u_entered_shop` deserted /
angry / Invis / pickaxe doorway (named D-0307).
**C locus:** `shk.c` `deserted_shop` 723–747; `u_entered_shop`
751–917.
**Change:** Port deserted_shop + empty_shops latch; Invis /
angry/surcharge/robbed welcomes; pickaxe/mattock/steed/Fast
doorway extra `dochug`. `carrying()` walks `game.invent`. Did
not pull SetVoice / Soundeffect / Hallu shkname / `shk_move`
Fast+floor pickaxe. Filled D-1079 Addressed hash `d7d679c1`.
Rotated #1359 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary 17 cases; green+strict seed8000/0900;
cohort **41**/41 (incl. 0030/0116/0361/1150) + strict
0030/0116/0361/0014/4500/0360/2200. New arms public-unhit.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave. Audit @**#1375**.
**Blocked:** none.
