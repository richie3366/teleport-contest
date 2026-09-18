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
(audit **1444–1452**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`42+0.56/turn` (R² 0.92).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `42+0.56/turn` (R² 0.92) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-18 audit 1444–1452): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 % — identical
to the prior audit, no flips across D-2485…D-2494 (every per-SHA re-run:
0 regressed; makemaz REACH 77/77, misc_obj 12/12, ad_legs 13/13).
Reviews 1225–1452: 200 ACCEPT, 8 WITH-DEBT, 1 DEBT, 14 QUALITY-RISK (0 Must-fix pending).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph (display.h:842–844 vs display.js:849), 1448 safe_typename guard (objnam.c:316) — review-debt, unqueued.
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
**Next cluster:** `mon.c` setmangry — coverage PARTIAL (C 53 L `mon.c:4265–4318` / JS 28 L in js/mon.js; hops 2, callers 18, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn setmangry` (reach regression must be 0). Measured `port-coverage.mjs --name setmangry` 2026-09-18 @ 6b72742e.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2494 (index).**
<!-- recent:begin -->
**D-2494** `nethack-c/upstream/src/mon.c:4265–4318` (`setmangry`); 18 code call sites (`dokick.c:152, — `js/mon.js` — `setmangry` restarted in C order with `:line` cites: Elbereth arm first (`via_attack` + strict `sengr_at` inlined via live `engr_at`: exact case-insensitive `actual_text` match, `HEADSTONE` skip, `engr_time
**D-2493** `nethack-c/upstream/src/display.c:1487–1529` (`see_monsters`; 35 code call sites); `displa — `js/display.js` only, no new imports (`suppress_map_output` is same-module `:4748`; `_flushing` module-level beside `_delay_flushing`).
**D-2492** `nethack-c/upstream/src/mkmaze.c:1127–1223` (`makemaz`); 5 code call sites `mklev.c:1270,1 — `js/mklev.js` only, no new static edges (`imports.mjs --can` reports the dungeon.js/mon.js edges already static) — 4 import words (`Is_special`, `Invocation_lev` in the dungeon.js block `:139`; `dmonsfree` in the mon.js 
**D-2491** `nethack-c/upstream/src/objnam.c:1824–1920` (`corpse_xname`); 23 code call sites (dig/do/d — `js/objnam.js` — `corpse_xname` restarted in C order with `:line` cites: `:1830–1841` flag decode; `:1841` glob as `(otyp|0) !== CORPSE && globby`; `:1843` OBJ_NAME glob name; `:1844–1845` NON_PM paranoia → `thing` (null
**D-2490** `nethack-c/upstream/src/uhitm.c:4425–4489` (`mhitm_ad_legs`); sole C caller `uhitm.c:4788` — `js/mhitm.js` only, no new imports (`is_youmonst`, `mhitm_ad_phys`, knockback/grow_up/monkilled all local; `imports.mjs --can` confirms display/trap/rng edges already static, attrib `exercise` hoisted-safe) — new `const 
**D-2489** `nethack-c/upstream/src/ball.c:1034–1102` (`bc_sanity_check`); sole C caller `wizcmds.c:14 — `js/ball.js` — new `export async function bc_sanity_check` in C order: Punished/!Punished `%s%s%s` arms verbatim (`punished = !!u.uball` per youprop.h:77 + do.js/trap.js D-1786 convention; the `!uball` disjunct is dead i
**D-2488** `nethack-c/upstream/src/dogmove.c:1472–1541` (`quickmimic`); caller `nethack-c/upstream/sr — `js/dogmove.js` — `qm[]` (9 rows verbatim: 7 same-pet/same-symbol monster rows, `S_DOG`/sink furniture row, tripe-ration end row) + `export async function quickmimic` in C order: Protection/meating guard (H/E/intrinsic i
**D-2487** `nethack-c/upstream/src/glyphs.c:824–1162` (`parse_id`, staticfn). Callers `glyph_find_cor — new `js/glyphs.js` (634 L) in C order — `zero_find`, `strcmpi` (hacklib `strncmpi` -1 idiom), `fix_glyphname`, `glyph_hash` (rotl-1/XOR uint32), double-hash cache (`init`/`add`/`find`, odd step, `free`, `status`), `parse
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2494; wrap `wildmiss` /
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
