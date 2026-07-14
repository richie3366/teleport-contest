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

Score last measured: **2026-07-14** — full `sessions` suite (global loop
**#340**) after D-0313 `done_in_by` isshk. Same 19 PASS; Scr **2826→2831**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **19 / 44** |
| Screens matched | **2831 / 11,405** (24.82%) |
| Positional RNG calls matched | **240,657 / 792,838** (30.35%) |
| Speed label | `18+0.11/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**PASS (19):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|---------|----:|-------:|------|
| seed0030 | 105529/105529 | **1398**/1953 | primary peel; cell first-miss **@791** |
| seed2200 | 3018/3018 | **175**/230 | RNG full; Scr cells 178/230 |
| seed0013-rogue | 4838/4838 | 57/59 | |
| seed0013-friday13-restore | 4803/4804 | 46/99 | |
| seed0107 | 2684/2902 | 36/98 | |
| seed0002 | 5112/27158 | 8/595 | |
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

**seed0030 screen peel** — RNG full; Scr **1398**/1953; cell first-miss **@791**

| | |
|--|--|
| **C locus** | dog invent / wand `doname` — pet pickup pline charges |
| **JS locus** | `js/dogmove.js` / `js/objnam.js` — glass wand `(0:6)` vs bare name |
| **Symptom** | @791 C `The little dog picks up a glass wand.` vs JS `… (0:6)` |
| **Hypothesis** | wand `known`/spe shown on pet pickup when C omits charges |
| **Falsifier** | @791 topline match; expect Scr↑ |
| **Recent fixed** | D-0315 Priest `xname`/`doname` force `bknown`; @787 cursed candy |

```bash
node frozen/ps_test_runner.mjs sessions/seed0030-ten-diverse-deaths.session.json
```

**Note:** runner `Screen N/M` is **total** positional matches, not prefix
length. Prefer decodeScreen cell first-miss for peel targets.

**Alternate:** seed0013 Scr 57/59; seed0107 RNG@2684; seed2200 Scr 175/230.

**Prefer over:** quest bones (`^V`/`makemaz`), parked D-0006, seed2200 RC.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104
(must stay PASS) + strict lengths.

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
