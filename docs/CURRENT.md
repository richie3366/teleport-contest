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
(audit **1748**, commit `309d58ccc`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`240+1.54/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-24)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `240+1.54/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; last scored 2026-09-25T13:05Z,
re-read at audit 1748 — new stamp since 2026-09-24T13:10Z but
identical values, so still no movement):
no movement — the corpus still does not predict the judge.
**Corpus fortress** (audit 1740 re-score 2026-09-24 at `47eba199b`,
per-session statuses identical to audit 1731–1739, 0 PASS→FAIL):
**501 / 540 PASS (92.8 %)** excl. 13 env-only; RNG 99.37 %, screens 99.4 %. Grown 2026-09-25 by 400 `scen-*` sessions (20 new families; 113 / 400 PASS at `9d6d893ca`) → **614 / 940**.
Reviews 1225–1748: 462 ACCEPT, 21 WITH-DEBT, 1 DEBT, 35 QUALITY-RISK (audit 1748: 6 ACCEPT, 2 QUALITY-RISK → 2 Must-fix).
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
**Next cluster:** `js/options.js` `parseNethackrc` role/race/gender/align do_set arms never set `duplicateOpt` — C `parseoptions` `:621` sets `duplicate` before the optfn, and `parse_role_opt` `:7987–7990` then rejects a positive value when the same-phase saved string starts with `'!'`. Source: reviews/loop-unattended/1745-6864eb3d8-optfn-gender-family.md. Verify `node scripts/verify.mjs --fn optfn_gender` (reach regression must be 0).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2791 (index).**
<!-- recent:begin -->
**D-2791** `nethack-c/upstream/src/options.c:621` (`duplicate = duplicate_opt_detection(matchidx)` in — `rc_do_set_role_family` sets `go.opt_initial` and `go.opt_from_file` (the `TRUE, TRUE` pair) and `duplicateOpt` from `duplicate_opt_detection` before the optfn, then restores both so a leftover TRUE is not left for a lat
**D-2790** `nethack-c/upstream/src/options.c:6859–6871` `nmcpy`. `for (count = 1; count < maxlen; cou — Restart of `nmcpy` in C order: copy while `count < maxlen`, stop before a comma or NUL, return the bounded string (JS strings are immutable; callers assign).
**D-2789** `nethack-c/upstream/src/coloratt.c:530–580` `basic_menu_colors`. load_colors saves `iflags — restart of `basic_menu_colors` in C order with `:line` cites.
**D-2788** `nethack-c/upstream/src/options.c:1442–1560` `optfn_disclose` (NHOPTC, optlist.h `:284`).  — `optfn_disclose` and `handler_disclose` in `js/options.js` in C order with `:line` cites.
**D-2787** `cfgfiles.c:1960–1976` `rcfile_interface_options` — rc parser in `js/cfgfiles.js`. Caller `rcfile()` is `:966`.
**D-2786** `nethack-c/upstream/src/options.c:1777–1812` `optfn_gender` (NHOPTC, optlist.h `:132`). Sa — the four optfns plus `parse_role_opt`, `saveoptstr`, `getoptstr`, `opt2roleopt`, `get_cnf_role_opt`, and `rolestring` in `js/options.js`, in C order with `:line` cites.
**D-2785** `nethack-c/upstream/src/options.c:3824–3860` (staticfn; NHOPTC wires `&optfn_soundlib`, op — restart as `optfn_soundlib` in C order with `:line` cites.
**D-2784** `nethack-c/upstream/src/options.c:3958–4010` (staticfn; NHOPTC wires `&optfn_sortvanquishe — restart as `optfn_sortvanquished` in C order with `:line` cites.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2791; wrap `wildmiss` /
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
