# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#724 D-0652:** seed0367 @26695→**27121**. Cause was `align_shift`
  missing C `oldmoves`/`Is_special` cache (stale bigrm ash=0) plus JS
  setting `moves=1` before starting mklev (broke tutorial refresh).
  Next: @27121 C `next_ident` `rnd(2)` vs JS `makemon_rnd_goodpos`
  `rn2(77)` after matched goodpos (post-statue mon place/invent).
- **Leaderboard gap:** local **34/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0652; wear `[*?]`; stub `^V?`; empty wish ESC;
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
  omit `is_weptool` / `distant_name` / attrs Hallu… / `ublesscnt--` /
  gethungry case 8 / garlic_breath / blue DSM / Priest kit retrospectives;
  invent intemple without Pri-strt MAGIC_PORTAL; pre-set `u.urooms` in
  `teleds`; skip `#chat` MS_LEADER; omit AD_SPEL/AD_CLRC / castmu;
  omit Pri-loca/MORGUE/fill_zoo roomno/m_initinv S_DEMON… retrospectives;
  invent place_lregion for @19994/@26691; invent S_ANGEL/quest_portal/
  medusa-1; skip align_shift oldmoves / set moves=1 before mklev.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0652 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0603: @12294 was missing MS_PRIEST mace/invent, not rn2(75) itself.
- D-0604: @13719 was stub `pri_move` (no altar mill), not distfleeck.
- D-0605…D-0614: see DIVERGENCE-INDEX.
- D-0615/16: @23016 was qt_pager window vs pline, not Medusa/getbones arg.
- D-0616…51: see INDEX; D-0642: @3438 was missing Pri-loca, not
  getbones arity; D-0643: @10674 was overlap MON_AT, not corpse gate;
  D-0644: @13882 was missing S_DEMON, not trailing rn2(50);
  D-0645: @15167 was eastern morgue hx 39→35, not place_lregion math;
  D-0646: @15172 was missing Pri-goal, not Pri-fila;
  D-0647: @17449 was missing minetn-2 (+ flip sbrooms), not place_lregion;
  D-0648: @19994 was missing bigrm-3, not place_lregion;
  D-0649: @26229 was deferred S_ANGEL kit, not trailing rn2(75);
  D-0650: @26688 was missing quest_portal com_pager, not broken shuffle;
  D-0651: @26691 was missing medusa-1, not place_lregion after rnd(4);
  D-0652: @26695 was align_shift cache + moves=0 thru mklev, not
  difficulty-band invent.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361**
  **PASS** (suite **34/44** @#720).
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
- Quest landmarks through D-0652: see INDEX; Pri-loca + MORGUE +
  fill_zoo roomno + m_initinv S_DEMON/WRAITH/LICH + eastern hx 35 +
  Pri-goal + minetn-2 + bigrm-3 + S_ANGEL + quest_portal + medusa-1 +
  **align_shift oldmoves** / **moves=0 through mklev**;
  S_KOP / Pri-fila/filb / minetn-1/3–7 / **medusa-2/3/4** deferred;
  next @27121 post-statue goodpos/next_ident; eel hideunder /
  I_SPECIAL deferred; SWAMP deferred; `temperature_shift` stub.
- Rolling boulder: `launch_obj` + rolling-boulder trap (D-0599).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
- defsym: `')'`=WEAPON, `'('`=TOOL; Arc-goal **14** `des.object()`.
- Quest `"M"`→S_MUMMY; `"m"`→S_MIMIC. Python S_SNAKE !M1_CONCEAL.
