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
(audit **1515–1523**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`74+0.41/turn` (R² 0.75).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,776 / 11,265 pts, RNG **26.6 %**, rngSteps 81.6 %, screens **51.3 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `74+0.41/turn` (R² 0.75) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44 (5,776 pts, RNG 26.6 %, screens 51.3 %;
judge 13:05Z cached, ~D-2555, +23 pts vs last audit): the corpus still does
not predict the judge.
**Corpus fortress** (re-scored 2026-09-19 audit 1515–1523): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — +0 / −0
in the D-2556…D-2571 window (all nine were zero-block coverage rows;
per-SHA `--reach-all` re-runs REACH-OK — dosdoor reached 497/497, rest
smoke — 0 regressed).
Reviews 1225–1523: 264 ACCEPT, 11 WITH-DEBT, 1 DEBT, 18 QUALITY-RISK (1503 Must-fix addressed by D-2547; 1517 strip_newline + 1520 travel_debug Must-fix live, queued first).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem) — review-debt, unqueued (detail in the review files).
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
**Next cluster:** `zap.c` create_polymon — coverage MISSING (C 87 L `zap.c:1546–1633` / JS no symbol; hops 5, callers 1, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_polymon` (reach regression must be 0). Measured `port-coverage.mjs --name create_polymon` 2026-09-19 @ 30fd2ce7.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2571 (index).**
<!-- recent:begin -->
**D-2571** `nethack-c/upstream/src/zap.c:1546–1633` (`create_polymon`, staticfn; decl `:19`; sole C c — `js/zap.js` — new file-local async `create_polymon(obj, okind)` (C staticfn → file-local like `bhit_skiprange`) in C order with `:line` cites; `G_GENOD` joins the existing const.js import + `a_monnam` joins the existing 
**D-2570** `nethack-c/upstream/src/shknam.c:628–692` (`shkinit`, staticfn; decl `:17`; sole C caller  — `js/shknam.js` — restarted `shkinit` in C order with `:line` cites: `set_malign` joins the existing makemon.js import + `mon_learns_traps` joins the existing monsters.js import + `ALL_TRAPS` joins the existing const.js i
**D-2569** `nethack-c/upstream/src/mkroom.c:95–216` (`mkshop`, staticfn; decl `:23`; sole C caller `d — `js/mklev.js` — restarted `mkshop` in C order with `:line` cites: `wizard` const (`flags.debug`/`flags.wizard`, pick_room precedent); `ep = null` with the `nh_getenv("SHOPTYPE")` named-omit comment (no environment in sco
**D-2568** `nethack-c/upstream/src/objnam.c:4666–4724` (`readobjnam_postparse2`, staticfn; decl `:58` — `js/readobjnam.js` — `O_RANGES` (`:1006`, C order, indices resolved once like `ALT_SPELLINGS_RESOLVED`) + `FIRST/LAST/NUM_GLASS_GEMS` (`:1029–1031`, 9 contiguous, mhitm.js precedent) + exported `readobjnam_postparse2` (`
**D-2567** `nethack-c/upstream/src/engrave.c:407–457` (`make_engr_at`, extern via extern.h:1016, s NO — `js/engrave.js` — restarted `make_engr_at` in C order with `:line` cites: smem/havepristine block, replace-at (del_engr no-ops on null, matching the `!= 0` guard), record literal with `engr_szeach: smem` + `engr_alloc: s
**D-2566** `nethack-c/upstream/include/optlist.h:794–796` non-DEBUG arm `NHOPTB(travel_debug, Advance — `js/options.js` — add `'travel_debug'` after `'traps'` (64 names).
**D-2565** `nethack-c/upstream/src/hacklib.c:179–190` (`strip_newline`, extern via hacklib.h:22): `st — `js/pager.js` — return `str.slice(0, end)` (tail dropped, C `*p = '\0'`); kept in pager.js (sole in-tree caller is `doextversion`), now `export`ed for the unit test (C is extern, so export matches the linkage better than
**D-2564** `nethack-c/upstream/src/insight.c:468–722` (`background_enlightenment`, staticfn) in C ord — `js/invent.js` — `Is_bigroom` joins the existing const.js import (ALREADY-edge, no new module); `background_dungeon_clause` gains `else if (Is_bigroom && !Blind)` in C position (doc un-names it); final builder gains the 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2571; wrap `wildmiss` /
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
