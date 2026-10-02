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

- D-1790…D-3294 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3294.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3294 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3294: - `whichrng`: added `const rnglist` table (CORE/DISP entries, C :26–29 order + cites) + module-local `function whichrng(fn)` in C order (`===` identit Named: - `whichrng`: no live JS caller (sole C caller split into both-streams `initRng`); module-
- D-3293: added module-local `function nomerge_exception` (C staticfn; same-file `is_mines_prize`/`is_soko_prize` live, C order, boolean return); `obj_nexto` nu Named: - `nomerge_exception`: caller insane_obj_bits unported by design (wizard sanity debug path
- D-3292: added module-local `async function vamp_shift` (C staticfn; async because JS newcham may await via pline→more→nhgetch), C order, C int 1/0 at the retu Named: - `vamp_shift`: none in-body — whole C body live (`display_nhwindow(WIN_MESSAGE, FALSE)` t
- D-3291: added module-local `async function dropp(obj)` (C staticfn; async because dropx is async in JS) iterating `game.invent` (hero-invent array idiom, cf.  Named: - `dropp`: none in-body — whole C body live.
- D-3290: ported `swallow_to_glyph` whole in C order (module-local, C staticfn; `what_mon` same-file canonical; bad-loc arm keeps `l = S_sw_br` with the report  Named: - `swallow_to_glyph`: impossible-report text stays a cite (async-only in JS; arm unreachab
- D-3289: gate the tower branch on the canonical `On_W_tower_level(game.u?.uz)` (C :1614, short-circuit order kept); `| 0` the four tower-branch rect args like  Named: - `u_on_rndspot`: none in-body — whole C body live.
- D-3288: canonical restarted in C order: extract → `if (uncreate_artifacts && otmp.oartifact) artifact_exists(otmp, safe_oname(otmp), false, ONAME_NO_FLAGS)` → Named: - `discard_minvent`: none in-body — whole C body live.
- D-3287: VISITED arm in C position before mklev: `((info?.flags|0) & VISITED)` → `await impossible('goto_level: returning to discarded level?')` + clear (missi Named: - `goto_level`: none new — remaining Deferred arms from the doc block stay (binary NHFILE 
- D-3286: restarted the body with the hero arm first: `mon === game.youmonst || mon._youmonst` (uhitm.js:303 idiom) iterates the `game.invent` array (JS hero-in Named: - `m_carrying`: none in-body — whole C body live.
- D-3285: restructured to C's `if (ptr)/else` with the veto `((game.mvitals?.[mndx0]?.mvflags ?? 0) & G_GENOD) !== 0 → return null` (clone_mon :4048 idiom; abse Named: - `makemon`: wizard G_EXTINCT debugpline1 (:1210–1212) + random-arm `debugpline0("Warning:
- D-3284: clamp after the entry captures (C order — up/dist/newdungeon read the unclamped level like C's declaration inits) via live `dunlev`/`dunlevs_in_dungeo Named: - `goto_level`: none new — remaining Deferred arms from the doc block stay (binary NHFILE 
- D-3283: canonical `stagger` (js/mhitm.js:1131) imported at all 4 sites — no new module edges (`imports.mjs --can`: ALREADY ×3; mhitm.js same-file), no third c Named: - `encumber_msg`: none in-body — whole C body live.
- D-3282: js/priest.js — canonical `p_coaligned` restarted as `(game.u?.ualign?.type|0) === mon_aligntyp(priest)` (C order, one expression); mon_aligntyp doc li Named: - `p_coaligned`: none in-body — whole C body live.
- D-3281: js/teleport.js — leash arm: mtame--, then the m_unleash(TRUE) message initiated first (C print-then-mutate initiation order; `void pline_mon` / `void  Named: - `migrate_to_level`: mon.c:2703 unstuck (async-only: awaits docrt on swallow release; no 
- D-3280: js/teleport.js — `emits_light` on a new `./light.js` import edge (same 102-module SCC, hoisted, `imports.mjs --can` VERDICT: SAFE); tail appended in C Named: - `migrate_to_level`: `:898–901` leash arm (mtame-- + m_unleash — live export async, sync 
<!-- landmarks:end -->
