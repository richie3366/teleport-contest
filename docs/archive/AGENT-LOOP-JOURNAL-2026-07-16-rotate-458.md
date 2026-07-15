# Rotated from AGENT-LOOP-JOURNAL.md — 2026-07-16 #458

## 2026-07-15 18:50 — #446 seed0004 throw carrot feed (D-0415)
- Objective: seed0004 @11722 PRIMARY — C `next_ident` vs JS `distfleeck`.
- C locus: dothrow.c thitmonst befriend; dog.c tamedog mtame+obj;
  dogmove.c dog_eat; mondata.h befriend_with_obj.
- Change: getobj_throw `*` pickinv; throwit mon-hit food→tamedog;
  tamedog already-tame dogfood/dog_eat (before mtame<10 bump).
- Verification: seed0004 RNG **12084**/12084; Scr **243**/409;
  green+strict PASS; cohort **25/25**.
- Next: seed0004 screen-only peel (cells 243/409).

## 2026-07-15 18:34 — #445 score + dog ALLOW_U mattacku (D-0414)
- Objective: mandatory full `sessions` score (#445÷5); seed0004 @11708
  PRIMARY — C `mattacku` vs JS `distfleeck`.
- C locus: `dogmove.c` newdogpos `ALLOW_U`→`mattacku`; not bare dochug.
- Change: `dogmove.js` chosen-candidate `ALLOW_U` attacks hero then
  `MMOVE_DONE` (leash-break pline stub; full `m_unleash` deferred).
- Verification: full score **25/44** Scr **4194**/11405 RNG
  **262860**/792838 `21+0.13/turn`; seed0004 prefix **11708→11722**
  (RNG 11790); green+strict; cohort **25/25**.
- Next: seed0004 @11722 `next_ident` vs `distfleeck`.

## 2026-07-15 18:30 — #444 seed0004 Conflict fightm (D-0413)
- Objective: seed0004 @11568 PRIMARY — C `resist_conflict` vs JS
  `distfleeck` mid-travel.
- C locus: `mon.c` `movemon_singlemon` Conflict→`fightm`; `mhitm.c`
  `fightm`; `monmove.c` `dochug` `hero_conflict` + PHASE FOUR.
- Change: port `fightm` (always `resist_conflict`); wire before
  `dochugw`; dochug uses `hero_conflict` + peaceful P4 resist.
- Verification: seed0004 prefix **11568→11708** (RNG 11774); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11708 `mattacku` vs `distfleeck`.

## 2026-07-15 18:20 — #443 seed0004 findtravelpath (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `hack.c` `findtravelpath` / `test_move(TEST_TRAV)` boulder delay.
- Change: falsified after_calc/leftover theory (DIAG 9→21 UNENC). Root:
  hero→dest BFS walked onto boulder. Ported dest→hero BFS + `dirs_ord`
  + boulder-node skip + `TRAVP_GUESS` fallback in `cmd.js`.
- Verification: seed0004 prefix **10966→11568** (RNG 11662); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11568 `resist_conflict` vs `distfleeck`.
