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
label, PASS list, and notable non-PASS. Do not invent suite totals from a single
focused session.

Score last measured: **2026-07-20** — full `sessions` suite (loop **#950**).
Screens **8938**/11405; RNG **660,393**/792838 (83.29%). **38/44** PASS.
Δ vs #945: Scr **+1**, RNG **+627**, PASS **0**. Speed `36+0.22/turn`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **38 / 44** |
| Screens matched | **8,938 / 11,405** |
| Positional RNG calls matched | **660,393 / 792,838** (83.29%) |
| Speed label | `36+0.22/turn` (R² 0.774) |
| Role-init throws | **0 / 44** |

**PASS (38):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed0383 | 10762/16915 | **142**/219 | still @10374 gnome skip; RNG +38 vs #950 via D-0827 |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 50419/59178 | 580/714 | prefix @50259 |
| seed0399 | 10389/11409 | 113/532 | stuck @10157 D-0731 |
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

**Leaderboard 22-vs-38 gap** — local PASS includes seed0108 + seed0116 +
seed5006 + seed0398 + seed0373 + seed0361 + seed0367 + seed5002 +
seed0360; judge at 08:55Z dropped to **22** after D-0480
(seed0013-rogue 59→58). **D-0483** reverts that serialize coerce.
Next cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** **seed0383 @10374** — hero swallowed by ice-vortex;
after EE fleeck×2, C vortex `mattacku` (`AC_VALUE`/`rnd(2)`); JS
gnome@46,2 fleeck×2 then vortex. **#953 falsified** makemon
creation/reorder (same spawn + `mcalcmove` +12). Next: why C skips
gnome `dochug` with no RNG (pre-dochug gate / C-state).
Focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0383-wizard-hallucinate.session.json
node scripts/rng-diff.mjs \
  sessions/seed0383-wizard-hallucinate.session.json
```

**Parked gameplay:** seed0399 @10157 (D-0731) / seed0014 @50259
(D-0708 still open).

**Do not re-break D-0660…D-0828. Do not FORCE CLOSE/movement/umov.**

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + **seed0367** + **seed0108** + **seed5002** +
**seed0360** + strict lengths.

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
