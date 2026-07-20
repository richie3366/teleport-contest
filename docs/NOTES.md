# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 @86672 — C `breamm` `rn2(3)` vs JS
  `rn2(5)` (after touchfood invent slot).
  Falsifier:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0923 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not omit `touchfood` freeinv+`addinv_nomerge` / invent `splitobj`
  splice (D-0923); sellobj_state invent-full dropy / COST_BITE deferred.
- Do not omit `wakeup` was_sleeping `wake_nearto(mlevel*18)` (D-0922);
  wake_msg / growl pline from wakeup still deferred.
- Do not omit `minetn-4` load_special / `book shop`→BOOKSHOP (D-0921);
  minetn-1/6/7 still deferred.
- Do not omit `pleased` TROUBLE_HIT `fix_worst_trouble` / `rnd(5)`
  (D-0920); other TROUBLE_* still deferred.
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

## Landmarks (≤15)

- suite **42/44** @#1070 Scr **10233**/11405 RNG **746329**/792838
  (94.13%); next cadence @#1075.
- **D-0923 #1074:** touchfood freeinv+addinv_nomerge; seed4500
  **82793→86672** RNG **86798** Scr **759**; next @86672 breamm.
- **D-0922 #1073:** wakeup wake_nearto; seed4500 **82788→82793**
  RNG **86800** Scr **755**; next was steal invent weight.
- **D-0921 #1072:** minetn-4 College Town; seed4500
  **61698→82788** RNG **83013** Scr **747**.
- **D-0920 #1071:** TROUBLE_HIT fix_worst_trouble; seed4500
  **61689→61698** RNG **61837** Scr **654**.
- **D-0919 #1070:** FAST TIMEOUT; seed4500 **61462→61689** RNG **61766**
  Scr **643**.
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
