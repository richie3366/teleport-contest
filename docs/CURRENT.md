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
(audit **1321–1323**, HEAD `509a41c5`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.29/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-15
audit 1307–1313): **478 / 540 PASS (88.5 %)** excl. 13 env-only rows
(478/553); RNG 98.9 %; screens 98.5 %. Top owners:
`do_statusline2` ×10, `obj_resists` ×6, `distfleeck` ×5,
`m_move` ×3, `one_characteristic` ×3, `rloc` ×2, then 1-block singles
(all parked symptom/misattributed owners; `save_dungeon` ×8 cleared by D-2341, knockback cleared by D-2347).
Reviews 1225–1323: 91 ACCEPT, 3 ACCEPT-WITH-DEBT, 0 Must-fix outstanding (1314 → D-2351 shipped+stamped; 1316 → D-2352 shipped+stamped; 1315/1317–1323 ACCEPT).
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
**Next cluster:** `trap.c` move_into_trap body (no `move_into_trap` symbol in `js/`; data.md:176 named with stumble_on_door_mimic; never own-row live/archived/parked). Probe: `node scripts/brief.mjs move_into_trap`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2372 (index).**
<!-- recent:begin -->
**D-2372** `nethack-c/upstream/src/trap.c` `move_into_trap` `:5393–5437` (`test_move(u.ux,u.uy,sgn(x- — `js/trap.js` only, no new modules, no new module edges (`imports.mjs --can` ALREADY on all three static extends: `trap.js → ball.js` for `drag_ball`/`move_bc`, `trap.js → apply.js` for `check_leash`, `trap.js → steed.js`
**D-2371** `nethack-c/upstream/src/zap.c` `poly_obj` `:1905–1914` (`get_obj_location` + `old_wornmask — 2 js files, no new modules, no new module edges (`imports.mjs --can` ALREADY on `zap.js → u_init.js`; `u_init.js` imports nothing from `zap.js` — no cycle; both names used only at runtime inside async `poly_obj` — no top
**D-2370** `nethack-c/upstream/src/quest.c` `artitouch` `:125–136` (`!Qstat(touched_artifact)` → `obs — 2 js files, no new modules (`imports.mjs --can` SAFE on `is_quest_artifact`; `quest.js → invent.js` ALREADY; new `u_init → quest` edge reads both names only at runtime inside `addinv_core1` — no top-level TDZ read): new 
**D-2369** `nethack-c/upstream/src/spell.c` `dovspell` `:2021–2053` (VIEW loop; `SPELLMENU_SORT` → `s — `js/spell.js` only, no new modules, no new module edges (all names — `ATR_INVERSE`, `paint_corner_nhw_menu`, `dismiss_nhw_menu`, `flush_screen`, `nhgetch`, `objectNameStrs`, `game.objects` oc_level/oc_skill, `ECMD_OK` — 
**D-2368** `nethack-c/upstream/src/sp_lev.c` `is_ok_location` `:1280–1308` (`:1284–1285` `Is_waterlev — `js/mklev.js` only, no new modules, no new module edges (`imports.mjs --can` ALREADY on both: `is_pool`/`is_lava` join the existing `./hack.js` import, `Is_waterlevel` rides the pre-existing `./const.js` edge — all used 
**D-2367** `nethack-c/upstream/src/pray.c` `bestow_artifact` `:1781–1836` (raw `u.ulevel > 2 && u.ulu — `js/pray.js` only, no new modules, no new module edges (all four artifact names + `y_n` ride pre-existing edges — `imports.mjs --can` ALREADY on both; used only at runtime inside the function body — no top-level TDZ read
**D-2366** `nethack-c/upstream/src/zap.c` `resist` `:6100–6158` (`:6141` `resisted = rn2(100 + alev - — `js/zap.js` only, no new modules, no new module edges (callee is a hoisted same-file `async function` declaration — no import, no TDZ read): the `if (resisted)` arm awaits `shieldeff_mon(mtmp)` when `tell`, before the ha
**D-2365** `nethack-c/upstream/src/monmove.c` `mon_would_consume_item` `:1036–1050` (`CORPSE && !touc — `js/monmove.js` only, no new modules, no new module edges (`imports.mjs --can` ALREADY on both: `dogfood` joins the existing `dogmove.js` import, `EDOG`/`has_edog`/`ACCFOOD`/`MANFOOD` join the existing `const.js` import 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2372; wrap `wildmiss` /
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
