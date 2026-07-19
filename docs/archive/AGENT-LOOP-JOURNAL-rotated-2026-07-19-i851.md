# Rotated journal entries

## 2026-07-19 08:40 — #831 seed0360 return-attack (D-0743)

- Objective: CURRENT gameplay; pivoted from D-0731/D-0708 C-state stall.
- C locus: `dogmove.c` return-attack after `mattackm`; `mhitm.c` mlstmv.
- Change or falsified theory: no production patch. DIAG: kitten vs goblin
  @2995 — JS enters return (`mlstmv` unset/!scary/monnear); C skips after
  shared `rn2(4)=1`. Goblin never moved (mcalcmove 0). FORCE skip →3006.
  D-0731 WEB-know alone →cnt=6 still short; D-0708 still omit-any→49300.
- Verification: green+strict PASS; DIAG/FORCE reverted; docs D-0743.
- Next: C-state which return gate fails (D-0743); or D-0731/D-0708 cells.

## 2026-07-19 06:18 — #830 score + seed5002 PASS (D-0742)

- Objective: mandatory full `sessions` score (#830 % 5); seed5002 Scr.
- C locus: `write.c` `dowrite`; `apply.c` MAGIC_MARKER; `cmd.c`
  `get_adjacent_loc`/`getdir`; `iactions.c` `itemactions_pushkeys`;
  `dothrow.c` getdir cmdassist + canned getobj key.
- Change: port `dowrite` + wire marker apply; open uses
  `getdir_cmdassist`; itemed throw queues dothrow+invlet; dothrow
  cmdassist getdir + CMDQ_KEY. Scr **400→410** → **PASS**.
- Verification: green+strict PASS; cohort 35/35; suite **37/44**;
  Scr **8182**/11405; RNG **533690**/792838 (67.31%).
- Next: seed0399 @10157 (D-0731) / seed0014 @49039 (D-0708); or
  leaderboard 22-vs-37 gap.
