# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1689** — C getpos
  `Move cursor to a monster, object or location:` vs JS
  `Unknown direction: '^R' (use 'h', 'j', 'k', 'l' or '.')`.
  Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Falsify: C `getpos` accepts `^R` redraw; JS may be in `getdir`
  (§7 dump keystream / cmd at locus).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not treat @1679 apply as getobj — `doapply` nohands+capacity (#1186).
- Do not treat @1681 invent typed ring/wand as doname-only —
  invent_lines sticky Blind observe (#1186; #1180 was xname/doname).
- Do not treat @1674 carry vs eat as `is_edible`/FOOD-only —
  `doeat` `check_capacity` (#1185).
- Do not treat @1658 `/` vs `#` as open door — Blind `dosearch0`
  `feel_location` mapped `WAN_OPENING` (#1184).
- Do not treat @1650 `#wizwhere` More as NHW_TEXT `show_text_pages`
  — C `print_dungeon` always NHW_MENU; dmore offset 2 (#1183).
- Do not treat @1625 Kabalebo "not near enough" as shop nearness FORCE
  — was Blind `dopay` `canspotmon` seensk stub (#1182).
- Do not treat @1573 challenges More r11 vs r20 as leftover WIN_MESSAGE
  — was empty `show_achievements` + missing `record_achievement` (#1181).
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **42/44** @#1185 Scr **11374**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.26/turn`; next cadence @**#1190**.
- **D-0928 #1186:** `doapply` nohands+capacity + invent prop Blind;
  prefix **@1679→@1689**; Scr **1784→1793**.
- **D-0928 #1185:** `doeat` `check_capacity`; prefix **@1674→@1679**;
  Scr **1783→1784**; suite Scr **11373→11374**.
- **D-0928 #1184:** `dosearch0` Blind `feel_location`; prefix
  **@1658→@1674**; Scr **1732→1783**.
- **D-0928 #1183:** `#wizwhere` → `show_nhw_menu_text` (NHW_MENU);
  prefix **@1650→@1658**; Scr **1724→1732**.
- **D-0928 #1182:** `dopay` Blind/`canspotmon`/`You_cant("see...")`;
  prefix **@1625→@1650**; Scr **1723→1724**.
- **D-0928 #1181:** `show_achievements` + `record_achievement`;
  ACH_RNK/HELL/MINE/TOWN/SHOP/TMPL; prefix **@1573→@1625**;
  Scr **1722→1723**.
- **D-0928 #1180:** prop Blind in `doname`/`xname`; prefix
  **@1501→@1573**; Scr **1720→1722**.
- **D-0928 #1179:** `timebot`/`time_botl`; prefix **@1464→@1501**.
- **D-0928 #1178:** polymon `vision_full_recalc`; prefix **@1441→@1464**.
- **D-0928 #1177:** `float_vs_flight` + `dropz` encumber; **@1438→@1441**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
