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

## 2026-07-22 06:42 — #1283 D-1012 in_trouble collapsing+minors

**Objective:** map-driven — pray in_trouble collapsing…cursed_blindfold
+ all minors (CURRENT next cluster).
**C locus:** `pray.c` in_trouble/fix_worst_trouble/stuck_in_wall/
worst_cursed_item/fix_curse_trouble; `do_wear.c` stuck_ring/unchanger;
`potion.c` make_deaf; `dig.c` buried_ball_to_freedom; `artifact.c`
confers_luck.
**Change:** port remaining majors + all minors + helpers — D-1012.
**Verified:** green+strict PASS; pray/shared cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or blindfold-as-tool /
containers; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-07-22 06:31 — #1282 D-1011 in_trouble majors

**Objective:** map-driven — pray in_trouble majors Stoned…Region
(CURRENT next cluster).
**C locus:** `pray.c` in_trouble/fix_worst_trouble; `potion.c`
make_sick; `region.c` region_danger/region_safety; `trap.c`
rescued_from_terrain/back_on_ground.
**Change:** port Stoned/Slimed/Strangled/Lava/Sick/Starving/Region
checks + fix arms; export make_sick; region danger/safety; thin
lava-rescue terrain feedback — D-1011.
**Verified:** green+strict PASS; pray/shared cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or collapsing…
cursed_blindfold + minors; or blindfold-as-tool / containers.
**Blocked:** none.

## 2026-07-22 04:22 — #1281 D-1010 use_crystal_ball

**Objective:** map-driven — apply CRYSTAL_BALL / detect
`use_crystal_ball` (CURRENT next cluster).
**C locus:** `detect.c` use_crystal_ball/level_distance + thin
object_detect/trap_detect/furniture_detect; `drawing.c` def_char_*;
`apply.c`/`artifact.c` wire.
**Change:** port Blind/fail/hallu/uncharged/charged detect envelopes;
wire doapply + arti_invoke — D-1010.
**Verified:** green+strict PASS; apply/detect cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or blindfold-as-tool / containers.
**Blocked:** none.

## 2026-07-22 06:12 — #1280 cadence + D-1009 use_towel

**Objective:** cadence full `sessions` @#1280 + map-driven towel
cluster (CURRENT next apply tools).
**C locus:** `apply.c` use_towel; `weapon.c` wet/dry_a_towel /
finish_towel_change / is_wet_towel; `trap.c` burnarmor wet-towel dry.
**Change:** port use_towel + shared wet/dry helpers; wire doapply
TOWEL; burnarmor dry path (D-1009). Score refresh in CURRENT.
**Verified:** green+strict PASS; apply/trap cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Full sessions **43**/44 Scr
**11404**/11405 RNG **100%** speed `30+0.26/turn`. Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or crystal ball.
**Blocked:** none.

## 2026-07-22 06:04 — #1279 D-1008 use_saddle

**Objective:** map-driven — `use_saddle` apply SADDLE (CURRENT next
cluster after whistle).
**C locus:** `steed.c` use_saddle/can_saddle; `apply.c` doapply SADDLE.
**Change:** port use_saddle chance envelope + petrify/special gates;
tighten can_saddle whirly/unsolid; wire doapply — D-1008.
**Verified:** green+strict PASS; apply/steed cohort **15**/16
(seed0009 Scr 72/73 pre-existing; seed0103/0104 ride PASS). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or crystal ball / towel.
**Blocked:** none.

## 2026-07-22 05:57 — #1278 D-1007 apply whistle

**Objective:** map-driven — TIN/MAGIC whistle + eucalyptus (CURRENT
next cluster saddle/whistle).
**C locus:** `apply.c` use_whistle/use_magic_whistle/magic_whistled;
`mondata.c` can_blow; `mon.c` wake_nearby petcall; `vault.c`
vault_summon_gd; `teleport.c` tele_to_rnd_pet.
**Change:** port whistle apply envelope + helpers; wire doapply —
D-1007.
**Verified:** green+strict PASS; apply/pet cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or use_saddle.
**Blocked:** none.

## 2026-07-22 05:49 — #1277 D-1006 mon_poly mon-defender

**Objective:** map-driven — mon_poly monster-defender + newcham
null-mdat (CURRENT next cluster).
**C locus:** `mhitm.c` mon_poly; `uhitm.c` mhitm_ad_poly; `mon.c`
newcham; `makemon.c` mbirth_limit; resists_magm / resist WAND_CLASS.
**Change:** port mon-defender resists/resist/shock/newcham/tele +
mspec_used; wire mdamagem AD_POLY; allow newcham(null) for ordinary
non-cham + Nazgul/Erinys mbirth_limit — D-1006.
**Verified:** green+strict PASS; poly/combat cohort **15**/16
(seed0009 Scr 72/73 pre-existing; seed0398 wandpoly PASS). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or saddle/whistle.
**Blocked:** none.

## 2026-07-22 05:45 — #1276 D-1005 leash cluster

