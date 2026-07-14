# Rotated from AGENT-LOOP-JOURNAL.md (#365)

## 2026-07-14 22:48 — #351 D-0323 mbhitm finish_losehp_done

- Objective: seed0030 @1433 wand-hit `--More--` / seg7 −13 death screens.
- C locus: `muse.c` `mbhitm` — `pline` then `losehp`→`done(DIED)` noreturn.
- Change: await `finish_losehp_done` after fatal striking; stop mbhit/
  use_offensive on gameover (D-0323).
- Verification: @1433 match; seg7 172; Scr **1446→1604**; first miss
  **@1484** quit vs died; RNG full; green+strict; 17 PASS cohort.
- Next: @1484 `#quit` topten how_how `quit` vs `died`.

## 2026-07-14 22:38 — #350 public score refresh

- Objective: mandatory full `sessions` (#350 % 5 == 0).
- C locus: n/a (score cadence; no port patch).
- Change: none — documented suite after D-0322 peels #346–#349.
- Verification: green+strict PASS; full suite **19/44**, Scr **2883**/11405
  (25.28%, was 2865), RNG **240657**/792838 (30.35%), speed
  `18+0.12/turn`; seed0030 still Scr **1446**/1953 first-miss **@1433**.
- Next: @1433 fatal wand-hit `--More--` / death screen capture (seg7 −13).
