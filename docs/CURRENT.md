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

Score last measured: **2026-09-08** — full `sessions` on the working tree
(audit **1103–1107**: b9b2fdef…79844c1c, D-2137…D-2147).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`63+0.39/turn` (R² 0.81).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `88+0.74/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 990–1073: 75 ACCEPT, 5 ACCEPT-WITH-DEBT (debts map-named), 4 QUALITY-RISK Must-fix all shipped/prepended (full record: reviews/ + DIVERGENCE-INDEX).
Reviews 1074–1082: 7 ACCEPT, 2 ACCEPT-WITH-DEBT (debts map-pointed), 0 Must-fix.
Reviews 1089–1096: 8 ACCEPT, 0 Must-fix.
Reviews 1097–1102: 6 ACCEPT, 0 Must-fix.
Reviews 1103–1107: 5 ACCEPT, 0 Must-fix.
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

**Notable non-PASS:** none — fortress 44/44.
Fortress report `docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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
**Next cluster:** - [ ] `mon.c` mondead — blocks 1/553 corpus sessions (first at step 81): C draws `rnd(5)=1` in mondead, JS `rn2(6)=2` from xkilled(uhitm.js:669). Probe: `node scripts/hidden-proxy.mjs verify mondead` (scen-genesis-Barbarian-92111).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2147 (index).**
<!-- recent:begin -->
**D-2147** `mon.c:3081–3177` (`mondead`: be_sad flag `:3089–3101`, `lifesaved_monster`, vampshifter r — `js/mhitm.js` export now ports the sync-safe prefix in exact C order and short-circuit (be_sad read+clear; cham/were restore via live `set_mon_data`/`ismnum`/`mons`/`NON_PM` + `monsterNames.indexOf` PM consts per file id
**D-2146** `artifact.c:1248–1434` (`Mb_hit`: `scare_dieroll` spe damping, `!spec_dbon_applies→dieroll — `js/artifact.js` only — exported async `Mb_hit` in exact C order and short-circuit (tier cascade, `dr<=scare/2` cancel floor via `Math.trunc`, hit pline before effects, CANCEL `cancel_monst` + rehumanize `dmg=0` + uenmax
**D-2145** `end.c:183–190` (`mptr`/`champtr` + `distorted`/`mimicker`/`imitator`), `:195–205` (G_UNIQ — `js/end.js` only, in C order and short-circuit: `mptr`/`champtr`/`distorted`/`mimicker`/`imitator` decls; G_UNIQ gate with imitator + High-Cleric conditions and `type_is_pname` no-`the` arm; `minvis` + `hallucinogen-dist
**D-2144** `artifact.c:1550–1644` (SPFX_BEHEAD: Tsurugi `dieroll==1` engulf-slice / `notonhead→FALSE` — `js/artifact.js` only — full BEHEAD arm in C order and short-circuit (Tsurugi `ART_TSURUGI_OF_MURAMASA` + Vorpal `ART_VORPAL_BLADE` from `generated/artifacts_data.js`; `PM_JABBERWOCK` via the existing `monsterNames.index
**D-2143** `hack.c:2995–3018` (`runmode_delay_output`: `(svc.context.run || gm.multi) && flags.runmod — new exported async `runmode_delay_output()` in `js/hack.js` (C-faithful home, `// src/hack.c:2995` cite): raw-string normalization with C's prefix table in C order (`teleport→TPORT, run→LEAP, walk→STEP, crawl→CRAWL`, cas
**D-2142** `uhitm.c:375–415` (`find_roll_to_hit`: `tmp = 1 + abon() + find_mac(mtmp) + u.uhitinc + sg — `js/uhitm.js` only — `near_capacity` joins the existing static `invent.js` edge (`imports.mjs --can`: already imported, no new edge); `find_roll_to_hit` applies `if (cap) tmp -= cap*2-1; if (u.utrap) tmp -= 3;` in C orde
**D-2141** `invent.c:1227–1231` (`hold_another_object` artifact-refuse arm: `obj_extract_self(obj)` t — `js/invent.js` only — `await dropy(obj)` after `obj_extract_self(obj)` in the refuse arm (C `:1229`), with C cite.
**D-2140** `mcastu.c:247–304` (`ret = M_ATTK_HIT` + `switch (mattk->adtyp)` AD_FIRE/AD_COLD/AD_MAGM/S — `js/mcastu.js` only — full C switch in C order and short-circuit: FIRE (`pline("You're enveloped in flames.")`, `Fire_resistance()` → `shieldeff` + resist pline + `monstseesu(M_SEEN_FIRE)` + `dmg = 0` else `monstunseesu`
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2147; wrap `wildmiss` /
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

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
