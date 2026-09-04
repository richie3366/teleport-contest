# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-04 — D-1807 pline.c vpline msgtype_type / execplinehandler / maybe_play_sound

**Objective:** Open `pline.c` `vpline` msgtype_type /
execplinehandler / maybe_play_sound. Not pline wrapper.
**C:** `vpline` `:247–278`; `msgtype_type` `:7796`;
`execplinehandler` `:640`; `maybe_play_sound` `:1658`.
**JS was:** Norep local `_prevmsg` check; no MSGTYPE table;
dead callees.
**Fix:** `options.js` msgtype list + `MSGTYPE=` parse;
`display.js` vpline gate + execplinehandler; Norep
`PLINE_NOREPEAT`; `dolook` hide_unhide; `maybe_play_sound`
export (USER_SOUNDS compiled out). Named: SOUND= soundmap;
UNIX msghandler fork; doset MSGTYPE menu.
**Verify:** save-oracle skip (untagged); msgtype probe;
green + strict; cohort 7/7 + strict.
**Next:** Open `sounds.c` `domonnoise` remaining: genus /
mon_is_gecko / doconsult / shk_chat / priest_talk. Not beg.
## 2026-09-04 — D-1806 cmd.c getdir help_dir / cmdassist / dxdy_moveok

**Objective:** Open `cmd.c` `getdir` help_dir / cmdassist /
strange-direction NEED_MORE / `dxdy_moveok`. Not `confdir`.
**C:** `getdir` `:3956–4119`; `help_dir` `:4168–4296`;
`dxdy_moveok` `:3901–3907`; `hack.h` `NODIAG`.
**JS was:** invalid keys silent-fail in shared `getdir`; help only
in `getdir_cmdassist` clone.
**Fix:** shared `lock.js` `getdir` → `help_dir` NHW_TEXT
(`show_text_pages` quitchars) + cmdassist / strange pline +
`dxdy_moveok`; `getdir_cmdassist` wraps; `doclose` /
`get_adjacent_loc` call `getdir`. No trailing `confdir`.
Named: mouse getpos; fuzzer; `cmd_from_func` keys; rhack
`dxdy_moveok`.
**Verify:** save-oracle skip (untagged); dxdy_moveok probe; focused
5002/0002/0108/0102; green + strict; cohort 10/10 + strict.
**Next:** Open `pline.c` `vpline` msgtype_type / execplinehandler /
maybe_play_sound. Not pline wrapper.
## 2026-09-04 — audit overlay 766–774 + cadence 42/44

**Objective:** review JS SHAs since `b14236d6` against pinned C;
cadence full `sessions` (no `js/` port).
**SHAs:** 766–774 all AWD (D-1797…D-1805). Review 764 Must-fix
closed by 766. No new Must-fix. Named omits stay in the map
(`buzz`, `priestname`, `display_pickinv`, getdir fuzzer).
**Cadence:** 42/44; scr 10428/11405; RNG 727221/792838 (91.7%);
`42+0.33/turn`. seed0030 39912/105529 unchanged. seed4500
1801/1814 is D-1792 leftover.
**Next:** Open `cmd.c` `getdir` help_dir / cmdassist / strange-dir
NEED_MORE / `dxdy_moveok`. Not `confdir`.
## 2026-09-04 — D-1805 cmd.c yn_function remaining + fuzzer RNG

**Objective:** Open `cmd.c` `yn_function` remaining body including
RNG arms. Not `getlin`.
**C:** `yn_function` `:5470–5583`; `flag.h` debug_fuzzer_states;
`hack.h` InputState `otherInp`. SND_SPEECH compiled out.
**JS was:** cmdq/menu/tty only; fuzzer `rn2` omitted; silent remap;
no `input_state`.
**Fix:** fuzzer USER_INPUT `rn2(20)`/`rn2(ln)`/ESC retry; mismatch
`impossible` unless `in_doagain && !wizard`; `input_state=otherInp`.
Named: SND_SPEECH; DUMPLOG_CORE; paniclog file; interned yn callers;
getdir fuzzer.
**Verify:** save-oracle skip (untagged); probes (canned no-rng, fuzzer
picks, ESC retry, doagain remap); green + strict; cohort 9/9 + strict.
**Next:** Open `cmd.c` `getdir` help_dir / cmdassist / strange-dir
NEED_MORE / `dxdy_moveok`. Not `confdir`.
## 2026-09-04 — D-1804 invent.c getobj in_doagain / prompt+filter

**Objective:** Open `invent.c` `getobj` in_doagain / prompt+filter
machinery. Not `display_pickinv`.
**C:** `getobj` `:1751–2089`; `hack.h` GETOBJ_EXCLUDE=-3…SUGGEST=2;
`sortloot` INVLET; `compactify` when suggested>5.
**JS was:** yn prompt during `in_doagain`; lets by `charCodeAt`;
GETOBJ ranks 0/1/2/3/4/5; silly_thing before REPEAT; `#adjust` clone.
**Fix:** signed ranks; `getobj_filter_prompt`; `getobj_readchar`;
REPEAT then silly then split; live `getobj` for `#adjust`.
Named: display_pickinv; getobj_* clones; readchar_core fuzzer/queue.
**Verify:** save-oracle skip (untagged); green + strict; cohort 7/7
(incl. eat-throw 1800, quaff-zap-read 2200) + strict lengths.
**Next:** Open `cmd.c` `yn_function` remaining including RNG arms.
Not `getlin`.
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
