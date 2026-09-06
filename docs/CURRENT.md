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

Score last measured: **2026-09-06** — full `sessions` at **D-1908**
(audit **871–878**, `6f87bee1`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `49+0.39/turn`
(R² 0.81).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `49+0.39/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1908): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews **835–842** (D-1865…D-1917): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1917):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1917):
8 ACCEPT, 0 Must-fix. Reviews **854–862** (D-1884…D-1917):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1917): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1917): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
Prior pops closed: `mkmaze.c` val-*/sam-* stale rows (loaders stand since D-1852/D-1858, D-1906 audit); `uhitm.c` mhitm AD arms shipped D-1907.
**Next cluster:** `worn.c` mon_break_armor — absent, 23 messages (TOP30 honourable mention; no archive row). Canonical export shipped D-1914 (newcham wired); this iter wires the `were.c:129` caller (D-1914/D-1916 Next both bless this).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1917 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1917** `were.c` `new_were` `:100–140` (`:129` `mon_break_armor(mon, FALSE)` before `:130` `possib — C-order wiring in `js/were.js`: `const mba = mon_break_armor(mon, false)` (canonical `js/worn.js` export, D-1914) then `possibly_unwield`, chained sync-or-async exactly like newcham `after_armor` (`if (mba) return Promis
**D-1916** `uhitm.c` `hmonas` `:5424–5860` (multi pre-count `:5436–5450` incl. `odd_claw=TRUE`; `use_ — C-order weaponless envelope in `js/uhitm.js`: shared-`dhit` discipline (WEAP + weaponless assign the outer; BREA/SPIT/GAZE reset 0); seduce keeps no-wakeup + `damageum(...,0)`; `wakeup` before the verb switch; per-aatyp 
**D-1915** `steed.c` `dismount_steed` `:575–822` (save_utrap `:583`; POLY `:618`, ENGULFED `:623`, BO — C-order completion in `js/steed.js`: save_utrap before the switch; BYCHOICE nameless Hallu rain (`Hallucination()`); local `stealth_now()` youprop.h-Stealth mirror for the `:665` FALSE→TRUE noisy-now edge (monmove.js own
**D-1914** `mon.c` `newcham` `:5276–5535` (`:5485` mon_break_armor call, `:5495–5514` boulder loop, l — canonical `export function mon_break_armor` + local `m_lose_armor` in `js/worn.js` in C order (breakarm destroy incl. dragon-merge silent arm, artifact-cloak lose vs rip, shirt rip; sliparm lose incl. whirly/cloak/shirt 
**D-1913** `trap.c` `lava_effects` `:6794–6987` (196 lines; brief `:6792–6987`); macros `youprop.h:28 — full C-order port in `js/trap.js`: `d(6,6)` first; `feel_newsym` + `burn_away_slime` + `likes_lava(youmonst.data)` early FALSE; `usurvive = Fire||(Wwalking&&dmg<uhp)` with uprops slots + JS flats and `Is_waterlevel`; `!u
**D-1912** `role.c` `setup_rolemenu` `:2854–2902`, `setup_racemenu` `:2905–2940`, `setup_gendmenu` `: — four canonical `export function setup_*menu` in `js/player_selection.js` in C order and C param order (minus `win`): `filtering && !*_ok` skip; `lowc`/`highc` accelerators (role: single key + `lastch`; race/gend/align: f
**D-1911** `mkmap.c` `finish_map` `:330–363` (wallify `:340–341`, lit `:343–353`, lava-ice `:356–362` — canonical `export function finish_map` in `js/mkmap.js` in C order (whole-map `wallify_map(1, 0, COLNO-1, ROWNO-1)` under `walled`; `!IS_OBSTRUCTED` fg/bg + `TREE` + `walled && IS_WALL` lit with per-room `rlit`; uncondit
**D-1910** `mkmap.c` `join_map_cleanup` `:245–255`, `join_map` `:257–328` (fill loop `:262–297`, `joi — canonical `export async function join_map` + `export function join_map_cleanup` in `js/mkmap.js` in C order: fill loop (`WIDTH`/`HEIGHT` bounds, `NO_ROOM` gate, bounds-object `n_filled` via `mkmap_flood_fill_rm`, `>3` → 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1917; wrap `wildmiss` /
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
