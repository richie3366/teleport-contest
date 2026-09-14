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

Score last measured: **2026-09-14** — full `sessions` on the working tree
(audit **1239–1243**, HEAD `3fcfefe2`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`90+0.61/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `90+0.61/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-14
audit 1232–1238): **463 / 540 PASS (85.7 %)** excl. 13 env-only rows
(463/553); RNG 98.9 %; screens 98.4 %. Top owners:
`do_statusline2` ×11, `save_dungeon` ×8, `obj_resists` ×6, `distfleeck` ×5,
`one_characteristic` ×3, `m_move`/`rloc`/`chwepon` ×2, then 1-block singles
(all parked symptom/misattributed owners except live Open `drinkfountain`).
Reviews 1225–1231: 6 ACCEPT, 1 ACCEPT-WITH-DEBT (1227 uhitm `s_suffix` debt — already a live Open row, no Must-fix).
Reviews 1232–1238: 7 ACCEPT, 0 Must-fix.
Reviews 1239–1243: 4 ACCEPT, 1 ACCEPT-WITH-DEBT (1241 mergable SCR_MAIL debt — map material, no Must-fix).
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

**Notable non-PASS:** none — 44/44.

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
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `end.c` really_done — death-disclosure tail arms (TOP30 #21; reached by every scen-death session). Probe: `node scripts/brief.mjs really_done`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2283 (index).**
<!-- recent:begin -->
**D-2283** `potion.c:178–188` (`make_sick` `:137–190` tail: `kptr = find_delayed_killer(SICK)`; `if ( — the C arm verbatim in C position: `const kpfx = (cause && cause === '#wizintrinsic') ?
**D-2282** `shk.c:628–661` (`credit_report`: static `credit_snap[2][3]`; `idx` 0 → zero both rows els — new `export async function credit_report(shkp, idx, silent)` in `js/shk.js:453` in C position (after `rob_shop`, before `remote_burglary` `:664` — matching C `:628` between its neighbors), module-level `credit_snap`, C o
**D-2281** `invent.c:1466–1475` (`sobj_at`: walk `svl.level.objects[x][y]` nexthere chain, `otyp ==`  — new `export function sobj_at(otyp, x, y)` in `js/mkobj.js` directly before `nxtobj` (C position :1466 before :1479; same file as its C neighbor, whose `(otyp|0)===(type|0)` compare it shares — C-exact for int otyps). 9 c
**D-2280** `timeout.c:2339–2353` (`obj_move_timers`: walk `gt.timer_base`; per TIMER_OBJECT match on  — new `export function obj_move_timers(src, dest)` in `js/mkobj.js` in C position (directly before `obj_split_timers`, matching C `:2339` before `:2358` — same file as its sibling, timer home per review 533).
**D-2279** `light.c:779–803` (`obj_split_light_source`: walk `gl.light_base`; per LS_OBJECT match on  — new `export function obj_split_light_source(src, dest)` in `js/timeout.js` in C position (directly before `obj_merge_light_sources`, matching C `:779` before `:808` — same file as its sibling, both callees file-local, no
**D-2278** `shk.c:3622–3658` (`splitbill`: `shop_keeper(*u.ushops)` + `inhishop` gate, `onbill(obj, s — new `export function splitbill(obj, otmp)` in `js/shk.js` in C position (directly before `sub_one_frombill`, matching C `:3623` before `:3660`), in C order: shkp gate → onbill gate → decrement → full-bill `unpaid = 0` el
**D-2277** `monmove.c:54–74` (`mb_trapped`: verbose KABOOM/nearby-distant via `mdistu > 49`, `wake_ne — both clones deleted; `import { mb_trapped } from './monmove.js'` in `dig.js` + `lock.js` (hoisted function declaration, call-time use only — `imports.mjs --can` SAFE on both edges, same 90-module SCC, no top-level TDZ re
**D-2276** `insight.c:1859–1878` (`Upolyd && u.umonnum != u.ulycn && !(final == ENL_GAMEOVERDEAD && u — `js/invent.js` final builder — the C arm verbatim in C position (after Polymorph_control, before were-form): `Upolyd && umonnum != (ulycn ??
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2283; wrap `wildmiss` /
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

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-TOP30.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
