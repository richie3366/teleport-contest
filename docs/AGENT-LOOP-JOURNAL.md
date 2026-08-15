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

## 2026-08-15 18:20 — #1304 D-1035 nhl_gamestate memcpy + init_uhunger

**Objective:** map-driven startup cluster — C `nhl_gamestate`
memcpy u/disco/mvitals/spl_book + `init_uhunger` (`startup.md`).
**C locus:** `nhlua.c` nhl_gamestate/free_tutorial; `eat.c`
init_uhunger; `do.c` tutorial/goto_level.
**Change:** snapshot you (skip gi worn ptrs) + disco/mvitals/spells
then memset spells; leave restores keeping uz/uz0, clears oc_uname,
init_uhunger ATEMP, free_tutorial. Rule #2: no fs.
**Score:** last full `sessions` still **#1300** 44/44 (cadence @#1305).
**Verified:** private node (memcpy/uz/uname/uwep/ATEMP); green+strict
PASS; cohort 8/8 (seed0009 Scr **73**/73; seed0106 **267**/267;
seed0361 **366**/366). Leave path **unhit** by public traces.
**Next:** remaining tut-1 des / nhcore disable, or debt.md / hatch_egg.
**Blocked:** none.

## 2026-08-15 17:56 — #1303 D-1034 ordinary throne_sit_effect 1–13

**Objective:** map-driven sit cluster — C ordinary `throne_sit_effect`
cases 1–13 (CURRENT after D-1033 Vlad special).
**C locus:** `sit.c` throne_sit_effect/take_gold; `read.c` do_genocide;
`mkroom.c` courtmon; `mon.c` kill_genocided_monsters.
**Change:** ordinary 1–13 (adjattrib/shock/heal/take_gold/luck-wish/
courtmon/genocide getlin/curse/see-invis mapping/aggravate-tele/
identify/pretzel); export courtmon; do_genocide REALLY+ONTHRONE;
spell cursed_book imports take_gold. Rule #2: no fs.
**Score:** last full `sessions` still **#1300** 44/44 (cadence @#1305).
**Verified:** green+strict PASS; cohort 9/9 (seed0106/0107/4500 `#sit`;
seed0105 Scr **30**/30; seed0361 **366**/366; seed0009 **73**/73;
seed1500/1800/0060). Path **unhit** by public traces.
**Next:** nhl_gamestate memcpy / `init_uhunger` (`startup.md`).
**Blocked:** none.

## 2026-08-15 17:35 — #1302 D-1033 special_throne_effect

**Objective:** map-driven sit cluster — C `special_throne_effect`
(CURRENT grease spray / `grease_ok` COIN skip).
**C locus:** `sit.c` special_throne_effect/throne_sit_effect/dosit
IS_THRONE; `exper.c` losexp; `read.c` seffects SPE_REMOVE_CURSE.
**Change:** Vlad 1–13 (wish+disintegrate, drain, grease invent
COIN skip + `make_glib(rn1(101,100))`, attrcurse, VS goto,
msummon×3, confused seffects, poly, acid, shuffle); dosit
IS_THRONE; ordinary 1–13 deferred. Rule #2: no fs.
**Score:** last full `sessions` still **#1300** 44/44 (cadence @#1305).
**Verified:** green+strict PASS; all **44**/44 (seed0106/0107/4500
`#sit`; seed0105 Scr **30**/30; seed0361 **366**/366; seed0009
**73**/73). Private node (gold skip / glib 100..200; Drain skip
vs ulevel--). Path **unhit** by public traces.
**Next:** ordinary throne_sit_effect cases 1–13.
**Blocked:** none.

## 2026-08-15 17:10 — #1301 D-1032 fig_transform timer

**Objective:** map-driven timeout cluster — C `fig_transform` /
`attach_fig_transform_timeout` (CURRENT next after D-1031).
**C locus:** `timeout.c` attach_fig_transform_timeout; `apply.c`
fig_transform; `mkobj.c` set_corpsenm/bless/curse/uncurse;
`invent.c` carry_obj_effects/freeinv_core; `steal.c` mpickobj.
**Change:** attach rnd(9000)+200; run_timers callback; bad loc
rnd(5000); make_familiar quietly + useup/extract; BUC/carry/drop
wires. Rule #2: no fs.
**Score:** last full `sessions` still **#1300** 44/44 (cadence @#1305).
**Verified:** green+strict PASS; apply/shared **37**/37 + remaining
**5**/5 (all 44); seed0009 Scr **73**/73; seed0105 **30**/30;
seed0361 **366**/366. Private node (attach/carry/bless/curse/freeinv/
bad-loc). Path **unhit** by public traces.
**Next:** sit.c special_throne_effect grease spray.
**Blocked:** none.

