# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Marathons (architect, 2026-10-09 — §10.19):** held-out (18/44, RNG
  41.7 %, rngSteps 92.4 %) loses RNG to early cliffs in *long* sessions the
  344-step corpus never recorded; the marathon cohort finds them (50/160,
  RNG 74.7 %). Falsifier: `hidden-proxy families` long-family RNG % rising
  ~20 iters while `leaderboard.mjs` RNG % stays ~41.7 % ⇒ fix the generator
  (diff against `seed0360`/`seed4500`/`seed0030` key streams). Falsified:
  2026-10-06 "corpus already records the cliffs" (board +40, held-out flat).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** port the value's writer, not the painter (region-heuristic owners).
- **disclose→enlightenment (measured):** Priest-92179 s100 display-stream-only (RNG 3081/3081); SYMPTOM-parked, proof in park archive.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
- **Trail stash (D-3739 latent):** JS per-level vs C arrival-clear; rings agreed — not the cause.
- **mattackm→covetous (D-3748/49 DONE):** :1778–1800 shipped, 4/4 moved; do not re-check mattackm body, can_carry, turn-order.
## Don't re-check (≤15)

- D-1790…D-3751 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3751) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3751.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3751 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3751: `js/makemon.js` only — the gate now calls the live `m_at()` export (already imported from mon.js; `mon.js:1725`: grid incl. worm segs via place_worm_s Named: none new in the gate.
- D-3750: js/getline.js only (+1 export line): new `prompt_paint_flush()` helper (`if (game.u?.ux) flush_screen(1) else paint_topline_only()`); all four prompt  Named: none new (the `_buildScreenOutput` no-commit live-commit fallback stands — falsified as th
- D-3749: inserted the block in C order after mtame, before shk/gd/priest: `is_covetous(ptr)` → tx,ty from `mtmp.mgoal` (unset defaults (0,0) — C's zeroed struc Named: (1) C `:1769–1770` wormno early-goto (worms skip all specials incl. tame/covetous/shk/mail
- D-3748: none — measurement only. Named: (1) C-side `@ file:line` tags shift under instrumentation (insertion delta) — matching is 
- D-3747: swap-with-last per C :355–357 (`js/region.js:656–661`); exported (C linkage is extern, decl :30) for the order test; `free_region` doc "splices" → "sw Named: none new.
- D-3746: js/zap.js FIRE arm: `if (game.program_state?.gameover) break;` between the destroy block and the ignite gate (C-cited comment; lifesave-safe: gameover Named: none new in the gated arm.
- D-3745: `js/zap.js` only — oil-pattern `else { await finish_maybe_wail(); }` after the fatal drain (C order: the wail emits inside losehp before zhitu returns Named: the `if (dam)` gate vs C's unconditional losehp(dam) (pre-existing D-0737: C losehp(0) mov
- D-3744: `js/lock.js` only — capture `loc.remembered_glyph?.glyph` before feel_location, OR it into res in C order; `loc`/`portcullis` hoisted above the Blind  Named: doopen_indir + pick_lock Blind glyph-halves (same D-2286-era lastseentyp-only idiom — unme
- D-3743: deleted the extra `bot()` and its comment; the preserved botlx now drives the repaint at the next pline's flush, C order. Named: none new.
- D-3742: one mirror clear `u.uhave_amulet = 0` beside `uhave.amulet = 0` in freeinv_core's amulet arm, C-cited. freeinv_core verified whole arm-by-arm against  Named: none new. freeinv_core whole (D-2588 ported stands).
- D-3741: js/trap.js only — inside the extending-write gate, mirror the TIMEOUT bits to `uprops[WOUNDED_LEGS].intrinsic` (slot created when absent; non-TIMEOUT  Named: none new (the pre-existing `set_wounded_legs` doc note stands: steed-leg messaging is the 
- D-3740: js/mklev.js only — C's `:1826–1835` loop in all 9 `placeTrapRnd` bodies (do/while + `>100` give-up, existing `pos.x<0` guard kept), single STAIRS/LADD Named: inliner gaps that predate and survive this fix (canonical create_trap/mktrap have them; no
- D-3739: js/mklev.js only — capture `mkobj_at`'s return and `stackobj(otmp)` it (C-cited; containment is always 0 on this path so the gate passes; `stackobj` a Named: splev_create_object's other create_object arms (lit/burn, buried, prize/nomerge, named/art
- D-3738: `js/questpgr.js` only — three goal_first bodies verbatim from quest.lua (`cat -A`-verified: blank lines truly empty, double-space after periods in bot Named: Hea/Mon/Rog/Tou/Val goal_first bodies (quest.lua :954/:1397/:2051/:2507/:2725; no corpus s
- D-3737: page, stay and unknown keys re-prompt without dismissing; the migrant is `MON_OFFMAP` only for its leaving `newsym`, then the flag is restored (a last Named: - `domove_core`: travel head (:2726–2730) lives upstream in continue_run (findtravelpath_t
<!-- landmarks:end -->
