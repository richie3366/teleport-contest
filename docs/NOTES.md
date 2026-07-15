# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#435 full). Scr **4196**/11405; RNG
  **261626**/792838. seed0004 Scr **242**/409; RNG **11029**/12084
  (prefix **10966**).
- **Next:** seed0004 @10966 — C `distfleeck` vs JS `dopush`
  `exercise(A_STR)`. DIAG (removed): EOT `before=9→21` wtcap=0
  `inv_wt=-15` carrcap=675 !Fast; youmonst now set (D-0411) mmove=12.
  **Experiments:** force `after=9` or (`before=0`+SLT) moves miss→10979;
  force SLT alone (before=9→18) or before=0 alone (→12) does **not**.
  So C needs `after_calc<12`: leftover≈0 **and** SLT, or leftover=9+EXT.
  Invent is only 15 under capacity — find ≥16 aum gap or leftover-0
  heal-phase desync + brief SLT. Leftover stuck at 9 since heal EOT
  (rng~4392 SLT `0→9` then UNENC `9→21`).
- **Don’t re-check:** treat @10966 as bare Fast `rn2(3)` (none at EOT);
  force-SLT-from-heal-onward (breaks @~10370 dog_move); umove=21 alone
  without encumbrance story; gethungry ordinary `uhunger--` (D-0410);
  eatcorpse palatable without `hero_form_data` (D-0409); getpos `>`/`<`
  (D-0408); SCR_TELEPORTATION (D-0407); pickup `@`/Conflict (D-0406);
  unrotted corpse timers (D-0405); known_hitum int half (D-0404);
  heal_legs / nh_timeout (D-0403); Norep (D-0402); trapmove/Burdened
  (D-0401).
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
  (D-0410); treat @10966 as bare Fast/`rn2(3)` or SLT-with-before=9
  alone (needs after_calc<12) (D-0411).
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
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- Ice-box look: merge+sortloot stacks (D-0383); pickup class headers
  (D-0384).
- D-0383…D-0411 landmarks: see index / don’t-recheck above.
