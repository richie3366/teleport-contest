# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**929** C climb-stairs `--More--`
  vs JS already Dlvl:6 staircase-down. Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not “fix” gethungry / clear invuln to hide early `#pray` (#1095).
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @103155 getlev/`^V` as root; no inediate FOOD reject (#1113).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not treat @832 stair “level 1” as dig-depth — was
  `stairs_description` using `tolev.dlevel` not `depth` (#1154).
- Do not treat @831 staircase getpos as root — was deferred
  `maybe_wail` after iron-ball `losehp` (#1153).
- Do not treat @814 floor vs `<` as display offset — was `mkstairs`
  missing end-of-dungeon no-op on minefill up (#1152).
- Do not treat @893 overview Level 25 alone as interest_mapseen filter
  — missing leave `recalc_mapseen`, `show_map_spot`→`room_discovered`,
  `recbranch_mapseen`, shop_string (#1157).
- Do not treat @902 `` ` ``/bright-blue as pool/`~` — was `S_engroom`
  after `#wizmap`; `show_map_spot` must `map_engraving` (#1158).

## Landmarks (≤15)

- suite **42/44** @#1156 Scr **10979**/11405 RNG **792838**/792838
  (**100%**); speed `33+0.26/turn`; next cadence @**#1160**.
- **D-0928 #1158:** `show_map_spot` engraving remapping; Scr
  **1390→1409**; @902 OK; next @929 climb-stairs More.
- **D-0928 #1157:** mapseen msrooms/shop_string/`show_map_spot`
  room_discovered + leave recalc + recbranch; Scr **1389→1390**;
  @893 OK; next @902 map `~` vs `·` (was engroom).
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**; seed4500 Scr **1389** held; four near-misses PASS.
- **D-0928 #1154:** `stairs_description` depth/dunlev; Scr
  **1388→1389**; @832 OK; next @893 `#overview` Level 3 vs 25.
- **D-0928 #1153:** `maybe_wail` + `finish_maybe_wail`; Scr
  **1386→1388**; @831 OK; next @832 stair depth 5 vs 1.
- **D-0928 #1152:** `mkstairs` dunlev-end no-op; Scr **1366→1386**;
  @814 OK; next @831 CwnAnnwn.
- **D-0928 #1151:** teleds placebc + overlay topline; Scr
  **1147→1366**; @789 OK — overlay half narrowed in D-0929.
- **D-0928 #1150:** doname FOOD `oeaten`/`greased`; Scr
  **1146→1147**; @753 OK.
- **D-0928 #1149:** self_lookat Punished + bare ball; Scr
  **1142→1146**; @787 OK.
- **D-0928 #1148:** `getobj_takeoff` yn leave toplines; Scr
  **1141→1142**; prefix **@751→@787**.
- **D-0928 #1147:** `#name` getobj `name_ok`/`do_oname`; Scr
  **1120→1141**; prefix **@707→@751**.
- **D-0928 #1146:** wizard `#enhance` y_n/speedy; Scr **1001→1120**;
  prefix **@630→@707**.
- **D-0928 #1145:** `interest_mapseen` `#overview`; Scr **1000→1001**;
  prefix **@614→@630**.
- **D-0928 #1144:** `select_menu_pick_any` MENU_SELECT_ALL/PAGE;
  Scr **999→1000**; prefix **@559→@614**.
