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

## 2026-08-16 20:24 — #1404 D-1104 dryup angry_guards after real dryup

**Objective:** Open queue — `fountain.c` `dryup` `angry_guards`
after real dryup (named). Not wizard yn.
**C locus:** `fountain.c` `dryup` 236–237 after ROOM/`newsym`;
`mon.c` `angry_guards` (already D-0941).
**Change:** `isyou && in_town` → `angry_guards(false)` after the
real dry. Town-warn return and wizard `'n'` still skip it.
Did not pull Deaf shake/wave, cloud-glyph skip, or Excalibur
`angry_guards`. Filled D-1103 hash `130e7e21`. Rotated #1389.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **37**/37; green+strict seed8000/0900;
cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard
+ 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict
0014/0006/2200/0360/4500/0009. Public traces **unhit**.
**Next:** Open `fountain.c` `watchman_warn_fountain` Deaf
shake/wave. Not dryup yn. Audit @**#1405**.
**Blocked:** none.

## 2026-08-16 20:12 — #1403 D-1103 db_under_typ / waterbody_name SURFACE_AT

**Objective:** Open queue — `dbridge.c` `db_under_typ` /
`hack.c` `waterbody_name` SURFACE_AT (named from D-1077
review **38**). Not `goodpos`.
**C locus:** `dbridge.c` `db_under_typ` 116–128; `rm.h`
`SURFACE_AT`; `pager.c` `waterbody_name` 561–611;
`pickup.c` `describe_decor`.
**Change:** shared `hack.js` `db_under_typ` + `SURFACE_AT`.
`waterbody_name` uses SURFACE_AT. `pickup.js` `describe_decor`
drops the DRAWBRIDGE_UP-as-typ stub. Did not pull
`classify_terrain` / display glyphs / getpos typ-gate /
hideunder macros / `is_ice` shared. Stamped review **38**
item 4 (waterbody/`db_under_typ`) and **51** item 2.
Filled D-1102 hash `ebe1f041`. Rotated #1388. Open 10 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `fountain.c` `dryup` `angry_guards` after real
dryup. Not wizard yn.
**Blocked:** none.

## 2026-08-16 20:00 — #1402 D-1102 goodpos_onscary Elbereth/scare/altar-vamp

**Objective:** Open queue — `teleport.c` `goodpos_onscary` Elbereth /
SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`.
**C locus:** `teleport.c` `goodpos_onscary` 49–76; `engrave.c`
`sengr_at` strict; `mondata.h` unique_corpstat/haseyes;
`dungeon.c` In_hell hellish.
**Change:** fakemon scare approx. Local `engr_at`/`sengr_at`
(engrave.js cycle). Altar `S_VAMPIRE` only; scare before Inhell;
HEADSTONE/future time skip; minotaur/`!haseyes` Elbereth skip.
Did not pull live-mon `onscary`. Filled D-1101 hash `a7302142`.
Rotated #1387. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **48**/48; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `dbridge.c` `db_under_typ` / `hack.c`
`waterbody_name` SURFACE_AT. Not `goodpos`.
**Blocked:** none.

## 2026-08-16 19:48 — #1401 D-1101 goodpos GP_AVOID_MONPOS is_exclusion_zone

**Objective:** Open queue — `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone` (named). Not `onscary`.
**C locus:** `teleport.c` `goodpos` 180–182; `mkmaze.c`
`is_exclusion_zone` 317–331; `dungeon.h` `within_bounded_area` / `LR_*`.
**Change:** local `is_exclusion_zone` (mklev.js already imports
teleport.js — cycle). After boulder: `avoid_monpos &&
is_exclusion_zone(LR_MONGEN)` → false. TELE/UPTELE/DOWNTELE do
not reject mongen. Wallwalk/pool/lava still skip it. Did not
pull live-mon `onscary`. D-1100 hash already `305ad188`.
Rotated #1386. Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **57**/57; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos_onscary` Elbereth /
SCR_SCARE_MONSTER / altar-vampire. Not `is_pool`.
**Blocked:** none.

## 2026-08-16 19:37 — #1400 review D-1097–D-1100 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `kill_eggs` 5609–5677 / `timeout.c` `kill_egg`;
`read.c` `seffect_genocide` 1722–1738 / `do_class_genocide` 2638–2820
/ `mondata.c` `name_to_monclass` 1090–1176; `teleport.c` `goodpos`
136–164 / `youprop.h` swim–wwalk / `hack.c` `may_passwall` 932–936.
**Change:** reviews **58** ACCEPT D-1097 (`kill_egg` real), **59**
ACCEPT-WITH-DEBT D-1098 (wipe real; `'?'` `list_genocided` stub
named), **60** ACCEPT D-1099 (youprop youmonst pool/lava), **61**
ACCEPT D-1100 (form `passes_walls` + `may_passwall` clone). Must-fix
empty. Filled D-1100 archive hash `305ad188`. Rotated #1385. Open 8
(no refill). Rule #2: no fs.
**Score:** cadence **#1400** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1405**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone`. Not `onscary`.
**Blocked:** none.

## 2026-08-16 19:22 — #1399 D-1100 goodpos passes_walls + may_passwall

