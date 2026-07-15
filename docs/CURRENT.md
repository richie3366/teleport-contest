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

Score last measured: **2026-07-15** — full `sessions` suite (#440;
post D-0408…D-0411). Screens **4196**/11405 (flat); RNG
**261626→262087**/792838. Still **25/44** PASS. seed0004 unchanged
@10966 (RNG 11029/12084, Scr 242/409).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **25 / 44** |
| Screens matched | **4196 / 11,405** (36.79%) |
| Positional RNG calls matched | **262,087 / 792,838** (33.06%) |
| Speed label | `21+0.13/turn` (R² 0.82) |
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
| seed0002 | 5199/27158 | **54**/595 | still @3808 eatcorpse |
| seed0004 | **11029**/12084 | **242**/409 | @10966 umove / dopush vs distfleeck |
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

**seed0004 @10966** — during travel (`_>` / `.`), after EOT wipe C
`distfleeck` vs JS `dopush` `exercise(A_STR)`. JS sticky UNENC
`9→21` since heal; inv=-15. Force (#441): leftover0+SLT / after=9 →
10979; SLT|leftover0 alone no. Find ≥16 aum inv/cap gap at miss and/or
how C reached silent **0→12** leftover after heal.

```bash
node frozen/ps_test_runner.mjs sessions/seed0004-feeding-pony.session.json
node scripts/rng-diff.mjs sessions/seed0004-feeding-pony.session.json
# Focus: first miss @10966
```

**Alternates:** seed0002 `eatcorpse`; seed0006 / seed0007; quest early-0
(seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; bare `dog_move` mtrack peels.

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
