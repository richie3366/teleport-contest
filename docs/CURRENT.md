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

Score last measured: **2026-07-15** — full `sessions` suite (#445;
post D-0414). Screens **4194**/11405 (−2 vs #440); RNG
**262860**/792838 (+773). Still **25/44** PASS. seed0004 focused
post D-0416: RNG **12084**/12084, Scr **244**/409 (@182 fixed).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **25 / 44** |
| Screens matched | **4194 / 11,405** (36.77%) |
| Positional RNG calls matched | **262,860 / 792,838** (33.15%) |
| Speed label | `21+0.13/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**PASS (25):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
**seed0012**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0002 | 5210/27158 | **54**/595 | still @3808 eatcorpse |
| seed0004 | **12084**/12084 | **244**/409 | D-0416 @182; next @239 bag empty |
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

**seed0004 @239 bag empty capitalization** — RNG full; Scr **244**/409
after D-0416 (`dog_move` cursemsg `canseemon` LOS). First cell miss:
C `The bag is empty.` vs JS `the bag is empty.` (`Ysimple_name2` /
`upstart(thesimpleoname)` vs bare `theArt(xname)`).

```bash
node frozen/ps_test_runner.mjs sessions/seed0004-feeding-pony.session.json
# Focus: screen @239 empty-container pline
```

**Alternates:** seed0002 `eatcorpse`; seed0006 / seed0007; quest early-0
(seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; re-opening @182 cursemsg
(fixed — D-0416).

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** (must stay PASS) + strict lengths.

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
