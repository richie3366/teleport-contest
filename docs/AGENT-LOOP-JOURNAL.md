# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-04 — D-1812 end.c really_done remaining callees

**Objective:** Open `end.c` `really_done` remaining: fixup_death /
force_launch_placement / clearlocks / free_pickinv_cache /
timet_delta / clearpriests / paygd. Not DUMPLOG.
**C:** `really_done` `:1165`/`:1203`/`:1232`/`:1239–1244`/`:1378`;
`fixup_death` `:365`; `paygd` `:1204`; `clearpriests` `:918`;
`launch_drop_spot` `:3221`; `clearlocks` `:732`;
`free_pickinv_cache` `:3043`; `timet_delta` `:995`.
**JS was:** paybill then flush; those callees skipped.
**Fix:** wire them in C order; `launch_drop_spot` in `launch_obj`;
`newgame` `urealtime.start_timing`. Named: POSIX signals, `grddead`,
display_pickinv cache setter, insight/save/`#suspend`/`#shell`
`timet_delta` callers.
**Verify:** save-oracle skip (untagged); callee probe; green +
strict; cohort 8/8 + strict (incl. seed0006/0007 death).
**Next:** Open `trap.c` `untrap` remaining: disarm_holdingtrap /
disarm_landmine / disarm_shooting_trap / disarm_box /
help_monster_out. Not dotrap.
## 2026-09-04 — D-1811 muse.c use_misc poly / bag / you_aggravate

**Objective:** Open `muse.c` `use_misc` remaining: muse_newcham_mon /
mloot_container / poly / bag / you_aggravate. Not use_defensive.
**C:** `use_misc` `:2382`; `find_misc` `:2094`; `muse_newcham_mon`
`:2248`; `mloot_container` `:2263`; `you_aggravate` `:2630`.
**JS was:** gain-level / invis / whip / speed; other codes
`default: return 0`; `!m.misc` skipped POLY_TRAP.
**Fix:** find+use remaining arms; export `can_carry` /
`wearing_iron_shoes` / `unconscious` / `start_corpse_timeout`.
Named: cursed mbag FIXME, CLIPPING cliparound.
**Verify:** save-oracle skip (untagged); find_misc probe; bag
`use_misc` 33/80 took; green + strict; cohort 7/7 + strict.
**Next:** Open `end.c` `really_done` remaining: fixup_death /
force_launch_placement / clearlocks / free_pickinv_cache /
timet_delta / clearpriests / paygd. Not DUMPLOG.
## 2026-09-04 — D-1810 muse.c use_offensive ray wands / horns / tele+undead / earth

**Objective:** Open `muse.c` `use_offensive` remaining wand / horn /
scroll cases. Not use_defensive.
**C:** `use_offensive` `:1823`; `find_offensive` `:1420`;
`mplayhorn` `:194`; `buzz_force_miss` `:1814`; `mbhitm` tele/undead
`:1596`; `read.c` drop_boulder `:2293`/`:2340`; `zap.c` `buzz`.
**JS was:** striking + potion throw + camera; other codes
`default: return 0`.
**Fix:** find+use remaining arms; export `buzz` / `unturn_*`;
`m_seenres` is boolean (do not `!== 0`). Named: linedup_callback
floor-corpse, fhito_loc/bhito, destroy_drawbridge, SCR_FIRE #if 0.
**Verify:** save-oracle skip (untagged); find_offensive probe;
green + strict; cohort 7/7 + strict.
**Next:** Open `muse.c` `use_misc` remaining: muse_newcham_mon /
mloot_container / poly / bag / you_aggravate. Not use_defensive.
## 2026-09-04 — D-1809 muse.c use_defensive mreadmsg / reveal_trap / mon_escape / consume

**Objective:** Open `muse.c` `use_defensive` remaining: mreadmsg /
reveal_trap / mon_escape / mon_consume_unstone. Not use_offensive.
**C:** `use_defensive` `:795`; `mreadmsg` `:238`; `reveal_trap`
`:753`; `mon_escape` `:779`; `mon_consume_unstone` `:2905`;
`m_tele` `:383`; `find_defensive` `:439`.
**JS was:** healing invent only; other codes `default: return 2`.
**Fix:** helpers + lizard/stairs/traps/tele+create arms. Export
`locomotion` / `resists_acid`. Named: horn, bugle, wand
dig/tele/create/undead, `munstone`, `use_offensive` mreadmsg.
**Verify:** save-oracle skip (untagged); helper probe; green +
strict; cohort 7/7 + strict.
**Next:** Open `muse.c` `use_offensive` remaining wand / horn /
scroll cases. Not use_defensive.
## 2026-09-04 — D-1808 sounds.c domonnoise remaps + oracle/priest/shk talk

**Objective:** Open `sounds.c` `domonnoise` remaining: genus /
mon_is_gecko / doconsult / shk_chat / priest_talk. Not beg.
**C:** `domonnoise` `:678–1242` remaps `:697–715` + switch
ORACLE/PRIEST/LEADER|NEMESIS|GUARDIAN/SELL; `genus` `:469`;
`mon_is_gecko` `:658`; `doconsult` `:695`; `outoracle` `:638`;
`shk_chat` `:5520`; `priest_talk` `:557`; `bribe` `:360`.
**JS was:** silent check after remaps; no guardian/isshk/MOO/gecko;
MS_SELL/PRIEST/ORACLE empty; epilogue `ECMD_OK`.
**Fix:** silent before remaps; genus/isshk/MOO/gecko; `map_invisible`;
`doconsult`/`priest_talk`/`shk_chat`; NEMESIS/GUARDIAN `quest_chat`;
GEICO hallu; epilogue `ECMD_TIME`. Rule #2 `ORACLE_RECORDS` embed.
Named: other MS_*; `verbl_msg_mcan`; `night()` howl; save/rest
`oracle_loc`; `dog_hunger` beg caller.
**Verify:** save-oracle skip (untagged); green + strict; cohort 7/7
+ strict.
**Next:** Open `muse.c` `use_defensive` remaining: mreadmsg /
reveal_trap / mon_escape / mon_consume_unstone. Not use_offensive.
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
