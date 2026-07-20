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

Score last measured: **2026-07-20** — full `sessions` suite (loop **#985**).
Screens **8986**/11405; RNG **666,582**/792838 (84.08%). **38/44** PASS.
Δ vs #980: Scr **+10**, RNG **−18**, PASS **0**. Speed `33+0.23/turn`.
*(Scr +10 = seed0383 174→184 after D-0848 `MAIL_STRUCTURES`/`SCR_MAIL`;
RNG −18 = seed0399 10358→10340.)*

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **38 / 44** |
| Screens matched | **8,986 / 11,405** |
| Positional RNG calls matched | **666,582 / 792,838** (84.08%) |
| Speed label | `33+0.23/turn` (R² 0.830) |
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
| seed0383 | **16915**/16915 | **184**/219 | RNG FULL; Scr +10 (D-0848); miss @184 |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 50419/59178 | 580/714 | prefix @50259 |
| seed0399 | 10340/11409 | 113/532 | −18 vs #980; stuck ~@10157 D-0731 |
| seed2600 | 418/11647 | 3/38 | custom binds |
| seed4500 | 3076/108275 | 19/1814 | knight coverage |

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

**Gameplay next:** **seed0383 Scr 194/219** after D-0850 `xkilled`
tame `x_monnam(..., "poor", ...)` (@178). Flush still parked @141–174.
Next content: **@195 Hallu map** after level materialize. Focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0383-wizard-hallucinate.session.json
```

**Parked gameplay:** seed0399 @10157 (D-0731; mild −18 from D-0848) /
seed0014 @50259 (D-0708 still open).

**Do not re-break D-0660…D-0850. Do not FORCE CLOSE/movement/umov.**
**Do not FORCE peace_minded / ualign / pet malign.**
**Do not re-apply gulpmu flush_topl_more without fixing remaining
seed0383 screens (D-0841/D-0843/D-0846).**
**Do not restore dochug NOTHING/DONE Hallu newsym as glyph “fix”
(D-0845 falsified — Scr regresses).**
**Do not revert rloc_to newsym (D-0846) — required for flush path.**
**Do not drop `-DMAIL_STRUCTURES` from `extract-objects.py` (D-0848).**
**Do not “fix” objs with raw +N display burns (D-0847 falsified).**
**Do not reorder docrt/swallowed cls+bot without C-like nonblocking
WIN_MESSAGE flush (#983 → RNG 11527).**
**Do not stub `hliquid` as identity (D-0849).**
**Do not drop tame `xkilled` `x_monnam(..., "poor", ...)` (D-0850).**

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
