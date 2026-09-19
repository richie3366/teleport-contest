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
(audit **1489–1497**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`69+0.47/turn` (R² 0.82).

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
screens 93.2 %. Held-out 11/44 (5,753 pts, RNG 26.6 %, screens 51.1 %;
judge 07:08Z, ~D-2534, +105 pts vs last audit): the corpus still does
not predict the judge.
**Corpus fortress** (re-scored 2026-09-19 audit 1489–1497): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — +0 / −0
in the D-2530…D-2538 window (all nine were zero-block coverage rows;
per-SHA `--reach-all` re-runs REACH-OK, 0 regressed).
Reviews 1225–1497: 242 ACCEPT, 10 WITH-DEBT, 1 DEBT, 15 QUALITY-RISK (Must-fix: none — 1465 trio shipped D-2512).
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
**Next cluster:** `uhitm.c` mhitm_ad_slim — coverage THIN (C 72 L `uhitm.c:3526–3600` / JS 22 L in js/mhitm.js; hops 4, callers 1, RNG 2, msg 5; queue head after D-2538 shipped set_savefile_name, audit 1489–1497). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_slim` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_slim` 2026-09-19 @ 1bfac98a.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2538 (index).**
<!-- recent:begin -->
**D-2538** `nethack-c/upstream/src/files.c:1020–1123` (`set_savefile_name`). Callees: `regularize` (` — `js/save.js` — restarted `set_savefile_name(regularize_it)` in C order with `:line` cites: `:1030–1034` VMS arm named compiled out; `:1036–1053` WIN32 arm named compiled out; `:1054–1057` UNIX arm live (`save/` + `game.p
**D-2537** `nethack-c/upstream/src/mthrowu.c:1173–1264` (`thrwmu`). Callees/macros: `mon_wield_item`  — `js/mthrowu.js` — restarted `thrwmu_body` in C order with `:line` cites: `:1186–1191` wield-gate; `:1194–1196` `select_rwep`; `:1198–1240` polearm arm (must-be-wielded return, `dist2` rang vs `MON_POLE_DIST`/`couldsee` r
**D-2536** `nethack-c/upstream/src/dig.c:1502–1544` (`draft_message`). Callees/macros: `You_feel` (`: — `js/dig.js` — restarted + exported `draft_message` in C order with `:line` cites: `:1513–1514` plain «an unexpected draft»; `:1515–1523` hallu «like you are %s» (4-F when any of the six ACURR attrs < 6, else 1-A); `:1526
**D-2535** `nethack-c/upstream/src/mdlib.c:669–830` (`build_options`). Callees: `build_savebones_comp — `js/version.js` (+366) — full family in C order with `:line` cites: opttext state (`:95–104`); `build_savebones_compat_string` (`:392–415`, VERSION_COMPATIBILITY arm compiled out → "5.0.0 only"); 26 contest `build_opts` 
**D-2534** `nethack-c/upstream/src/getpos.c:665–725` (`getpos_menu`). Callees: `gather_locs` (`:677`, — `js/getpos.js` — exported async `getpos_menu` (`js/getpos.js:944`) in C order with `:line` cites: `:677` same-file gather_locs; `:679–685` count<2 → `You('cannot %s %s.')` see/detect + descr[0], FALSE; `:687–692` item li
**D-2533** `nethack-c/upstream/src/invent.c:814–948` (`merged`). Callees: `mergable` (`:819`, live mk — `js/mkobj.js` — restarted + exported `merged` (`js/mkobj.js:2549`) in C order with `:line` cites: `:826–831` age average (lamplit/globby skip); `:833–834` quan (glob stays 1); `:835–840` coin reweigh + bknown wipe, `!Is_
**D-2532** `nethack-c/upstream/src/trap.c:4233–4314` (`dofiretrap`, staticfn). Callees: `Blind` (`:42 — `js/trap.js` — restarted `dofiretrap` in C order with `:line` cites: `:4241` shared `orig_dmg`/`num` init; `:4244–4253` steam arm with C short-circuit (`carried` only when box non-null) and `u.uinwater` for Underwater; `
**D-2531** `nethack-c/upstream/src/dothrow.c:2480–2574` (`breakobj`). Callees: `is_crackable` (live m — `js/dothrow.js` — restarted `breakobj` in C order with `:line` cites: `:2488–2491` crackable `erode_obj` + `ER_DESTROYED`-gated 1/0 return; `:2493` potion-class→`POT_WATER` mapping; `:2494–2497` MIRROR luck; `:2498–2521`
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2538; wrap `wildmiss` /
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