**Objective:** map-driven — `next_to_u`/`check_leash` + `use_leash`
envelope (CURRENT next cluster).
**C locus:** `apply.c` leash helpers/`use_leash`/`next_to_u`/
`check_leash`; `wizard.c` `mon_has_amulet`; `sounds.c` `whimper`;
callers allmain/hack/do/dig/trap/teleport/dog.
**Change:** port leash attach/detach + stretch/choke/snap; wire
doapply LEASH + domove/stairs/tele/dig/fall_through/`teleport_pet`/
wary_dog/abuse_dog — D-1005.
**Verified:** green+strict PASS; apply/move/pet cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or mon_poly mon arm;
or saddle/whistle.
**Blocked:** none.

## 2026-07-22 05:30 — #1275 cadence + D-1004 lycan wires

**Objective:** cadence full `sessions` @#1275 + map-driven lycanthropy
you_were wires (pray/potion/mhitm).
**C locus:** `pray.c` TROUBLE_LYCANTHROPE; `potion.c` peffect_water +
potionbreathe POT_WATER; `mhitm.c` mon_poly youmonst; `uhitm.c`
mhitm_ad_poly; `mondata.c` mon_hates_blessings.
**Change:** wire TROUBLE_LYCANTHROPE → you_unwere; peffect_water + vapor;
mon_poly hero + mhitu AD_POLY — D-1004.
**Verified:** green+strict PASS; pray/potion/combat cohort **16**/17
(seed0009 Scr 72/73 pre-existing). Cadence **43**/44 Scr **11404**/11405
RNG **100%** speed `31+0.27/turn`. Rule #2: no fs.
**Next:** next_to_u/check_leash; or absent.md thin; or mon_poly mon arm.
**Blocked:** none.

## 2026-07-22 05:22 — #1274 D-1003 warnreveal/overexert/eel

**Objective:** map-driven — warnreveal + overexert_hp + Upolyd eel
regen_hp (CURRENT next after D-1002).
**C locus:** `detect.c` warnreveal; `hack.c` overexert_hp/overexertion;
`allmain.c` regen_hp S_EEL + moveloop encumber/Warning wires.
**Change:** warnreveal→mfind0 via_warning; overexert_hp + melee HVY
+ encumber-move; eel out-of-water rn2(mh)/rn2(8) — D-1003.
**Verified:** green+strict PASS; allmain cohort **36**/37
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (potion/scroll/vault); or potion/mhitm
you_were wires; or next_to_u/check_leash.
**Blocked:** none.

## 2026-07-22 05:17 — #1273 D-1002 allmain Tele/Poly/ulycn

**Objective:** map-driven — allmain Teleportation/Polymorph/ulycn
once-per-turn (CURRENT next after D-1001).
**C locus:** `allmain.c` moveloop after `regen_pw` (!uinvulnerable).
**Change:** `maybe_tele_poly_were` + static `mvl_change`; tele /
polyself(POLY_NOFLAGS) / you_were; prop helpers — D-1002.
**Verified:** green+strict PASS; allmain cohort **36**/37
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (potion/scroll/vault); or warnreveal /
overexert_hp / Upolyd eel; or potion/mhitm you_were wires.
**Blocked:** none.

## 2026-07-22 05:10 — #1272 D-1001 ParanoidWerechange/Hit

**Objective:** map-driven — ParanoidWerechange + ParanoidHit getlin
(CURRENT next after D-1000).
**C locus:** `were.c` you_were/you_unwere; `uhitm.c` attack_checks;
`timeout.c` mtimedone; `eat.c` fpostfx wolfsbane; `flag.h` confirm.
**Change:** you_were/you_unwere + ParanoidWerechange; peaceful
confirm ParanoidHit + Stormbringer override; mtimedone wire;
wolfsbane purify; confirm default On — D-1001.
**Verified:** green+strict PASS; combat/timeout cohort **11**/12
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (potion/scroll/vault); or allmain
Teleportation/Polymorph/ulycn once-per-turn.
**Blocked:** none.

## 2026-07-22 05:05 — #1271 D-1000 ParanoidPray + see_nearby

**Objective:** map-driven — ParanoidPray Confirm + see_nearby_monsters
(CURRENT next after D-0999).
**C locus:** `pray.c` dopray; `cmd.c` paranoid_query; `mon.c`
see_nearby_monsters; `allmain.c` time-passed.
**Change:** dopray → paranoid_query(ParanoidConfirm); port adjacent
closeup loop; wire allmain after seer_turn — D-1000.
**Verified:** green+strict PASS; pray/allmain cohort **10**/11
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or ParanoidWerechange/Hit.
**Blocked:** none.

## 2026-07-22 05:00 — #1270 cadence full sessions score

**Objective:** mandatory cadence full `sessions` @#1270 (divisible by 5).
**C locus:** n/a (score refresh; no port delta).
**Change:** green gate + strict PASS; full suite score → CURRENT/NOTES.
Rotated #1256/#1255 crumbs to archive.
**Verified:** cadence **43**/44 Scr **11404**/11405 RNG **100%**
speed `30+0.27/turn` (seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or ParanoidPray / see_nearby.
**Blocked:** none.
