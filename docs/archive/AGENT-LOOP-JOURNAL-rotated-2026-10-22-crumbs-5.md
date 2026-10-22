# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-22 — Grow #27 @1f9aec9ab: fresh 53650000 ×160 160/160 (100.0 %) on arrival

**Fresh:** RNG 100.0 %, screens 100.0 %, every family 100 %; nothing folded, 160 archived. `tier` promoted the 42 reserve rows back (no failing owners). Board 773/773 after D-4226..D-4229. Gap to held-out 20.5 pts, but Grow #26 did the calibration, so none this time; no §5c candidate is left, so the next calibration grow mines a new public shape.
**Next:** the cliffs block is empty: a port slot has nothing to pop until a new shape is authored.

## 2026-10-22 — D-4229 vault.c invault summons the guard with `makemon(&mons[PM_GUARD], x, y, MM_EGD | MM_NOMSG)` (`:500`) and only then sets isgd / mpeaceful. makemon's tail (makemon.c `:1502–1504`, outside the MM_NOMSG gate) runs `if (go.occupation) dochugw(mtmp, FALSE)`. Against the still-hostile guard that threat check stops a counted search, so C prints «You stop searching.» before «Suddenly one of the Vault's guards enters!», and invault's own stop_occupation (`:494`) finds no occupation. js/vault.js called the sync makemon without its async tail (makemon_appear_msg), so the search was stopped only at `:494`, after the entry line

