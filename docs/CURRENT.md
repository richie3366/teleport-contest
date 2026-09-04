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

Score last measured: **2026-09-04** — full `sessions` at **D-1814**
(`b596f337`; audit **775–783**). **42**/44. Both FAILs reproduced at
HEAD **D-1815** `462e1338`. **Not** map-driven until fortress
returns. Report: `docs/2026-09-04-fortress-regression-42-44.md`.
**seed0030** since **D-1795**: 9/10 segs RNG-perfect; seg3 JS +4
after `can_make_bones` (Maganasipi `i=1`). **seed4500** since
**D-1792**: RNG full, 13 `#wizintrinsic` `deafness [2]` screens.
Scr **10,428**/11,405, RNG **727,221**/792,838 = **91.7%**.
Speed `46+0.33/turn` (R² 0.84).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,428 / 11,405** |
| Positional RNG calls matched | **727,221 / 792,838** (91.7%) |
| Speed label | `46+0.33/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore.

**Notable non-PASS:** seed0030 since D-1795 — concat RNG 39912/105529
is positional; real miss is seg3 +4 after death (`rnd(21)` i=1).
seed4500 since D-1792 — Screen 1801/1814, RNG full, 13 menus
`deafness [2]`. Report `docs/2026-09-04-fortress-regression-42-44.md`.

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

**Suite 42/44 is a fortress regression**, not an Open peel.
Read `docs/2026-09-04-fortress-regression-42-44.md`. **D-1815**
already shipped. **Next cluster:** Must-fix `mattacku` abort after
`done()` (seed0030 Maganasipi `i=1`). Then Must-fix seed4500
`deafness [2]`. Not `lava_effects` until both PASS.
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`) once
Must-fix is empty.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1815 (index).** Recent **D-1815:** `getdir` reads
`iflags.cmdassist` (Options/`O` writes `game.iflags`), not
`game.flags`. Named: mouse `_`, fuzzer, `cmd_from_func`, rhack
`dxdy_moveok`, trailing `confdir`.
**Do not:** FORCE/RNG; skip D-1229…D-1815; wrap `wildmiss` /
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
