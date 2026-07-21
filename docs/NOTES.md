# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**106540**. #1122:
  `mattacku` AT_MAGC→`castmu` + castmu dmg dice; prefix
  **106536→106540**. Next: C `distfleeck` `rn2(5)` vs JS `rn2(25)`
  (courage / Upolyd conceal hyp). Focused:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

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
- Do not treat @104705 as fleeck rn2(4)/fmon-order alone — was missing
  S_BAT Inhell MFAST; don’t FORCE bat@46 +12 (#1118–#1119).
- Do not treat @106304 fleeck vs lined_up as root — was missing
  covetous `tactics` + fire-trap `destroy_items` (#1120).
- Do not treat @106531 as wrong base mattk dice — was missing poly
  `COLD_RES` FROMFORM + `getmattk` lich cold→PHYS (#1121).
- Do not treat @106536 as wrong `m_lev`/spell list — was missing
  `mattacku` AT_MAGC→`castmu` (#1122).

## Landmarks (≤15)

- suite **42/44** @#1120 Scr **10527**/11405 RNG **791103**/792838
  (99.78%); speed `30+0.24/turn`; next cadence @**#1125**.
- **D-0928 #1122:** AT_MAGC castmu; was @**106536**; prefix
  **106536→106540**; runner RNG **106559** Scr **937**.
- **D-0928 #1121:** set_uasmon MR_* + getmattk lich cold; was @**106531**;
  prefix **106531→106536**; runner RNG **106546** Scr **937**.
- **D-0928 #1120:** tactics + fire destroy_items; was @**106304**.
- **D-0928 #1119:** S_BAT Inhell MFAST; was @**104705**.
- **D-0928 #1118:** @104705 early shapeshift; bat MFAST omit (→#1119).
- **D-0928 #1117:** carrying_too_much; was @**104241**.
- **D-0928 #1116:** break_armor nohands shed; was @**104241**.
- **D-0928 #1115:** mfind0 + wizwhere; was @**104217**.
- **D-0928 #1114:** hitmu hidden-under; was @**104217** exercise.
- **D-0928 #1113:** eat key-desync misread (More not empty eat).
- **D-0928 #1112:** ok_to_throw + mtimedone; was @**103155**.
- **D-0928 #1111:** select_newcham random while; was @**103071**.
- **D-0928 #1110…#1092:** eel / Blind FROMFORM / …
