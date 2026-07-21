# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**104217**. #1114: hitmu
  mundetected “hidden under” fixed More/eat key-desync
  (**103155→104217**). Next: C `rn2(19) @ exercise` vs JS `rn2(5)`.
  Focused:
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
- Do not treat @103155 getlev/`^V` as the cause — More/eat desync (#1113).
- Do not ship inediate `is_edible` reject for FOOD_CLASS (#1113).
- Do not chase invent/floor apple provenance as @103155 root — both have
  them; bug was missing hitmu hidden-under More (#1114).

## Landmarks (≤15)

- suite **42/44** @#1110 Scr **10518**/11405 RNG **787753**/792838
  (99.36%); speed `29+0.25/turn`; next cadence @**#1115**.
- **D-0928 #1114:** hitmu hidden-under; prefix **103155→104217**
  (runner RNG **104364** Scr **928**); next @**104217** exercise.
- **D-0928 #1113:** eat key-desync misread (More not empty eat).
- **D-0928 #1112:** ok_to_throw + mtimedone; was @**103155**.
- **D-0928 #1111:** select_newcham random while; was @**103071**.
- **D-0928 #1110:** eel minliquid monflee; was @**103071**.
- **D-0928 #1109:** Blind FROMFORM; was @**101710**.
- **D-0928 #1108:** eel mfndpos nexttry; was @**101641**.
- **D-0928 #1107:** eel hideunder; was @**101616**.
- **D-0928 #1106:** `u_rooted`; was @**101608**.
- **D-0928 #1105…#1092:** passiveum / nolimbs / polyself / goodpos /
  water / caitiff / Blind/wish / wait / dobuzz / I-glyph / flip.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
