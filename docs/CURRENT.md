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

Score last measured: **2026-09-05** — full `sessions` at **D-1847**
(audit **811–817**, `2c9f2ad0`). Fortress held: seed0030 **D-1816**,
seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `44+0.37/turn`
(R² 0.864).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `44+0.37/turn` (R² 0.864) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-05 at
D-1849): **222 / 265 PASS (83.8 %)** excl. 13 env-only rows;
RNG 99.32 %; screens 99.0 %. Top owners: `do_screen_description` 4 ·
`moverock_core`/`mhitm_ad_phys`/`inuse_classify`/`menu_remarm`/`dofire`/`dowhatdoes` 2.
Review **813** lookat `S_room`/`S_darkroom` extra arms shipped **D-1848**.
Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
**Next cluster:** Open `mkmaze.c` `makemaz` `knox` — Fort Ludios magic-portal vault. From `dat/knox.lua` (167 ln).
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1853 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1853** `dat/knox.lua`; `mkmaze.c` `makemaz` `:1127–1223` — `load_knox` from the lua body in order: solidfill STONE +
**D-1852** `dat/Val-strt.lua` / `Val-loca.lua` / `Val-goal.lua` / — `load_val_strt` from the lua body: solidfill ICE +
**D-1851** `dothrow.c` `dofire` `:510–554` (`You("have no ammunition readied.")` then `doquiver_core( — drop the pre-doquiver `mark_topline_seen` so `You()` leaves NEED_MORE and `doquiver_core` waits like C.
**D-1850** `invent.c` `display_inventory` `:3427–3452` (`cmdq_pop` then `display_pickinv(lets, 0, 0,  — `display_inventory` calls `display_pickinv_reply` with `want_reply`.
**D-1849** `shknam.c` `stock_room` `:750–766` (locked shop door: `inside_shop(sx+1,sy)`→`m--` / `(sx- — delete the clone and import `shk.js` `inside_shop`; port the ROOM/CORR choice with `Is_special` (now exported from `dungeon.js`) and `hack.js` `in_rooms`.
**D-1848** `pager.c` `lookat` `:779–795` (cmap switch: altar / ndoor / cloud / waterbody / engraving  — delete the extra lookat arms so floor strings come from `defsyms[]`.
**D-1847** `mklev.c` `mineralize` `:1448–1541` / `mkmaze.c` `bound_digging` / `sp_lev.c` `create_room` — gold/gem loop + `on_level` Is_special + `join` arboreal ROOM + xstart resets. Named: 1-cell `ly=15` TRC (Knight d5 409 vs 410).
**D-1846** `teleport.c` `level_tele` `:1254–1276` / `:1388–1422`; `priest.c` `priestname` `:302–367`; `dat/bigrm-2.lua` `:34–48` — Nowhere ynq + Quest/mines/sanctum clamp + invoked `"Sorry..."`; `priestname`; Rogue `S_ndoor`/`dosdoor` D_NODOOR; `bigrm-2` darkness unlit (Healer `rn2(4)=2` sides). Ice `selection:grow` still named.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1853; wrap `wildmiss` /
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
