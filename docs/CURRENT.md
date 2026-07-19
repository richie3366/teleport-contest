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

Score last measured: **2026-07-19** — full `sessions` suite (loop **#815**).
Screens **7926**/11405; RNG **527,503**/792838 (66.53%).
**36/44** PASS. Δ vs #810: Scr +0, RNG +189; seed0399 10359→10389 (D-0731).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **36 / 44** |
| Screens matched | **7,926 / 11,405** |
| Positional RNG calls matched | **527,503 / 792,838** (66.53%) |
| Speed label | `37+0.18/turn` (R² 0.794) |
| Role-init throws | **0 / 44** |

**PASS (36):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 49495/59178 | 577/714 | @#815; prefix @49039 D-0708 |
| seed0399 | 10389/11409 | 113/532 | @#815; stuck @10157 D-0731 |
| seed5002 | 5980/12167 | 154/410 | coverage pair |

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

**Leaderboard 22-vs-36 gap** — local PASS includes seed0108 + seed0116 +
seed5006 + seed0398 + seed0373 + seed0361 + seed0367; judge at 08:55Z
dropped to **22** after D-0480 (seed0013-rogue 59→58). **D-0483** reverts
that serialize coerce. Next cron; if seed0013 restored but near-misses
remain → upstream #5.

**Gameplay next:** seed0399 @10157 black unicorn `mfndpos` cnt 7 vs 5
(D-0731 — #814/#815: onscary/garlic/bars/gas+mconf ported, still
cnt=7; need C-state omit); or seed0014 @49039 mfndpos (D-0708);
or coverage. Prefer shared blockers. Do **not** re-break
D-0660…D-0731.

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0399-wizard-hallu-actions.session.json
```

**Do not re-break D-0660…D-0731.**

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + **seed0367** + **seed0108** + strict lengths.

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
