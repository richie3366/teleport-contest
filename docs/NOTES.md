# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **26/44** PASS (#465 full post D-0434). Scr **4503**/11405;
  RNG **267277**/792838. seed0002 Scr **233**/595 prefix **10550**.
- **Next:** seed0002 @10550 — C `rn2(5)` @ `distfleeck` vs JS
  `rn2(12)` @ `m_move` (post D-0436 confusion quaff).
  ```bash
  node scripts/rng-diff.mjs sessions/seed0002-healer-reflection-drummer.session.json
  ```
- **Don’t re-check:** @10511 peffect_confusion (D-0436); @8863
  ENCHANT_WEAPON (D-0435); @8831 drinksink (D-0434); @8609 door bump
  (D-0433); @6954 remove-curse (D-0432); @6186 light (D-0431);
  @4565 drink getobj (D-0430).
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
  @285/@288/@297/@310/@312/@330/@336/@354/@3808/@4565/@6186/@6954/
  @8609/@8831/@8863/@10511 as index D-0405…D-0436 without those C paths; treat RING
  `obj.known` as type-ID (D-0420); treat @248 floor vs `^` as missing
  feeltrap when `tseen` already set (D-0419); bypass `yn_function` for
  ring-hand (D-0421); force corner invent for getobj `?` when
  `strlen(lets)==1` (D-0422); leave `autodescribe` unset / skip stairs
  in travel `auto_describe_text` (D-0423); skip tseen trap in `brief_at`
  / `lookat` before floor cmap (D-0424); treat wall look as dark-room
  without swallow/cmap DECgraphics envelope (D-0425); invent/`*`
  pickinv without `lmax` paging / `(N of M)` (D-0426); throw land
  without `cansee`→`newsym` (D-0427); eatcorpse acid/sick damage via
  `1+rn2(N)` instead of `rnd(N)` (D-0428); patch `obj_resists` /
  dog_goal invent for @4565 when cause was drink getobj `?` cancel
  + missing trycall (D-0429/D-0430); treat @6186 exercise/`rn2(5)` as
  attrib bug when cause was unimplemented SCR_LIGHT (D-0431); treat
  @6954 exercise/`rn2(5)` as attrib when cause was unimplemented
  SCR_REMOVE_CURSE + missing trycall/nodisappear (D-0432); treat
  @8609 `rnl(20)` as lock.doopen when cause was `end_running` before
  autoopen `!run` check (D-0433); treat @8831 `rn2(5)` as monmove when
  cause was missing sink yn→`drinksink` (D-0434); treat @8863
  exercise/`rn2(5)` as monmove when cause was unimplemented
  SCR_ENCHANT_WEAPON (D-0435); treat @10511 `rn2(5)` as monmove when
  cause was unimplemented `peffect_confusion`/`rn1(7,…)` (D-0436).
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr restores wall (D-0377/78).
- getpos travel `_>` → stairs via feature scan (D-0408);
  **autodescribe / tseen trap / DECgraphics wall look** (D-0423–25);
  **`i`/`*` invent `(N of M)`** (D-0426); **throwit `newsym`** (D-0427);
  **`eatcorpse` `rnd(N)`** (D-0428); **drink `?`/`*` + trycall** (D-0430);
  **`SCR_LIGHT` litroom** (D-0431); **`SCR_REMOVE_CURSE` + trycall**
  (D-0432); **rush closed-door bump before autoopen** (D-0433);
  **`drinksink` + sink yn** (D-0434); **`SCR_ENCHANT_WEAPON` +
  `chwepon`** (D-0435); **`peffect_confusion` + `make_confused`**
  (D-0436).
- eatcorpse palatable / gethungry diet via `hero_form_data` (D-0409/10);
  basic `youmonst.data` at u_init (D-0411); full FROMFORM deferred.
- Apply bag take-out/put-in (D-0375/76); throw food → tamedog (D-0415).
- Monk `SPELL_LEV_PW(1)` (D-0380); travel BFS+GUESS (D-0412);
  Conflict fightm/`ALLOW_U` (D-0413/14).
- Older D-IDs: index / don’t-recheck.
