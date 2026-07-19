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

Score last measured: **2026-07-19** — full `sessions` suite (loop **#905**,
cadence). Screens **8397**/11405; RNG **643,108**/792838 (81.11%).
**37/44** PASS. Δ vs #900: Scr **0**, RNG **+1,961**, PASS **0** (peels
D-0786…D-0789 landed in suite totals; seed0360 suite RNG still **111566**).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **37 / 44** |
| Screens matched | **8,397 / 11,405** |
| Positional RNG calls matched | **643,108 / 792,838** (81.11%) |
| Speed label | `36+0.21/turn` (R² 0.801) |
| Role-init throws | **0 / 44** |

**PASS (37):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, **seed5002**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 50419/59178 | 578/714 | prefix @50259 |
| seed0399 | 10389/11409 | 113/532 | stuck @10157 D-0731 |
| seed0360 | 111566/120639 | 391/833 | @110880 (#905 D-0790) |
| seed0383 | 2512/16915 | 45/219 | hallu |
| seed2600 | 418/11647 | 3/38 | custom binds |
| seed4500 | 3029/108275 | 13/1814 | knight coverage |

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

**Leaderboard 22-vs-37 gap** — local PASS includes seed0108 + seed0116 +
seed5006 + seed0398 + seed0373 + seed0361 + seed0367 + **seed5002**;
judge at 08:55Z dropped to **22** after D-0480 (seed0013-rogue 59→58).
**D-0483** reverts that serialize coerce. Next cron; if seed0013 restored
but near-misses remain → upstream #5.

**Gameplay next:** **seed0360 @110880 / D-0790** — symptom is track
`rn2(28)` vs `rn2(5)`, but root is earlier: bat@12,18 appr=0 selects
11,18 then **C does not place** (JS does). FORCE no-place → prefix
**110880→112243**. Find C post-select early-return (aggress / MDISP /
`m_in_out_region` / …). Parked D-0731.

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0360-wizard-world-tour.session.json
# @110612 bat appr=0 chose 11,18 — C must not place (D-0790)
node scripts/rng-diff.mjs \
  sessions/seed0360-wizard-world-tour.session.json
```

**Parked gameplay:** seed0399 @10157 (D-0731) / seed0014 @50259
(D-0708 still open; peel advanced with D-0784…D-0789).

**Do not re-break D-0660…D-0789.**

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + **seed0367** + **seed0108** + **seed5002** +
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