**C locus:** vault.c invault `:380–620` (makemon `:500`, isgd/mpeaceful `:502–503`, entry pline `:534`, stop_occupation `:494`… in C order the guard-arrival block); makemon.c makemon tail `:1476–1504`; monmove.c dochugw.
**JS:** js/vault.js invault `:693–699`; import makemon_appear_msg (vault.js already imports makemon.js).
**Change:** `await makemon_appear_msg(guard, guard.mx, guard.my, MM_EGD | MM_NOMSG)` right after the makemon null check, before isgd/mpeaceful, which is where C's makemon tail runs. MM_NOMSG skips the appear Norep; the occupation check still runs, as in C.
**Verify:** - `node scripts/verify.mjs --fn invault --full` → `verify invault: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. Board 773/773 (active tier).
**Named:** none in invault's guard-arrival arm.
**Next:** the cliffs block is empty (active board 773/773). The next slot is a grow (§10.19). The reserve tier (42 rows) is unscored since Grow #26; `score --ids <failing reserve ids>` first.

## 2026-10-22 — D-4228 insight.c enlightenment shows ^X through `select_menu(en_win, PICK_NONE)` (`:451–460`, en_via_menu = !final). windows.c select_menu sets `gb.bot_disabled = TRUE` around win_select_menu (`:1856–1863`), and tty_select_menu dismisses the window inside that span (wintty.c `:2851`): erase_menu_or_text → docrt. With a vault guard parked at <0,0>, docrt's see_monsters raises the `<0,0>` newsym impossible(). Its pline's flush_screen calls bot(), which returns at once under bot_disabled, so the status rows that cls blanked stay blank through the --More--. js/invent.js doattributes painted, waited and dismissed with bot enabled, so the impossible's flush repainted both status rows

**C locus:** insight.c doattributes `:2009–2019`, enlightenment `:385–462` (select_menu arm `:451–460`); windows.c select_menu `:1856–1864`; wintty.c tty_select_menu `:2832–2858` (dismiss `:2851`), erase_menu_or_text `:991–1008`; botl.c bot `:253–271`.
**JS:** js/invent.js doattributes `:8954–9066`.
**Change:** `set_bot_disabled(true)` … `finally set_bot_disabled(prev)` spans the NEED_MORE flush, the pages, the wait and the dismissal (docrt or erase_menu_or_text). This is the select_menu_pick_none idiom (invent.js `:3405–3503`). The closing flush_screen(1) stays outside the span, like the command's next flush in C, which paints the status.
**Verify:** - `node scripts/verify.mjs --fn process_menu_window,doattributes,enlightenment --full` → `verify process_menu_window: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 ×3 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. Board 772/773.
**Named:** none in doattributes.
**Next:** invault ×1 (scen-vault-Tourist-53456001: «You stop searching.» vs the guard's entry, message order). The block is now under 6 rows, so the next slot is a grow.

## 2026-10-22 — D-4227 teleport.c teleds calls see_monsters (`:537`) before `vision_recalc(0)` (`:541`). With a vault guard parked at <0,0>, see_monsters' newsym raises display.c's `<0,0>` impossible(), and its pline flushes the map while the hero's destination square still shows the remembered glyph (nothing newsyms it until vision_recalc). js/teleport.js called the async see_monsters without `await`, so its body ran only up to the impossible, vision_recalc painted the hero at the destination, and the impossible's flush then showed «@» where C shows «$»

**C locus:** teleport.c teleds `:448–626` (newsym origin `:536`, see_monsters `:537`, vision_recalc `:541`); display.c see_monsters `:1487`, newsym `<0,0>` impossible `:934`.
**JS:** js/teleport.js teleds `:1528–1531`.
**Change:** `await see_monsters();`. The impossible's --More-- now shows the pre-vision map, as in C.
**Verify:** - `node scripts/verify.mjs --fn newsym,impossible,teleds --full` → `verify newsym: 6 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` · `verify impossible: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 ×3 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. Board 769/773.
**Named:** none in teleds. 27 other un-awaited `see_monsters()` calls remain in other C files' ports (attrib, artifact, detect, do_wear, do, eat, polyself, pray, sit, potion, uhitm, timeout). Each can reorder the same way only with a guard parked at <0,0>, and no corpus row reaches one.
**Next:** process_menu_window ×3 (the ^X window dismissed with ESC: C's redraw hits the `<0,0>` impossible with blank status rows, while JS has repainted them; docrt order) and invault ×1.

## 2026-10-22 — D-4226 vault.c parkguard places the guard at <0,0> only when `m_at(0, 0) != grd` (`:165–166`), and C `m_at` is the raw grid cell (rm.h:516). findgd's migrating arm (`:216–230`) relinks a guard that a level teleporter had sent off its own level back onto fmon with mx = my = 0 and calls parkguard, whose place_monster (steed.c `:931`) sets `mstate = MON_FLOOR`. JS read mon.js m_at, whose fmon coordinate scan found the relinked guard itself at <0,0>, so place_monster was skipped and MON_MIGRATING stayed set. movemon_singlemon's parked-guard arm (mon.c `:1233`, `!(mstate & MON_MIGRATING)`) then never ran gd_move, the guard was never mongone'd, and mdrop_special_objs's five `obj_resists(0,0)` rn2(100) draws were missing

**C locus:** vault.c parkguard `:155–172`, findgd `:204–232`; steed.c place_monster `:898–932`; rm.h m_at `:516`; mon.c movemon_singlemon parked arm `:1233–1239`, mongone `:3267–3283`; steal.c mdrop_special_objs `:852–872`.
**JS:** js/vault.js parkguard; import `level_mon_at` from ./worm.js (`imports.mjs --can vault.js worm.js level_mon_at` → SAFE).
**Change:** parkguard tests worm.js level_mon_at(0, 0), the JS reading of C's `level.monsters[x][y]` that steed.js place_monster already uses. The relinked guard is placed and gets MON_FLOOR, as in C.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-vault-Samurai-53456057.session.json` → PASS (RNG 70123/70123, Screen 887/887).
**Named:** none in parkguard. teleport.js relmon's `mon_m_at(0, 0) === mtmp` (mon.c relmon) has the same m_at reading but belongs to another C file; it is left alone.
**Next:** the cliffs head (newsym 7 rows, impossible 3, process_menu_window 2, invault 1). The block is now under 6 rows, so the next slot is a grow.

## 2026-10-22 — D-4225 monmove.c m_move re-reads the monster's origin at `not_special:` (`omx = mtmp->mx; omy = mtmp->my;`, `:1853–1854`), because gd_move / shk_move / pri_move may relocate it before returning -1 («treat as an ordinary monster»). JS took `const omx/omy` once at entry. A vault guard that gd_move `rloc`s (the hero teleported out carrying gold, `vault.c:990–998`) then ran the normal AI from its new square while JS kept the old one: the stale cell went into mtrack, so the next move's track-avoidance `rn2(4*(cnt-j))` was skipped, and remove_monster cleared the wrong cell

**C locus:** monmove.c m_move `:1720–2075` (omx init `:1731`, shk/gd/pri `:1806–1826` with -1 → MMOVE_NOTHING and fall through, not_special re-read `:1850–1854`, track add `:2062`); vault.c gd_move rloc arms `:916–924`, `:990–1004`.
**JS:** js/monmove.js m_move `:2136–2137`, not_special `:2263–2271`.
**Change:** `let omx/omy`, re-read after the not_special uswallow check, as in C. should_see, gettrack, nix/niy, remove_monster and mon_track_add all now see the post-relocation origin.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-vault-Monk-53456032.session.json` → PASS (RNG 70665/70665, Screen 561/561).
**Named:** none in m_move.
**Next:** the cliffs head (newsym `<0,0>` after the guard parks, gd_letknow, impossible, process_menu_window).
