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
(audit **1674–1682**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`60+0.33/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-20)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `60+0.33/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; totals in table): no movement
this window — the corpus still does not predict the judge.
**Corpus fortress** (re-scored 2026-09-21 audit 1674–1682): **500 / 540
PASS (92.6 %)** excl. 13 env-only; RNG 99.37 %, screens 99.4 % — **+2 / −0**
in the D-2715…D-2727 window (8 ACCEPT + 1 WITH-DEBT; +2 are
scen-poly-Caveman-92202 moved PASS by D-2721 and scen-wish-Healer-92092
moved PASS by D-2720;
every per-SHA `--reach-all` re-run here ends REACH-OK with no REGRESSED).
Reviews 1225–1682: 410 ACCEPT, 18 WITH-DEBT, 1 DEBT, 24 QUALITY-RISK (1503, 1517, 1520 stamped; Must-fix 1533/1536 → D-2583/D-2584, 1568 → D-2610, 1592 → D-2636 `271ceca1`, 1617 → magic_negation floor Must-fix (addressed D-2661, review 1620 ACCEPT); 1654 → sel_set_door wiring Must-fix (addressed D-2697, review 1656 ACCEPT); hashes filled).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending — review-debt, unqueued (detail in the review files).
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
**Next cluster:** `shknam.c` shkname — coverage THIN (C 41 L `shknam.c:856–897` / JS 15 L in js/shknam.js; hops 3, callers 37, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shkname` (reach regression must be 0).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2727 (index).**
<!-- recent:begin -->
**D-2727** `nethack-c/upstream/src/shknam.c:856–897` — `js/shknam.js` only — whole body restarted in C order with C cites inline, stays sync (30+ sync call sites, no signature change): `:859–863` via live `noit_mon_nam` (new `./do_name.js` edge — `imports.mjs --can` SAFE, ho
**D-2726** `nethack-c/upstream/src/sp_lev.c:2193–2440` — `js/mklev.js` — arms added in C order with C cites inline, function stays sync (all four callers sync): recharged/tknown two-liners; CONTENT branch widened with `|| invent_carrying_monster`, monster arm via live `remove_
**D-2725** `nethack-c/upstream/src/allmain.c:854–929` — `js/allmain.js` — whole body restarted in C order with C cites inline: currentgend via live `Upolyd(u)` (`js/const.js:3184`) + `u.mfemale`; `:860` via `l_nhcore_call` (joins the existing static `./do.js` import); doomed 
**D-2724** `nethack-c/upstream/src/end.c:850–903` — `js/end.js` — whole body restarted in C order as `export async function` with C cites inline: `:854` via dynamically-imported `inven_inuse(true)` (imports.mjs end→save is CHECK, lazy like the allmain.js edge); missile ar
**D-2723** `nethack-c/upstream/src/dokick.c:1257–1470` — `js/dokick.js` only — whole body re-ported in C order with C cited inline: boots-99 (`u.uarmf` vs local `KICKING_BOOTS` const); swallow switch with `digests` (`./mhitu.js`, new edge — `imports.mjs --can` IN-SCC/hoisted, 
**D-2722** `nethack-c/upstream/src/dog.c:303–415` — `js/dog.js` only — port the head in C order ahead of the live `:366` block (vote/reset/veto/keep-looping/mydogs-break/`make_happy_shoppers(true)`; `ESHK(mtmp)?.dismiss_kops` nullable per file convention, `mpeaceful|0` in
**D-2721** `nethack-c/upstream/src/do_wear.c:3278–3316` — `js/do_wear.js` only — C-order restart of the whole body: `hits` drawn before the gather/early-return (C `:3282` cited inline), dead null guard dropped; gather order, predicate short-circuit, erode flags, ret/break, stop
**D-2720** `nethack-c/upstream/src/allmain.c:685–699` (`stop_occupation`: `maybe_finished_meal(TRUE)` — `js/hack.js` only — C-order gate (`if (!(await maybe_finished_meal(true)))` around the «stop» pline), then occupation=null, flags.botl + disp.botl (house convention, botl.js:753), nomul(0); `maybe_finished_meal` joins th
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2727; wrap `wildmiss` /
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
