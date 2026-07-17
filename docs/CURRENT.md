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

Score last measured: **2026-07-17** — full `sessions` suite (loop **#735**).
Screens **6959**/11405; RNG **465040**/792838 (58.66%). **34/44** PASS.
Δ vs #730: Scr **+30**, RNG **+14553**, PASS **+0**. Focused #736–38
(not score cadence): seed0367 Scr **205→245**/324 (prefix **148→185**;
D-0662…D-0665) — suite aggregates unchanged until **#740**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **34 / 44** |
| Screens matched | **6,959 / 11,405** |
| Positional RNG calls matched | **465,040 / 792,838** (58.66%) |
| Speed label | `34+0.16/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**PASS (34):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0367 | **50125**/50125 | **245**/324 | RNG FULL; screen peel @185 |
| seed0014 | 1435/59178 | 10/714 | early FAIL |
| seed0108 | 2793/16958 | 17/303 | wishlist / extcmd |

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

**Leaderboard 22-vs-34 gap** — local PASS includes seed0116 + seed5006 +
seed0398 + seed0373 + seed0361; judge at 08:55Z dropped to **22** after
D-0480 (seed0013-rogue 59→58). **D-0483** reverts that serialize coerce.
Next cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** seed0367 screen peel — RNG **FULL**; Scr **245**/324
(cursors 317/324; prefix **185**). **D-0665** TREE `"tree"` cleared @155.

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0367-priest-quest-tour.session.json
```

**Next falsifier / fix:** @185 altar DEC `{` — C color1+decgfx vs JS
NO_COLOR/`decgfx=0` (materialize map). Do not re-break D-0660…D-0665.

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + strict lengths.

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
