# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0014 PASS** (D-0894 dryup town warn). Suite **41/44**.
- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed2600 custom binds / seed4500 knight coverage.
  Falsifier: focused runner for either session.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0894 done.
- Do not skip town warn / dry fountain on first town `dryup` (D-0894).
- Do not force `setgemprobs` lev=0 when dlev set (D-0893).
- Do not omit `do_attack` `gu.unweapon` begin-bashing (D-0892).
- Do not force `tseen=false` on HOLE in `maketrap` (D-0891).
- Do not omit launch_obj `tmp_at(DISP_FLASH)` / pline dirty vision (D-0890).
- Do not omit peaceful adj / frighten verb on safemon swap (D-0889).
- Do not capitalize-only cream pie splash (need `The(xname)` D-0888).
- Do not omit `could_seduce` in hitmm/missmm/hitmsg/missmu (D-0887).
- Do not `rloc(..., 0)` / skip await on dochug flee-teleport (D-0886).
- Do not omit rloc post-place appear/close-by (D-0886).
- Do not call `find_ac` from delay-0 `armoroff` (D-0883).
- Do not leave steal `(on … hand)` / skip nymph `She stole` (D-0884).
- Do not `rloc(..., 0)` on seduce steal flee (D-0885 RLOC_MSG).

## Landmarks (≤15)

- suite **41/44** @#1045 Scr **9574**/11405 RNG **676373**/792838
  (85.31%); next cadence @#1050.
- **D-0894 #1045:** dryup town warn + watchman yell; seed0014 **PASS**.
- **D-0893 #1044:** setgemprobs ledger_no; Scr **678→712**.
- **D-0892 #1043:** do_attack unweapon bash; Scr **676→678**.
- **D-0891 #1042:** maketrap HOLE `unhideable_trap` tseen; Scr **645→676**.
- **D-0890 #1041:** launch_obj FLASH + pline vision_recalc; Scr **644→645**.
- **D-0889 #1040:** swap `x_monnam` peaceful adj; Scr **641→644**.
- **D-0888 #1039:** cream pie `The(xname)`; Scr **640→641**.
- **D-0887 #1038:** could_seduce hitmm/missmm; Scr **638→640**.
- **D-0886 #1037:** dochug flee `RLOC_MSG` + rloc appear; Scr **636→638**.
- **D-0885 #1036:** rloc RLOC_MSG vanish; Scr **635→636**.
- **D-0884 #1036:** steal on→from + nymph She; Scr **634→635**.
- **D-0883 #1036:** armoroff no find_ac; Scr **633→634**.
- **D-0882 #1035:** merged coin `bknown=0` before ID reconcile;
  restored seed0007 PASS (D-0879 order bug).
- **D-0877 #1029:** dipfountain bath+somegold; seed0014 RNG **FULL**.
