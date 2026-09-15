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
(audit **1307–1313**, HEAD `e2d16801`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.30/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-15
audit 1307–1313): **478 / 540 PASS (88.5 %)** excl. 13 env-only rows
(478/553); RNG 98.9 %; screens 98.5 %. Top owners:
`do_statusline2` ×10, `obj_resists` ×6, `distfleeck` ×5,
`m_move` ×3, `one_characteristic` ×3, `rloc` ×2, then 1-block singles
(all parked symptom/misattributed owners; `save_dungeon` ×8 cleared by D-2341, knockback cleared by D-2347).
Reviews 1225–1313: 83 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 Must-fix outstanding (1307 `done_in_by` imitator predicate → Next cluster; audits 1308–1313 all ACCEPT).
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
**Next cluster:** `muse.c` use_defensive hurt-monster defensive-item depth (TOP30 #18, 12% ported, dead callees mreadmsg/reveal_trap/mon_escape/mon_consume_unstone; reached by scen-tour-Archeologist-92023 + scen-tour-Wizard-91112 traces; archived import row is wiring-only; never live/parked). Probe: `node scripts/brief.mjs use_defensive`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2349 (index).**
<!-- recent:begin -->
**D-2349** `nethack-c/upstream/src/shk.c` `shk_your` `:5862–5877` (`!shk_owns && !mon_owns` order) +  — `js/shk.js` — exported `shk_owns_prefix` (C `shk_owns` order, canonical `timeout.js` `get_obj_location(obj, 0)` via existing import, local `costly_spot`/`inside_shop`/`shop_keeper`/`s_suffix`/`shkname`; the file-local pr
**D-2348** `nethack-c/upstream/src/end.c` `done_in_by` `:184-190` (`mptr = mtmp->data`, `champtr = is — `js/end.js` only: `mptrNdx = mptr?.mndx ?? mnum`, `chamNdx = ismnum(cham) ? cham : mptrNdx`, `imitator = mptrNdx !== chamNdx || mimicker` with C citations (`end.c:184-190`, `makemon.c:1355-1359`, `mon.c:535-546`).
**D-2347** `nethack-c/upstream/src/mhitu.c` `magic_negation` hero arm (`:1087–1137`): `gotprot = (EPr — `js/mhitm.js` `magic_negation_you` exported with the full C hero arm in C order (gotprot from `u.EProtection` flat mirror or `uprops[PROTECTION].extrinsic` — eat.js:746 idiom; `AMULET_OF_GUARDING` via the `objectNames.in
**D-2346** `nethack-c/upstream/src/apply.c` `do_break_wand` `:3909–4146` — `js/apply.js` only (+22/−15, no new modules): `await check_unpaid(obj)` before `costly_alteration`; real `freeinv(obj)` (already imported); `Soundeffect(se_wall_of_force, 65)` in C order (`imports.mjs --can apply.js sndp
**D-2345** `nethack-c/upstream/src/pray.c` `offer_real_amulet` `:1529–1589` (Amulet_off-if-worn, carr — `js/pray.js` only — file-local async `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` in C order (C `staticfn` ⇒ file-local, matching `offer_corpse`/`offer_negative_valued`), wired into `dosacrifice` replacin
**D-2344** `nethack-c/upstream/src/priest.c` `angry_priest` `:876–911` (`findpriest(temple_occupied(u — `js/priest.js` — exported `free_epri` (GC replaces `free()`: null the `mextra.epri` slot, then `ispriest=0` like C) and exported async `angry_priest` in C order (`findpriest(temple_occupied(...))` early-return, `await wa
**D-2343** `nethack-c/upstream/src/pray.c` `offer_different_alignment_altar` `:1630–1695` (conversion — `js/attrib.js` — exported `uchangealign` (1:1 with C `attrib.c`): ublessed=0 + `game.flags.botl` (pray.js-guarded idiom), CONVERT livelog `permanently converted to <adj>` via `aligns[1-newalign]` (roles.js order matches 
**D-2342** `nethack-c/upstream/src/sp_lev.c` `spo_end_moninvent` `:3031–3036` (`m_dowear(invent_carry — `js/mklev.js` only, zero new module edges (`imports.mjs --can mklev.js worn.js m_dowear` → ALREADY: file already statically imports worn.js).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2349; wrap `wildmiss` /
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
