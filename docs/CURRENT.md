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

Score last measured: **2026-07-15** — full `sessions` suite (#375; after
D-0354 still **23/44**; seed0009 Scr **39→40**).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **23 / 44** |
| Screens matched | **3592 / 11,405** (31.49%) |
| Positional RNG calls matched | **240,471 / 792,838** (30.33%) |
| Speed label | `18+0.12/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**PASS (23):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, **seed0107**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|---------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0009 | **3649**/3713 | **40**/73 | **primary** — @40 pool DEC glyph |
| seed0004 | 4016/12084 | 28/409 | |
| seed0002 | 4510/27158 | 9/595 | |
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

**seed0009-swimmer-mforce** — RNG **3649**/3713; Scr **49**/73

| | |
|--|--|
| **C locus** | `hack.c` / `trap.c` pool step — “You avoid stepping into the pool…” |
| **JS locus** | `cmd.js` / `pickup.js` / pool move gate — blank topline @45 |
| **Symptom** | first cell-miss @45 C pool-avoid `--More--` vs JS blank |
| **Hypothesis** | domove/pooleffects omits avoid-pool pline before water step |
| **Falsifier** | Scr >49 with @45 cells; or named next miss |
| **Recent fixed** | D-0356 `describe_decor` + pickup `!OBJ_AT` → Scr **48→49** |

```bash
node frozen/ps_test_runner.mjs sessions/seed0009-swimmer-mforce.session.json
```

**Note:** runner `Screen N/M` is **total** positional matches, not prefix
length. Prefer decodeScreen cell first-miss for peel targets.
Key read at screen `i` is `moves[i]` (= `steps[i+1].key`), not `steps[i].key`.

**Alternate:** seed2200 @158 RC parked only.

**Prefer over:** quest bones (`^V`/`makemaz`), parked D-0006, seed2200 RC.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + **seed0107** (must
stay PASS) + strict lengths.

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
