# Rotated from AGENT-LOOP-JOURNAL.md after D-1041 / #1307

## 2026-08-15 16:12 — #1297 D-1028 use_bell

**Objective:** map-driven apply cluster — C `use_bell`
(CURRENT BELL / BELL_OF_OPENING).
**C locus:** `apply.c` use_bell/doapply BELL; `detect.c`
openit/openone; `mkroom.c` mkundead/morguemon; `hack.c`
invocation_pos.
**Change:** doapply dispatch (res stays TIME); muffled; empty BofO
silent+learno; cursed nymph shatter/speed/nomul; charged swallow
openit / mkundead / invocation age / blessed unpunish+openit /
uncursed findit. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (muffled; empty inv known; cursed spe--
graveyard; openit box+door; doapply TIME). Path **unhit** by public
traces.
**Next:** apply.js use_figurine (FIGURINE).
**Blocked:** none.


## 2026-08-15 15:55 — #1296 D-1027 use_tinning_kit

**Objective:** map-driven apply cluster — C `use_tinning_kit`
(CURRENT TINNING_KIT).
**C locus:** `apply.c` use_tinning_kit/tinnable/doapply; `eat.c`
floorfood("tin",2)/tin_ok/set_tin_variety(HOMEMADE); `do.c`
revive_corpse invent/floor; `invent.c` getobj/useup/hold.
**Change:** doapply dispatch (res stays TIME); spe<=0; floor yn
tinnable (not feeding: usteed does not skip); tin_ok You_cant/
gold/silly; gloves instapetrify; rider War; homemade spe=-2;
shop verbalize; useup/useupf; hold. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (empty; homemade cursed copy; fog cmdq
no charge). Path **unhit** by public traces.
**Next:** apply.js use_bell (BELL / BELL_OF_OPENING).
**Blocked:** none.

## 2026-08-15 15:36 — #1295 D-1026 use_grease + cadence score

**Objective:** map-driven apply cluster — C `use_grease` (CURRENT
CAN_OF_GREASE) plus mandatory #1295 full `sessions` score.
**C locus:** `apply.c` use_grease/grease_ok/doapply; `do_wear.c`
inaccessible_equipment; `invent.c` getobj GETOBJ_PROMPT + hands;
`potion.c` make_glib.
**Change:** doapply dispatch; Glib/cursed|Fumbling slip dropx;
getobj `-` hands / coin exclude / covered EXCLUDE_INACCESS;
object greased + cursed rn1(6,10); hands rn1(11,5); empty
known/seem. Rule #2: no fs.
**Score:** full `sessions` **#1295** **44**/44 Scr **11405**/11405
RNG **100%** speed `30+0.26/turn` (R² 0.876).
**Verified:** green+strict PASS; suite **44**/44 (seed0105 Scr
**30**/30; seed0361 Scr **366**/366). Private node (empty;
hands glib; cover; cancel; gold; shirt ECMD_OK; Glib slip;
cmdq `-`). Path **unhit** by public traces.
**Next:** apply.js use_tinning_kit.
**Blocked:** none.

## 2026-08-15 15:25 — #1294 D-1025 use_candle/use_candelabrum

**Objective:** map-driven apply cluster — C `use_candle` /
`use_candelabrum` (CURRENT candle/candelabrum).
**C locus:** `apply.c` use_candelabrum/use_candle/doapply;
`hack.c` invocation_pos; `dungeon.c` Invocation_lev;
`stairs.c` On_stairs; `light.c` obj_merge_light_sources;
`mkobj.c` weight spe*tallow.
**Change:** doapply dispatch; snuff/light; attach y_n + split cap 7
+ useupall; non-inv (age+1)/2; invocation known; weight spe arm.
Rule #2: no fs.
**Score:** last full `sessions` still **#1290** 44/44 (cadence @#1295).
**Verified:** green+strict PASS; apply/doapply cohort **18**/18
(seed0105 Scr **30**/30; seed0361 Scr **366**/366). Private node
(empty/cursed/uw; spe7 25 turns; snuff; lamp fallback; attach;
split leftover; invocation 125 turns). Path **unhit** by public traces.
**Next:** apply.js use_grease.
**Blocked:** none.

## 2026-08-15 15:10 — #1293 D-1024 flip_through_book/flip_coin

