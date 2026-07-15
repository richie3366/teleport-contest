# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#445 full post D-0414). Scr **4194**/11405;
  RNG **262860**/792838. seed0004 focused post D-0416: RNG
  **12084**/12084; Scr **244**/409 (cursors 402).
- **Next:** seed0004 @239 — C `The bag is empty.` vs JS
  `the bag is empty.` (`pickup.c` `Ysimple_name2` emptymsg vs
  `theArt(xname)`).
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0004-feeding-pony.session.json
  ```
- **Don’t re-check:** @182 out-of-sight cursemsg (was LOS-blind
  `dogmove` `canseemon` stub, D-0416). @11722 throw carrot feed
  (D-0415). @11708 dog `ALLOW_U` (D-0414). @11568 fightm (D-0413).
  @10966 travel boulder (D-0412).
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
  flee gate (D-0404); treat @9795 as mtrack arity or bare key-ownership
  without checking unrotted CORPSE / HVY EOTs (D-0405); leave
  `start_timer` stub that never `run_timers` (D-0405); treat @10370
  as bare `dog_move` rn2(16) without checking pickup `@` invert /
  worn Conflict / `resist_conflict` (D-0406); treat @10382 as bare
  `exercise` without SCR_TELEPORTATION / getobj `?` / `safe_teleds`
  (D-0407); treat @10563 as bare `distfleeck` without getpos `>`
  stairs jump → travel destination (D-0408); treat @10657 as bare
  `distfleeck` / missing `doeat` without checking `youmonst.data`
  short-circuit on palatable `rn2(10)` (D-0409); treat @10713 as bare
  `exerper` polarity without checking deferred `gethungry` `uhunger--`
  (D-0410); treat @10966 as after_calc/leftover/SLT/EXT (D-0412 —
  was findtravelpath boulder step); treat @11568 as bare dochug P4
  without `movemon` Conflict→`fightm` (D-0413); treat @11708 as bare
  dochug/`mattacku` without `dog_move` `ALLOW_U`→`mattacku` (D-0414);
  treat @11722 as EOT `next_ident` without `t*` carrot throw →
  `tamedog`/`dog_eat` (D-0415); treat @182 reluctant topline as
  message-clear timing without checking `dogmove` local `canseemon`
  stub vs LOS (D-0416).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- getpos travel `_>` → stairs via feature scan (D-0408).
- eatcorpse palatable needs `hero_form_data` when `youmonst` unset
  (D-0409); **basic `youmonst.data` now at u_init** (D-0411); full
  `set_uasmon` FROMFORM props still deferred.
- gethungry metabolic `uhunger--` needs diet via `hero_form_data`
  (D-0410); ring/amulet accessorytime + `newuhs` deferred.
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Throw food: `t*` then letter + direction → `tamedog`/`dog_eat`
  (D-0415); apply food still “Sorry”.
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- findtravelpath: dest→hero BFS + boulder skip + GUESS (D-0412).
- Conflict: `fightm` before dochugw + dog `ALLOW_U`→`mattacku`
  (D-0413/14); ustuck / `m_everyturn_effect` / full `m_unleash` deferred.
- `dog_move` cursemsg: real `display.canseemon` (D-0416); glyph/
  `distant_name` what-name still deferred.
- D-0383…D-0415 landmarks: see index / don’t-recheck above.
