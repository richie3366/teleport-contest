# Rotated from AGENT-LOOP-JOURNAL.md @#1239

## 2026-07-21 23:41 — #1222 D-0953 pool-lava + vault_gd_watching

- Objective: map-driven — `floorfood` pool/lava reach gate +
  `vault_gd_watching(GD_EATGOLD)` + gd_move witness verbalize.
- C locus: `eat.c` `floorfood` / `eatspecial`; `vault.c`
  `vault_gd_watching` / `gd_move` witness.
- Change: skipfloor Wwalking/clinger/(Flying&&!Breathless) in
  `eat.js`; export `vault_gd_watching` + consume/destroy pline in
  `vault.js`; wire coin eatspecial (D-0953). Deferred: dig
  furniture_handled / HOLE goto_level; unturn/hero_breaks/ABON;
  Ring_gone/float_up/rescham/choke.
- Verification: green+strict; eat/vault/pool cohort 14/14 PASS
  (incl. seed0012 vault escort, seed0009 swimmer, seed1800 eat).
  Suite fortress held (no full cadence; next @#1225).
- Next: dig `furniture_handled` / HOLE `goto_level`; unturn/
  hero_breaks / worn ABON; Ring_gone cluster.

