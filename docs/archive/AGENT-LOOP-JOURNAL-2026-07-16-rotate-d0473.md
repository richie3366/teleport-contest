## 2026-07-16 06:14 — #497 D-0459 safemon in-the-way pline
- Objective: seed0002 screen@272 C `You stop.  Your little dog is in
  the way!` vs JS blank topline.
- C locus: `uhitm.c` `do_attack` safemon `foo` → `y_monnam`/`You`/
  `end_running(TRUE)`.
- Change: `js/uhitm.js` — after tame monflee, emit stop pline via
  `x_monnam_tame`+highc; clear run/travel/mv/multi. Deferred: inshop
  when !foo; isshk dopay; frozen/helpless pline; longworm/`passes_walls`
  in foo; `mon_track_clear`/Vrock.
- Verification: seed0002 @272 matches; first miss @272→@342; Scr
  353→354; RNG full; green+strict; cohort 24/24.
- Next: D-0460 screen@342 look_here `doname_with_price` for-sale.
