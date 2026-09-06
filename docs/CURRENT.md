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

Score last measured: **2026-09-06** — full `sessions` at **D-1979**
(audit **941–949**, `816104a5`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838 (identical to D-1952 audit). Speed `61+0.62/turn`
(R² 0.87).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `61+0.62/turn` (R² 0.87) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1970 audit 932–940): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews 835–853: 18 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix.
Reviews **854–862** (D-1884…D-1983):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1983): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1983): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Reviews **879–887**
(D-1909…D-1983): 8 ACCEPT, 1 QUALITY-RISK (lava Wwalking
Must-fix, queued). Reviews **888–895** (D-1918…D-1983):
7 ACCEPT, 1 ACCEPT-WITH-DEBT (makeplural `strcasecpy_at` overrun
case debt, review-listed), 0 Must-fix. Reviews 896–904:
8 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews
**905–913** (D-1935…D-1983): 9 ACCEPT, 0 Must-fix. Reviews
**914–922** (D-1944…D-1983): 8 ACCEPT, 1 ACCEPT-WITH-DEBT
(doclassdisco sort-letter selector debt, review-listed), 0 Must-fix. Reviews
**923–931** (D-1953…D-1983): 9 ACCEPT, 0 Must-fix. Reviews
**932–940** (D-1962…D-1983): 9 ACCEPT, 0 Must-fix. Reviews
**941–949** (D-1971…D-1983): 8 ACCEPT, 1 ACCEPT-WITH-DEBT (941 travel-Underwater debt), 0 Must-fix.
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
Prior pops closed: `mkmaze.c` val-*/sam-* stale rows (loaders stand since D-1852/D-1858, D-1906 audit); `uhitm.c` mhitm AD arms shipped D-1907.
**Next cluster:** `display.c`/`getpos.c` map_frame_color store (named D-1973; span paint queued D-1984).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1984 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1984** `display.c` — `js/display.js` — gbuf bbox tracked (writers+clear span, post-rebuild reset); span paint deferred.
**D-1983** `nethack-c/upstream/src/display.c` — `js/display.js` — new exported `SYM_OFF_X = 190`/`SYM_MAX = 196` (`105 + 18 + 61 + 6 + 6`: MAXPCHARS 105 from `S_expl_br` 104, MAXOCLASSES 18 from `objects.js`, MAXMCLASSES 61 from `defsym.h` MONSYM 1..60, WARNCOUNT/MAXO
**D-1982** `nethack-c/upstream/win/tty/wintty.c` — `js/display.js` — module-local `clipping`/`clipx`/`clipxmax`/`clipy`/`clipymax` (C file-statics) + `clip_screen_size()` (`CO`/`LI` ≡ `game.nhDisplay.cols/rows`, 80x24 fallback = the layout JS always renders) + exported `
**D-1981** `nethack-c/upstream/src/display.c` — `js/display.js` — new exported async `under_water(mode)` in exact C order with `:line` citations (guard via imported `Is_waterlevel` + `u.uswallow`; `await cls()`; mode `| 0` arms; limited blank via `show_glyph_cell(x, y
**D-1980** `nethack-c/upstream/src/sounds.c` — `js/sounds.js` — mcan arm between `pline_msg` and `verbl_msg` in exact C order (`mtmp.mcan && verbl_msg_mcan` short-circuit; `SetVoice` + `await verbalize`, the same `verbalize1` fold the `verbl_msg` arm uses); no new im
**D-1979** `nethack-c/upstream/src/sounds.c` — `js/sounds.js` — MS_NURSE + MS_GUARD arms in C switch order (before SOLDIER, as in C) with `:line` citations. uwep is `game.u.uwep` and uarm* are `game.u.uarm*` (do_wear.js precedent); `Role_if(PM_HEALER)` is `(game.urol
**D-1978** `nethack-c/upstream/src/sounds.c` — `js/minion.js` — new exported async `demon_talk(mtmp)` in exact C order with `:line` citations (local `u_wield_art`/`Amonnam`/`sgn`/`Inhell` reused, not re-cloned; `rnd(80)` burns before the no-gold early return as in C;
**D-1977** `nethack-c/upstream/src/sounds.c` — `js/sounds.js` — four arms in C switch order (VAMPIRE after SELL, DJINNI after ORC, ARREST+SOLDIER after SEDUCE) with `:line` citations.
**D-1976** `nethack-c/upstream/src/display.c` — `js/display.js` — new exported async `curs_on_u()` (`await flush_screen(1)`; async for bot/more nhgetch reach, same shape as `redraw_map` D-1974) + new exported async `doredraw()` (`await docrt()`; `return ECMD_OK`) plac
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1984; wrap `wildmiss` /
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
