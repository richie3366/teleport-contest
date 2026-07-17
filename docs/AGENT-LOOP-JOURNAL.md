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
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-17 19:25 — #739 seed0367 @185 altar_color + see_monsters
- Objective: seed0367 @185 C altar `{` CLR_RED vs JS NO_COLOR; residual warn `1`.
- C locus: `display.c` `altar_to_glyph`/`altar_color`; `teleport.c` `teleds`→`see_monsters`.
- Change: D-0666 `altar_glyph_color`; D-0667 `see_monsters` in teleds/docrt.
- Verification: Scr **245→267**/324 prefix **185→203** RNG FULL; green+strict;
  cohort **32**/32. Suite score still #735 until #740.
- Next: @203 level-teleport materialize map (JS memory vs C blank).

## 2026-07-17 19:15 — #738 seed0367 @155 TREE lookat
- Objective: seed0367 getpos farlook @155 C `tree` vs JS `unexplored area`.
- C locus: `pager.c` `lookat` cmap default → `defsyms[S_tree].explanation`;
  `getpos.c` `auto_describe`.
- Change: `cmap_defsym_explanation` / pager lookat TREE → `"tree"`
  (D-0665). Falsified blank-disp_ch/Warning theory — cell had DEC `g`.
- Verification: seed0367 Scr **244→245**/324 prefix **155→185**,
  RNG FULL; green+strict PASS; cohort **34**/34.
- Next: @185 altar DEC `{` color1+decgfx vs JS NO_COLOR.

## 2026-07-17 19:10 — #737 seed0367 @154 self_lookat gender
- Objective: seed0367 farlook @154 priestess vs priest.
- C locus: `pager.c` `self_lookat`; `you.h` `Ugender`;
  `do_name.c`/`mondata.h` `pmname`.
- Change: D-0664 — export `pmname`/`Ugender`; pager+getpos
  self_lookat use `pmname(umonnum,Ugender)` (!Upolyd race adj).
- Verification: seed0367 Scr **243→244**/324 prefix **154→155**,
  RNG FULL; green+strict PASS; cohort **34**/34 PASS.
- Next: @155 C `tree` vs JS `unexplored area` (disp_ch/TREE memory).

## 2026-07-17 19:05 — #736 seed0367 @148 Pri firsttime + Warning
- Objective: seed0367 screen peel @148 materialize More / quest on_start.
- C locus: `dat/quest.lua` Pri `firsttime`; `display.h` `_mon_warning`;
  `display.c` `display_warning`; `allmain.c` `warnlevel=1`.
- Change: D-0662 Pri `QUEST_FIRSTTIME`; D-0663 `mon_warning`/
  `display_warning` + `context.warnlevel=1` in `newsym`.
- Verification: seed0367 Scr **205→243**/324 prefix **148→154**,
  RNG FULL; green+strict PASS; cohort **32/32** PASS.
- Next: @154 farlook `priestess` vs `priest`; @155 `tree` vs
  `unexplored area`.

