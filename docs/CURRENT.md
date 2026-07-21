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

Score last measured: **2026-07-21** — full `sessions` @**#1190** (42/44,
Scr **11389**/11405, RNG **100%**) + `done2` cancel
`clear_nhwindow(WIN_MESSAGE)`. Speed `30+0.25/turn`. Next cadence
@**#1195**. #1194 seed4500 focused **PASS** Scr **1812→1814** (suite
would be **43**/44 / Scr **11391** pending cadence).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** (seed4500 focused PASS @#1194; suite confirm @#1195) |
| Screens matched | **11,391 / 11,405** (prior suite +2 @1808–1809) |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `30+0.25/turn` (R² 0.87) |
| Role-init throws | **0 / 44** |

**PASS (43):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0009, seed0012, seed0004, seed0002, seed0006, seed0007, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, seed2600, **seed4500**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |

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

**Leaderboard 22-vs-43 gap** — local **43**/44 (seed4500 PASS
@#1194; D-0929 restored seed0006/0007/0009/0360). Judge **22** after
D-0480; D-0483 serialize revert. Next cron → upstream #5 if seed0013
restored. Cadence @**#1195** reconfirm suite Scr.

**Parked:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0929. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194 (teleds placebc #1151;
D-0929 look_here-only leftover; lastseentyp #1160; wakeup #1161;
hissing-gas #1162; waterbody_name #1163; makemon_appear #1164;
unmap/fight_empty #1166; pushweapon #1167; nh_timeout #1168;
Blind feel #1169–#1171; overview/sanctum/getpos/untrap #1172–#1176;
float_vs_flight/polymon/timebot #1177–#1179; Blind doname #1180;
achievements #1181; dopay Blind #1182; wizwhere menu #1183;
dosearch0 Blind feel #1184; doeat capacity #1185; doapply #1186;
getpos ^R #1187; blank S_stone #1188; mMoOdDxX #1189; done2 clear
#1190; castmu/urgent_pline #1191; cmd_safety iflags.cmdassist #1192;
Kni goal_first #1193; ^X rank==role + Punished/legs/Jump/umort +
`eaten_stat` #1194).
**Do not / recent rejects:** invent appear/nearness/FORCE/RNG gates;
HEAVY_IRON_BALL `owt!=0` weight short-circuit without levy-proof
callers (#1194 wiped "very"); @1808 page-count shim (#1194);
@1799 heat/smoke-only (#1193 missing Kni goal_first); @1770
Norep/parse-clear alone (#1192 iflags.cmdassist); @1761
mtimedone-only (#1191 cast/PSI); @1712 parse-clear (#1190 done2);
@1698 feature-char door (#1189 gather); @1691 typ-CORR (#1188
S_stone); @1689 getdir (#1187 redraw); older in D-0928/NOTES.

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
