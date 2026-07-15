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

Score last measured: **2026-07-16** — full `sessions` suite (#455;
post D-0424 `lookat` trap). Screens **4350**/11405 (+14 vs #450);
RNG **263166**/792838 (+11 vs #450). Still **25/44** PASS. seed0004
focused: Scr **396**/409 (@312 next).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **25 / 44** |
| Screens matched | **4350 / 11,405** (38.14%) |
| Positional RNG calls matched | **263,166 / 792,838** (33.19%) |
| Speed label | `22+0.14/turn` (R² 0.74) |
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
| seed0004 | **12084**/12084 | **397**/409 | D-0425 @312 wall; next @330 invent `(1 of 2)` |
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

**seed0004 @330 `i` invent multi-page footer** — RNG full; Scr
**397**/409 after D-0425 (wall `describe_looked`). First cell miss @330:
C status/footer `(1 of 2)`; JS has invent letter `i` at that cell
(Coins class page).

```bash
node frozen/ps_test_runner.mjs sessions/seed0004-feeding-pony.session.json
# Focus: screen @330 invent NHW_MENU / display_pickinv page marker
```

**Alternates:** seed0002 `eatcorpse`; seed0006 / seed0007; quest early-0
(seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; re-opening @312 wall look
(fixed — D-0425).

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
