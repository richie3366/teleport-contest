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
(audit **1462–1470**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`49+0.30/turn` (R² 0.79).

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
**Corpus fortress** (re-scored 2026-09-19 audit 1462–1470): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 % — identical
to the prior audit, no flips across D-2503…D-2520 (per-SHA re-runs:
0 regressed).
Reviews 1225–1470: 215 ACCEPT, 10 WITH-DEBT, 1 DEBT, 15 QUALITY-RISK (1 Must-fix pending: 1465 menu-colors trio).
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
**Next cluster:** `mkobj.c` insane_object — coverage MISSING (C 21 L `:3314–3339` / JS no symbol; RNG 0). Port whole body in C order, callers wired. Verify `--fn insane_object`, reach regression 0. Measured @ ab1ae274.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2520 (index).**
<!-- recent:begin -->
**D-2520** `nethack-c/upstream/src/mkobj.c:3314–3339` (`insane_object`, staticfn). Same-file callee ` — `js/mkobj.js` — `OBJ_STATE_NAMES` verbatim in OBJ_* order (`:3289–3293`); exported `where_name` (`js/mkobj.js:1534`) in C order (`:3299–3308`: null → "nowhere", range/empty-slot → `unknown[${where}]`, else table); file-l
**D-2519** `nethack-c/upstream/src/mklev.c:366–436` (`makerooms`, staticfn). Callees: `nhl_init`/`nhl — `js/mklev.js` — restarted `makerooms` in C order with `:line` cites: `:369–370` inits; `:373` themes handle ⇔ `g._luathemes_loaded[dnum]` (marked once per branch by `makelevel_ordinary`; compiled-in THEMEROOM tables, loa
**D-2518** `nethack-c/upstream/src/uhitm.c:2445–2518` (uhitm `:2450–2477`, mhitu `:2479–2488`, mhitm  — `js/zap.js` — `resists_drli` returns `defended(mon, AD_DRLI)` per C `:210`; `defended` joins the existing mondata edge (`imports.mjs --can` ALREADY, no new edge).
**D-2517** `nethack-c/upstream/src/dothrow.c:2309–2382` (`gem_accept`, staticfn). Callees: `Monnam`,  — `js/dothrow.js` — `export async function gem_accept` in C order with `:line` cites: `:2320–2321` buddy/gem gates (`sgn` module-local, minion/trap/makemon precedent; `GEMSTONE` local const already at file scope); `:2323–2
**D-2516** `nethack-c/upstream/src/wizcmds.c:693–835` (`wiz_map_levltyp`); `:839–877` (`wiz_levltyp_l — `js/wizcmds.js` — `LEVLTYP_NAMES` verbatim from C `cmd.c:1072–1084` (38 names + undiggable marker + padding); restarted `wiz_map_levltyp` in C order with `:line` cites: `:698` istty (`game.windowprocs?.name ?? 'tty'`); `
**D-2515** `nethack-c/upstream/src/botl.c:962–1279` (`bot_via_windowport`, staticfn). Same-file calle — `js/botl.js` — `conditions`/`condtests`/`terrain_descr`/`enc_stat` tables verbatim in C order with `:line` cites (+ `hu_stat`, bl-enum 0–29, `OPT_IN`/`OPT_OUT` per `global.h:576`); `rank` (via live `rank_of`), `encglyph`
**D-2514** `nethack-c/upstream/src/restore.c:307–373` (`restmon`, staticfn). Callees: `Sfi_monst` (`: — new `js/restore.js` — `newmextra` (`makemon.c:1064–1072`, `{ mcorpsenm: NON_PM }`), `new_mgivenname` (`do_name.c:31–47`, `free_mgivenname :50–57` inlined), `newebones` (`bones.c:818–830`, zeroed + `parentmid`), `moves_to
**D-2513** `nethack-c/upstream/src/rumors.c:117–191` (`getrumor`); callees `dlb_fopen`/`dlb_fclose` ( — `js/rumors.js` only (same-edge import words `impossible` on the live display edge + `RUMORFILE` on the live const edge — `imports.mjs --can` ALREADY both, no new edge) — restarted `getrumor` in C order with `:line` cites
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2520; wrap `wildmiss` /
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
