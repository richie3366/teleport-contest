# Rotated from AGENT-LOOP-JOURNAL.md (#1300–#1304, iter #1312)

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
