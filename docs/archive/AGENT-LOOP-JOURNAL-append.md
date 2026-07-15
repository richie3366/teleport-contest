## 2026-07-15 01:26 — #364 D-0340/0341 invent show-* + DEL terrain

- Objective: seed0013-restore @64 `[` doprarm (CURRENT primary).
- C locus: `invent.c` doprarm/doprring/dopramulet/doprtool;
  `cmd.c` `\177`→doterrain.
- Change: worn/empty show-* plines + binds (D-0340); bind DEL to existing
  `doterrain` (D-0341).
- Verification: Scr **69→75**/99; first miss `@71` reveal_terrain still
  paints `@`/`f` vs C `~`; RNG full; green+strict; 21 PASS cohort.
- Next: `@71` `reveal_terrain` TER_MAP hide monsters/objects.

