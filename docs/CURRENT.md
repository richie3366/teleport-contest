# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (`iteration-count % 5 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-08-21** — full `sessions` at review **#1735**
HEAD `9a144895` (**44**/44, Scr **11,405**/11,405, RNG **100%**).
Speed `36+0.29/turn` (R² 0.85). Next audit (review + score) @**#1740**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `36+0.29/turn` (R² 0.85) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed4500, seed2200, seed0383.

**Notable non-PASS:** none (regression fortress).

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

**Map-driven fortress** after D-1370. **Next cluster:** Open
`allmain.c` `u_wipe_engr` DEX timeout caller (named from D-1360). Not dokick.
Reviews **323/325/326** ACCEPT-WITH-DEBT. **324** shipped
(`Antimagic()` via `uprops[ANTIMAGIC]`). Do not skip
D-1370…D-1229 (index). Keep mention_map addr. Do not wrap
`wildmiss` or `msg_mon_movement` as `pline_mon`. Do not
rewrite `confer_oc_oprop`.

**Parked:** D-0006. **Do not re-break D-0660…D-1370.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1370 (index). Recent: **D-1370** dokick.js
`kick_ouch`/`kick_dumb` air/Lev `hurtle`. Prior: **D-1369** zap.js
`zapyourself` WAN_MAKE_INVISIBLE. **Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`; skip D-1229…D-1370
(index). No `reset_glyphmap` / `notice_all_mons` / `makemap_remove_mons`
/ savelev-freeing / lua `lspo_reset_level` / RANGE_LEVEL /
`restore_artifacts`. No trailing `confdir` inside
shared `getdir`. throw keeps `getdir_cmdassist`.
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
On every 5th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