**Objective:** Open queue — `teleport.c` `goodpos` `passes_walls` +
`may_passwall` early-out (named). Not youmonst swim.
**C locus:** `teleport.c` `goodpos` 163–164; `hack.c`
`may_passwall` 931–936; `mondata.h` `passes_walls` ≡ M1_WALLWALK.
**Change:** local `may_passwall` (STWALL + `wall_info|flags`
W_NONPASSWALL). Early-out `passes_walls(mdat)` before amorphous/
accessible — form flag, not youprop Passes_walls. Pool/lava still
first. Did not pull `is_exclusion_zone`. Filled D-1099 hash
`a6934a3d`. Rotated #1384. Open 8 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **68**/68; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone`. Not `onscary`. Audit @**#1400**.
**Blocked:** none.

## 2026-08-16 19:16 — #1398 D-1099 goodpos youmonst swim/lev/fly/wwalk

**Objective:** Open queue — `teleport.c` `goodpos` youmonst
Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava
arms (named). Not `passes_walls`.
**C locus:** `teleport.c` `goodpos` 136–161; `youprop.h`
Swimming/Amphibious/Levitation/Flying/Wwalking/Fire_resistance.
**Change:** youmonst pool/lava arms use youprop clones (flats OR
uprops; Lev/Fly honor B*; no sticky `u.Levitation`/`u.Flying`).
Lava Fire+Wwalk+oerodeproof boots / Upolyd likes_lava. Monster
`is_swimmer`/`m_in_air` unchanged. Did not pull `passes_walls`.
Filled D-1098 hash `cdb72162`. Rotated #1383. Open 9 (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **52**/52; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` `passes_walls` +
`may_passwall` early-out. Not youmonst swim.
**Blocked:** none.

## 2026-08-16 19:06 — #1397 D-1098 seffects SCR_GENOCIDE

**Objective:** Open queue — `read.c` `seffects` SCR_GENOCIDE
(named from sit). Not kill_eggs.
**C locus:** `read.c` `seffect_genocide` ~1722–1738 /
`do_class_genocide` ~2638–2820; `mondata.c` `name_to_monclass`
~1090–1176. Confusion ≡ HConfusion.
**Change:** wire `seffects` + `doread` allowlist; blessed → class
getlin (`name_to_monclass` then `name_to_mon`); `G_GENOD|G_NOCORPSE`
+ `kill_genocided_monsters`; own role/race `uhp=-1` / Unchanging
poly `done(GENOCIDED)`. Uncursed uses existing `do_genocide`.
livelog / Hallu / POLY_REVERT / cham `newcham` / `update_inventory`
still named. Filled D-1097 hash `d1e7ae23`. Rotated #1382.
Open 10 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary 21/21 `name_to_monclass` + 8/8 seffects;
green+strict seed8000/0900; cohort **10**/10 (5006/0002/0106/0105/
1500/1800/0009/0361/0107/2200). Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` youmonst swim/lev/fly/wwalk
pool and lava arms. Not `passes_walls`.
**Blocked:** none.

## 2026-08-16 18:48 — #1396 D-1097 kill_eggs after genocide

**Objective:** Open queue — `mon.c` `kill_eggs` after genocide
(named from sit D-1034). Not seffects SCR_GENOCIDE.
**C locus:** `mon.c` `kill_eggs` 5607–5635 /
`kill_genocided_monsters` 5637–5677; `timeout.c` `kill_egg`;
`dead_species(..., TRUE)`.
**Change:** walk invent array + nobj lists; EGG → `dead_species`
→ `kill_egg`; else `Has_contents` recurse `cobj`. Call on every
live fmon minvent then invent/fobj/migrating/buried. No
`continue` past minvent on deferred `newcham`. TIN/CORPSE `#if 0`
not ported. Stamped D-1034 review **Addressed:** D-1097.
Rotated #1381. Open 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **24**/24; green+strict seed8000/0900;
cohort **15**/15 + strict 0106/0107/4500/0360. Path public-unhit.
**Next:** Open `read.c` `seffects` SCR_GENOCIDE. Not kill_eggs.
**Blocked:** none.

## 2026-08-16 18:30 — #1395 review D-1093–D-1096 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dogmove.c` pal/target 728–730 / 767–769 / 1124–1126;
`role.c` `role_init` 2027–2056 / `makemon.c` mitem 1378;
`trap.c` rust 1652–1720 / `mon.c` `minliquid` 987–992 /
`healmon` 4596–4614 / `uhitm.c` AD_COLD 6078–6082;
`fountain.c` `dryup` 216–219.
**Change:** reviews **54** ACCEPT-WITH-DEBT D-1093 (`score_targ`
−5000 still outside C’s conf wrap; named, not Must-fix),
**55** ACCEPT D-1094 (overlay + Bell `ptr.msound`),
**56** ACCEPT D-1095 (rust/`minliquid`/AD_COLD `split_mon`),
**57** ACCEPT D-1096 (wizard `y_n` after town warn). Must-fix
empty. Filled D-1096 archive hash `bd16c130`. Stamped review
**39** item 1 D-1095. Rotated #1380. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1395** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1400**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `mon.c` `kill_eggs` after genocide. Not seffects
SCR_GENOCIDE.
**Blocked:** none.

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
