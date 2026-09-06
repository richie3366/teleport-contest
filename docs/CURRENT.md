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

Score last measured: **2026-09-06** — full `sessions` at **D-1925**
(audit **888–895**, `7571aee9`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `77+0.61/turn`
(R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `77+0.61/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1908): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews **835–842** (D-1865…D-1931): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1931):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1931):
8 ACCEPT, 0 Must-fix. Reviews **854–862** (D-1884…D-1931):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1931): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1931): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Reviews **879–887**
(D-1909…D-1931): 8 ACCEPT, 1 QUALITY-RISK (lava Wwalking
Must-fix, queued). Reviews **888–895** (D-1918…D-1931):
7 ACCEPT, 1 ACCEPT-WITH-DEBT (makeplural `strcasecpy_at` overrun
case debt, review-listed), 0 Must-fix. Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
**Next cluster:** `objnam.c` mshot_xname — Nth/xname arms (turns.md named omit).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1931 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1931** `objnam.c` `mshot_xname` `:1090–1102` (`xname(obj)`, then `gm.m_shot.n > 1 && gm.m_shot.o  — exported `mshot_xname(obj)` from `js/objnam.js` in C order (xname, then `m_shot.n > 1 && m_shot.o === otyp` guard with `| 0` int semantics, `` `the ${i}${ordin(i)} ` `` prefix — C `strprepend` is concat in JS); added can
**D-1930** `weapon.c` `select_hwep` `:704–741`; staticfn `oselect` `:475–496`; `Oselect` macro `:469– — `js/weapon.js` — C-order ports in C branch order: artifact loop `oclass && oartifact && touch_artifact(otmp, mtmp) && ((strong && !shield) || !oc_big)`; giant `Oselect(CLUB)` / `else if` Balrog (`mndx === PM_BALROG && ga
**D-1929** `weapon.c` `hitval` `:149–187`; `kebabable[]` `:71–75` (S_XORN, S_DRAGON, S_JABBERWOCK, S_ — `js/weapon.js` — C-order ports of all four arms in C branch order (blessed `Is_weapon && blessed && mon_hates_blessings` +2; spear `is_spear && kebabable` +2; TRIDENT + `is_swimmer` → `is_pool(mx,my)` +4 else eel/snake +
**D-1928** `zap.c` `bhit` `:3832–4139` (setup `:3842–3868`, skip `:3944–3970`, dispatch `:3994–4039`, — `js/zap.js` — file-local `bhit_skiprange` (C staticfn shape, `Math.trunc` int division, `rnd` 1..n, `skipend >= tmp` clamp); rock setup (`THROWN_WEAPON` + ROCK → window + `!rn2(3)`, before tether remap like C); DISP_BEAM
**D-1927** `invent.c` `getobj` `:1751–2089` (prompt/filter arms `:1832–2089`); `do_wear.c` `takeoff_o — `js/do_wear.js` — added `takeoff_ok(obj) { return equip_ok(obj, true, false); }`; deleted `takeoff_lets` + `getobj_takeoff` (57 lines); `dotakeoff` calls live `getobj('take off', takeoff_ok, GETOBJ_NOFLAGS)` with the C g
**D-1926** `pickup.c` `check_autopickup_exceptions` `:912–927`; `autopick_testobj` `:929–965` (costly — `js/pickup.js` — exported `check_autopickup_exceptions` (C-order walk over `game.apelist`, `makesingular(doname(obj))` + `regex_match`, null on empty); module-static `autopick_costly` + exported `autopick_testobj(otmp, c
**D-1925** `explode.c` `explode` `:199–696` — `js/explode.js` — C-order ports of every arm above: mdef + expltype negation right after the olet preamble; grabbed/grabbing/grabxy from `ustuck`/`uswallow`/`Upolyd` + canonical `sticks` (`js/engrave.js`, the C-shaped ex
**D-1924** `trap.c` `dotrap` `:2996–3060` — `js/trap.js` — C-order full body, no new imports (all names live on existing edges: `FAILEDUNTRAP`/`TOOKPLUNGE`/`FORCETRAP` from `js/const.js`, `Fumbling` from `js/attrib.js`, `is_clinger`/`mon_learns_traps` from `js/mon
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1931; wrap `wildmiss` /
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
