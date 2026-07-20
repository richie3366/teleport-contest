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

Score last measured: **2026-07-20** — full `sessions` suite (loop **#1005**).
Screens **9021**/11405; RNG **666,643**/792838 (84.08%). **39/44** PASS.
Δ vs #1000: Scr **+10**, RNG **0**, PASS **+1** (seed0383). Speed
`33+0.23/turn` (R² 0.825). Next full refresh due at loop **#1010**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **39 / 44** |
| Screens matched | **9,021 / 11,405** |
| Positional RNG calls matched | **666,643 / 792,838** (84.08%) |
| Speed label | `33+0.23/turn` (R² 0.825) |
| Role-init throws | **0 / 44** |

**PASS (39):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed0014 | 50419/59178 | 580/714 | prefix @50259 |
| seed0399 | 10401/11409 | 113/532 | stuck ~@10157 D-0731 |
| seed2600 | 418/11647 | 3/38 | custom binds |
| seed4500 | 3076/108275 | 19/1814 | knight coverage |

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
seed0360; judge at 08:55Z dropped to **22** after D-0480
(seed0013-rogue 59→58). **D-0483** reverts that serialize coerce.
Next cron; if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** **seed0399 @10157** (D-0731 mfndpos) — #1006: unicorn
@58,12 cnt7 j=0; (57,12) MON_AT; D-0860 monflee track-clear inert
(!mflee). FORCE any keep-track 2-omit→10217; need **C-state which 2
cells**. Alt: seed0014 @50259 (D-0708). Focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0399-wizard-hallu-actions.session.json
```

**Parked gameplay:** seed0014 @50259 (D-0708 still open).

**Do not re-break D-0660…D-0858. Do not FORCE CLOSE/movement/umov.**
**Do not FORCE peace_minded / ualign / pet malign.**
**Do not re-apply gulpmu flush_topl_more alone (D-0841; #996 pair OK).**
**Do not restore dochug NOTHING/DONE Hallu newsym as a raw glyph hack
without the post-distfleeck order (D-0845 @172 Scr−2; D-0853 is the
C-ordered port — keep it).**
**Do not revert rloc_to newsym (D-0846) — required for flush path.**
**Do not drop `-DMAIL_STRUCTURES` from `extract-objects.py` (D-0848).**
**Do not “fix” objs with raw +N display burns (D-0847 falsified).**
**Do not reorder docrt/swallowed cls+bot without C-like nonblocking
WIN_MESSAGE flush (#983 → RNG 11527).**
**Do not stub `hliquid` as identity (D-0849).**
**Do not drop tame `xkilled` `x_monnam(..., "poor", ...)` (D-0850).**
**Do not re-add post-`docrt` `vision_recalc(0)` in `goto_level` (D-0851).**
**Do not skip `select_menu_pick_one` redraw on picks (Scr−2; #988/#989);
use `dismiss_nhw_menu` (fullscreen docrt / corner gbuf-flush) — D-0857.**
**Do not add Hallu `vision_off` in gulpmu alone (#993 Scr 174).**
**Do not add gulpmu warn-only `~drn2(5)` burns alone (#994 Scr 174).**
**Do not remove gulpmu flush+vision_off pair (#996 Scr+5).**
**Do not remove D-0853 dochug Hallu idle newsym (#997 LCP+2).**
**Do not expect distfleeck→monflee to fix LCP 555 (D-0854 falsified).**
**Do not drop D-0855 m_dowear_type nambuf Monnam/mon_nam.**
**Do not drop D-0856 invent `obj_glyph` Hallu burns.**
**Do not always-docrt corner NHW_MENU dismiss (D-0857; Scr−6).**
**Do not drop doattributes Hallu Status / Antimagic Attributes (D-0858).**
**Do not FORCE-omit mfndpos cells for D-0731 without C-state pair ID.**
**Do not re-check WEB-unique omit (#1004: any keep-track pair →10217).**
**Do not expect monflee mon_track_clear alone to fix @10157 (D-0860).**

**Cohort after shared change:** green gate + seed1500 + seed1800 + seed0060 +
seed0102 + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 + seed0200 + seed0101 + seed0103 + seed0104 +
seed0030 + seed0013-rogue + seed0013-friday13-restore + seed0107 +
**seed0009** + **seed0012** + **seed0004** + **seed0002** + **seed0006** +
**seed0007** + **seed0398** (must stay PASS) + **seed0373** + **seed5006** +
**seed0116** + **seed0361** + **seed0367** + **seed0108** + **seed5002** +
**seed0360** + strict lengths.

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
