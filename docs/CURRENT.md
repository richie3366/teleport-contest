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

Score last measured: **2026-09-15** — full `sessions` on the working tree
(audit **1275–1281**, HEAD `f5d3798f`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `47+0.29/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-14
audit 1232–1238): **463 / 540 PASS (85.7 %)** excl. 13 env-only rows
(463/553); RNG 98.9 %; screens 98.4 %. Top owners:
`do_statusline2` ×11, `save_dungeon` ×8, `obj_resists` ×6, `distfleeck` ×5,
`one_characteristic` ×3, `m_move`/`rloc`/`chwepon` ×2, then 1-block singles
(all parked symptom/misattributed owners; `drinkfountain` since parked).
Reviews 1225–1281: 54 ACCEPT, 3 ACCEPT-WITH-DEBT, no Must-fix rows outstanding.
Live debts: 1241 SCR_MAIL (map material), 1268 light MINVENT-carrier-mx (map note).
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
scenario corpus** (`hidden-proxy status`): 463/540 PASS.
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order.
Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `dbridge.c` open_drawbridge/close_drawbridge + music passtune (debt.md D-0977; C dbridge.c:840 open_drawbridge). Probe: `node scripts/brief.mjs open_drawbridge`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2316 (index).**
<!-- recent:begin -->
**D-2316** `dbridge.c:862-863` (`Soundeffect(se_gears_turning_chains_rattling,100)` before `You_hear` — `js/hack.js` (C-file match): new export `revive_nasty` in C order — `mons()`+`is_rider` permonst (mondata.h:110), `monsterNames.indexOf('PM_WIZARD_OF_YENDOR')` (eat.js/objnam.js convention), `objects_at`/`m_at`/`Norep`/`
**D-2315** `music.c:430` (`unblock_point(x, y)` after `typ = CORR` — `js/music.js` only, no new module edges (all three source modules already imported): SCORR arm calls live `unblock_point` (joins the existing `vision.js` import; ≡ C); ALTAR arm calls live `altarmask_at(x, y)` (joins the
**D-2314** `do.c:1611–1613` (`if (falling) /* assuming this is only trap door or hole */ impact_drop( — `js/do.js` only: `if (falling) await impact_drop(null, u.ux|0, u.uy|0, newlevel.dlevel|0)` immediately before the keepdogs block, hence before `check_special_room(true)` — C relative order (impact_drop precedes both; the
**D-2313** `dbridge.c:888–1019` `destroy_drawbridge` re-read in full (brief output): `:906` `Soundeff — `js/dbridge.js` only: both `Soundeffect` calls in C order (before messages); boulder arm `await flooreffects(otmp2,x,y,'fall')` (new static `do.js` edge); debris loop verbatim (`rn2(6)`/`rn2(2)`, `mksobj_at` + `await sca
**D-2312** `dig.c` `dig` `:405–423` (occupied BEAR_TRAP `rnl(7) > (Fumbling?1:4)` self-hit `dmgval+db — `js/dig.js` only: bear-trap arm ports C order (`rnl(7)` first, `dmgval(uwep, game.youmonst)+dbon()`, `u.uarmf` halve `| 0`, `body_part(FOOT)` via dynamic `polyself.js` import — the zap_dig falling-rock convention in the 
**D-2311** `apply.c:3897–3905` `maybe_dunk_boulders` (extract then `boulder_hits_pool(otmp,x,y,FALSE) — `js/dig.js`: `maybe_dunk_boulders` now async with C order preserved — `boulder_hits_pool` via dynamic `do.js` import (the file's convention for `do.js`: `goto_level`/`dropx` same file; `imports.mjs --can dig.js do.js bou
**D-2310** `trap.c:6579–6601` `clear_conjoined_pits` (staticfn); called first from `deltrap` at `:653 — port `clear_conjoined_pits` file-local in C order (`| 0` idiom, `xdir`/`ydir`/`N_DIRS`, `DIR_180`, `isok` + `t_at` neighbour lookup); `deltrap` calls it first per C `:6535`.
**D-2309** `pray.c` `god_zaps_you` `:609–691` (no `return` after either `fry_by_god` — `js/pray.js` only (no new module edge — `shieldeff` joins the existing `display.js` import): both survive-lightning arms `await shieldeff(u.ux, u.uy)` in C order; each fry arm gates continuation on `game.program_state?.g
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2316; wrap `wildmiss` /
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
