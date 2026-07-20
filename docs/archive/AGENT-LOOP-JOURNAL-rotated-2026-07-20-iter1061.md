
## 2026-07-20 21:05 — #1047 D-0896 bigrm-9 load_special
- Objective: seed2600 @2917 nhlib shuffle (makemaz after getbones).
- C locus: `dat/bigrm-9.lua` via `mkmaze.c` `makemaz` → `load_special`;
  nhlib shuffle; eye map + pupil lit rings; noflip.
- Change: `load_bigrm_9` + dispatch (D-0896). Named omit: other bigrm-N;
  BIND=`v:inventory`.
- Verification: green+strict PASS; cohort 6/6; seed2600 RNG **FULL
  11647** Scr **23→35**; suite **41/44** Scr **9606**/11405 RNG
  **687602**/792838 (86.73%).
- Next: seed2600 BIND= / remaining 3 screens; seed4500; cadence @#1050.

## 2026-07-20 20:59 — #1046 D-0895 Temple of the gods fill
- Objective: seed2600 first blocker (not BIND yet — gen @395).
- C locus: `themerms.lua` Temple of the gods; `sp_lev.c` create_altar /
  get_free_room_loc; themes nhlib shuffle → `splev_align`.
- Change: `themeroom_fill_temple_of_the_gods` + store themes align
  (D-0895). Named omit: Ice/Trap/Garden/Massacre/Statuary/…; BIND=.
- Verification: green+strict PASS; cohort 5/5; seed2600 RNG **395→2917**
  Scr **3→23** (runner 2929/23).
- Next: seed2600 @2917 nhlib shuffle on special-level load; BIND later;
  seed4500; leaderboard cron; cadence @#1050.

