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

Score last measured: **2026-08-19** — full `sessions` at review **#1590**
HEAD `d384e339` (**44**/44, Scr **11,405**/11,405, RNG **100%**).
Speed `36+0.29/turn` (R² 0.854). Next audit (review + score) @**#1595**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `36+0.29/turn` (R² 0.854) |
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

**Map-driven fortress** after D-1253. **Next cluster:**
Must-fix `weapon.c` `special_dmgval` `mon_hates_silver` = C
`hates_silver` (shade/vampire/imp) — review **212**. Not glob/doname.
Do not skip D-1253…D-1229 (index). Keep mention_map addr. Do not wrap
`msg_mon_movement` as `pline_mon`.
Do not pull nopick m-dir / hitfloor
`dropz(TRUE)` / mimic unhide / AT_ENGL / fight_empty `explum` / altwep
/ landmine·pit mid-roll / `gelcube_digests` / unported
uhitm `mhitm_ad_*` `pline_mon` / mhitu `hitmsg`.

**Parked:** D-0006. **Do not re-break D-0660…D-1253. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1253 (index). Recent: D-1234 unique/pname adjective
(glob/doname CXN still named); D-1239 squeeze; **D-1253** giant pickup
`return 0`; D-1249 container_impact (hitfloor `dropz(TRUE)` named);
D-1250–D-1252 AT_HUGS / AT_EXPL / `demonpet` (AT_ENGL / fight_empty /
altwep named).
**Do not / recent rejects:** FORCE/RNG/appear; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting spaces;
D-0983…D-1228 (index); no wrap `msg_mon_movement` as `pline_mon`;
no skip D-1229 `impact_disturbs_zombies`; no skip D-1230 `#teleport`;
no skip D-1231 gulpmm `m_at`; no skip D-1235/D-1236 a11y addr;
no skip D-1237 TELEP `pline_xy` (landmine/pit named); no skip D-1238
`mind_blast`; no skip D-1240–D-1248 (`hitmsg` / gelcube / ALLOW_BARS /
mimic unhide named); no skip D-1253 (nopick m-dir named);
no pull `reset_glyphmap` / vision_recalc `notice_all_mons` /
`makemap_prepost` / peel RANGE_LEVEL / `restore_artifacts` this SHA.
**Do not put trailing `confdir` inside shared `getdir`**. **Do not
add help_dir / “strange direction” pline to lock `getdir`**. Throw
keeps `getdir_cmdassist`. **Do not peel RANGE_LEVEL timers from
invent/migrating objects** (C `obj_is_local` is false).
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
