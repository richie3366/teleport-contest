# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS; the **Held-out** row from `node scripts/leaderboard.mjs`;
the corpus fortress from `hidden-proxy.mjs score` (PASS→FAIL = Must-fix
row naming the SHA). Do not invent suite totals from one focused session.

Score last measured: **2026-10-01** — full `sessions` on `f41c159c9`
(audit **2176–2184**, 2026-10-01T13:55:02.149Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`341+1.59/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-01 13:15Z; fetched 2026-10-01)** | **14 / 44**, 7,020 / 11,265 pts, RNG **33.8 %**, rngSteps 87.5 %, screens **62.3 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `341+1.59/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 35/44. Held-out 14/44, +1 pt since 07:09Z.
**Corpus fortress (2026-10-01 14:00Z; scored 953/953 entries, 0 unrecorded):**
**671 / 953** PASS (70.4 %), RNG 97.01 %, screens 91.6 %; 0 PASS losses, +5 (scen-trap Archaeologist/Barbarian/Monk/Priest/Ranger, ex-getdir screen @72/@22 — D-3219 doidtrap `^` wiring); `full: true`, `fullAt: 2026-10-01T14:00:44.754Z`.
Reviews 1225–2184 (index; no row 1618): 831 ACCEPT, 44 WITH-DEBT, 84 QUALITY-RISK (2176–2184: 7 accept/1 debt/1Q; 1 Must-fix family).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued).
Audit iters (mandatory, 2026-09-28): full scoreboard update —
`hidden-proxy.mjs record --jobs 8` then unfiltered `hidden-proxy.mjs score
--jobs 8` (≈270 s), committed with `full: true` — + `leaderboard.mjs`.
`record` needs the C recorder (`bash nethack-c/build-recorder.sh`; Linux:
clang, bison, flex, ncompress); `.cache` recordings take ≈45 s to rebuild.

**PASS (44):** seed0002-healer-reflection-drummer, seed0004-feeding-pony,
seed0006-wizard-water-demon, seed0007-rogue-snake-swamp, seed0009-swimmer-mforce,
seed0012-monk-vault-escort, seed0013-friday13-save-then-fullmoon-restore,
seed0013-rogue-friday13-combat, seed0014-dequa-fountain-explore,
seed0015-valk-level2-pit-dog-wait, seed0016-healer-newmoon-eat-zap,
seed0017-samurai-altar-pray, seed0030-ten-diverse-deaths,
seed0060-orc-rogue-kick-search, seed0077-rogue-chargen,
seed0101-ranger-quiver-throw-travel-engrave, seed0102-ranger-name-cancel,
seed0103-knight-ride-pony, seed0104-knight-ride-combat,
seed0105-valk-chat-lamp-ration, seed0106-priest-extcmd-sweep,
seed0107-samurai-twoweapon-enhance, seed0108-wizard-extcmd-wishlist,
seed0116-wizard-wear-shop, seed0200-monk-north-search,
seed0360-wizard-world-tour, seed0361-archeologist-tour,
seed0367-priest-quest-tour, seed0373-barbarian-quest-tour,
seed0383-wizard-hallucinate, seed0398-wizard-wandpoly-pile,
seed0399-wizard-hallu-actions, seed0501-priest-cast-read-turn,
seed0700-samurai-explore-descend, seed0900-tourist-explore-actions,
seed1150-caveman-explore-move, seed1500-rogue-explore-move,
seed1800-tourist-eat-throw, seed2200-wizard-quaff-zap-read,
seed2600-wizard-custom-binds, seed4500-knight-coverage,
seed5002-wizard-coverage-pair, seed5006-tourist-stress-disaster,
seed8000-tourist-starter.

**Notable non-PASS:** none — 44/44.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective — BREADTH PHASE (opened 2026-09-18, Constitution §10.17)

