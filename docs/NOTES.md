# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **24/44** PASS (#420). Screens **3953**/11405; seed0012 Scr
  **283**/308 after D-0394 outmaybe/yname + MENU_FULL put-in (was 275).
- **Next:** seed0012 @278 — C `a bag containing 1 item` vs JS `a bag`.
  Cmd: `node frozen/ps_test_runner.mjs sessions/seed0012-monk-vault-escort.session.json`
  Falsify: objnam doname container contents when cknown+Has_contents.
- **Don’t re-check:** use_container outmaybe/yname + query_category
  MENU_FULL put-in (D-0394); teleds materialize + gold botl (D-0393);
  stop_occupation + dochugw (D-0392); counted Ns set_occupation
  (D-0391); getpos auto_describe TER_DETECT (D-0390); cls clear_glyph
  (D-0389); prinv total_of (D-0388); post-autopick check_here (D-0387);
  hilite_pile ATR_INVERSE (D-0386); Options stub (D-0385); ice-box
  Contents (D-0383); pickup INVORDER_SORT (D-0384); in_or_out_menu ATR/`*`
  (D-0382); chargen `roles.length` (D-0379); Monk Pw SPELL_LEV_PW
  (D-0380); locked Hmmm (D-0381).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.
- **Note:** seed0012 JS RNG log may trail +24 after matched prefix (strict
  length); runner still 13878/13878 positional.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** invent empty-bag prompt from bare `outokay` (use `outmaybe`);
  floor yname as `your` (carried only); omit container from put-in
  category invent walk (Tools/`X`); skip teleds materialize/`spoteffects`
  or gold botl before prinv (D-0393); skip `stop_occupation` on
  occupation/`dochugw` threat (D-0392); clear topline between get_count
  digits (D-0391); skip getpos `auto_describe` when `iflags.autodescribe`
  (D-0390); invent tip persistence over lookat; skip `clear_glyph_buffer`
  in `cls` (D-0389); invent bare merged-quan gold prinv (D-0388); skip
  `check_here` after autopick when types filter (D-0387); invent Options
  hand-list (D-0385); omit `hilite_pile` ATR_INVERSE on MG_OBJPILE
  (D-0386); ice-box per-cobj without merge/`spe` gender (D-0383); pickup
  menu without INVORDER_SORT headings (D-0384); `maybe_skip_seps` with
  `roles.length` (D-0379); omit `SPELL_LEV_PW(1)` (D-0380); locked
  without lknown Hmmm (D-0381); in_or_out_menu without ATR_INVERSE/`*`
  (D-0382); early-return `dochug` on `msleeping` (D-0278).
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- Vault `invault` timer 30 → `makemon(PM_GUARD)` + getlin (D-0374).
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- Ice-box look: merge+sortloot stacks (D-0383); pickup class headers
  (D-0384).
- Options: `doset_simple_menu` allopt General→Status + multipage FS
  (D-0385); Map page `f` toggles `hilite_pile` → pile ATR_INVERSE
  (D-0386); autopick filtered types still `check_here` remainders
  (D-0387); gold merge pickup → prinv `quan` + `(N in total)` (D-0388);
  detect `cls` blanks `disp_*` before map_monst (D-0389); TER_DETECT
  getpos auto_describe blank→`unexplored area` + mimic/shk (D-0390);
  parse `get_count` digits then one `clear_nhwindow` (D-0391);
  counted search `set_occupation` + `dochugw`/`monster_nearby`
  `stop_occupation` (D-0392); once TELEP→`teleds` materialize +
  `spoteffects` + gold `disp.botl` before More (D-0393); bag put-in
  `outmaybe`/`yname` + MENU_FULL query_category (D-0394).
- D-0274…D-0394: see index.
