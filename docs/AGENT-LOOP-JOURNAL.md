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

## 2026-07-20 17:45 — #1021 D-0871 MUSE_POT_SPEED mquaffmsg
- Objective: seed0399 @113 puton prinv missing `--More--`.
- C locus: `muse.c` `use_misc` MUSE_POT_SPEED; `worn.c` `mon_adjust_speed`.
- Change: await `mquaffmsg` before speed adjust; async give_msg pline
  + `learnwand`; `castmu` awaits `mon_adjust_speed`.
- Verification: green+strict PASS; seed0399 Scr **525→530** (RNG/cursors
  FULL); cohort 7/7 PASS.
- Next: @300 `a`/`the` silver bell; @483 Hallu dwarf lord/lady.

## 2026-07-20 17:36 — #1020 full public score refresh
- Objective: mandatory score cadence (iteration % 5 == 0).
- C locus: n/a (docs-only).
- Change: full `sessions` — **39/44** PASS; Scr **9433**/11405
  (+96 vs #1015); RNG **667614**/792838 (84.21%, +273); speed
  `32+0.24/turn` (R² 0.841). seed0399 Scr 525 RNG FULL; first miss
  @113 puton prinv missing `--More--`.
- Verification: green+strict PASS; suite exit 0.
- Next: seed0399 @113 puton/on_msg More; alt @300/@483; or D-0708;
  score @#1025.

## 2026-07-20 17:34 — #1019 D-0870 adjattrib encumber_msg
- Objective: seed0399 Scr 522/532 poison trailing — C poison--More-- vs
  JS poison+weaker combined.
- C locus: attrib.c adjattrib in_moveloop STR/CON encumber_msg;
  allmain.c moveloop_preamble in_moveloop=1.
- Change: set in_moveloop at preamble end; adjattrib awaits encumber_msg
  for STR/CON (closes D-0449 deferral). Forces More before poisontell.
- Verification: green+strict PASS; seed0399 Scr **522→525**; RNG FULL;
  cohort 37/37.
- Next: seed0399 @113 puton prinv missing --More--; alt @300/@483;
  or D-0708; full score @#1020.

## 2026-07-20 17:30 — #1018 D-0869 poisoned/poisontell
- Objective: seed0399 @11152 C poisoned d(2,2) vs JS rn2(30)-only stub.
- C locus: attrib.c poisoned/poisontell; uhitm mhitm_ad_drst → poisoned.
- Change: port poisoned arms + poisontell; wire mhitu AD_DRST/DRDX/DRCO
  with mpoisons_subj reason. Not a knockback order bug.
- Verification: green+strict PASS; seed0399 RNG **FULL 11409**; Scr
  **502→522**; cohort 37/37.
- Next: seed0399 Scr 522/532 trailing screens; alt seed0014 @50259.

## 2026-07-20 17:22 — #1017 D-0868 done Lifesaved
- Objective: seed0399 @10729 C exercise rn2(19) vs JS distfleeck rn2(5).
- C locus: end.c done Lifesaved; makeknown→discover_object→exercise.
- Change: port Lifesaved arm (messages, makeknown, useup amulet,
  adjattrib CON−1, savelife). Not a mid-hit exercise/order bug.
- Verification: green+strict PASS; prefix **10729→11152** Scr
  **442→502**; cohort 10/10.
- Next: seed0399 @11152 C poisoned d(2,2) attrib-loss arm.

## 2026-07-20 17:16 — #1016 D-0867 thitmonst tmiss
- Objective: seed0399 @10697 C `tmiss` rn2(3) vs JS rn2(100).
- C locus: `dothrow.c` `tmiss` / `thitmonst` else; armor throw of
  gray dragon scale mail at soldier ant.
- Change: port `tmiss` + food-fail `tmiss(FALSE)` + else `tmiss(TRUE)`.
  Cause was silent miss → `breaktest`/`obj_resists`.
- Verification: green+strict PASS; prefix **10697→10729** Scr
  **429→442**; cohort 16/16 (throw seeds incl.).
- Next: seed0399 @10729 C `exercise` rn2(19) vs JS `distfleeck` rn2(5).

## 2026-07-20 17:09 — #1015 score + D-0866 trapeffect_web
- Objective: mandatory full score @#1015; seed0399 @10581
  C mintrap rn2(40) vs JS rn2(20).
- C locus: `trap.c` `trapeffect_web` / `mu_maybe_destroy_web`;
  selector WEB case. Symptom was missing mon `mtrapped` on WEB.
- Change: port mon web catch/tear + destroy/flow; wire selector.
  Score: **39/44** Scr **9337**/11405 RNG **667341**/792838
  (84.17%); speed `32+0.23/turn`. Δ vs #1010 Scr+273 RNG+806.
- Verification: green+strict PASS; prefix **10581→10697** Scr
  **409→429**; cohort 10/10; full sessions post-fix.
- Next: seed0399 @10697 C `tmiss` rn2(3) vs JS rn2(100).

## 2026-07-20 17:05 — D-0865 may_dig flags|wall_info
- Objective: seed0399 @10382 C `mdig_tunnel` rnd(12) vs JS rn2(6).
- C locus: `hack.c` `may_dig` (`wall_info`≡`flags`); `mon.c` `mfndpos`
  peaceful shop/temple dig avoid; symptom was extra diggable HWALL.
- Change: `rm_wall_info` OR in dig.js + may_passwall; port mfndpos
  intelligent peaceful dig avoid. Root: W_NONDIGGABLE on `flags`,
  WM_MASK on `wall_info`.
- Verification: green+strict PASS; prefix **10382→10581** Scr 409;
  cohort 10/10 PASS.
- Next: seed0399 @10581 C `mintrap` rn2(40) vs JS rn2(20).

## 2026-07-20 16:50 — D-0864 obj_resists invocation skip rn2
- Objective: seed0399 @10309 C dog_move rn2(1) vs JS rn2(100).
- C locus: `zap.c` `obj_resists` Bell/Book/Amulet/Candelabrum/Rider
  return TRUE with no rn2; `dog.c` `dogfood` `is_quest_artifact`.
- Change: port early-return + quest-arti short-circuit in `dogmove.js`.
  Invent wished Bell caused the extra invent-scan rn2.
- Verification: green+strict PASS; prefix **10309→10382** Scr **407→409**;
  cohort 37/37 PASS.
- Next: seed0399 @10382 C `mdig_tunnel` rnd(12) vs JS rn2(6).

## 2026-07-20 16:40 — D-0863 hold_another_object encumber_msg
- Objective: seed0399 @10269 C gethungry rn2(20) vs JS rnd(20).
- C locus: `invent.c` `hold_another_object` → `encumber_msg` after prinv.
- Change: call encumber_msg after stay-in-invent prinv. Symptom was
  key desync: missing --More-- let `#wizintrinsic` run → `t` threw.
- Verification: green+strict PASS; prefix **10269→10309** Scr **392→407**;
  cohort 37/37 PASS.
- Next: seed0399 @10309 C `dog_move` rn2(1) vs JS rn2(100).

## 2026-07-20 16:30 — D-0862 makesingular / gold / SCR_MAIL
- Objective: seed0399 @10217 `rnd_otyp_by_namedesc` rn2(31) vs rn2(181).
- C locus: `objnam.c` `makesingular`/`readobjnam` gold; `mkobj.c`
  SCROLL `!= SCR_MAIL` blessorcurse.
- Change: port makesingular (+as_is); gold early-return; wizard quan;
  SCR_MAIL skip blessorcurse. as_is required (boots/gloves).
- Verification: green+strict PASS; prefix **10217→10269** Scr **156→392**;
  seed0360/5006/0398/5002/0108/0383 PASS.
- Next: seed0399 @10269 C `gethungry` rn2(20) vs JS rnd(20).

## 2026-07-20 16:20 — #1010 full public score refresh
- Objective: mandatory score cadence (iteration % 5 == 0).
- C locus: n/a (docs-only).
- Change: full `sessions` — **39/44** PASS; Scr **9064**/11405
  (+43 vs #1005); RNG **666535**/792838 (84.07%, −108); speed
  `32+0.25/turn` (R² 0.846). seed0399 Scr 156 @10217 namedesc.
- Verification: green+strict PASS; suite exit 0.
- Next: seed0399 @10217 `rnd_otyp_by_namedesc` C rn2(31) vs JS
  rn2(181); or D-0708; score @#1015.

## 2026-07-20 16:14 — #1009 D-0861 Is_container; D-0731 closed
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731 mon drift).
- C locus: muse.c searches_for_item TOOL Is_container.
- Change: port Is_container / Is_mbag / !olocked in js/muse.js.
  First diverge @n=10109: C gg=sack(58,13) vs JS tripe(54,11).
- Verification: green+strict PASS; seed0399 **10157→10217** Scr
  **113→156**; cohort 1500/1800/0060/0108/0373/0398/0383/0102/0700 PASS.
- Next: seed0399 @10217 rnd_otyp_by_namedesc rn2(31)vs rn2(181);
  or D-0708; score @#1010.
