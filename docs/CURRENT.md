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
**Next cluster:** `hack.c` test_move — coverage MISSING (C 261 L `hack.c:991–1255` / JS no symbol; hops 2, callers 19, RNG 0, msg 14; split? cited 79× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn test_move` (reach regression must be 0). Measured `port-coverage.mjs --name test_move` 2026-09-18 @ a35f6369.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2439 (index).**
<!-- recent:begin -->
**D-2439** `nethack-c/upstream/src/hack.c:991–1255` (test_move; DO_MOVE/TEST_MOVE/TEST_TRAV/TEST_TRAP — `js/hack.js:302–560` new `export async function test_move(ux, uy, dx, dy, mode)` in C order with per-arm `:line` cites: entry `door_opened=false` on all modes (`:1000`); obstructed/IRONBARS with Blind feel, Passes_walls+
**D-2438** `nethack-c/upstream/src/attrib.c:117–199` (adjattrib); callees `Fixed_abil`, `Your`/`pline — `js/attrib.js` restart of the body in C order with per-arm `:line` cites: old_abase/old_amax snapshot beside old_acurr; abonflg from `u.abon.a[ndx]` (`<0` on gains, `>0` on losses); ACURR-unmoved arm with msgflg==0-exact
**D-2437** `nethack-c/upstream/src/dungeon.c:1205–1319` (init_dungeons); callees `nhl_init`/`nhl_load — `js/dungeon.js` restart in C order: memset/re-zero cited on the pd literal; nhl_init/nhl_loadlua failure panics named omits (generated `dungeon_data.js` embed, D-0477 pattern) keeping the observable nhlib align shuffle; 
**D-2436** `nethack-c/upstream/src/polyself.c:1642–1773` (dogaze); `:1497–1621` (dospinweb); `:1367–1 — `js/polyself.js` only, in C order. dogaze: AT_GAZE mattk scan with AD_CONF/AD_FIRE gate else impossible; Blind/Hallucination/uen<15 gates; uen-=15 + botl; snapshot fmon loop (one visit per monster while killed() unlinks)
**D-2435** `nethack-c/upstream/src/end.c:1130–1590` (`really_done`); achievements `:1173–1183` via `i — `js/end.js` only, in C order — achievements via live `record_achievement` (ACH_BLND/NUDE gated on `uachieved[0]||!beginner`, ACH_UWIN on ASCENDED; gameover-quiet, no RNG/output); `finish_paybill` moved before grave+score
**D-2434** `nethack-c/upstream/src/cmd.c:3958–4119` (`getdir`); callees `movecmd :3868–3898`, `dxdy_m — `js/lock.js` only, in C order — cmdq DIR respects num_pad NDIR/SDIR + dirz `>`/`<`, non-DIR/KEY now `await impossible('getdir: command queue had no dir?')`; retry keeps `getdirInp` + in_doagain-nhgetch, adds short-circui
**D-2433** `nethack-c/upstream/src/mon.c:5278–5535` (`newcham`); `monattk.h` AT_ENGL=11; `trap.c` `ms — `js/makemon.js` only — split the post-`set_mon_data` block into `newcham_light_invis` (`:5399–5412`), `newcham_ustuck` (`:5413–5450`: break-out `You` + mhp 1 + `expels` consuming SHOW_MSG even when msg is FALSE, silent e
**D-2432** `nethack-c/upstream/src/polyself.c:735–1071` (`polymon`); same-file staticfn `check_strang — `js/polyself.js` only — restart of the thin body in C order: entry `sticking`/`wasHidingUnder`/`wasExpelled`/`ustuckNam` locals; first-poly `livelog_printf(LL_CONDUCT)`; `unmul('')` mimic-gold stop; Stoned→`PM_STONE_GOLE
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2439; wrap `wildmiss` /
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
