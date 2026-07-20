# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 @54329 — C `somex`/`somey` `rn2(2)`/
  `rn2(5)` vs JS `rn2(12)` after matched `fill_ordinary_room`.
  Falsifier:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0916 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not omit Nesting nested create_subroom/door / lspo_door `rnddoor`
  (D-0916).
- Do not omit `goto_level` Punished `unplacebc`/`placebc` (D-0915).
- Do not stub `mk_knox_portal` place under wizard/debug (D-0914).
- Do not leave `x` unbound / skip setworn twoweap clear (D-0913).
- Do not omit `#turn`/`doturn` chant+exercise (D-0912).
- Do not re-zero `ox`/`oy` in `obj_extract_self` (D-0911; C keeps them).
- Do not stub ordinary-food `doeat` rotten / omit `Hear_again` (D-0911).
- Do not omit `HDeaf` TIMEOUT decrement in `nh_timeout` (D-0911).
- Do not omit once-per-turn `regen_pw` / `rn1` Pw recover (D-0910).
- Do not omit Punished `drag_ball`/`move_bc`/`cause_delay` (D-0909).
- Do not omit `SCR_PUNISHMENT` / `punish` / `placebc` (D-0908).
- Do not omit `set_occupation(learn)` / learn `makeknown` credit_hero
  (D-0907).

## Landmarks (≤15)

- suite **42/44** @#1065 Scr **10198**/11405 RNG **737530**/792838
  (93.02%); next cadence @#1070.
- **D-0916 #1067:** Nesting nested + lspo_door rnddoor; seed4500
  **52803→54329** RNG **54647** Scr **613**.
- **D-0915 #1066:** goto_level unplacebc/placebc; seed4500
  **52643→52803** RNG **52925** Scr **611**.
- **#1065 score:** seed4500 was @52643; shk/`onlineu` = stranded ball.
- **D-0914 #1064:** mk_knox_portal place under wizard; seed4500
  **50844→52643** RNG **52967** Scr **608**.
- **D-0913 #1063:** `x`/doswapweapon + setworn twoweap clear;
  seed4500 **50338→50844** RNG **50936** Scr **594**.
- **D-0912 #1062:** `#turn`/`doturn`; seed4500 **50290→50338**
  RNG **50401** Scr **594**.
- **D-0911 #1061:** extract ox/oy + rottenfood + HDeaf; seed4500
  **50111→50290** Scr **499→596** RNG **50469**.
- **D-0910 #1060:** regen_pw; seed4500 **50054→50111**
  RNG **50220→50240** Scr **499**.
- **D-0909 #1059:** drag_ball/move_bc; seed4500 **50034→50054**
  RNG **50167→50220** Scr **499**.
- **D-0908 #1058:** SCR_PUNISHMENT punish/placebc; seed4500
  **49915→50034** Scr **481→499** RNG **50071→50167**.
- **D-0907 #1057:** study learn+makeknown; seed4500 **49776→49915**
  Scr **459→481**.
- **D-0906 #1056:** hellfill+create_maze; seed4500 **32538→49776**
  Scr **308→459**.
- **D-0905 #1055:** Erinys peace_minded; seed4500 **28249→32538**
  Scr **302→308**.
- **D-0904 #1054:** find_hell; seed4500 **18153→28249** Scr **302**.
