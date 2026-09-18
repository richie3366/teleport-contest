# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-18 — D-2468 `pager.c` do_look whole-body port (clicklook + lootabc menu + supplemental lore)

**C locus:** `nethack-c/upstream/src/pager.c:1673–1963` (`do_look(mode, click_cc)`); static `suptext1` `:2233–2242`, `suptext2` `:2244–2251`, `do_supplemental_info` `:2255–2315`; callers `dowhatis` `:2324`, `doquickwhatis` `:2331`.
**JS:** `js/pager.js` (+208/−74: menu gating, supplemental block, clicklook + loop); new `scripts/do-look-clicklook.test.mjs` (headless clicklook pins: ECMD_OK, no input, verbose restore).
**Change:** `js/pager.js` only, in C order — `do_look(mode = 0, click_cc = null)` with `quick`/`clicklook` (`:1675–1676`); cmdq pop/`cmdq_clear()` (= CQ_CANNED default, js/cmd.js) with `have_cmdq` tracking the C `goto dowhatiscmd` (canned input still runs the switch in clicklook mode); clicklook-without-cmdq skips the switch, takes `cc` from `click_cc`, `sym = 0`, `from_screen = FALSE` (`:1802–1807`); `y`/`/` + `i` + `?` + m/M/o/O/t/T/e/E switch arms unchanged in order; `?` arm keeps the single-space guard then calls live `mungspaces` (getline.js, same edge); loop resets holders per round, asks getpos only `if (from_screen)` inside `if (from_screen || clicklook)`, always calls `do_screen_description(cc, from_screen || clicklook, sym, …)` (`:1917`), `pline(out_str)` literal for C `putmixed` (no putmixed export; single-arg pline has no % expansion — D-0330), DUMPLOG block omitted as retired (D-1776), `checkfile` gate gains `!clicklook` plus `do_supplemental_info(supplemental_name, supplemental_pm, ans == LOOK_VERBOSE)`; `while (from_screen && !quick && ans != LOOK_ONCE && !clicklook)`; verbose save/restore. New module-local `do_supplemental_info` (`:2255–2315`: `is_orc` + `BUFSZ-1` gate, `strstri` " of "/" the Fence", QBUFSZ-truncated `y_n` prompt, `suptext1` (`bp+4` gang) vs `suptext2`, `%s` substitution with `subs++ ? gang : fullname`, display via the same NHW_MENU helper checkfile uses). `whatis_menu_choice` now builds `/`+`i`+`?` plus the separator + m/M/o/O/t/T/e/E only when `!uswallow && !Hallucination`, maps `y`/`n`/`^`/`"`/`` ` ``/`|` only when lootabc is off.
**Verify:** `node scripts/verify.mjs --fn do_look` → PASS syntax (1 file: js/pager.js) · PASS rule2 · note hidden (0 blocked) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS. Plus `node --test scripts/do-look-clicklook.test.mjs` 2/2 pass.
**Named:** `create/start/add/end/select/destroy_nhwindow` windowing mechanism (JS paints the same entries/accelerators on the corner NHW_MENU path); `putmixed` (no JS export — single-arg pline on the message-window path, D-0330); `decode_mixed` (DUMPLOG-only, retired D-1776); `cmdq` free/`pick_list` free (GC).
**Next:** queue head after this ships per breadth phase.

## 2026-09-18 — D-2467 `mklev.c` mkinvokearea whole-body port (invocation area + stair)

**C locus:** `nethack-c/upstream/src/mklev.c:2410–2497` (`mkinvokearea`); static helpers `mkinvpos` `:2503–2598`, `mkinvk_check_wall` `:2603–2613`. Cites `mklev.c:2600` + `mkmaze.c:1060` are comments, not call sites; sole real caller `deadbook` (`spell.c:290`).
**JS:** `js/mklev.js` only (imports + ~190 lines after `pick_vibrasquare_location`); map section `docs/c-js-map/data.md` mklev/sp_lev lspo_map.
**Change:** `js/mklev.js` only — new `export async function mkinvokearea()` + module-local `mkinvpos`/`mkinvk_check_wall` in C order: shake pline + wall-count loop (`dist!=3` wider-than-high, skip-y-when-x-found, early stop on wallct) + crumble pline; utrap release (`TT_BURIEDBALL` → `buried_ball_to_punishment`, then `reset_utrap(false)`); center `mkinvpos(0)` + dist 1..6 rings with `flush_screen(1)` + `nh_delay_output`; `You` stairwell + local `mkstairs(ux,uy,0,null,false)` + `newsym` + `vision_full_recalc=1`. `mkinvpos`: maze-bounds clip (`maze_x_max/y_max`, `dist<5` → throw ≡ C `panic` when `!isok` else `await impossible`), deltrap, boulder fracture-or-drop (`make_rocks` unless dist 1/4/5), seenv/doormask/lit<6/waslit/horizontal + viz short-circuit, dist switch (1 fire-trap unless pool + tseen, 0/2/3/6 ROOM, 4/5 MOAT, default impossible), mimic wake + `mintrap(NO_TRAP_FLAGS)`/`minliquid`, unblock, newsym. `mkinvk_check_wall`: `!isok`→0, `IS_STWALL||IRONBARS`→1 (C asserts covered by guard).
**Verify:** `node scripts/verify.mjs --fn mkinvokearea` → PASS syntax (1 file: js/mklev.js) · PASS rule2 · note hidden (0 blocked) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** `display_nhwindow(WIN_MESSAGE, TRUE)` (no JS export; pline flushes); C `deadbook` caller (deferred, not live — no wire possible this commit).
**Next:** queue head after this ships per breadth phase.

## 2026-09-18 — Audit 0363023b..c08a88b9 (reviews 1417–1425: 9 ACCEPT) + cadence 44/44, proxy 495/540

All 9 JS-touching SHAs since review 1416 audited against pinned C;
every per-SHA hidden-proxy re-run matches its D-log (0 blocked at
baseline; mon_arrive 123/123 + gulpmu 9/9 RNG-tagged reach, rest smoke
24/24, 0 regressed). Notable verifications: 1420 confirmed the
docrt_flags uswallow `cls()` compensation against C `swallowed(first)`
plus both `^R` caller sites (`getpos.c:760`, `cmd.c:4014`); 1421 caught
and cleared a suspected dropped `burn_away_slime` (live at
`js/mhitu.js:2115`); 1422 verified all 4 async-converted `rloco` callers
await. No Must-fix (0 C-wrongs); Next cluster → queue-head mkinvokearea.
Refill skipped: `port-coverage --rows 12` output is entirely
parked-stale/live rows (newcham/getobj/checkfile/yn_function/getdir/
really_done/rloc_to_core/show_glyph/display_pickinv stale;
mon_arrive/make_blinded/domove_core shipped). Cadence: public 44/44
(Scr 11405/11405, RNG 792838/792838, `60+0.47/turn`), held-out 11/44
unchanged, corpus 495/540 (91.7%).

## 2026-09-18 — D-2466 `trap.c` sink_into_lava whole-body port (lava-trap sinking + moveloop wire)

**C locus:** `nethack-c/upstream/src/trap.c:6991–7034` (`sink_into_lava`); callers `allmain.c:424–425`, `trap.c:6966` (comment inside `lava_effects`, not a call site).
**JS:** `js/trap.js` (+62: import name + function), `js/allmain.js` (+7/−2: trap.js import, TT_LAVA const, guarded call).
**Change:** new `export async function sink_into_lava()` (`js/trap.js:6296`, placed after `lava_effects` in C file order) — whole body in C order: not-trapped no-op (polymorph flier-to-ceiling-hider case); not-on-lava `reset_utrap(FALSE)`; `!uinvulnerable` third-HP burn-down (`Math.trunc((uhp+2)/3)`, C int division) + `utrap -= 1<<8`; terminal `KILLED_BY` "molten lava" (file's `game.killer` guard pattern) + urgent death + `burn_away_slime` + `done(DISSOLVED)` + life-save `reset_utrap(TRUE)` + `safe_teleds(DRAG|TELEPORT)` unless `hero_Levitation()/hero_Flying()` (file-local youprop.h helpers, D-1070); else `!umoved` sink-deeper (`Slimed && rnd(10-1) >= (Slimed&TIMEOUT)` → pline + burn vs `Norep`) + `utrap += rnd(4)`. Slimed reads the `u.Slimed` flat — the same field `burn_away_slime` guards on. All 9 callees live (is_lava, reset_utrap, Fire_resistance file-local; rnd, urgent_pline/pline/Norep, safe_teleds, done on existing edges; `burn_away_slime` joins the existing trap.js→timeout.js static edge; allmain.js→trap.js static import verified with `imports.mjs --can` (ALREADY, no top-level TDZ read); `TT_LAVA` joins the allmain const.js edge).
**Verify:** `node scripts/verify.mjs --fn sink_into_lava` → PASS syntax (2 files: js/trap.js js/allmain.js) · PASS rule2 · note hidden (0 blocked) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** none new in this body (every callee live, every arm ported). The `else if (!u.umoved) pooleffects(FALSE)` arm at the moveloop site stays deferred with `under_water`/`under_ground` (pre-existing D-1000 name); wiring it would change every stationary turn's pool behavior and is its owner's row, not this function's.
**Next:** queue head after this ships per breadth phase.

## 2026-09-18 — D-2465 `eat.c` fpostfx whole-body port (all 7 food post-effects)

**C locus:** `nethack-c/upstream/src/eat.c:2510–2600` (`fpostfx`, staticfn); sole caller `done_eating` `:562–565`.
**JS:** `js/eat.js` only (+205/−49 with header consts/imports; one file).
**Change:** new module-local `async function fpostfx(otmp)` (`js/eat.js:1980`) in C order — `:2513–2516` wolfsbane `you_unwere(TRUE)` (moved verbatim); `:2517–2521` carrot `make_blinded(ucreamed)` unless swallowed-by-blinding-engulf (in-file `attacktype_fordmg` + local AT_ENGL/AD_BLND=11 per monattk.h `:21`/`:53`); `:2522–2528` cookie `outrumor` + `literate++` gated on !Blind with first-read `livelog_printf(LL_CONDUCT)`; `:2529–2559` jelly (moved verbatim: queen morph/gainstr/HP/`done`/heal_legs); `:2560–2575` petrifier-egg `make_stoned(5, killer "%s egg")` unless Stone-resistant, stone-golem-morphed, or already Stoned; `:2576–2581` eucalyptus `make_sick(SICK_ALL)`/`make_vomiting` when uncursed; `:2582–2599` cursed-apple Snow-White (dwarf+Hallu verbalize; Deaf/sound-off pline "You fall asleep."; else Soundeffect + canonical `You_hear`; `fall_asleep(-rn1(11,20))`). done_eating dispatches cpostfx/fpostfx per C `:562–565`. New edges: pline.js `livelog_printf`, sndprocs.js `Soundeffect`, generated seffects_data.js `se_sinister_laughter` (all imports.mjs SAFE); verbalize/You_hear/fall_asleep join the existing display.js/hack.js edges; SICK_ALL/LL_CONDUCT join the const.js edge. No DIAG/FORCE/seed logic; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn fpostfx` → PASS syntax (1 file: js/eat.js) · PASS rule2 · note hidden (0 blocked) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS; plus full `sessions` 44/44 PASS (run manually since eat.js is central).
**Named:** none new in this body. In-file `attacktype_fordmg` clone kept (cycle-avoidance per its doc; canonical `uhitm.js:529` not imported — no new edge); Deaf triple inlined from youprop.h `:125` (apply.js Deaf_hero is the same predicate + u.Deaf sticky but module-local there).
**Next:** queue head after this ships per breadth phase.

