# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#690 score cadence:** full `sessions` → **33/44** Scr **6681**/11405
  RNG **398371**/792838 (**50.25%**). Δ vs #685: Scr +18, RNG +19387
  (D-0615…19). No new PASS.
- **#689 D-0619:** Home 5 `Arc-goal` → prefix **34204→42649**.
- **Next @42649:** C nhlib shuffle after matched `place_lregion` vs JS
  `rn2(79)` — next special after Arc-goal (leave Home / branch). Falsifier:
  stack ≠ post-goal `load_special` / nhl shuffle. Identify protofile
  before porting (do not guess Bar-goal/tower2).
- **Leaderboard gap:** local **33/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0619; wear `[*?]`; stub `^V?`; empty wish ESC;
  skip amulet_wish; Wizard Norep; maze `rn2(2)` Sokoban; TELE on occupied
  mon; skip `were_change`/`m_avoid_soko_push_loc`; `dlevel` in traptype_rnd;
  hardcode PARTISAN; skip LONG_WORM/S_MUMMY; sticky `urole.rank`; omit
  bones `utrack`; skip Blindf_on / confused mispronounce / wizard yn /
  identify `more_experienced(0,10)`; `vision_recalc(2)` newsym loop;
  D-0480 coerce; frame-align; raw RNG-index/coord hacks; force
  doorct/THEMEROOM in production; invent post-makemon boulder-mimic
  retry (D-0605); vamp-only `select_newcham_form`; extract without
  `-DMAIL_STRUCTURES`; skip minend-1 when `makemaz` picks it; map Lua
  `"("`→WEAPON; omit `ranged_attk_available` in MMOVE_MOVED; omit
  `m_move` cnt==0 tryescape `use_defensive`; omit `hitval` `spec_abon`;
  omit mfndpos diagonal squeeze; omit `artifact_hit`/`spec_dbon` after
  dmgval; omit `on_start` nexttime/othertime after first_start; force
  all qt_pager through NHW_TEXT; raw `rn2(sx)` for tower1 candles;
  single-loop WET get_location for room monsters; invent 15th Arc-goal
  `des.object` (Lua has 14).

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0619 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0603: @12294 was missing MS_PRIEST mace/invent, not rn2(75) itself.
- D-0604: @13719 was stub `pri_move` (no altar mill), not distfleeck.
- D-0605…D-0614: see DIVERGENCE-INDEX.
- D-0615/16: @23016 was qt_pager window vs pline, not Medusa/getbones arg.
- D-0617: @23223 was candle raw rn2 vs get_location_coord, not is_ok typo.
- D-0618: @31644 was missing Arc-filb, not themerms/ordinary branch.
- D-0619: @34204 was missing Arc-goal (+ Minion mitem/gender), not mineralize.

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
  (D-0606)**; **`minend-1` (D-0607)**; **`(`=TOOL not WEAPON (D-0608)**;
  **MMOVE_MOVED + `ranged_attk_available` (D-0609)**; **`m_move` cnt==0
  tryescape + healing `use_defensive` (D-0610)**; **`hitval`/`spec_abon`
  (D-0611)**; **`mfndpos` diagonal squeeze (D-0612)**; **`artifact_hit`/
  `spec_dbon` (D-0613)**; **`on_start` nexttime/othertime (D-0614)**;
  **`qt_pager` pline vs NHW_TEXT (D-0616)**; **tower1 candle
  `get_location_coord` (D-0617)**; **`Arc-fila`/`Arc-filb` (D-0618)**;
  **`Arc-goal` + Minion bell/`nemgend` (D-0619)**; `intemple` + SWAMP
  deferred; Bar-goal / Pri-* deferred.
- Rolling boulder: `launch_obj` + `trapeffect_rolling_boulder_trap` (D-0599).
- C: `#define wizard flags.debug` — any `|| wizard` needs `flags.debug`.
- Recorder `SPECIAL_PM=330` requires `PM_MAIL_DAEMON` in extract.
- defsym: `')'`=WEAPON, `'('`=TOOL, `'*'`=GEM.
- Arc nexttime: no lua `output` → deliver_by_pline (not text window).
- Quest `des.monster("M")` → S_MUMMY (uppercase); `"m"` → S_MIMIC.
- Arc-goal: **14** random `des.object()` (not 15).
