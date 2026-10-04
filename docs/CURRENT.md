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

Score last measured: **2026-10-04** — full `sessions` on `952e46e04`
(audit **2354–2362**, 2026-10-04T12:37:22.482Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`336+1.67/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-04 09:00Z; fetched 2026-10-04 09:27Z)** | **15 / 44**, 7,042 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `336+1.67/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo passes on pts with 17/44); best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit (judge scored 09:00Z, after D-3400..D-3407 but before D-3408; pts 7044→7042 noise, count unchanged).
**Corpus fortress (2026-10-04 12:43Z; scored 953/953 entries, 0 unrecorded):**
**733 / 953** PASS (76.9 %), RNG 98.39 %, screens 93.9 %; 0 losses, +2 (94093, 94410); `full: true`, `fullAt: 2026-10-04T12:43:15.194Z`.
Reviews 1225–2362 (index; no row 1618): 989 ACCEPT, 52 WITH-DEBT, 96 QUALITY-RISK (2354–2362: 3A/1D/5Q → 9 Must-fix: 2355 canseemon+mons ×2, 2356 repair, 2358 uinwater+omits ×2, 2359 clone+ledger ×2, 2361 14-row certs, 2362 4-row homes).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued); 2333 doapply omit paste-error + 2336 nhclose/nh_compress/nh_uncompress omit paste-errors + 2343.1 showdamage stale MISSING note + 2344.2 savebones stale compress clause + 2345.1 free_ebones stale MISSING note (finish-iteration recording bug — one `ledger.mjs set` iter fixes all seven; sweep candidates spot_checks/cinv_ansimpleoname notes + dump_weights omit); 2347.1 repopulate PERMINV reassign (inherited D-1559 split gap, latent, unqueued); 2350.1 redraw_cmd comment bind-history (docs-only, unqueued).
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

**Port the game as completely as possible, one batch per iteration** —
the `node scripts/ledger.mjs batch --write` manifest: the whole remaining
gap of the top C file(s), 40–100 whole functions (2026-10-03, ten times
the 2026-09-28 cluster).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @3a47d2089: 5329 pinned-C functions — ported 4369 · partial 258 · split 160 · by-design 403 · open 139 (678 declared by seed). Measured: ok 3884, partial 672, thin 236, missing 537. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the batch manifest
(`docs/LEDGER.md`). Per manifest function the **entire C body** in C
order — every arm, callee live or named, C caller wired; already whole →
`audited`; unfinishable → `Left open:` + blocker (caps 15000 ins / 80
files, 4 h). `finish-iteration` fails closed unless `Ledger:` + `Left
open:` cover the manifest and every new JS body under a C name. Restart
beats patching arms. Gates: syntax · Rule #2 · green + strict · cohort ·
full 44 when shared · **REACH-OK** per function (`verify.mjs --fn a,b,…`;
over 10: one ~70 s corpus sweep). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier:** held-out (`leaderboard.mjs`) flat after ~30 breadth
iterations → human revisits the picker.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3415 (index).**
<!-- recent:begin -->
**D-3415** row homes only (bodies verified whole by review 2358; each sub-omit re-verified still unsh — `ledger.mjs set` ×3 to the D-3404 Named omissions text (verified each sub-omit first: test_move ECMD_OK/cmdq — lock.js:868 doopen_indir returns bool, cmdq_peek cmd.js:399-local, hack.js:552–553 comment; defsyms prose — h
**D-3414** - `swim_move_danger`: hack.c:1890 — flipped each site to `(u.uinwater | 0)` (D-3400 idiom) with a C-line cite after verifying its C locus says Underwater — all 12 do (loci above).
**D-3413** row home only: switch_symbols by-design → partial (live since D-3405, TRUE arm exact) + omit map.
**D-3412** - `the_unique_pm`: objnam.c:1120–1140 — deleted the clone; extended the existing objnam.js import (ALREADY-imported per `imports.mjs --can eat.js objnam.js the_unique_pm`, no new edge) with `the_unique_pm`; removed the now-unused PM_HIGH_CLERIC/PM_LONG_WORM_TA
**D-3411** row homes only (no C re-read; bodies verified whole by review 2361): mon.c `sanity_check_s — `ledger.mjs set` ×14 (verified each claim first: `replmon` js/mon.js:3714 is async over live `relmon` with the :2703 unstuck inside `mon_leaving_level` js/mon.js:2105/:2124; `hmon_hitmon_potion` calls `setuwep(null)` at 
**D-3410** - `m_initgrp`: makemon.c:79–145 — Group-member appear drain via primary-tagged queue (js/makemon.js:3270/:3844).
**D-3409** row homes only (no C re-read; bodies verified whole by review 2362): makemon.c `m_initgrp` — `ledger.mjs set` ×4 (verified each claim first: `m_initgrp` js/makemon.js:3260 emits no group-member Noreps and is sync; `m_dowear(mtmp, true)` fire-and-forget at js/makemon.js:3744 under a sync-gen comment; `newmextra` 
**D-3408** - `oselect`: weapon.c:490–491 — ported the 38 bodies/arms above in C order with live-export imports (no new generated tables); audited 40 + 20 split rows whole (bodies verified, callers mapped, omits retired as stale/compiled-out/paste-error/by-design)
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3415; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** next Must-fix (D-3407 14-row certs, review 2361).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
