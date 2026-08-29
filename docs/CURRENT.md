# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-08-29** — full `sessions` at **D-1620**
(`cb4d8a91`, cadence **#2020**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `39+0.30/turn` (R² 0.853). seed0367 FULL still PASS.
Prior FAIL seed4500 at **D-1574** `1ba35e31` is PASS again.
Prior audit **#2010** was 44/44 at `21441f2e`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `39+0.30/turn` (R² 0.853) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed2200, seed0383, seed4500.

**Notable non-PASS:** none.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective

**Suite 44/44** after D-1625 (seed4500 still PASS). **Next cluster:**
Open `sounds.c` MS_BOAST hostile giants (named). Not MS_HUMANOID.
**Do not skip D-1531…D-1625 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1625.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1625 (index). Recent: **D-1625**
`cmd.c` `doextlist` NHW_MENU + `doc_extcmd_flagstr`;
`doextcmd` loop while doextlist; pager `hmenu_doextlist`;
typed `#?`. BIND= `seeall` / M('?') keystroke named. Not
#seeall EXT_CMDS (D-1605). Prior: **D-1624** EDIT_GETLIN
off. **D-1623** yn post-answer `toplines`. **D-1622**
`com_pager_core`. Older D-1531…D-1621 live in the index —
do not re-paste.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1625 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / `restore_artifacts`.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port `mongets` sword `spe`. Do not re-port
`gain_guardian_angel`. Do not re-port `m_unleash`.
Do not re-port `initedog` ogoal / first-pet livelog.
Do not re-port getline ^P / yn ^P.
Do not re-port `get_count` historicmsg.
Do not re-port `restore_msghistory`.
Do not re-port `consume_obj_charge` known `update_inventory`.
Do not re-port `reset_hostility`.
Do not re-port dog_move Conflict `lose_guardian_angel`.
Do not re-port `mplayer_talk`.
Do not re-port peaceful MS_HUMANOID / `"threatens you."`.
Do not re-port `take_off` occupation / `do_takeoff`.
Do not re-port floor TRADITIONAL `query_classes`.
Do not re-port `adjust_split`.
Do not re-port `com_pager_core` synopsis.
Do not re-port yn post-answer `toplines`.
Do not re-port EDIT_GETLIN (config.h commented).
Do not re-port `doextlist`.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
