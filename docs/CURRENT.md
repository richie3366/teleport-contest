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

Score last measured: **2026-07-15** — full `sessions` suite (#420; post D-0394).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **24 / 44** |
| Screens matched | **3953 / 11,405** (34.66%) |
| Positional RNG calls matched | **255,082 / 792,838** (32.17%) |
| Speed label | `21+0.12/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**PASS (24):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed0012 | **13878**/13878 | **307**/308 | @307 Suddenly guard disappears |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0002 | 5198/27158 | **50**/595 | |
| seed0004 | 4025/12084 | 28/409 | |
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

**seed0012 screens** — RNG prefix complete; Scr **307**/308, cursors
**307**/308. D-0396: drop gold `freeinv_core` botl + `_goldCount` +
async `gd_move` `"Move along!"` (was 284). Sole fail **@307** C
`"Suddenly, the guard disappears.--More--"` vs JS blank.

```bash
node frozen/ps_test_runner.mjs sessions/seed0012-monk-vault-escort.session.json
```

**Falsify next:** `gd_move_cleanup` / parkguard + `Suddenly, %s disappears`
when escort ends (`vault.c`); early `gddone` → cleanup (not silent
`restfakecorr`).

**Alternates:** seed0004 / seed0002 / seed0006 / seed0007; quest early-0.

**Prefer over:** parked D-0006, seed2200 RC.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** (must stay PASS) + strict lengths.

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
