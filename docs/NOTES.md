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

- D-1790…D-3282 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3282.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3282 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3282: js/priest.js — canonical `p_coaligned` restarted as `(game.u?.ualign?.type|0) === mon_aligntyp(priest)` (C order, one expression); mon_aligntyp doc li Named: - `p_coaligned`: none in-body — whole C body live.
- D-3281: js/teleport.js — leash arm: mtame--, then the m_unleash(TRUE) message initiated first (C print-then-mutate initiation order; `void pline_mon` / `void  Named: - `migrate_to_level`: mon.c:2703 unstuck (async-only: awaits docrt on swallow release; no 
- D-3280: js/teleport.js — `emits_light` on a new `./light.js` import edge (same 102-module SCC, hoisted, `imports.mjs --can` VERDICT: SAFE); tail appended in C Named: - `migrate_to_level`: `:898–901` leash arm (mtame-- + m_unleash — live export async, sync 
- D-3279: js/dog.js — follower arm `await relmon(mtmp, game.mydogs)` (canonical js/mon.js export, pre-existing import edge; no new module edge), doc omission re Named: - `keepdogs`: none in-body — whole C body live.
- D-3278: `place_monster(mtmp, x, y)` in `makemon` at C position (import pre-existed); the three move sites clear only their own grid cell (`get(...) === mtmp`  Named: - `makemon`: ptr-arm G_GENOD veto + wizard-extinct debugpline (`:1204–1212`); `iflags.debu
- D-3277: ported the mysteryforce arm in C order (Inhell && up && amulet && !newdungeon && !portal && dunlev < max-3 gate; `rn2(4+mysteryforce)` kick-in; odds 3 Named: - `goto_level`: none new — remaining Deferred arms from the doc block stay (binary NHFILE 
- D-3276: js/end.js — canonical `container_contents` exported; doc Callers line now names pickup.c:3122 → js/pickup.js use_container. js/pickup.js — clone + bot Named: - `container_contents`: none new — inherits the canonical's D-3260 omits (in_dumplog arms,
- D-3275: js/uhitm.js only — `silvermsg`/`silverobj` locals plumbed from `hmdHit` (C :1771–1772 via do_hit :881/:897/:1036/:1378), gate replaced with C's `if (s Named: - `hmon_hitmon`: none in-body — whole C body live (ledger omits retired: weapon plumbing t
- D-3274: canonical `export function priestname/mon_aligntyp/restpriest` in js/priest.js (C home), `export function bogon_is_pname` in js/do_name.js (C home); d Named: - `priestname`: none in-body — whole C body live (Hallu tail is a sync mirror of the live 
- D-3273: js/mon.js — canonical `export async function relmon` (same body, C-cited doc naming all 4 C callers); replmon gains the :2538–2543 light swap (live em Named: - `relmon`: none in-body — whole C body live.
- D-3272: js/makemon.js — local clone promoted to `export function mbirth_limit` (same if-chain, C-cited doc naming all 3 C callers). js/dog.js — clone deleted, Named: - `mbirth_limit`: none in-body — whole C body live.
- D-3271: js/zap.js — local clone promoted to `export function exclam` (same if-chain, C-cited doc). js/mthrowu.js, js/uhitm.js, js/spell.js — clones deleted, ` Named: - `exclam`: none in-body — whole C body live.
- D-3270: js/timeout.js — mtimedone block moved to C :641 position (right after sleep_dialogue, before the uprops `--` loop), same body, C-cited comment; no imp Named: - `exercise`: :491 + :510–514 debugpline (D_DEBUG-only, D-2586 precedent); :516–517 encumb
- D-3269: js/vault.js — `await stop_occupation()` + `if (multi>0){nomul(0);await unmul(null);}` (C :494–498); guard gains `is_silent(game.youmonst?.data)` (C :4 Named: - `invault`: none in-body — whole C body live (all 38 C callees live or C-home-ported this
- D-3268: js/apply.js — `defsym_explanation` added to the pre-existing uhitm.js import edge (call-time use of a hoisted export; no new module edge, no `--can` n Named: - `use_stethoscope`: none in-body — whole C body live (D-2594 omit retired; callee its_dea
<!-- landmarks:end -->
