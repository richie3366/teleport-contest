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
- Audit 1785–1793: the three `mcast_insects` predicate C-wrongs shipped as D-2835. `place_lregion` tele Promise chain shipped as D-2836. Do not re-open the seven ACCEPT SHAs.

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

- D-1790…D-2842 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2842.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2842.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2842: One `handler_msgtype` in that C order. Named: `config_error_add` and `regex_error_desc` inside `msgtype_add` stay the existing sink.
- D-2841: One `fixup_special` in that C order. Named: The branch fallback still requires `!game.made_branch`.
- D-2840: One `placebc_core` in that C order. Named: `Placebc` / `Lift_covet_and_placebc` (`ball.c:259–346`) stay out because `BREADCRUMBS` is 
- D-2839: One `hmon_hitmon_poison` in that C order, called after damage recalc when melee set `ispoisoned`. Named: `hmon_hitmon_stagger` (`uhitm.c:1578–1582`) still returns `hittxt` without the canspotmon 
- D-2838: One `handler_autopickup_exception` in that C order. Named: `regex_error_desc` (the regex-error `config_error_add` uses a fixed phrase; the sink itsel
- D-2837: One `setopt_cmd` in that C order. Named: The bind walk is key index 0..255, not `gc.Cmd.cmdbinds` link order, so two non-printable 
- D-2836: Tele still returns a Promise, and it settles only after `rloc`, `m_into_limbo`, and `u_on_newpos`. Named: Total-failure `impossible` is still not awaited.
- D-2835: Those predicates are the macros. Named: File-level `Deaf()` (`js/mcastu.js:146`) still ORs sticky `u.Deaf` for the other spells.
- D-2834: One `youhiding` in that C order. Named: Riding, Levitation, Flying, Underwater, and `walking_on_water` in `status_enlightenment` a
- D-2833: One `genl_player_setup` in that C order. Named: `role.c:2179` passes screen height 0; the JS caller is the tty one.
- D-2832: One `set_uasmon` in that C order. Named: `status_initialize` (`botl.c:1682`) is not called: `STATUS_HILITES` is on, and contest tty
- D-2831: One `place_lregion` in that C order, including the failure `impossible`. Named: A missing level cell makes `bad_location` true (C would dereference `levl`).
- D-2830: The five optfns in C order. Named: `config_error_add` and `bad_negation` sinks; `string_for_opt` missing-parameter text; `n >
- D-2829: One `rescued_from_terrain` in that C order. Named: A missing level cell uses typ 0 (C would dereference `levl[u.ux][u.uy]`).
- D-2828: One `mcast_insects` in that C order. Named: A null `mtmp.data` makes `perceives` false (C would dereference).
<!-- landmarks:end -->
