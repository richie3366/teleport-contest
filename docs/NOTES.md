# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0578 open (diag):** seed5006 seg1 @2782 is hostile **PM_KITTEN**
  `m_move` track-skip `rn2(4*(cnt-j))`. Prefix through 2781 matches
  (incl. post-move `distfleeck` recalc at 2780). JS at (32,4) has
  `cnt=7,j=0` → `rn2(28)`; C wants `rn2(16)` → `cnt-j=4`.
  First move (31,4)→(32,4) both `cnt=7`/`rn2(28)=13`. Bones map is
  open ROOM there; mfndpos omissions rarely exclude empty ROOM.
  **Next falsifier:** prove C dest after first move (goal/`gettrack`/
  selection skips) or C `mfndpos` cnt at that cell — not another mon.
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed5006-tourist-stress-disaster.session.json
  ```
- **Alt:** seed0116 residual Scr 114/127 (RNG full). Prefer 5006.
- **Leaderboard gap:** local **31/44** vs judge **22** after D-0480;
  D-0483 reverted serialize.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0577; stub-cancel `^V?` as if menu; treat empty wish
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
  amphibious WET/salamander/Sokoban sticky/resurrect; sticky
  `urole.rank=title[0]`; omit tty_end_menu blank; emit `Dlvl:depth` on
  quest; Unicode-convert DEC `g`/`|`; lit bigrm without `light_region`;
  skip hideunder; map extractor `HI_LORD`→13; skip Sokoban
  premap/solidify/spines; Sokoban walls CLR_GRAY; Options
  `clear_committed_status` on fullscreen; skip CORPSE article in
  doname; `sel_set_ter(false)` force-unlit; omit wizard
  `MAGICENLIGHTENMENT` on ^X; skip `setworn` `oc_oprop`; stub
  cursed/confused teleport scroll `level_tele`; stub death-ray
  `zapyourself`; check only `flags.wizard` (not `flags.debug`) in
  `can_make_bones`; omit cemetery / `familiar_level_msg`.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0577 done.
- Runner `Screen N/M` = total matches, not prefix length.
- getbones `rn2(3)` gap was unbound level change — D-0515/18.
- D-0519…D-0577 makemaz/endgame/air_pos/^X/setworn/level_tele/death/
  familiar — index.
- seed5006 @8468 was regen HP / missing Regeneration, not dosounds.
- seed5006 @8473 was stubbed confused scroll `level_tele`, not rnl alone.
- seed5006 @10953 was stubbed WAN_DEATH + bones `flags.debug`, not depth.
- `rng-diff.mjs` runs **seg0 only** — seed5006 “@11026 gemcolors” was
  seg1 start; seg0 is FULL.
- seg1 @2780 `rn2(5)` is kitten **post-move** `distfleeck` recalc
  (dochug after `m_move`), not a second monster.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398/0373 **PASS**; #640 **31/44**.
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- wizgenesis flags=5 — do not add to EXT_CMD_AC.
- Air plane: `weight_cap` = `MAX_CARR_CAP` (Is_airlevel).
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Confused/cursed teleport scroll → `level_tele` + `random_teleport_level`.
- Self-zap death ray → `done(DIED)`; playmode:debug ≡ wizard for bones.
- Debug `set_playmode` → `plname="wizard"`; cemetery who uses that.
- seed5006 bones kitten: mov=24, mtame=0; ghost sleep mov=0; pony
  follower mov=0 — only kitten double-moves this turn.
