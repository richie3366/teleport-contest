# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-17 09:40 — #666 D-0597 mfndpos pool/lava (not @7973)
- Objective: seed0361 `m_move` @7973 C `rn2(20)` vs JS `rn2(32)`.
- C locus: `mon.c` `mfndpos` poolok/lavaok / `IS_WATERWALL`; `mon_allowflags` `ALLOW_WALL`.
- Change: ported those gates + passes_walls `ALLOW_WALL`. **Falsified** as @7973 cause — mountain centaur @(71,5) open ROOM cnt=8, mtrack[0]=(72,4).
- Verification: green+strict PASS; cohort 8/8 PASS; seed0361 still prefix 7973 Scr 195.
- Next: remaining mfndpos rejects (onscary/garlic/squeeze/bars/gas/mm_aggression) or C map/mtrack dump.

