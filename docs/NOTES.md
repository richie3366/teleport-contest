# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**90543**. #1097 fixed
  annotation More + Blind Count wait stop + wiz BLINDED silent.
  Prefix **90492→90543**. Next: C `d(4,8) @ peffect_extra_healing`
  vs JS `rn2(12)` after wish. Focused:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place matched (D-0928).
- Do not chase last=77 / FlipX sum80 — C dump falsifies (#1092).
- Do not treat screen `>`@31 as stairway x — C stairway **(32,16)** (#1092).
- Do not FORCE FlipX minx=1 / maxx=78 / stone78 / exclude78 (#1088–#1089).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not “fix” gethungry / clear invuln to hide early `#pray` (#1095).
- Do not omit Count:N `.` timed_occupation / Blind feel (#1096).
- Do not omit `print_level_annotation` / `hitmu` stop_occupation /
  wiz BLINDED silent (#1097); @90492 was wait/feel key desync.
- Do not omit mhitm_ad_blnd / breamm AT_BREA / invent[] splice
  (D-0924…D-0926; see index).

## Landmarks (≤15)

- suite **42/44** @#1095 Scr **10397**/11405 RNG **774444**/792838
  (97.68%); speed `33+0.26/turn`; next cadence @**#1100**.
- **D-0928 #1097:** annotation + hitmu stop + wiz Blind; prefix
  **90543**; RNG **91186** Scr **841**/1814.
- **D-0928 #1096:** Count:N `.` + Blind feel; was prefix **90492**.
- **D-0928 #1095:** @89775 was early JS `#pray` (wait race).
- **D-0928 #1094:** dobuzz `type < 0` `monkilled`; was prefix **89775**.
- **D-0928 #1093:** `domove_fight_empty` I-glyph.
- **D-0928 #1092:** C flip sum81 + stair(32,16) + place≡JS.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
