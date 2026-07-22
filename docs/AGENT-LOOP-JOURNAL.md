# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

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

## 2026-07-22 04:57 — #1269 D-0999 ParanoidBreakwand + closeup

**Objective:** map-driven — apply camera/ParanoidBreakwand cluster
(CURRENT next after D-0998).
**C locus:** `cmd.c` paranoid_ynq/query; `apply.c` do_break_wand /
do_blinding_ray; `mon.c` see_monster_closeup; `dog.c` makedog.
**Change:** getlin "yes" paranoid_ynq; wire Breakwand/Quit/Die/Bones;
camera photo + Tourist EXP closeup; makedog starting-pet seen_close —
D-0999.
**Verified:** green+strict PASS; startup/apply cohort **10**/11
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or ParanoidPray / see_nearby.
**Blocked:** none.
## 2026-07-22 04:49 — #1268 D-0998 dopay appease + debit

**Objective:** map-driven — dopay robbed/angry appease + debit cluster
(CURRENT next after D-0997).
**C locus:** `shk.c` dopay proceed (robbed settle, angry appease,
debit/loan/credit, pay/make_happy_shk/rouse).
**Change:** port peaceful non-resident robbed settle; !bill&&!debit
robbed/angry 1000-gold appease; debit before bill; hidden_gold stash
msgs — D-0998.
**Verified:** green+strict PASS; shop/shared cohort **11**/12
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or apply camera/ParanoidBreakwand.
**Blocked:** none.
## 2026-07-22 04:45 — #1267 D-0997 statue trap + Blind kick feel

**Objective:** map-driven — STATUE_TRAP activate / Blind feel cluster
(CURRENT next after D-0996).
**C locus:** `trap.c` animate_statue/activate_statue_trap/
trapeffect_statue_trap; `dokick.c` kick_dumb/ouch/door/really_kick;
`zap.c` break_statue; `detect.c` dosearch0.
**Change:** port animate_statue + activate_statue_trap; wire Blind
feel_location/feel_newsym/wake_nearto + kick STATUE_TRAP; break_statue
shatter-activate + historic guilt; dosearch0/dotrap; export
montraits/cant_revive — D-0997.
**Verified:** green+strict PASS; kick/search cohort **10**/10
(incl. seed0060). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or dopay appease; or apply camera.
**Blocked:** none.
## 2026-07-22 04:34 — #1266 D-0996 selftouch/minstapetrify

**Objective:** map-driven — selftouch/mselftouch/minstapetrify cluster
(CURRENT next after D-0995).
**C locus:** `trap.c` selftouch/mselftouch/minstapetrify; `mon.c`
mon_to_stone/vamp_stone/monstone + xkilled stoned; `weapon.c` mwepgone;
`newcham` forced-mdat.
**Change:** port selftouch family + monstone path; wire stair/sink/
music/float_down/glove-loss; xkilled honors context.stoned (D-0996).
**Verification:** green+strict PASS; cohort **15**/16 (seed0009
pre-existing). Rule #2 ok.
**Next:** absent.md thin (potion/scroll/vault); or dopay appease; or
STATUE_TRAP/Blind feel. Cadence @#1270.
## 2026-07-22 04:25 — #1265 cadence + D-0995 barefoot/tmp_at

**Objective:** cadence full `sessions` @#1265 + map-driven barefoot
petrify / bhit DISP_FLASH (CURRENT next).
**C locus:** `trap.c` instapetrify; `dokick.c` really_kick_object
barefoot; `zap.c` bhit DISP_FLASH/nh_delay_output/DISP_END.
**Change:** port instapetrify; wire barefoot kick poly/stone; bhit
flash trail (D-0995). Score refresh in CURRENT.
**Verification:** green+strict PASS; kick/throw cohort **11**/12
(seed0009 pre-existing). Full sessions **43**/44 Scr **11404**/11405
RNG **100%** speed `30+0.27/turn`. Rule #2 ok.
**Next:** absent.md thin (potion/scroll/vault); or dopay appease; or
selftouch/minstapetrify. Cadence @#1270.
## 2026-07-22 04:20 — #1264 D-0994 sellobj/check_shop_obj

**Objective:** map-driven — sellobj/check_shop_obj throw-land bill
(CURRENT next).
**C locus:** `shk.c` sellobj/sellobj_state/set_cost/contained_cost/
dropped_container/special_stock/shk_names_obj/money2u/pay; `shknam.c`
saleable/veggy_item; `dothrow.c` check_shop_obj; `do.c` dropz/dodrop.
**Change:** saleable+helpers; sellobj+check_shop_obj; wire drop/
throw/break; billable contained_*; pay→money2u (D-0994).
**Verification:** green+strict PASS; shop/throw cohort **11**/12
(seed0009 pre-existing). Rule #2 ok.
**Next:** barefoot petrify/tmp_at; or absent.md thin; or dopay
appease. Cadence full sessions @#1265.
## 2026-07-22 04:10 — #1263 D-0993 globby pudding_merge/obj_meld

**Objective:** map-driven — globby coalesce cluster (CURRENT next).
**C locus:** `mkobj.c` obj_nexto_xy/obj_absorb/obj_meld/
pudding_merge_message/Is_pudding; `do.c` flooreffects; `invent.c`
mergable/merged; `mon.c` make_corpse pudding.
**Change:** Is_pudding mksobj init + globby weight; absorb/meld/
nexto/message; thin shrink_glob; wire flooreffects + invent merged
+ make_corpse GLOB path (D-0993).
**Verification:** green+strict PASS; drop/throw cohort **20**/21
(seed0009 Scr 72/73 pre-existing). Rule #2 ok.
**Next:** sellobj/check_shop_obj; or barefoot petrify/tmp_at; or
absent.md thin. Cadence full sessions @#1265.
