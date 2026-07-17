# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#670 score:** **33/44** Scr **6597**/11405 RNG **368089**/792838
  (46.43%); Δ vs #665 Scr +10 RNG +4165. Next peel unchanged.
- **#669 D-0600:** mktemple wired; prefix **12287→12288**. Next @12288
  C `shrine_pos` rn2(2) vs JS pick_room rn2(5): JS no doorct==1 OROOM
  (room2 13×2 doorct=2; C accepts doorct==1). Extra door =
  join/niche/`add_door` — not pick_room body.
- **Leaderboard gap:** local **33/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0600; wear `[*?]`; stub `^V?` as menu; empty
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
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0599 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0583: leave-level gbuf mon→memory; ordinary vision_recalc(2) regresses.
- D-0592–D-0596: COURT/portal/web/`set_wear` causes settled — don’t reopen.
- D-0597: pool/lava **not** @7973 cause — open ROOM cnt=8 was JS-only pos.
- D-0598: @7973 was missing `searches_for_item` (POT_HEALING gg).
- D-0599: @11065 was missing rolling-boulder `launch_obj`, not dmgval body.
- D-0600: @12287 was stub TEMPLE (not pick_room rn2(3) downstairs); next
  is doorct, not shrine_pos/priestini body.
- D-0584: empty wear was `[*?]` vs C `[*]`, not SUGGEST.
- D-0585: mimic-as-boulder missing from `does_block`, not terrain STONE.
- D-0586: @117 was missing wizard `turns` (not title-centering alone).

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
- Special rooms: `pick_room`/`mkzoo` (D-0592); COURT fill (D-0593);
  **`mktemple`/`priestini`/`newepri`** (D-0600); SWAMP deferred.
- Rolling boulder: `launch_obj` + `trapeffect_rolling_boulder_trap` (D-0599).
