# Review 1972 — 2af820a38 — movemon_singlemon bypass/vision/split arms

Metadata: SHA `2af820a38` (D-3012). Scored diff: `js/mon.js` only (+21/−~5,
23 changed lines) plus unscored `scripts/movemon-singlemon.test.mjs` (82 L).
Subject promises: port C `mon.c:1258–1264` into `movemon_singlemon` and
`:1332–1338` into `movemon`; retire `m_calcdistress`/`worm_cross`/`set_wall`
stale.

## Intent vs deliverable

Promise: port the `:1258` vision arm and the `:1261–1264` bypass/split
reset arms at both movement levels; export `movemon_singlemon` (C
extern.h:1767); retire three stale rows.
Diff actually adds: the export keyword, `vision_recalc(0)` +
`clear_bypasses()` + `clear_splitobjs()` in `movemon_singlemon`, the two
clears post-loop in `movemon`, and two import-name additions to
already-imported modules. Nothing else in scored `js/`. Promise kept, no
scope creep. Quote of the shape added (js/mon.js:3368–3375):

```js
if (game.vision_full_recalc) vision_recalc(0);      // C mon.c:1258
if (game.context?.bypasses) clear_bypasses();       // C mon.c:1261-1263
clear_splitobjs();                                  // C mon.c:1264
```

## Inventory

- `movemon_singlemon` (js/mon.js:3335, newly exported): +3 statements
  inside the per-monster gate, before `minliquid`.
- `movemon` (js/mon.js:3818): +2 statements post-loop before
  `dmonsfree()`.
- No new helpers; both callees join existing import edges (mkobj.js,
  worn.js) — no new edge, no cycle question.

## C ↔ JS fidelity

### movemon_singlemon — verdict: exact-C, ACCEPT

C locus (`nethack-c/upstream/src/mon.c:1212–1322`, csym range), the
relevant arms:

```c
if (gv.vision_full_recalc)
    vision_recalc(0); /* vision! */
/* reset obj bypasses before next monster moves */
if (svc.context.bypasses)
    clear_bypasses();
clear_splitobjs();
if (minliquid(mtmp))
    return FALSE;
```

JS order is identical: vision gate, conditional bypass clear,
unconditional split clear, then `minliquid`. Guards match
(`game.vision_full_recalc`, `game.context?.bypasses`). No `rn2`/`rnd` in
these arms in C; none added. Branch-by-branch confirm.

### movemon post-loop — verdict: exact-C modulo one named omit, ACCEPT

C post-loop (`mon.c:1330–1340`, read in situ):

```c
iter_mons_safe(movemon_singlemon);
if (any_light_source())
    gv.vision_full_recalc = 1; /* in case a mon moved w/ a light source */
if (svc.context.bypasses)
    clear_bypasses();
clear_splitobjs();
dmonsfree();
```

JS ports both clears before `dmonsfree()` and leaves the
`any_light_source` arm as an explicit named omission (comment + map: no JS
counterpart). Correct: named, not silent.

### Callee closure — all LIVE, no clones, no stubs

Required `sym.mjs` outputs:

```text
movemon_singlemon js/mon.js:3335   ASYNC — await required
clear_bypasses   js/worn.js:1172   sync
clear_splitobjs  js/mkobj.js:523   sync
vision_recalc    js/vision.js:1024   sync
```

`vision_recalc` was already imported at mon.js:73 (verified by grep); the
other two join existing edges. Export/caller: C `extern.h:1767` declares
`movemon_singlemon`; JS now exports it; the single C call site
(`iter_mons_safe(movemon_singlemon)` inside `movemon`) is wired
(mon.js:3824).

### Stale retirements — verified legitimate

- `set_wall` → split body `set_wall_mode` exists (js/mklev.js:33169).
- `worm_cross` → exported js/worm.js:751.
- `m_calcdistress` → complete file-local js/mon.js:1088 with its single
  caller `mcalcdistress` at :1106 (static-shaped pair; non-exported but
  wired, named in D-log). Ledger note records the location.

## Hallucinations / overclaim

D-log Verify bullet claims REACH-OK + green/cohort/full with exact counts
— every count re-confirmed below. The `dist2`-local Named omission is
pre-existing drift, correctly not claimed as fixed. No "Match C" overclaim
over a stubbed callee (there are no stubs). Diff grep: no
`FORCE`/`DIAG`/`getRngLog`/seed names in control flow/fastforward/hardcoded
coordinates (only C-macro name `NODIAG` hits). Rule #2:

```text
Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

## Density

Breadth-phase: one function plus its same-closure post-loop level, ≤80
insertions on a Must-fix-free coverage row, three stale rows retired in
the same commit. Small but whole: the head row's closure held nothing more
Open, and the only remaining omit (`any_light_source`) is named. Each
function has its `Ledger:` entry and Verify lines (D-3012). Not
quality-risk by size.

## Verification

Re-measured
(`hidden-proxy.mjs verify movemon_singlemon,m_calcdistress,worm_cross,set_wall
--base 2af820a38~1 --reach-all`):

```text
reach movemon_singlemon: 15 baseline-PASS session(s) reach it (15 run): 15 PASS, 0 regressed → REACH-OK
smoke m_calcdistress/worm_cross/set_wall: fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked at baseline for all four — the vacuous verify is honestly
labeled as such in the D-log ("expected for coverage rows", no queue row
cited blocks, so no vacuity fault). Zero REGRESSED sessions. D-log's
`--full` 44/44 claim corroborates the fortress (CURRENT still 44/44).

## Actionable C-wrongs

None.

Ledger: `movemon_singlemon` ported (arms exact-C, all callees LIVE,
REACH-OK 15/15).
Verify lines: hidden vacuous ×4 (honest) + REACH-OK + green/cohort/full
per D-log, re-run confirms.

Verdict: **ACCEPT**
