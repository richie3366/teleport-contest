# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry before exiting.
Keep entries tight; detailed hypothesis lives in `NOTES.md`.

The next agent does **not** read this whole file by default. Progress and Notes
must contain anything needed immediately; the journal is an audit trail.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- C locus: <file:function>
- Result: <verified change | falsified hypothesis | prerequisite>
- Verification: <commands and compact result>
- Next: <one exact first action>
```

---

## 2026-07-13 00:20 — seed0060 idx 22 orc infravision newsym (D-0039)
- C locus: `display.h:_see_with_infrared`/`_mon_visible`; `display.c:newsym`
  (!cansee); `monmove.c:postmov`; `monflag.h` M3_INFRA*; race via
  `mons[urace.mnum]`
- Result: **verified faithful change** — pet was at correct (22,12) with
  `couldsee` true but `cansee` false in dark corridor; JS drew terrain
  only. Ported infrared monster display + `mflags3` extract +
  `postmov` final newsym.
- Verification: seed0060 Scr **38**/41 (idx 22 OK; 33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **217**/11405 (+1), RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 33 (disco class layout).

## 2026-07-13 00:10 — seed0060 cansee pline + wall_angle + `>` color (D-0038)
- C locus: `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`wall_angle`/`back_to_glyph`
- Result: **verified faithful change** — idx 6 extra pickup pline was
  out-of-sight invent (C silent); premature `┌` was unfinished
  WM_C_OUTER corner without `wall_angle`; downstairs `>` is NO_COLOR
  in recordings (keep `<` yellow).
- Verification: seed0060 Scr **37**/41, RNG **3626**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, screens **216**/11405
  (+31), RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 22 (pet `f` vs corridor `#`).

## 2026-07-13 00:01 — seed0060 gold doname + mondied newsym (D-0037)
- C locus: `objnam.c:doname_base` (COIN article); `mon.c:mondied`/
  `mondead`/`mon_leaving_level` (`newsym`)
- Result: **verified faithful change** — idx 5 was `"1 gold piece"` vs
  `"a gold piece"` plus stale newt `:` (no `newsym` after kill). Ported
  coin `doname` article path + `mondead` refresh. Incomplete
  `make_corpse`/`mkcorpstat` A/B cut aggregate RNG ~900 — reverted;
  keep as named omission.
- Verification: seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405, RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 6 (drop re-pickup pline / premature wall `┌`).

## 2026-07-13 00:00 — seed0060 orc hpadv + mon_glyph mcolor (D-0036)
- C locus: `role.c` races[] orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`
- Result: **verified faithful change** — orc missing `hpadv` fell back
  to human infix 2 → botl `HP:12` vs C `HP:11`; newt used mlet green
  not `mcolors[PM_NEWT]` yellow. Ported race advances + `mon_glyph`
  mcolors.
- Verification: seed0060 Scr **5**/41 (idx 0–4), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **184**/11405, RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 5 cells (invent letter / map wall).

## 2026-07-12 23:58 — seed0060 losehp + regen_hp (D-0035)
- C locus: `dokick.c:kick_ouch` → `hack.c:losehp`; `allmain.c:regen_hp`
  (once-per-turn before `dosounds`)
- Result: **verified faithful change** — wall kick burned damage RNG but
  never subtracted HP, so `regen_hp` never ran; also missing the EOT call.
  Ported `js/hack.js` `losehp`/`maybe_half_phys`, wired `kick_ouch`, and
  `regen_hp` when `uhp < uhpmax`.
- Verification: rng-diff **RNG OK 3626**; seed0060 **3626**/3626 RNG,
  Scr **0**/41; green + seed1500/1800 PASS + strict; full **4/44**,
  RNG **28511**/792838, screens **179**/11405.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 0 cells (legacy/botl; cursors already 41/41).

## 2026-07-12 23:55 — seed0060 makemon(NULL,0,0) (D-0034)
- C locus: `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon` /
  `makemon_rnd_goodpos` / `m_initgrp`; `teleport.c:enexto_gpflags`
- Result: **verified faithful change** — JS stubbed spawn body after
  `rn2(70)`; C runs placement (`rn1(77)`/`rn2(21)`), `rndmonst`, group.
  Ported placement-before-select, `makemon_rnd_goodpos`, `m_initgrp`,
  `enexto_gpflags`; fixed `MM_NOGRP` to C `0x2000`.
- Verification: rng-diff **3105→3536**; seed0060 **3562**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **28497**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — port `regen_hp` (`allmain.c`) before `dosounds` (C @ 3536).

## 2026-07-12 23:45 — seed0060 donull / `.` wait (D-0033)
- C locus: `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  timed && `func != dokick`)
- Result: **verified faithful change** — falsified post-kick pet/`mtrack`
  as the 3016 cause. JS treated `.` as unknown (`move=0`), so wait turns
  never ran; next kick’s `exercise` `rn2(2)` sat where C had `distfleeck`
  `rn2(5)`. Ported `js/do.js` `donull` + `cmd.js` `.` branch.
