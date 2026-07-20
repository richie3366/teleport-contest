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

Score last measured: **2026-07-20** — full `sessions` suite (loop **#1035**,
cadence). Screens **9493**/11405; RNG **676,373**/792838 (85.31%).
**40/44** PASS. Next cadence @**#1040**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **40 / 44** |
| Screens matched | **9,493 / 11,405** |
| Positional RNG calls matched | **676,373 / 792,838** (85.31%) |
| Speed label | `32+0.23/turn` (R² 0.833) |
| Role-init throws | **0 / 44** |

**PASS (40):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed0014 | **59178**/59178 | **633**/714 | RNG FULL; next @415 take-off AC botl |
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed2600 | 418/11647 | 3/38 | custom binds |
| seed4500 | 3039/108275 | 19/1814 | knight coverage |

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
seed0360 + **seed0399**; judge at 08:55Z dropped to **22** after D-0480
(seed0013-rogue 59→58). **D-0483** reverts that serialize coerce.
Next cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** **seed0014 Scr 633/714** — RNG closed (D-0877);
D-0881 short_oname @388. **D-0882** restores seed0007 (merged coin order).
First miss @415 take-off +3 shield — topline ok, botl **AC:10** (C) vs
**AC:14** (JS). Then nymph steal wording @416–417. Focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0014-dequa-fountain-explore.session.json
```

**Parked gameplay:** none beyond D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0882. Do not FORCE CLOSE/movement/umov.**
**Do not FORCE peace_minded / ualign / pet malign.**
**Keep:** D-0845/0853 dochug Hallu order; D-0846 rloc_to newsym;
D-0848 `-DMAIL_STRUCTURES`; D-0852 gulpmu flush+vision_off pair;
D-0857 corner dismiss; D-0858 doattributes Hallu/Antimagic;
D-0861…D-0882 (searches_for_item … merged coin order).
**Do not:** FORCE mfndpos omit (#1008); WEB-unique omit (#1004);
mon_track_clear alone (D-0860); stub poisoned rn2(30)-only (D-0869);
raw +N obj burns (D-0847); hliquid identity (D-0849); post-docrt
vision_recalc in goto_level (D-0851); omit LANDMINE selector (D-0874);
omit minetn-3 load_special (D-0875); omit watch_on_duty/has_town (D-0876);
omit dipfountain case 28 bath/somegold (D-0877);
omit chest_shatter Blind/`singular`/PAPER=5 (D-0878);
omit addinv known/bknown/rknown compare pline (D-0879);
omit yn_function `topl_wrap_echo` hard-wrap (D-0880);
omit `short_oname` on `#dip` fountain yn (D-0881);
reorder merged ID reconcile before coin `bknown=0` (D-0882).

**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + strict lengths.

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
