## 2026-07-16 09:55 — D-0479 mondead unmap_object clears I
- Objective: seed0006 @77 JS `I` vs C `#` after kitten kills unseen mon.
- C locus: `mon.c` `mondead` → `unmap_object`; `display.c` unmap_*.
- Change: `unmap_object`/`unmap_invisible` in `display.js`; wire into
  `mondead` (mhitm/uhitm/trap) before `newsym`.
- Verification: seed0006 Scr **95→106**/123 @77→@102; green+strict;
  25 PASS cohort held.
- Next: seed0006 @102 `.` vs `&` water-demon display (or seed0007).

