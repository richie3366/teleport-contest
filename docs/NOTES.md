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

- D-1790…D-2762 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2762.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2762.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2762: ported all six bodies in C order: `handler_rebind_keys` redo PICK_ONE menu via live `select_menu_pick_one` (auto-letters ≡ tty_end_menu; `end_menu` pr Named: `bind->param` store (overlay is name-only; CMD_PARAM display already named in `dokeylist.j
- D-2761: restarted the body in C order with per-arm `:line` cites: `:565` hallucinate before the `:567-568` drink guard; `:569` `ltyp` via SURFACE_AT (D-1103); Named: none new on this body — whole C body live; every callee live (isok/SURFACE_AT/Hallucinatio
- D-2760: restarted the body in C order with per-arm `:line` cites: opoisoned + `resists_poison` head; quest-arti/obj_resists short-circuit; fx/fptr via LOW_PM/ Named: none new — whole C body live; every callee live (brief 4/4: obj_resists/find_pmmonst/peek_
- D-2759: restarted the body in C order with per-arm `:line` cites: NODIAG head (`You("cannot move diagonally.")` + nomul, grid-bug `umonnum==PM_GRID_BUG` idiom Named: none new — whole C body live; every callee live (brief 13/13: You/nomul/isok/pline_xy/upst
- D-2758: restarted the body in C order with per-arm `:line` cites: no-spells `You("don't know any spells right now.")` guard; rejectcasting guard — C prints in Named: none new.
- D-2757: the menus are the C bodies in that order. Named: `status_hilite_menu_add` (`botl.c:3889–4302`) — both `choose_updownboth` call sites, the e
- D-2756: the function is the C body in that order. Named: `panic()` NORETURN has no JS body (`paniclog` is Rule #2); the off-map arm throws and does
- D-2755: `feel_location` still paints when the tty matches. Named: `maybe_absorb_item` (`steal.c:772`) stays a named omission (no JS port).
- D-2754: The head runs after the opening `d()` and before the adtyp dispatch. Named: `attk_protection` callers `mhitu.c:2484` (`passiveum` AD_STON, `js/mhitu.js:3305`) and `uh
- D-2753: the arm calls `memory_glyph_is_invisible(loc)`, the same predicate `mondead` uses for `levl.glyph`. Named: none new on this predicate.
- D-2752: the arm tests `!(u.uinwater | 0)`. Named: none new on this arm.
- D-2751: the arm calls exported `Blind()` from `js/invent.js` (the macro, plus `uroleplay.blind`). Named: none new on this arm.
- D-2750: `mon_at_display` skips `MON_OFFMAP`, the same predicate `m_at` uses. Named: none new.
- D-2749: restarted the body in C order with per-arm `:line` cites; same-file caller `mhurtle` doc updated (petrify/steed-vision omit retired, NODIAG/minliquid  Named: none new — whole C body live; every callee live (21/21 brief list: the 4 new cross-module 
- D-2748: restarted the body in C order with per-arm `:line` cites: nothing_to_steal closure (C goto re-entry from inv gate + empty pick); cant_take closure (ho Named: C `assert(uball)` debug no-op; o_id-null guard on the stealoid compare (JS-artifact safety
<!-- landmarks:end -->
