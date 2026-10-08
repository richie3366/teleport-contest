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
- **toss_up→chwepon DONE (D-3640):** HCOLORS 74/74, writer ported — do not re-check.
## Don't re-check (≤15)

- D-1790…D-3668 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3668.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3668 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3668: `js/mklev.js` only — new `themeroom_random_feature_contents` (C-order feature list, live `nhlib_shuffle`, `l_push_mkroom_table` width/height, room-rel Named: (1) standing dispatch omissions untouched: Water vault D-0690, Blocked center map+replace_
- D-3667: `js/invent.js` only — teardown branches on the in-scope `offx` (`nhw_menu_geometry`, `:8651`): offx==0 → `docrt()` (fullscreen arm, identical to befor Named: (1) erase_menu_or_text `:1098` mid-life menu clear still has no JS caller (pre-existing — 
- D-3666: none — measurement only. Named: (1) C-side `~drn2` call-site tags are stale-context junk (patch 003 macros cover only core
- D-3665: `js/invent.js` only — `end_menu_cut_str(text, cap=78)` helper (`:2728–2733` verbatim, paint-time copy: C mutates mlist but C callers only read back id Named: (1) morestr truncation `:2753–2758` (dead: C's own morestr construction bounds it; JS more
- D-3664: `js/invent.js` only — (1) n===0 arm prints C's 'Not carrying anything.' (`:3965` + `:3140–3143` cite); (2) lets[0]-absent arm drops the pline, returns Named: (1) tty empty-menu UX on the `:4099` arm unpinned — C would display the empty menu and wai
- D-3663: replace the spurious `docrt()` with `await dismiss_nhw_menu()` (js/do_name.js:1569) — the invent.js destroy analogue whose corner arm is erase_menu_or Named: none new. (Fullscreen-arm docrt inside dismiss_nhw_menu retained — C erase_menu_or_text cl
- D-3662: `js/save.js` — (1) `game.program_state.restoring = REST_GSTATE` right after payload validation, before any hydration (C `:795` order; stays through th Named: (1) C's three-phase REST progression (REST_GSTATE → REST_LEVELS other-ledgers loop → REST_
- D-3661: TEMP-C log-only paint/state/flush history in the ignored recorder tree: display.c newsym/show_glyph/flush_screen gated on (22,15), restore.c dorecover Named: none (no port in this commit).
- D-3660: none — no writer can be named from `show` + `brief` (null jsOwner/entries; the only other owner paints botl, not the map), and the owner's `[measure]` Named: (1) recorder screen-capture defect still needs human/audit fix + session re-record-or-excl
- D-3659: `if (mtmp) mtmp.female = 0;` + C-order cite comment in all three clones (C order: `:2125` before `:2126` peaceful). Named: (1) other bare `mkclass`+`makemon` sites unaudited for des-vs-random attribution + female 
- D-3658: movebubbles runs C's vision_recalc(2) loop via vision_off_newsym_gbuf pre-swap (Tourist-92100 158→PASS). Named: fill waslit/flags gap (pre-existing).
- D-3657: deleted the 23-line clone (D-1849 discipline: import the export, never a second body); `export` on `mon.js` `mdrop_obj` (doc notes the live callers);  Named: (1) `zap.c:430` bhitm saddle arm (above) — inline subset also misses the worn-saddle `upda
- D-3656: wired all three `set_msg_xy(x, y)` in C order + `await flush_topl_more()` after the danger-sense pline (house display_nhwindow(WIN_MESSAGE, FALSE) idi Named: none. (All three set_msg_xy + the flush now wired; the pline-vs-Your/You wrapper choice is
- D-3655: verbatim D-3403/D-3654 sibling pattern: prompt row spreads `...menu_prompt_style()` (same-file relay, no new import) + `{ text: '', selectable: false  Named: none new.
- D-3654: verbatim D-3403/D-3646/D-3647 sibling pattern on both menus: prompt row spreads `...menu_prompt_style()` (same-file relay, no new import) + `{ text: ' Named: none new.
<!-- landmarks:end -->
