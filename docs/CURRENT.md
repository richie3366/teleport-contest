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

Score last measured: **2026-09-06** — full `sessions` at **D-1961**
(audit **923–931**, `100914d5`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838 (identical to D-1952 audit). Speed `72+0.48/turn`
(R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `72+0.48/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1908): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews 835–853: 18 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix.
Reviews **854–862** (D-1884…D-1968):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1968): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1968): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Reviews **879–887**
(D-1909…D-1968): 8 ACCEPT, 1 QUALITY-RISK (lava Wwalking
Must-fix, queued). Reviews **888–895** (D-1918…D-1968):
7 ACCEPT, 1 ACCEPT-WITH-DEBT (makeplural `strcasecpy_at` overrun
case debt, review-listed), 0 Must-fix. Reviews 896–904:
8 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews
**905–913** (D-1935…D-1968): 9 ACCEPT, 0 Must-fix. Reviews
**914–922** (D-1944…D-1968): 8 ACCEPT, 1 ACCEPT-WITH-DEBT
(doclassdisco sort-letter selector debt, review-listed), 0 Must-fix. Reviews
**923–931** (D-1953…D-1968): 9 ACCEPT, 0 Must-fix.
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
**Next cluster:** `mkmaze.c` maybe_adjust_hero_bubble — water-level hero-bubble adjust (HELDOUT Tier C mkmaze row; named omit in js/mklev.js).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1968 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1968** `nethack-c/upstream/src/mkmaze.c` — `js/mklev.js` — exported `maybe_adjust_hero_bubble()` in C short-circuit order (Is_waterlevel → u.dx/u.dy → hero_bubble-gated `rn2(2)` → steer dx/dy) with the `:1929–1941` citation; `movebubbles()` now resets `game.hero_
**D-1967** `nethack-c/upstream/src/dbridge.c` — `js/dbridge.js` — exported `automiss` (`:486–490`), `e_survives_at` (`:380–399` noncorporeal→pool→lava→db_wall→TRUE with hero Wwalking/Amphibious/Breathless/Swimming/Flying/Levitation + is_swimmer/is_flyer/is_floater/lik
**D-1966** `nethack-c/upstream/src/nhlsel.c` — `js/mklev.js` — exported `selection_iterate_lua` with the full C-contract header (`:924–957` + `:1002` + sp_lev.c `:4793–4803` citations; relcoord round-trip skipped per reviews 791/810 since des.* adds the origin back; 
**D-1965** `nethack-c/upstream/src/allmain.c` — `js/allmain.js` — exported sync `init_sound_disp_gamewindows()` in C order (`| 0` int idiom; splash condition `iflags.wc_splash_screen && !flags.randomall` read but both `SoundAchievement` arms no-op; `WIN_MESSAGE = 10` 
**D-1964** `nethack-c/upstream/src/display.c` — `js/display.js` — exported `row_refresh(start, stop, y)` in C order (`| 0` int idiom; `force` false since JS nul (`clear_glyph_buffer` `' '`/`NO_COLOR`) renders identically to UNEXPLORED so the `map_glyphinfo`-vs-`nul_gb
**D-1963** `nethack-c/upstream/src/weapon.c` — `js/weapon.js` — exported `async give_may_advance_msg(skill)` in C ternary order (`| 0` int idiom; `await You_feel(...)` + `await handle_tip(TIP_ENHANCE)` since both callees can reach nhgetch; C's `(void)` only discards 
**D-1962** `nethack-c/upstream/src/region.c` — `js/region.js` — exported `inside_rect(r, x, y)` in C order (inclusive comparisons, `| 0` int idiom) with the `:53–57` citation; promoted `inside_region` to exported and rewired it to C shape (`!reg || !inside_rect(box)`
**D-1961** `nethack-c/upstream/src/dungeon.c` — `js/dungeon.js` — exported `has_ceiling(lev)` + `avoid_ceiling(lev)` in C order (if/return-TRUE/FALSE shape; `Is_earthlevel` added to the existing `./const.js` edge), placed after `In_W_tower` with the C ranges cited; `j
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1968; wrap `wildmiss` /
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
