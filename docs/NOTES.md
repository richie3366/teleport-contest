# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **25/44** PASS (#450 full; #451 focused only). Scr
  **4336**/11405; RNG **263155**/792838. seed0004 focused: RNG
  **12084**/12084; Scr **389**/409 (cursors 402).
- **Next:** seed0004 @285 — C `Which ring-finger, Right or Left? [rl]`
  vs JS without `[rl]` (`choose_ring_hand` vs C `yn_function` +
  `rightleftchars`).
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0004-feeding-pony.session.json
  ```
- **Don’t re-check:** @277 RING `<descr> ring` / nn≠obj.known (D-0420).
  @248 tseen trap `^` (D-0419). @240 pickup poison (D-0418). @239 bag
  empty (D-0417). @182 cursemsg (D-0416). @11722 throw carrot (D-0415).
  @11708 dog `ALLOW_U` (D-0414). @11568 fightm (D-0413). @10966 travel
  boulder (D-0412).
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
  flee gate (D-0404); treat @9795–@11722 / @182/@239/@240/@248/@277
  as index D-0405…D-0420 without those C paths; treat RING
  `obj.known` as type-ID (D-0420 — spe only; use `oc_name_known`);
  treat @248 floor vs `^` as missing feeltrap when `tseen` already
  set (D-0419 — was `_map_location` skip).
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
- `dog_move` cursemsg: `display.canseemon` (D-0416); glyph/`distant_name`
  deferred. Empty bag take-out: `Ysimple_name2` (D-0417). WEAPON
  `poisoned ` xname/doname (D-0418); wet-towel/figurine/`permapoisoned`
  deferred. **`map_trap` tseen in newsym** (D-0419); Hallucination
  trap glyphs deferred. **RING xname `<dn> ring` / nn only** (D-0420).
  Older D-IDs: index / don’t-recheck.
