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

Score last measured: **2026-09-05** — full `sessions` at **D-1856**
(audit **818–826**, `3ca95421`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `47+0.36/turn`
(R² 0.85).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `44+0.37/turn` (R² 0.864) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-05 at
D-1856): **230 / 265 PASS (86.8 %)** excl. 13 env-only rows;
RNG 99.44 %; screens 99.2 %. Top owners: `hitum`/`moverock_core`/
`mhitm_ad_phys`/`menu_remarm`/`!`/`dog_invent` 2.
Reviews **818–826** (D-1848…D-1859): 7 ACCEPT, 2 ACCEPT-WITH-DEBT, no
Must-fix. Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
**Next cluster:** Open `mkroom.c` fill_zoo — 1 corpus block (`rn2(3)` vs `rnd(2)`).
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1859 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1859** `hack.c` `moverock_core` `:441–448` (`Sokoban && u.dx && u.dy` → Blind `feel_location(sx,s — port the arm in C order (inside clear-dest branch, after ttmp/mtmp fetch, before revive_nasty/monster): `Sokoban_here() && u.dx && u.dy` → Blind `feel_location`, awaited pline with `The(xname(otmp))` + shared `surface(sx
**D-1858** `dat/Sam-strt.lua` / `Sam-loca.lua` / `Sam-goal.lua` / — `load_sam_strt` from the lua body: solidfill STONE +
**D-1857** `uhitm.c:3479–3522` `mhitm_ad_slee` (homunculus — port the three arms with C branch/RNG order.
**D-1856** `dat/bigrm-2.lua` (`des.replace_terrain({ selection = — build the darkness selection per choice arm (absolute
**D-1855** `cmd.c:1934–1935` — export `dowhatdoes` from `js/pager.js`, import it in
**D-1854** `pager.c` `do_screen_description` `:1246–1627` — that branch now prints 9-space `can be many things (${look})`
**D-1853** `dat/knox.lua`; `mkmaze.c` `makemaz` `:1127–1223` — `load_knox` from the lua body in order: solidfill STONE +
**D-1852** `dat/Val-strt.lua` / `Val-loca.lua` / `Val-goal.lua` / — `load_val_strt` from the lua body: solidfill ICE +
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1859; wrap `wildmiss` /
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
