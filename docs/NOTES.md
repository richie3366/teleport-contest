# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1464** — botl T:**229** vs C T:**231**
  (map `~` vs `e` @1441 fixed). Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Falsify: dump C/JS `moves`/`hero_seq`/occupation around T:229–231
  after mold Blind (guard footsteps More).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not treat @1291 look_here corner paint — was sanctum solidfill
  BOOL_RANDOM lit (`lspo_map` lit=FALSE clear; #1173).
- Do not treat @1322 getpos `unexplored area` as lastseentyp/glyph
  — was missing furniture in `cmap_defsym_explanation` (#1174).
- Do not treat @1344 blank topline as WIN_STOP/More — was missing
  `dountrap`→`untrap`→`getdir` (#1175).
- Do not treat @1347 `$` as `feature_match_tags`/`S_goodpos` scan —
  default `$` is `NHKF_GETPOS_SHOWVALID` before matching (#1176).
- Do not treat @1438 poly More Knight botl as deferred bot after More
  — `set_uasmon` must `float_vs_flight`→botl; @1439 load vs gloves
  was missing `dropz`→`encumber_msg` (#1177).
- Do not treat @1441 map `e` vs DEC `~` as feel_location/newsym-only
  — mold FROMFORM Blind left stale IN_SIGHT; missing `polymon`
  `vision_full_recalc=1` (#1178).
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **42/44** @#1175 Scr **11170**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.26/turn`; next cadence @**#1180**.
- **D-0928 #1178:** polymon `vision_full_recalc`; prefix
  **@1441→@1464**; Scr **1586→1716**; next botl T:229 vs T:231.
- **D-0928 #1177:** `float_vs_flight` + `dropz` encumber; prefix
  **@1438→@1441**; Scr **1583→1586**.
- **D-0928 #1176:** getpos SHOWVALID `$`; prefix **@1347→@1438**;
  Scr **1580→1583**.
- **D-0928 #1175:** `untrap`→`getdir(NULL)`; prefix **@1344→@1347**;
  Scr **1579→1580**.
- **D-0928 #1174:** getpos furniture cmap (fountain…bars); prefix
  **@1322→@1344**; Scr **1576→1579**.
- **D-0928 #1173:** sanctum map lit=FALSE clear after `splev_apply`;
  prefix **@1291→@1322**; Scr **1529→1576**.
- **D-0928 #1172:** overview dismiss `dismiss_nhw_menu` (no corner
  docrt); prefix **@1252→@1291**; Scr **1525→1529**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**; seed4500 Scr **1389** held; four near-misses PASS.