## 2026-08-15 16:53 — #1300 D-1031 hornoplenty + cadence score

**Objective:** map-driven apply cluster — C `hornoplenty`
(CURRENT HORN_OF_PLENTY) + cadence full `sessions`.
**C locus:** `mkobj.c` hornoplenty/fixup_oil; `apply.c` doapply
HORN_OF_PLENTY; `pickup.c` tipcontainer_checks bag/horn.
**Change:** doapply dispatch (res TIME); empty spe<1 nothing_happens
+ cknown; rn2(13) potion vs food; magic rnd_class skip sickness;
FOOD_RATION rn2(7) jelly; BUC copy; hold_another_object / tip
container or floor drop; floor tip BoT/horn loop. Rule #2: no fs.
**Score:** full `sessions` **#1300** **44**/44 Scr **11405**/11405
RNG **100%** speed `31+0.27/turn` (R² 0.867).
**Verified:** green+strict PASS; suite **44**/44 (seed0105 Scr
**30**/30; seed0361 Scr **366**/366; seed0009 Scr **73**/73).
Private node (empty no RNG; food/potion/jelly; cursed BUC; apply
hold). Path **unhit** by public traces.
**Next:** fig_transform / attach_fig_transform_timeout.
**Blocked:** none.

## 2026-08-15 16:41 — #1299 D-1030 use_unicorn_horn

**Objective:** map-driven apply cluster — C `use_unicorn_horn`
(CURRENT UNICORN_HORN).
**C locus:** `apply.c` use_unicorn_horn/doapply UNICORN_HORN;
`cmd.c` domonability unicorn; `rnd.c` shuffle_int_array;
`potion.c` make_*; `do.c` make_blinded.
**Change:** doapply dispatch (res TIME); cursed rn1(90,10)+rn2(13)/2
afflict; TimedTrouble collect/shuffle/rn2(d(2,blessed?4:2)) cure;
poly #monster null obj. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (no-trouble no RNG; cursed rn2(90)+rn2(13);
blessed d(2,4); two-trouble shuffle; I_SPECIAL skip; cream-only
blind skip). Path **unhit** by public traces.
**Next:** apply.js hornoplenty (HORN_OF_PLENTY).
**Blocked:** none.

## 2026-08-15 16:28 — #1298 D-1029 use_figurine

**Objective:** map-driven apply cluster — C `use_figurine`
(CURRENT FIGURINE).
**C locus:** `apply.c` use_figurine/figurine_location_checks/doapply
FIGURINE; `dog.c` make_familiar/pick_familiar_pm; `makemon.c`
MM_IGNOREWATER gpflags.
**Change:** doapply dispatch (res TIME/OK/CANCEL); swallow room;
getdir cmdq+self+vertical; loc TIME; You set/release/toss;
make_familiar extinct dust / shatter / BUC 80-10-10 / initedog;
stop FIG_TRANSFORM; useup. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (swallow; cancel; wall TIME; extinct
dust; blessed spawn+useup). Path **unhit** by public traces.
**Next:** apply.js use_unicorn_horn (UNICORN_HORN).
**Blocked:** none.

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

## 2026-08-15 14:10 — #1290 D-1021 use_royal_jelly

**Objective:** map-driven apply cluster — C `use_royal_jelly` (CURRENT
whip/grapple/jelly/`use_pole`). Cadence full `sessions` @#1290.
**C locus:** `apply.c` `use_royal_jelly`/`jelly_ok`/`dorub`/`doapply`;
`timeout.c` `kill_egg`.
**Change:** split+freeinv; GETOBJ_PROMPT egg; killer→queen; cursed
`kill_egg`; hatch timeout + blessed `spe=2`; obfree not delobj.
Rule #2: no fs.
**Score:** **#1290** full `sessions` **44**/44 Scr **11405**/11405
RNG **100%** speed `31+0.27/turn` (R² 0.876). Next @**#1295**.
**Verified:** green+strict PASS; apply/eat cohort **7**/7
(seed0009 Scr **73**/73). Private node (queen+timer; cursed hatch
stop; stack cancel quan-1). Path **unhit** by public traces.
**Next:** apply.js whip/grapple/`use_pole`.
**Blocked:** none.
