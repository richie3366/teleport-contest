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

- D-1790…D-3346 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3346.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3346 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3346: extended the ALREADY static edge (apply.js:110; `imports.mjs --can` ALREADY) and added 3 new static edges (eat.js:155, mon.js:108, region.js:61; `impo Named: - `attacktype_fordmg`: none in-body — whole C body live at js/uhitm.js:609.
- D-3345: extended the ALREADY static edge (`useupf` added to the invent.js import, js/zap.js:238; `imports.mjs --can` ALREADY — no new edge, no new test surfac Named: - `useupf`: shop-bill arms (C :4774–4779 `!mon_moving && costly_spot` addtobill vs stolen_
- D-3344: extended the ALREADY static edge (`import { get_level, Invocation_lev } from './dungeon.js'`, js/hack.js:77; `imports.mjs --can` ALREADY — no new edge Named: - `Invocation_lev`: none in-body — whole C body live at js/dungeon.js:2392.
- D-3343: new static dog→mklev edge (`import { somex } from './mklev.js'`, js/dog.js:72; `imports.mjs --can` SAFE — same 101-module SCC, hoisted fn, verify judg Named: - `somex`: none in-body — whole C body live at js/mklev.js:32977.
- D-3342: m_at: rewired the 7 sites to the ALREADY-imported alias (js/teleport.js:92 `m_at as mon_m_at` — no import change, no new edge); deleted the clone; one Named: - `m_at`: none in-body — whole C body live at js/mon.js:1745.
- D-3341: extended the six ALREADY static dungeon edges (js/do.js:100, js/mon.js:71, js/muse.js:95, js/potion.js:201, js/shknam.js:44, js/teleport.js:60-63 — `i Named: - `ledger_no`: none in-body — whole C body live at js/dungeon.js:1097.
- D-3340: extended the three ALREADY static do_name edges (js/fountain.js:102-105, js/mhitu.js:38-41, js/zap.js:279 — edges proven by the read import blocks, no Named: - `Amonnam`: none in-body — whole C body live at js/do_name.js:1234.
- D-3339: new static music→monmove edge (`import { monflee } from './monmove.js'`, js/music.js:46; `imports.mjs --can` SAFE — hoisted fn, verify judges TDZ); de Named: - `monflee`: none in-body — whole C body live at js/monmove.js:1109.
- D-3338: extended the ALREADY static mthrowu edges (js/zap.js:280, js/muse.js:29; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted Named: - `m_useup`: none in-body — whole C body live at js/mthrowu.js:184.
- D-3337: extended the ALREADY static potion edge (js/zap.js:290; `imports.mjs --can` ALREADY — no new edge, no new test surface); deleted the clone; rewired th Named: - `healup`: none in-body — whole C body live at js/potion.js:2231.
- D-3336: extended the ALREADY static dungeon edges (js/dig.js:73, js/dokick.js:36; `imports.mjs --can` ALREADY both — no new edge, no new test surface); delete Named: - `ledger_no`: none in-body — whole C body live at js/dungeon.js:1097.
- D-3335: new static teleport→mklev edge (`import { somex } from './mklev.js'`, js/teleport.js:95-96; `imports.mjs --can` SAFE — same 101-module SCC, hoisted fn Named: - `somex`: none in-body — whole C body live at js/mklev.js:32977.
- D-3334: rewired the sole clone site to the ALREADY-imported live export (`t_at as trap_t_at`, js/steed.js:60 — no new edge, no `imports.mjs` change needed); d Named: - `t_at`: none in-body — whole C body live at js/trap.js:1119.
- D-3333: extended the ALREADY static do_name edge (js/teleport.js:66; `imports.mjs --can` ALREADY) with `Amonnam`; deleted the clone; removed the now-unused `x Named: - `Amonnam`: none in-body — whole C body live at js/do_name.js:1234.
- D-3332: new static sit→shk edge (`import { money_cnt } from './shk.js'`, js/sit.js:137; `imports.mjs --can` SAFE — hoisted fn, in-SCC shape, verify judges TDZ Named: - `money_cnt`: none in-body — whole C body live at js/shk.js:4762.
<!-- landmarks:end -->
