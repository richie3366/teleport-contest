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
(audit **1569–1577**).
Fortress **44/44** (no throws; seed0107 back to 98/98 — D-2610 healed the
D-2609 spacing breach reviewed in 1568).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`58+0.34/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,972 / 11,265 pts, RNG **26.7 %**, rngSteps 81.7 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `58+0.34/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44 (+196 pts / +1.7 pp screens vs last
audit; totals in table): the corpus still does not predict the judge.
**Corpus fortress** (re-scored 2026-09-20 audit 1569–1577): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — **+0 / −0**
in the D-2610…D-2626 window (8 ACCEPTs + 1 WITH-DEBT;
every per-SHA `--reach-all` re-run here ends REACH-OK;
the one public move is seed0107 restored by D-2610).
Reviews 1225–1577: 312 ACCEPT, 14 WITH-DEBT, 1 DEBT, 21 QUALITY-RISK (1503, 1517, 1520 stamped; Must-fix 1533/1536 → D-2583/D-2584, 1568 → D-2610, hashes filled).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`) — review-debt, unqueued (detail in the review files).
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

**PASS (43):** seed8000, seed0900, seed1500, seed1800, seed0060,
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
**Next cluster:** `invent.c` sortloot_cmp (Open MISSING; erosion-words row parked STALE).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2626 (index).**
<!-- recent:begin -->
**D-2626** ``nethack-c/upstream/src/invent.c:403–547`` (sortloot_cmp, staticfn); caller ``:634`` (sor — exported ``sortloot_cmp(sli1, sli2)`` in C order with per-arm ``:line`` cites — INUSE classify-once + bigger-first + indx tiebreak (``:412–428``); PACK|INVLET class gate (``:430–432``), loot_classify-once + orderclass/su
**D-2625** ``nethack-c/upstream/src/cmd.c:5213–5272`` (readchar_core, staticfn) + ``:5159–5181`` (han — ported the whole C body in C order, async only because pgetchar/nhgetch await input — fuzzer arm ``:5217–5220`` via live ``randomkey()``, still landing on the ``input_state=otherInp`` tail; ``readchar_queue`` ``:153`` as
**D-2624** ``nethack-c/upstream/src/trap.c:2013–2067`` (trapeffect_hole, staticfn); callers ``:2964`` — restarted the export in C order with per-arm ``:line`` cites — hero ``:2018–2024`` (seetrap + ``await impossible('dotrap: %ss cannot exist on this level.', trapname(trap.ttyp, true))`` + Finished; else ``fall_through(tru
**D-2623** ``nethack-c/upstream/src/quest.c:282–368`` (chat_with_leader, staticfn); callers ``:390``  — restarted the export in C order with per-arm ``:line`` cites — Rule 0 cheater (``:287–289``, ``u.uhave?.questart`` per zap.js/trap.js precedent, ``qs.met_nemesis``/``qs.cheater`` new quest_status keys); got_thanks Rule 1
**D-2622** ``nethack-c/upstream/src/mkobj.c:3768–3814`` (obj_meld); callers ``do.c:312`` (flooreffect — restarted the export in C order with per-arm ``:line`` cites — ``result = null`` (``:3771``); holder-level ``if (p1 && p2)`` guard (``:3774`` — the ``struct obj **``, not the pointees); pointee ``otmp1 && otmp2 && !==`` 
**D-2621** ``nethack-c/upstream/src/invent.c:308–387`` (loot_xname, staticfn); callers ``:490``/``:49 — ported the whole body in C order with per-arm ``:line`` cites — save odiluted/blessed/cursed/spe/owt + oname + flags.debug (``:320–325``); potion dilute + water holy/unholy suppress (``:328–332``); towel spe=0 (``:335–33
**D-2620** ``nethack-c/upstream/src/cmd.c:4658–4838`` (act_on_act, staticfn) + ``:294–311`` (cmdq_add — ported the whole body in C order with per-arm ``:line`` cites — sgn clamp keeping throw/travel/look deltas raw (``:4666–4677``, live eat.js ``sgn`` ≡ ``hacklib.c:650``); TRAVEL travelcc+u.tx/ty stamp (``:4680–4688``, gam
**D-2619** ``nethack-c/upstream/src/botl.c:2363–2570`` (get_hilite, staticfn) + ``:2333–2344`` (noneo — ported the whole body in C order with per-arm ``:line`` cites — out-of-range early return without touching colorptr (``:2374–2375``); has_hilite macro inlined (``:2377``); best-fit trackers (``:2380–2388``, LARGEST_INT l
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2626; wrap `wildmiss` /
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
