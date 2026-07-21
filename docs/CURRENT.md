# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (`iteration-count % 5 == 0`), run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-07-21** — full `sessions` @**#1156** (42/44,
Scr **10979**/11405, RNG **100%**). Next cadence @**#1160**.
vs @#1155: PASS **38→42** (D-0929 look_here-only overlay leftover);
Scr **10974→10979**. Speed `33+0.26/turn`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,979 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `33+0.26/turn` (R² 0.849) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0009, seed0012, seed0004, seed0002, seed0006, seed0007, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, **seed2600**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed4500 | **108275**/108275 | 1409/1814 | knight; RNG done; @929 climb |

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

**seed4500 @929** C `With great effort, you climb up the
stairs.--More--` vs JS already on Dlvl:6 staircase-down topline
(RNG **108275**/108275; Scr **1409**/1814; prefix **@902→@929**).
Focused:
`node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

**Leaderboard 22-vs-42 gap** — local **42**/44 (D-0929 restored
seed0006/0007/0009/0360). Judge **22** after D-0480; D-0483 serialize
revert. Next cron → upstream #5 if seed0013 restored.

**Parked:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0929. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1158; teleds placebc (#1151);
D-0929 look_here-only `keep_message_leftover` (not blanket corner).
**Do not:** blanket corner restore; FORCE mfndpos/WEB; raw RNG
gates; invent splice; omit breamm/blnd/F-prefix; FORCE linedup/flip;
inediate FOOD reject; omit mfind0/wizwhere/break_armor/
carrying_too_much. Recent rejects: @902≠pool/`~` — was
`S_engroom` after `#wizmap` (#1158); @893≠interest_filter alone
(#1157); @832≠dig-depth (#1154); @831≠getpos (#1153); @814≠display
(#1152); older in D-0928/NOTES.

**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| seed2200 @158 | RC/`$HOME` harness path, not a port bug |

## Pointers (open only if needed)

| Need | File |
|------|------|
| Live hypothesis / don’t-recheck | `NOTES.md` |
| Divergence by ID | `DIVERGENCE-INDEX.md` → one `## D-NNNN` |
| Subsystem omissions | `C-JS-MAP.md` → one `c-js-map/*.md` |
| Latest loop crumbs | `AGENT-LOOP-JOURNAL.md` (tail only) |
| Score/objective history | `archive/PROGRESS-HISTORY.md` |

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
