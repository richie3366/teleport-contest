## 2026-07-16 19:43 — #606 D-0546 m_initinv S_MUMMY
- Objective: peel seed0373 @25869 C `m_initinv` `rn2(7)` vs JS
  trailing `rn2(50)`.
- C locus: `makemon.c` `m_initinv` S_MUMMY (~772).
- Change: `js/makemon.js` `case 'S_MUMMY': if (rn2(7)) mongets(MUMMY_WRAPPING)`.
- Verification: rng-diff **25869→29189**; runner RNG **29214**/35386
  Scr 22; green+strict PASS; cohort **30**/30 PASS.
- Next: nhlib shuffle `rn2(3)` @29189; or dosounds @8468.
```
