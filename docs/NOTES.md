# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#425). Screens **3983**/11405 (D-0399).
  seed0004 Scr **29**/409; seed0002 Scr **54**/595.
- **Next:** seed0004 @27 — C `A bear trap closes on your foot!--More--`
  vs JS without `--More--` (trapeffect / pline NEED_MORE /
  `flush_topl_more`). Or seed0002 @3808 `eatcorpse` rnd(8). Cmds in
  `CURRENT.md`.
- **Don’t re-check:** look_here observe before doname (D-0399);
  trapeffect_bear_trap + floor_trigger BEAR (D-0398); gd_move_cleanup
  Suddenly (D-0397); drop gold botl + Move along! (D-0396); doname
  containing + cknown (D-0395); use_container outmaybe/yname +
  MENU_FULL (D-0394); teleds + gold botl (D-0393); stop_occupation +
  dochugw (D-0392); counted Ns (D-0391); getpos auto_describe (D-0390);
  cls clear_glyph (D-0389); prinv total_of (D-0388); post-autopick
  check_here (D-0387); hilite_pile ATR_INVERSE (D-0386); Options stub
  (D-0385).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** invent bag `containing` without `cknown` after put-in;
  omit doname containing when cknown+Has_contents; invent empty-bag
  prompt from bare `outokay` (use `outmaybe`); floor yname as `your`;
  omit container from put-in invent walk; skip teleds materialize/
  gold botl (D-0393); skip `stop_occupation` on threat (D-0392);
  clear topline between get_count digits (D-0391); skip getpos
  `auto_describe` (D-0390); invent tip persistence over lookat; skip
  `clear_glyph_buffer` in `cls` (D-0389); invent bare merged-quan gold
  prinv (D-0388); skip `check_here` after autopick (D-0387); invent
  Options hand-list (D-0385); omit `hilite_pile` ATR_INVERSE (D-0386);
  ice-box per-cobj without merge/`spe` (D-0383); pickup without
  INVORDER_SORT headings (D-0384); early-return `dochug` on
  `msleeping` (D-0278); drop gold without `_goldCount`/botl (D-0396);
  defer Move along! (D-0396); skip `gd_move_cleanup` Suddenly +
  `flush_topl_more` (D-0397); omit `trapeffect_bear_trap` /
  BEAR in `floor_trigger` (D-0398); name pile gems without
  `observe_object` in look_here (D-0399).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` even when NOTES names a topline.

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
- Options: `doset_simple_menu` (D-0385); Map `f` → `hilite_pile`
  ATR_INVERSE (D-0386); autopick filtered still `check_here` (D-0387);
  gold merge → prinv `(N in total)` (D-0388); detect `cls` blanks
  (D-0389); TER_DETECT auto_describe (D-0390); counted search
  `stop_occupation` (D-0392); TELEP→`teleds` (D-0393); bag put-in
  MENU_FULL (D-0394); doname containing (D-0395); drop gold + Move
  along! (D-0396); escort Suddenly + flush_topl_more (D-0397);
  bear trap `d(2,4)`/`set_utrap` (D-0398); look_here observe before
  doname (D-0399).
- D-0274…D-0399: see index.
