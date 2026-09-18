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
(audit **1408–1416**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`71+0.49/turn` (R² 0.74).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `58+0.36/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-18 audit 1408–1416): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 %. The 3
`1d21e3be` getdir flips recovered via D-2440; no new flips across D-2440…D-2463
(every per-SHA re-run: 0 regressed).
Reviews 1225–1416: 170 ACCEPT, 5 WITH-DEBT, 1 DEBT, 11 QUALITY-RISK (0 Must-fix pending).
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
**Next cluster:** `teleport.c` rloco — coverage THIN (C 85 L `teleport.c:2102–2187` / JS 19 L in js/teleport.js; hops 3, callers 8, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rloco` (reach regression must be 0). Measured `port-coverage.mjs --name rloco` 2026-09-18 @ cc6372c7.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2463 (index).**
<!-- recent:begin -->
**D-2463** `nethack-c/upstream/src/teleport.c:2102–2187` (`rloco`). — restart as `async` in C order — `:2109–2112` Rider corpse `revive_corpse` (dynamic do.js import); `:2114–2117` extract-then-read otx/oty + `restricted_fall = otx==0 && dndest.lx` (`game.dndest` mirrors `svd.dndest`); `:2
**D-2462** `nethack-c/upstream/src/mhitu.c:1289–1587` (`gulpmu`; engulf_target `:1300`, pit+boulder ` — `js/mhitu.js` only — restart in C order: `t_at` + pit/boulder miss (`is_pit`, `sobj_at`, BOULDER const); Punished `unplacebc()`; live remove/place_monster; steed `mon_nam` buf + `urgent_pline(Some_Monnam …)` + `dismount_
**D-2461** `nethack-c/upstream/src/display.c:1709–1773` (`docrt_flags`; flag decode `:1711–1715`, red — `js/display.js` — new exported `docrtRecalc/Refresh/MapOnly/Nocls` consts + `export async function docrt_flags(refresh_flags)` in C order (flag decode; `!u.ux`/in_docrt guard + file's `!game.level` guard; try/finally in_
**D-2460** `nethack-c/upstream/src/weapon.c:801–934` (`mon_wield_item`; NEED_HTH `:813–815` / NEED_RA — `js/weapon.js` restart of mon_wield_item in C order — impossible('weapon_check %d for %s?') + bare return-0 in default; mwelded refuse arm (bimanual/makeplural hand, otense/mhis weld buffer, PICK_AXE Since/cannot-wield v
**D-2459** `nethack-c/upstream/src/dog.c:419–623` (`mon_arrive`; when-enum `:15–19` Before_you 0/With — `js/dog.js` — module-local when consts + `failed_arrivals` (C dog.c:301 reset-in-losedogs) + `mon_arrive_link` head (STILL_ARRIVING/fmon/isshk→set_residency/long-worm get_wormno+initworm) shared by both helpers; With_you
**D-2458** `nethack-c/upstream/src/potion.c:369–438` (`make_hallucinated`); eyemsg/vismsg `:257–258`; — `js/potion.js` only — restart in C order: `u.Unaware || Unaware()` suppress (make_deaf shape); `!Blind()` verb (file-local Blind, C Blind macro); mask arm with uprops[HALLUC_RES].extrinsic mirror (make_slimed shape) + Ha
**D-2457** `nethack-c/upstream/src/timeout.c:1222–1341` (`slip_or_trip`, staticfn); caller `:906` nh_ — `js/timeout.js:176–307` restart in C order — pronoun/doname/sobj_at-rock/something chain; highc capitalize + bite/bites; uarmf+CORPSE+touch_petrifies+Stone_resistance-flat instapetrify (`tripping over <an pmname NEUTRAL>
**D-2456** `nethack-c/upstream/src/mkmaze.c:1952–2107` (`mv_bubble`, staticfn); callers `:1677` moveb — `js/mklev.js` only — renamed `mv_bubble_move` → `mv_bubble` (module-local like C staticfn; bounds ride as params for C's file-scope gbxmin statics); added the four `:1981–1999` pline+clamp arms in C order (template-liter
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2463; wrap `wildmiss` /
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
