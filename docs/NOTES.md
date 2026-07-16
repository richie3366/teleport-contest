# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **26/44** PASS (#485 full). Scr **4629**/11405; RNG
  **284968**/792838; speed `23+0.13/turn`. Δ vs #480: Scr +9, RNG
  +7334. seed0002 Scr **320**/595 prefix **26692**.
- **Next (D-0451):** seed0002 @26692 — after 2 matched `obj_resists`,
  C continues `dog_goal` fobj `dogfood` `rn2(100)`; JS already at
  `!rn2(4)` (follow). Falsify: dump pet `mx/my` + count of `fobj` in
  SQSRCHRADIUS=5 vs C after sleep zap.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0002-healer-reflection-drummer.session.json
  ```
- **Don’t re-check:** SLT `u_calc_moveamt` math; @25767 as monmove
  without zap getobj/`dobuzz` (D-0450 done); @25615 as wipe_engr
  without exerchk (D-0449); @19167 as monmove without dopay (D-0448);
  @18457 as monmove without shop bill (D-0447); @18354 as monmove
  without seer_turn (D-0446); @16501 as mon_arrive without stair fall
  (D-0445); @14081 as monmove without potion (D-0444); @12530 as zap
  leftover (D-0443); @12222–@4565 D-0442…D-0430; invent `dogfood` at
  @26692 (that loop is after `rn2(4)`).
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
  defer Move along! / skip `gd_move_cleanup` Suddenly (D-0396/97);
  omit bear-trap / pile-gem observe / encumber+trapmove / Norep /
  heal_legs / vtense / flee mhpmax (D-0398–D-0404); treat @4565–@26692
  as index D-0405…D-0450 without those C paths — see DIVERGENCE-INDEX;
  treat RING `obj.known` as type-ID (D-0420); bypass yn ring-hand
  (D-0421); force corner invent when lets len==1 (D-0422); leave
  autodescribe unset (D-0423); skip tseen trap / wall DECgraphics /
  invent paging / throw newsym / eatcorpse `1+rn2` (D-0424–D-0428);
  treat drink/? / SCR_* / door / sink / confusion / impaired / booze /
  ohitmon / run-stop / CONFUSION-timeout / safemon-move0 as monmove
  without those peffect/timeout/do_attack paths (D-0430–D-0442);
  treat @12530 as zap/`destroy_items` or SLT leftover math (D-0443);
  treat @14081 as distfleeck without `peffect_healing` (D-0444);
  treat @16501 as `mon_arrive`/`collect_coords` without stair-fall
  (D-0445); treat @18354 as distfleeck without seer_turn phase
  (D-0446); treat @18457 as distfleeck without shop `addtobill`/
  `append_honorific` (D-0447); invent `addtobill` without `oc_cost`/
  `get_cost`; treat @19167 as `do_attack`/`rn2(7)` without missing
  `dopay` (D-0448); treat @25615 as wipe_engr without `exerchk`
  (D-0449 done); treat @25767 as monmove without zap getobj/`dobuzz`
  (D-0450 done); treat @26692 as invent `dogfood` or bare monmove
  without fobj-radius/`pet` pos proof (D-0451); re-audit SLT trunc.
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- Travel/autodescribe/invent/throw/eat/drink/scrolls D-0408–D-0435;
  confusion/impaired/booze/ohitmon/run-stop/CONFUSION-timeout/
  safemon-move+flee-teleport D-0436–D-0442; rottenfood→occupation
  D-0443; peffect_healing D-0444; goto_level descend fall D-0445;
  seer_turn once-per-hero D-0446; shop `oc_cost`→`append_honorific`
  D-0447; `dopay`→`money2mon`/`next_ident` D-0448; `exerchk`
  next_attrib_check D-0449; zap getobj? + RAY dobuzz sleep D-0450
  done; dog_goal fobj scan vs `!rn2(4)` @26692 D-0451 next.
- hero_form_data eat/hunger (D-0409/10); youmonst.data (D-0411);
  bag put-in/out (D-0375/76); travel BFS (D-0412); Conflict ALLOW_U
  (D-0413/14); Monk SPELL_LEV_PW(1) (D-0380).
