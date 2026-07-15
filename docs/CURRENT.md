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

Score last measured: **2026-07-16** — full `sessions` suite (#460 score
cadence). Screens **4363**/11405 (unchanged vs #458); RNG **262922**/792838
(+1 vs #458). **26/44** PASS (unchanged). Speed `24+0.13/turn`.
(#462 focused seed0002 Scr 99→126 / prefix 6186→6954 — full suite not re-run.)

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **26 / 44** |
| Screens matched | **4363 / 11,405** (38.26%) |
| Positional RNG calls matched | **262,922 / 792,838** (33.16%) |
| Speed label | `24+0.13/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**PASS (26):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104, seed0030,
seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0002 | 7649/27158 | **126**/595 | @6954 remove-curse (was @6186) |
| seed0006 | 2278/6736 | **13**/123 | water demon |
| seed0007 | 2941/16373 | **20**/302 | snake swamp |
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

**seed0002 @6954 — `SCR_REMOVE_CURSE` / `seffect_remove_curse`** (after
D-0431 light). Prefix **6954**; Scr **126**/595. C `rn2(19) @ exercise`
on read scroll `v` (“someone is helping you”) vs JS `rn2(5)` (turn
skipped → next-key fleeck). Do not re-open @6186 light (fixed).

```bash
node frozen/ps_test_runner.mjs sessions/seed0002-healer-reflection-drummer.session.json
node scripts/rng-diff.mjs sessions/seed0002-healer-reflection-drummer.session.json
# Focus: C seffect_remove_curse / exercise vs JS rn2(5) at 6954
```

**Alternates:** seed0006 / seed0007; quest early-0 (seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; re-opening D-0430/D-0431.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** (must stay PASS) + strict lengths.

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
