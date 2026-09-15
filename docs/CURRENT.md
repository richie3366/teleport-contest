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
(audit **1348–1353**, HEAD `5c766aef`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `65+0.43/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-15
audit 1307–1313): **478 / 540 PASS (88.5 %)** excl. 13 env-only rows
(478/553); RNG 98.9 %; screens 98.5 %. Top owners:
`do_statusline2` ×10, `obj_resists` ×6, `distfleeck` ×5,
`m_move` ×3, `one_characteristic` ×3, `rloc` ×2, then 1-block singles
(all parked symptom/misattributed owners; `save_dungeon` ×8 cleared by D-2341, knockback cleared by D-2347).
Reviews 1225–1353: 119 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 1 QUALITY-RISK (Must-fix shipped D-2380); 0 Must-fix outstanding.
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx (both map notes).
Refresh on audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s);
families ≥ 85 % → grow first via `scenario-gen.mjs --n 120 --seed <iter×100>`.

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
**Next cluster:** Open `pickup.c` floor TRADITIONAL query_classes (turns.md:1543 D-1620; D-2350 FOLLOW chain live; never own-row live/archived/parked). Probe: `node scripts/brief.mjs query_classes`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2387 (index).**
<!-- recent:begin -->
**D-2387** `nethack-c/upstream/src/mondata.c:305–398` (`can_blnd`: `check_visor` set only by the BLIN — `js/mhitu.js` — `gulpmu_can_blnd` gains C's `check_visor` flag (set in the CLAW arm only) + the `:388–396` tail via new file-local `visored_helmet_worn()` (`owornmask & W_ARMH` + imported `objdescr_is` "visored helmet" o
**D-2386** `nethack-c/upstream/src/hack.c:1852–1881` (TIP_GETPOS arm `:1871–1873` `l_nhcore_call(NHCO — `js/hack.js` — TIP_GETPOS arm in C switch order (`await l_nhcore_call(NHCORE_GETPOS_TIP); return true`, `:1583–1587`) + `NUM_TIPS` range check; `js/do.js` — GETPOS_TIP dispatch (`await show_getpos_tip(); return`, `:1108–
**D-2385** `nethack-c/upstream/src/weapon.c:1424–1434` (`if (skill != P_NONE && !P_RESTRICTED(skill)) — `js/weapon.js` — `use_skill` is now `async`, C order (`P_NONE`/`P_ISRESTRICTED` guards, `advance_before = can_advance(skill, false)`, `+= degree|0`, `!before && can_advance` → `await give_may_advance_msg(skill)`); stale 
**D-2384** `nethack-c/upstream/src/trap.c:4975-5008` (over/on preposit; `surface()`; is_ice→ice_descr — `back_on_ground` ported arm-for-arm in C order over the shared `surface()` (sit.js D-2008) with the file-local `hero_Levitation()`/`hero_Flying()` preposit gate, `an`/`the` (objnam.js) matrix arms, `game.flags?.verbose !
**D-2383** `nethack-c/upstream/src/region.c:1341–1363` (`region_danger`: `!hero_inside` skip, gas_clo — both loops use the file-local `hero_inside(reg)` (no new edge, no TDZ — same-file function declaration); safety dual-writes flat + `uprops[MAGICAL_BREATHING].intrinsic` TIMEOUT bits (HBlinded precedent in `do.js`; `MAGIC
**D-2382** `nethack-c/upstream/src/hack.c:1266–1523` (`findtravelpath`: entry alloc `:1268–1269`, TRA — `js/cmd.js` — `travelmap_ensure()` (C `:1268–1269`; per-game heap on `game.travelmap`, never saved, like C) + `TRAVEL_NOPATH/STEP/STEP_UNSURE` tri-state (C returns boolean, but `You` is async-only in JS, so the sync BFS 
**D-2381** `nethack-c/upstream/src/trap.c:3937–4006` (`float_up`); `dig.c:1884–1932` (`buried_ball`); — BURIEDBALL arm calls `buried_ball(cc)` (newly exported from `js/dig.js:514`, verified arm-for-arm vs C: `!u.utrap || TT_BURIEDBALL` gate, exact-spot return, dist2≤8 nearest + cc mutation) and reads `IS_ROOM` at the ball 
**D-2380** `nethack-c/upstream/include/youprop.h:355–360` (`Protection_from_shape_changers` ≡ `u.upro — deleted the `js/lock.js:618` local, added `import { Protection_from_shape_changers } from './were.js'` (the `:57` export reads flats + `uprops[].intrinsic/extrinsic`, same shape as the `display.js`/`mon.js` clones).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2387; wrap `wildmiss` /
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
