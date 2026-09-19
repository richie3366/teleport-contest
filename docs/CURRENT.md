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

Score last measured: **2026-09-19** — full `sessions` on the working tree
(audit **1453–1461**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`50+0.30/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `42+0.56/turn` (R² 0.92) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-19 audit 1453–1461): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 % — identical
to the prior audit, no flips across D-2494…D-2504 (every per-SHA re-run:
0 regressed; recharge reach 3/3, rest vacuous 0-blocked + smoke 24/24).
Reviews 1225–1461: 208 ACCEPT, 9 WITH-DEBT, 1 DEBT, 14 QUALITY-RISK (0 Must-fix pending).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph (display.h:842–844 vs display.js:849), 1448 safe_typename guard (objnam.c:316) — review-debt, unqueued.
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

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

**Port the game as completely as possible, one whole C function per
iteration.** 2,345 of 4,868 pinned-C functions are MISSING or THIN in
`js/` (`node scripts/port-coverage.mjs`); every held-out session that
reaches one is a cliff. The work picker is **measured coverage**, not the
corpus: pop `LOOP-QUEUE.md` Must-fix, then the first **Open — coverage**
row (emitted by `port-coverage.mjs --rows`, gap measured on the JS tree at
enqueue; the pop-time `brief.mjs` re-check decides stale in ≤ 3 calls).
Deliverable = the **entire C body** in C order — every arm, every callee
live or named in the map, every C caller wired (brief callers table) —
**200–800 lines** of C-faithful JS (supervisor caps 1500 ins / 15 files).
Subsystem restart (delete the thin JS function, re-port from C) beats
patching arms. Also ship, in the same iteration, any Must-fix/Open row in
the **same C file**. Gates unchanged: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **REACH-OK** (corpus sessions that executed
the function still PASS — `verify.mjs --fn`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier for the phase:** held-out on `leaderboard.mjs` after ~30
breadth iterations; if it does not move while coverage does, the human
revisits the picker.
**Next cluster:** `teleport.c` rloc_to_core — coverage MISSING (C 120 L `teleport.c:1645–1768` / JS no symbol; hops 2, callers 4, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rloc_to_core` (reach regression must be 0). (make_blinded STALE-parked, really_done dropped as dupe of its STALE park — both bodies + callers live, 0 blocked.)
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2504 (index).**
<!-- recent:begin -->
**D-2504** `nethack-c/upstream/src/teleport.c:1644–1768` (`rloc_to_core`, staticfn); callers `:1771–1 — `js/teleport.js` only, no new module edges — new `export async function rloc_to_core(mtmp, x, y, rlocflags)` composing the live helpers in C order (same-cell `:1658–1659` return first so no vanish prints; pre `:1661–1677
**D-2503** `nethack-c/upstream/src/muse.c:59–160` (`precheck`, staticfn); C callers `:805` (`use_defe — restarted `precheck` in C order with `:line` cites.
**D-2502** `nethack-c/upstream/src/trap.c:2106–2276` (`trapeffect_web`); sole C caller `trap.c:2972`  — restarted `trapeffect_web` in C order.
**D-2501** `nethack-c/upstream/src/mkmaze.c:1539–1685` (`movebubbles`); `ball.c:181–189` (`check_rest — `js/ball.js` — new module-local `check_restriction` (literal `:181–189` mirror; `game.bcrestriction` holds the C static, init 0; override -1 per `hack.h:110`) + `export async function unplacebc_and_covet_placebc` (`rnd(4
**D-2500** `nethack-c/upstream/src/read.c:729–1008` (`recharge`) + staticfns `stripspe :651–664`, `p_ — `js/read.js` only, no new module edges (`imports.mjs --can` ALREADY on all five): `You`/`Your` (display), `Tobjnam` (objnam), `useup as useup_live` (invent), `Ring_gone`/`Ring_off`/`Ring_on` (do_wear), `end_burn` (timeou
**D-2499** `mon.c:1392–1453` (`m_consume_obj`); `:1352–1381` (`meatbox`); `:1384–1386` (`mstoning` ma — `js/mon.js` — new `export async function meatbox` in C order (`:1356` cube-engulf test, `:1363–1367` spill pline, `:1368–1379` head-first unwrap with ICE_BOX `removed_from_icebox`, engulf `mpickobj`, else `flooreffects`→
**D-2498** `nethack-c/upstream/src/botl.c:1621–1680` (`evaluate_and_notify_windowport`); static calle — new `js/botl.js` (~470 L) in C order with `:line` cites — `initblstats[]` (27 rows verbatim), `init_blstats` (dual buffers on `game.gb`, zeroed unions, val alloc as `''`/null, thresholds keep-chain, double-init guard kee
**D-2497** `nethack-c/upstream/src/objnam.c:1223–1751` (`doname_base`); flags `:1217–1219` (WITH_PRIC — `js/objnam.js` — `doname` → `doname_base(obj, flags)` (existing body kept, arms in C order) + `DONAME_*` exports + `doname_vague_quan` wrapper; override_ID five-flag force `:1255`; vague `"some "` `:1283`; BoT/HoP `spe==
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2504; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

The full index is `LOOP-QUEUE.md` **Parked** (one line each; proofs in
`docs/archive/LOOP-QUEUE-PARKED.md`). Two never re-pop without C state:

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-TOP30.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
