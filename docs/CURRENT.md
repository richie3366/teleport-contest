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

Score last measured: **2026-09-26** — full `sessions` on the working tree
(audit **1830–1838**, commit `539f2fe06`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`234+1.67/turn` (R² 0.788).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-26)** | **12 / 44**, 6,273 / 11,265 pts, RNG **29.7 %**, rngSteps 83.8 %, screens **55.7 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `234+1.67/turn` (R² 0.788) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,273 / 11,265 pts, RNG 29.7 %,
rngSteps 83.8 %, screens 55.7 %; board 2026-09-26T13:32Z, last scored
2026-09-26T13:05Z). Points and screen match rose versus the previous
audit's 6,111 / 54.2 %. Pass count stays 12/44.
**Corpus fortress:** `.cache/hidden/sessions` is still absent, so the
**614 / 940** figure was not re-measured. Each `verify --reach-all` smoke
on this tree was 12 PASS, 0 regressed, and no PASS→FAIL row was opened.
Reviews 1225–1838: 537 ACCEPT, 21 WITH-DEBT, 1 DEBT, 50 QUALITY-RISK (audit 1830–1838: 8 ACCEPT, 1 QUALITY-RISK).
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
**Next cluster:** `do_name.c` `obj_pmname` — coverage THIN (C 38 L `do_name.c:1321–1359` / JS 14 L in js/trap.js). Verify `node scripts/verify.mjs --fn obj_pmname` (reach regression must be 0).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2886 (index).**
<!-- recent:begin -->
**D-2886** `nethack-c/upstream/src/invent.c:4799–4839` `let_to_name`. Callees: `strchr` on `oth_symbo — One `let_to_name` in that C order.
**D-2885** `nethack-c/upstream/src/mkobj.c:1783–1819` `curse`. Callees: `arti_light_radius` (`timeout — One `curse` in that C order.
**D-2884** `nethack-c/upstream/src/dungeon.c:1750–1788` `surface`. Callees: `u_at` (`you.h:562`), `is — One `surface` in that C order.
**D-2883** `nethack-c/upstream/src/vision.c:153–202` `does_block` and `vision.c:211–265` `vision_rese — One `does_block` in that C order: obstructed terrain, tree, closed door, then cloud / water-wall / lava-wall / (`uinwater` and `is_moat`), then the boulder chain, then `m_at` with `hero_see_invisible`, then gas returning
**D-2882** `nethack-c/upstream/src/trap.c:2725–2764` `trapeffect_vibrating_square`. Callees: `feeltra — One `trapeffect_vibrating_square` in that C order.
**D-2881** `nethack-c/upstream/src/sp_lev.c:3407–3437` `get_table_int_or_random`. Callees: `lua_getfi — One `get_table_int_or_random` in that C order.
**D-2880** `nethack-c/upstream/src/files.c:2562–2581` `proc_wizkit_line`. `readobjnam(buf)` (`objnam. — `readobjnam` keeps the caller's character buffer (`_cbuf` + cursor `_boff`).
**D-2879** `nethack-c/upstream/src/zap.c:1637–1674` `do_osshock`. Callees: `rn2`, `rnd`, `splitobj` ( — One `do_osshock` in that C order.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2886; wrap `wildmiss` /
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