**Port the game as completely as possible, one cluster per iteration** —
up to 10 whole C functions of one C file or caller/callee closure
(2026-09-28).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @17380c7c9: 5329 pinned-C functions — ported 1244 · partial 246 · split 103 · by-design 359 · open 3377 (863 declared by seed). Measured: ok 3689, partial 659, thin 237, missing 744. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
The work picker is **measured coverage + the ledger**, not the corpus: pop
`LOOP-QUEUE.md` Must-fix, then the first row of the generated **Open —
coverage** block (`docs/LEDGER.md`; the pop-time `brief.mjs` re-check
decides stale in ≤ 3 calls → `ledger.mjs set <fn> ported --note "stale: …"`).
Deliverable = for each function of the cluster, the **entire C body** in
C order — every arm, every callee live or named in the map, every C caller
wired (brief callers table) — **200–800 lines** of C-faithful JS for the
cluster (supervisor caps 1500 ins / 15 files). Grow the cluster from the
head row: its Open callees, then Open rows of the **same C file**. A
Must-fix ships alone. Subsystem restart (delete the thin JS function,
re-port from C) beats patching arms. Gates unchanged: syntax · Rule #2 ·
green + strict · cohort · full 44 when shared · **REACH-OK** per function
(corpus sessions that executed it still PASS — `verify.mjs --fn a,b,c`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier:** held-out (`leaderboard.mjs`) flat after ~30 breadth
iterations → human revisits the picker.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3225 (index).**
<!-- recent:begin -->
**D-3225** - `save_light_sources`: `light.c:454–459` (default arm: `is_global = 0` + `impossible("sav — `js/mkobj.js` — `const badType = t !== LS_OBJECT && t !== LS_MONSTER; const is_local = (!ls.id || badType) ? true : light_is_local(ls)` (review's one-line fix); comment corrected (fallthrough is global; both no-id and ba
**D-3224** - `save_light_sources`: `light.c:421–471` (discard_flashes `:427`, vision_full_recalc `:43 — `js/lev_json.js` — snapshotGlobalLights/snapshotLocalLights run discard_flashes() + vision_full_recalc = 0 (C `:427–432`) then the shared maybe_write_ls(RANGE_*, ls => push serLight) selector (C `:434–436`; snapshot*Time
**D-3223** - `set_artifact_intrinsic`: `artifact.c:788–796` (SPFX_HALRES → `make_hallucinated(!on, !r — `js/artifact.js` — HALRES arm rewritten in C order (flip + re-mirror + refresh).
**D-3222** - `get_changed_key_binds`: `nethack-c/upstream/src/cmd.c:2235–2287` whole — port the `:2253–2257` arm in C order: `((ext.flags | 0) & CMD_PARAM) !== 0` → ``BIND=${key2txt(key)}:${ext.txt}(${bind_param_get(key) ?? ''})``.
**D-3221** `nethack-c/upstream/src/sp_lev.c:1925–2187` whole — `js/mklev.js` — named-id branch gains the :1949–1953 geno arms (`game.mvitals[mid].mvflags`, `pm.geno & G_UNIQ`; mid kept for the :1985 mk_mplayer dispatch like C's m->id); class branch uses the canonical `DEF_CHAR_TO_ML
**D-3220** - `mhitm_adtyping`: `nethack-c/upstream/src/uhitm.c:4782–4832` switch whole — `js/uhitm.js` — damageum_adtyping +3 arms in file style (C-ref comments): AD_FAMN routes to shared `mhitm_ad_famn(game.youmonst,…)` (C's goto; the arm voids magr); AD_DGST/AD_HALU inline `mhm.damage = 0` (SAMU precedent 
**D-3219** - `trapped_chest_at`: `nethack-c/upstream/src/detect.c:139–177` whole — `js/pager.js` — new `doidtrap` export in C order: `getdir` from lock.js (`imports.mjs --can pager.js lock.js getdir` SAFE, hoisted); `ECMD_CANCEL`/`TRAPPED_DOOR`/`TRAPPED_CHEST`/`HOLE`/`PIT`/`ROCKTRAP`/`is_hole` extend t
**D-3218** `nethack-c/upstream/src/dothrow.c` `hurtle_step :772–972` whole — `js/dothrow.js` only — restarted hurtle_step in exact C order, same export name/signature: `via_jumping = (EWwalking & I_SPECIAL)`, `stopping_short = via_jumping && range < 2`; `!Passes_walls_prop() || !(may_pass = may_p
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3225; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** Must-fix: save_light_sources peel bad-type classification (review 2184, D-3224 follow-up).

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
