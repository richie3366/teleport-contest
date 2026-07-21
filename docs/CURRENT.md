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

Score last measured: **2026-07-21** — full `sessions` @**#1155** (38/44,
Scr **10974**/11405, RNG **100%**). Next cadence @**#1160**.
vs @#1150: Scr **10737→10974** (seed4500 #1151–54) but PASS **42→38**
— four near-misses from #1151 pager overlay topline (D-0929).
Speed `29+0.25/turn`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **38 / 44** |
| Screens matched | **10,974 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `29+0.25/turn` (R² 0.862) |
| Role-init throws | **0 / 44** |

**PASS (38):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0383, seed0399, seed0014, **seed2600**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed0006 | 6736/6736 | **121**/123 | near-miss; #1151 pager (D-0929) |
| seed0007 | 16373/16373 | **301**/302 | near-miss; #1151 pager (D-0929) |
| seed0009 | 3713/3713 | **72**/73 | near-miss; #1151 pager (D-0929) |
| seed0360 | 120639/120639 | **832**/833 | near-miss; #1151 pager (D-0929) |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed4500 | **108275**/108275 | 1389/1814 | knight; RNG done; @893 overview |

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

**Suite restore (D-0929) first** — #1151 `show_nhw_menu_text` overlay
kept/restored `_pending_message` for *all* corner menus; breaks
seed0006/0007/0009/0360. Revert pager→those PASS but seed4500
**1389→1381**. Narrow to look_here/getpos leftover; keep teleds
placebc. Focused:
`node frozen/ps_test_runner.mjs sessions/seed0009-swimmer-mforce.session.json`
(+ seed0006/0007/0360 + seed4500 Scr≥1389).

**Leaderboard 22-vs-38 gap** — local was 42 (seed0108…**seed2600**);
now **38**/44 until D-0929. Judge **22** after D-0480; D-0483 serialize
revert. Next cron → upstream #5 if seed0013 restored but near-misses.

**After restore:** seed4500 @**893** `#overview` `Level 3:` vs
`Level 25:` (RNG **108275**/108275; Scr **1389**/1814). Focused:
`node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

**Parked:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0929. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1154; teleds placebc (#1151).
**Do not:** blanket-revert #1151 pager; FORCE mfndpos/WEB; raw RNG
gates; invent splice; omit breamm/blnd/F-prefix; FORCE linedup/flip;
inediate FOOD reject; omit mfind0/wizwhere/break_armor/
carrying_too_much. Recent rejects: @832≠dig-depth (#1154 depth);
@831≠getpos (#1153 maybe_wail); @814≠display (#1152 mkstairs);
@789≠stairs look alone (#1151 teleds+overlay); older in D-0928/NOTES.

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
