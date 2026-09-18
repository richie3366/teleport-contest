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

Score last measured: **2026-09-16** — full `sessions` on the working tree
(audit **1386–1390**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-17)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.29/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-16 audit
1386–1390): **495 / 540 PASS (91.7 %)** excl. 13 env-only rows; RNG 99.3 %;
screens 99.0 %. Remaining owners: `distfleeck` ×4, `do_statusline2` ×4,
1-block singles — all parked symptom owners needing C instrumentation
(phase 2). A PASS→FAIL on re-score is a Must-fix row naming the SHA.
Reviews 1225–1390: 151 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 6 QUALITY-RISK (all Must-fix shipped).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx (both map notes).
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
**Next cluster:** `polyself.c` polymon — coverage PARTIAL (C 336 L `polyself.c:735–1071` / JS 201 L in js/polyself.js; hops 2, callers 26, RNG 7, msg 27; dead callees: check_strangling). Port the whole C body in C order. Verify `node scripts/verify.mjs --fn polymon`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2432 (index).**
<!-- recent:begin -->
**D-2432** `nethack-c/upstream/src/polyself.c:735–1071` (`polymon`); same-file staticfn `check_strang — `js/polyself.js` only — restart of the thin body in C order: entry `sticking`/`wasHidingUnder`/`wasExpelled`/`ustuckNam` locals; first-poly `livelog_printf(LL_CONDUCT)`; `unmul('')` mimic-gold stop; Stoned→`PM_STONE_GOLE
**D-2431** `trap.c:1797–1806` (`trapeffect_fire_trap` monster branch: xtradmg subtraction and the AD_ — `js/trap.js` only — subtract + AD_FIRE monkilled nested under the existing `(mhp|0)>0` check in C order (`:1800–1806` comment); `trapeffect_fire_trap` exported (C `staticfn`, test pin per D-2416 precedent).
**D-2430** `nethack-c/upstream/src/cmd.c:4115–4116` (`if (!u.dz) confdir(FALSE)` inside `getdir`, aft — `js/lock.js` only for the locus — tail `if (!(u.dz | 0)) confdir(false)` in C order at both exits (self + normal); `confdir` was already imported (no new edge).
**D-2429** `nethack-c/upstream/src/mklev.c:2135–2144` victim gate (`lvl <= (unsigned) rnd(4)` at `:21 — `js/mklev.js` only — capture `ttmp` and call `mktrap_seen_victim(ttmp, {})` (exact: not-WEB so spider flag moot, seen/novictim false per the string+coord defaults) in both blocks with a C-order comment; intentionally min
**D-2428** `nethack-c/upstream/src/monmove.c:2365–2371` `can_fog` (fog-cloud `mvitals` not `G_GENOD`  — `js/monmove.js` — `function can_fog` → `export function can_fog` (hoisted declaration, no TDZ risk); `js/mon.js` — `can_fog` added to the existing static `./monmove.js` import (`imports.mjs --can` → ALREADY, no new edge)
**D-2427** `nethack-c/upstream/src/mkmaze.c:1873–1925` `mk_bubble` ends with `mv_bubble(b, 0, 0, TRUE — `js/mklev.js` only — `dx`/`dy` → `let`; inside the existing `!Is_airlevel || !rn2(6)` gate (same RNG shape: water draws nothing new, air keeps its single `rn2(6)`), compute `colli` from `(bx,by)` vs `(gbxmin,gbymin,gbxma
**D-2423** `nethack-c/upstream/src/insight.c` attributes_enlightenment — arms ported in C order on both builders — final `enlightenment()` (past tense via `final`, `you_are`/`enlght_line_txt` directly) and `doattributes()` ^X (in-progress tense via `o()` wrapper; C `!final` arms read `polymor
**D-2422** `nethack-c/upstream/src/mkobj.c` weight() `:1932–1934` — the three divisor arms in C order (cursed first, C ternary short-circuit; `Math.trunc` for the round-up divisions) + a module-level `BAG_OF_HOLDING` const via `objectNames.indexOf` (same shape as `STATUE`); doc header no
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2432; wrap `wildmiss` /
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
