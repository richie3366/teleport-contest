# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-20 — D-4175 vault.c clear_fcorr tests each fake-corridor square with `m_at(fcx, fcy)` (`:80`), which is `level.monsters[x][y]` with no DEADMONSTER check. At game end, paygd → mongone zeroes the guard's mhp (mon.c `:3272`) and calls grddead while he still stands in his corridor. clear_fcorr therefore finds him and returns FALSE, and grddead takes its relobj + parkguard arm: his armor drops on his square, then the corridor is cleared. JS's clear_fcorr scanned fmon for a live (`mhp > 0`) monster, missed the guard, and disposed the corridor at once. No drop happened, and mongone's mdrop_special_objs walked his six items (six extra rn2(100)) (1 corpus session → FULL PASS)

**C locus:** vault.c clear_fcorr `:74–87`, grddead `:174–189`, paygd `:1206–1250`; mon.c mongone `:3267–3283`; rm.h `m_at` `:516` (no mburied/DEADMONSTER filter).
**JS:** js/vault.js clear_fcorr.
**Change:** `monThere = m_at(fcx, fcy) || (grd placed at fc and not MON_OFFMAP ? grd : null)`. This models the one C window where a zero-mhp monster (mongone's guard) is still on the grid; it uses the existing vault.js `m_at` import and adds MON_OFFMAP to the const import.
**Verify:** - `score --ids` on the 56 failing rows vs committed board → **678/734** (+1: scen-sweep-Tourist-610081 1740 → 1752/1752 FULL PASS; no other row moved, no regression).
**Named:** JS m_at/level_mon_at keep their `mhp <= 0` skip; other C m_at readers inside the mongone → grddead window (none found in clear_fcorr's callees) would need the same grd test.
**Next:** cliffs head (re-rank): dosounds, setmnotwielded; scen-worldtour-Valkyrie-49955041 s543 (D-4173 Next).

## 2026-10-20 — D-4174 vision.c vision_recalc's lit-wall arm (`:758–785`) admits a lit door/wall/SDOOR that blocks sight only when the square in front of it, toward the hero, is lit; otherwise it does `goto not_in_sight` (`:784`), which newsyms a spot that was in sight (`:821–836`). JS's port had no else there, so a wall leaving sight that way was never repainted: a ghost (S_ghost is a blank) standing in the wall stayed drawn after the hero stepped into the dark corridor, where C shows the remembered `│` (1 corpus session → FULL PASS)

**C locus:** vision.c vision_recalc main loop `:740–838` (lit-wall arm `:758–785`, not_in_sight `:821–836`).
**JS:** js/vision.js vision_recalc.
**Change:** the not_in_sight body is a per-row local `not_in_sight(col, nv, ov)`, called from the final else and from the new else of the lit-wall test (C's goto). Same condition, same `col != 0` guard.
**Verify:** - `score --ids` on the 58 failing rows vs committed board → **677/734** (+1: scen-chain-Healer-50950082 661 → 1086/1086 FULL PASS; no other row moved, no regression).
**Named:** none in the changed arm.
**Next:** cliffs head (re-rank); scen-worldtour-Valkyrie-49955041 s543 (ring impossible() path, D-4173 Next) is still on the do_statusline2 row.

## 2026-10-20 — D-4173 attrib.c exercise ends with `if (moves > 0 && (i == A_STR || i == A_CON)) encumber_msg();` (`:516–517`), and that pline can block at a --More-- for the previous message before exercise returns. JS's exercise floated it (`void encumber_msg()`), so every caller ran on (find_ac, mdamageu, the next RNG draw) before the key was read, and the --More-- screen showed a later status line. Separately, JS encumber_msg left a pending botl commit (`_pending_botl`) on the message-less Overloaded → Overtaxed crossing, which the next unrelated pline's putmesg turned into a status repaint (3 corpus sessions → FULL PASS)

**C locus:** attrib.c exercise `:509`, `:516–517`; exerper `:520–580`; exerchk `:598–603`; pickup.c encumber_msg `:1975–2020` (decrease switch `:2001–2015` has no EXT/OVERLOADED arm); allmain.c `:356–360`, `:403`, `:453`; mhitu.c gulpmu `:1292`.
**JS:** js/attrib.js exercise; js/allmain.js exerper/exerchk; js/invent.js encumber_msg; the awaiting callers in js/{artifact,ball,dokick,dothrow,eat,explode,fountain,hack,lock,mhitu,mthrowu,polyself,potion,pray,read,sit,timeout,trap,uhitm,zap}.js.
**Change:** - exercise returns encumber_msg's promise (undefined otherwise). It stays sync for the sync callers that drop the value.
**Verify:** - verify do_statusline2: 3 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS.
**Named:** none in exercise/exerper/encumber_msg. Sync callers that drop exercise's promise (none among the C-mirrored STR/CON sites today) would still float the message.
**Next:** scen-worldtour-Valkyrie-49955041 s543. An electric-eel shock destroys a ruby ring, and C then runs an impossible() path: «Strange... I didn't know you had that ring.» / «Program in disorder!» (HP 73 shown until then; JS skips it and shows 65 at once). Port that C path faithfully (user rule: imitate C bugs), likely do_wear.c Ring_gone / destroy_items ordering.

## 2026-10-20 — D-4172 Two rumors.fal fortunes end in a literal `--More--` («You choke on the fortune cookie.  --More--» `:389`, «You can get a genuine Amulet of Yendor by doing the following:  --More--»). C prints them as plain plines; no more() runs. The next command's flush_screen(1) puts the cursor on the hero (display.c curs_on_u). JS's flush painter (_buildScreenOutput) and runSegment's capture hook both moved the cursor to the topline whenever the message text ended in `--More--`, so the one screen after such a fortune had the cursor on row 0 (2 corpus sessions → FULL PASS)

**C locus:** win/tty/topl.c more() `:205–248` (the only place the cursor rests after a --More--: tty_curs + putsyms, then xwaitforspace); display.c flush_screen → curs_on_u; rumors.c outrumor (fortune cookie text via pline).
**JS:** js/display.js _buildScreenOutput (flush_screen painter); js/jsmain.js captureBoundary.
**Change:** - The painter's arm now requires `_tty_inmore`, i.e. it applies only while more() is waiting, which is where C's cursor sits after `--More--`.
**Verify:** - `score --ids` on all 63 failing rows → **673/734** (+2: scen-sweep-Rogue-50055025 64 → 1444/1444 FULL PASS, scen-trek-Monk-50850075 319 → FULL PASS; no other row moved).
**Named:** the two-line `\n--More--` cursor arms (painter and _paintToplineOnly) are still text-based; no corpus row reaches them with a literal `--More--` message.
**Next:** re-rank. Cliffs head: do_statusline2 (parked: writer of «Overtaxed» vs «Strained»), dosounds, dismount_steed, xkilled.

## 2026-10-20 — D-4171 An rc that repeats a compound option (`OPTIONS=msg_window:reversed` twice) makes C's parseoptions complain (`:621–623` → complain_about_duplicate `:6803`). Before init_nhwindows (unixmain.c `:150` vs `:174`), config_erradd's plines are raw_print()s, and rcfile's config_error_done (`:1945`) prints «N error in <rc>.» and runs wait_synch → tty_wait_synch → getret, which takes keys until Enter (cbreak is still off). The recorder's nomux_raw_emit enters raw mode on that first raw_print and never leaves it, so every later marker reports the raw cursor (0,6). JS startup's parseNethackrc ran duplicate detection only for role/race/gender/align, never bracketed the rc with config_error_init/done, and dropped pre-window raw_print. It started the game at step 0 and lost every screen on the cursor (12 cliff rows, 18 corpus sessions: 0 → 491–963 screens each, RNG 100 %)

**C locus:** options.c parseoptions `:513–623` (right-to-left comma recursion, match, duplicate_opt_detection, complain_about_duplicate `:6789–6809`); cfgfiles.c rcfile `:1943–1945`, parse_conf_buf `:1726–1730` (config_error_nextline per physical line), config_erradd `:1576–1588`, config_error_done `:1609–1615`; pline.c vpline `:243–249`; wintty.c tty_wait_synch `:3623–3647`, getret `:764–781`, tty_init_nhwindows → setftty `:529–533`; getline.c xwaitforspace `:230–257`; recorder patch 006 termcap.c nomux_raw_emit / nomux_get_cursor.
**JS:** js/options.js (parseoptions_match, parseoptions, rc_parseoptions_dups, rc_do_set_role_family, parseNethackrc), js/cfgfiles.js (configMsg, config_error_nextline export), js/display.js (raw statics, nomux_shadow, nomux_raw_emit, vpline), js/nomux_capture.js (nomux_marker), js/jsmain.js (start, captureBoundary), js/input.js (nhgetch).
**Change:** - **Match helper.** parseoptions `:539–613` (negation strip, optlen, prefix/minmatch/alias match) moved verbatim into `parseoptions_match`, which parseoptions now calls.
**Verify:** - Frozen runner on the 18 recordings: every one RNG-complete and cursors 100 % (353/354 on scen-symset-Wizard-50359017); screens Samurai-50555047 0 → 922/938, Rogue-50059025 0 → 963/983, Valkyrie-50950047 0 → 721/865, Ranger-50059028 0 → 491/580. The lost screens are the recorder-path row (C prints its own temp dir) plus later, unrelated divergences.
**Named:** - The recorder's temp-dir path in «1 error in …» can't be reproduced; JS prints its own configfile name. Those rows are env:config-path once the first differing row is the path row.
**Next:** re-rank. With these rows moved, the cliffs head is the next owner on the rescored board. scenario-gen's duplicate msg_window is a generator quirk; the shape is now ported, so it can stay.

## 2026-10-20 — audit 3001–3010 @6a4b8eb63: review D-4161..D-4170 (7A/3D/0Q, 0 Must-fix) + full rescore 671/734 (0 PASS→FAIL)

**Reviews:** every owner re-measure (`verify … --base HASH~1 --no-reach`) reproduces its D-log (gulpmu 2, getpos 3+1 moved, doset_simple_menu, handler_runmode, dosearch, explmm PASS; enhance_weapon_skill NO MOVEMENT as named). Owner-null claims (D-4163/4164/4165: 19 recordings incl. 2 reserve) replayed directly with the frozen runner: 19/19 PASS, cursors exact. D-4164/4165 recorder-overflow model checked line-for-line against patch 006 (SEQ/ANIM are JS's own counters, not trace reads; Rule #2 clean). WITH-DEBT: 3006 cond_menu "sorted" heading + autopickup-exception heading attr-only (menu_heading_attr drops colour), o_init.js rename_disco/doclassdisco keep ATR_INVERSE → ledger partial ×3; 3008 use_crystal_ball non-fatal path never drains `_losehp_needs_rehumanize` → ledger partial. All unreached.
**Rescore:** `record` all present; unfiltered `score` 683/718 (RNG 99.86 %, screens 99.6 %); vs committed board 0 PASS→FAIL; archive 17 PASS → 671/734, unrecorded 0; tier 7 promoted back, reserve 33 → 26.
**Score:** public 44/44 (792838 RNG, 11405 screens, 103+0.61/turn); held-out 35/44, 10,849 pts (judge 13:17Z, +0). Ledger snapshot; seeded sample interest_mapseen/mkcavepos/basic_menu_colors/init_objects/use_tinning_kit 5/5 hold.
**Next:** Must-fix empty → the cliffs head.
