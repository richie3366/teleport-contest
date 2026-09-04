# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-04 — D-1819 mkmaze.c makemaz Bar-goal load_special (Thoth Amon / Heart of Ahriman)

**C locus:** `dat/Bar-goal.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_bar_goal` / `load_special_proto`.
**Change:** `load_bar_goal` from the lua body: solidfill + mazelevel map,
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` makemaz `soko2-2` from `dat/soko2-2.lua`.
## 2026-09-04 — D-1818 mkmaze.c makemaz Wiz-goal load_special (Dark One / Eye)

**C locus:** `dat/Wiz-goal.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_wiz_goal` / `load_special_proto`;
**Change:** `load_wiz_goal` from the lua body: solidfill + mazelevel map,
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` makemaz `Bar-goal` from `dat/Bar-goal.lua`.
## 2026-09-04 — strategy: hidden-score proxy + one-call iteration tools

**Objective:** human request — make the next iterations cheaper in
output tokens and more reliable, aimed at the held-out score (6/44,
43 % screens) rather than the saturated public 44.
**Built:** `scripts/hidden-proxy.mjs` (+ `lib/hidden-worker.mjs`,
`lib/c-index.mjs`): 278 C-recorded sessions (tail-mutants, fresh roles,
debug `^V` descents), replayed one process each, first divergence
attributed to a C function on both sides (recorder `@ fn(file:line)`
tags; JS draws tagged under `globalThis.__NH_RNG_TRACE`, stripped
before comparison). `brief.mjs <cfn>` = one-call orientation;
`verify.mjs --fn <cfn>` = one-call verification incl. corpus verify;
`finish-iteration.mjs --commit` = every generated doc from the one
D-log entry. No hooks or automatic blockers (removed at the human's
request).
**Measured at D-1817:** 157/265 PASS (59.2 %) excl. env-only rows;
RNG 98.28 %; owners: `process_menu_window` 21, `itemactions` 14,
`getobj` 7, `describe_decor` 5, level-content cliff `build_room` /
`selection_filter_percent` (53k RNG lost). Tours 3/26.
**Docs:** `HIDDEN-PROXY.md` (new), playbook §1/§2a/§4/§5/§11, runbook
§5B/E/G + §6, port/cadence/review prompts, `PORT-GAP-TOP30.md`
addendum, queue header. Human's `PORT-GAP-HELDOUT.md` + content-first
Open rows kept as primary.
**Next:** pop Open row 1 (`Wiz-goal`) with `brief.mjs`; audit iters
run `hidden-proxy score`.
## 2026-09-04 — D-1817 timeout.c Deaf single-field / wiz_intrinsic make_deaf

**Objective:** Must-fix fortress §2 — Match C `timeout.c` /
`wizcmds.c:1029` so `#wizintrinsic` does not paint `deafness [2]`.
**Dump:** T:97 `HDeaf=0` `uprops[DEAF]=2`; rottenfood T:94 duration 3;
D-1792 `sync_timeout_flats` froze TIMEOUT=2.
**C:** `HDeaf` ≡ `uprops[DEAF].intrinsic`; expiry `make_deaf(0,TRUE)`;
`wiz_intrinsic` DEAF → `make_deaf`.
**Fix:** `set_HDeaf` both fields; skip DEAF in sync; Unaware talk;
`#wizintrinsic` DEAF arm.
**Verify:** save-oracle skip (untagged); seed4500 RNG 108275 Screen
1814; green; wizard 2200/0383/0108 + strict; seed0030 hold; full
`sessions` **44/44**.
**Next:** Open `trap.c` `lava_effects`. Not drown.
## 2026-09-04 — D-1816 mhitu.c mattacku abort after done()


**Objective:** Must-fix fortress §1 — Match C `mhitu.c` `mattacku`
`:938–950` so NATTK stops when `done()` ended the game.
**C:** `done` longjmp; no `i=1`. **JS was:** `really_done` returned
and Maganasipi `rnd(21)` / `d(4,4)` / knockback + “hits again”.
**Fix:** `program_state.gameover` → `return 1` after the slot
`switch` (before bot / sleep `rn2(10)`). Wizard `savelife` does
not set `gameover`.
**Verify:** save-oracle skip (untagged); seed0030 RNG 105529/105529
Screen 1953/1953, `rng-diff --all-segments` OK, strict; green;
cohort 0004/0007/0012/1500/2200/0383 + strict.
**Next:** Must-fix seed4500 `deafness [2]`. Not `lava_effects`.
## 2026-09-04 — human: 42/44 is a fortress regression, not Open