## 2026-09-18 — D-2464 `pline.c` verbalize whole-body port (PLINE_VERBALIZE flag + variadic format)

**C locus:** `nethack-c/upstream/src/pline.c:476–490` (`verbalize`); callees `You_buf` `:338–348`, `vpline` `:152–291`; flag read by SND_SPEECH `sound_speak` (`sounds.c:2201`) via the `SoundSpeak` macro (`sndprocs.h:240–246`).
**JS:** `js/display.js` only (const import + restart, one file).
**Change:** restart in C order — `gp.pline_flags |= PLINE_VERBALIZE` (`PLINE_VERBALIZE` joins the existing const.js import); quote-then-format (`"..."` wrap, then `%s/%d/%ld/%%` per the livelog_printf/impossible convention, only when args are present so the ~60 pre-formatted single-string callers are byte-identical); `await pline(tmp)` (the live vpline path); try/finally `&= ~PLINE_VERBALIZE` (C `:488` clears only that bit, unlike Norep's reset). `You_buf` shared-buffer growth named unneeded in JS (immutable strings).
**Verify:** `node scripts/verify.mjs --fn verbalize` → PASS syntax (1 file: js/display.js) · PASS rule2 · note hidden (0 blocked) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** `mail.c:342,373,418,434` (`md_rush` — no JS counterpart); `eat.c:2588` (inside `fpostfx`, its own Open coverage row); `nhlua.c:655` (lua binding, no JS lua); C `verbalize("")` would print `""` but JS keeps the file's empty no-op guard (no caller passes empty). No committed unit test: repo has no `tests/` harness; `verify --fn verbalize` (REACH + cohort + full 44) is the maintained check.
**Next:** queue head after this ships per breadth phase.
