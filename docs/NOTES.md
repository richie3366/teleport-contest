# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **27/44** PASS (#510 suite; #513 not cadence). seed0006
  focused RNG **6736**/6736 Scr **80**/123 (post D-0475).
- **Next:** seed0006 screen@22 — filter `~` menu missing `(1 of 2)`
  morestr / page packing (D-0471 deferred). Or pivot seed0007.
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0006-wizard-water-demon.session.json
  node frozen/ps_test_runner.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Don’t re-check:** invent-first @26692; `#force` TIME without lootmon
  getdir; help_dir More any-key; @26883 mid-buzz without ureflects
  (D-0452); @26692 bare pet without `#loot`/`doforce` (D-0451);
  dog_goal rn2(4) for @26987 (D-0453 travelcc); @27050 music arity
  without instruments (D-0454); TOOL resist ulevel; silent onscary;
  dosounds bare u.Deaf; screen@54 without drink compactify (D-0455);
  screen@221 without pickup_prinv slightload (D-0456);
  screen@229 without wield SUGGEST/`- ` (D-0457); screen@237 without botl Conf
  (D-0458); screen@272 without safemon stop pline (D-0459);
  screen@342 without look_here `doname_with_price` (D-0460);
  screen@345 without unpaid/`paydoname` (D-0461);
  screen@359 without `money2mon` `_goldCount` (D-0462);
  screen@363 without `on_msg`→`xname` (D-0463);
  screen@454 without doname locked-box prefix (D-0464);
  screen@502 without TER_MAP trap kind/strip (D-0465);
  screen@525 without apply compactify (D-0466);
  screen@530 without invent itemed (D-0467);
  screen@538 without dobuzz DISP_BEAM (D-0468);
  screen@587 without distant_name/price quotes (D-0469);
  screen@590 without Status Deaf/`near_capacity` (D-0470);
  seed0006 early pick_align without rename/`reset_role_filtering` (D-0471);
  seed0006 @6574 without `dowaterdemon` / S_DEMON fallthrough (D-0472);
  seed0006 @6660 without `summonmu`/`msummon` (D-0473);
  seed0006 @6685 without `M2_STALK` `levl_follower` (D-0474);
  seed0006 screen@13 without rename docorner/`_base_cury` (D-0475 —
  was clearScreen + PROMPT_ROW=12).
- **Landmark:** vault door (71,13); dig + restfakecorr; SPELL_LEV_PW(1)=5.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- **Don’t:** invent bag containing without cknown; empty-bag from
  outokay; floor yname as your; skip teleds gold botl (D-0393);
  skip stop_occupation (D-0392); clear topline get_count (D-0391);
  skip auto_describe (D-0390); skip clear_glyph_buffer cls (D-0389);
  bare merged-quan gold prinv (D-0388); skip check_here autopick
  (D-0387); early dochug msleeping (D-0278); D-0396–D-0404 trap/
  encumber/flee; RING obj.known as type-ID (D-0420); bypass yn ring
  (D-0421); force corner invent lets==1 (D-0422); D-0423–D-0428;
  drink/scroll/door/sink/conf/impaired as monmove (D-0430–D-0442);
  @12530 zap/SLT (D-0443); @14081 without peffect_healing (D-0444);
  @16501 without stair-fall (D-0445); @18354 without seer_turn
  (D-0446); @18457 without shop addtobill (D-0447); @19167 without
  dopay (D-0448); D-0449–D-0475 done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- First cell-miss may be botl `$:` / `Burdened` even when NOTES names a topline.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- D-0408–D-0475 done; seed0006 RNG full, screens @22 filter next.
- hero_form_data eat/hunger (D-0409/10); youmonst.data (D-0411);
  bag put-in/out (D-0375/76); travel BFS (D-0412); Conflict ALLOW_U
  (D-0413/14); Monk SPELL_LEV_PW(1) (D-0380).
