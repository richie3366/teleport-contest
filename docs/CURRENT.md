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

Score last measured: **2026-09-06** — full `sessions` at **D-1900**
(audit **863–870**, `29ce55d7`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `46+0.36/turn`
(R² 0.84).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `46+0.36/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1900): **254 / 265 PASS (95.8 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`suit_simple_name`/
`show_conduct` (parked) ×1 (+ unattributed `!` ×2, `-` ×1, motd, level-change;
`hitmsg` closed by D-1894 losexp fix).
Reviews **835–842** (D-1865…D-1903): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1903):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1903):
8 ACCEPT, 0 Must-fix. Reviews **854–862** (D-1884…D-1903):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1903): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
**Next cluster:** `pager.c` history/descr arms — dohistory, add_cmap_descr, add_quoted_engraving, look_region_nearby, hmenu_dowhatis, dispfile_* (HELDOUT Tier C).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1903 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1903** `pager.c` `dohistory :2961–2965` / `dispfile_help :2748–2752` / `dispfile_shelp :2754–2758 — C-order ports in `js/pager.js` (+~277/−24): `look_region_nearby(out, nearby)` holder-mutating export (C lo_y/lo_x/hi_y/hi_x order, `ux|0`/`uy|0` ints) with `look_region` kept as a delegating wrapper (clone drift deleted)
**D-1902** `mkmap.c` `get_map :54–60` / `pass_one :67–96` / `pass_two :100–121` / `pass_three :123–14 — new `js/mkmap.js` (+~170, 6 exports, C names/signatures): bounds-exact `get_map` (OOB→bg); in-place `pass_one` (writes hit levl mid-sweep — later cells see updated neighbours, preserved); double-buffered `pass_two` (==5→
**D-1901** `polyself.c` `domindblast :1893–1938` (46 lines): uen<10 refuse, uen−=10 + botl, `rnd(15)` — deleted both blocks including the `mhp<1 continue` guard line that only served them; `passive()` already owns gaze retaliation on its real melee trigger path.
**D-1900** `wizard.c` `which_arti :141–157` / `mon_has_arti :164–177` / `other_mon_has_arti :183–195` — C-order ports.
**D-1899** `muse.c` `cures_stoning :2985–2998` / `munslime :3031–3100` / `muse_unslime :3104–3242` /  — C-branch-order ports in `js/muse.js`: `cures_stoning` (POT_ACID/glob+CORPSE+openable-TIN, NON_PM gate, LIZARD/acidic); `cures_sliming` (fire scroll eyes+hands, oil hands, charged wand/blowable horn); `green_mon` (mcolor 
**D-1898** `cmd.c` `domonability` (hide/web prompt + 15-arm chain) ; `polyself.c` `dospit :1450–1478` — C-order dispatch incl. the hide/web `yn_function` prompt (`hidespinchars`, q/ESC → ECMD_OK) ahead of every arm; `dospit` (`getdir`→ECMD_CANCEL, `attacktype_fordmg` AT_SPIT/AD_ANY=-1, BLND/DRST→blinding else ACID→acid wit
**D-1897** `hack.c` `findtravelpath :1266–1523` — New `travel_delay_current(x,y)` (`!Passes_walls_prop() && !can_ooze(youmonst) && closed_door` || `boulder && !could_move_onto_boulder`, C `:1403–1407`) on same-edge imports only — exported `Passes_walls_prop` (`hack.js`)
**D-1896** `read.c` `seffect_mail :2157–2188` / `seffect_enchant_armor :1115–1290` / `seffect_confuse — Ported all eleven C functions in C branch order with short-circuit, RNG (`rn2/rnd/rn1/d`), and mutation semantics preserved: charging confused uen/discharge+botl else learnscroll/useup-first/getobj+recharge; amnesia forg
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1903; wrap `wildmiss` /
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