**Objective:** map-driven apply cluster — C `flip_through_book` /
`flip_coin` (CURRENT flip book/coin).
**C locus:** `apply.c` flip_through_book/flip_coin/doapply oclass
dispatch (after WAND, before otyp switch).
**Change:** SPBOOK/COIN return; underwater book ECMD_OK; BoT
Deaf/Blind/You_hear; blank makeknown; fade min(spestudied,3);
coin slip split1+dropx else rn2(100)/rn2(2). Rule #2: no fs.
**Score:** last full `sessions` still **#1290** 44/44 (cadence @#1295).
**Verified:** green+strict PASS; apply/doapply cohort **18**/18
(seed0105 Scr **30**/30; seed0361 Scr **366**/366). Private node
(uw book ECMD_OK; blank known; hallu rn2(100); DEX rn2(2)/rn2(5);
uw stack split 9). Path **unhit** by public traces.
**Next:** apply.js use_candle / use_candelabrum.
**Blocked:** none.

## 2026-08-15 14:55 — #1292 D-1023 oil/use_trap/bagotricks

**Objective:** map-driven apply cluster — C `use_lamp` /
`light_cocktail` / `use_trap` / `bagotricks` (CURRENT oil / traps / BoT).
**C locus:** `apply.c` use_lamp/light_cocktail/use_trap/set_trap/
reset_trapset/doapply; `makemon.c` bagotricks; `do.c` goto_level.
**Change:** doapply dispatch; begin_burn/end_burn; POT_OIL split;
trapinfo occupation DEX/STR + riding FORCEBUNGLE; BoT spe-- + rn2(23)
makemon. goto_level reset_trapset. Rule #2: no fs.
**Score:** last full `sessions` still **#1290** 44/44 (cadence @#1295).
**Verified:** green+strict PASS; apply/lamp/ride cohort **18**/18
(seed0105 Scr **30**/30; seed0361 Scr **366**/366). Private node
(lamp on/empty; oil makeknown; lev no occ; floor time_needed;
empty BoT cknown; charged spe--). Path **unhit** by public traces.
**Next:** apply.js flip_through_book / flip_coin.
**Blocked:** none.

## 2026-08-15 14:35 — #1291 D-1022 whip/grapple/use_pole

**Objective:** map-driven apply cluster — C `use_whip` / `use_grapple`
/ `use_pole` (CURRENT whip/grapple/`use_pole`).
**C locus:** `apply.c` use_whip/use_pole/use_grapple/doapply;
`obj.h` is_pole; `uhitm.c` force_attack; `steed.c` kick_steed.
**Change:** doapply dispatch; wield+cmdq; whip getdir+confdir;
pole/grapple getpos; Snickersnee is_pole; could_pole_mon.
Rule #2: no fs.
**Score:** last full `sessions` still **#1290** 44/44 (cadence @#1295).
**Verified:** green+strict PASS; apply/combat/ride cohort **18**/18
(seed0361 Scr **366**/366). Private node (partisan/Snickersnee
is_pole; whip/hook not; could_pole_mon false). Path **unhit** by
public traces.
**Next:** apply.js oil / `use_trap` / BAG_OF_TRICKS.
**Blocked:** none.

## 2026-08-15 18:45 — #1305 D-1036 hatch_egg body + cadence score

**Objective:** map-driven timeout cluster — C `hatch_egg` /
`learn_egg_type` / `cry_sound`. Cadence full `sessions` @#1305.
**C locus:** `timeout.c` hatch_egg/learn_egg_type; `sounds.c`
cry_sound; `mkobj.c` run_timers; `mon.c` hideunder.
**Change:** port callback envelope (NON_PM, yours, silent,
get_obj_location, rnd(quan), geno skip, enexto+makemon, tamedog,
leftover re-arm, invent useup / floor obfree+hideunder). Leave
`run_timers` dropping HATCH_EGG — JS floor typed eggs spend hatch
RNG C does not. Rule #2: no fs.
**Score:** **#1305** full `sessions` **44**/44 Scr **11405**/11405
RNG **100%** speed `31+0.27/turn` (R² 0.875). Next @**#1310**.
**Verified:** green+strict PASS; seed0014/4500 PASS after unwire;
dispatch trial 42/44 (seed0014/4500 FAIL). Private hatch_egg
envelope. Path **unhit** while dispatch dropped.
**Next:** C vs JS egg where/timer parity, then wire HATCH_EGG;
remaining tut-1 des / nhcore disable.
**Blocked:** HATCH_EGG dispatch until egg where matches C.
