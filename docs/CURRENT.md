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

Score last measured: **2026-09-06** — full `sessions` at **D-1934**
(audit **896–904**, `82034fab`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `51+0.67/turn`
(R² 0.86).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `51+0.67/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1908): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews 835–853: 18 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix.
Reviews **854–862** (D-1884…D-1942):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1942): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1942): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Reviews **879–887**
(D-1909…D-1942): 8 ACCEPT, 1 QUALITY-RISK (lava Wwalking
Must-fix, queued). Reviews **888–895** (D-1918…D-1942):
7 ACCEPT, 1 ACCEPT-WITH-DEBT (makeplural `strcasecpy_at` overrun
case debt, review-listed), 0 Must-fix. Reviews 896–904:
8 ACCEPT, 1 ACCEPT-WITH-DEBT, 0 Must-fix.
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
**Next cluster:** `do_wear.c` Armor_gone/count_worn_armor/any_worn_armor_ok — remaining do_wear armor-count family (HELDOUT Tier C do_wear row remainder; no JS symbol).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1942 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1942** `nethack-c/upstream/src/do_wear.c` — `js/do_wear.js` — exported async `Armor_gone()` in C order (was_arti_light snapshot before setnotworn since unwearing clears the W_ARM bit artifact_light reads on gold DSM/scales; a prior end_burn via the polyself lampli
**D-1941** `nethack-c/upstream/src/getpos.c` — ported the family in C branch order (`| 0` int idiom; `sym.h` `is_cmap_*` macro shape for the three missing predicates; `IS_DOOR` ≡ C `(typ == DOOR)`; `selection_getpoint` null-map → 0; seed joins unconditionally with `i
**D-1940** `pray.c` `at_your_feet` `:788–802` (Blind→Something; uswallow→into-ustuck-stomach; else be — `js/pray.js` — exported async `at_your_feet(str)` and `gcrownu()` in C order (`| 0` int idiom; `ok_wep` arrow from the C macro; otyp via `objectNames.indexOf` per the file idiom; ART_* from `./generated/artifacts_data.js
**D-1939** `zap.c` `polyuse` `:1505–1539` (bypasses → uball/uchain → `obj_resists(0,0)` → SCR_MAIL →  — `js/zap.js` — exported async `polyuse(objhdr, mat, minwt)` in C order (`| 0` int idiom, `nexthere` prefetch, `*u.ushops` as `(game.u?.ushops || '')[0]`, SCR_MAIL via `objectNames.indexOf` `>= 0` guard per the eat.js idio
**D-1938** `pickup.c` `is_boh_item_gone` `:2510–2514` (`!rn2(13)`); `do_boh_explosion` `:2518–2534` ( — `js/objnam.js` — canonical export `Doname2(obj)` (`upstart(doname(obj))`, the C highc shape; pre-existing clones stay).
**D-1937** `uhitm.c` `backstabbable` `:920–931` (`!amorphous && !is_whirly && !noncorporeal && mlet ! — `js/uhitm.js` — exported `backstabbable(mon)` (file-local `helpless` + already-imported `canseemon`, new names `amorphous`/`noncorporeal` on the existing monsters edge, `sensemon` on the existing display edge; mlet compa
**D-1936** `artifact.c` `spec_ability` `:515–522` (`get_artifact`; `arti != &artilist[ART_NONARTIFACT — `js/artifact.js` — exported sync `spec_ability(otmp, abil)` in C order (`get_artifact` → `!== list[ART_NONARTIFACT]` short-circuit → `((spfx | 0) & (abil | 0)) !== 0`, `| 0` int idiom per D-1935); completed the SPFX_* he
**D-1935** `artifact.c` `found_artifact` `:409–417` (range check → `impossible` / exists check → `imp — `js/artifact.js` — exported sync `found_artifact(a)` (`| 0` index, early returns on range/exists miss, `game.artiexist[i].found = 1`, lazy `artifacts_globals_init`) and `find_artifact(otmp)` in C ternary order (`a && !fo
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1942; wrap `wildmiss` /
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
