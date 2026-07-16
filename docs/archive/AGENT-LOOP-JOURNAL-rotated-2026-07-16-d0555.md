## 2026-07-16 19:22 — #601 D-0541 m_initweap is_elf kit
- Objective: peel seed0373 @19071 C `m_initweap` `rn2(2)` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap` `is_elf`; `mondata.h` `M2_ELF`.
- Change: `js/monsters.js` `is_elf`; `js/makemon.js` full S_HUMAN elf kit.
- Verification: rng-diff **19071→21730**; runner RNG **21757**/35386
  Scr 22/124; green+strict; cohort 28/28.
- Next: m_initinv S_QUANTMECH @21730; or dosounds @8468.
