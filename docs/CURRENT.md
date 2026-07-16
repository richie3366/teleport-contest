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

Score last measured: **2026-07-16** — full `sessions` suite (#480 score
cadence). Screens **4620**/11405; RNG **277634**/792838. **26/44** PASS.
Speed `23+0.13/turn`. Δ vs #475: Scr +64, RNG +6646 (D-0443…D-0446 peels).
Focused D-0447 peel: seed0002 Scr **311→313**, RNG matched **19428→20315**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **26 / 44** |
| Screens matched | **4620 / 11,405** (40.51%) |
| Positional RNG calls matched | **277,634 / 792,838** (35.02%) |
| Speed label | `23+0.13/turn` (R² 0.77) |
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
| seed0002 | 20315/27158 | **313**/595 | @19167 next_ident (D-0448) |
| seed0006 | 2276/6736 | **13**/123 | water demon |
| seed0007 | 2939/16373 | **20**/302 | snake swamp |
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

**seed0002 @19167 — `next_ident` rnd(2)** (D-0448). Prefix **19167**;
Scr **313**/595. After D-0447 shop bill: C `rnd(2)` @ `next_ident`
vs JS `rn2(7)` (locus TBD).

```bash
node frozen/ps_test_runner.mjs sessions/seed0002-healer-reflection-drummer.session.json
node scripts/rng-diff.mjs sessions/seed0002-healer-reflection-drummer.session.json
# Focus: C caller of next_ident after moveloop rn2(61); find JS rn2(7)
```

**Alternates:** seed0006 / seed0007; quest early-0 (seed0361/0373).

**Prefer over:** parked D-0006, seed2200 RC; re-opening D-0430–D-0447;
treating @19167 as monmove without object/mon creation proof.

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
