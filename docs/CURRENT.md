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
(audit **1604–1612**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`86+0.61/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-20)** | **11 / 44**, 5,972 / 11,265 pts, RNG **26.7 %**, rngSteps 81.7 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `86+0.61/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44, unchanged vs last audit (5,972 pts, RNG
26.7 %, screens 53.0 %; totals in table): the corpus still does not
predict the judge.
**Corpus fortress** (re-scored 2026-09-20 audit 1604–1612): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — **+0 / −0**
in the D-2645…D-2658 window (8 ACCEPTs + 1 WITH-DEBT;
every per-SHA `--reach-all` re-run here ends REACH-OK with no REGRESSED).
Reviews 1225–1612: 345 ACCEPT, 15 WITH-DEBT, 1 DEBT, 22 QUALITY-RISK (1503, 1517, 1520 stamped; Must-fix 1533/1536 → D-2583/D-2584, 1568 → D-2610, 1592 → D-2636 `271ceca1`; hashes filled).
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
**Next cluster:** `mhitu.c` magic_negation — coverage MISSING (C 48 L `mhitu.c:1089–1137` / JS no symbol; hops 6, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn magic_negation` (reach regression must be 0). Measured `port-coverage.mjs --name magic_negation` 2026-09-20 @ a9b0ff62.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2658 (index).**
<!-- recent:begin -->
**D-2658** ``nethack-c/upstream/src/mhitu.c:1089–1137`` (magic_negation) + callee ``artifact.c:697–70 — new exported ``magic_negation(mon)`` (``js/mhitm.js:2412``) in C order with per-arm ``:line`` cites — null (JS hero-defender idiom) or ``game.youmonst`` takes the is_you path, else the mon path with ``monsndx(mon.data) =
**D-2657** ``nethack-c/upstream/src/uhitm.c:3729–3774`` — hoisted negated above hitmsg in C order with ``|| !!mtmp.mspec_used``; ``You("aren't transformed.")`` via same-module display.js import (output-identical); per-arm ``:line`` cites on both bodies.
**D-2656** ``nethack-c/upstream/src/dothrow.c:1852–1909`` (return_throw_to_inv, staticfn) + callers ` — ported the missing arm in C order with per-arm ``:line`` cites — ``otmp = null`` ``:1862``; parent/child oid gate on live ``game.context.objsplit`` (``mkobj.js:431`` writer, ``:463`` ctx); where-gate relink (C chain-prep
**D-2655** ``nethack-c/upstream/src/mondata.c:771–871`` (same_race) + caller ``dog.c:1080–1083`` (dog — restarted the export in C order with per-arm ``:line`` cites — letters ``:773`` up front (null guard stays first, JS-only, C takes NONNULLARG12); exact ``:775–776`` (``pm1 === pm2`` + mndx equality for fresh mons() wrapp
**D-2654** ``nethack-c/upstream/src/mkobj.c:3374–3416`` (check_contained; staticfn decl ``:26``) + ca — exported ``async check_contained`` in C order with per-arm ``:line`` cites — ``Has_contents`` joins the const.js import (same-module edge, live const.js:3191); ``strstri``/``impossible`` already imported; ``OFMT0_SANITY`
**D-2653** ``nethack-c/upstream/src/date.c:52–131`` (populate_nomakedefs) + caller ``mdlib.c:842`` (r — new C-home `js/date.js` in C order with per-arm `:line` cites — file-local `extract_field` (`:44–49`), `case_insensitive_comp`, `md_ignored_features` (`(1<<19)|SFCTOOL_BIT`, live const.js import), `bannerc_string` (C out
**D-2652** ``nethack-c/upstream/src/earlyarg.c:404–441`` (scores_only; ATTRNORETURN staticfn) + calle — new C-home ``js/earlyarg.js`` (Constitution §3.1 1:1) in C order with per-arm ``:line`` cites — exported ``async scores_only(argc, argv, dir)`` (async only because live ``prscore`` must be awaited; C ATTRNORETURN unrepre
**D-2651** ``nethack-c/upstream/src/options.c:2052–2074`` (shared_menu_optfn; staticfn decl ``:362``) — C-home ``js/options.js`` in C order with per-arm ``:line`` cites — exported ``shared_menu_optfn`` (do_init no-op, do_set resolve-then-delegate, get_val ``to_be_done``, get_cnf_val clear); file-local ``check_misc_menu_com
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2658; wrap `wildmiss` /
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
