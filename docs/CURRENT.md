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
(audit **1288–1291**, HEAD `6508dec4`).
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
Reviews 1225–1291: 62 ACCEPT, 3 ACCEPT-WITH-DEBT, 2 Must-fix rows outstanding (1289 `surface` drawbridge-under nouns, message-only; 1291 dwarvish-cloak 90 ward arm, RNG-live).
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
**Next cluster:** `dokick.c` kick_nondoor SDOOR/altar/fountain/grave/sink + altar_wrath/disturb_grave/sink_backs_up (named absent.md:25-26, D-0985; never live/archived/parked). Probe: `node scripts/brief.mjs kick_nondoor`. (Prior head `mon.c` resists_ston/poly_when_stoned parked 2026-09-15, no js/ — dead-arm proof in LOOP-QUEUE Parked.)
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2328 (index).**
<!-- recent:begin -->
**D-2328** `nethack-c/upstream/src/steed.c` `use_saddle` `:63–69` — `js/steed.js` only, no new static module edges: `poly_when_stoned` joins the existing `monsters.js` import and `Mgender` joins the existing `do_name.js` import (`imports.mjs --can` ALREADY for both); `PM_STONE_GOLEM` con
**D-2327** `nethack-c/upstream/src/dungeon.c` `surface` `:1749–1788` — clone deleted; `js/dig.js` imports the shared C-order `surface` from `js/sit.js` (D-2008 home: SURFACE_AT/`db_under_typ`, air-bubble, pool, ice, lava, bridge, SDOOR, earthlevel gate) with a C-citing import comment.
**D-2326** `nethack-c/upstream/src/zap.c` `u_adtyp_resistance_obj` `:5676–5698` — `js/invent.js` only, no new module edges (`objectNames` already imported; `AD_COLD`/`AD_FIRE` file-local monattk.h block; `game.u.uarmc` ≡ C `uarmc`): the cloak arm in C position and C predicate order (`AD_COLD || AD_FIR
**D-2325** `nethack-c/upstream/src/trap.c` `erode_obj` `:170–354` (whole body, C order) + `nethack-c/ — `js/trap.js` — erode_obj rewritten arm-for-arm in C order: victim (carried_obj→youmonst / OBJ_MINVENT ocarry / null) + uvictim/vismon (local canseemon) / visobj (cansee bhitpos, !is_pool || next2u-dist2≤2 + u.uinwater ≡ 
**D-2324** `nethack-c/upstream/src/invent.c` `mergable` `:4379–4499` (whole body, C order) + `nethack — `js/mkobj.js` — mergable rewritten in C order: unpaid/spe/no_charge/obroken/otrapped/lamplit block; FOOD arm kept (JS `orotten` is separate storage vs C obj.h:130 `#define orotten oeroded` — documented in comment); dknow
**D-2323** `nethack-c/upstream/src/dig.c` `dighole` `:884-1024` — `js/dig.js` only.
**D-2322** `nethack-c/upstream/src/dig.c` `zap_dig` `:1569-1582` (`u.uswallow` → `mtmp = u.ustuck`; ` — `js/dig.js` only, no new static module edges (`is_whirly` + `G_UNIQ` join the existing `monsters.js` import; `STOMACH` joins the existing `const.js` import; `s_suffix`/`mon_nam`/`pline` already imported): the `u.uswallow
**D-2321** `nethack-c/upstream/src/dig.c` `zap_dig` `:1617-1662` (pitdig setup `:1617-1623`, adjacent — `js/dig.js` only, no new module edges (all four added names join existing static imports — `imports.mjs --can` ALREADY for each: `s_suffix` joins the existing `do_name.js` import; `On_ladder` joins `mklev.js`; `DBWALL`/`
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2328; wrap `wildmiss` /
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
