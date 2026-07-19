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

## 2026-07-19 — #801 seed0108 newman (D-0718)
- Objective: seed0108 @3186 C `newman` `rn2(10)` vs JS `rn2(6)`.
- C locus: `polyself.c` `newman`/`polyman`/`change_sex`; `attrib.c`
  `redist_attr`; `exper.c` `rndexp`.
- Change: port newman envelope (level rn1, sex rn2(10), rndexp,
  redist_attr, HP/EN rebuild, hunger) + polyman restore; wire gate.
- Verification: green+strict PASS; prefix **3186→3564** RNG **3572**
  Scr **110**; cohort 33/33 PASS.
- Next: @3564 C `getbones` `rn2(3)` vs JS `rn2(5)`.

## 2026-07-19 — #800 score (mandatory ÷5)
- Objective: full public `sessions` score (iteration % 5 == 0).
- Score: **35/44** Scr **7695**/11405 RNG **513641**/792838 (64.79%)
  `36+0.18/turn` R² 0.785. Δ vs #795: Scr +16, RNG +352.
- Notable: seed0108 3283/16958 Scr 74 (prefix 3186 held); seed0014
  49495/575; seed2200 229/230 parked.
- Verification: green+strict PASS; no js/ change this iteration.
- Next: seed0108 @3186 C `newman` `rn2(10)` vs JS `rn2(6)` (D-0717).

## 2026-07-19 — #799 seed0108 set_mon_data umov prorate (D-0717)
- Objective: seed0108 @3011 post-invoke EOT loopAgain (CURRENT primary).
- C locus: `mondata.c` `set_mon_data`; `polyself.c` `set_uasmon`.
- Change: hero `u.umovement` prorate when new form slower (wizard→gnome→6
  kept through dragon); `set_uasmon` + shared `were.js` path.
- Verification: green+strict PASS; prefix **3011→3186** RNG **3283**;
  cohort prior PASSes held.
- Next: @3186 C `newman` `rn2(10)` vs JS `rn2(6)`.

## 2026-07-19 — #798 seed0108 wipe Blind sticky (D-0716)
- Objective: seed0108 @3011 after `#invoke` spaces (CURRENT primary).
- C locus: `potion.c` `make_blinded`/`toggle_blindness`; `youprop.h` Blind;
  `do.c` `wipeoff`.
- Change: Blind/`hero_Blind`/`vision_recalc` ≡ props not sticky;
  wipe `make_blinded` syncs `u.Blind` + `vision_recalc(0)` on toggle.
  Falsified: global `rest_on_space` (already). More restored; umov still short.
- Verification: green+strict PASS; prefix still **3011**; cohort
  seed1500/1800/0060 PASS; screens 58→74 on seed0108 runner.
- Next: @3011 C post-EOT `movemon` (umov<12 loopAgain) vs JS umov=15.

## 2026-07-19 — #797 seed0108 #invoke (D-0715)
- Objective: seed0108 @2958 distfleeck vs rn2(36) (CURRENT primary).
- C locus: `artifact.c` `doinvoke`/`arti_invoke`; `cmd.c` `"invoke"`.
- Change: EXT_CMDS `#invoke`→`doinvoke`; Mjollnir !inv_prop →
  nothing_happens+ECMD_TIME; `rest_on_space` space→donull branch.
  Falsified: force ROS=true (@2869 More regression).
- Verification: green+strict PASS; seed0108 **2958→3011**; cohort 33/33.
- Next: @3011 post-invoke spaces before chest wish (More vs wait).

## 2026-07-19 02:18 — #796 D-0714 polymon drop_weapon
- Objective: seed0108 @2881 obj_resists short (CURRENT primary).
- C locus: `polyself.c` `polymon`→`drop_weapon(1)` (`cantwield`).
- Change: port `drop_weapon` after `break_armor` (magic lamp→floor;
  "drop your tool!"). Not missing dog_goal invent scan.
- Verification: green+strict PASS; seed0108 **2881→2958**; cohort 33/33.
- Next: @2958 distfleeck rn2(5) vs rn2(36); or D-0708.

## 2026-07-19 02:08 — #795 score (mandatory ÷5)
- Objective: full public score refresh (iteration 795).
- Score: **35/44** Scr **7679**/11405 RNG **513289**/792838 (64.74%)
  `37+0.18/turn` (R² 0.786). Δ vs #790: Scr +25, RNG +75
  (D-0710…D-0713 peels).
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0108 @2881 C `obj_resists` rn2(100) vs JS rn2(12); or D-0708.
