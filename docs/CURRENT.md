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

Score last measured: **2026-07-18** — full `sessions` suite (loop **#755**).
Screens **7111**/11405; RNG **467265**/792838 (58.94%). **35/44** PASS.
Δ vs #750: +1 PASS (seed0367), Scr +43, RNG +2225 (D-0677/D-0678 peels).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **35 / 44** |
| Screens matched | **7,111 / 11,405** |
| Positional RNG calls matched | **467,265 / 792,838** (58.94%) |
| Speed label | `35+0.16/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**PASS (35):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 6835/59178 | 154/714 | prefix @6294 `exercise` vs `rn2(5)` |
| seed0108 | 2793/16958 | 17/303 | wishlist / extcmd |
| seed0399 | 10232/11409 | 113/532 | hallu actions |
| seed5002 | 5919/12167 | 154/410 | coverage pair |

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

**Leaderboard 22-vs-35 gap** — local PASS includes seed0116 + seed5006 +
seed0398 + seed0373 + seed0361 + seed0367; judge at 08:55Z dropped to
**22** after D-0480 (seed0013-rogue 59→58). **D-0483** reverts that
serialize coerce. Next cron; if seed0013 restored but near-misses remain
→ upstream #5.

**Gameplay next:** seed0014 after D-0679 forcelock/supply — first mismatch
@6294 C `exercise` vs JS `rn2(5)`. Or seed0108 wishlist @2772
`rnd_otyp_by_namedesc`. Prefer shared blockers. seed2200 @158 parked.

```bash
node scripts/rng-diff.mjs \
  sessions/seed0014-dequa-fountain-explore.session.json
```

**Do not re-break D-0660…D-0679.**

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + **seed0367** + strict lengths.

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
