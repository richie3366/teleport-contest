# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
