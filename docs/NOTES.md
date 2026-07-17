# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#676 D-0606:** `select_newcham_form` + `MAIL_STRUCTURES` extract.
  seed0361 **18684→21119** Scr 220 RNG 21217.
  Next @21119 C lua `shuffle` after `makemaz` vs JS `place_lregion`
  (special level). Or Pri-strt / seed0014/0108.
- **Leaderboard gap:** local **33/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0606 shipped; wear `[*?]`; stub `^V?`;
  empty wish ESC; skip amulet_wish; Wizard Norep; maze `rn2(2)` Sokoban;
  TELE on occupied mon; skip `were_change`/`m_avoid_soko_push_loc`;
  `dlevel` in traptype_rnd; hardcode PARTISAN; skip LONG_WORM/S_MUMMY;
  sticky `urole.rank`; omit bones `utrack`; skip Blindf_on / confused
  mispronounce / wizard yn / identify `more_experienced(0,10)`;
  `vision_recalc(2)` newsym loop; D-0480 coerce; frame-align; raw
  RNG-index/coord hacks; force doorct/THEMEROOM in production;
  invent post-makemon boulder-mimic retry (D-0605); vamp-only
  `select_newcham_form`; extract without `-DMAIL_STRUCTURES`.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0606 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0583: leave-level gbuf mon→memory; ordinary vision_recalc(2) regresses.
- D-0592–D-0596: COURT/portal/web/`set_wear` settled — don’t reopen.
- D-0597: pool/lava **not** @7973 cause — open ROOM cnt=8 was JS-only pos.
- D-0598: @7973 was missing `searches_for_item` (POT_HEALING gg).
- D-0599: @11065 was missing rolling-boulder `launch_obj`, not dmgval body.
- D-0600: @12287 was stub TEMPLE; next was pick_room wizard, not shrine body.
- D-0601: niches/mimic/G_GONE shipped; @12288 cause was D-0602 wizard.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0603: @12294 was missing MS_PRIEST mace/invent, not rn2(75) itself.
- D-0604: @13719 was stub `pri_move` (no altar mill), not distfleeck.
- D-0605: @13839 was JS inventing boulder-mimic retry C never takes.
- D-0606: @18684 was vamp-only newcham + extract missing MAIL_DAEMON.

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
  **`mktemple`/`priestini`/`newepri`** (D-0600); niches/mimic/G_GONE
  (D-0601); **`pick_room` wizard≡debug** (D-0602); **MS_PRIEST gear
  (D-0603)**; **`pri_move`/`histemple_at` (D-0604)**; **soko mimic
  boulder no retry (D-0605)**; **`select_newcham_form` + MAIL extract
  (D-0606)**; `intemple` + SWAMP deferred.
- Rolling boulder: `launch_obj` + `trapeffect_rolling_boulder_trap` (D-0599).
- C: `#define wizard flags.debug` — any `|| wizard` needs `flags.debug`.
- Recorder `SPECIAL_PM=330` requires `PM_MAIL_DAEMON` in extract.
