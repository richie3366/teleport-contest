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

Score last measured: **2026-09-20** — full `sessions` on the working tree
(audit **1551–1559**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`55+0.36/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,776 / 11,265 pts, RNG **26.6 %**, rngSteps 81.6 %, screens **51.3 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `58+0.33/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44 (5,776 pts, RNG 26.6 %, screens 51.3 %;
judge 18:47Z cached, unchanged 11/44 5,776 pts vs last audit): the corpus still does
not predict the judge.
**Corpus fortress** (re-scored 2026-09-20 audit 1551–1559): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — **+0 / −0**
in the D-2592…D-2605 window (all 9 ports coverage-only; every per-SHA
`--reach-all` re-run here ends REACH-OK with no REGRESSED session).
Reviews 1225–1559: 298 ACCEPT, 11 WITH-DEBT, 1 DEBT, 20 QUALITY-RISK (1503, 1517, 1520 stamped; 1533 + 1536 Must-fix rows shipped as D-2583/D-2584 with `**Addressed:**` hashes filled).
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
**Next cluster:** `eat.c` floorfood — coverage THIN (C 150 L `eat.c:3579–3731` / JS 6 L in js/eat.js; hops —, callers 4, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn floorfood` (reach regression must be 0). Measured `port-coverage.mjs --name floorfood` 2026-09-20 @ d89bb259.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2605 (index).**
<!-- recent:begin -->
**D-2605** `nethack-c/upstream/src/eat.c:3579–3731`. Audited arm-by-arm against the brief: `getobj_el — in C order per loop — `:3688–3691` cockatrice arm (`otyp==CORPSE && will_feel_cockatrice(otmp,FALSE)` → `await feel_cockatrice` + return null, before any question so blind bare-handed probing stays fatal); `:3696–3702` q
**D-2604** `nethack-c/upstream/src/mondata.c:305–398`; callees `resists_blnd` `:247–272` + `resists_b — restarted `can_blnd` in C order with `:line` cites — `:316–317` haseyes, `:320–321` perma-blind, `:327–328` raven-vs-raven (`mons(PM_RAVEN)` identity, gulpmu precedent), `:337–339` light arm (`magr.mcan` + canonical `!re
**D-2603** `nethack-c/upstream/src/rumors.c:640–693`; sole C caller `:755` (`doconsult` — restarted `init_oracles` + `outoracle` in C order with `:line` cites — `:649–650` early return, `:652` embed-open check with the `:689–692` open-failed arm live (`couldnt_open_file(ORACLEFILE)` + `oracle_flg = -1`; unrea
**D-2602** `nethack-c/upstream/src/insight.c:313–358` (staticfn, decl `:25`); sole C caller `:448` (` — new exported `fmt_elapsed_time(final)` (`js/insight.js:182`) in C order with `:line` cites — `:322–325` etim (+ live `timet_delta(getnow(), start_timing)` iff `!final`; game-over path already folded by really_done/end.js
**D-2601** `nethack-c/upstream/src/worn.c:579–712`; callers `steal.c:845`, `steed.c:162`, `trap.c:251 — restarted `update_mon_extrinsics` in C order with `:line` cites — unseen `:591`, early maybe_blocks `:592–593`, again-loop `:595`/`:688–690`, on-switch `:597–632`, off-switch `:634–683` (resistance rescan `:669–679` with
**D-2600** `nethack-c/upstream/src/objnam.c:4727–4899` (staticfn, decl `:59`); sole C caller `:4958`  — new exported `readobjnam_postparse3(d)` in C order with C return codes (0 fall through, 2 typfnd, 6 retry); new `japanese_otyp_by_name` export (case-insensitive `Japanese_items[]` walk) on the existing readobjnam→objnam 
**D-2599** `nethack-c/upstream/src/mail.c:589–680`; callers `mail.c:696` (ck_server_admin_msg adminms — new exported async `read_simplemail(mbox, adminmsg)` (`js/mail.js`) following the SIMPLE_MAIL source-level body in C order with `:line` cites — VFS spool read for `:591` fopen (VFS miss ≡ fopen NULL; Rule #2, fopen_wizki
**D-2598** `nethack-c/upstream/src/mhitm.c:597–640`; callers `mhitm.c:451/485/529` (AT_TUCH eel pre-c — restarted the canonical export in C order with `:line` cites — entry gate (`:605–611`), message gate (`:612–613`), tailmiss snapshot (`:616`), verb (`:617–619`), magrnam (`:624–625`), mdefnam (`:626–632`, live `some_mon_
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2605; wrap `wildmiss` /
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
