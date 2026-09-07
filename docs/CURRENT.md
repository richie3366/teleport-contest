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

Score last measured: **2026-09-07** — full `sessions` at **D-2027**
(audit **990–997**, `3dee5419`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`71+0.44/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `71+0.44/turn` (R² 0.78) |
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
Reviews 990–997: 7 ACCEPT, 1 ACCEPT-WITH-DEBT (991 readobjnam grey-spell/armour fixups → map-name debt, no Must-fix).
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
Pop `LOOP-QUEUE.md` Must-fix (4 `ReferenceError` imports kill 8
sessions) then Open in order; every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `- [ ] wizard.c tactics/target_on — covetous pursuit + STRAT_HEAL branch deferred; 4 ex-collect_coords sessions diverge here (C collect_coords rn2(8) with no tactics draw vs JS tactics rn2(5/33)/distfleeck rn2(5)). Probe: node scripts/hidden-proxy.mjs verify collect_coords` (scen-poly-Healer-92107, scen-tour-Priest-92235, scen-tour-Samurai-91113, scen-tour-Wizard-92103). (`collect_coords` parked 2026-09-07: symptom owner, body C-faithful.)
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2029 (index).**
<!-- recent:begin -->
**D-2029** `timeout.c:674–685` STONED expiry inside the uprops TIMEOUT loop — `js/timeout.js` — new STONED expiry arm before SLIMED (C switch order): `find_delayed_killer(STONED)` name (default «killed by petrification»/`NO_KILLER_PREFIX`), `dealloc_killer`, `await done_timeout(STONING, STONED)`, 
**D-2028** `pickup.c:2972–3226` `use_container` — `js/pickup.js` — `Tobjnam` + `thesimpleoname as thesimpleoname_objnam` extend the pre-existing `./objnam.js` import (same SCC edge, runtime-only reads, no TDZ risk); `in_or_out_menu` Look/stash rows via the discovery-awa
**D-2027** `wizard.c:537–581` `pick_nasty` — `js/makemon.js` `pick_nasty` — verbatim port of the `:567–579` gate (`pmnames[alt]?.[NEUTRAL]`, `lastIndexOf(' ')`→slice for `lastspace`, `startsWith('baby ')` + the three suffix comparisons, same short-circuit shape; pu
**D-2026** `eat.c:543–573` `done_eating` — `js/eat.js` `done_eating` — nomovemsg arm first (print when message, always clear to null, cf.
**D-2025** `insight.c:1667–1858` enlightenment Attributes — `js/invent.js` new `hero_Polymorph_control`/`hero_Regeneration` + Displaced/Regen/Polycontrol arms in C order (final + overlay paths); `js/artifact.js` `abil_to_spfx` 12-row table, `what_gives` takes propidx; `js/attrib.js` `from_what` passes it through
**D-2024** `polyself.c:859–872` `polymon` mhmax block — `export` on `makemon.js golemhp` (no clone #2); `polyself.js` imports `{ golemhp, is_home_elemental }` from `./makemon.js` (new edge, same 90-module SCC; `imports.mjs --can` CHECK verdict — both are hoisted function decl
**D-2023** `timeout.c:456–521` `slimed_to_death` — `js/timeout.js` — new `done_timeout(how, which)` (C `:574–585` verbatim shape) + new `slimed_to_death(kptr)` (killer setup, emits_light/del_light_source, mvitals dance, `await polymon`, done_timeout, gameover guard for C
**D-2022** (1) `makemon.c:1369–1384` mitem block — (1) makemon.js: `if (no_of_wizards === 1 && Is_earthlevel(game.u?.uz)) mitem = otyp('SPE_DIG')` (C `:1372–1373` gate verbatim; `imports.mjs --can makemon.js const.js Is_earthlevel`: already statically imported, no new ed
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2029; wrap `wildmiss` /
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
