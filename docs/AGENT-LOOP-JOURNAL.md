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

## 2026-08-16 18:22 — #1394 D-1096 dryup wizard y_n

**Objective:** Open queue — `fountain.c` `dryup` wizard yn (named).
Not angry_guards.
**C locus:** `fountain.c` `dryup` 216–219; `hack.h` `y_n`;
`flag.h` `wizard` ≡ `flags.debug`.
**Change:** after town warn, `isyou && wizard_mode()` →
`yn_function('Dry up fountain?', 'yn', 'n')`; `'n'` (and
quit→def) return without drying. No `debug_fuzzer` gate.
Did not pull `angry_guards` / cloud-glyph / Deaf shake.
Filled D-1095 hash `a86a7111`. Rotated #1379. Refilled Open
to 12 from fountain named omits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **15**/15 + strict 0014/0006/2200/0360. Path public-unhit.
**Next:** Open `mon.c` `kill_eggs` after genocide.
**Blocked:** none.

## 2026-08-16 18:12 — #1393 D-1095 split_mon rust/minliquid/uhitm AD_COLD

**Objective:** Open queue — `potion.c` `split_mon` trap rust /
`minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit
clone_mon.
**C locus:** `trap.c` rust 1652–1720; `mon.c` `minliquid_core`
987–992 / `healmon` 4596–4614; `uhitm.c` `passive` AD_COLD
6078–6082.
**Change:** rust hero+monster gremlin `split_mon`; minliquid
gremlin pool/fountain `rn2(3)` → split + `dryup` + pool
`water_damage_chain`; AD_COLD `healmon` then split on mhpmax
gate. Did not pull drown/mhitu/mhitm/cmd. Filled D-1094 hash
`46775b20`. Rotated #1378. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **6**/6; green+strict seed8000/0900;
cohort **15**/15 + strict 0014/0360/4500/2200. Path public-unhit.
**Next:** Open `fountain.c` `dryup` wizard yn.
**Blocked:** none.

## 2026-08-16 18:00 — #1392 D-1094 MS_NEMESIS mitem ptr.msound

**Objective:** Open queue — `makemon.c` `m_initweap` MS_NEMESIS
mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace.
**C locus:** `role.c` `role_init` 2027–2061; `makemon.c` mitem
1378; gender/leader_m_id `ptr->msound && quest_info`.
**Change:** `role_init_quest_pm_fixup` overlays live `mons[]`
msound/flags/maligntyp on `game.pm_fixup` (`resetGame` = fresh
C process). mitem / leader_m_id / gender use `ptr.msound`.
Did not pull PM_NINJA weap or `mon_learns_traps(ALL_TRAPS)`.
Stamped reviews **14**/**49**/**53**. Filled D-1093 hash
`e0b68f1d`. Rotated #1377. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **30**/30 (Tourist thief 37 hostile
Bell; reset 36; Rogue thief leader / assassin Bell; Arc
Carnarvon maligntyp 3); green+strict seed8000/0900; cohort
**20**/20 + strict 1800/0361/0367/0360/0014/2200/0004. Path
public-unhit (Tourist quest nemesis).
**Next:** Open `potion.c` `split_mon` trap rust / `minliquid` /
uhitm AD_COLD.
**Blocked:** none.

## 2026-08-16 17:42 — #1391 D-1093 dogmove pal/target numeric msound

**Objective:** Open queue — `dogmove.c` pal/target tests must
compare numeric `ptr.msound` not string `'MS_LEADER'` (named from
D-1053 review **14**).
**C locus:** `dogmove.c` `find_friends` 728–730 / `score_targ`
767–769 / `dog_move` 1124–1126; `monflag.h` MS_LEADER=36 /
MS_GUARDIAN=38.
**Change:** `dogmove.js` compares `(ptr.msound | 0) === MS_LEADER`
/ `MS_GUARDIAN`. Did not pull `perceives`, conf/`Is_qstart` score,
faith/AT_NONE/vampshifter, or melee `haseyes`/`mon_reflects`.
Stamped reviews **14**/**53**/**40**/**49**. Filled D-1092 hash on
review **49**. Rotated #1376. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **12**/12 + strict 1800/0004/0367/0360/0014/2200/0361.
Path public-unhit.
**Next:** Open `makemon.c` `m_initweap` MS_NEMESIS mitem
`ptr.msound` not `urole.neminum`.
**Blocked:** none.

## 2026-08-16 17:30 — #1390 review D-1089–D-1092 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `youprop.h` Antimagic 55–57 / `sit.c` `rndcurse`
576–593; `dbridge.c` `is_pool` 46–58 / `is_moat` 100–113;
`teleport.c` `goodpos` 134–175; `makemon.c` mlet 1335–1342 /
`you.h` `Race_if` / `mondata.h` `is_unicorn`.
**Change:** reviews **50** ACCEPT D-1089 (sit `Antimagic()`
uprops), **51** ACCEPT D-1090 (`is_pool`/`is_moat` UP+`DB_MOAT`),
**52** ACCEPT D-1091 (`goodpos` `is_pool()`/`is_lava()`),
**53** ACCEPT D-1092 (S_ORC/S_UNICORN mlet). Must-fix empty.
Filled D-1092 archive hash `c3f28bfd`. Inserted missing
D-1091 index row. Rotated #1375. Open 11 (no refill). Rule #2:
no fs.
**Score:** cadence **#1390** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1395**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dogmove.c` pal/target numeric `ptr.msound` not
`'MS_LEADER'`.
**Blocked:** none.

## 2026-08-16 17:20 — #1389 D-1092 makemon S_ORC/S_UNICORN mlet peace

**Objective:** Open queue — `makemon.c` S_ORC / S_ELF / unicorn
mlet peace override after `m_initweap` (named omit on makemon
row).
**C locus:** `makemon.c` `makemon` 1335–1342; `you.h` `Race_if`;
`mondata.h` `is_unicorn`. In the mlet switch **before**
`set_malign` / `m_initweap`. 5.0 has no `S_ELF` mlet.
**Change:** `S_ORC` + `Race_if(PM_ELF)` → hostile. `S_UNICORN` +
`is_unicorn` + co-align → always peaceful (pony/horse skip).
`peace_minded` still burns `rn2` first. Did not pull dprince
bribe / raven `BEC_DE_CORBIN` / emin roaming / `MM_ANGRY`.
Filled D-1091 hash `278521f1` (archive + review **38**). Rotated
#1374. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **22**/22 (incl. 0060/0004/0103/0399/
0360/4500/0014/2200) + strict 0014/0360/0399/0004/0060/4500/
2200/0367. Override public-unhit or already matching.
**Next:** Open `dogmove.c` pal/target numeric `ptr.msound` not
`'MS_LEADER'`. Audit @**#1390**.
**Blocked:** none.

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
