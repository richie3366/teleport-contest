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
(audit **1083–1088**: 26431cce…10ea68f1, D-2117…D-2124).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`67+0.40/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `67+0.40/turn` (R² 0.79) |
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
**Next cluster:** `uhitm.c` missum — blocks 1/553 corpus sessions (first at step 118): C «You miss it. It screams! It kicks! It kicks again!--More--» vs JS «You miss it. It kicks! It kicks again! It is frozen by you.». Probe: `node scripts/hidden-proxy.mjs verify missum` (scen-poly-Knight-92220).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2124 (index).**
<!-- recent:begin -->
**D-2124** `mon.c:4265–4318` `setmangry` (reached via missum → `wakeup(mon, TRUE)` → `setmangry`), `: — `js/mon.js` only — `else { await growl(mtmp); }` in exact C position with C cite; `growl` was already imported from pre-existing `./sounds.js` edge (no new import, no TDZ risk — no `imports.mjs --can` needed); header ret
**D-2123** `do_wear.c:2029–2206` `canwearobj` (verysmall/nohands `:2036–2042`, cantweararm cloak-exce — `js/worn.js` — `cantweararm` exported (import-the-export, no second copy; `breakarm`/`sliparm` stay private).
**D-2122** `end.c:326–340` killer-based `ugrave_arise` in `done_in_by` (wraith/mummy/zombie/vampire/g — `js/end.js` — `done_in_by` ports the full `:326–340` chain in C order (`mlet` on `mtmp.data`, `zombie_maker` live import, `Race_if(PM_HUMAN)` as `urace.mnum`, ghoul by `mndx`, genod reset via live `mvitals`); `really_don
**D-2121** `objnam.c:660–664` `xname_flags` (`find_artifact` on real `dknown`, then `if (obj_is_pname — `js/objnam.js` only — `xname` returns bare `ONAME` (`The` downcase + strip leading `the `) when `obj_is_pname(obj) && has_oname(obj)`; `doname` uses the same bare `ONAME` as `base` for `isPname`, skips the `poisoned ` st
**D-2120** `insight.c:1758–1765` (Swimming+Underwater guard `:1758–1759`, Breathless `:1760–1761`, Am — `js/dbridge.js` exports the four D-1967 predicates (import-the-export, no second macro implementation); `js/invent.js` extends the same-edge static `./const.js` import (SWIMMING/MAGICAL_BREATHING/PASSES_WALLS) and ports 
**D-2119** `hack.c:2693–2709` `domove()` (writer behind the `dog_move` symptom): `gk.kickedloc.x = 0, — `js/cmd.js` only, exact C shape — `game.kickedloc = { x: 0, y: 0 }` unconditional in `domove()`'s `finally` beside `game.domove_attempting = 0` (C `:2708` position); removed the `did_step`-gated clear and the three now-r
**D-2118** `dungeon.c:1941–1945` `In_hell` (`svd.dungeons[lev->dnum].flags.hellish`) via `dungeon.h:1 — `js/pray.js` only — `Inhell()` now the dungeon `hellish` flag; `GEHENNOM` import dropped.
**D-2117** `polyself.c:1420–1447` `dobreathe` (writer behind the `getdir` screen literal): Strangled  — full C-order port in `js/polyself.js` (energy cost lands before the prompt, so a cancelled breath still costs 15 — dosummon botl idiom); `BZ_U_BREATH` added to `js/const.js` (`hack.h:1484` mirror beside `BZ_OFS_AD`/`BZ_M
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2124; wrap `wildmiss` /
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
