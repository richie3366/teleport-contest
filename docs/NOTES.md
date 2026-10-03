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
- Audit 2167–2175 gap: D-3189/D-3190 lack per-SHA audits (counts live in CURRENT Score + journal).

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
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3334 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3334.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3334 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3334: rewired the sole clone site to the ALREADY-imported live export (`t_at as trap_t_at`, js/steed.js:60 — no new edge, no `imports.mjs` change needed); d Named: - `t_at`: none in-body — whole C body live at js/trap.js:1119.
- D-3333: extended the ALREADY static do_name edge (js/teleport.js:66; `imports.mjs --can` ALREADY) with `Amonnam`; deleted the clone; removed the now-unused `x Named: - `Amonnam`: none in-body — whole C body live at js/do_name.js:1234.
- D-3332: new static sit→shk edge (`import { money_cnt } from './shk.js'`, js/sit.js:137; `imports.mjs --can` SAFE — hoisted fn, in-SCC shape, verify judges TDZ Named: - `money_cnt`: none in-body — whole C body live at js/shk.js:4762.
- D-3331: extended the ALREADY static dungeon edges (js/teleport.js:62, js/shk.js:128, js/muse.js:95) with `on_level`; added new static edges (js/priest.js:39,  Named: - `on_level`: none in-body — whole C body live at js/dungeon.js:1810.
- D-3330: m_at uhitm: extended the ALREADY static mon.js edge (js/uhitm.js:93) with `m_at`; deleted the clone; one C-cite comment per site (:3611 C :699 cleave  Named: - `m_at`: none in-body — whole C body live at js/mon.js:1745.
- D-3329: ported `Is_branchlev` to js/dungeon.js:2884 (C-order slot after Is_special; C `:1469` end1-before-end2 short-circuit; svb.branches = game.branches; nu Named: - `Is_branchlev`: none in-body — whole C body live at js/dungeon.js:2884.
- D-3328: m_at: extended the ALREADY static mon.js edge (js/shknam.js:50, `imports.mjs --can` ALREADY) with `m_at`; deleted the clone; one C-cite comment per si Named: - `m_at`: none in-body — whole C body live at js/mon.js:1745.
- D-3327: three by-design resolutions (no `js/`, D-3312/D-3314 precedent) + dist2 rewire: all 12 mon.js-edge importers moved to their existing hacklib.js edge,  Named: - `badspot`: whole body — dead in C; no scored caller.
- D-3326: `export function get_nhcolor_from_256_index(idx)` in js/options.js (:6152, C-order slot between closest_color and colortable_to_int32) with C-line cit Named: - `get_nhcolor_from_256_index`: none in-body — whole C body live.
- D-3325: `export function early_init(argc, argv)` in js/allmain.js (C locus, :776, immediately before newgame) with the 7 calls in C order and C-line cites; js Named: - `early_init`: none in-body — whole C body live (7/7 calls; argv (0, []) documented Rule-
- D-3324: extended the ALREADY static hacklib edges (js/shknam.js:9, js/mhitm.js:14, js/trap.js:146, js/muse.js:94) with `distmin`; added 5 new static edges (`i Named: - `distmin`: none in-body — whole C body live at js/hacklib.js:19.
- D-3323: extended the ALREADY static do_name edge (js/music.js:43; imports.mjs ALREADY both names) with `a_monnam, Amonnam`; deleted both clones; one C-cite co Named: - `a_monnam`: none in-body — whole C body live.
- D-3322: deleted both clones; extended the ALREADY static do_name edges (js/trap.js:44, js/hack.js:74; imports.mjs ALREADY both files) with `a_monnam`; one C-c Named: - `a_monnam`: none in-body — whole C body live.
- D-3321: extended the ALREADY static edge (js/eat.js:142) with `fingers_or_gloves`; deleted the clone; both call sites unchanged — their flags were already C-c Named: - `fingers_or_gloves`: none in-body — whole C body live.
- D-3320: deleted both clones; extended the existing static shk.js edges (imports.mjs ALREADY both files) with `money_cnt`; one C-cite comment per site; `if (sh Named: - `really_done`: none new — pre-existing doc-named omissions stand (dumplog family incl.
<!-- landmarks:end -->
