# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next:** seed4500 @50290 C `exercise` `rn2(19)` vs JS
  `mcalcmove` `rn2(12)` (after D-0911). Falsifier:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`
- D-0911 closed @50111 (prefix 50111→50290).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0911 done.
- Do not re-zero `ox`/`oy` in `obj_extract_self` (D-0911; C keeps them).
- Do not stub ordinary-food `doeat` rotten / omit `Hear_again` (D-0911).
- Do not omit `HDeaf` TIMEOUT decrement in `nh_timeout` (D-0911).
- Do not omit once-per-turn `regen_pw` / `rn1` Pw recover (D-0910).
- Do not omit Punished `drag_ball`/`move_bc`/`cause_delay` (D-0909).
- Do not omit `SCR_PUNISHMENT` / `punish` / `placebc` (D-0908).
- Do not omit `set_occupation(learn)` / learn `makeknown` credit_hero
  (D-0907).
- Do not omit hellfill/`create_maze`/`LVLINIT_MAZE` (D-0906).
- Do not omit `peace_minded` `PM_ERINYS` `!ualign.abuse` (D-0905).
- Do not omit `level_tele` past-main `find_hell` (D-0904).
- Do not omit fill_zoo BEEHIVE queen/killer + royal jelly (D-0903).
- Do not omit `shkveg`/`mkveggy_at` / HEALTHY_TIN (D-0902).
- Do not omit Pillars `shuffle(terr)` / 2×2 `des.terrain` (D-0901).

## Landmarks (≤15)

- suite **42/44** @#1060 Scr **10089**/11405 RNG **734803**/792838
  (92.68%); next cadence @#1065.
- **D-0911 #1061:** extract ox/oy + rottenfood + HDeaf; seed4500
  **50111→50290** RNG **50469** Scr **499→596**; next @50290 exercise.
- **D-0910 #1060:** regen_pw; seed4500 **50054→50111**
  RNG **50220→50240** Scr **499**; next was @50111 next_ident.
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
- **D-0903 #1053:** fill_zoo BEEHIVE; seed4500 **14216→18153**
  Scr **294→302**.
- **D-0902 #1052:** shkveg/mkveggy_at; seed4500 **9974→14216**
  Scr **284→294**.
- **D-0901 #1051:** Pillars terr shuffle; seed4500 **8925→9974** Scr **284**.
- **D-0900 #1050:** spitmm/spitmu; seed4500 **8491→8925** Scr **264→284**.
- **D-0899 #1049:** `#jump` dojump; seed4500 **2869→8491** Scr **19→264**.
- **D-0898 #1048:** ini_inv armor `setworn`; seed2600 Scr **37→38** PASS.
