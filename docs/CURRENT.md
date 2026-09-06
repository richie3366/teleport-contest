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

Score last measured: **2026-09-06** — full `sessions` at **D-1892**
(audit **854–862**, `60215712`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `44+0.34/turn`
(R² 0.85).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `45+0.36/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1892): **253 / 265 PASS (95.5 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`suit_simple_name`/
`hitmsg`/`show_conduct` (parked) ×1 (+ unattributed `!` ×2, `-` ×1, motd, level-change).
Reviews **835–842** (D-1865…D-1896): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1896):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1896):
8 ACCEPT, 0 Must-fix. Reviews **854–862** (D-1884…D-1896):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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

**Suite 44/44** at **D-1851**. `dofire` 2 corpus PASS: empty-quiver `You()` NEED_MORE
before fire getobj (D-0484 skip reverted).
**Next cluster:** Open `read.c` missing seffect_* arms — scroll effects (seffect_amnesia, seffect_charging, seffect_confuse_monster, seffect_earth, seffect_enchant_armor, seffect_mail, seffect_scare_monster, seffect_stinking_cloud, do_stinking_cloud, can_center_cloud, p_glow3) (HELDOUT Tier C).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1896 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1896** `read.c` `seffect_mail :2157–2188` / `seffect_enchant_armor :1115–1290` / `seffect_confuse — Ported all eleven C functions in C branch order with short-circuit, RNG (`rn2/rnd/rn1/d`), and mutation semantics preserved: charging confused uen/discharge+botl else learnscroll/useup-first/getobj+recharge; amnesia forg
**D-1895** `dat/tut-2.lua` (whole file, 27 ln) via `mkmaze.c` `makemaz` `:1127–1223` → `load_special` — `load_tut2` in lua order through end of file — `nhlib_shuffle_align`, STONE solidfill + `is_maze_lev`/`nomongen`/`deathdrops=false`/`noautosearch` (tut-1 idiom), byte-identical 14x8 map via `splev_map_center_start` + `se
**D-1894** `exper.c` `losexp` `:232–237` (ulevel==1 + drainer → killer.format=KILLED_BY, killer.name= — set `game.killer` (format KILLED_BY, name=drainer unless already it — C `:234–236` pointer-guard as a value compare) and `await done(DIED)`; keep the C `:239–243` ulevel>1 fuzz guard, then fall through to the existing ue
**D-1893** `dat/Cav-strt.lua:94` / `dat/Cav-loca.lua:93` / `dat/Cav-goal.lua:59` → `sp_lev.c` `lspo_w — Tou-goal/Ran-goal epilogue line in lua order (after last monster, before wallification → flip → fixup) in all three loaders: `wallify_map((g.splev_xstart|0)-1, (g.splev_ystart|0)-1, (g.splev_xstart|0)+(g.splev_xsize|0)+1
**D-1892** `zap.c` `makewish` — `makewish` ports the three livelog arms in C order on same-edge imports only (`livelog_printf` from `pline.js`, `uhis` next to `uhim`, `artifact_origin` next to the artifact imports, `LL_WISH`/`LL_CONDUCT`/`LL_ARTIFACT`/
**D-1891** `dat/Cav-strt.lua` (solidfill " ", mazelevel/noteleport/hardfloor, 76x20 map, whole-map un — `load_cav_strt` (STONE solidfill + triple flags, byte-identical map, whole-map unlit, temple via Pri-strt flood idiom with needfill FILL_NORMAL — filled=1 per C `sp_lev.c` lspo_region `:5600`, not FILL_LVFLAGS — 6 ordina
**D-1890** `dat/Mon-strt.lua` (solidfill " ", mazelevel/noteleport/hardfloor, Pri-strt-identical 20×7 — `load_mon_strt` (Pri-strt skeleton: STONE solidfill + triple flags, byte-identical map, whole-map lit, temple with `needfill = 0` per C `sp_lev.c` lspo_region `:5600` default — Pri filled=2 takes FILL_LVFLAGS — same add_
**D-1889** `dat/Ran-strt.lua` (solidfill ".", mazelevel/noteleport/hardfloor/arboreal, mines fg=bg=". — `load_ran_strt` (ROOM solidfill + triple flags + arboreal, ROOM/ROOM mines lit/smoothed/joined/unwalled, `lspo_replace_terrain_region(0,0,76,19,ROOM,TREE,5)` BEFORE the map per lua order — mx/my are 1,0 both before and a
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1896; wrap `wildmiss` /
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
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
