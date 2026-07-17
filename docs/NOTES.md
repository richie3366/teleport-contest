# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#703 D-0632:** `relobj_on_death` omitted C `mdrop_obj` `distant_name`
  observe → disco Armor order reversed (cloak/shoes). Scr **363→364**/366;
  @358 MATCH.
- **Next fail:** @360 attrs `(1 of 2)` vs `(1 of 3)` — JS missing Hallu
  (Grayswandir), automatic searching, reflection (silver DSM), life will
  be saved; wielding `weapon` vs `saber`; hunger `<754>` vs `<750>`;
  pray `(697)` vs `(656)`; cursor @361 row 21 vs 23.
- **Falsify attrs:** inspect `insight.c` `enlightenment` / `attribs` vs
  `js/insight.js` extrinsic lines; saber via `weapon_descr` / skill.
- **Leaderboard gap:** local **33/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0632; wear `[*?]`; stub `^V?`; empty wish ESC;
  skip amulet_wish; Wizard Norep; maze `rn2(2)` Sokoban; TELE on occupied
  mon; skip `were_change`/`m_avoid_soko_push_loc`; `dlevel` in traptype_rnd;
  hardcode PARTISAN; skip LONG_WORM/S_MUMMY; sticky `urole.rank` for `%r`
  (now `rank_of`); omit bones `utrack`; skip Blindf_on / confused
  mispronounce / wizard yn / identify `more_experienced(0,10)`;
  `vision_recalc(2)` newsym loop; D-0480 coerce; frame-align; raw
  RNG-index/coord hacks; force doorct/THEMEROOM; invent boulder-mimic
  retry (D-0605); vamp-only `select_newcham_form`; extract without
  `-DMAIL_STRUCTURES`; skip minend-1 when `makemaz` picks it; map Lua
  `"("`→WEAPON; omit `ranged_attk_available` in MMOVE_MOVED; omit
  `m_move` cnt==0 tryescape `use_defensive`; omit `hitval` `spec_abon`;
  omit mfndpos diagonal squeeze; omit `artifact_hit`/`spec_dbon` after
  dmgval; omit `on_start` nexttime/othertime after first_start; force
  all qt_pager through NHW_TEXT; raw `rn2(sx)` tower1 candles; invent
  15th Arc-goal `des.object`; stub `on_goal`; skip bigrm-7; skip getlev
  `restrap`/hide_monst viz; skip fog `m_everyturn`/cham shapeshift;
  skip movemon `restrap`; skip Arc firsttime; invent vision blank for
  getpos floor; check `flags.wizard` alone for C `wizard`; force
  mundetected on all S_SNAKE (python !M1_CONCEAL); omit `questarti` on
  `game.urole`; omit non-pit trap in makemon snake hideunder;
  omit `is_weptool` in `ini_inv_use_obj` / weptool donameClass /
  TINNING_KIT charged; omit `distant_name` in `relobj_on_death`.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0632 done.
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
- D-0620…31: see INDEX; D-0632: @358 was death-drop distant_name observe
  (not look_here / pile invent order).

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
- Quest: Arc firsttime (D-0625); `is_pure` wizard≡debug + `%r`/`%ra`
  (D-0627); snake hideunder `hides_under` (D-0628) + non-pit trap
  (D-0630); **questarti on urole** (D-0629); **ini_inv is_weptool +
  doname charged/weptool** (D-0631); **relobj distant_name disco**
  (D-0632); seed0361 Scr 364; remaining attrs pages; eel `hideunder` /
  minliquid / I_SPECIAL equip deferred; vamp shapeshift arms /
  `run_regions` ttl age deferred; `intemple` + SWAMP / Bar-goal /
  Pri-* / other bigrm-N / other-role firsttime deferred; getpos object
  glyphs / altar/ndoor/cloud deferred; convert_arg pronoun/plural
  deferred; other-role `roles[].questarti` still omitted;
  `can_hide_under_obj` coins in makemon inline deferred.
- Rolling boulder: `launch_obj` + `trapeffect_rolling_boulder_trap` (D-0599).
- C: `#define wizard flags.debug` — any `|| wizard` needs `flags.debug`.
- Recorder `SPECIAL_PM=330` requires `PM_MAIL_DAEMON` in extract.
- defsym: `')'`=WEAPON, `'('`=TOOL, `'*'`=GEM; Arc-goal **14** `des.object()`.
- Arc nexttime: no lua `output` → deliver_by_pline (not text window).
- Quest `des.monster("M")` → S_MUMMY (uppercase); `"m"` → S_MIMIC.
- Python: `S_SNAKE` but **!M1_CONCEAL** (unlike garter/snake/viper/cobra).
