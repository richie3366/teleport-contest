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

Score last measured: **2026-07-19** — full `sessions` suite (loop **#845**,
post D-0749). Screens **8212**/11405; RNG **568,288**/792838 (71.68%).
**37/44** PASS. Δ vs #835: Scr **+7**, RNG **+28,971**, PASS **0**
(seed0360 D-0744…D-0749 prefix lift; suite RNG 539k→568k).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **37 / 44** |
| Screens matched | **8,212 / 11,405** |
| Positional RNG calls matched | **568,288 / 792,838** (71.68%) |
| Speed label | `39+0.20/turn` (R² 0.793) |
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
| seed0014 | 49495/59178 | 577/714 | @#845; prefix @49039 D-0708 |
| seed0399 | 10389/11409 | 113/532 | @#845; stuck @10157 D-0731 |
| seed0360 | 37686/120639 | 207/833 | @#845; next lua shuffle @37668 |
| seed0383 | 2512/16915 | 45/219 | hallu |
| seed2600 | 418/11647 | 3/38 | custom binds |
| seed4500 | 3013/108275 | 13/1814 | knight coverage |

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

**Gameplay next:** **seed0360 @41777** after D-0753 maybe_generate rate —
C `nhlib.lua` shuffle `rn2(3)` vs JS `rn2(79)` (post matched
`getbones`+`makemaz` `rnd(7)`; C then `splev_initlev`). Next Gehennom
special/lua after sanctum. Prefer over D-0731/D-0708 mfndpos.
Do **not** re-break D-0660…D-0753.

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0360-wizard-world-tour.session.json
# @41777 C nhlib.lua shuffle rn2(3) vs JS rn2(79)
node scripts/rng-diff.mjs \
  sessions/seed0360-wizard-world-tour.session.json
```

**Parked gameplay:** seed0399 @10157 (D-0731) / seed0014 @49039 (D-0708)
— need C-state which mfndpos cells drop.

**Do not re-break D-0660…D-0753.**

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
