# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked** (proofs in archive). Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  the ledger's declared-ported count rises (`docs/ledger/SNAPSHOTS.tsv`,
  one line per audit) ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3519 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3519.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3519 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3519: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `hmon_hitmon_poison`: none — whole (D-2839 port; D-3402 + reviews 1798/2356 + this-iter 
- D-3518: four sites restarted through the live whole helper on the EXISTING mklev→dungeon edge (:150, no import change), in place and in C order (x1..y2 :5565– Named: - `lspo_wall_property`: none — whole (D-2713 port + this-iter rewire; region fallback, -1 
- D-3517: restore via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `get_table_option`: body whole; step-2: :3449 get_table_buc + :3125 get_table_align_unpa
- D-3516: impossible re-audited (no JS change — ledger row + display.js untouched since D-3514: row still `partial` with the D-3514 note, body still js/display. Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3515: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `hmon_hitmon_barehands`: none — whole (D-2839 port; D-3402 + reviews 1798/2356 + this-it
- D-3514: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3513: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `peffect_oil`: none — whole (D-2860 port; D-3402 + review 2356 + this-iter audit re-veri
- D-3512: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3511: restore-compacted via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `switch_symbols`: TRUE :261–287 graphics-mode callbacks null in contest tty; FALSE clear
- D-3510: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3509: retire-confirm via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `get_table_int_opt`: none — whole (D-3508 ported; D-3494..D-3508 rewire census + this-it
- D-3508: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3507: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `get_hilite`: none — whole (D-2619 port; D-3405 + review 1578 ACCEPT + this-iter audit r
- D-3506: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3505: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `status_hilite_remove`: none — whole (D-2757 port; D-3405 + review 1716 + this-iter audi
<!-- landmarks:end -->
