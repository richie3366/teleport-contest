# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0573 done:** wizard ^X ORs `MAGICENLIGHTENMENT`; status
  hunger/encumb `<%d>`; `from_what`/`is_innate` poison/stealth/fast;
  Attributes (piousness/align/warded/luck/pray/debug); Air
  `weight_cap` → `MAX_CARR_CAP`. seed0373 Scr **123→124**/124 **PASS**.
- **Gameplay next:** seed5006 `dosounds` @8468 (RNG 8508); or
  seed0116 residual 114/127. Prefer over parked seed2200 RC.
  ```bash
  node scripts/rng-diff.mjs sessions/seed5006-tourist-stress-disaster.session.json
  node frozen/ps_test_runner.mjs sessions/seed0116-wizard-wear-shop.session.json
  ```
- **Leaderboard gap:** local **30/44** (+seed0373 focused PASS pending
  #640 suite) vs judge **22** after D-0480; D-0483 reverted serialize.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0573; stub-cancel `^V?` as if menu; treat empty wish
  ESC as cancel; skip amulet_wish once-per-input; skip Wizard appear
  Norep / hot temperature; template `\.` in map strings; burn maze
  `rn2(2)` in `set_mimic_sym` on Sokoban; fill inside `load_special`
  loaders; accept TELE on occupied mon cell; skip `were_change` /
  stub `m_avoid_soko_push_loc`; skip Bar-strt / onquest nhl / In_quest
  fila; use `dlevel` in `traptype_rnd`; skip egg hatch / WEB spider /
  STATUE_TRAP / mineralize quest divide; hardcode PARTISAN; skip
  S_HUMAN is_elf / QUANTMECH SchroedingersBox / soko* loaders /
  LONG_WORM initworm / S_MUMMY wrapping; accept DRY on boulders; skip
  endgame Amulet/`level_difficulty`/fire.lua/dragon hp/golems/
  amphibious WET/salamander/Sokoban sticky/resurrect/level_tele
  planes/air_pos/pluslvl uexp/Is_airlevel weight_cap; sticky
  `urole.rank=title[0]`; omit tty_end_menu blank; emit `Dlvl:depth` on
  quest; Unicode-convert DEC `g`/`|`; lit bigrm without `light_region`;
  skip hideunder; map extractor `HI_LORD`→13; skip Sokoban
  premap/solidify/spines; Sokoban walls CLR_GRAY; Options
  `clear_committed_status` on fullscreen; skip CORPSE article in
  doname; `sel_set_ter(false)` force-unlit; omit wizard
  `MAGICENLIGHTENMENT` on ^X.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0573 done.
- Runner `Screen N/M` = total matches, not prefix length.
- getbones `rn2(3)` gap was unbound level change — D-0515/18.
- D-0519…D-0573 makemaz/endgame/air_pos/^X Attributes — see index.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398 **PASS**; seed0373 focused **PASS** (D-0573).
- #635 score: **30/44**, Scr 6401, RNG 353648 (44.61%).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- wizgenesis flags=5 — do not add to EXT_CMD_AC.
- Air plane: `weight_cap` = `MAX_CARR_CAP` (Is_airlevel).
