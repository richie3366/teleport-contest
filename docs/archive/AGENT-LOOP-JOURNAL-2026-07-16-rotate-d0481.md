# Rotated journal crumbs

## 2026-07-16 07:00 — #505 score + D-0467 invent itemed
- Objective: mandatory #505 full `sessions` score; primary D-0467
  invent `i` → `itemactions` menu @530.
- C locus: `invent.c` `ddoinv`/`dispinv_with_action`; `iactions.c`
  `itemactions`; status blank until bot after fullscreen invent.
- Change: `js/iactions.js` + `ddoinv` PICK_ONE→`itemactions`;
  `ia_checkfile`; status suppress only inside `itemactions`.
- Verification: #505 score **26/44** Scr **4877**/11405 RNG
  **285359**/792838; seed0002 Scr **566→568** first miss
  **@530→@538**; green+strict; cohort seed0004 held.
- Next: D-0468 sleep-ray bounce map `@` vs `q` @538.

## 2026-07-16 06:50 — #504 D-0466 apply getobj compactify
- Objective: seed0002 @525 C `[ch-kop or ?*]` vs JS `[chijkop or ?*]`.
- C locus: `invent.c` `getobj`/`compactify`; `apply.c` `doapply`.
- Change: `js/apply.js` prompt `compactify_invlets` when suggested>5;
  `?`/`*` keeps raw lets (same as D-0455 drink).
- Verification: @525 matches; first miss @525→@530; Scr 563→566;
  RNG full; green+strict; cohort 26/26.
- Next: D-0467 invent `i` → `itemactions` `Do what with` menu.