- Verification: rng-diff **3016→3105**; seed0060 **3151**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **27922**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — port `maybe_generate_rnd_mon` → `makemon(NULL,0,0)` /
  `makemon_rnd_goodpos` (C @ 3105).

## 2026-07-12 23:35 — seed0060 m_avoid_kicked_loc (D-0032)
- C locus: `dokick.c` (`kickedloc`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear in `hack.c:domove` / non-kick timed cmds
- Result: **verified faithful change** — falsified mklev/`#`=wall theory
  (both sides `CORR` at `(22,12)`). Missing pet skip of kicked cell
  `(24,13)` made `appr=0` chcnt 4 vs C 3. Ported `game.kickedloc` + avoid
  helper; Sokoban push-avoid stubbed false.
- Verification: rng-diff **2997→3016**; seed0060 **3086**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **27787**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose @ 3016 (pet cell after kick turn vs C `(23,13)`; `.`/
  `kickedloc` clear; `mtrack` continue-vs-nxti).

## 2026-07-12 23:20 — seed0060 @ 2997 distfleeck vs rn2(4) diagnosis
- C locus: symptom `monmove.c:distfleeck` / `dogmove.c:dog_move`; root
  `mklev.c` corridor/`join`/`dig_corridor`
- Result: falsified “post-kick fleeck/ALLOW_*”; prerequisite identified
  (D-0032). Adjacent pet `appr=0` → chcnt per mfndpos slot; JS cnt=4
  includes `(22,12)` CORR; C screen `######f@` → wall there → cnt=3 →
  C `rn2(5)` is post-move distfleeck. No production change; DIAG removed.
- Verification: rng-diff still 2997; green seed8000+seed0900 PASS +
  strict; dogmove.js DIAG-free.
- Next: audit `js/mklev.js` `dig_corridor`/`join`/`makecorridors` for
  why y=12 x=18..22 is CORR; compare to C after levelgen (focused
  seed0060).

## 2026-07-12 23:03 — dokick kick_dumb empty-space exercise
- C locus: `dokick.c:dokick` / `kick_dumb`; `cmd.c` `C('d')`
- Result: verified fix (D-0031). Ctrl-D+`j` was unknown-command + move;
  C path is getdir → `kick_dumb` → `exercise(A_DEX,FALSE)` →
  "You kick at empty space." (Dx 18 skips strain `rn2(3)`).
- Verification: rng-diff 2979→2997; seed0060 3064/3626 cursors 41/41;
  green + seed1500 + seed1800 PASS + strict; full suite 4/44, RNG
  27765/792838, Scr 179/11405.
- Next: diagnose C `distfleeck` `rn2(5)` @ 2997 vs JS `rn2(4)`; falsify
  with `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:58 — dog_goal in_masters_sight / couldsee
- C locus: `dogmove.c:dog_goal`; `vision.h:couldsee`
- Result: verified fix (D-0030). Replaced stub `in_masters_sight=true`
  with real `couldsee(omx,omy)`. DIAG: pet out of COULD_SEE so C skipped
  APPORT `rn2(8)` after `obj_resists`; JS had forced the roll.
- Verification: rng-diff 2663→2979; seed0060 3039/3626; green + seed1500
  + seed1800 PASS + strict; full suite 4/44, RNG 27859/792838, Scr
  179/11405.
- Next: diagnose C `exercise` `-rn2(2)` @ 2979 vs JS `distfleeck`
  (dokick vs exerper); falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:56 — dog_invent relobj / mdrop_obj
- C locus: `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (OBJ_MINVENT); `dogmove.c:dog_invent`
- Result: verified fix (D-0029). Pet drop extracts minvent → `place_object`;
  `add_to_minv` uses numeric `OBJ_MINVENT`. Cleared seed0060 mismatch @ 2643
  (`dog_has_minvent` / APPORT `rn2(8)`).
- Verification: rng-diff 2643→2663; seed0060 2771/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27445/792838, Scr 179/11405.
- Next: diagnose why C skips APPORT `rn2(8)` at 2663 after `obj_resists`
  (lit / `m_cansee` / `couldsee`); falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:55 — dog_invent splitobj / next_ident
- C locus: `mkobj.c:splitobj` / `nextoid` / `next_ident`;
  `dogmove.c:dog_invent`
- Result: verified fix (D-0028). Exported `splitobj` from `js/mkobj.js`
  (quan/owt, floor `nobj`/`nexthere`, `next_ident`); wired `dog_invent`;
  `dothrow.js` reuses it. Cleared seed0060 mismatch @ 2476.
- Verification: rng-diff 2476→2643; seed0060 2761/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27433/792838, Scr 179/11405.
- Next: port `relobj` for pet drop so `dog_has_minvent` clears before
  `dog_goal` APPORT `rn2(8)`; falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:50 — orc u_init_race / Xtra_food + inv_subs
- C locus: `u_init.c:u_init_race` (`PM_ORC`), `Xtra_food[]`, `inv_subs[]`,
  `ini_inv_obj_substitution`, `ini_inv`
- Result: verified fix (D-0027). Ported race switch (orc/elf/dwarf/gnome) +
  `Xtra_food` + full `inv_subs` wired into `ini_inv`. Cleared seed0060
  mismatch @ 2341 (`trquan` before attrs).
- Verification: rng-diff 2341→2476; seed0060 2584/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27256/792838, Scr 179/11405.
- Next: port `splitobj` for `dog_invent` when `carryamt != quan`
  (`node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`).

<!-- entries below -->

## 2026-07-12 22:45 — seed1800 screens 24→26 PASS (legacy + look)
- C locus: `wintty.c:process_text_window` corner NHW_MENU; `invent.c:
  dfeature_at`/`look_here`; `stairs.c:stairs_description`; `mklev.c`
  Dlvl1 `u_traversed`
- Result: verified faithful change (D-0026) — legacy corner keeps map
  under Book; look `:` prints staircase-up-out-of-dungeon via real
  dfeature path.
- Verification: seed1800 **PASS** 2458/2458 Scr **26/26** + strict; green
  + seed1500 PASS + strict; full suite **4/44**, RNG 27161/792838, Scr
  **179**/11405.
- Next: diagnose seed0060 orc `u_init_race` / `trquan` @ RNG 2341
  (`rng-diff` + C `u_init.c` race cases).

## 2026-07-12 22:38 — getobj throw/apply (seed1800 Scr 12→24)
- C locus: `dothrow.c:throw_ok`/`dothrow`; `invent.c:getobj` missing-letter
  `continue`; `cmd.c:getdir` prompt clear
- Result: verified faithful change (D-0025) — COIN_CLASS `$` in throw
  suggest (invent order); getobj_throw/apply loop + `flush_topl_more`;
  clear direction prompt after answer; `throw_gold` body deferred.
- Verification: seed1800 2458/2458 Scr **24/26** + strict; green +
  seed1500 PASS + strict; full suite **3/44**, RNG 27161/792838, Scr
  **177**/11405.
- Next: peel seed1800 idx 0 (legacy map under Book) or idx 25 look `:`
  staircase message; alternate seed0060 orc `trquan` @ 2341.

## 2026-07-12 22:35 — invent/doname/disco (seed1500 Scr 36→40 PASS)
- C locus: `invent.c:display_inventory`; `objnam.c:doname`;
  `u_init.c:ini_inv_adjust_obj` cknown; `o_init.c:discover_object`/
  `dodiscovered`/`interesting_to_discover`; `insight.c:weapon_insight`
- Result: verified faithful change (D-0024) — corner invent NHW_MENU;
  doname empty/wield/swapwep/potion/implicit-uncursed; disco classes +
  `*`/encounter; ^X plname capitalize + wield/skill starter lines.
- Verification: seed1500 **PASS** 2768/2768 Scr 40/40 + strict; green PASS
  + strict; seed1800 Scr 12/26 (held); full suite **3/44**, Scr 165/11405.
- Next: dump first failing seed1800 screen and port its C display/UI cause
  (not D-0006 pet movement). Alternate: seed0060 orc `trquan` @ 2341.

## 2026-07-12 22:30 — tutorial NHW_MENU offx (seed1500 Scr 34→36)
- C locus: `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow` / `process_menu_window`; `menu_headings` inverse
- Result: **verified faithful change** — D-0023. JS centered the title
  only; C corner menu offx=20 from OPTIONS footer maxcol=59, full y/n
  lines, cursor `[27,6]`, `docrt` on dismiss.
- Verification: seed1500 2768/2768 Scr **36/40**; seed1800 Scr **12/26**;
  green PASS + strict; full suite 2/44 RNG 26980/792838 screens **160**/11405.
- Next: peel invent `i` (idx 28) corner + `xprname`, or discoveries (32) /
  enlightenment plname/wield (34–35); falsify with focused seed1500 runner.

## 2026-07-12 22:22 — newsym floor objects + SDOOR (seed1500 Scr 1→34)
- C locus: `display.c:newsym`/`_map_location`/`map_object`/`back_to_glyph`;
  `display.h:vobj_at`/`covers_objects`; corpse `mon_color(corpsenm)`
- Result: **verified faithful change** — D-0022. Welcome map missed `%`/`$`
  because JS never drew floor objects; SDOOR fell through to `?`. CORPSE
  color needs monster table `mcolor` (orc=CLR_RED), not oc_color brown.
- Verification: seed1500 2768/2768 Scr **34/40**; seed1800 Scr **10/26**;
  green PASS + strict; full suite 2/44 RNG 26980/792838 screens **156**/11405;
  seed0060 unchanged 2489/3626.
- Next: peel seed1500 tutorial/`NHW_MENU` centering (screen idx 2) or
  discoveries/enlightenment (idx 32/34); falsify with focused seed1500 runner.

## 2026-07-12 22:14 — doapply/pick_lock no-door turn (seed1500 @ 2702)
- C locus: `apply.c:doapply` LOCK_PICK; `lock.c:pick_lock` non-door;
  `cmd.c:get_adjacent_loc`/`getdir`
- Result: **verified faithful change** — D-0021. Falsified umovement/
  encumbrance theory (DIAG `umove_after=12`). Cause was missing apply:
  C `a`→lock pick `e`→dir `l`→"You see no door there." takes a turn;
  JS treated keys as unknown/eat/move and deferred movemon.
- Verification: rng-diff seed1500 RNG OK 2768; runner 2768/2768 Scr 1/40;
  seed0060 2489/3626; green PASS + strict; full suite 2/44 RNG
  26980/792838 screens 109/11405. seed1800 rng-diff also RNG OK 2458.
- Next: diagnose seed1500 first screen mismatch (Scr 1/40), or peel
  seed0060 orc `trquan` @ 2341 if display is too broad.

## 2026-07-12 22:06 — mon_allowflags OPENDOOR / nohands (track N)
- C locus: `mon.c:mon_allowflags` `can_open`; `mfndpos` closed-door skip;
  `mondata.h:nohands`/`verysmall`
- Result: **verified faithful change** — D-0020. seed1500 idx 2618 was a
  newt whose `mfndpos` included `D_CLOSED` (70,8) because JS always set
  `OPENDOOR`. Extracted `mflags1`; gated `OPENDOOR` on
  `!(nohands||verysmall)`.
- Verification: rng-diff first mismatch 2618→2702; seed1500 2702/2768;
  seed0060 2489/3626; green PASS + strict; full suite 2/44 RNG
  26889/792838 screens 109/11405.
- Next: diagnose JS stop after wipe_engr while C `distfleeck` @ 2702
  (post-EOT extra `movemon` / `umovement` leftover).

## 2026-07-12 21:55 — cursemsg/--More-- + dog_invent pickup (udist)
- C locus: `dogmove.c:dog_move` cursemsg pline; `trap.c:thitm` miss pline;
  `dog_invent` `mpickobj`/droppables; `mfndpos` ALLOW_TRAPS + `seetrap`/
  `tseen` `rn2(40)`
- Result: **verified faithful change** — D-0019. Missing reluctantly +
  almost-hit plines left `--More--` unarmed, so keys `l,l,j,j,h,h,.` walked
  the hero (udist 10 vs 4). Real pickup + drop RNG + seen-trap skip followed.
- Verification: rng-diff first mismatch 2563→2618; seed1500 2700/2768;
  seed0060 2493/3626; green PASS + strict; full suite 2/44 RNG 26858/792838.
- Next: diagnose wild `m_move` track `rn2(20)` vs `rn2(24)` @ idx 2618
  (pet destination / occupancy after trap-avoid).

## 2026-07-12 21:35 — postmov dart trap + m_cansee clear_path
- C locus: `monmove.c:postmov`→`mintrap`; `trap.c:trapeffect_dart_trap`/
  `t_missile`; `vision.h:m_cansee`=`clear_path`; `dogmove.c:find_targ`
- Result: **verified faithful change** — D-0018: idx 2522 weapon create was
  dart-trap ammo after pet step, not `mongets`. Wired pet `postmov`/`mintrap`
  dart path; exported `clear_path`/`m_cansee` so ranged scoring does not
  see through walls (`rnd(5)`). Stay-put `dog_move` returns `MMOVE_MOVED`.
- Verification: green PASS + strict; seed1500 first mismatch **2522→2563**;
  runner seed1500 2598/2768, seed0060 2494/3626; full suite 2/44, RNG
  26687/792838, screens 109/11405, role throws 29/44.
- Next: diagnose `dog_invent` `rn2(udist)` C=4 vs JS=10 @ idx 2563
  (pet/hero positions after dart-trap turn); `rng-diff` seed1500.

## 2026-07-12 21:30 — dog_move uncursedcnt / cursemsg cursed skip
- C locus: `dogmove.c:dog_move` (~1069–1078, ~1212–1239)
- Result: **verified faithful change** — D-0017: JS counted every `mfndpos`
  slot and never set `cursemsg` / `rn2(13*uncursedcnt)` continue. Ported
  uncursed count (skip blocked MON_AT + `cursed_object_at`), cursed pile
  flag, and probabilistic skip.
- Verification: green PASS + strict; seed1500 first mismatch **2517→2522**;
  runner seed1500 2526/2768, seed0060 2494/3626; full suite 2/44, RNG
  26664/792838, screens 109/11405, role throws 29/44.
- Next: diagnose C `next_ident`+WEAPON `mksobj_init` @ idx 2522 (caller of
  weapon create after this `dog_move`); `rng-diff` seed1500.

## 2026-07-12 21:25 — mktrap_victim place_object (3 missing obj_resists)
- C locus: `mklev.c:mktrap_victim` (ammo + cursed possessions + candle)
- Result: **verified faithful change** — D-0016: JS created dart/food/gem for
  DART_TRAP victims but never `place_object`, so `dog_goal` skipped 3
  `obj_resists` after APPORT. Also ported PIT `breaktest` discard path.
- Verification: green PASS + strict; seed1500 first mismatch **2300→2517**;
  runner seed1500 2518/2768, seed0060 2494/3626; full suite 2/44, RNG
  26624/792838, screens 109/11405, role throws 29/44.
- Next: port `dog_move` `uncursedcnt` + `rn2(13*uncursedcnt)` cursed-square
  skip (`dogmove.c` ~1069–1078 / ~1235–1239); `rng-diff` seed1500 @ 2517.

## 2026-07-12 21:15 — mineralize bury + CORPSE age POISON (dog_goal 2298)
- C locus: `mklev.c:mineralize` / `mkobj.c:add_to_buried`; `dog.c:dogfood`
  CORPSE age; `dogmove.c:cursed_object_at` + `dog_goal`
- Result: **verified faithful change** — D-0014: mineralize `!rn2(3)` buries
  off `fobj` (was always `place_object`, so unreachable stone gold stole the
  first APPORT `rn2(8)`). D-0015: tainted CORPSE `age+50<=moves` → POISON so
  APPORT is not overwritten by CADAVER.
- Verification: green PASS + strict; seed1500 first mismatch **2298→2300**;
  runner seed1500 2343/2768, seed0060 2494/3626; full suite 2/44, RNG
  26445/792838, screens 109/11405, role throws 29/44.
- Next: find the **3** C `obj_resists` JS skips after APPORT+corpse @ idx 2300
  (`rng-diff` seed1500); compare in-bbox `fobj` / candidate-loop `dogfood`.

## 2026-07-12 21:05 — Rogue invent: is_poisonable + starting sack mkbox_cnts
- C locus: `obj.h:is_poisonable`; `mkobj.c:mksobj_init` / `mkbox_cnts`
- Result: **verified faithful change** — falsified “m_initinv @ 2223” theory.
  D-0012: poison roll only for missiles (`is_multigen`), not dagger. D-0013:
  starting SACK still runs `mkbox_cnts` → `rn2(1)` even when empty.
- Verification: green PASS + strict; seed1500 prefix 2223→**2298** (`dog_goal`);
  runner 2348/2768; seed0060 2478/3626; full suite 2/44, RNG 26409/792838,
  screens 109/11405, role throws 29/44.
- Next: `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`
  — diagnose C `dog_goal` rn2(8) vs JS rn2(100) at idx 2298 (call order /
  missing branch); do not implement D-0006.

## 2026-07-12 21:00 — `start_corpse_timeout` + `mkcorpstat` special restart (D-0011)
- C locus: `mkobj.c:start_corpse_timeout` / `special_corpse` / `mkcorpstat`;
  `mklev.c:mktrap_victim`
- Result: **verified faithful change** — random lichen corpse no-ops first
  timer; `mkcorpstat` victim override now restarts timeout like C. Ported
  `rnz(rot_adjust)` envelope + rider/troll branches.
- Verification: green PASS + strict; seed1500 prefix → 2223 (`m_initinv`);
  2255/2768 + 1 screen; seed0060 2464/3626; full 2/44, RNG 26314/792838,
  screens 109/11405.
- Next: port `makemon.c:m_initinv` body (seed1500 idx 2223); falsify with
  `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:55 — ordinary `m_initweap` / `is_armed` (D-0010)
- C locus: `mondata.h:is_armed`; `makemon.c:m_initweap`/`m_initthrow`/`mongets`
- Result: **verified faithful change** — extractor `has_at_weaps`; wired
  `is_armed` → `m_initweap` ordinary envelope before `m_initinv_tail`.
  Cleared seed1500 idx 1112 (`rn2(4)` kobold darts).
- Verification: green PASS + strict; seed1500 prefix → 1194
  (`start_corpse_timeout`); 1275/2768; seed0060 2464/3626; full 2/44,
  RNG 25334/792838, screens 108/11405.
- Next: port `mkobj.c:start_corpse_timeout` (seed1500 idx 1194); falsify with
  `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:50 — Rogue startup UI + calendar (verify D-0007/8 + D-0009)
- C locus: `questpgr`/`pray` align_gname+gtitle; `wintty` menu offx; `botl`
  showexp/time + plname capitalize; `calendar` moon/friday; `allmain` preamble
- Result: **verified faithful change** — legacy Kos+offx; botl flags; welcome
  `--More--` flush before tutorial; `js/calendar.js` + moon/friday plines.
  Confirmed D-0007/D-0008 live. Next peel identified: `m_initweap` @ seed1500
  idx 1112 (JS skips to `rn2(50)`).
- Verification: green PASS + strict; Rogue no `role not ported`; seed1500
  legacy/welcome text+cursor match; seed0013 moon/friday lines match; full
  suite 2/44, RNG 23908/792838, role throws 29/44.
- Next: port `makemon.c:m_initweap` (+ `mongets`/`m_initthrow`/`is_armed`);
  falsify with `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:35 — Rogue welcome/HP/align (after u_init_role)
- C locus: `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp`;
  `exper.c:newpw`; `u_init.c` align init; `insight.c` pantheon/wallet
- Result: removed Tourist literals — `Hello(mnum)`, role/race `hpadv`/`enadv`,
  `newhp`/`newpw`, rc `align` → `ualign`, `welcome()`, invent pantheon + empty
  wallet. Builds on D-0007 Rogue `u_init_role`. Shell still rejected every
  command; `STOP_AGENT_LOOP.md` is `1` (human).
- Verification: **blocked** — no live green/cohort this iteration. Prior loop
  post-iter-1 green was PASS on pre-welcome-edit tree only.
- Next: with shell approved, run D-0007/D-0008 four commands; if Rogue clears
  init+welcome, peel first post-welcome divergence; if green `^X` regresses,
  bisect invent pantheon/wallet.

## 2026-07-12 20:20 — Rogue/human u_init foundation
- C locus: `role.c` Rogue/human entries; `u_init.c:u_init_role` (`PM_ROGUE`),
  `knows_object`/`knows_class`, `ini_inv_use_obj` wield/wear
- Result: ported PM_* `mnum` identity + Rogue inventory/knowledge path
  (`js/roles.js`, `js/u_init.js`, role PM exports in `monsters_data.js`).
  Shell tool rejected all commands this iteration — green/cohort **not**
  re-run after the edit (preflight green was PASS earlier today from a prior
  terminal capture on the pre-edit tree).
- Verification: **blocked** — next agent must run green + strict + Rogue cohort
  before further feature work or score updates.
- Next: run the four commands listed in D-0007; if Rogue clears the throw,
  peel first post-init divergence; if green regresses, bisect `mnum`/wield
  changes against Tourist.
