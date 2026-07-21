# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1808** — ^X attributes
  C `You are a Knight, level 15 male human.` vs JS
  `You are a Knight, a level 15 male human Knight.` (+ page
  `(1 of 3)` vs `(1 of 2)`). Falsify: `insight.c`
  `background_enlightenment` `!strcmpi(rank,role)` → omit role +
  `urace.noun` + no `"a "` before level; also Punished/wounded-leg
  status line order.
  Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Do not re-break Kni goal_first (#1193).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not treat @1799 as heat/smoke / lev_message order —
  missing Kni `goal_first` (#1193); heat/smoke follows onquest.
- Do not treat @1770 as Norep/parse-clear alone — `iflags.cmdassist`
  after Options toggle (#1192); do not read `flags.cmdassist`.
- Do not treat @1761 as mtimedone-only / skip PSI plines —
  cast+PSI plines + `urgent_pline` (#1191); ESC More sets WIN_STOP.
- Do not treat @1712 quit leftover as parse-only clear — `done2` cancel
  `clear_nhwindow(WIN_MESSAGE)` (#1190).
- Do not treat @1698 open door as feature-char matching — doors skipped
  in matching[]; need mMoOdDxX `gather_locs` (#1189).
- Do not treat @1691 stone/corridor as typ-CORR win — blank S_stone
  glyph + lastseentyp STONE before typ (#1188; C lookat fallthrough).
- Do not bare-promote blank→stone without last/typ STONE|SCORR gate
  (seed0012; D-0813/D-0817).
- Do not treat @1689 `^R` as getdir Unknown — getpos `redraw_cmd` (#1187).
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **42/44** Scr **11389**/11405 @#1190 RNG **100%**;
  speed `30+0.25/turn`; next cadence @**#1195**.
- **D-0928 #1193:** Kni `goal_first`/`goal_next`; prefix
  **@1799→@1808**; Scr **1807→1812**.
- **D-0928 #1192:** cmd_safety `iflags.cmdassist`; prefix
  **@1770→@1799**; Scr **1803→1807**.
- **D-0928 #1191:** castmu cast+PSI/OPEN plines + `urgent_pline` +
  polyman was_blind `make_blinded`; prefix **@1761→@1770**; Scr
  **1799→1803**.
- **D-0928 #1190:** `done2` cancel `clear_nhwindow_message`;
  prefix **@1712→@1761**; Scr **1798→1799**; suite Scr **11388→11389**.
- **D-0928 #1189:** mMoOdDxX `gather_locs` + DOOR_PREV `D`;
  prefix **@1698→@1712**; Scr **1796→1798**.
- **D-0928 #1188:** blank S_stone before typ CORR (`brief_at`/
  `auto_describe`/`describe_looked`); prefix **@1691→@1698**;
  Scr **1794→1796**.
- **D-0928 #1187:** getpos `redraw_cmd(^R)` + `getpos_refresh`;
  prefix **@1689→@1691**; Scr **1793→1794**.
- **D-0928 #1186:** `doapply` nohands+capacity + invent prop Blind;
  prefix **@1679→@1689**; Scr **1784→1793**.
- **D-0928 #1185:** `doeat` `check_capacity`; prefix **@1674→@1679**;
  Scr **1783→1784**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
