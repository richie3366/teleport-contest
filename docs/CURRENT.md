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

Score last measured: **2026-09-04** — full `sessions` at HEAD **D-1805**
(`3ff0752d`; audit overlay reviews **766–774**). **42**/44.
**seed0030** RNG **39912**/105529 / Screen **989**/1953 since **D-1795**.
**seed4500** Screen **1801**/1814 (RNG full) since **D-1792**.
Scr **10,428**/11,405, RNG **727,221**/792,838 = **91.7%**.
Speed `42+0.33/turn` (R² 0.859).
Must-fix is empty — next port pops Open `trap.c` `drown` remaining:
rnd_nextto_goodpos / emergency_disrobe / crawl-out. Not lava_effects.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,428 / 11,405** |
| Positional RNG calls matched | **727,221 / 792,838** (91.7%) |
| Speed label | `42+0.33/turn` (R² 0.859) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore.

**Notable non-PASS:** seed0030 RNG 39912/105529 Screen 989/1953 since
D-1795. seed4500 Screen 1801/1814 since D-1792 (`#wizintrinsic` DEAF
`[2]`; RNG 108275/108275).

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

**Suite 42/44** at D-1805. Audit **766–774** ACCEPT-WITH-DEBT.
Open `trap.c` `untrap` remaining floor disarm helpers shipped (**D-1813**).
seed0030 first miss is C seg4 `randomize_gem_colors` vs JS still in
seg3 combat (seg0 RNG OK 14300). Save-oracle for tagged restore
Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**Next cluster:** `trap.c` `drown` remaining: rnd_nextto_goodpos /
emergency_disrobe / crawl-out. Not lava_effects.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1813 (index).** Recent **D-1813:** `disarm_holdingtrap`
/ `disarm_landmine` / `disarm_shooting_trap` / `disarm_box` /
`untrap_box` / `help_monster_out` + `try_disarm` / `untrap_prob` /
`cnv_trap_obj` / `try_lift`. Named: `disarm_squeaky_board`,
adjacent-Whoops `move_into_trap`, `stumble_on_door_mimic`.
**Do not:** FORCE/RNG; skip D-1229…D-1813; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
