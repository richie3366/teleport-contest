# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (when `iteration-count % 5 == 0`), run and
document a full public score before or as the handoff:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update **this Score section** with: pass count, screen/RNG aggregates, speed
label, PASS list, notable non-PASS. Do not invent suite totals from a single
focused session.

Score last measured: **2026-07-18** — full `sessions` suite (loop **#745**).
Screens **7062**/11405; RNG **465040**/792838 (58.66%). **34/44** PASS.
Δ vs #740: Scr **+41**, RNG **+0**, PASS **+0**. Screen gain is seed0367
peels #741–44 (Scr 267→308 @ suite) landing in aggregates.
(#746 D-0672: seed0367 Scr 308→312 focused; suite not remeasured.)

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **34 / 44** |
| Screens matched | **7,062 / 11,405** |
| Positional RNG calls matched | **465,040 / 792,838** (58.66%) |
| Speed label | `35+0.17/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**PASS (34):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0367 | **50125**/50125 | **315**/324 | RNG FULL; screen peel @283 |
| seed0014 | 1435/59178 | 10/714 | early FAIL |
| seed0108 | 2793/16958 | 17/303 | wishlist / extcmd |

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact scored-output lengths.

## Primary objective

**Leaderboard 22-vs-34 gap** — local PASS includes seed0116 + seed5006 +
seed0398 + seed0373 + seed0361; judge at 08:55Z dropped to **22** after
D-0480 (seed0013-rogue 59→58). **D-0483** reverts that serialize coerce.
Next cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** seed0367 screen peel — RNG **FULL**; Scr **315**/324
(cursors 323/324; prefix **283**). **D-0674:** darkroom/memory falsified;
Pri-loca @283 hero (37,19) — JS Algorithm-C COULD_SEE over-marks 26-cell
NW `·` cone past C (temple SW ~31,16).

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0367-priest-quest-tour.session.json
```

**Next falsifier / fix:** `js/vision.js` `left_side`/`view_from` vs C
`vision.c` NW finger past Pri-loca SW corner. Do not re-break
D-0660…D-0673 lit clears; don’t invent darkroom blank for lit+cansee.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture, not `rng-diff` alone |
| seed2200 @158 | RC/`$HOME` harness path, not a port bug |

## Pointers (open only if needed)

| Need | File |
|------|------|
| Live hypothesis / don’t-recheck | `NOTES.md` |
| Divergence by ID | `DIVERGENCE-INDEX.md` → one `## D-NNNN` in `DIVERGENCE-LOG.md` |
| Subsystem omissions | `C-JS-MAP.md` index → one `c-js-map/*.md` |
| Latest loop crumbs | `AGENT-LOOP-JOURNAL.md` (tail only) |
| Score/objective history | `archive/PROGRESS-HISTORY.md` |

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
