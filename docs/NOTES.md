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

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **2026-09-16 process take (measured):** 126/362 non-audit iterations
  2026-09-09..15 were parks; 109/161 parked rows were stale copies from
  `data.md`/`debt.md`/TOP30. Superseded by the breadth phase (parks closed;
  rows come from `port-coverage.mjs --rows`, measured at enqueue).
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

- D-1790…D-2614 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2614.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2614.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2614: ``js/mcastu.js`` — dispatcher now passes C shapes (WEAKEN/STUN/GEYSER ``dmg``; FIRE_PILLAR/LIGHTNING ``(mtmp, dmg)``); callees take the params and ove Named: ``has_aggravatables`` (chooser-only, D-1825/D-2253); ``mcast_geyser`` ``#if 0`` water-dama
- D-2613: restarted the export in C order with per-arm `:line` cites — `u.ustuck === mtmp → await itsstuck` (exported from `js/monmove.js:1747`, body already C- Named: none new — every arm and callee is live or file-local (`mattackm`'s own `:379` bhitpos rea
- D-2612: restarted the export in C order with per-arm `:line` cites — `let ox/oy` hero-start + `get_obj_location_quantum` stamp; `maybeshopgoods` before checks Named: none new — every arm and callee is live or file-local.
- D-2611: restarted the export in C order with per-arm `:line` cites — buf built before transformation (`x_monnam` ARTICLE_NONE + SUPPRESS_SADDLE|SUPPRESS_HALLU Named: none new — every arm and callee is live or inlined-literal; `display_nhwindow` reads as `f
- D-2610: restored the leading space in both primary `sfx` literals (`js/invent.js:5393,5398`). Named: none.
- D-2609: new exported `weapon_insight(final, opts)` in `js/invent.js` in C order with per-arm `:line` cites — `eos()` appends as concat, `Sprintf/Strcpy` as st Named: none new — every arm and callee is live, inlined-literal (`eos`/Sprintf/strcmpi idiom), or
- D-2608: restarted the block in C order with per-arm `:line` cites — `t_warn` (`:3079`) ported live with the exact C typ→name switch; its `impossible` report s Named: the six `impossible(...)` diagnostic reports in unreachable default arms (cite-only; async
- D-2607: new `extract_nexthere(obj, head)` (`js/mkobj.js:3148`) returning the new head (JS has no `struct obj **` out-param; mirrors `extract_nobj`), throw for Named: recreate_pile_at body (own row); splev monster-invent/saddle arm (map-named); moverock sta
- D-2606: restarted the save arm in C order with `:line` cites. Named: none new — every arm and callee live. (No committed unit test: repo has no tests/ layout a
- D-2605: in C order per loop — `:3688–3691` cockatrice arm (`otyp==CORPSE && will_feel_cockatrice(otmp,FALSE)` → `await feel_cockatrice` + return null, before  Named: none new — every arm and callee live (`will/feel_cockatrice` from `js/invent.js`; `otense`
- D-2604: restarted `can_blnd` in C order with `:line` cites — `:316–317` haseyes, `:320–321` perma-blind, `:327–328` raven-vs-raven (`mons(PM_RAVEN)` identity, Named: none new — every arm is live, inlined-macro, or ported in this commit.
- D-2603: restarted `init_oracles` + `outoracle` in C order with `:line` cites — `:649–650` early return, `:652` embed-open check with the `:689–692` open-faile Named: none new — every arm is live or build-subsumed (dlb handles/seek/close, comment-skip + off
- D-2602: new exported `fmt_elapsed_time(final)` (`js/insight.js:182`) in C order with `:line` cites — `:322–325` etim (+ live `timet_delta(getnow(), start_timi Named: none new.
- D-2601: restarted `update_mon_extrinsics` in C order with `:line` cites — unseen `:591`, early maybe_blocks `:592–593`, again-loop `:595`/`:688–690`, on-switc Named: none new.
- D-2600: new exported `readobjnam_postparse3(d)` in C order with C return codes (0 fall through, 2 typfnd, 6 retry); new `japanese_otyp_by_name` export (case-i Named: postparse1 remainder stays deferred (grey-spell `grey spell`→`gray spell` fix `:4468–4469`
<!-- landmarks:end -->
