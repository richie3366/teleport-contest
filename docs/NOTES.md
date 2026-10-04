# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Live hypotheses only:

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
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3428 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3428.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3428 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3428: dropped wall-stop `|| IS_OBSTRUCTED(typ)` + tail `stackobj` in `launch_obj`. Named: - `launch_obj`: none — whole (C :3517 bmsg `IS_OBSTRUCTED` kept).
- D-3427: direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified still unshipped first (m_dowear `m_dowear(mtmp, true)` un-awaited at  Named: - `makemon`: m_dowear fire-and-forget at js/makemon.js:3761 (sync level gen cannot await);
- D-3426: C-exact `continue` nomores (first guarded arm wins; bag rn2(5) no longer burnt on skipped objs); canspotmon INVIS; urgent_pline wraps; surface() yank; Named: - `doset`: wc2_supported skips (minimal-wincap2 model gap); optfn_boolean perm_invent gate
- D-3425: one-line mndx flip per dead site — `(x?.mndx ?? -1) ===/!== PM_X` (house `?? -1` idiom, already pervasive in trap.js; null-safe: null data behaves exa Named: - `animate_statue`: shop/monster ownership prefix (shk_your Manlobbi's/mon's) reduced to t
- D-3424: deleted all 6 locals (pointer comments left); dig/mthrowu/muse/trap added `canseemon` to the existing display.js import (no new module edge — all 5 fi Named: none — live bodies whole vs C (worm/infrared/See_invisible/mundetected/sensemon arms all l
- D-3423: direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified still unshipped first (m_dowear `m_dowear(mtmp, true)` un-awaited at  Named: - `makemon`: m_dowear fire-and-forget (makemon.c:1445; sync level gen, js/makemon.js:3761)
- D-3422: - `mbhit`: shipped both arms (map_invisible + destroy_drawbridge). Named: none — all four whole (`cpostfx`'s WIN_MAP flush is the shipped house more() idiom, not an
- D-3421: direct `ledger.mjs set` ×11 (NOT via finish-iteration). Named: - `doset`: wc2_supported skips (minimal-wincap2 model gap); optfn_boolean perm_invent gate
- D-3420: ported every named arm in C order with live-export imports (no new generated tables): `in_your_sanctuary` (new priest.js edge — hoisted fn, IN-SCC cyc Named: none — both partials' declared omits shipped whole; topl_putsym/impossible carry no shippa
- D-3419: `ledger.mjs set` ×2 to the D-3404 Named omissions text, each sub-omit re-verified still unshipped first (swap :2147 — mtrapped cleared js/hack.js:1401 Named: - `domove_swap_with_pet`: C `:2147` `assert(trap != NULL)` — implied by `mtrapped` (cleare
- D-3418: 35 strncmpi sites → live export (16 files); 3 sfbase stubs; 3 audits. Named: - `strncmpi`: 35 sites wired; still local: mondata startsWith, objnam carry, parse_sym_line/get_lua_version absent.
- D-3417: `ledger.mjs set` ×3: splitmon `ported --note "audited D-3402: whole vs C"` (prescribed verbatim); see_monsters/docrt_flags `partial` restored to the D Named: - `see_monsters`: restore.c:682 defer setter absent.
- D-3416: ported each named arm in C order (cites in code); retired 5 clones to live exports (accessible_apply/steed accessible_cell/end spotOk→monmove accessib Named: - `stairs_description`: none.
- D-3415: `ledger.mjs set` ×3 to the D-3404 Named omissions text (verified each sub-omit first: test_move ECMD_OK/cmdq — lock.js:868 doopen_indir returns bool,  Named: - `test_move`: ECMD_OK + canned-kick fake (JS doopen_indir returns bool, not ECMD codes; c
- D-3414: flipped each site to `(u.uinwater | 0)` (D-3400 idiom) with a C-line cite after verifying its C locus says Underwater — all 12 do (loci above). Named: - `swim_move_danger`, `set_apparxy`, `hideunder`, `m_canseeu`, `litroom`, `do_screen_descr
<!-- landmarks:end -->
