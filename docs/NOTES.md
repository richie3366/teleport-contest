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
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **mfndpos W2 [measure] DONE (D-3560→D-3561):** shipped (m_search_items writer was MZ_HUMAN capacity); do not re-check.
- **disclose tour-Priest [measure] DONE (D-3626→D-3627):** shipped (erase_menu_or_text corner arm); wish pair = separate Hallu display-RNG class.
- **toss_up→chwepon [measure] DONE (D-3640):** Knight-94330 Hallu desync = C chwepon:920 entry hcolor (drawn, discarded on the !uwep arm) vs JS no-draw clone; writer ported same iter (probe 98→121, 104→286 screens). HCOLORS 74/74 set+order — no table bug, do not re-check.
## Don't re-check (≤15)

- D-1790…D-3661 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3661.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3661 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3661: TEMP-C log-only paint/state/flush history in the ignored recorder tree: display.c newsym/show_glyph/flush_screen gated on (22,15), restore.c dorecover Named: none (no port in this commit).
- D-3660: none — no writer can be named from `show` + `brief` (null jsOwner/entries; the only other owner paints botl, not the map), and the owner's `[measure]` Named: (1) recorder screen-capture defect still needs human/audit fix + session re-record-or-excl
- D-3659: `if (mtmp) mtmp.female = 0;` + C-order cite comment in all three clones (C order: `:2125` before `:2126` peaceful). Named: (1) other bare `mkclass`+`makemon` sites unaudited for des-vs-random attribution + female 
- D-3658: movebubbles runs C's vision_recalc(2) loop via vision_off_newsym_gbuf pre-swap (Tourist-92100 158→PASS). Named: fill waslit/flags gap (pre-existing).
- D-3657: deleted the 23-line clone (D-1849 discipline: import the export, never a second body); `export` on `mon.js` `mdrop_obj` (doc notes the live callers);  Named: (1) `zap.c:430` bhitm saddle arm (above) — inline subset also misses the worn-saddle `upda
- D-3656: wired all three `set_msg_xy(x, y)` in C order + `await flush_topl_more()` after the danger-sense pline (house display_nhwindow(WIN_MESSAGE, FALSE) idi Named: none. (All three set_msg_xy + the flush now wired; the pline-vs-Your/You wrapper choice is
- D-3655: verbatim D-3403/D-3654 sibling pattern: prompt row spreads `...menu_prompt_style()` (same-file relay, no new import) + `{ text: '', selectable: false  Named: none new.
- D-3654: verbatim D-3403/D-3646/D-3647 sibling pattern on both menus: prompt row spreads `...menu_prompt_style()` (same-file relay, no new import) + `{ text: ' Named: none new.
- D-3653: both gates → `game.iflags?.use_color !== false` with the C-cite + convention comment (whole body carries the full note, mirror a one-liner). Named: none new.
- D-3652: prepend the two C rows — `{ text: query, selectable: false, ...menu_prompt_style() }` + `{ text: '', selectable: false }` — verbatim the D-3403/doset  Named: none new.
- D-3651: do_set returns the pline promise chained to OPTN_OK (optfn_boulder `:1201` maybe-promise precedent); the doset_compound_via_getlin fruit arm awaits it Named: none new.
- D-3650: initial/page paint shows '*' for selected rows (this loop has no count support so count is always -1), '+' only for runtime-toggled rows via _retoggle Named: (1) sibling bespoke menu loops still paint '+' for preselected rows (shk.js:5590, player_s
- D-3649: both prompt rows spread the live relayed style (`...menu_prompt_style()`, D-3648 reader) — verbatim the doset prompt precedent (`:11257`); non-selecta Named: (1) remaining ~68 prompt/header construction sites still hardcode ATR_INVERSE (same mechan
- D-3648: (1) whole `adjust_menu_promptstyle` port (C `:1769–1778` in order: copy color+attr, ctrl dispatch, flag clear) over a module-level tty_menu_promptstyl Named: (1) remaining ~70 prompt/header construction sites still hardcode ATR_INVERSE (same mechan
- D-3647: (1) both prompt headers gain `attr: ATR_INVERSE` + the blank separator (verbatim D-3403 sibling pattern); (2) new whole `get_menu_coloring` port (firs Named: (1) dynamic iflags.menu_headings read for prompt/headings (C tty_menu_promptstyle tracks l
<!-- landmarks:end -->
