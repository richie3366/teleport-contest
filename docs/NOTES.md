# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 knight coverage (RNG 3039/108275 Scr 19/1814).
  Falsifier: focused runner for seed4500.
- seed2600 **PASS** (D-0897 BIND + D-0898 ini_inv setworn).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0898 done.
- Do not omit `BIND=` parsebindings / skip armor `setworn` in
  `ini_inv_use_obj` (D-0897/D-0898).
- Do not omit `bigrm-9` load_special (D-0896).
- Do not skip Temple of the gods / discard themes `splev_align` (D-0895).
- Do not skip town warn / dry fountain on first town `dryup` (D-0894).
- Do not force `setgemprobs` lev=0 when dlev set (D-0893).
- Do not omit `do_attack` `gu.unweapon` begin-bashing (D-0892).
- Do not force `tseen=false` on HOLE in `maketrap` (D-0891).
- Do not omit launch_obj `tmp_at(DISP_FLASH)` / pline dirty vision (D-0890).
- Do not omit peaceful adj / frighten verb on safemon swap (D-0889).
- Do not capitalize-only cream pie splash (need `The(xname)` D-0888).
- Do not omit `could_seduce` in hitmm/missmm/hitmsg/missmu (D-0887).
- Do not `rloc(..., 0)` / skip await on dochug flee-teleport (D-0886).
- Do not call `find_ac` from delay-0 `armoroff` (D-0883).

## Landmarks (≤15)

- suite **42/44** @#1048 Scr **9609**/11405 RNG **687602**/792838
  (86.73%); next cadence @#1050.
- **D-0898 #1048:** ini_inv armor `setworn`; seed2600 Scr **37→38** PASS.
- **D-0897 #1048:** BIND=`v:inventory`; seed2600 Scr **35→37**.
- **D-0896 #1047:** bigrm-9 load_special; seed2600 RNG **FULL**
  Scr **23→35**.
- **D-0895 #1046:** Temple of the gods fill; seed2600 **395→2917**
  Scr **3→23**.
- **D-0894 #1045:** dryup town warn + watchman yell; seed0014 **PASS**.
- **D-0893 #1044:** setgemprobs ledger_no; Scr **678→712**.
- **D-0892 #1043:** do_attack unweapon bash; Scr **676→678**.
- **D-0891 #1042:** maketrap HOLE `unhideable_trap` tseen; Scr **645→676**.
- **D-0890 #1041:** launch_obj FLASH + pline vision_recalc; Scr **644→645**.
- **D-0889 #1040:** swap `x_monnam` peaceful adj; Scr **641→644**.
- **D-0888 #1039:** cream pie `The(xname)`; Scr **640→641**.
- **D-0887 #1038:** could_seduce hitmm/missmm; Scr **638→640**.
- **D-0886 #1037:** dochug flee `RLOC_MSG` + rloc appear; Scr **636→638**.
