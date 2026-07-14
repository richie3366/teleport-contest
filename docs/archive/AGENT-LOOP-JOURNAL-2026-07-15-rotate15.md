# Rotated from AGENT-LOOP-JOURNAL.md (#359)

## 2026-07-14 21:56 — #344 D-0317 moverock hear-behind

- Objective: seed0030 @836 boulder hear-behind (CURRENT).
- C locus: `hack.c` `moverock_core` mtmp arm; `dopush` unmap invisible.
- Change: `You_hear`/`canspotmon` + verbose cannot-move (no vain);
  `closed_door` vain; `dopush` clears dest `I` before `movobj` (D-0317).
- Verification: @836 match; Scr **1400→1427**; first miss **@1174**
  thin-air + gnome wield; RNG full; green+strict; 19 PASS cohort.
- Next: @1174 `You attack thin air.  The gnome wields a bow!`.
