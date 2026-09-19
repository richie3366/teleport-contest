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
(audit **1498–1505**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`61+0.40/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,753 / 11,265 pts, RNG **26.6 %**, rngSteps 81.6 %, screens **51.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `61+0.40/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44 (5,753 pts, RNG 26.6 %, screens 51.1 %;
judge 07:08Z, ~D-2534, +105 pts vs last audit): the corpus still does
not predict the judge.
**Corpus fortress** (re-scored 2026-09-19 audit 1498–1505): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — +0 / −0
in the D-2539…D-2550 window (all eight were zero-block coverage rows;
per-SHA `--reach-all` re-runs REACH-OK — ston 14/14, elec 35/35 real
reach, rest smoke — 0 regressed).
Reviews 1225–1505: 249 ACCEPT, 10 WITH-DEBT, 1 DEBT, 16 QUALITY-RISK (Must-fix: 1 — 1503 all_options_strbuf break/continue).
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
**Next cluster:** `cmd.c` get_changed_key_binds [campaign 4/7] — C `cmd.c:2235–2287` absent from js/ (Cmd_bind userbind-delta shape differs from dokeylist map; named omit of the [campaign 1/7] parent, unconditional call there). Port in C order incl. sbuf-null display arm or name it. Verify `node scripts/verify.mjs --fn get_changed_key_binds` (reach regression must be 0).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2550 (index).**
<!-- recent:begin -->
**D-2550** `nethack-c/upstream/src/cmd.c:2235–2287` (`get_changed_key_binds`); arms `:2244–2246` wind — `js/cmd.js` — exported `get_changed_key_binds(sbuf)` in C order with `:line` cites.
**D-2549** `nethack-c/upstream/src/options.c:9551–9591` (`all_options_conds`, staticfn `:9555`); arms — `js/botl.js:676` — exported `opt_next_cond` in C order with `:line` cites, reading the live `condtests` table + file-local OPT_IN/OPT_OUT; C outbuf+boolean folded into the return (null = C FALSE, '' = default, token othe
**D-2548** `nethack-c/upstream/src/options.c:8481–8505` (`get_option_value`); arms `:8489–8492` BoolO — `js/options.js` — (1) count correction: the unix tty build compiles **217** rows, not 248 (cc -E with config.h + PREV_MSGS=1 per options.c `:23–27`; compile-time asserts OPTCOUNT==217, pfx_cond_==215 — /tmp probes, not c
**D-2547** `nethack-c/upstream/src/options.c:9691–9721` (`all_options_strbuf` allopt loop); the obsol — `js/options.js` — two `break`→`continue` with `:line` cites, nothing else; export name/signature unchanged, callers untouched.
**D-2546** `nethack-c/upstream/src/polyself.c:199–268` (`polyman`, staticfn); arms `:200–204` stickin — `js/polyself.js` — restarted `polyman` (stays file-local, mirrors staticfn) in C order with `:line` cites; new exported `ugenocided()` mirroring same-file C `:2265` (`game.mvitals` G_GENOD on urole/urace mnum); urgent_pl
**D-2545** `nethack-c/upstream/src/objnam.c:3966–4175` (`readobjnam_preparse`, staticfn); loop `:3971 — `js/readobjnam.js` — restarted as file-local `readobjnam_preparse` (mirrors staticfn) in C order with `:line` cites: split moist/wet branches keep C check order and RNG (`wet` → `3 + rn2(3)`, `moist` → `rnd(2)`); gender 
**D-2544** `nethack-c/upstream/src/options.c:9678–9748` (`all_options_strbuf`); arms `:9686–9689` hea — `js/options.js` — ported the whole body in C order with `:line` cites; `strbuf_init/append/reserve/empty` (`:3083–3115`, plain-string booking, NULL-empty mirrors C); `allopt`/`opt_set_in_config` empty registries + `PFX_C
**D-2543** `nethack-c/upstream/src/rumors.c:829–935` (`init_CapMons`); arms `:834–836` sanity free, ` — `js/objnam.js` — restarted `init_CapMons` in C order: `:833` embed-as-opened-file (`bogonfile` null when the embed is missing, guarding the `:871`/`:906–907` arms); `:834–836` sanity `free_CapMons()`; `:841` pass 1-count
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2550; wrap `wildmiss` /
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