**Objective:** diagnose 42/44 (loop stopped) and queue Must-fix.
**Report:** `docs/2026-09-04-fortress-regression-42-44.md`.
**seed0030** D-1795: 9/10 segs RNG-perfect; Beatrix/Maganasipi
seg3 JS +4 after `can_make_bones` = `mattacku` `i=1` because
`done()` returns (C longjmp). Concat gem-colors is an artifact.
**seed4500** D-1792 (D-1791 still PASS): 13 menus `deafness [2]`,
RNG full. **Next:** Must-fix `mattacku` gameover abort, then
HDeaf `[2]`. Not `lava_effects`.
## 2026-09-04 — D-1815 cmd.c getdir iflags.cmdassist

**Objective:** Must-fix review **775** — Match C `cmd.c` `getdir`
`:4098` `iflags.cmdassist`. Not confdir.
**C:** `getdir` `:4098` `if (help_requested || iflags.cmdassist)`;
optlist `&iflags.cmdassist` default On; Options/`O` writes iflags.
**JS was:** `game.flags?.cmdassist !== false` (Options never writes
`flags`; `!cmdassist` never skipped `help_dir`).
**Fix:** `game.iflags?.cmdassist !== false`. `?` still forces help.
**Verify:** save-oracle skip (untagged `cmd.c:getdir`); probe (`!cmdassist`
skips help with `flags=true` red herring; default On / `?` still help;
valid `h`); green + focused 5002/0002/0108/0102 + cohort 13/13 + strict.
**Next:** Open `trap.c` `lava_effects` remaining. Not drown.
## 2026-09-04 — audit overlay 775–783 + cadence 42/44

**Objective:** review JS SHAs since `3ff0752d` against pinned C;
cadence full `sessions` (no `js/` port).
**SHAs:** **775 QUALITY-RISK** D-1806 `getdir` `game.flags.cmdassist`
vs C `iflags.cmdassist` `:4098` — Must-fix prepended. **776–783 AWD**
(D-1807…D-1814). Named omits stay in the map (`bhito`, CLIPPING,
POSIX clearlocks, `move_into_trap`, drowning `done()` loop).
**Cadence:** 42/44 at `b596f337`; scr 10428/11405; RNG 727221/792838
(91.7%); `46+0.33/turn` (R² 0.84). seed0030 39912/105529 unchanged.
seed4500 1801/1814 is D-1792 leftover.
**Next:** Must-fix `cmd.c` `getdir` `:4098` `iflags.cmdassist`. Not
`confdir`. Not Open `lava_effects`.
## 2026-09-04 — D-1814 trap.c drown remaining crawl-out

**Objective:** Open `trap.c` `drown` remaining: rnd_nextto_goodpos /
emergency_disrobe / crawl-out. Not lava_effects.
**C:** `drown` `:5058`; `emergency_disrobe` `:4896`;
`rnd_nextto_goodpos` `:4944`; crawl `teleds` `:5154`; `reset_faint`
`:3353`.
**JS was:** stub disrobe always TRUE; thin `teleds_drown`; skipped
`unmul`/`reset_faint`/`mmove`/`Is_waterlevel`/`hliquid`.
**Fix:** C undroppable walk + live `teleds`; `reset_faint` in eat.js.
Named: Amphibious wade; teleport/steed; drowning `done()` loop.
**Verify:** save-oracle skip (untagged `trap.c:drown`); helper probe
(shuffle 8 draws, mmove 0 skip, usleep clear, undroppable/stealoid
vain crawl); green + cohort 7/7 + strict.
**Next:** Open `trap.c` `lava_effects` remaining: Fire_resistance /
Wwalking / inventory burn / sink-and-die. Not drown.
## 2026-09-04 — D-1813 trap.c untrap remaining disarm helpers

**Objective:** Open `trap.c` `untrap` remaining: disarm_holdingtrap /
disarm_landmine / disarm_shooting_trap / disarm_box /
help_monster_out. Not dotrap.
**C:** `untrap` `:5847` switch; `disarm_holdingtrap` `:5551`;
`disarm_landmine` `:5593`; `disarm_shooting_trap` `:5663`;
`disarm_box` `:5793`; `untrap_box` `:5820`; `help_monster_out`
`:5699`; `try_disarm` `:5440`; `untrap_prob` `:5287`;
`cnv_trap_obj` `:5340`; `try_lift` `:5676`.
**JS was:** seen floor trap + `can_reach_floor` returned 0; container
path skipped `untrap_box`.
**Fix:** wire those callees; export `cnv_trap_obj`. Named:
`disarm_squeaky_board`; adjacent-Whoops `move_into_trap`;
`stumble_on_door_mimic`.
**Verify:** save-oracle skip (untagged `trap.c:untrap`); helper probe
(bear/landmine/dart/arrow convert, empty pit 0, web deltrap, pit
rescue clears `mtrapped`); green + cohort 9/9 + strict.
**Next:** Open `trap.c` `drown` remaining: rnd_nextto_goodpos /
emergency_disrobe / crawl-out. Not lava_effects.
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
