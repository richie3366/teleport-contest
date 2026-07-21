# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1048** — Blind map screen
  `(41,6)`/`(42,6)` (= map `(42,6)`/`(43,6)`): C DEC ice `~~`
  vs JS lizard `:` + iron chain `_`. Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Falsify: C dump `levl[42][6].typ` / `glyph` vs JS ROOM + mem
  corpse/chain; or port `feel_location` / ice typ under Punished.

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
- Do not invent create_particular appear pline from mtmp.mx/my —
  C appear is makemon !MM_NOMSG; next2u uses **requested** (x,y)
  (wizgenesis u.ux,u.uy → always “next to you”) (#1164).
- Do not treat @1001 moat as swim-tip wording — was `waterbody_name`
  Medusa `"shallow sea"` (#1163).
- Do not treat @997 hissing vs fire-hits-you as buzz reorder — was
  missing `zap_over_floor` Norep + The (#1162).
- Do not treat @1048 `:_` as generic Blind floor glyphs — JS paints
  lizard corpse + chain on ROOM; C ice memory (DEC `~`) (#1165).
  Neighbor C `~` vs JS `·` still match via DEC_MAP.

## Landmarks (≤15)

- suite **42/44** @#1165 Scr **11024**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.25/turn`; next cadence @**#1170**.
- **D-0928 #1165:** score cadence; @1048 = 2 cells — C ice `~~` vs
  JS `:`/`_` (corpse+chain); typ ROOM in JS.
- **D-0928 #1164:** drop invent create_particular appear; add
  `makemon_appear_msg` (req x,y next2u + MM_NOEXCLAM); Scr
  **1433→1434**; prefix **@1034→@1048** Blind ice vs objs.
- **D-0928 #1163:** `waterbody_name` Medusa/juiblex/samurai/ICE/
  waterlevel; Scr **1431→1433**; @1001 OK; next @1034 wizgenesis.
- **D-0928 #1162:** zap_over_floor hissing-gas Norep + hit The;
  Scr **1427→1431**; @997–@1000 OK; next @1001 shallow sea vs moat.
- **D-0928 #1161:** wakeup `wake_msg` + growl; Scr **1423→1427**;
  @985–@996 OK; next @997 hissing gas vs fire order.
- **D-0928 #1160:** savelev/getlev `lastseentyp`; Scr **1412→1423**;
  @941 OK; next @985 nymph disarm vs wake.
- **D-0928 #1159:** `goto_level` Punished climb great_effort; Scr
  **1409→1412**; @929 OK; next @941 overview extras.
- **D-0928 #1158:** `show_map_spot` engraving remapping; Scr
  **1390→1409**; @902 OK; next @929 climb-stairs More.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**; seed4500 Scr **1389** held; four near-misses PASS.
- **D-0928 #1154:** `stairs_description` depth/dunlev; Scr
  **1388→1389**; @832 OK; next @893 `#overview` Level 3 vs 25.
- **D-0928 #1151:** teleds placebc + overlay topline; Scr
  **1147→1366**; @789 OK — overlay half narrowed in D-0929.
