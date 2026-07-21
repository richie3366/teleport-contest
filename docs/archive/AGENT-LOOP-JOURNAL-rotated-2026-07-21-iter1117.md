# Rotated from AGENT-LOOP-JOURNAL.md @#1118

## 2026-07-21 04:30 — #1103 polyself NOFLAGS + zap poly + drink empty-getobj
- Objective: seed4500 @100475 C `polyself` `rn2(20)` vs JS `rn2(5)`
  (D-0928).
- C locus: `polyself.c` `polyself`; `zap.c` `zapyourself`/`dozap`;
  `invent.c` `getobj` empty+!PROMPT.
- Change: system-shock + random `rn1(SPECIAL_PM)` in `polyself`;
  `zapyourself` WAN/SPE_POLYMORPH; `dozap` `nohands` before getobj;
  drink getobj short-circuit when no potions.
- Verification: prefix **100475→100699**; RNG **100862** Scr **926**;
  green+strict PASS; cohort 0002/0060/0108/1800 **4/4**.
- Next: @**100699** `rnd_otyp_by_namedesc` vs `rn2(5)`; cadence @#1105.

## 2026-07-21 04:23 — #1102 goodpos youmonst allows u_at (wizard ^T)
- Objective: seed4500 @100421 C `distfleeck` `rn2(5)` vs JS `rnd(79)`
  (D-0928).
- C locus: `teleport.c` `goodpos` / `teleok` / `scrolltele`.
- Change: `goodpos` no longer rejects `u_at` when `mtmp` is
  youmonst / swallowed ustuck / usteed. DIAG: wizard ^T getpos
  self on FOUNTAIN → JS `Sorry`→`safe_teleds`.
- Verification: prefix **100421→100475**; RNG **100613** Scr **926**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: @**100475** `polyself` `rn2(20)` vs `rn2(5)`; cadence @#1105.

## 2026-07-21 04:12 — #1101 water_damage Waterproof before luck rn2(20)
- Objective: seed4500 @100395 C `gush` `rn2(3)` vs JS `rn2(20)`
  (D-0928).
- C locus: `trap.c` `water_damage` / `Waterproof_container`;
  `fountain.c` `gush` → `water_damage_chain`.
- Change: port splash_lit / grease / towel / container arms before
  luck `rn2(20)`; add `Waterproof_container`. DIAG: floor CHEST at
  gush pool cell — C skips luck roll.
- Verification: prefix **100395→100421**; RNG **100477** Scr **926**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: @**100421** `distfleeck` `rn2(5)` vs `rnd(79)`; cadence @#1105.

