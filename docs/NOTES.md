# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 @61689 — C `fix_worst_trouble` `rnd(5)`
  vs JS `rn2(1000)` after matched `pleased`.
  Falsifier:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0919 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not omit `nh_timeout` FAST TIMEOUT / leave Very_fast sticky (D-0919).
- Do not omit `goto_level` stair-fall `drag_down`/`ballrelease` (D-0918);
  gate with `uball` (≡C `Punished`), not sticky `u.Punished`.
- Do not omit `fill_ordinary_room` nsubrooms recursion before needfill
  (D-0917).
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

## Landmarks (≤15)

- suite **42/44** @#1070 Scr **10233**/11405 RNG **746329**/792838
  (94.13%); next cadence @#1075.
- **D-0919 #1070:** FAST TIMEOUT; seed4500 **61462→61689** RNG **61766**
  Scr **643**; next @61689 fix_worst_trouble.
- **D-0918 #1069:** drag_down/ballrelease via uball; seed4500
  **55990→61462** RNG **61496** Scr **622**.
- **D-0917 #1068:** fill_ordinary_room subroom recurse; seed4500
  **54329→55990** RNG **57748** Scr **613**.
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
