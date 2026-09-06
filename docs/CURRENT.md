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

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 941–949: 8 ACCEPT, 1 ACCEPT-WITH-DEBT.
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

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

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (4 `ReferenceError` imports kill 8
sessions) then Open in order; every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `js/` missing imports Must-fix (`is_pit`, `FORCEBUNGLE`,
`otense`, `STARVED`), then `calendar.c getlt` DST (51 sessions).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1987 (index).**
<!-- recent:begin -->
**D-1987** `nethack-c/upstream/src/getpos.c` — `js/getpos.js` — new `HiliteBackground = 2` + `defaultHiliteState` module state (C `:30–38`); `getpos_sethilite` in exact C order (old store read, default recompute from live `game.iflags?.bgcolors`, conditional reset, c
**D-1986** `nethack-c/upstream/src/display.c` — `js/display.js` — grid paint is span-gated per C (`gnew ||` live framecolor arm via `get_bkglyph_and_framecolor`; `gnew` cleared only when painted, `:2255`; unexplored-with-gnew paints blank, D-0931 precedent); no blanke
**D-1985** `nethack-c/upstream/src/display.c` — `js/display.js` — `show_glyph_cell` resolves the glyph id first (two ids can share one ttychar, e.g. altar/fountain `{`) and gates `gnew = 1` + `mark_gbuf_dirty` on id/ch/color/dec/attr difference; the disp store itself 
**D-1984** `display.c` — `js/display.js` — gbuf bbox tracked (writers+clear span, post-rebuild reset); span paint deferred.
**D-1983** `nethack-c/upstream/src/display.c` — `js/display.js` — new exported `SYM_OFF_X = 190`/`SYM_MAX = 196` (`105 + 18 + 61 + 6 + 6`: MAXPCHARS 105 from `S_expl_br` 104, MAXOCLASSES 18 from `objects.js`, MAXMCLASSES 61 from `defsym.h` MONSYM 1..60, WARNCOUNT/MAXO
**D-1982** `nethack-c/upstream/win/tty/wintty.c` — `js/display.js` — module-local `clipping`/`clipx`/`clipxmax`/`clipy`/`clipymax` (C file-statics) + `clip_screen_size()` (`CO`/`LI` ≡ `game.nhDisplay.cols/rows`, 80x24 fallback = the layout JS always renders) + exported `
**D-1981** `nethack-c/upstream/src/display.c` — `js/display.js` — new exported async `under_water(mode)` in exact C order with `:line` citations (guard via imported `Is_waterlevel` + `u.uswallow`; `await cls()`; mode `| 0` arms; limited blank via `show_glyph_cell(x, y
**D-1980** `nethack-c/upstream/src/sounds.c` — `js/sounds.js` — mcan arm between `pline_msg` and `verbl_msg` in exact C order (`mtmp.mcan && verbl_msg_mcan` short-circuit; `SetVoice` + `await verbalize`, the same `verbalize1` fold the `verbl_msg` arm uses); no new im
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1987; wrap `wildmiss` /
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
