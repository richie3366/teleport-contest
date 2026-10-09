# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Cliff phase (human, 2026-10-06 — Constitution §10.18):** hypothesis:
  held-out (16/44, RNG 34.8 % at rngSteps 87.7 %) is bounded by a few
  *early cliffs in long sessions* that the corpus already records
  (2026-10-06 tops in §10.18; ledger gap was 1 fn, frozen since 2026-10-04
  — not by missing C). Falsifier: ~20 cliff iters with board rising + held-out
  flat ⇒ corpus stopped predicting; human revisits. Breadth hypothesis
  falsified 2026-10-06 (ledger +74 reclassified partials, held-out flat
  ~50 iters).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** port the value's writer, not the painter (region-heuristic owners).
- **disclose→enlightenment (measured):** Priest-92179 s100 display-stream-only (RNG 3081/3081); SYMPTOM-parked, proof in park archive.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
## Don't re-check (≤15)

- D-1790…D-3702 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3702.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3702 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3702: js/monmove.js only — `You_hear` joins the pre-existing hack.js import (imports.mjs --can: ALREADY, no new edge); the four emits call it in C order wit Named: omit (2) remains — raw-`u.Deaf` reads in other C files' ports (dig/dokick/engrave/mhitm/mt
- D-3701: js/invent.js only — exported one_characteristic_hide_innate(attrindx, mode) in C order (Upolyd → Fixed_abil/stuck-ring short-circuit → 7-way switch wi Named: none new — the ledger omit (hide arms + MAGIC clearing + overlay Upolyd) is fully retired.
- D-3700: js/getline.js only — preamble in C order (gotCmdq/cmdqBuf, pop-until-null/non-KEY/newline with the yn_function tolerant KEY test, `await pline('%s %s' Named: none new — the ledger omit (cmdq preload loop + echo + early return) is fully retired; in_
- D-3699: js/polyself.js only — donning/cancel_don added to the pre-existing do_wear.js edge (imports.mjs --can: ALREADY, no new edge); the 6 `if (donning(x)) c Named: none new — the D-1991 omit is fully retired (6 cancels + flimsy condition; shield correctl
- D-3698: js/allmain.js only — nested the consume inside `if (!g.context.mv || Blind)` in C order (after the see arms), dropped the post-clear. Named: none new.
- D-3697: js/dogmove.js only — the two guards in C order after the nofetch check (mail first `:429–431`, then prizes `:432–434`), each with its C cite; is_mines Named: none new. dog_invent's D-2417 envelope is complete (drop/APPORT pickup, underfoot-eat, AT_
- D-3696:  Named: none (no port).
- D-3695: wired the tail in C order (short-circuit guard, NEED_HTH set before the call, awaited `(void)` call since JS mon_wield_item is async like all 9 siblin Named: none new. dog_invent remaining (pre-existing D-2417): SCR_MAIL skip; is_mines_prize/is_sok
- D-3694:  Named: none (no port).
- D-3693: js/cmd.js only — the S arm's veto branch does `reset_cmd_vars(true)` before the shared tail (house shape `:2813–2816`); the TRUE reset zeroes multi so Named: none new — D-3690's (1) stands (other rhack if/else key arms still bypass can_do_extcmd; t
- D-3692: none (measure-confirm). Named: none (no port).
- D-3691: js/display.js only — the arm now renders ch = oc_display_sym(objects[CORPSE].oc_class) (FOOD `%`, ROGUESET-aware like the sibling arms), keeping mcolo Named: none new — the hallu-corpse arm now mirrors C `:933–936` + `:3004–3010` exactly (burn orde
- D-3690: js/cmd.js only — the `S` arm looks up the live save row (ext_func_tab_from_txt, generated key 83 / flags 41) and awaits can_do_extcmd first; FALSE ski Named: (1) other rhack if/else key arms still bypass can_do_extcmd (pre-existing, predates this a
- D-3689: none (measure only). Named: none (no port).
- D-3688: deleted the shadow — the text arm now calls the live display.js `Hallucination()` (already imported, used 6× in detect.js; D-1493 macro reader: HH fla Named: none new — D-3680's detect-local useup note stands.
<!-- landmarks:end -->
