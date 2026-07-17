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

Score last measured: **2026-07-17** — full `sessions` suite (loop **#680**),
pre D-0610 handoff. Screens **6616**/11405; RNG **377869**/792838 (47.66%).
**33/44** PASS. Δ vs #675: Scr **+9**, RNG **+3380**, PASS unchanged.
(D-0610 after suite: seed0361 prefix **22084**, Scr **225**, RNG **22261**.)

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **33 / 44** |
| Screens matched | **6,616 / 11,405** |
| Positional RNG calls matched | **377,869 / 792,838** (47.66%) |
| Speed label | `33+0.16/turn` (R² 0.779) |
| Role-init throws | **0 / 44** |

**PASS (33):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0361 | 22261/53865 | 225/366 | next @22084 spec_abon / hitum |
| seed0367 | 2053/50125 | 75/324 | quest / `Pri-strt` |
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

**Leaderboard 22-vs-33 gap** — local PASS includes seed0116 + seed5006 +
seed0398 + seed0373; judge at 08:55Z dropped to **22** after D-0480
(seed0013-rogue 59→58). **D-0483** reverts that serialize coerce. Next
cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** seed0361 @22084 — D-0610 shipped `m_move` cnt==0
`find_defensive(TRUE)` + healing `use_defensive`/`precheck` milky
(prefix **22042→22084**, Scr **225**, RNG **22261**). Next C `rnd(5)` @
`spec_abon` vs JS `rnd(20)` (artifact hit path / `hitum`). Or seed0367
`Pri-strt` (~@2053), or seed0014/0108. Prefer over parked D-0006 /
seed2200 RC; do not reopen D-0474…D-0610 shipped.

```bash
node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json
# or
node frozen/ps_test_runner.mjs \
  sessions/seed0361-archeologist-tour.session.json
```

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + strict lengths.

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
