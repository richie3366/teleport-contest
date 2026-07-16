## 2026-07-16 06:20 — #498 D-0460 look_here doname_with_price
- Objective: seed0002 screen@342 C `You see here a banded mail
  (for sale, 68 zorkmids).` vs JS bare banded mail.
- C locus: `invent.c` `look_here`; `objnam.c` `doname_with_price`;
  `shk.c` `get_cost_of_shop_item` / `inside_shop`.
- Change: `js/shk.js` — roomno `inside_shop`, `get_obj_location`
  subset, `get_cost_of_shop_item`, `doname_with_price`.
  `js/invent.js` `look_here` single+pile. Deferred: unpaid_cost /
  pricequotes / contained_cost.
- Verification: seed0002 @342 matches; first miss @342→@345; Scr
  354→361; RNG full; green+strict; cohort 24/24.
- Next: D-0461 screen@345 doname unpaid on slightload prinv.
