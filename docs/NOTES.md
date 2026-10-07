# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Cliff phase (human, 2026-10-06 — Constitution §10.18):** hypothesis:
  held-out (16/44, RNG 34.8 % at rngSteps 87.7 %) is bounded by a few
  *early cliffs in long sessions* that the corpus already records —
  `next_ident` (14 sessions, 50 k RNG lost: `^G`/wish monster-name parse),
  `level_tele` (13, 38 k: `^V` arrival `--More--`), `distfleeck` (5–7,
  12–35 k), `yn_function` (25), `do_statusline2` (20) — not by missing C
  (the ledger gap is 1 function; its counts have been frozen since
  2026-10-04). Falsifier: ~20 cliff iters with board rising + held-out
  flat ⇒ corpus stopped predicting; human revisits. Breadth hypothesis
  falsified 2026-10-06 (ledger +74 reclassified partials, held-out flat
  ~50 iters).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
- **mfndpos W2 [measure] DONE (D-3560):** turn-7 starts identical; 541 turn-7 C→(43,12) goal=(43,10) vs JS→(45,11) goal=hero(62,10); writer=`m_search_items` (43,10)-target. Port iter: fobj@(43,10) check + port arm. Recorder reverted, pristine re-record identical; probes in /tmp.
## Don't re-check (≤15)

- D-1790…D-3620 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3620.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3620 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3620: `js/display.js`: new `mark_topline_empty()` (C `:1873–1884` else-arm: EMPTY + msg-cur zero, no visual change) wired in `really_done` after `flush_topl Named: none new in these arms — both C sites fully replicated.
- D-3619: `js/spell.js` dospellmenu loop only — `const marker = splnum === splaction ? '*' : '-'` with the C `:2130–2132` + wintty `:1468–1473` cites. Named: D-2369's stand, unchanged: tty explicit-de-select self-swap (C `:2159–2163` `splaction >= 
- D-3618: both loops iterate the grown rect (0,0)-(74,17) + origin with C `:5624–5626` cites. Named: none in the tut-1/tut-2 lit arms (bounds exact; lava-equivalence holds — no lava on either
- D-3617: 
- D-3616: 
- D-3615: 
- D-3614: dog_goal portal scan walks the doidtrap union (ftrap store, then level.traps, deduped). Named: none in the portal arm.
- D-3613: the in-file dopray/dosacrifice `| 0` idiom at the :2426 site: `if (!(gnostic | 0)) { gnostic = 1; livelog } else { gnostic = (gnostic | 0) + 1 }` (alw Named: unchanged from D-0912 (non-Cleric/Knight `known_spell(SPE_TURN_UNDEAD)`/spelleffects fallb
- D-3612: oil-pattern drain+bail before exercise (D-3608; bare idiom like the D-3610 trap sites, matching zap.js's other losehp sites which carry no wail else-b Named: none in maybe_destroy_item (the drain+bail is the ESM noreturn adapter at the C-noreturn p
- D-3611: oil-pattern drain (D-3608 verbatim) at the kick_ouch losehp site: `if (_losehp_needs_done) { await finish_losehp_done(); if (gameover) return; } else  Named: none in kick_ouch (the drain is the ESM noreturn adapter at the C-noreturn position; the C
- D-3610: 10 finish_hero_losehp drains (file's own adapter, same bare idiom as the pit sites) at bear :3783, rust :3932, rock :4083, float_down :3458 (bail 1 =  Named: none in the 10 ported functions (the drains are the ESM noreturn adapter at C-noreturn pos
- D-3609: both sites → `makeknown(booktype)` (live invent.js:4810, already imported at spell.js:130 — no new edge); default arm awaits `impossible('Unknown spel Named: none new — study_book verified whole vs C `:468–641` in C order this iteration (dull-book 
- D-3608: potion.js fatal-losehp drains (water/sickness/levitation/acid/dip/potionhit + dopotion bail); Priest-94282 PASS. Named: dothrow post-potionhit bail is Next.
- D-3607: serMon persists `out.mw = mtmp.mw ? 1 : 0` (save.c:834 flag analogue); deserMon relinks mtmp.mw to the first minvent member with `owornmask & W_WEP` w Named: restore.c:443 `impossible("bad monster weapon restore")` diagnostic (sync restore path; fi
- D-3606: `scripts/extract-objects.py` now emits `oc_nutrition` (dump printf + row field + `oc_nutrition: r[22]` mapping) and `js/generated/objects_data.js` is  Named: none in obj_nutrition (whole: corpse/globby/oc arms + uninit guard).
<!-- landmarks:end -->
