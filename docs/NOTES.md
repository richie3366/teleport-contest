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

- D-1790…D-3546 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3546.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3546 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3546: per-site des evidence this iter (Wiz-loca.lua:76–79 = 4 des.door locked 55,08 + 55,12 + 47,08 + 47,12; Wiz-goal.lua:50–65 = 16 des.door locked 19,06 + Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3545: restore-compact via direct `ledger.mjs set` ×3 (NOT via finish-iteration; first set hand-counted 292 proved 308 and clipped again at the cap — re-set  Named: - `initoptions_init`: sf_init :7129 (NHFILE, no scored analogue); choose_windows :7136 + i
- D-3544: per-site des evidence this iter (minend-1.lua:43–49 = 7 des.door locked 07,16 + 22,08 + 26,08 + 40,14 + 50,03 + 51,16 + 66,02; minend-2.lua:39 = gated Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3543: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `seffect_destroy_armor`: file-local `strange_feeling_scroll` stays (pre-existing clone o
- D-3542: per-site des evidence this iter (astral.lua:93–101 = 9 des.door closed 11,09 + closed 17,09 + locked 23,12 + locked 37,08 + closed 37,11 + closed 37,1 Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3541: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `use_container`: `*objp` writeback (by-value js/pickup.js:4006; 2 callers consume return
- D-3540: per-site des evidence this iter (Bar-strt.lua:63–70 = 8 des.door locked 12,05 + locked 12,09 + closed 21,07 + open 07,13 + open 18,13 + open 23,13 + o Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3539: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `goto_level`: binary NHFILE savelev/getlev (by-design VFS analogue — in-memory stash pat
- D-3538: per-site des evidence this iter (medusa-1.lua:51–54 = 4 des.door closed 46,07 + locked 38,08 + locked 38,11 + closed 30,12; medusa-2.lua:48 = 1 des.do Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3537: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `make_converted_name`: `nh_getenv` NETHACKDIR/HACKDIR (Rule #2 no env, SHOPTYPE preceden
- D-3536: per-site des evidence this iter (baalz.lua:35 = 1 des.door locked 00,06, matches the inline block at mx+0,my+6; valley.lua:66–68 = 3 des.door locked ( Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3535: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `makerooms`: lua runtime (`nhl_*`/`lua_getglobal` — rooms compiled in, no lua by arch); 
- D-3534: per-site des evidence this iter (all 19 THEMEROOM_MAPS byte-identical to the themerms.lua des.map blocks :464–742; every one carries filler_region-onl Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3533: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `relink_light_sources`: C lookup_id_mapping as its own row (restore.c:1484; ghostly obj-
- D-3532: per-site des evidence this iter (TUT1_MAP byte-identical to tut-1.lua des.map, 75×18; TUT2_MAP byte-identical to tut-2.lua des.map, 14×8; tut-1.lua =  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
<!-- landmarks:end -->