## 2026-07-17 18:56 — #735 public score cadence
- Objective: mandatory full `sessions` score (#735÷5).
- C locus: n/a (score refresh; primary still seed0367 @148).
- Change or falsified theory: none — docs only. Noted JS already
  `await pline(dfr_post_msg)` in goto_level; @148 still needs path
  falsify (post_msg set? NEED_MORE after docrt? onquest order).
- Verification: green+strict PASS; suite **34/44**; Scr **6959**/11405;
  RNG **465040**/792838 (58.66%); speed `34+0.16/turn` (R² 0.78).
  Δ vs #730: Scr +30, RNG +14553 (D-0658…61 absorbed).
- Next: @148 materialize --More-- / quest on_start key ownership.

## 2026-07-17 18:55 — #734 D-0661 doname W_WEP (wielded)
- Objective: seed0367 screen peel @76 — C potion `(wielded)` vs JS omit.
- C locus: objnam.c doname_base W_WEP (stack/ammo/missile/non-weptool
  → `(wielded)` else hand phrasing).
- Change: js/objnam.js port predicate + is_missile_obj; quan===1-only
  hand path was wrong.
- Verification: seed0367 Scr 202→205 prefix 76→148 RNG FULL; green+
  strict PASS; cohort 32/32 prior-PASS.
- Next: @148 materialize pline missing --More-- (quest text theft).

## 2026-07-17 18:50 — #733 D-0660 check_special_room MORGUE More
- Objective: seed0367 @38566 C getbones rn2(3) vs JS rnd(10).
- C locus: hack.c check_special_room (MORGUE/… enter + rtype wake);
  do.c goto_level.
- Change: port special-room entrance plines so locate_next --More--
  owns ^V2\\n before ^V4 getbones (was deferred → key theft).
- Verification: seed0367 RNG FULL 50125 Scr 180→202; green+strict
  PASS; cohort 34/34 prior-PASS.
- Next: seed0367 screen peel (Scr 202/324).

## 2026-07-17 18:45 — #732 D-0659 vamp decide_to_shapeshift
- Objective: seed0367 @35546 C rn2(4) decide_to_shapeshift vs JS rn2(12).
- C locus: mon.c decide_to_shapeshift (vamp arms) / pickvampshape;
  m_calcdistress.
- Change: port vamp low-hp / fog pickvampshape / vamp-form arms +
  door enexto/rloc_to + gender restore; export pickvampshape.
- Verification: seed0367 @35546→38566 (RNG 38592 Scr 180); green+
  strict PASS; cohort 34/34 prior-PASS.
- Next: @38566 C getbones rn2(3) vs JS rnd(10).

## 2026-07-17 18:40 — #731 D-0658 Pri-loca link_doors + hx=39
- Objective: seed0367 @35535 put_lregion m_at (eastern morgue stock).
- C locus: sp_lev.c link_doors_rooms/maybe_add_door; mkroom.c fill_zoo
  door-edge (no rect roomno); Pri-loca.lua region x2=39.
- Change: port link_doors_rooms (+ helpers); load_pri_loca call before
  wallify; eastern hx=39; drop D-0643 rect roomno gate.
- Verification: seed0367 @35535→35546 (RNG 35910 Scr 171); green+
  strict PASS; cohort 32/32 prior-PASS.
- Next: @35546 decide_to_shapeshift rn2(4) vs JS rn2(12).

## 2026-07-17 18:35 — #730 public score cadence
- Objective: mandatory full `sessions` score (#730÷5).
- C locus: n/a (score refresh only; primary still seed0367 @35535).
- Change or falsified theory: none — docs only.
- Verification: green+strict PASS; suite **34/44**; Scr **6929**/11405;
  RNG **450487**/792838 (56.82%); speed `34+0.16/turn` (R² 0.781).
  Δ vs #725: Scr +5, RNG +8419 (D-0654…57 absorbed).
- Next: Pri-loca link_doors_rooms + eastern hx=39 fill parity @15167.

## 2026-07-17 18:30 — #729 D-0657 C m_at at (59,14)
- Objective: seed0367 @35535 why C put_lregion rejects (59,14).
- C locus: mkmaze.c put_lregion_here TELE m_at; mkroom.c fill_zoo door
  skip; sp_lev.c link_doors_rooms; Pri-loca.lua eastern region.
- Change or falsified theory: C DIAG — mon=243 elf zombie (not
  typ/occ/excl). C room[3] hx=39 stocks 53–60. D-0645 hx=35 gap.
  Tried hx=39 / link_doors — regress @15167/@14403; reverted.
- Verification: seed0367 still @35535; green+strict PASS.
- Next: link_doors_rooms + hx=39 fill parity, then intemple.

## 2026-07-17 18:15 — #728 D-0656 getlev updest/dndest + @35535 diag
- Objective: seed0367 @35535 C place_lregion vs JS nhlib shuffle.
- C locus: restore.c getlev dest_area; mkmaze.c put_lregion_here;
  dungeon.c u_on_rndspot; do.c goto_level.
- Change: stash/restore updest/dndest on leave/getlev (D-0656).
  Diagnosis: C rejects put at (59,14) then retries (35,14)→intemple;
  JS accepts. Falsified: second place_lregion call; non-zero dest;
  excl; east hx=39.
- Verification: still @35535 (RNG 35572 Scr 175); green+strict PASS;
  cohort 11/11.
- Next: C cell state at (59,14) on Pri-loca getlev return.

## 2026-07-17 17:55 — #727 D-0655 Pri-fila/filb load_special
- Objective: seed0367 @33068 C nhlib shuffle after getbones vs JS rn2(79).
- C locus: dat/Pri-fila.lua / Pri-filb.lua; sp_lev.c lspo_room/
  build_room/room_types morgue; mklev.c In_quest *-fil{a,b}.
- Change: load_pri_fila/filb via splev_des_room; splev_roomtype
  morgue→MORGUE; dispatch (D-0655). Was empty makemaz → place_lregion.
- Verification: @33068→35535 (RNG 35572, Scr 175); green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: @35535 Home 3 place_lregion vs shuffle (then intemple).

## 2026-07-17 16:55 — #726 D-0654 medusa resists_ston + mresists
- Objective: seed0367 @27126 C rndmonst_adj rn2(3) vs JS rn2(75).
- C locus: sp_lev.c create_object Medusa statue arm; monst.h
  resists_ston; mondata.c poly_when_stoned; makemon.c propagate;
  extract-monsters.py mresists (mr1).
- Change: extract mresists; resists_ston/poly_when_stoned; Medusa
  empty-statue reject+rndmonnum retry + propagate on accept (D-0654).
  Was accepting first makemon then get_location while C retried.
- Verification: @27126→33068 (RNG 33076, Scr 170); green+strict PASS;
  cohort 32/32 prior-PASS.
- Next: @33068 C nhlib shuffle after getbones vs JS rn2(79).
