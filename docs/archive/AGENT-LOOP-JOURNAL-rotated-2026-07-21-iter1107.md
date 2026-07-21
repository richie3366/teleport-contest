## 2026-07-21 03:22 — #1093 D-0928 fight_empty remembered I
- Objective: seed4500 @88377 linedup (D-0928).
- C locus: `hack.c` `domove_fight_empty` (I-glyph + !m_at + !nopick).
- Change: Blind Ctrl-j onto remembered `'I'` wastes turn like C;
  `unmap_object`+`newsym`. Place/flip already matched (#1092).
- Verification: prefix **88377→88399**; RNG **89887** Scr **806**;
  green+strict PASS; cohort 7/7.
- Next: @88399 C `corpse_chance` `rn2(2)` vs JS `rn2(6)`.
