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

Score last measured: **2026-07-21** — full `sessions` @**#1130** (42/44,
Scr **10531**/11405, RNG **99.90%**). Next cadence @**#1135**.
vs @#1125: Scr **10529→10531**, RNG **791421→792061** (#1129–#1130;
seed4500 **107335→107498** Scr **941**). Focused #1131–#1132 seed4500
still **107645** RNG **107645** Scr **939** (getbones blocked by
`unmul` more keystream).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,531 / 11,405** |
| Positional RNG calls matched | **792,061 / 792,838** (99.90%) |
| Speed label | `30+0.25/turn` (R² 0.867) |
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
| seed4500 | 107645/108275 | 939/1814 | knight; @**107645** JS early end — `unmul` `more()` ate `^V` |

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

**Gameplay next:** **seed4500** @**107645** (D-0928). Symptom still
C `getbones` `rn2(3)` vs JS missing. #1132: cause is **keystream** —
`unmul` pline survived → `more()` eats `^V ? \n` while NEED_MORE holds
`"The xan pricks your right leg!"` (30+3+42≥CO−8). Shipped C-faithful
`update_topl` You-die `skip=FALSE` + `yn_function` clear WIN_STOP;
prefix unchanged. Next: why JS has that NEED_MORE at unmul when C's
1794 shows survived with SP still available for ^V menu (`hitmsg`
more@107426 vs C Die? ESC?).
Focused:
`node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

**Parked gameplay:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0928. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1132 (bat MFAST … topl WIN_STOP).
**Do not:** FORCE mfndpos/WEB; raw RNG gates; re-add invent splice;
omit breamm/blnd/F-prefix; FORCE linedup/flip; ship inediate FOOD
reject; omit mfind0/wizwhere/break_armor/carrying_too_much. Rejected:
@107645≠missing getbones site alone — `unmul` more ate ^V (#1132);
@107470≠rn2(3) site — missing `mhitm_ad_legs` (#1131); @107304≠mcalcmove
(#1130); @106852≠omit nasty (#1129); @106838≠rn2(32) (#1127–8);
@106540≠fleeck alone (#1123–4); @106304≠fleeck (#1120); @104705≠fleeck
(#1118–9); older rejects in D-0928 / NOTES.

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
