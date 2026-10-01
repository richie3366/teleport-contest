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
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3229 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3229.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3229 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3229: `js/mklev.js` only, no new modules/edges (all file-local like C's statics): new `let is_ok_location_func = null` + `set_ok_location_func(func)` (C `:1 Named: - `is_ok_location`: none — every arm live, every C caller wired; the `isok` OOB guard stay
- D-3228: `js/mklev.js` — deleted the clone; `import { breaktest } from './dothrow.js'` (`imports.mjs --can`: SAFE, hoisted function); call site cites C `:1877– Named: - `mktrap_victim`: none in the body — every arm, every callee live (`level_difficulty`, `m
- D-3227: `js/eat.js` — restarted the local in C order, same name/signature (all `game.occupation === eatfood` identity gates untouched): stolen guard via live  Named: - `eatfood`: none — all 4 C callees live same-module (`carried` exported; `obj_here`/`do_r
- D-3226: `js/read.js` — six arms in C order with exact strings (card_msgs[14] + `"%d0%d %ld%d1 0%d%d0"` from o_id; red_mons[14] via pmname/upwords; dunce `o_id Named: - `doread`: unported-scroll allowlist gate kept (all 23 SCR_* listed, so currently dead; `
- D-3225: `js/mkobj.js` — `const badType = t !== LS_OBJECT && t !== LS_MONSTER; const is_local = (!ls.id || badType) ? true : light_is_local(ls)` (review's one- Named: - `save_light_sources`: none added — D-3224 omits stand (NHFILE count/panic half, stash si
- D-3224: `js/lev_json.js` — snapshotGlobalLights/snapshotLocalLights run discard_flashes() + vision_full_recalc = 0 (C `:427–432`) then the shared maybe_write_ Named: - `save_light_sources`: NHFILE count/panic half (`:437–439`, single-pass callback cannot d
- D-3223: `js/artifact.js` — HALRES arm rewritten in C order (flip + re-mirror + refresh). Named: - `set_artifact_intrinsic`: HALRES talk pline (`potion.c:434–436` "Everything %s SO boring
- D-3222: port the `:2253–2257` arm in C order: `((ext.flags | 0) & CMD_PARAM) !== 0` → ``BIND=${key2txt(key)}:${ext.txt}(${bind_param_get(key) ?? ''})``. Named: - `get_changed_key_binds`: none added — NHW_TEXT tail stays the D-2550/D-2762 adaptation (
- D-3221: `js/mklev.js` — named-id branch gains the :1949–1953 geno arms (`game.mvitals[mid].mvflags`, `pm.geno & G_UNIQ`; mid kept for the :1985 mk_mplayer dis Named: - `create_monster`: none missing — whole :1925–2187 live across the split.
- D-3220: `js/uhitm.js` — damageum_adtyping +3 arms in file style (C-ref comments): AD_FAMN routes to shared `mhitm_ad_famn(game.youmonst,…)` (C's goto; the arm Named: - `mhitm_adtyping`: ENCH in damageum_adtyping + mdamagem — C arm is comment-only ("just do
- D-3219: `js/pager.js` — new `doidtrap` export in C order: `getdir` from lock.js (`imports.mjs --can pager.js lock.js getdir` SAFE, hoisted); `ECMD_CANCEL`/`TR Named: - `trapped_chest_at`: none added — C's own TODO (recursive/buried containers) stays named 
- D-3218: `js/dothrow.js` only — restarted hurtle_step in exact C order, same export name/signature: `via_jumping = (EWwalking & I_SPECIAL)`, `stopping_short =  Named: none — all 43 C callees live, every arm ported.
- D-3217: the 4 one-line clones drop the `|| endsWith('S')` disjunct (comments now cite the lowercase-only C predicate); towel/leash/poison/inv restarted as the Named: none — all 20 homes now C-exact: canonical `js/do_name.js:411` + 5 name-exact (explode/min
- D-3216: 12 literals → `'Your vision quickly clears.'`; `VISION_CLEARS` → `'vision quickly clears.'` (`:5082` composes the C string); comment cites the correct Named: - `mhitm_ad_blnd`: none — the split stands text-exact; the other 12 sites sit in already-p
- D-3215: restart both in C order. Named: - `Gloves_off`: none added — null-gloves graceful clear kept (C dereferences uarmg; siblin
<!-- landmarks:end -->
