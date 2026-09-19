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
(audit **1471–1479**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`50+0.31/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,648 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `49+0.30/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out flat 11/44 (+11 pts, +0.1 screens) over the
breadth-phase window while the local corpus holds 91.7 %: the corpus
still does not predict the judge.
**Corpus fortress** (re-scored 2026-09-19 audit 1471–1479): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — +2 PASS
in the D-2512…D-2525 window (Valkyrie-92200, Samurai-92018), 0 regressed
(per-SHA re-runs; D-2516: Valkyrie-92162 129 → 144, full RNG).
Reviews 1225–1479: 224 ACCEPT, 10 WITH-DEBT, 1 DEBT, 15 QUALITY-RISK (Must-fix: none — 1465 trio shipped D-2512).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone — review-debt, unqueued (detail in the review files).
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
**Next cluster:** `objnam.c` vtense — coverage THIN (C 90 L `objnam.c:2563–2653` / JS 27 L in js/objnam.js; hops 2, callers 87, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn vtense` (reach regression must be 0). Measured `port-coverage.mjs --name vtense` 2026-09-19 @ 7b5fbce5.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2525 (index).**
<!-- recent:begin -->
**D-2525** `nethack-c/upstream/src/objnam.c:2563–2653` (`vtense`). Callees: `nextobuf` (return buffer — `js/objnam.js` — restarted `vtense` in C order with `:line` cites: `:2581–2582` a/an prefix (NUL-short-safe); `:2583–2593` marker scan (first-space walk, break on first marker, index-0 guard); `:2594–2596` head fallback;
**D-2524** `nethack-c/upstream/src/sounds.c:1257–1409` (`dochat`). Callees: `is_silent` (`:1262`, mon — `js/sounds.js` — restarted `dochat` in C order with `:line` cites: `:1262–1278` four gates; `:1280–1290` shop arm (`shop_object` + `price_quote`, `ECMD_TIME`); `:1292–1325` getdir/steed/dz/self; `:1330–1369` isok + statu
**D-2523** `nethack-c/upstream/src/do.c:665–711` (`canletgo`). Callees: `Norep` (`:669/:680`, live di — `js/do.js` — restarted `canletgo` in C order with `:line` cites: `:667–672` worn armor/accessory Norep; `:673–686` welded uwep with `body_part(HAND)` + bimanual plural; `:687–702` cursed loadstone with `throw`-count corp
**D-2522** `nethack-c/upstream/src/sounds.c:1427–1537` (`tiphat`) + same-file staticfn `responsive_mo — `js/sounds.js` — file-local `responsive_mon_at` (`:1416` m_at cite, `:1418–1422` helpless/is_silent cites) + exported async `tiphat` in C order with `:line` cites: `:1432–1435` no-helm/res gates; `:1437–1438` cursed_chec
**D-2521** `nethack-c/upstream/src/pager.c:2144–2228` (`look_engrs`, staticfn). Callees: `create_nhwi — `js/pager.js` — restarted `look_engrs` (`:2358`) in C order with `:line` cites: `:2155` region holder; `:2160` seenv gate; `:2166` engr_at (no gone-engraving fallback per `:2162–2165`); `:2169` headstone from `game.lasts
**D-2520** `nethack-c/upstream/src/mkobj.c:3314–3339` (`insane_object`, staticfn). Same-file callee ` — `js/mkobj.js` — `OBJ_STATE_NAMES` verbatim in OBJ_* order (`:3289–3293`); exported `where_name` (`js/mkobj.js:1534`) in C order (`:3299–3308`: null → "nowhere", range/empty-slot → `unknown[${where}]`, else table); file-l
**D-2519** `nethack-c/upstream/src/mklev.c:366–436` (`makerooms`, staticfn). Callees: `nhl_init`/`nhl — `js/mklev.js` — restarted `makerooms` in C order with `:line` cites: `:369–370` inits; `:373` themes handle ⇔ `g._luathemes_loaded[dnum]` (marked once per branch by `makelevel_ordinary`; compiled-in THEMEROOM tables, loa
**D-2518** `nethack-c/upstream/src/uhitm.c:2445–2518` (uhitm `:2450–2477`, mhitu `:2479–2488`, mhitm  — `js/zap.js` — `resists_drli` returns `defended(mon, AD_DRLI)` per C `:210`; `defended` joins the existing mondata edge (`imports.mjs --can` ALREADY, no new edge).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2525; wrap `wildmiss` /
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
