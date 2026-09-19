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
to the prior audit, no flips across D-2503…D-2513 (per-SHA re-runs:
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
**Next cluster:** `rumors.c` getrumor — coverage THIN (C 71 L `rumors.c:117–191` / JS 21 L in js/rumors.js; hops 3, callers 4, RNG 1, msg 0; dead callees: init_rumors, couldnt_open_file). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn getrumor` (reach regression must be 0). Measured `port-coverage.mjs --name getrumor` 2026-09-19 @ a263d08e.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2513 (index).**
<!-- recent:begin -->
**D-2513** `nethack-c/upstream/src/rumors.c:117–191` (`getrumor`); callees `dlb_fopen`/`dlb_fclose` ( — `js/rumors.js` only (same-edge import words `impossible` on the live display edge + `RUMORFILE` on the live const edge — `imports.mjs --can` ALREADY both, no new edge) — restarted `getrumor` in C order with `:line` cites
**D-2512** `nethack-c/upstream/src/options.c:9207–9251` (`handle_add_list_remove`; `:9227` `any.a_int — `js/options.js` only, in C order — a_int++ moved before the skip (false cite corrected); suffix template → `` `"\\\"=..."` `` with no trailing quote (runtime now byte-equal to C, proven by node template eval: `"PAT\"=bri
**D-2511** `nethack-c/upstream/src/uhitm.c:4296–4385` (`mhitm_ad_heal`: uhitm `:4300–4304` phys+done, — `js/uhitm.js` — `AD_HEAL = 27` const (monattk.h:69) + `mhitm_ad_heal` word on the live mhitm edge + `defended` word on the live mondata edge (`imports.mjs --can` ALREADY both) + two `damageum_adtyping` rows in C order: A
**D-2510** `nethack-c/upstream/src/hack.c:2098–2225` (`domove_swap_with_pet`, staticfn); sole C calle — `js/hack.js` — restarted `domove_swap_with_pet` in C order with `:line` cites: `:2101–2105` guard + boulder capture; `:2107–2114` park/seemimic via live `M_AP_TYPE(mtmp)`; `:2116–2118` trap lookup + `mtrapped` clear; `:2
**D-2509** `nethack-c/upstream/src/insight.c:2407–2472` (`record_achievement`); 32 call sites in `do. — `js/insight.js` only (same-edge import word `impossible` on the live display edge — `imports.mjs --can` ALREADY, no new edge) — restarted `record_achievement` in C order with `:line` cites: `:2414–2421` guard with `:2419
**D-2508** `nethack-c/upstream/src/pager.c:1979–2074` (`look_all`, staticfn); callers `:1860` (`m` ne — `js/pager.js` — restarted `look_all` in C order with `:line` cites: `:1989` region, `:1992–1993` buf init + `glyph_at`, `:1994–2004` do_mons monster branch (`u_at && canspotself` → `self_lookat`, else `mon_at` → `look_at
**D-2507** `nethack-c/upstream/src/mthrowu.c:321–502` (`ohitmon`); callers `do.c:210` (deliberate non — `js/mthrowu.js` — restarted `ohitmon` in C order with `:line` cites: `:334–339` notonhead/ismimic/vis/observe; `:341–349` tmp +marcher level +`MON_WEP` launcher `spec_abon`; `:350–360` miss arm (`distant_name`, range-0 d
**D-2506** `nethack-c/upstream/src/options.c:6407–6499` (`handler_menu_colors`, staticfn); sole calle — `js/options.js` only (same-edge import words: hacklib `strNsubst`, display `tty_wait_synch`, invent `select_menu_pick_none`, terminal C CLR_* + `NO_COLOR`, objnam `makeplural`, const `HL_*` + `BUFSZ`/`QBUFSZ`, new `artif
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2513; wrap `wildmiss` /
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
