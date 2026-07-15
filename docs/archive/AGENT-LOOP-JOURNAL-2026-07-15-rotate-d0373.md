# Rotated journal entries

## 2026-07-15 06:06 — D-0362 #loot use_container (seed0012 @3152)
- Objective: seed0012 @3152 C dog_move rn2(1) vs JS rn2(3).
- C locus: pickup.c doloot/use_container; end.c container_contents.
- Change: EXT_CMDS loot + doloot `:` look/ESC (D-0362). Root cause was
  hero (4,6) vs C (3,5) after missed timed #loot — not dog_move appr.
- Verification: prefix 3152→3204 (xkilled); green+strict; cohort 24 PASS.
- Next: seed0012 @3204 C xkilled rn2(6) vs JS rn2(25).
