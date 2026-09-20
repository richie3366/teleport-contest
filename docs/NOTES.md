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

- D-1790…D-2638 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2638.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2638.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2638: deleted all three clones → live imports (``imports.mjs --can hack.js region.js visible_region_at``: SAFE — hoisted function decls in the existing 98-m Named: ``u_locomotion`` capitalize path + ``locomotion(youmonst.data, def)`` poly fallback (C ``:
- D-2637: restarted the ``mon.js`` export in C order with per-arm ``:line`` cites — live ``is_lminion``/``Inhell`` (teleport.js; ``Inhell`` newly exported, hell Named: ``monmove.c:559`` distfleeck sawscary — ``js/monmove.js:990`` distfleeck is a documented `
- D-2636: one-line ``i !== f`` → ``i !== fsel`` (the correctly-renamed local, already used at ``:891``/``:909``/``:935``/``:953``); exported ``menu_extra_lines` Named: none new — D-2633's list stands (add_menu/add_menu_str ⇒ menu_pick line objects; cg.zeroan
- D-2635: new async export ``cond_menu`` in ``js/botl.js`` (C home) in C order with per-arm ``:line`` cites — file-local ``strcmpi_fold`` (toLowerCase shape, in Named: ``create_nhwindow``/``start_menu``/``add_menu``/``add_menu_heading``/``end_menu``/``select
- D-2634: restarted the export in C order with per-arm ``:line`` cites — ported ``linedup_chk_corpse`` as a muse.js local (``sobj_at(CORPSE,x,y) !== null``; sob Named: none — every callee live (carrying hack.js, sobj_at mkobj.js, blocking_terrain mthrowu.js 
- D-2633: restarted the body in C order with per-arm ``:line`` cites — RS_NAME (``:1834``, ``f`` stays 0 → "Pick another name first" like C); RS_ROLE filter loo Named: ``add_menu``/``add_menu_str`` (no JS export) — architectural mapping to menu_pick line obj
- D-2632: ``js/potion.js`` ``dodip`` — ``await (import './apply.js').inaccessible_equipment(obj, 'dip', false) → ECMD_OK`` in C ``:2282`` position (dynamic impo Named: ``SetVoice``-class none here; prompt letter-hiding (which letters the dip/grease prompts s
- D-2631: restarted the export in C order with per-arm ``:line`` cites — itembuf build (corpse/egg/tin ``[corpsenm]`` vs otyp decimal, ``:3814–3821``) + sync fi Named: none — done_eating/food_disappears appear only in C's "better solution" comment (``:3832–3
- D-2630: restarted the export in C order with per-arm ``:line`` cites — extract identity scan (``:469–472`` ⇔ ``indexOf``); missing → ``throw new Error('insert Named: none — every callee is live or file-local (``branch_val``); C next-pointer surgery ⇔ array
- D-2629: ported the whole C body in C order with per-arm ``:line`` cites — ``wordcount`` blank/word run counting (``:1797–1803``); ``bel_copy1`` skip-blanks +  Named: ``alloc`` length precompute (GC strings); ``cnf_line_WIZARDS`` caller + ``fmtd_wizard_list
- D-2628: restarted the export in C order with per-arm ``:line`` cites — ``fromfloor`` sampled before extract mutates ``where`` (``:1900``, ``|0`` int compare); Named: none new — every true callee is live (``get_obj_location`` timeout.js, ``costly_spot``/``a
- D-2627: restarted the export in C order with per-arm ``:line`` cites — bases zero + generic-class panic as throw with the C message (``:156–162``; botl.js com Named: ``shuffle_tiles`` (both the ``:232`` init site and the ``restnames :434`` restore site are
- D-2626: exported ``sortloot_cmp(sli1, sli2)`` in C order with per-arm ``:line`` cites — INUSE classify-once + bigger-first + indx tiebreak (``:412–428``); PAC Named: ``dupstr`` (identity — JS strings are immutable values, the loot_xname result is already a
- D-2625: ported the whole C body in C order, async only because pgetchar/nhgetch await input — fuzzer arm ``:5217–5220`` via live ``randomkey()``, still landin Named: ``nhwindows_hangup`` (windowport teardown — no JS windows layer, same class as end_of_inpu
- D-2624: restarted the export in C order with per-arm ``:line`` cites — hero ``:2018–2024`` (seetrap + ``await impossible('dotrap: %ss cannot exist on this lev Named: none new — every arm and callee is live (seetrap/impossible/pline_mon display.js, trapname
<!-- landmarks:end -->
