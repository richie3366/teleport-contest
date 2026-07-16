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

Score last measured: **2026-07-16** — full `sessions` suite (loop **#545**).
Screens **5054**/11405; RNG **294730**/792838 (37.17%).
**28/44** PASS. Speed `24+0.13/turn`. Δ vs #540: Scr **+40**, PASS **28→28**,
RNG **+4921** (+0.62pp); absorbs D-0488/D-0489 seed0007 peels (Scr 20→60).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **28 / 44** |
| Screens matched | **5,054 / 11,405** |
| Positional RNG calls matched | **294,730 / 792,838** (37.17%) |
| Speed label | `24+0.13/turn` (R² 0.75) |
| Role-init throws | **0 / 44** |

**PASS (28):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, **seed0006**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0007 | 7885/16373 | **60**/302 | snake swamp; RNG peel @7142 obj_resists |
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

**Leaderboard 22-vs-28 gap** — local PASS includes seed0002/0004/0012/0030
(+seed0006); judge at 08:55Z dropped to **22** after D-0480 (seed0013-rogue
59→58). **D-0483** reverts that serialize coerce. Next cron; if seed0013
restored but four near-misses remain → upstream #5.

**Gameplay next:** seed0007 rogue snake swamp — **D-0489** fixed (RNG
prefix **7066→7142**, matched **7309→7885**): `#loot` locked chest →
`do_loot_cont`/`pick_lock` box occupation. **D-0490** (open): @7142 C
`rn2(100) @ obj_resists` vs JS `rn2(1)` — after box unlock.

```bash
node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
node frozen/ps_test_runner.mjs sessions/seed0007-rogue-snake-swamp.session.json
```

**Alternates:** quest early-0 (seed0361/0373); seed0108 wishlist.

**Prefer over:** parked D-0006, seed2200 RC; re-opening D-0474…D-0489.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006**
(must stay PASS) + strict lengths.

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
