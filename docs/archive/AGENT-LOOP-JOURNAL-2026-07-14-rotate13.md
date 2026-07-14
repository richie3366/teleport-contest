## 2026-07-14 21:24 — #340 score + D-0313 done_in_by isshk

- Objective: mandatory full `sessions` (#340 %5) + seed0030 @583 RIP.
- C locus: `end.c` `done_in_by` isshk; `shknam.c` `shkname_is_pname`.
- Change: honorific + `shkname` + `, the shopkeeper` + `KILLED_BY` (D-0313).
- Verification: full suite **19/44**, Scr **2831/11405** (24.82%), RNG
  **240657/792838**, speed `18+0.11/turn`; seed0030 Scr **1389→1394**,
  RIP @583 match; first miss **@779** HP:1 vs HP:0; green+strict; 19 PASS
  cohort.
- Next: @779 `You die...` botl HP:1 vs HP:0.

## 2026-07-14 21:39 — #341 D-0314 botl flush/bot/more timing

- Objective: seed0030 @779 You die botl HP:1 vs HP:0 (CURRENT).
- C locus: `pline.c` flush→`bot`; `botl.c` uhp==-1 skip; `topl.c` more
  no flush; `cls` botlx; `spell.c` uen botl; `end.c` done bot before zero.
- Change: commit status only in `bot()`; pline flushes first; more paints
  cache; cls botlx; spell uen botl (D-0314).
- Verification: @779 match; Scr **1394→1395**; first miss **@787**; RNG
  full; green+strict; 17 PASS cohort (seed0501 after spell botl).
- Next: @787 `Things that are here:` map overlay cells.

