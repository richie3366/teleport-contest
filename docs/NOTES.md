# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **26/44** PASS (#460 full). Scr **4363**/11405; RNG
  **262922**/792838. Unchanged vs #458 aside from +1 RNG.
- **Next (D-0429):** seed0002 @4565 — JS `rn2(4)` vs C `obj_resists`.
  DIAG: pet `(74,12)` hero `(76,12)` `udist=4` in_bbox=1 invent=20.
  C’s 20×`obj_resists` ≈ invent `dogfood` when `udist<=1` skips
  `!rn2(4)`. Find prior pet/hero position split (RNG still matched).
  ```bash
  node scripts/rng-diff.mjs sessions/seed0002-healer-reflection-drummer.session.json
  ```
- **Don’t re-check:** @4565 as broken `obj_resists()` body (always
  `rn2(100)`). @3808 eatcorpse `1+rn2` vs `rnd` (D-0428). @354 throw
  land food `%` without `newsym` (D-0427). @330/@336 invent `(N of M)`
  (D-0426). @312–@182 / @11722: D-0415…D-0425 (index).
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
  flee gate (D-0404); treat @9795–@11722 / @182/@239/@240/@248/@277/
  @285/@288/@297/@310/@312/@330/@336/@354/@3808/@4565 as index
  D-0405…D-0429 without those C paths; treat RING `obj.known` as
  type-ID (D-0420); treat @248 floor vs `^` as missing feeltrap when
  `tseen` already set (D-0419); bypass `yn_function` for ring-hand
  (D-0421); force corner invent for getobj `?` when `strlen(lets)==1`
  (D-0422); leave `autodescribe` unset / skip stairs in travel
  `auto_describe_text` (D-0423); skip tseen trap in `brief_at` /
  `lookat` before floor cmap (D-0424); treat wall look as dark-room
  without swallow/cmap DECgraphics envelope (D-0425); invent/`*`
  pickinv without `lmax` paging / `(N of M)` (D-0426); throw land
  without `cansee`→`newsym` (D-0427); eatcorpse acid/sick damage via
  `1+rn2(N)` instead of `rnd(N)` (D-0428); patch `obj_resists` body
  for @4565 when symptom is invent-scan vs `!rn2(4)` path (D-0429).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- getpos travel `_>` → stairs via feature scan (D-0408);
  **autodescribe default On + stairs firstmatch** (D-0423);
  **tseen trap `trapname` in brief_at/lookat** (D-0424);
  **DECgraphics wall look: swallow mid + Unicode │ prefix** (D-0425);
  **`i`/`*` invent npages>1 → `(N of M)` + Space page** (D-0426);
  **`throwit` land `cansee`→`newsym`** (D-0427);
  **`eatcorpse` acid/sick `rnd(N)` not `1+rn2`** (D-0428);
  **`dog_goal` invent `dogfood` when `udist<=1` skips `!rn2(4)`** (D-0429).
- eatcorpse palatable needs `hero_form_data` when `youmonst` unset
  (D-0409); **basic `youmonst.data` now at u_init** (D-0411); full
  `set_uasmon` FROMFORM props still deferred.
- gethungry metabolic `uhunger--` needs diet via `hero_form_data`
  (D-0410); ring/amulet accessorytime + `newuhs` deferred.
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Throw food: `t*` then letter + direction → `tamedog`/`dog_eat`
  (D-0415); land glyph needs `newsym` (D-0427); apply food still “Sorry”.
- Monk starter: `SPELL_LEV_PW(1)` bump when `num_spells()` (D-0380).
- findtravelpath: dest→hero BFS + boulder skip + GUESS (D-0412).
- Conflict: `fightm` before dochugw + dog `ALLOW_U`→`mattacku`
  (D-0413/14); ustuck / `m_everyturn_effect` / full `m_unleash` deferred.
- Older D-IDs: index / don’t-recheck.
