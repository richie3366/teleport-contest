# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#423). Screens **3954**/11405 (est. +1 from
  D-0397 seed0012). seed0012 **308**/308 PASS.
- **Next:** seed0004 / seed0002 shared blockers (prefer early fails).
  Cmds in `CURRENT.md`. Alternates: seed0006/0007; quest early-0.
- **Don’t re-check:** gd_move_cleanup parkguard + look-around Suddenly
  + flush_topl_more (D-0397); drop gold freeinv_core botl + `_goldCount`
  (D-0396); gd_move async Move along! (D-0396); doname containing +
  use_container used→cknown (D-0395); use_container outmaybe/yname +
  MENU_FULL put-in (D-0394); teleds materialize + gold botl (D-0393);
  stop_occupation + dochugw (D-0392); counted Ns set_occupation
  (D-0391); getpos auto_describe TER_DETECT (D-0390); cls clear_glyph
  (D-0389); prinv total_of (D-0388); post-autopick check_here (D-0387);
  hilite_pile ATR_INVERSE (D-0386); Options stub (D-0385).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** invent bag `containing` without `cknown` after put-in
  (containerdone sets it when `used`); omit doname containing stacks
  when cknown+Has_contents; invent empty-bag prompt from bare `outokay`
  (use `outmaybe`); floor yname as `your` (carried only); omit container
  from put-in category invent walk; skip teleds materialize/`spoteffects`
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
  (D-0382); early-return `dochug` on `msleeping` (D-0278); drop gold
  without `freeinv_core` botl / `_goldCount` (D-0396); defer Move along!
  because `gd_move` was sync (D-0396); skip `gd_move_cleanup` /
  look-around Suddenly + NEED_MORE flush (D-0397).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` even when NOTES names a topline.
- Suddenly alone can still need `--More--` (flush_topl_more) even when
  `pline` does not wrap.

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
  `outmaybe`/`yname` + MENU_FULL query_category (D-0394); doname
  containing + use_container `used`→cknown (D-0395); drop gold
  `_goldCount`+botl + async Move along! (D-0396); escort end
  look-around/`gd_move_cleanup` Suddenly + `flush_topl_more` (D-0397).
- D-0274…D-0397: see index.
