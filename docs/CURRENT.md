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
(audit **1839–1847**, commit `941017b03`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`256+1.55/turn` (R² 0.762).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-26)** | **12 / 44**, 6,273 / 11,265 pts, RNG **29.7 %**, rngSteps 83.8 %, screens **55.7 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `256+1.55/turn` (R² 0.762) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,273 / 11,265 pts, RNG 29.7 %,
rngSteps 83.8 %, screens 55.7 %; board 2026-09-26T13:32Z, last scored
2026-09-26T13:05Z). Held-out is unchanged from the previous audit.
**Corpus fortress:** `.cache/hidden/sessions` is still absent, so the
**614 / 940** figure was not re-measured. Each `verify --reach-all` smoke
on this tree was 12 PASS, 0 regressed, and no PASS→FAIL row was opened.
Reviews 1225–1847: 546 ACCEPT, 21 WITH-DEBT, 1 DEBT, 50 QUALITY-RISK (audit 1839–1847: 9 ACCEPT).
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
**Next cluster:** `cmd.c` `can_do_extcmd` — coverage PARTIAL (C 26 L `cmd.c:463–489` / JS 17 L in `js/cmd.js`). Verify `node scripts/verify.mjs --fn can_do_extcmd` (reach regression must be 0).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2897 (index).**
<!-- recent:begin -->
**D-2897** `nethack-c/upstream/src/do_wear.c:148–178` `toggle_displacement`. Return when `on` and `gi — One exported `toggle_displacement` in that C order, including `(Blind_telepat && Blind)`.
**D-2896** `nethack-c/upstream/src/eat.c:181–213` `eatmupdate`. Return unless `eatmbuf` is set and `n — One exported `eatmupdate` in that C order.
**D-2895** `nethack-c/upstream/src/polyself.c:2160–2188` `ugolemeffects`. Return unless `umonnum` is  — One exported `ugolemeffects` with the C `switch`.
**D-2894** `nethack-c/upstream/src/uhitm.c:3690–3726` `mhitm_ad_conf`. uhitm (`:3696–3702`): `!mconf` — One `mhitm_ad_conf` in that C order.
**D-2893** `nethack-c/upstream/src/calendar.c:120–175` `time_from_yyyymmddhhmmss`, plus contest patch — One `time_from_yyyymmddhhmmss` in that C order.
**D-2892** `nethack-c/upstream/src/hacklib.c:882–919` `unicodeval_to_utf8str`. No callees. `bufsz` is — One `unicodeval_to_utf8str` in that C order.
**D-2891** `nethack-c/upstream/src/cmd.c:4435–4520` `there_cmd_menu_self`. Callees: `stairway_at` (`s — One `there_cmd_menu_self` in that C order, plus `mcmd_addmenu`.
**D-2890** `nethack-c/upstream/src/role.c:2806–2845` `plsel_startmenu`. Callees: `rigid_role_checks`  — One `plsel_startmenu` in that C order.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2897; wrap `wildmiss` /
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
