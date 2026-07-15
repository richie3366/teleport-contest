# Rotated journal crumbs (#451 / D-0420)

## 2026-07-15 16:50 — #437 seed0004 @10657 eatcorpse youmonst (D-0409)
- Objective: seed0004 @10657 PRIMARY — C `eatcorpse` `rn2(10)` vs JS
  `distfleeck` after lichen kill/`e`/`y`.
- C locus: `eat.c` `eatcorpse` palatable via `herbivorous(gy.youmonst.data)`.
- Change: `eat.js` `hero_form_data()` (`u.umonnum ?? urole.mnum`) so
  omnivore diet is true and palatable `rn2(10)` is not short-circuited
  when `set_uasmon`/youmonst unset.
- Verification: seed0004 RNG 10685→11027; prefix 10657→10713; miss
  @10713 `exercise` rn2(19) vs rn2(2); green+strict PASS; cohort 25/25.
- Next: seed0004 @10713 post-eat `exerper`/`lesshungry` polarity.
