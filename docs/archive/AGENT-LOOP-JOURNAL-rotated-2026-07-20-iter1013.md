# Rotated journal crumbs

## 2026-07-20 14:40 — #999 m_dowear_type nambuf Monnam (D-0855)
- Objective: name C caller of 7×rndmonnam after fleeck @16751 / LCP 555.
- C locus: worn.c m_dowear_type nambuf; mon.c movemon_singlemon I_SPECIAL.
- Diagnosis: C backtrace rndmonnam←mon_nam←m_dowear_type←m_dowear←
  movemon_singlemon (soldier re-equip after gnome turn). Not fleeck.
- Change: JS m_dowear_type evaluates See_invisible?Monnam:mon_nam at entry.
- Verification: seed0383 Scr **209**/219 RNG FULL; green+strict PASS;
  cohort 8/8.
- Next: remaining Scr @209+; wear/invis plines still deferred.

## 2026-07-20 14:25 — #998 LCP 555 fleeck monflee falsified (D-0854)
- Objective: seed0383 LCP 555 C Monnam(430) vs JS mon(383) @199.
- C locus: probed; not distfleeck→monflee (monmove.c:564 would burn
  core rnd before Monnam).
- Falsified: after core 16751 (2nd fleeck post m_move rn2(24)) C emits
  7×rndmonnam with zero core before next fleeck; site tag is stale
  last-core. JS next display = postmov mon_glyph@16754. No JS change.
- Verification: green+strict PASS; seed0383 Scr 201 RNG FULL; LCP 555.
- Next: identify C caller of Monnam×7 post-2nd-fleeck (pline/state dump).

