# Rotated from AGENT-LOOP-JOURNAL (#1026)

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
