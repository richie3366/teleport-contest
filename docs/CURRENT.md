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

Score last measured: **2026-09-21** — full `sessions` on the working tree
(audit **1665–1673**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`58+0.33/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-20)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `72+0.40/turn` (R² 0.72) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; totals in table): no movement
this window — the corpus still does not predict the judge.
**Corpus fortress** (re-scored 2026-09-21 audit 1665–1673): **498 / 540
PASS (92.2 %)** excl. 13 env-only; RNG 99.32 %, screens 99.1 % — **+1 / −0**
in the D-2706…D-2723 window (9 ACCEPT; +1 is scen-normal-Wizard-92127
moved PASS by D-2714;
every per-SHA `--reach-all` re-run here ends REACH-OK with no REGRESSED).
Reviews 1225–1673: 402 ACCEPT, 17 WITH-DEBT, 1 DEBT, 24 QUALITY-RISK (1503, 1517, 1520 stamped; Must-fix 1533/1536 → D-2583/D-2584, 1568 → D-2610, 1592 → D-2636 `271ceca1`, 1617 → magic_negation floor Must-fix (addressed D-2661, review 1620 ACCEPT); 1654 → sel_set_door wiring Must-fix (addressed D-2697, review 1656 ACCEPT); hashes filled).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`) — review-debt, unqueued (detail in the review files).
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage, seed0107-samurai-twoweapon-enhance.

**Notable non-PASS:** none — 44/44 (seed0107 restored to 98/98 by D-2610).

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
**Next cluster:** `dokick.c` dokick — coverage PARTIAL (C 213 L `dokick.c:1257–1470` / JS 141 L in js/dokick.js; hops —, callers 0, RNG 2, msg 15). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dokick` (reach regression must be 0). Measured `port-coverage.mjs --name dokick` 2026-09-21 @ 1204bc94.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2723 (index).**
<!-- recent:begin -->
**D-2723** `nethack-c/upstream/src/dokick.c:1257–1470` — `js/dokick.js` only — whole body re-ported in C order with C cited inline: boots-99 (`u.uarmf` vs local `KICKING_BOOTS` const); swallow switch with `digests` (`./mhitu.js`, new edge — `imports.mjs --can` IN-SCC/hoisted, 
**D-2722** `nethack-c/upstream/src/dog.c:303–415` — `js/dog.js` only — port the head in C order ahead of the live `:366` block (vote/reset/veto/keep-looping/mydogs-break/`make_happy_shoppers(true)`; `ESHK(mtmp)?.dismiss_kops` nullable per file convention, `mpeaceful|0` in
**D-2721** `nethack-c/upstream/src/do_wear.c:3278–3316` — `js/do_wear.js` only — C-order restart of the whole body: `hits` drawn before the gather/early-return (C `:3282` cited inline), dead null guard dropped; gather order, predicate short-circuit, erode flags, ret/break, stop
**D-2720** `nethack-c/upstream/src/allmain.c:685–699` (`stop_occupation`: `maybe_finished_meal(TRUE)` — `js/hack.js` only — C-order gate (`if (!(await maybe_finished_meal(true)))` around the «stop» pline), then occupation=null, flags.botl + disp.botl (house convention, botl.js:753), nomul(0); `maybe_finished_meal` joins th
**D-2719** `nethack-c/upstream/src/makemon.c:986–1007` — `js/makemon.js` only — C-order restart (`let hp = rnd(8)`, `else-if` arm chain, C comments `:993–1004` cited inline); stale «Named omit» doc replaced with the arm/draw contract + caller list.
**D-2718** `nethack-c/upstream/src/uhitm.c:2626–2681` (`mhitm_ad_cold`); mhitu arm `:2654–2667` — `js/mhitu.js` only — discard the return (`await destroy_items(you, AD_COLD, orig_dmg)`, C `:2661` cited inline); doc comment now cites the mhitu arm range and the discarded-return contract.
**D-2717** `nethack-c/upstream/src/uhitm.c:525–534` (`Upolyd && noattacks` → «no way to attack» + `go — `js/uhitm.js` only, in C order — Upolyd + live `noattacks` (`js/hack.js:1211`, C-identical incl.
**D-2716** `nethack-c/upstream/src/mklev.c:1938–1998` (body in C order: `lvl = level_difficulty()`, ` — `js/mklev.js` only — LEVEL_TELEP arm → `lvl < 5 || noteleport || single_level_branch(game.u?.uz)` in C short-circuit order (C `:1961–1965`); FIRE_TRAP arm → live `Inhell()` (C `:1974–1977`); both names join the existing 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2723; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pet movement) and **dog_invent** (both hits are `mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-TOP30.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`.

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence:
Public score cadence above). Journal; divergence + index; one C-JS-MAP
section. No completed D-lists.
