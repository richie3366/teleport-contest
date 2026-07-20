# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 @18153 C `splev_initlev` `rn2(2)` vs JS
  `rn2(4)` after matched getbones + nhlib shuffle. Falsifier:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`
- D-0903 fill_zoo BEEHIVE closed @18153 (prefix 14216→18153 Scr 294→302).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0903 done.
- Do not omit fill_zoo BEEHIVE queen/killer + royal jelly (D-0903).
- Do not omit `shkveg`/`mkveggy_at` / HEALTHY_TIN (D-0902).
- Do not omit Pillars `shuffle(terr)` / 2×2 `des.terrain` (D-0901).
- Do not omit `spitmm`/`spitmu` / `m_lined_up` (D-0900).
- Do not omit `#jump` / `dojump` / getpos_getvalid (D-0899).
- Do not omit `BIND=` parsebindings / skip armor `setworn` in
  `ini_inv_use_obj` (D-0897/D-0898).
- Do not omit `bigrm-9` load_special (D-0896).
- Do not skip Temple of the gods / discard themes `splev_align` (D-0895).
- Do not skip town warn / dry fountain on first town `dryup` (D-0894).
- Do not force `setgemprobs` lev=0 when dlev set (D-0893).
- Do not force `tseen=false` on HOLE in `maketrap` (D-0891).
- Do not omit launch_obj `tmp_at(DISP_FLASH)` / pline vision (D-0890).
- Do not omit peaceful adj / frighten verb on safemon swap (D-0889).

## Landmarks (≤15)

- suite **42/44** @#1050 Scr **9874**/11405 RNG **694676**/792838
  (87.62%); next cadence @#1055.
- **D-0903 #1053:** fill_zoo BEEHIVE; seed4500 **14216→18153**
  Scr **294→302**.
- **D-0902 #1052:** shkveg/mkveggy_at; seed4500 **9974→14216**
  Scr **284→294**.
- **D-0901 #1051:** Pillars terr shuffle; seed4500 **8925→9974** Scr **284**.
- **D-0900 #1050:** spitmm/spitmu; seed4500 **8491→8925** Scr **264→284**.
- **D-0899 #1049:** `#jump` dojump; seed4500 **2869→8491** Scr **19→264**.
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
