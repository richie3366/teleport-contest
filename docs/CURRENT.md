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
(audit **1285–1287**, HEAD `95c162ad`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`46+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `46+0.29/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-14
audit 1232–1238): **463 / 540 PASS (85.7 %)** excl. 13 env-only rows
(463/553); RNG 98.9 %; screens 98.4 %. Top owners:
`do_statusline2` ×11, `save_dungeon` ×8, `obj_resists` ×6, `distfleeck` ×5,
`one_characteristic` ×3, `m_move`/`rloc`/`chwepon` ×2, then 1-block singles
(all parked symptom/misattributed owners; `drinkfountain` since parked).
Reviews 1225–1287: 60 ACCEPT, 3 ACCEPT-WITH-DEBT, no Must-fix rows outstanding.
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
**Next cluster:** `apply.c` use_unicorn_horn trouble-fix envelope (debt.md D-1030; C apply.c use_unicorn_horn). Probe: `node scripts/brief.mjs use_unicorn_horn`. → **PARKED 2026-09-15** (D-1030 family; proof in Parked). use_towel → **PARKED 2026-09-15** (D-1009; proof in Parked). use_tinning_kit → **PARKED 2026-09-15** (D-1027 stale duplicate; proof in Parked). costly_tin → **PARKED 2026-09-15** (D-0940 stale duplicate; proof in Parked). Next cluster: `apply.c` flip_coin (D-1024). Probe: `node scripts/brief.mjs flip_coin`. kick_door → **SHIPPED D-2320**; refill +`do.c` dodown (only fresh corpus owner). use_candle/use_candelabrum → **PARKED 2026-09-15** (D-1025 stale duplicate; proof in Parked). Next cluster: `apply.c` use_figurine (D-1029). Probe: `node scripts/brief.mjs use_figurine` → **PARKED 2026-09-15** (D-1029 stale duplicate; proof in Parked). Next cluster: `apply.c` use_crystal_ball (D-1010). Probe: `node scripts/brief.mjs use_crystal_ball` → **PARKED 2026-09-15** (D-1010 stale duplicate; proof in Parked). Next cluster: `dig.c` zap_dig pitdig branch via adj_pit_checks/pit_flow (JS stub `if (pitdig) break` + `pit_flow deferred`; C dig.c:1617-1662 + :1763 adj_pit_checks + :1844 pit_flow). Probe: `node scripts/brief.mjs adj_pit_checks`. Next cluster: `dig.c` zap_dig swallowed-pierce arm (JS early-return `if (u.uswallow)` js/dig.js zap_dig; C dig.c:1569-1582 pierce pline + mhp + expels). Probe: `node scripts/brief.mjs zap_dig`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2322 (index).**
<!-- recent:begin -->
**D-2322** `nethack-c/upstream/src/dig.c` `zap_dig` `:1569-1582` (`u.uswallow` → `mtmp = u.ustuck`; ` — `js/dig.js` only, no new static module edges (`is_whirly` + `G_UNIQ` join the existing `monsters.js` import; `STOMACH` joins the existing `const.js` import; `s_suffix`/`mon_nam`/`pline` already imported): the `u.uswallow
**D-2321** `nethack-c/upstream/src/dig.c` `zap_dig` `:1617-1662` (pitdig setup `:1617-1623`, adjacent — `js/dig.js` only, no new module edges (all four added names join existing static imports — `imports.mjs --can` ALREADY for each: `s_suffix` joins the existing `do_name.js` import; `On_ladder` joins `mklev.js`; `DBWALL`/`
**D-2320** `nethack-c/upstream/src/dokick.c` `kick_door` `:909–970` — `js/dokick.js` only, no new module edges (`is_giant` joins the existing `monsters.js` import — `imports.mjs --can` ALREADY; `Soundeffect` joins the existing `sndprocs.js` import; the two `se_*` constants via `generated/s
**D-2319** `nethack-c/upstream/src/dig.c` `zap_dig` beam arms — `js/dig.js` only (+ static `SHOP_WALL_COST` from `const.js`, already exported; `add_damage` via the file's existing per-arm dynamic `shk.js` import — the door arm's own convention, no new module edge, no TDZ risk): maze 
**D-2318** `trap.c` launch_obj ROLL block (`:3423–3430` down_gate/ship_object; `:3505–3513` post-swit — `js/trap.js` only (+2 static imports: `sndprocs.js` Soundeffect — `imports.mjs` SAFE, no cycle; `const.js` MIGR_NOWHERE; `dokick.js`/`do.js` via the file's in-function dynamic-import convention): ROLL gate-drop pre-block
**D-2317** `trap.c:6185` (`if (canspotmon(mon))`, openholdingtrap monster arm); `trap.c:6279` (`*noti — both call sites now use the already-imported `canspotmon` (`display.js:1237` ≡ C; no new module edge, no TDZ risk).
**D-2316** `dbridge.c:862-863` (`Soundeffect(se_gears_turning_chains_rattling,100)` before `You_hear` — `js/hack.js` (C-file match): new export `revive_nasty` in C order — `mons()`+`is_rider` permonst (mondata.h:110), `monsterNames.indexOf('PM_WIZARD_OF_YENDOR')` (eat.js/objnam.js convention), `objects_at`/`m_at`/`Norep`/`
**D-2315** `music.c:430` (`unblock_point(x, y)` after `typ = CORR` — `js/music.js` only, no new module edges (all three source modules already imported): SCORR arm calls live `unblock_point` (joins the existing `vision.js` import; ≡ C); ALTAR arm calls live `altarmask_at(x, y)` (joins the
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2322; wrap `wildmiss` /
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
