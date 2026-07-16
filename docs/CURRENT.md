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

Score last measured: **2026-07-16** — full `sessions` suite (#505 score
cadence, post D-0467). Screens **4877**/11405; RNG **285359**/792838.
**26/44** PASS. Speed `23+0.13/turn`. Δ vs #500: Scr **+9**, RNG **+1**
(D-0467 invent itemed; seed0002 Scr 566→568).
*(#506–#509: seed0002 PASS via D-0468…D-0470; seed0006 early RNG via
D-0471 — suite totals stale until next %5.)*

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **27 / 44** *(+seed0002; suite aggs stale until next %5)* |
| Screens matched | **4878 / 11,405** *(est. +1 vs #505; seed0002 595)* |
| Positional RNG calls matched | **285,359 / 792,838** (35.99%) |
| Speed label | `23+0.13/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**PASS (27):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, **seed0002**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0006 | 6578/6736 | **68**/123 | collect_coords @6574 (D-0472) |
| seed0007 | 2975/16373 | **20**/302 | snake swamp |
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

**seed0006 wizard water demon** — late RNG @6574 `collect_coords`
(D-0472). Prefer shared teleport path over late seed0007 peels.

```bash
node frozen/ps_test_runner.mjs sessions/seed0006-wizard-water-demon.session.json
node scripts/rng-diff.mjs sessions/seed0006-wizard-water-demon.session.json
```

**Alternates:** seed0007 snake swamp; quest early-0 (seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; re-opening D-0471.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** (must stay PASS) +
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
