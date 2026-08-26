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

Score last measured: **2026-08-26** — full `sessions` at **D-1539**
HEAD `719506a4` (**audit #1930**; next **#1940**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `38+0.31/turn` (R² 0.848). Fortress held: seed0367 FULL.
Prior audit **#1920** was 43/44; D-1531 restored 44/44.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `38+0.31/turn` (R² 0.848) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed4500, seed2200, seed0383.

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

**Suite 44/44** fortress after audit **#1930**. **Next cluster:**
Open `restore.c` `ghostfruit` (named). Not goodfruit.
**Do not skip D-1531…D-1540 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1540.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1540 (index). Recent: **D-1540**
`shk.c` `make_happy_shk` adjalign (non-Rogue) / `!inhishop`
`home_shk` or migrate+`dismiss_kops` / `make_happy_shoppers`
(`kops_gone`/`pacify_guards`) — review **493**.
Prior: **D-1539**
`artifact.c` `set_artifact_intrinsic` cspfx W_ART (MKoT/Orb of
Fate carry WARN|…) + invent addinv/freeinv callers.
**D-1538**
`dog.c` `mon_arrive` wander/`somexy` after catchup (`in_rooms`+clone).
**D-1537** INTERNALCMD `#altdip`. **D-1536** door `S_hcdoor`.
D-1535 FOOT. D-1534 EYE. D-1533 `o->lit`. D-1532 is_covetous.
D-1531 Pri-loca `mk_roamer`. D-1530 ALLOWCNT. D-1529
`see_wsegs`. D-1528 `show_region`. D-1527 `#timeout`.
D-1526 emin roaming. D-1525 TEMPLE `S_altar`. Maze statue is
D-1517. dprince is D-1518. stolen_booty is D-1363. minetn-7
gnome count is D-1513; dispatch is D-1504; minetn-6 is
D-1503; minetn-1 is D-1490.
**Do not / rejects:** FORCE/RNG;
HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`; skip D-1229…D-1540
(index). No `reset_glyphmap` / `notice_all_mons` / `makemap_remove_mons`
/ savelev-freeing / lua `lspo_reset_level` / RANGE_LEVEL /
`restore_artifacts`. No trailing `confdir` inside
shared `getdir`. throw keeps `getdir_cmdassist`.
Do not import `wield.js`/`pickup.js`→`polyself.js` for
`body_part` (latebound). Do not re-add a fourth town
gnome in `load_minetn_7`. Do not import `makemon.js`→`hack.js`
for `in_town` (local clone; hack→trap/mon cycle). Do not
import `makemon.js`→`artifact.js` for `u_wield_art`
(artifact→display→mkobj cycle). Do not import
`makemon.js`→`minion.js` for `Inhell` (minion→makemon;
use dungeon `hellish`). Do not delete emin roaming.
Do not make typed `#altdip` a user extcmd (INTERNALCMD).
Do not import `dog.js`→`mklev.js` for `somexy` (mklev→trap→dog).
Do not zero `cspfx` when `wp_mask===W_ART`.
Do not stub `make_happy_shk` as pacify+“calms down” only.
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
