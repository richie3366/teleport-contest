# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 RNG complete; Scr **1386**/1814;
  first miss **@831**. C `You hear the howling of the CwnAnnwn...--More--`
  vs JS staircase getpos topline. Focused:
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
- Do not treat @104217 as wrong `exercise` modulus — was stub `mfind0`
  + unwired `#wizwhere` (#1115).
- Do not treat @104241 as Fast umov surplus / FORCE VF — was missing
  `carrying_too_much` (#1117).
- Do not treat @107646 `rn2(79)` as ordinary fill root — missing
  `Kni-goal` loader (#1134).
- Do not treat @814 floor vs `<` as display offset — was `mkstairs`
  missing end-of-dungeon no-op on minefill up (#1152).
- Do not treat @789 map-only after ^T stairs — missing `teleds`
  placebc + overlay keep getpos topline (#1151).
- Do not treat @753 bare invent apple — missing `doname` FOOD
  `oeaten` → `partly eaten ` (#1150).

## Landmarks (≤15)

- suite **42/44** @#1150 Scr **10737**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.25/turn`; next cadence @**#1155**.
- **D-0928 #1152:** `mkstairs` dunlev-end no-op; Scr **1366→1386**;
  @814 OK; next @831 CwnAnnwn.
- **D-0928 #1151:** teleds placebc + overlay topline; Scr
  **1147→1366**; @789 OK; next @814 stair glyph.
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
- **D-0928 #1143:** `#wizidentify`/`wiz_identify` + wizid
  `unid_cnt==0`; Scr **998→999**; prefix **@541→@559**.
- **D-0928 #1142:** `dodiscovered` `show_text_pages` + VENOM_CLASS;
  Scr **995→998**; prefix **@521→@541**.
- **D-0928 #1141:** BALL `very `/`(chained to you)` + check_here skip
  uchain; Scr **970→995**; prefix **@517→@521**.
- **D-0928 #1140:** makeplural `singplur_compound`; Scr **969→970**.
- **D-0928 #1139:** hideunder You_see + statue simpleonames; Scr
  **966→969**.
