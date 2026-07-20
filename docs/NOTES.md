# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0014 Scr 645/714** — RNG FULL; D-0890 closed @560 rolling-boulder
  FLASH + pline dirty vision_recalc. First miss @600 — empty topline;
  JS floor `·` vs C trap `^` (brown) @ display (68,16). Falsifier: focused
  seed0014.
- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0890 done.
- Do not omit launch_obj `tmp_at(DISP_FLASH)` / pline dirty vision (D-0890).
- Do not omit peaceful adj / frighten verb on safemon swap (D-0889).
- Do not capitalize-only cream pie splash (need `The(xname)` D-0888).
- Do not omit `could_seduce` in hitmm/missmm/hitmsg/missmu (D-0887).
- Do not `rloc(..., 0)` / skip await on dochug flee-teleport (D-0886).
- Do not omit rloc post-place appear/close-by (D-0886).
- Do not call `find_ac` from delay-0 `armoroff` (D-0883).
- Do not leave steal `(on … hand)` / skip nymph `She stole` (D-0884).
- Do not `rloc(..., 0)` on seduce steal flee (D-0885 RLOC_MSG).
- Do not reorder `merged` ID reconcile before coin `bknown=0` (D-0882).
- Do not omit dipfountain case 28 bath/`somegold` (D-0877).
- Do not use PAPER=1/GLASS=11/WOOD=13 in shatter (D-0878).
- Do not skip invent merge known/bknown/rknown compare (D-0879).

## Landmarks (≤15)

- suite **40/44** @#1040 Scr **9504**/11405 RNG **676373**/792838
  (85.31%); next cadence @#1045.
- **D-0890 #1041:** launch_obj FLASH + pline vision_recalc; Scr **644→645**;
  @560 closed; next @600 trap `^`.
- **D-0889 #1040:** swap `x_monnam` peaceful adj; Scr **641→644**.
- **D-0888 #1039:** cream pie `The(xname)`; Scr **640→641**.
- **D-0887 #1038:** could_seduce hitmm/missmm; Scr **638→640**.
- **D-0886 #1037:** dochug flee `RLOC_MSG` + rloc appear; Scr **636→638**.
- **D-0885 #1036:** rloc RLOC_MSG vanish; Scr **635→636**.
- **D-0884 #1036:** steal on→from + nymph She; Scr **634→635**.
- **D-0883 #1036:** armoroff no find_ac; Scr **633→634**.
- **D-0882 #1035:** merged coin `bknown=0` before ID reconcile;
  restored seed0007 PASS (D-0879 order bug).
- **D-0881 #1034:** short_oname dip yn; Scr **624→633**.
- **D-0877 #1029:** dipfountain bath+somegold; seed0014 RNG **FULL**.
- STAIRS yellow via `known_branch_stairs`; cursor=(ux−1, uy+1).
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- **D-0848:** `-DMAIL_STRUCTURES`; NUM_OBJECTS=481; SCR_MAIL=364.
