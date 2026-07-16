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

Score last measured: **2026-07-16** — full `sessions` suite (loop **#600**),
post D-0540. Screens **5900**/11405; RNG **337400**/792838 (42.56%).
**30/44** PASS. Speed `31+0.15/turn` (R² 0.74). Δ vs #595: Scr 0,
RNG +7068 (D-0539…D-0540 peels), PASS unchanged.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **30 / 44** |
| Screens matched | **5,900 / 11,405** |
| Positional RNG calls matched | **337,400 / 792,838** (42.56%) |
| Speed label | `31+0.15/turn` (R² 0.74) |
| Role-init throws | **0 / 44** |

**PASS (30):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed0116 | 12562/12562 | **110**/127 | D-0524 RNG full; screen residual |
| seed5006 | 8508/13923 | **121**/249 | D-0515; next `dosounds` @8468 |
| seed0373 | 19086/35386 | 22/124 | D-0540; next `m_initweap` is_elf @19071 |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0361/0367 | early | 0 | quest / `makemaz` (menu) |

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

**Leaderboard 22-vs-30 gap** — local PASS includes seed0398; judge at 08:55Z
dropped to **22** after D-0480 (seed0013-rogue 59→58). **D-0483** reverts
that serialize coerce. Next cron; if seed0013 restored but near-misses
remain → upstream #5.

**Gameplay next:** after D-0541 (`is_elf` kit), seed0373 @21730 C
`m_initinv` S_QUANTMECH `rn2(20)` vs JS trailing `rn2(50)`. Or peel
seed5006 `dosounds` @8468. Prefer over parked seed2200 RC / seed0116
screen residual.

```bash
node scripts/rng-diff.mjs sessions/seed0373-barbarian-quest-tour.session.json
node scripts/rng-diff.mjs sessions/seed5006-tourist-stress-disaster.session.json
node frozen/ps_test_runner.mjs sessions/seed0116-wizard-wear-shop.session.json
```

**Prefer over:** parked D-0006, seed2200 RC; re-opening D-0474…D-0541.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + strict lengths.

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
