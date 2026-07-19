# Rotated from AGENT-LOOP-JOURNAL.md (#650 score cadence)

Older crumbs moved during mandatory #650 formal score refresh.

## 2026-07-16 23:45 — #641 D-0578 kitten m_move cnt diag
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: monmove.c m_move:1963; mon.c mfndpos.
- Falsified: other-mon / missing pass1 fleeck (2780 = same kitten
  post-move distfleeck). Diagnosed: hostile PM_KITTEN; JS cnt=7 at
  (32,4) after matched first move; C wants cnt-j=4.
- Verification: green+strict PASS; seed5006 still 13814/13923 Scr 192.
- Next: prove C dest after first move or mfndpos cnt; or seed0116.
## 2026-07-16 23:28 — #640 score + familiar_level_msg (D-0577)
- Objective: mandatory #640 full `sessions` score; seed5006 gameplay.
- C locus: bones.c cemetery/`bones_include_name`; do.c
  `familiar_level_msg`/`goto_level` familiar.
- Change: persist cemetery who[]; familiar_level_msg after splev;
  debug plname≡wizard matches across segments. False lead: rng-diff
  seg0-only (@11026 was seg1 start).
- Verification: suite **31/44** Scr **6473** RNG **358954** (45.27%);
  seed5006 Scr 182→192 seg1 2777→2782; green+strict PASS; cohort PASS.
- Next: seed5006 seg1 @2782 m_move rn2(16) vs rn2(28); or seed0116.
## 2026-07-16 23:25 — #639 death-ray self-zap / bones debug (D-0576)
- Objective: seed5006 can_make_bones rn2(1) @10953.
- C locus: zap.c zapyourself WAN_DEATH; cmd.c getdir→confdir;
  bones.c can_make_bones !wizard.
- Change: port death-ray self-zap → done(DIED); getdir_zap confdir;
  can_make_bones treats flags.debug as wizard (playmode:debug).
- Verification: seed5006 seg0 10953→11026 FULL Scr 174→182;
  positional 13812/13923; green+strict PASS; cohort 29/29 PASS.
- Next: seed5006 seg1 randomize_gem_colors @11026; or seed0116 residual.
## 2026-07-16 23:15 — #638 confused level_tele (D-0575)
- Objective: seed5006 level_tele rnl(5) @8473.
- C locus: read.c seffect_teleportation; teleport.c level_tele /
  random_teleport_level; dungeon.c single_level_branch.
- Change: cursed/confused scroll → level_tele; port
  random_teleport_level; Confusion/`*`/involuntary use it.
- Verification: seed5006 8473→10953 Scr 154→174; green+strict PASS;
  cohort 29/29 PASS.
- Next: seed5006 can_make_bones rn2(1) @10953; or seed0116 residual.
## 2026-07-16 23:10 — #637 setworn oc_oprop (D-0574)
- Objective: seed5006 dosounds @8468 (C rn2(400) vs JS rn2(100)).
- C locus: worn.c setworn oc_oprop; youprop.h Regeneration; allmain
  U_CAN_REGEN/regen_hp.
- Change: extract oc_oprop; setworn/takeoff extrinsic; u_can_regen
  reads uprops[REGENERATION]. Symptom was missing Regeneration after
  wishing clay ring, not dosounds.
- Verification: seed5006 8468→8473 Scr 121→154; green+strict PASS;
  cohort PASS held.
- Next: seed5006 level_tele rnl(5) @8473; or seed0116 residual.
## 2026-07-16 23:03 — #636 wizard ^X Attributes (D-0573)
- Objective: seed0373 @119 Attributes / wizard MAGICENLIGHTENMENT.
- C locus: insight.c doattributes/attributes_enlightenment/status;
  attrib.c from_what/is_innate; hack.c weight_cap Is_airlevel→MAX.
- Change: invent.js wizard|discover MAGIC + status `<%d>` + Attributes
  subset + Air weight_cap MAX; attrib.js from_what/is_innate.
- Verification: seed0373 Scr 123→124/124 **PASS**; green+strict PASS;
  cohort 28/28 PASS.
- Next: seed5006 dosounds @8468; or seed0116 residual 114/127.
## 2026-07-16 22:57 — #635 formal score refresh
- Objective: mandatory #635 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6401**/11405, RNG **353648**/792838 (44.61%), `31+0.15/turn`
  (R² 0.772). Δ vs #630: Scr +23, RNG 0 (D-0569…D-0572), PASS same;
  seed0116 113→114.
- Next: seed0373 @119 Attributes; or seed5006 dosounds @8468.

## 2026-07-19 — #799 seed0108 set_mon_data umov prorate (D-0717)
- Objective: seed0108 @3011 post-invoke EOT loopAgain (CURRENT primary).
- C locus: `mondata.c` `set_mon_data`; `polyself.c` `set_uasmon`.
- Change: hero `u.umovement` prorate when new form slower (wizard→gnome→6
  kept through dragon); `set_uasmon` + shared `were.js` path.
- Verification: green+strict PASS; prefix **3011→3186** RNG **3283**;
  cohort prior PASSes held.
- Next: @3186 C `newman` `rn2(10)` vs JS `rn2(6)`.

## 2026-07-19 — #800 score (mandatory ÷5)
- Objective: full public `sessions` score (iteration % 5 == 0).
- Score: **35/44** Scr **7695**/11405 RNG **513641**/792838 (64.79%)
  `36+0.18/turn` R² 0.785. Δ vs #795: Scr +16, RNG +352.
- Notable: seed0108 3283/16958 Scr 74 (prefix 3186 held); seed0014
  49495/575; seed2200 229/230 parked.
- Verification: green+strict PASS; no js/ change this iteration.
- Next: seed0108 @3186 C `newman` `rn2(10)` vs JS `rn2(6)` (D-0717).
