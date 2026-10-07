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

- D-1790…D-3607 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3607.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3607 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3607: serMon persists `out.mw = mtmp.mw ? 1 : 0` (save.c:834 flag analogue); deserMon relinks mtmp.mw to the first minvent member with `owornmask & W_WEP` w Named: restore.c:443 `impossible("bad monster weapon restore")` diagnostic (sync restore path; fi
- D-3606: `scripts/extract-objects.py` now emits `oc_nutrition` (dump printf + row field + `oc_nutrition: r[22]` mapping) and `js/generated/objects_data.js` is  Named: none in obj_nutrition (whole: corpse/globby/oc arms + uninit guard).
- D-3605: js/potion.js — make_stunned dual-writes `uprops[STUNNED].intrinsic` via live same-module `set_itimeout` (flag-preserving, same clamped value; STUNNED  Named: make_confused stays flat-only — correct, its master is the dedicated CONFUSION arm's flat;
- D-3604: measured, not theorized (recorder screens + C RNG log): step-8 C message `… 'debug_hunger' option toggled on.` and the step-29 menu row `q - debug_hun Named: - `gethungry`: none in-body — C :3162–3277 whole in JS.
- D-3603: the two C prompt items at the call site per the in-file sibling precedent (`handler_menu_objsyms`, `handler_whatis_coord`, `handler_pickup_burden`): ` Named: live `iflags.menu_headings` read-back (C-domain attr 7/0/… → display-bit mapping; all sibl
- D-3602: `js/options.js` doset() only, no new imports (same-module optfns): the gameview `roleOptfn` chain now routes windowtype/catname/dogname/horsename/msgh Named: none in this unit — all 6 D-3580 literals now mirror C `:9038` (windowtype 'tty' identical
- D-3601: added `y_monnam` to the existing do_name.js import (imports.mjs ALREADY, no new edge); ported the steed if/else in C order at the impaired gate with C Named: other inline-block deferrals stay named (Passes_walls/ooze/Underwater/tunnels/Blind feel_l
- D-3600: deleted the pray.js clone, added `Blind` to the existing invent.js import (imports.mjs: edge already present, no new edge). Named: none in this unit — dopray body verified whole by reading vs C `:2199–2273` (ParanoidPray,
- D-3599: the three bodies now walk `rooms[MAXNROFROOMS+1..]` to hx<0 as loop 2 (decl.c:1169 cite; `MAXNROFROOMS` added to the existing const.js import in each  Named: teleport.js clone keeps its pre-existing ANY_TYPE-arm drift (named in c-js-map data.md; it
- D-3598: deleted the unconditional flush + rewrote the comment to cite C `:473–479` and `cmd.c:5104`. Named: none in this unit — the once-per-input section now mirrors C `:473–479` exactly; dog_move/
- D-3597: try_restore_save sets `game._lastinvnr = 51` with decl.c/allmain.c/unixmain.c cites; the dosave0 omission (D-3584) is retained — C never writes the fi Named: none in this unit — loot_mon body verified whole (saddle query + cursed/nolimbs arms, swal
- D-3596: `js/monmove.js` only, no new imports (`rloc`, `RLOC_MSG` already imported — the Tengu arm is the live `await rloc(mtmp, RLOC_MSG)` precedent): deleted Named: none new — this arm is now whole (gate + teleport + MOVED semantics).
- D-3595: `js/trap.js` only, existing const.js edge (no `imports.mjs --can` needed): `Antimagic_prop()` now ORs `uprops[ANTIMAGIC].intrinsic/extrinsic` with the Named: none new — trap.js flats-only `Passes_walls`/`Half_spell_damage` readers untouched (both f
- D-3594: dismiss via the live `dismiss_nhw_menu()` (js/invent.js:3095; corner geom → `docorner` gbuf resend, zero display-RNG burns — sibling precedent used by Named: - `doterrain`: none — body whole, dismiss now corner-faithful.
- D-3593: none in js/ — audit only. Named: (1) the `:293` true arm `init_random(fn)` ← `set_random(sys_random_seed(), fn)` — OS entro
<!-- landmarks:end -->
