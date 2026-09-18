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
(audit **1391–1398**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`65+0.41/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `65+0.41/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-18 audit 1391–1398): **492 / 540
PASS (91.1 %)** excl. 13 env-only; RNG 99.28 %, screens 98.9 %. Down from
495/540: 3 PASS→FAIL bisected to `1d21e3be` getdir (Must-fix, Next cluster).
Reviews 1225–1398: 156 ACCEPT, 4 WITH-DEBT, 1 DEBT, 8 QUALITY-RISK (3 Must-fix pending).
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
**Next cluster:** `pager.c` do_screen_description — coverage MISSING (C 376 L `pager.c:1247–1627` / JS no symbol; hops 1, callers 5, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_screen_description` (reach regression must be 0). Measured `port-coverage.mjs --name do_screen_description` 2026-09-18 @ e6289b5b.
**Prev cluster:** `insight.c` mstatusline — coverage THIN (C 123 L `insight.c:3275–3398` / JS 24 L in js/insight.js; hops 3, callers 8, RNG 1, msg 22; dead callees: wseg_at). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mstatusline` (reach regression must be 0). Measured `port-coverage.mjs --name mstatusline` 2026-09-18 @ e6289b5b.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2447 (index).**
<!-- recent:begin -->
**D-2447** `nethack-c/upstream/src/pager.c:1247–1627` (do_screen_description); showsyms machinery `sy — `js/pager.js` restart in C order — restricted vision (`:1291–1305`), x_str (`:1307–1325`), check_monsters incl `@`-as-you (`:1327–1354`), objects with boulder/statue split + venom skip (`:1356–1404`), DEF_INVISIBLE (`:14
**D-2446** `nethack-c/upstream/src/insight.c:3275–3398` (mstatusline); helpers `worm.c:946–966` wseg_ — `js/insight.js` restart in C order — `mon_aligntyp` fixed to EPRI shralign / EMIN min_align / data.maligntyp with A_NONE passthrough (`:3277`); tame + `wizardMode()` count and EDOG hungry/apport unless isminion (`:3281–3
**D-2445** `nethack-c/upstream/src/pager.c:422–555` (look_at_monster, staticfn); callee `do_name.c:15 — `js/pager.js` restart in C order — new `export function look_at_monster(mtmp, x, y)` returning `{ buf, monbuf }`: accurate gate (`:429`); coyote `data.mndx === PM_COYOTE && accurate ? coyotename : distant_monnam(ARTICLE_
**D-2444** `nethack-c/upstream/src/mon.c:3477–3740` (xkilled); callees `mon.c:4527` iter_mons + `:307 — `js/uhitm.js` restart in C order — sad_feeling save/clear; conduct; kill message; pit `t_at`+`is_pit` with `sobj_at(BOULDER)` nocorpse / `m_carrying(BOULDER)` bury; tame `EDOG.killed_by_u`; engulfer missile via live `mpi
**D-2443** `nethack-c/upstream/src/pager.c:829–1129` (checkfile, staticfn); callees lcase/strstri/cop — `js/pager.js` only — `checkfile_dbase_str` (`:867–935` all strips with C else-if chains), `checkfile_split_names` (`:944–976` incl. live supplemental_name fill from original-case inp), `checkfile_alt_for` (fruit → `slime
**D-2442** `nethack-c/upstream/src/polyself.c:1497–1621` (dospinweb PIT arm `bury_objs(x, y)` after ` — `js/polyself.js:89` only — added `bury_objs` to the existing `./dig.js` import.
**D-2441** `nethack-c/upstream/src/polyself.c:1642–1773` (dogaze; `setmangry(mtmp, TRUE)` after the p — `js/polyself.js:38` only — added `setmangry` to the existing `./mon.js` import.
**D-2440** `nethack-c/upstream/src/cmd.c:3956–4119` (getdir `:4095` `else if (!(is_mov = movecmd(dirs — `js/lock.js` only — deleted the `if (!applied) { u.dz = 0; }` block.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2447; wrap `wildmiss` /
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
