# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#658:** D-0590 `^T` dotele + controlled getpos + `STRAT_CLOSE`
  `quest_talk` (leader_first/badalign). seed0361 prefix **4363→4368**
  (RNG **4414→4516**, Scr **161→178**). Next @4368 `getbones` after
  expulsion to main dungeon — not Arc-loca shuffle (that was a misread).
- **Leaderboard gap:** local **33/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Await cron.
- **Gameplay next:** seed0361 getbones @4368; or seed0367 `Pri-strt`
  (still @2040); seed0014/0108. Prefer over parked D-0006 /
  seed2200 RC.
- **Don’t:** enable ordinary `vision_recalc(2)` newsym loop (needs
  gbuf≠Terminal); re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0590; use wear empty `[*?]`; stub-cancel `^V?` as
  if menu; treat empty wish ESC as cancel; skip amulet_wish
  once-per-input; skip Wizard appear Norep / hot temperature;
  template `\.` in map strings; burn maze `rn2(2)` in `set_mimic_sym`
  on Sokoban; fill inside `load_special` loaders; accept TELE on
  occupied mon cell; skip `were_change` / stub `m_avoid_soko_push_loc`;
  skip Bar-strt / onquest nhl / In_quest fila; use `dlevel` in
  `traptype_rnd`; skip egg hatch / WEB spider / STATUE_TRAP /
  mineralize quest divide; hardcode PARTISAN; skip S_HUMAN is_elf /
  QUANTMECH SchroedingersBox / soko* loaders / LONG_WORM initworm /
  S_MUMMY wrapping; accept DRY on boulders; skip endgame Amulet/
  `level_difficulty`/fire.lua/dragon hp/golems/amphibious WET/
  salamander/Sokoban sticky/resurrect; sticky `urole.rank=title[0]`;
  omit tty_end_menu blank; emit `Dlvl:depth` on quest; Unicode-convert
  DEC `g`/`|`; lit bigrm without `light_region`; skip hideunder; map
  extractor `HI_LORD`→13; skip Sokoban premap/solidify/spines; Sokoban
  walls CLR_GRAY; Options `clear_committed_status` on fullscreen;
  skip CORPSE article in doname; `sel_set_ter(false)` force-unlit;
  omit wizard `MAGICENLIGHTENMENT` on ^X; skip `setworn` `oc_oprop`;
  stub cursed/confused teleport scroll `level_tele`; stub death-ray
  `zapyourself`; check only `flags.wizard` (not `flags.debug`) in
  `can_make_bones`; omit cemetery / `familiar_level_msg`; omit bones
  `utrack` or `initrack` after `getbones`; list DOWNPLAY letters in
  wear/puton/takeoff prompts; skip Blindf_on / Blind vision_recalc;
  skip confused scroll mispronounce before `seffects`; skip wizard
  Die?/Save bones?/Get bones? yn; skip identify `more_experienced(0,10)`.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0590 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0578: C gg via bones `gettrack`, not mfndpos cnt.
- D-0579: first Scr miss was getobj DOWNPLAY + Blindf_on, not RNG.
- D-0581: @185 Die?/bones yn; gold 311 needs `hidden_gold`.
- D-0582: @187 points was identify `more_experienced(0,10)`.
- D-0583: leave-level gbuf mon→memory; ordinary vision_recalc(2) regresses.
- D-0584: empty wear was `[*?]` vs C `[*]`, not SUGGEST.
- D-0585: mimic-as-boulder missing from `does_block`, not terrain STONE.
- D-0586: @117 was missing wizard `turns` (not title-centering alone).
- D-0587: @122 was Status armor nudity + Teleport_control what_gives.
- D-0588: seed0361 @3293 was missing `Arc-strt`; then invent
  `mdrop_special_objs` + armor/weapon `nartifact_exist` artif gate.
- D-0589: @4247 was missing `m_move` hides_under `rn2(10)` stay-put
  (not distfleeck).
- D-0590: @4363 was missing `^T` controlled tele + `quest_talk`
  (not Arc-loca load); next getbones after expulsion.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** **PASS**.
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Blindfold: Blindf_on + EBlinded + vision_recalc Blind (D-0579).
- Confused read: mispronounce pline before seffects (D-0580).
- Wizard death: Die?/Save bones?/Get/Unlink/Replace yn (D-0581).
- Identify score: `more_experienced(0,10)` on makeknown disclose (D-0582).
- Get bones? map: `_leave_viz_snapshot` + `vision_off_newsym_gbuf` +
  dirty `paint_gbuf_level_to_terminal` (D-0583).
- Empty wear/puton getobj → `[*]` (D-0584); mimic boulder → `does_block`
  (D-0585); wizard spell `turns` (D-0586); ^X armor + Teleport_control
  what_gives (D-0587).
- Quest start: `Arc-strt` / `Bar-strt` loaders; CUSTOM_INVENT needs
  `mdrop_special_objs` before discard (D-0588).
- Concealers: `m_move` stay-put `rn2(10)` before apparxy (D-0589).
- Wizard `^T`: controlled getpos + `STRAT_CLOSE` leader talk (D-0590).
