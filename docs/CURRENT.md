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

Score last measured: **2026-07-20** — full `sessions` @**#1070** (42/44,
Scr **10233**/11405, RNG **94.13%**) after D-0919. Next cadence @**#1075**.
#1070 D-0919: seed4500 **61462→61689** (`nh_timeout` FAST TIMEOUT).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,233 / 11,405** |
| Positional RNG calls matched | **746,329 / 792,838** (94.13%) |
| Speed label | `32+0.24/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, **seed2600**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed4500 | 86800/108275 | 755/1814 | knight; @82793 steal invent |

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
seed0360 + seed0399 + seed0014 + **seed2600**; judge at 08:55Z dropped to
**22** after D-0480. **D-0483** reverts serialize coerce. Next cron;
if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** **seed4500** @82793 — C `steal` `rn2(23)` vs JS
  `rn2(22)` (weighted invent off-by-one after D-0922). Focused:
`node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

**Parked gameplay:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0922. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0922 (Hallu dochug … wakeup `wake_nearto`).
**Do not:** FORCE mfndpos omit (#1008); WEB-unique omit (#1004);
mon_track_clear alone (D-0860); stub poisoned rn2(30)-only (D-0869);
raw +N obj burns (D-0847); hliquid identity (D-0849); post-docrt
vision_recalc in goto_level (D-0851); omit LANDMINE/minetn-3/watch/
dipfountain/chest_shatter/addinv/yn wrap/short_oname/ID reconcile/
armoroff find_ac/steal ring pline/rloc flags/seduce msgs/cream pie
`The`/safemon/launch_obj flash/unhideable_trap/unweapon/setgemprobs/
dryup/Temple themes/bigrm-9/BIND=/setworn armor/#jump/spitmm…hellfill/
learn occupation/SCR_PUNISHMENT/drag_ball/#turn/`x`/knox portal/
unplacebc/Nesting/fill_ordinary_room/drag_down/FAST TIMEOUT/
TROUBLE_HIT/minetn-4 book shop/wakeup wake_nearto (D-0874…D-0922).

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
