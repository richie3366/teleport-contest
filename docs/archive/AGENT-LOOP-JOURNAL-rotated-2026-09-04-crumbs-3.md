# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-04 — D-1803 do_name.c x_monnam remaining + nextmbuf

**Objective:** Open `do_name.c` `x_monnam` saddle / ARTICLE_* /
M2_PNAME / Wizard article + nextmbuf. Not `mon_nam_too`.
**C:** `x_monnam` `:826–1032`; `nextmbuf` `:19`; wrappers
`l_monnam`/`some_mon_nam`/`noit_*`/`Some_Monnam`/`YMonnam`;
`hacklib.c` `lcase` `:89`; `objnam.c` `just_an` `:2108`;
`hack.h` EXACT_NAME 0x1F.
**JS was:** those arms named-omit; EXACT_NAME included
SUPPRESS_NAME; `Some_Monnam` clones skipped hallu `rn2(2)`.
**Fix:** remaining body + ring + `lcase` + `just_an` exceptions;
wrappers through `x_monnam`; clones rebound. Named: priestname.
**Verify:** save-oracle skip (untagged); probes (youmonst, saddle,
invis, Wizard/Medusa, unicorn `a`, mplayer rank/` the ` split,
mappear, AUGMENT_IT something); green + strict; cohort 9/9 +
ride 0103/0104 + hallu 0383.
**Next:** Open `invent.c` `getobj` in_doagain / prompt+filter.

## 2026-09-04 — D-1802 objnam.c xname_flags tshirt/apron/hawaiian/xcalled

**Objective:** Open `objnam.c` `xname_flags` `tshirt_text` /
`apron_text` / `hawaiian_motif` / `xcalled`. Not xname article arms.
**C:** `xcalled` `:557–572`; gameover `:971–996`; `read.c`
`tshirt_text` `:99` / `hawaiian_motif` `:189` / `apron_text` `:253` /
`erode_obj_text` `:88` / `candy_wrapper_text` `:295`.
**JS was:** inline `" called "` strings; those four NOT FOUND.
**Fix:** those in `js/objnam.js`; gameover suffix after pluralize in
`xname`/`doname`; `wipeout_text` late-bound (objnam→read/engrave TDZ).
attrib `ysimple_name` clone deleted. Named: article arms,
`armor_simple_name`, `find_artifact`, `hawaiian_design`/doread.
**Verify:** save-oracle skip (untagged); probes (slogan[0], gameover
Hawaiian motif, live no motif, o_id 0 skip); green + strict; cohort
7/7 + strict.
**Next:** Open `do_name.c` `x_monnam` saddle / ARTICLE_* / M2_PNAME /
Wizard article + nextmbuf.

## 2026-09-04 — D-1801 allmain.c moveloop_core per-turn callees

**Objective:** Open `allmain.c` `moveloop_core` per-turn callees
`do_storms` / `glibr` / `mkot_trap_warn` / `end_of_input`. Not
`nh_timeout`.
**C:** `timeout.c:1846` / `do_wear.c:2527` + `fingers_or_gloves:59` /
`artifact.c:2752` + `count_surround_traps:2707` / `cmd.c:5182` +
SAFERHANGUP `allmain.c:181` / `rhack:3638`.
**JS was:** those four NOT FOUND; EOT skipped them.
**Fix:** those in timeout/do_wear/artifact/cmd; `moveloop_core` C
order. `You_hear` export. Named: `buzz`/`dobuzz`, `amulet()`,
`intervene`.
**Verify:** save-oracle skip (untagged); silent probes (non-stormy no
RNG, stormy `rn2(8)` gate, mkot count 0, tutorial `end_of_input`);
green + strict; cohort 7/7 + strict.
**Next:** Open `objnam.c` `xname_flags` tshirt/apron/hawaiian/`xcalled`.

## 2026-09-04 — D-1800 hack.c test_move/domove_core remaining callees

**Objective:** Open `hack.c` `test_move` + `domove_core`:
`water_friction`, `avoid_running_into_trap_or_liquid`,
`domove_fight_ironbars`/`web`, `mention_walls`. Not lookaround.
**C:** `mkmaze.c:1688` / `hack.c:2364` / `:2443` / `:2493` / `:1995`
/ `:2020` / `:2585` / testdiag doorway.
**JS was:** those helpers NOT FOUND; F-bars fell through to
`fight_empty`; rush onto a seen trap kept walking; doorway/OOB
mention_walls silent.
**Fix:** those arms in `js/hack.js` + `js/cmd.js` `domove` C order.
`weapon_descr` export. Named: lookaround, air_turbulence, Known_wwalking,
autodig/`worm_cross`, `exercise_steed`.
**Verify:** save-oracle skip (untagged `hack.c:test_move`); probes
(avoid-run / dry turbulence / fight gates); green + strict; cohort 7/7.
**Next:** Open `allmain.c` `moveloop_core` per-turn callees. Not
`nh_timeout`.

## 2026-09-04 — D-1799 hack.c spoteffects remaining body

**Objective:** Open `hack.c` `spoteffects` recursion / lev timeout /
Warning ice `:3312–3462`. Not `dotrap`.
**C:** `hack.c:3311–3462`. 42 callers. Static `inspoteffects` /
spotloc / spotterrain / spottrap; `in_lava_effects`; lev `TIMEOUT==1`
`rn2(2)` incr vs `float_down`; Warning ice; `m_at` piercer/default
then `mnexto`.
**JS was:** dest-typ / pooleffects / sink / pickup+dotrap; **return**
on `in_steed_dismounting` so later arms never ran.
**Fix:** those arms in `js/pickup.js`; `incr_itimeout_HLevitation` +
invent `Blind` exports. Named: pooleffects leave-water, `failing_untrap`
writer, helm_simple_name clones.
**Verify:** save-oracle skip (untagged `hack.c:spoteffects`); green +
strict; cohort 7/7 + ride 0103/0104.
**Next:** Open `hack.c` `test_move` + `domove_core`. Not lookaround.

## 2026-09-04 — D-1798 monmove.c dochug remaining + wormhitu

**Objective:** Open `monmove.c` `dochug` remaining arms + `wormhitu`.
Not `m_move`.
**C:** `dochug` `:689–989` / `m_arrival` `:572` / `release_hero` `:361`
/ `leppie_stash` `:1153` / `worm.c` `wormhitu` `:343–362`.
**JS was:** those arms deferred; `wormhitu` NOT FOUND; `findgold`
nobj-only so invent[] always empty.
**Fix:** STRAT_ARRIVE, leppie_stash, release_hero, MS_BRIBE mux,
S_LEPRECHAUN findgold, isgd vanish, MOVED unstuck+helpless,
PHASE FOUR `quest_talk`, `wormhitu`. Named: `demon_talk`, `cuss`.
**Verify:** arrival/release/lep-rn2/wormhitu-skip probes; green +
strict; cohort 7/7. save-oracle skip (untagged `monmove.c:dochug` /
`worm.c:wormhitu`).
**Next:** Open `hack.c` `spoteffects` recursion / levitation timeout /
Warning ice. Not `dotrap`.
