# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

Score last measured: **2026-07-14** via focused seed0030 + green/cohort;
full `sessions` suite not re-run this iteration. PASS set unchanged;
seed0030 seg9 isolation **17104**/17104 after D-0278 (positional
**48194**/105529 Scr 85/1953).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **19 / 44** |
| Screens matched | **1563 / 11,405** (13.70%) |
| Positional RNG calls matched | **182,709 / 792,838** (prior suite; seg9 full) |
| Speed label | `18+0.10/turn` |
| Role-init throws | **0 / 44** |

**PASS (19):** seed8000, seed0900, seed1500, seed1800, seed0060, seed0102,
seed0700, seed1150, seed0017, seed0077, seed0106, seed0501, seed0105,
seed0016, seed0015, seed0200, seed0101, seed0103, seed0104.

**Notable non-PASS:** seed2200 RNG full Scr 229/230 (parked RC @158);
seed0013 RNG full Scr 57/59; seed0030 **48194**/105529 Scr 85/1953;
seed0107 2684/2902 Scr 36/98; seed0361/0373 quest bones blocked.

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

**D-0278 follow-on** — seed0030 seg4 trailing `rn2(1)` after knockback

| | |
|--|--|
| **C locus** | end of seg4 turn — C stops at `mhitm_knockback` `rn2(6)`; JS emits one extra `rn2(1)=0` |
| **JS locus** | post-`mhitm_knockback` caller (likely uhitm/mhitm fall-through) |
| **Symptom** | seg4 JS len 8032 vs C 8031 → cross-seg positional skew |
| **Hypothesis** | JS continues past C’s recorded death/end boundary or burns an unguarded `rn2(1)` |
| **Falsifier** | attribute the `rn2(1)` site (caller + C short-circuit that skips it) |
| **Recent fixed** | D-0278 — `dochug`→`disturb` wake path (seg9 16836→**17104**/17104) |

```bash
# Focused seg9 (still exercise disturb) + full seed0030
node frozen/ps_test_runner.mjs sessions/seed0030-ten-diverse-deaths.session.json
```

**Prefer over:** quest bones (`^V`/`makemaz`), parked D-0006, seed2200 RC.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104
(must stay PASS) + strict lengths. Full `sessions` after foundation milestones.

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
Append journal; add divergence entry + index row; update one C-JS-MAP section.
Do **not** re-expand completed D-lists into this file.
