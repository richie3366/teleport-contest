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

Score last measured: **2026-09-20** — full `sessions` on the working tree
(audit **1587–1594**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`57+0.34/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-19)** | **11 / 44**, 5,972 / 11,265 pts, RNG **26.7 %**, rngSteps 81.7 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `57+0.34/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 11/44, unchanged vs last audit (5,972 pts, RNG
26.7 %, screens 53.0 %; totals in table): the corpus still does not
predict the judge.
**Corpus fortress** (re-scored 2026-09-20 audit 1587–1594): **497 / 540
PASS (92.0 %)** excl. 13 env-only; RNG 99.31 %, screens 99.1 % — **+0 / −0**
in the D-2628…D-2644 window (7 ACCEPTs + 1 QUALITY-RISK;
every per-SHA `--reach-all` re-run here ends REACH-OK with no REGRESSED).
Reviews 1225–1594: 328 ACCEPT, 14 WITH-DEBT, 1 DEBT, 22 QUALITY-RISK (1503, 1517, 1520 stamped; Must-fix 1533/1536 → D-2583/D-2584, 1568 → D-2610, 1592 open; hashes filled).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`) — review-debt, unqueued (detail in the review files).
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
**Next cluster:** `sp_lev.c` lspo_monster — coverage MISSING (C 186 L `sp_lev.c:3214–3400` / JS no symbol).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2644 (index).**
<!-- recent:begin -->
**D-2644** ``nethack-c/upstream/src/light.c:517–563`` (relink_light_sources). Decisive C facts: walk  — new exported ``relink_light_sources(ghostly)`` in C-home ``js/light.js`` in C order with per-arm ``:line`` cites — array walk ``:538``, flag gate ``:539``, type arms ``:540``, bare-numeric ``nid :541`` (deserLightList sh
**D-2643** ``nethack-c/upstream/src/sp_lev.c:6336–6376`` (sp_level_coder_init) + ``:6323–6333`` (upda — new exported ``sp_level_coder_init`` in C-home ``js/mklev.js`` in C order with per-arm ``:line`` cites — object literal for ``alloc :6339`` (GC, no live alloc export), ``MAX_NESTED_ROOMS + 1`` arrays (const.js import ext
**D-2642** ``nethack-c/upstream/src/polyself.c:273–303`` (change_sex). Decisive C facts: the ``!Upoly — restarted the export in C order with per-arm ``:line`` cites — sexless-form first flip ``:281–284``, mfemale ``:285–286``, live ``max_rank_sz()`` ``:287``, pl_character rename ``:288–291`` (``String(name).slice(0, PL_CSI
**D-2641** ``nethack-c/upstream/src/exper.c:85–166`` (experience, decl ``extern.h:1038``). Decisive C — restarted the export in C order with per-arm ``:line`` cites — eel ``:125–126`` via file-local ``Amphibious_hero`` (youprop.h:272 macro expansion in the teleport.js/mhitu.js uprop-read shape, not exported so no third ``A
**D-2640** ``nethack-c/upstream/src/read.c:1324–1396`` (seffect_destroy_armor, decl ``:26``) + same-f — restarted the export in C order with per-arm ``:line`` cites — confused ``:1333–1352`` via file-local ``p_glow2(otmp, NH_PURPLE)`` + live ``costly_alteration`` COST_DEGRD; cursed ``:1354–1371`` via live ``Yobjnam2(otmp,'
**D-2639** ``nethack-c/upstream/src/region.c:798–892`` (rest_regions, decl ``extern.h:2691``); static — new ``rest_regions(stored, elapsed, ghostly)`` in ``js/region.js:700`` in C order with per-arm ``:line`` cites — clear_regions security wipe (``:806``); ghostly⇒0 tick else elapsed (``:807–811``); fresh object per record
**D-2638** ``nethack-c/upstream/src/hack.c:2513–2582`` (avoid_trap_andor_region, staticfn decl ``:41` — deleted all three clones → live imports (``imports.mjs --can hack.js region.js visible_region_at``: SAFE — hoisted function decls in the existing 98-module SCC, runtime-only calls; ``upstart`` joins the existing hacklib.
**D-2637** ``nethack-c/upstream/src/monmove.c:241–303`` (onscary, decl ``extern.h:1935``); callee ``e — restarted the ``mon.js`` export in C order with per-arm ``:line`` cites — live ``is_lminion``/``Inhell`` (teleport.js; ``Inhell`` newly exported, hellish-flags shape = C ``In_hell``), ``inhistemple`` (priest.js), ``inhis
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2644; wrap `wildmiss` /
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

Update **this file** on score/gate/objective changes (audit cadence:
Public score cadence above). Journal; divergence + index; one C-JS-MAP
section. No completed D-lists.
