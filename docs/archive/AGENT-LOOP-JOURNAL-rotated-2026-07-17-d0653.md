## 2026-07-17 14:35 — #710 score 34/44 + D-0638 intemple partial
- Objective: mandatory #710 full `sessions` score; seed0367 @3282 intemple.
- C locus: priest.c intemple; hack.c check_special_room TEMPLE; do.c
  goto_level check_special_room leave/arrive.
- Change: js/priest.js intemple+helpers; hack TEMPLE dispatch; do.js
  leave+arrive check_special_room. Falsified "missing body alone" —
  Pri-strt has no MAGIC_PORTAL so hero rndspots outside TEMPLE.
- Verification: suite **34/44** Scr **6918**/11405 RNG **418252**/792838
  (52.75%) `32+0.16/turn`; green+strict PASS; seed0367 still @3282.
- Next: Pri-strt branch/MAGIC_PORTAL so arrival enters TEMPLE.
