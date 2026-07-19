# Rotated from AGENT-LOOP-JOURNAL.md (#844 / D-0748)

## 2026-07-19 — #825 public score + seed5002 @11643 reframed

- Objective: mandatory full `sessions` score (iter % 5 == 0).
- C locus: n/a (score); diagnosis `hack.c` `overexertion` / `uhitm.c`
  `do_attack` vs JS `distfleeck` at flattened 11643.
- Change: CURRENT Score refreshed — **36/44**, Scr 7860/11405, RNG
  **533216**/792838 (67.25%), speed `37+0.18/turn`. Δ vs #820 RNG +5521.
  Reframed @11643: C melee `gethungry`/`hitum` (key `l` → small mimic);
  JS skipped `do_attack` into monmove. No js/ patch.
- Verification: green+strict PASS; full suite recorded.
- Next: dump why `do_attack` skipped (bump/mimic gate); or D-0731/D-0708.

## 2026-07-19 — #824 zhitu finish_losehp_done before learnwand (D-0737)

- Objective: seed5002 trailing `rn2(19)` after fire zhitu @5904.
- C locus: `zap.c` `zhitu` → `hack.c` `losehp` → `done(DIED)` noreturn.
- Change: await `finish_losehp_done` in `zhitu`; skip `weffects`/`learnwand`
  when gameover (≡ D-0255/D-0323).
- Verification: green+strict PASS; cohort 34/34; cont **5904→11643**;
  RNG **6176→11693**/12167.
- Next: seed5002 @11643 gethungry rn2(20) vs rn2(5); or D-0731/D-0708.

## 2026-07-19 — #822 use_mirror + use_camera getdir (D-0736)

- Objective: seed5002 @5739 mirror/camera getdir leak.
- C locus: `apply.c` `use_mirror`/`use_camera`; `bhit` INVIS_BEAM;
  `flash_hits_mon`.
- Change: port mirror (getdir/cursed/beam/flee) + camera (getdir/charge/
  flash blind+flee); wire `doapply`.
- Verification: green+strict PASS; cohort 8/8; cont **5739→5904**;
  seg0 C FULL +1 JS learnwand `rn2(19)`.
- Next: trailing learnwand exercise; or D-0731/D-0708.
