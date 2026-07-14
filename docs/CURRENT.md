# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

## Public score cadence

**Every 5 global loop iterations** (when `iteration-count % 5 == 0`), run and
document a full public score before or as the handoff:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update **this Score section** with: pass count, screen/RNG aggregates, speed
label, PASS list, notable non-PASS. Do not invent suite totals from a single
focused session.

Score last measured: **2026-07-15** — full `sessions` suite (global loop
**#365**) after D-0342/D-0343 (seed0013-restore full PASS).
Focused seed0107 after D-0345: Scr **96**/98 RNG **full** (suite refresh on
next %5).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **22 / 44** |
| Screens matched | **3499 / 11,405** (30.68%) |
| Positional RNG calls matched | **239,942 / 792,838** (30.26%) |
| Speed label | `18+0.12/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**PASS (22):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, **seed0013-friday13-restore**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|---------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0107 | **2902**/2902 | **96**/98 | **primary** — `@85` `dosit` corpse |
| seed0002 | 4510/27158 | 8/595 | |
| seed0012 | 0/13878 | 0/308 | stack overflow |
| seed0361/0373 | early | 0 | quest bones / `makemaz` |

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

**seed0107-samurai-twoweapon-enhance** — RNG **full 2902**/2902; Scr **96**/98

| | |
|--|--|
| **C locus** | `sit.c` `dosit` — sit on floor object / CORPSE |
| **JS locus** | `js/sit.js` `dosit` (generic `sit on it` stub) |
| **Symptom** | `@85` C `You sit on the corpse.  It's not very comfortable...` vs JS `You sit on it.` |
| **Hypothesis** | Object sit uses `the(xname)` + CORPSE amorphous comfort pline, not `it`/`them` |
| **Falsifier** | Scr >96; or named mismatch past sit |
| **Recent fixed** | D-0345 `hitum` twohits / uswapwep (Scr 42→96, RNG full) |

```bash
node frozen/ps_test_runner.mjs sessions/seed0107-samurai-twoweapon-enhance.session.json
```

**Note:** runner `Screen N/M` is **total** positional matches, not prefix
length. Prefer decodeScreen cell first-miss for peel targets.

**Also later on same seed:** `@93` enhance skills page (cursor/content).

**Alternate:** seed2200 @158 RC parked only.

**Prefer over:** quest bones (`^V`/`makemaz`), parked D-0006, seed2200 RC.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore (must stay PASS) +
strict lengths.

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
