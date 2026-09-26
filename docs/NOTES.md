# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  `port-coverage.mjs` MISSING/THIN count falls ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.
- Audit 1812–1820 (D-2853…D-2862, `d15d25c20`…`4373171cb`): 9 ACCEPT, do not re-open. 1805 `nemesis_speaks` texts are embedded (D-2853); do not re-port the if-chain or re-extract those five keys. Prior audit 1803–1811 stays ACCEPT. `peffect_restore_ability` is the D-1420 body (parked Stale).

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2862 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2862.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2862.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2862: One `get_coord` in that C order. Named: `nhl_get_xy_params` (`nhlua.c:506–522`) and its caller `nhl_getmap` (`nhlua.c:530`) have n
- D-2861: One `reset_commands` in that C order. Named: `bind_mousebtn` (`cmd.c:2624`, called from `commands_init` `:2752–2753`); `click_to_cmd` s
- D-2860: One `peffect_oil` in that C order. Named: The green-slime extra damage in the comment at `potion.c:1269–1273` is not an arm.
- D-2859: One `fall_asleep` in that C order. Named: The `#if 0` deafness / `Hear_again` block in `fall_asleep` is not in this build.
- D-2858: One `status_initialize` in that C order. Named: `display_nhwindow(WIN_STATUS, FALSE)` in `genl_status_init` (`windows.c:905`).
- D-2857: One `unplacebc_core` in that C order. Named: A null ball or chain returns; C would dereference it.
- D-2856: One `pre_mm_attack` in that C order. Named: None inside `pre_mm_attack`.
- D-2855: One `mhitm_ad_stck` in that C order. Named: The cream-pie arm of `hmon_hitmon` still returns before `nohandglow`.
- D-2854: One `block_entry` in that C order. Named: `block_door` (`shk.c:5791`) stays the stub-false in `test_move` and `domove`.
- D-2853: `scripts/extract-quest-nemesis.py` embeds those five keys from `quest.lua` into `js/generated/quest_nemesis_speech.js` (13 roles; Arc `discourage` is  Named: `chat_with_nemesis` (`quest.c:393–400`) and `chat_with_guardian` (`:441–448`) stay out of 
- D-2852: One `start_glob_timeout` in that C order. Named: The non-glob `impossible` is not awaited, so that error return does not block on `--More--
- D-2851: One `rnd_otyp_by_wpnskill` in that C order. Named: An empty skill class `mkobj`s `RANDOM_CLASS`; with `init_objects` bases filled, `P_POLEARM
- D-2850: One `get_unused_cs` in that C order. Named: The header comment's "light routine" is not a call in this tree; `do_light_sources` receiv
- D-2849: One `confused_book` in that C order. Named: A null `spbook.book` in `learn` skips the call; C would dereference it.
- D-2848: One `maybe_finish_sokoban` in that C order. Named: `dealloc_trap` (`trap.c:6548`) still has no body; `deltrap` returns after the finish call.
<!-- landmarks:end -->
