# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0572 done:** `pluslvl` sets `uexp=newuexp(ulevel)` before
  `++ulevel`; `background_dungeon_clause` In_endgame Elemental Plane;
  moves==1 “just started”; wizard XP “more needed”. seed0373 Scr
  **122→123**/124; @118 match. Do **not** omit pluslvl uexp.
- **seed0373 next:** @119 Attributes — C wizard ^X ORs
  `MAGICENLIGHTENMENT` (`doattributes`); hunger/encumb wizard
  `<%d>`; piousness / alignment / poison innately / stealth /
  warded / fast / luck zero / can’t safely pray (398); debug-mode
  misc. Falsify: `insight.c` `attributes_enlightenment` +
  `doattributes` mode |= MAGIC.
- **seed0116 residual:** screen/cursor miss (114/127) after full RNG.
- **D-0515 residual:** seed5006 still @8468 `dosounds` (RNG 8508).
- **#635 score:** **30/44**, Scr **6401**/11405, RNG **353648**
  (44.61%), `31+0.15/turn`. Δ vs #630 Scr +23 (D-0569…72).
- **Leaderboard gap:** local **30/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch cron for seed0013 restore.
- **Gameplay next:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0373-barbarian-quest-tour.session.json
  node scripts/rng-diff.mjs sessions/seed5006-tourist-stress-disaster.session.json
  node frozen/ps_test_runner.mjs sessions/seed0116-wizard-wear-shop.session.json
  ```
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0572; stub-cancel `^V?` as if menu (breaks 0373);
  treat empty wish ESC as cancel (C → `any` random); skip amulet_wish
  once-per-input; skip Wizard appear Norep / hot temperature msg;
  template `\.` in map strings; burn maze `rn2(2)` in `set_mimic_sym`
  on Sokoban; fill inside `load_special` loaders; accept TELE on
  occupied mon cell; skip `were_change` / stub `m_avoid_soko_push_loc`;
  skip Bar-strt / onquest nhl / In_quest fila; use `dlevel` in
  `traptype_rnd` (must `level_difficulty`); skip egg hatch / WEB spider
  / STATUE_TRAP / mineralize quest divide; hardcode PARTISAN; skip
  S_HUMAN is_elf / QUANTMECH SchroedingersBox / soko* loaders /
  LONG_WORM initworm / S_MUMMY wrapping; accept DRY on boulders; skip
  endgame Amulet/`level_difficulty`/fire.lua/dragon hp/golems/
  amphibious WET/salamander/Sokoban sticky/resurrect/level_tele
  planes/air_pos/pluslvl uexp; sticky `urole.rank=title[0]`; omit
  tty_end_menu blank; emit `Dlvl:depth` on quest; Unicode-convert DEC
  `g`/`|`; lit bigrm without `light_region`; skip hideunder; map
  extractor `HI_LORD`→13; skip Sokoban premap/solidify/spines; Sokoban
  walls CLR_GRAY; Options `clear_committed_status` on fullscreen;
  skip CORPSE article in doname; `sel_set_ter(false)` force-unlit.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0572 done.
- Runner `Screen N/M` = total matches, not prefix length.
- getbones `rn2(3)` gap was unbound level change — D-0515/18.
- D-0519…D-0572 makemaz/endgame/air_pos/^X Background — see index.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398 **PASS**; LB gap 14 cells / 4 sessions.
- #635 score: **30/44**, Scr 6401, RNG 353648 (44.61%).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- wizgenesis flags=5 — do not add to EXT_CMD_AC.
- seed0373 RNG **full**; Scr **123**/124 after D-0572; next @119.
