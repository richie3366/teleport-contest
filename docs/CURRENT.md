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

Score last measured: **2026-09-04** — full `sessions` at **D-1823**
(audit **784–793**, `171f6b02`). Fortress held: seed0030 **D-1816**,
seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `43+0.33/turn`
(R² 0.862).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `43+0.33/turn` (R² 0.862) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, 2026-09-04 at D-1823):
**157 / 265 PASS (59.2 %)** excl. 13 env-only rows; RNG 98.28 %; screens
96.5 %. Top owners: `process_menu_window` 21 · `itemactions` 14 ·
`getobj` 7 · `describe_decor` 5 · level cliff `build_room` /
`selection_filter_percent` (53k RNG lost). Refresh on audit iters with
`node scripts/hidden-proxy.mjs score`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none. Fortress report
`docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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

**Suite 44/44** at **D-1831**. Map-driven Open (Must-fix empty).
**Next cluster:** `iactions.c` `itemactions` — 14 corpus blocks; Engrave vs Write, cookie vs cookies.
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1831 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1831** `wintty.c` `process_menu_window` `:1329–1768` (`:1501–1505` — `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv /
**D-1830** `dat/Rog-strt.lua` / `Rog-loca.lua` / `Rog-goal.lua` / — `load_rog_strt` from the lua body: solidfill STONE +
**D-1829** `dat/Kni-strt.lua` / `Kni-loca.lua` / `Kni-fila.lua` / — `load_kni_strt` from the lua body: solidfill ROOM + mines fg=bg="."
**D-1828** `dat/astral.lua`; `mkmaze.c` `makemaz` `:1127–1223` — `load_astral` from the lua body: solidfill + mazelevel+noteleport
**D-1827** `dat/water.lua`; `mkmaze.c` `makemaz` `:1127–1223` — `load_water` from the lua body: solidfill + mazelevel+noteleport
**D-1826** `dat/medusa-2.lua`; `dat/medusa-4.lua`; `mkmaze.c` `makemaz` — `load_medusa_2` from the lua body: solidfill + mazelevel+noteleport,
**D-1825** `mcastu.c` `mcast_spell` `:800–897` (all 20 `MCAST_*` — port the remaining 14 arms from the C bodies; `mcast_spell`
**D-1824** `dat/Bar-goal.lua` `:44–57`; `sp_lev.c` `create_object` / — loop bound 14 matching lua `:44–57`.
<!-- recent:end -->
**Do not:** FORCE/RNG; skip D-1229…D-1831; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
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

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
