# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#668 D-0599:** rolling boulder @11065. C screen "Click! … boulder
  misses you"; JS skipped trapeffect → `distfleeck` rn2(5). Prefix
  **11065→12287**, Scr **198→205**. Next @12287 C `rn2(5) @ pick_room`
  vs JS `rn2(3)`.
- **Leaderboard gap:** local **33/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0599; wear `[*?]`; stub `^V?` as menu; empty
  wish ESC; skip amulet_wish; Wizard Norep; maze `rn2(2)` set_mimic_sym
  Sokoban; TELE on occupied mon; skip `were_change`/
  `m_avoid_soko_push_loc`; `dlevel` in traptype_rnd; hardcode PARTISAN;
  skip LONG_WORM/S_MUMMY; sticky `urole.rank`; omit bones `utrack`; skip
  Blindf_on / confused mispronounce / wizard yn / identify
  `more_experienced(0,10)`; `vision_recalc(2)` newsym loop; D-0480
  coerce; frame-align; raw RNG-index/coord hacks.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0598 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0583: leave-level gbuf mon→memory; ordinary vision_recalc(2) regresses.
- D-0592–D-0596: COURT/portal/web/`set_wear` causes settled — don’t reopen.
- D-0597: pool/lava **not** @7973 cause — open ROOM cnt=8 was JS-only pos.
- D-0598: @7973 was missing `searches_for_item` (POT_HEALING gg).
- D-0599: @11065 was missing rolling-boulder `launch_obj`, not dmgval body.
- D-0584: empty wear was `[*?]` vs C `[*]`, not SUGGEST.
- D-0585: mimic-as-boulder missing from `does_block`, not terrain STONE.
- D-0586: @117 was missing wizard `turns` (not title-centering alone).
- D-0587: @122 was Status armor nudity + Teleport_control what_gives.

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
- Quest start: `Arc-strt` loaders + invent discard (D-0588).
- Concealers: `m_move` stay-put `rn2(10)` (D-0589).
- Wizard `^T`: controlled getpos + `STRAT_CLOSE` talk (D-0590).
- Expulsion return: `movemon` must `deferred_goto` (D-0591).
- Special rooms: `pick_room`/`mkzoo` via `do_mkroom` (D-0592).
- COURT fill: `somexyspace`+`mk_zoo_thronemon`+`courtmon`+chest (D-0593).
- Portal branch: `mkportal` + `goto_level` MAGIC_PORTAL land (D-0594).
- Spider web: `postmov` `maybe_spin_web` `rn2(1000)` (D-0595).
- Startup wear: `set_wear` → `Helmet_on` fedora Archeologist luck (D-0596).
- `mfndpos` pool/lava/waterwall + passes_walls `ALLOW_WALL` (D-0597).
- Intelligent loot: `searches_for_item` in `mon_would_take_item` (D-0598).
- Rolling boulder: `launch_obj` + `trapeffect_rolling_boulder_trap` (D-0599).
