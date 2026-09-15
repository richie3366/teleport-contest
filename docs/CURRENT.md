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
(audit **1261–1269**, HEAD `3010c0c3`).
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
Reviews 1225–1269: 42 ACCEPT, 3 ACCEPT-WITH-DEBT, no Must-fix rows outstanding.
Live debts: 1227 s_suffix (row retired), 1241 SCR_MAIL (map material), 1268 light MINVENT-carrier-mx (map note).
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
**Next cluster:** `cmd.c` rhack `-`→fight binding (fresh rescore 2026-09-14: ownerless screen step, C«» vs JS«Unknown command '-'» — C number_pad map binds `-` to fight, cmd.c:2772, consumed via cmdbind_get in rhack :3679; no `'-'` binding in js/cmd.js so JS falls to the Unknown-command arm js/cmd.js:3074). Probe: `node frozen/ps_test_runner.mjs .cache/hidden/sessions/random-seed0015-valk-level2-pit-dog-wait-eb7e90ad.session.json` (step 33/72) + `node scripts/brief.mjs rhack`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2305 (index).**
<!-- recent:begin -->
**D-2305** `trap.c` `unsqueak_ok` `:5606–5626`; `disarm_squeaky_board` `:5630–5660`; `try_disarm` bou — `js/trap.js` only, no new module edge (`getobj`/`useup`/`consume_obj_charge` join the existing `invent.js` import; `GETOBJ_*` join `const.js`; `unblock_point` joins `vision.js`; `POT_OIL` follows the file's `objectNames.
**D-2304** `mklev.c:2036-2150` `mktrap` (invalid-args once-guard + paniclog; `m.x=m.y=0`; tm pool/lav — `js/mklev.js` only, no new cross-module edge (every callee same-module or already imported — `MKTRAP_NOFLAGS/SEEN/MAZEFLAG` join the existing `const.js` flag import; `--can` correctly skipped): new `traptype_roguelvl` ve
**D-2303** `explode.c:776-790` (`fracture_rock(otmp); place_object(otmp, sx, sy); if ((otmp = sobj_at — port the C arm verbatim in C order over live callees only — `otmp = sobj_at(BOULDER, sx, sy); if (otmp) { obj_extract_self(otmp); place_object(otmp, sx, sy); }` with the C comment cited.
**D-2302** `light.c:169–250` (`do_light_sources`): clear `LSF_SHOW` per entry (`:177`); `LS_OBJECT` r — port the C skeleton in C order over the existing inline refresh (conditions unchanged): file-local `const LSF_SHOW = 0x1` (light.c:41; the line-29 `COULD_SEE` precedent — no new module edge, no `imports.mjs --can` needed
**D-2301** `trap.c:116–123` (`mat_idx = objects[item->otyp].oc_material; Sprintf(buf, "%s %s", materi — file-local `const materialnm` (22 words, C order, `decl.c` C-ref; eat.js `foodwords` precedent — no new module edge, no `imports.mjs --can` needed; the C `nhlobj.c:222` Lua "material" use is out of scope and noted at the
**D-2300** `worm.c:614–635` `place_wsegs` (body already live in `js/worm.js`); callers `mon.c:2536–25 — both arms in C order over live callees only — `if ((mtmp2.wormno | 0)) place_wsegs(mtmp2, mtmp)` after the steed-gated `place_monster` in `replmon`; `if ((mtmp.wormno | 0)) place_wsegs(mtmp, null)` between `place_monster
**D-2299** `mon.c:2515–2563` `replmon` (inventory check `:2520–2524`, polearm `:2525–2527`, `relmon`  — `replmon` ports C order over live callees only — `impossible` (display.js), `place_monster` (steed.js), `OBJ_MINVENT` (const.js) and `remove_worm` (worm.js) all join already-imported modules (`imports.mjs --can`: all ALR
**D-2298** `nethack-c/upstream/src/pager.c:2077–2141` `look_traps` (glyph branch `:2092–2096`: `glyph — port the C body in C order over live callees only — `glyph_at`/`glyph_is_trap`/`glyph_to_trap`/`trap_to_glyph` (display.js), `trap_description` (local, C `staticfn`), `t_at`/`trapname` (trap.js), `couldsee` (vision.js), 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2305; wrap `wildmiss` /
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
