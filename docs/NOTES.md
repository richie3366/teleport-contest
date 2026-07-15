# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#430 full). seed0004 Scr **233**/409 after
  D-0404 (was 215).
- **Next:** seed0004 @9795 — C `dog_move` `rn2(16)` vs JS `rn2(4)`.
  Cmds in `CURRENT.md`.
- **Don’t re-check:** known_hitum `mhp < mhpmax/2` must use integer `/`
  (`Math.trunc`) + `!engulfing_u` (D-0404); heal_legs / nh_timeout
  WOUNDED_LEGS (D-0403); Norep `_prevmsg` (D-0402); trapmove BEARTRAP
  (D-0401); botl `enc_stat` Burdened (D-0401).
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
  `observe_object` in look_here (D-0399); omit `encumber_msg` after
  `set_wounded_legs` / skip `WT_WOUNDEDLEG_REDUCT` in `weight_cap`
  (D-0400); omit `trapmove` while `u.utrap` (D-0401); omit botl
  `enc_stat` when `near_capacity()>UNENCUMBERED` (D-0401); skip
  exerper wounded-leg / encumbrance exercise (D-0401); skip mintrap
  `rn2(40)` when `mtrapped` (D-0401); `newsym` inside `dog_move`
  before postmov (D-0401); Norep via Norep-only cache (D-0402);
  skip `heal_legs` / WOUNDED_LEGS `nh_timeout` (D-0403); omit
  `vtense` bare-singular conjugate (D-0403); float `mhpmax/2` for
  flee gate (D-0404).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

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
  doname (D-0399); wounded legs → `encumber_msg` load pline (D-0400);
  `trapmove` + botl Burdened + exerper status + mintrap rn2(40)
  (D-0401); Norep ≡ `gp.prevmsg` (D-0402); `heal_legs` via
  `nh_timeout` WOUNDED_LEGS + ATEMP DEX (D-0403); known_hitum flee
  `Math.trunc(mhpmax/2)` + `engulfing_u` (D-0404).
- D-0274…D-0404: see index.
