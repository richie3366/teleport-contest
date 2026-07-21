# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1625** — C topline `You can't see...`
  vs JS `Kabalebo is not near enough to receive your payment.`
  Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Falsify: C path at pay/see boundary (prefer temp C dump — playbook §7).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not treat @1573 challenges More r11 vs r20 as leftover WIN_MESSAGE
  — was empty `show_achievements` + missing `record_achievement` (#1181).
- Do not treat @1501 `an engagement ring` as wish `dknown`/readobjnam
  — prop Blind (D-0716; #1180).
- Do not treat @1464 T:229 vs T:231 as missed `moves++` — timebot (#1179).
- Do not treat @1441 map `e` vs DEC `~` as feel/newsym-only —
  polymon `vision_full_recalc` (#1178).
- Do not treat @1438 poly botl as deferred bot — float_vs_flight (#1177).
- Do not treat @1347 `$` as S_goodpos — SHOWVALID (#1176).
- Do not treat @1344 blank as WIN_STOP — untrap getdir (#1175).
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **42/44** @#1180 Scr **11312**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.25/turn`; next cadence @**#1185**.
- **D-0928 #1181:** `show_achievements` + `record_achievement`;
  ACH_RNK/HELL/MINE/TOWN/SHOP/TMPL; prefix **@1573→@1625**;
  Scr **1722→1723**.
- **D-0928 #1180:** prop Blind in `doname`/`xname`; prefix
  **@1501→@1573**; Scr **1720→1722**.
- **D-0928 #1179:** `timebot`/`time_botl`; prefix **@1464→@1501**.
- **D-0928 #1178:** polymon `vision_full_recalc`; prefix **@1441→@1464**.
- **D-0928 #1177:** `float_vs_flight` + `dropz` encumber; **@1438→@1441**.
- **D-0928 #1176:** getpos SHOWVALID `$`; **@1347→@1438**.
- **D-0928 #1175:** `untrap`→`getdir(NULL)`; **@1344→@1347**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
