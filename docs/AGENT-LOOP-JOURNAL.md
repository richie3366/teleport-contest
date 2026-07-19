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

## 2026-07-19 — #816 mon_allowflags + temple SANCT (D-0732)
- Objective: seed0399 @10157; pivoted after maze C-state DIAG.
- C locus: `mon.c` `mon_allowflags`/`mfndpos`; `priest.c` `in_your_sanctuary`.
- Change: isshk/priest/BUSTDOOR/unlock/minion·rider/human·minotaur/
  NOGARLIC; temple ALLOW_SANCT + `in_your_sanctuary`. Falsified: temple
  explains @10157 (maze nrooms=0 has_temple=false; still cnt=7).
- Verification: green+strict PASS; cohort 6/6; seed0399 @10157;
  seed0014 49495 held.
- Next: D-0731 C-state which 2 cells; or D-0708 @49039.

## 2026-07-19 — #815 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no js/ change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; suite **36/44**; Scr **7926**/11405;
  RNG **527503**/792838 (66.53%); speed `37+0.18/turn` (R² 0.794).
  Δ vs #810: Scr +0, RNG +189; seed0399 10359→10389 still @10157.
- Next: D-0731 C-state omit @10157; or D-0708 @49039; prefer shared.

## 2026-07-19 — #814 mfndpos onscary/garlic/bars/gas (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); port deferred mfndpos arms.
- C locus: `mon.c` `mfndpos`; `monmove.c` `onscary`.
- Change: mconf/`!mcansee` flags; IRONBARS; poison-gas; onscary (scare/
  Elbereth/altar-vamp); garlic. Falsified: these arms drop cnt in JS
  state @miss (still 7); j=2 mtrack → same 10217 arity-only.
- Verification: green+strict PASS; cohort 6/6; seed0399 still @10157
  (positional 10389); seed0014 @49039 held.
- Next: C-state omit of 2 cells; temple/`worm_cross`; or D-0708.

## 2026-07-19 — #813 seed0399 mfndpos pair sharpen (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); identify C’s 2 omits.
- C locus: `mon.c` `mfndpos` (deferred onscary/gas/worm_cross/bars).
- Change: none (DIAG/PROBE only; reverted). Falsified: WEB required in
  the omit pair; pair ID via max-prefix (all keep-track pairs →10217).
  Track cell (59,13) must stay for arity rn2. Omit ∈6 non-track.
- Verification: green+strict PASS; seed0399 still @10157; no js/ diff.
- Next: C-state / deferred mfndpos arms; or D-0708 @49039.

## 2026-07-19 — #812 unicorn NOTONL + fail-tele (D-0731)
- Objective: seed0399 @10157 m_move track rn2(20) vs rn2(28).
- C locus: `mon.c` `mon_allowflags` NOTONL; `monmove.c` unicorn
  fail-move `rn2(2)`+`rloc`; `teleport.c` `rloc_to` `mon_track_clear`.
- Change: port those three. Falsified: NOTONL fixes this miss (mux=47,9
  no online neigh). DIAG: black unicorn cnt=7 vs C need 5; FORCE_EXCL
  any 2 of 7 → prefix 10217.
- Verification: green+strict PASS; cohort prior PASS held; seed0399
  still @10157; seed0014 @49039 held.
- Next: which 2 mfndpos cells C drops (WEB+?); or D-0708.

## 2026-07-19 — #811 max_passive_dmg AD_ACID (D-0730)
- Objective: CURRENT primary; pivoted seed0399 after D-0708 cell stall.
- C locus: `mondata.c` `max_passive_dmg`; `dogmove.c` ALLOW_M balk.
- Change: elemental AD_ACID/FIRE/COLD/ELEC + HUGS/ENGL/TENT multi2;
  fix AD_ACID=8 (was wrongly AD_DRDX). Falsified D-0708: kickedloc this
  turn; (22,10) is ROOM on C DEC screen.
- Verification: green+strict PASS; seed0399 **10145→10157** RNG
  **10359**/11409; cohort 6/6 prior PASS held; seed0014 unchanged.
- Next: seed0399 @10157 m_move rn2(20) vs rn2(28); or D-0708.

