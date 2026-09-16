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

Score last measured: **2026-09-16** — full `sessions` on the working tree
(audit **1368–1373** + D-2403…D-2407).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.30/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-16
audit 1368–1373 + D-2403…D-2407): **485 / 540 PASS (89.8 %)** excl. 13 env-only rows
(485/553; D-2405/D-2406/D-2407 moved Knight-92002 + Wizard-92219 to PASS and the lembas pair + Samurai-92032 to later owners); RNG 99.0 %; screens 98.7 %. Top owners:
`distfleeck` ×7, `do_statusline2` ×4, `m_move` ×3, `obj_resists` ×3,
`rloc` ×2, `one_characteristic` ×2, then 1-block singles
(incl. `savelife` ×1 and `peffect_polymorph` ×1, both moved-past layers; all parked/archived owners).
Reviews 1225–1373: 134 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 6 QUALITY-RISK (all Must-fix shipped except 1 outstanding from 1372: utrap-steed is/was verb).
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
scenario corpus** (`hidden-proxy status`): 483/540 PASS; the 57 remaining
sessions sit under **parked symptom owners** (distfleeck ×7,
obj_resists ×5, do_statusline2 ×4, m_move ×3, …) worked through
`[measure]`/writer rows, never symptom re-ports. 2026-09-16 process take:
rows carry evidence, stale rows are a 3-call detour, parks requeue their
writer, `[campaign]`/`[measure]` rows replace map filler
(`LOOP-QUEUE.md` header; Constitution §10.15–16).
Pop `LOOP-QUEUE.md` Must-fix (freehand guard, docrt early-path botlx),
then Open in order — campaign botl-parity 2/3, `status_enlightenment`
held-by/utrap arms (3 sessions), the `[measure]` rows, eat `losehp`.
**Next cluster:** Must-fix `insight.c` utrap-steed is/was verb (review 1372; one-line C-ternary mirror, no corpus corner) — then DELIVERED [measure] `monmove.c` m_move Caveman-92202 `cnt-j` split (no `js/`): C MEAS n=5551 vs scratch-JS JMEAS n=5551 — goblin@22,6 cnt C5/J4, mtrack identical, C extra (21,5)/ALLOW_M = kobold-zombie occupant → writer Open row `mon.c mm_aggression/mm_displacement` (3 sessions: Caveman-92202 s103, Valkyrie-92040 s113, Valkyrie-92162 s72). Heads: the mm_aggression writer row, then `[measure]` distfleeck stream. Prior DELIVERED [measure] `teleport.c` rloc arrivals → writer Open rows `migrate_orc` + `shkinit`. Prior SHIPPED D-2407 relobj flooreffects, D-2406 enlightenment arms (review 1372 steed-verb Must-fix heads Next cluster), D-2405 botl gate + walk run=0, D-2404 canonical freehand, D-2402 polymon find_ac (detail in D-index + recent block).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2407 (index).**
<!-- recent:begin -->
**D-2407** `steal.c:874–898` `relobj` → per-head `mdrop_obj` `:813–846`, whose `:840–843` routes the  — `js/mkobj.js` — `relobj_on_death` now `async`, dynamic-imports `flooreffects` from `./do.js` (no new static edge into the 90-module SCC; same shape as `mon.js` `mdrop_obj` / `dothrow.js` `throwit`; `imports.mjs --can mko
**D-2406** `insight.c:1086–1098` (`u.utrap` → `trap_predicament(predicament, final, wizard)` + steed/ — `js/invent.js` — new exported `trap_predicament(final, wizxtra)` (`:4975`, C `:232–261` verbatim incl.
**D-2405** `allmain.c:473–479` (the gate itself) + `cmd.c:1386–1400` `set_move_cmd` (`if (!gd.domove_ — `js/allmain.js` only — the C gate verbatim on the live store (`game.flags`, which `bot()`/`flush_screen` already gate on): `botl|botlx → bot() + curs_on_u()`, else `time_botl → timebot() + curs_on_u()`; unconditional `fl
**D-2404** `nethack-c/upstream/src/engrave.c` `freehand :472–477` (`!uwep || !welded(uwep) || (!biman — `js/mthrowu.js` only — `import { freehand } from './engrave.js'` (new static edge; `imports.mjs --can mthrowu.js engrave.js freehand` → SAFE: hoisted function, same 90-module SCC, no top-level TDZ read — same shape as th
**D-2403** `nethack-c/upstream/src/display.c` `docrt_flags` — `js/display.js` only — `if (game.flags) game.flags.botlx = true;` before each of the three early `return`s (mirroring the join; `update_inventory()` stays a named omit as D-2400 named it); the in-code named-omission comm
**D-2402** `nethack-c/upstream/src/polyself.c` `polymon` find_ac `:890` + `:967` (D-0722 deferral retired, C order — `js/polyself.js` only — `find_ac()` after `drop_weapon(1)`, second after `see_monsters` before `encumber_msg()`; Tourist-92095 step-46 `AC:6` now paints post-strip; 4 poly PASS + 2 moved past, 0 worse; seed0108 303/303 holds; full 44/44)
**D-2401** `nethack-c/upstream/src/dogmove.c` `droppables` `:27–136` (dummy sentinel GOLD_PIECE/oarti — `js/dogmove.js` only — full C-order port with C FALLTHROUGH structure, `|0` oartifact integer idiom, `MON_WEP(mon)` canonical wep, `which_armor(mon, W_ARMS)` mattock gate, `is_pick`/`tunnels`/`needspick`/`nohands`/`verys
**D-2400** `display.c` docrt post_map `:1766–1769` (`!maponly`: `update_inventory(); disp.botlx = TRU — `js/display.js` only — docrt sets `game.flags.botlx = true` after `see_monsters()` (post vision path, mirroring post_map; early uswallow/water/buried returns skip it as in C); omission narrowed to params + `update_invent
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2407; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

The full index is `LOOP-QUEUE.md` **Parked** (one line each; proofs in
`docs/archive/LOOP-QUEUE-PARKED.md`). Two never re-pop without C state:

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
