# Rotated from AGENT-LOOP-JOURNAL.md (#502 D-0464)

## 2026-07-16 05:10 — #488 D-0451 lootmon + doforce TIME
- Objective: seed0002 @26692 D-0451 primary.
- C locus: `pickup.c` `doloot_core` lootmon; `cmd.c` `help_dir`/
  `xwaitforspace`; `lock.c` `doforce`.
- Change: `doloot` mon_beside → `getdir_cmdassist`; `help_dir` More
  quitchars only (bell on `f`); `doforce` no-box → ECMD_TIME.
  Deferred: forcelock occupation; loot_mon/saddle.
- Verification: seed0002 **26692→26883**; Scr **320→322**; green+strict;
  cohort **26/26**.
- Next: @26883 C `exercise`/`zap_hit` vs JS `rn2(20)` (D-0452).

## 2026-07-16 04:42 — #487 D-0451 door-step + #force TIME falsify
- Objective: seed0002 @26692 D-0451 — why JS pet→DOOR(35,5).
- C locus: `dogmove.c` `dog_move`/`dog_goal`; `lock.c` `doforce`;
  `mon.c` `mfndpos`.
- Change: none shipped. DIAG: prior appr=0 cnt=5→(35,5) D_NODOOR.
  Faithful empty-floor `doforce` ECMD_TIME (scalpel, no box) reverted —
  prefix 26692→**26426** (JS pet (31,7) udist=1 vs C `rn2(4)`).
  Unknown `#force` masks earlier pet-pos split.
- Verification: green+strict PASS; seed0002 still @26692 / Scr 320.
- Next: pet mx/my before step 511; why C omits DOOR(35,5) cand
  (D-0451). Do not ship `#force` yet.

## 2026-07-16 04:23 — #486 D-0451 state capture (pet udist)
- Objective: seed0002 @26692 D-0451 primary — falsify fobj-count vs
  pet-pos.
- C locus: `dogmove.c` `dog_goal`/`dog_move`; `mon.c` `mfndpos`.
- Change: none shipped. DIAG proved both had 2 in-radius fobj
  `obj_resists`; C invent-scans with `udist≤1`; JS `udist=5` after
  walking to DOOR(35,5). Map JS ROOM/VWALL vs C ndoor+CORR. Naive
  `doforce` port reverted (prefix 26692→26426).
- Verification: green+strict PASS; seed0002 still @26692 / Scr 320.
- Next: C vs JS terrain (34..35,5..7) + why C keeps pet after same
  selection RNGs (D-0451).