## 2026-07-19 — #810 score + Sokoban wall DEC gate (D-0729)
- Objective: mandatory full `sessions` (#810÷5) + seed0108 wall color after ^V.
- C locus: `display.c` `wallcolors[]` / `wall_color` / Sokoban cmap walls.
- Change: `wall_glyph` Sokoban `CLR_BLUE` only when `use_decgraphics()`;
  ASCII ^V→soko1 stays GRAY→NO_COLOR (D-0729).
- Verification: green+strict PASS; seed0108 **PASS** 303/303; seed0373
  PASS; cohort 34/34; full suite **36**/44 Scr **7926** RNG **527314**.
- Next: D-0708 seed0014 @49039; or hallu/coverage.

## 2026-07-19 — #809 #herecmdmenu self menu (D-0728)
- Objective: seed0108 @280 `#herecmdmenu` "What do you want to do?".
- C locus: `cmd.c` `doherecmdmenu` / `here_cmd_menu` / `there_cmd_menu_self`.
- Change: EXT_CMDS → self NHW_MENU + CQ_CANNED act_on_act; treat JS `'\0'`
  as ECMD_OK like C NUL (D-0728).
- Verification: green+strict PASS; seed0108 Scr **292→293** RNG FULL;
  cursors FULL; cohort green+0106+0116+0398+quest PASS.
- Next: wall color after ^V; remaining 10 seed0108 screens.

## 2026-07-19 — #808 doopen + doforce ynq q + xname named (D-0727)
- Objective: seed0108 @216 open dir / #force ynq / Mjollnir bash More.
- C locus: `lock.c` `doopen`/`doopen_indir`; `ynq` def `q`; `objnam.c` xname.
- Change: wire `o`→doopen getdir; doforce ynq `'q'`; xname ` named ONAME`
  (D-0727).
- Verification: green+strict PASS; seed0108 Scr **287→292** RNG FULL;
  prefix **216→280**; cohort 33/33 PASS.
- Next: @280 `#herecmdmenu` "What do you want to do?".

## 2026-07-19 — #807 doloot nohands + #untrap + newman (D-0726)
- Objective: seed0108 @176 nohands chest / #untrap / newman wording.
- C locus: `pickup.c` `doloot`/`u_handsy`; `trap.c` `could_untrap`;
  `polyself.c` `newman` + `role.c` `individual`.
- Change: nohands loot gate; EXT_CMDS `#untrap`; human `individual.m`
  → "new man" (D-0726).
- Verification: green+strict PASS; seed0108 Scr **283→287** RNG FULL;
  prefix **176→216**; cohort 33/33 PASS.
- Next: @216 locked `#loot` yy → C `In what direction?`; doforce ynq `(q)`.

## 2026-07-19 — #806 polymon breath tip + dobreathe (D-0725)
- Objective: seed0108 remaining screens after D-0724 Fly (@110 More).
- C locus: `polyself.c` polymon verbose tips; `dobreathe`; `cmd.c`
  `domonability` `can_breathe`.
- Change: breath tip after encumber; dobreathe Strangled/uen<15 (D-0725).
- Verification: green+strict PASS; seed0108 Scr **280→283** RNG FULL;
  prefix **110→176**; cohort 33/33 PASS.
- Next: @176 nohands chest; or #untrap; newman "new man".

## 2026-07-19 — #805 score refresh + FROMFORM FLYING (D-0724)
- Objective: mandatory full `sessions` score (#805÷5) + seed0108 @109 Fly.
- C locus: `polyself.c` `set_uasmon` PROPSET(FLYING).
- Change: `propset_fromform(FLYING,…)` on uprops + HFlying (D-0724).
- Verification: green+strict PASS; seed0108 Scr **187→280** RNG FULL;
  cohort PASS; full suite **35/44** Scr **7901**/11405 RNG **527316**/792838
  (66.51%; Δ vs #800 Scr +206 RNG +13675).
- Next: seed0108 remaining 23 screens / rest PROPSET; or D-0708.

## 2026-07-19 — #804 seed0108 Upolyd display + #monster (D-0722/23)
- Objective: seed0108 @78 `#polyself` gnome cloak More / glyph / botl.
- C locus: `polyself.c` polymon/break_armor; `botl.c`; `display.h`
  hero_glyph; `hack.c` weight_cap Upolyd; `cmd.c` domonability.
- Change: Upolyd botl/glyph/weight_cap; polymon encumber_msg;
  setworn skip_find_ac + defer find_ac past More (D-0722);
  EXT_CMDS `#monster`/domonability reflexive (D-0723).
- Verification: green+strict PASS; seed0108 Scr **156→187** RNG FULL;
  prefix **78→109**; cohort 33/33 PASS.
- Next: @109 red-dragon poly botl `Fly` (set_uasmon FROMFORM FLYING).

## 2026-07-19 — #803 seed0108 throw self + cream Blind (D-0720/21)
- Objective: seed0108 first screen misses after RNG FULL (Scr 148).
- C locus: `cmd.c` getdir SELF; `dothrow.c` throw_obj self refuse;
  `potion.c` make_blinded/`toggle_blindness` vision_recalc.
- Change: getdir `.`/`s` → self + throw_obj refuse pline (D-0720);
  cream-pie make_blinded on sight toggle → vision_recalc(0) (D-0721).
- Verification: green+strict PASS; seed0108 Scr **148→156** RNG FULL;
  cohort 14/14 PASS.
- Next: seed0108 @78 `#polyself` gnome cloak More / glyph / botl.

## 2026-07-19 — #802 seed0108 #tip (D-0719)
- Objective: seed0108 @3564 C `getbones` `rn2(3)` vs JS `rn2(5)`.
- C locus: `pickup.c` `dotip`/`tipcontainer`; `allmain.c` unmul→deferred_goto.
- Change: `#tip` was unknown → ynq `q` leaked → phantom walks before ^V;
  port floor `dotip` ynq + tipcontainer floor spill; register EXT_CMDS;
  unmul→deferred_goto.
- Verification: green+strict PASS; seed0108 RNG **FULL** 16958 Scr
  **110→148**; cohort 33/33 PASS.
- Next: seed0108 first screen miss @148.

