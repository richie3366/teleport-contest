# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**103155**. #1113 DIAG:
  not getlev — after Count:40 `.`, C `e` is nothing-to-eat (no keys)
  then SP + Count:20 `.` (fleeck inside wait). JS floor 11 apples +
  invent carrot/apple → floorfood/getobj eats those keys then `^V`.
  Do **not** ship inediate `is_edible=false` (advances to 104217 but
  contradicts C `is_edible` FOOD_CLASS). Next: invent/floor food
  provenance vs C. Focused:
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
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @103155 getlev/`^V` as the cause — eat key-desync (#1113).
- Do not ship inediate `is_edible` reject for FOOD_CLASS (#1113).
- Do not re-allow mold `#throw` without `ok_to_throw` (#1112).

## Landmarks (≤15)

- suite **42/44** @#1110 Scr **10518**/11405 RNG **787753**/792838
  (99.36%); speed `29+0.25/turn`; next cadence @**#1115**.
- **D-0928 #1113:** eat floorfood/getobj key desync; still @**103155**;
  next invent/floor food vs C empty eat.
- **D-0928 #1112:** ok_to_throw + mtimedone; still @**103155**.
- **D-0928 #1111:** select_newcham random while; prefix **103155**;
  RNG **103264** Scr **928**.
- **D-0928 #1110:** eel minliquid monflee; was @**103071**.
- **D-0928 #1109:** Blind FROMFORM; was @**101710**.
- **D-0928 #1108:** eel mfndpos nexttry; was @**101641**.
- **D-0928 #1107:** eel hideunder; was @**101616**.
- **D-0928 #1106:** `u_rooted`; was @**101608**.
- **D-0928 #1105…#1092:** passiveum / nolimbs / polyself / goodpos /
  water / caitiff / Blind/wish / wait / dobuzz / I-glyph / flip.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
