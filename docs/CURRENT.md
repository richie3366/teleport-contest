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
(audit **1250–1254**, HEAD `f6f606f0`).
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
(all parked symptom/misattributed owners except live Open `drinkfountain`).
Reviews 1225–1231: 6 ACCEPT, 1 ACCEPT-WITH-DEBT (1227 uhitm `s_suffix` debt — already a live Open row, no Must-fix).
Reviews 1232–1238: 7 ACCEPT, 0 Must-fix.
Reviews 1239–1243: 4 ACCEPT, 1 ACCEPT-WITH-DEBT (1241 mergable SCR_MAIL debt — map material, no Must-fix).
Reviews 1244–1249: 6 ACCEPT, 0 Must-fix.
Reviews 1250–1254: 5 ACCEPT, 0 Must-fix.
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
**Next cluster:** `makemon.c` birth knowledge residuals (data.md:531; D-2107 core shipped). Probe: `node scripts/brief.mjs makemon`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2293 (index).**
<!-- recent:begin -->
**D-2293** `wizcmds.c:1004–1008` (`amt = count == -1 ? DEFAULT_TIMEOUT_INCR : count`, `amt <= 0` para — `js/options.js` — `select_menu_pick_any` ports the C counting verbatim through the existing helpers (no new module edge — `toggle_menu_curr`/`menu_digit_is_gacc` join the existing `invent.js` import, same SCC, call-time 
**D-2292** `artifact.c:1490–1495` (FIRE `destroy_items` + `ignite_items(minvent)` inside `!rn2(4)`, b — FIRE/COLD/ELEC arms call the live canonicals in C order — `(await destroy_items(mdef, AD_*, dmgBox.dmg | 0)) | 0` added only when `!youdefend`, `await ignite_items(mdef?.minvent)` after on FIRE (hero minvent undefined → 
**D-2291** `artifact.c:1026–1031` (`spec_applies` SPFX_DFLAG2: `(ptr->mflags2 & weap->mtype) || (your — the C `||` chain verbatim in C order (mflags2 first, then the yours gate): `!Upolyd(u)` + `(game.urace.selfmask & mtype)` selfmask arm, then `(mtype & M2_WERE) && ismnum(u.ulycn)` were arm with no Upolyd gate, per C shor
**D-2290** `trap.c:1211` (arrow hero `u.usteed && !rn2(2) && steedintrap(trap, otmp)` before `thitu(8 — dart/arrow hero arms gate `u.usteed && !rn2(2) && await steedintrap(trap, otmp)` ahead of `thitu` in C order (t_missile → poison → dmgval → gate → thitu/place), steed-hit arm a bare `;` with the otmp-consumed note, miss 
**D-2289** `trap.c:4657–4710` (`pot_acid_damage`: Blind off-invent `dknown = 0`, `acid_ctx` dkn/unk_b — new `export function blank_novel(obj)` in `js/zap.js` directly after `cancel_item` (C position `:1367` after cancel), wired at both C call sites (cancel `:1330`, water_damage `:4820`); new file-local `pot_acid_damage(obj
**D-2288** `teleport.c:2006–2098` (`mlevel_tele_trap`; stronghold valley `:2018`, botlevel avoid `:20 — `js/trap.js`: new `export function clamp_hole_destination(dlev)` beside `hole_destination`, over the existing quest/hell-aware file-local `dng_bottom` (C `trap.c` staticfn position).
**D-2287** `attrib.c:439–451` (`set_moreluck`: `stone_luck(TRUE)`; `!luckbon && !carrying(LUCKSTONE)` — new `export function set_moreluck()` in `js/attrib.js` in C position (after `stone_luck`, matching `:441` after `:423`), C order (`stone_luck(TRUE)` first, `carrying` short-circuited); luck-first else-if gates in all fou
**D-2286** `lock.c:957–1020` (`doclose`): `!isok(x,y)` goes to `nodoor` while `res` is still `ECMD_OK — C order in C position — isok check first, returning `res` while still `ECMD_OK`; Confusion/Stunned cost after (stumble stays deferred between them, noted in the comment); new Blind block calling the already-imported `upd
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2293; wrap `wildmiss` /
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
