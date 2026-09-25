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

Score last measured: **2026-09-25** — full `sessions` on the working tree
(audit **1749–1757**, commit `0cf2f655d`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`238+1.57/turn` (R² 0.781).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-24)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `238+1.57/turn` (R² 0.781) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; last scored 2026-09-25T19:01Z,
re-read at audit 1749–1757 — stamp moved since 13:05Z, values identical,
so still no movement):
no movement — the corpus still does not predict the judge.
**Corpus fortress:** this audit's `hidden-proxy score --jobs 8` scored the
12 private recordings that exist (**12/12 PASS**, RNG 75,151/75,151,
screens 653/653, 0 blocking owners). `.cache/hidden/sessions` is empty
(941 recipes), so the prior **614 / 940** figure was not re-measured and
no PASS→FAIL row was opened.
Reviews 1225–1757: 467 ACCEPT, 21 WITH-DEBT, 1 DEBT, 39 QUALITY-RISK (audit 1749–1757: 5 ACCEPT, 4 QUALITY-RISK → 4 Must-fix).
Live debts: 1730 `wizcustom_glyphids` empty `wizcustom_callback` site (glyphmap-blocked, map-named); 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending — review-debt, unqueued (detail in the review files).
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
**Next cluster:** `dothrow.c` `thitmonst` — coverage PARTIAL (C 291 L `dothrow.c:2011–2304` / JS 210 L). Verify `node scripts/verify.mjs --fn thitmonst`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2804 (index).**
<!-- recent:begin -->
**D-2804** `nethack-c/upstream/src/dothrow.c:2011–2304` `thitmonst`. After the weapon arm (`:2155–223 — Restart of the hit chain in C order.
**D-2803** `nethack-c/upstream/src/do_wear.c:383–431` `Cloak_off`. `do_wear.c:186–259` `Boots_on`. `d — Both functions restarted in C order.
**D-2802** `nethack-c/upstream/include/monst.h:277` `resists_poison(mon)` is `Resists_Elem(mon, POISO — `Resists_Elem` in `js/mondata.js` in that C order.
**D-2801** `nethack-c/upstream/include/timeout.h:37–48` `MELT_ICE_AWAY` is the ninth `timeout_types`  — `MELT_ICE_AWAY` is `SHRINK_GLOB + 1` (8).
**D-2800** `nethack-c/upstream/include/youprop.h:253–255` `Flying`. `do.c:1206` ceiling hider. `do.c: — Import `Flying` from `mhitu.js` and delete the local clone.
**D-2799** `nethack-c/upstream/include/wintype.h:128–134` (`ATR_NONE` 0, `ATR_BOLD` 1, `ATR_DIM` 2, ` — Map none → 0, bold → terminal `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1).
**D-2798** `nethack-c/upstream/src/zap.c:5536–5578` `fracture_rock`. Callees: `get_obj_location`, `co — Restart of `fracture_rock` in C order, async because `You` and `breakobj` can reach `--More--`.
**D-2797** `nethack-c/upstream/src/uhitm.c:3122–3165` `mhitm_ad_drst`. Callees: `mhitm_mgc_atk_negate — One exported `mhitm_ad_drst` in C order.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2804; wrap `wildmiss` /
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
