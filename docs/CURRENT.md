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

Score last measured: **2026-09-18** — full `sessions` on the working tree
(audit **1417–1425**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`60+0.47/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `60+0.47/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-18 audit 1417–1425): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 %. The 3
`1d21e3be` getdir flips recovered via D-2440; no new flips across D-2458…D-2472
(every per-SHA re-run: 0 regressed).
Reviews 1225–1425: 179 ACCEPT, 5 WITH-DEBT, 1 DEBT, 11 QUALITY-RISK (0 Must-fix pending).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip (all map-named).
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
**Next cluster:** `files.c` open_levelfile — coverage MISSING (C 43 L `files.c:673–716` / JS no symbol; hops 3, callers 6, RNG 1, msg 0; dead callees: set_levelfile_name, new_nhfile, viable_nhfile). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn open_levelfile` (reach regression must be 0). Measured `port-coverage.mjs --name open_levelfile` 2026-09-18 @ 838c6b6e.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2472 (index).**
<!-- recent:begin -->
**D-2472** `nethack-c/upstream/src/files.c:673–716` (`open_levelfile`); supporting `fqname` `:354–393 — `js/files.js` only, in C order — new `export function fqname` (`:501`: PREFIX branch live, prefixes from `game.gf?.fqn_prefix` (unset → basenam, as C with empty prefixes), buffnum-clamp + too-long `impossible()` arms in 
**D-2471** `nethack-c/upstream/src/pline.c:153–291` (`vpline`); supporting `BIGBUFSZ` `:10–12`, `putm — `js/display.js` only, in C order — new `export async function vpline(fmt, ...args)` (`:7650`): consume-then-format accessiblemsg (`vpline_consume_msg_loc`, D-1207; C's recurse-with-same-va_list is prefix-then-format sinc
**D-2470** `nethack-c/upstream/src/trap.c:2322–2450` (`trapeffect_anti_magic`); sole C caller `trapef — `js/trap.js` only, in C order — module-local `async trapeffect_anti_magic` (`:5128`): iron-shoes `spe>0` drain (same-object fetch via `u.uarmf`/file-local `which_armor` matching `wearing_iron_shoes`; hero-only seetrap + 
**D-2469** `nethack-c/upstream/src/mklev.c:939–1171` (`fill_ordinary_room`); static `mksink` `:2316–2 — `js/mklev.js` only, in C order — `(u.uhave.amulet || !rn2(3))` short-circuit with `makemon` + spider check (`data?.mndx === PM_GIANT_SPIDER`, monmove.js idiom) + occupied-guarded `maketrap(WEB)`; trap loop calls live `mk
**D-2468** `nethack-c/upstream/src/pager.c:1673–1963` (`do_look(mode, click_cc)`); static `suptext1`  — `js/pager.js` only, in C order — `do_look(mode = 0, click_cc = null)` with `quick`/`clicklook` (`:1675–1676`); cmdq pop/`cmdq_clear()` (= CQ_CANNED default, js/cmd.js) with `have_cmdq` tracking the C `goto dowhatiscmd` (
**D-2467** `nethack-c/upstream/src/mklev.c:2410–2497` (`mkinvokearea`); static helpers `mkinvpos` `:2 — `js/mklev.js` only — new `export async function mkinvokearea()` + module-local `mkinvpos`/`mkinvk_check_wall` in C order: shake pline + wall-count loop (`dist!=3` wider-than-high, skip-y-when-x-found, early stop on wallc
**D-2466** `nethack-c/upstream/src/trap.c:6991–7034` (`sink_into_lava`); callers `allmain.c:424–425`, — new `export async function sink_into_lava()` (`js/trap.js:6296`, placed after `lava_effects` in C file order) — whole body in C order: not-trapped no-op (polymorph flier-to-ceiling-hider case); not-on-lava `reset_utrap(F
**D-2465** `nethack-c/upstream/src/eat.c:2510–2600` (`fpostfx`, staticfn); sole caller `done_eating`  — new module-local `async function fpostfx(otmp)` (`js/eat.js:1980`) in C order — `:2513–2516` wolfsbane `you_unwere(TRUE)` (moved verbatim); `:2517–2521` carrot `make_blinded(ucreamed)` unless swallowed-by-blinding-engulf
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2472; wrap `wildmiss` /
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
