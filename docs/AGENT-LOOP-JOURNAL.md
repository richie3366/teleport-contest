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

## 2026-08-15 20:50 — #1306 D-1040 pole glyph_at targeting

**Objective:** Must-fix D-1022 risk 3 — `glyph_is_poleable_at` /
`find_poleable_mon` follow C `glyph_at`, not live `m_at`.
**C locus:** `apply.c` find_poleable_mon / get_valid_polearm_position /
use_pole; `display.c` glyph_at; `display.h` glyph_is_monster/statue/
invisible.
**Change:** classify shown layer (monster glyph / I / statue glyph);
skip tame/peaceful only when `glyph_is_monster` && `m_at`; statue/
boulder hit = glyph_at && sobj_at. `map_object` tags statue/boulder
memory. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; apply/combat/display cohort **10**/10
(seed0361 Scr **366**/366; seed0399 Scr **532**/532). Private node
**12**/12 (hidden `m_at`; `I`; tame skip; peaceful `I`; statue not
autotarget). Path **unhit** by public traces.
**Next:** Must-fix pole `thitmonst` hit-vs-miss (D-1022 risk 4).
**Blocked:** none.

## 2026-08-15 20:30 — reviews bind + in-iter commit/push

**Objective:** user: reviews are not theater; catch up unpaid
`loop-2026-08-15` C-wrongs; restore agent `git commit` + `git push`
inside each loop iteration.
**C locus:** n/a (supervisor / prompts / queue / reviews).
**Change:** `LOOP-QUEUE.md` **Must-fix** (12 unpaid Keep’d C-wrongs;
pole targeting first). Disposition stamps on D-1022/1023/1033/1034/1036
(D-1037/1038/1039 **Addressed**). Review prompt: thorough + Actionable
→ Must-fix or supervisor halt. Cadence defers while Must-fix is open.
Agents commit+push; supervisor fail-closes and pushes if forgotten.
**Score:** unchanged (fortress after D-1039; cadence still #1305).
**Verified:** `bash -n` loop script.
**Next:** launch `AGENT_FORCE=1 ./scripts/agent-port-loop.sh` (#1306
review, then #1307 Must-fix pole targeting).
**Blocked:** none.

## 2026-08-15 20:20 — fail-closed unattended loop + LOOP-QUEUE

**Objective:** make the CLI loop safe to leave running (user request).
**C locus:** n/a (supervisor / prompts / queue).
**Change:** parse `__RESULTS_JSON__` (runner exits 0 on FAIL); revert+halt
on green/suite/density/protected/banned/empty-port; agents commit only,
supervisor pushes; review every 3; cadence every 5 score-only; work
picker is `docs/LOOP-QUEUE.md` (one item). First iter after launch is
**#1306 review**.
**Score:** unchanged (fortress after D-1039; cadence still #1305).
**Verified:** `bash -n` loop script; require-pass helper 2/2 and 1-fail.
**Next:** launch with `AGENT_FORCE=1 ./scripts/agent-port-loop.sh`.
**Blocked:** none.

## 2026-08-15 20:01 — D-1039 dosit trap-before-throne

**Objective:** Keep’d D-1033 C-wrong — `dosit` must test trap before
`IS_THRONE` so a trapped throne cell does not spend throne RNG.
**C locus:** `sit.c` `dosit` trap ~466 / `dotrap` VIASITTING ~503 /
`IS_THRONE` ~556; `trap.c` `dotrap`.
**Change:** `js/sit.js` already-trapped sit (beartrap/pit/web/lava/
infloor/buriedball) else sit-down/land + `dotrap(VIASITTING)` after
OBJ_AT, before throne. Water/sink/altar/… still named omit. Do not
re-stub D-1033/D-1034 throne switches.
**Score:** cadence still **#1305** **44**/44 Scr **11405**/11405 RNG
**100%** after D-1038; this iter green+cohort only (next full @**#1310**).
**Verified:** green+strict PASS; seed0106/0107/4500/0014/0360/2200 PASS.
**Next:** remaining tut-1 des (large-box / food / stairs / kelp /
`place_lregion` / tut_key) + nhcore callback disable.
**Blocked:** none.

## 2026-08-15 19:50 — D-1038 shared getdir + hurtle_step

**Objective:** Keep’d D-1022 C-wrongs — real `getdir`, not `getdir_whip`;
`hurtle` via `hurtle_step` not `teleds`.
**C locus:** `cmd.c` `getdir`; `dothrow.c` `hurtle` / `hurtle_step`;
`apply.c` `use_whip` / `use_grapple`.
**Change:** `lock.js` getdir cmdq DIR/KEY, `.`/`s`, `<>`, movecmd
walk/run/rush, optional numpad, `^R` retry. No trailing confdir (whip
already confdirs). Apply deletes getdir_whip/self_ok/fig. `dothrow.js`
hurtle: tug / typed trap-anchor / nomul(-range) / wall·mon stop /
u_on_newpos. Throw path still `getdir_cmdassist`. Docs/reviews
`loop-2026-08-15/` rewritten in English.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `34+0.29/turn` (R² 0.854). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; 44/44.
**Next:** `dosit` `else if (trap)` before IS_THRONE (D-1033), then tut-1.
**Blocked:** none.

## 2026-08-15 19:15 — D-1037 save_timers RANGE_LEVEL + hatch dispatch

**Objective:** map-driven egg where/timer parity then wire HATCH_EGG
(CURRENT after D-1036 dropped dispatch).
**C locus:** `timeout.c` save_timers/restore_timers/timer_is_local/
obj_is_local/mon_is_local; `invent.c` merged obj_stop_timers;
`zap.c` get_obj_location.
**Change:** peel RANGE_LEVEL timers into level_info on goto_level
leave; restore on getlev; merged stops absorbed timers; get_obj_location
no invent-default; carried is where==INVENT; run_timers → hatch_egg.
Dump: off-level shop/minefill eggs DROP on_fobj=0. Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `33+0.28/turn` (R² 0.869). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; seed0014/4500 PASS **with** dispatch
(was 42/44 without peel).
**Next:** remaining tut-1 des / nhcore disable.
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

