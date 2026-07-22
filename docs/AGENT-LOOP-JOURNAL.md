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
## 2026-07-22 04:00 — #1262 D-0992 flooreffects fire/altar/hot

**Objective:** map-driven — remaining flooreffects arms (CURRENT
next: fire_damage / altar / hot potion).
**C locus:** `do.c` flooreffects/doaltarobj/drop/dropx; `trap.c`
fire_damage/lava_damage.
**Changed:** port fire_damage + lava fallthrough; doaltarobj + dropx
wire + drop skip-verbose; hot ROOM/CORR potion shatter via breakobj;
export breakobj. Globby pudding_merge still deferred.
**Verification:** green+strict PASS; altar/throw cohort 20/21
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** globby merge; or sellobj/check_shop_obj; or barefoot/
tmp_at; or absent.md thin. Cadence @#1265.
## 2026-07-22 03:52 — #1261 D-0991 costly_gold/donate_gold

**Objective:** map-driven — costly_gold/donate_gold kick+addtobill
(CURRENT next cluster).
**C locus:** `shk.c` costly_gold/donate_gold; callers
`dokick.c` really_kick_object; `shk.c` addtobill.
**Changed:** port credit/debit/loan gold bill + donate refund;
wire kick-out, contained kick-land refund, addtobill coin/gltmp —
D-0991.
**Verified:** green+strict PASS; shop/kick cohort **11**/12
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** flooreffects fire/globby/altar; absent.md thin;
barefoot petrify / tmp_at; sellobj/check_shop_obj.
**Blocked:** none.
## 2026-07-22 03:45 — #1260 cadence + D-0990 hits_bars

**Objective:** mandatory full `sessions` @#1260; map-driven
`hits_bars`/`hit_bars` (CURRENT next cluster).
**C locus:** `mthrowu.c` hits_bars/hit_bars; `zap.c` bhit;
`dothrow.c` throwit; `trap.c` launch_obj.
**Changed:** port hits_bars/hit_bars + harmless_missile helper;
wire bhit/throwit/launch_obj point_blank arms — D-0990.
**Verified:** green+strict PASS; kick/throw cohort **7**/8
(seed0009 Scr 72/73 pre-existing); cadence **43**/44 Scr
11404/11405 RNG 100% speed `32+0.27/turn`. Rule #2: no fs.
**Next:** costly_gold/donate_gold; flooreffects fire/globby;
absent.md thin; barefoot petrify / tmp_at.
**Blocked:** none.
## 2026-07-22 03:40 — #1259 D-0989 Is_box + ghitm

**Objective:** map-driven — Is_box kick arms / ghitm (CURRENT next
cluster after D-0988).
**C locus:** `dokick.c` Is_box/`ghitm`/`container_impact_dmg`;
`trap.c` `chest_trap`; `lock.c` `breakchestlock`; `shk.c`
`make_angry_shk`.
**Changed:** impact shatter; lock break/lid + chest_trap; ghitm;
export breakchestlock/chest_trap; thin make_angry/happy_shk —
D-0989. Deferred: hits_bars; costly_gold; petrify; tmp_at.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing); seed0060 kick-search PASS. Rule #2: no fs.
**Next:** hits_bars/hit_bars; or flooreffects fire_damage/globby;
or absent.md thin (potion/scroll/vault).
**Blocked:** none.
