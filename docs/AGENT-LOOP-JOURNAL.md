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

## 2026-07-20 16:05 — #1008 D-0731 C poss[] DIAG; mon drift
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos (recorder DIAG); mon positions.
- Change: none in scored js/. Fixed Darwin install sysconf
  (GDBPATH/GREPPATH comment + WIZARDS=*) for recorder rerecord.
  C DIAG: unicorn cnt=5; MON_AT elf×2 + spider; JS elves/spider
  drifted NW while unicorn matched. Falsified ROOM/trap/online omit.
- Verification: green+strict PASS; seed0399 still @10157; C rerecord
  RNG bit-equal to canonical (11409).
- Next: first silent coord diverge of PM_ELF_NOBLE / PM_GIANT_SPIDER;
  or D-0708; score @#1010.

## 2026-07-20 15:51 — #1007 D-0731 DIAG; falsify FORCE→namedesc
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos; monmove.c m_move track skip.
- Change: none shipped. DIAG reconfirmed unicorn @58,12 cnt=7
  ROOM×7 spider@57,12 WEB+sack@58,13; no engr/online. Falsified
  FORCE→namedesc@10217 as next peel (key desync; JS identify
  rn2(181) vs C rn2(31) not comparable).
- Verification: green+strict PASS; seed0399 still @10157;
  no js/ production change.
- Next: C recorder poss[] DIAG (sysconf in install); or D-0708;
  score @#1010.

## 2026-07-20 15:36 — #1006 monflee mon_track_clear (D-0860)
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: monmove.c monflee always mon_track_clear; callers music/uhitm/fountain.
- Change: wire mon_track_clear (export + monflee + music/uhitm/fountain).
  DIAG: unicorn @58,12 cnt=7 j=0 mtrack=[59,13]; (57,12) MON_AT mhp34;
  open ROOM×7; FORCE-pair ID still needs C-state (track clear inert here).
- Verification: green+strict PASS; cohort 1500/1800/0383/0398/0108/0013 PASS;
  seed0399 still @10157 rn2(28)vs rn2(20).
- Next: C-state which 2 of 7 cells; or namedesc rn2(31)vs181 after arity;
  D-0708; score @#1010.

## 2026-07-20 15:28 — #1005 full public score refresh
- Objective: mandatory score (iteration % 5 == 0).
- C locus: n/a (docs-only score cadence).
- Change: full `sessions` → **39/44** PASS; Scr **9021**/11405;
  RNG **666643**/792838 (84.08%); speed `33+0.23/turn` (R² 0.825).
  Δ vs #1000: Scr +10, RNG 0, PASS +1 (seed0383). Non-PASS unchanged
  (0014/0399/2200/2600/4500).
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0399 @10157 needs C-state which 2 mfndpos cells (D-0731);
  or D-0708; next score @#1010.

## 2026-07-20 15:25 — #1004 unicorn noteleport_level + D-0731 DIAG
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: teleport.c noteleport_level; mon.c mon_allowflags;
  monmove.c m_move avoid / dochug mflee tele.
- Diagnosis: unicorn @58,12 open ROOM; spider excludes 1; FORCE any
  keep-track 2-omit →10217 (WEB not unique); next namedesc rn2(31)
  vs rn2(181). No JS-visible reason for which 2 C drops.
- Change: D-0859 wire noteleport_level (C fidelity; inert on maze).
- Verification: green+strict PASS; cohort 0383/0398/1500/1800 PASS;
  seed0399 still @10157.
- Next: C-state which 2 mfndpos cells; or D-0708; score @#1005.
