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

Score last measured: **2026-09-09** — full `sessions` on the working tree
(audit **1176–1178**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`46+0.28/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `46+0.28/turn` (R² 0.79) |
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
Reviews 990–1082: 82 ACCEPT, 7 DEBT (map-named/pointed), 4 QUALITY-RISK all shipped/prepended (record: reviews/ + DIVERGENCE-INDEX).
Reviews 1089–1175: 84 ACCEPT, 0 Must-fix except 2 DEBT (1136 Hallucination import, 1137 save.js restore_waterlevel await) + 1 QUALITY-RISK prepended (1152 gloves literal).
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
**Next cluster:** `sounds.c` dosounds feature gates — findgd migrating / Is_sanctum / Soundeffect / temple Hallu pantheon RNG still deferred (named absent.md:16). C RNG + You_hear message surface.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2217 (index).**
<!-- recent:begin -->
**D-2217** `sounds.c:202–339` `dosounds` (vault `:262–289` Soundeffect volumes 30/30, throne `:45–50` — `js/sounds.js` — seven `Soundeffect(se,vol)` sites in C order/volumes (contest C macro is equally empty without SND_LIB, `sndprocs.h:272`, so zero behavior change, strictly more faithful wiring; se ids from `generated/se
**D-2216** `mkmaze.c:1097-1124` `populate_maze` (rn1/rn2 loop counts, `mazexy` + `mkobj_at`/`mksobj_a — `js/mklev.js` only, no new cross-module edge (every callee same-module or already imported: `rn1`/`mkobj_at`/`mksobj_at`/`mkgold`/`makemon`/`mons`/`NO_MM_FLAGS`/`GEM_CLASS`/`RANDOM_CLASS`/`impossible`/`maketrap` — `--can
**D-2215** queue owner `detect.c:2099` (`return dosearch0(0) ? ECMD_TIME : ECMD_OK`) is the symptom o — `js/mthrowu.js` — full `:702–786` envelope in C order (EGG impossible/petrifier-FALLTHROUGH via live `touch_petrifies`; pie/venom `thitu(8,0)`; default elf `oc_skill==-P_BOW`/ELVEN_BOW/ELVEN_ARROW/bigmonst arms + acid-ve
**D-2214** `eat.c:1078–1095` ACID_RES/STONE_RES arms — `js/eat.js` only — appended `.` to all four ACID/STONE literals to match C `"%s."`.
**D-2213** `apply.c:3857` `You("are yanked toward the %s!", surface(cc.x, cc.y))`; `dungeon.c:1749–17 — `js/apply.js` only — `import { surface } from './sit.js'` (canonical `dungeon.c:1750` port, D-2008; `imports.mjs --can apply.js sit.js surface` → IN-SCC hoisted-function SAFE, and `sit.js` holds no static `apply.js` edge
**D-2212** `detect.c:2022–2024` uswallow arm — `js/detect.js` only — uswallow arm now `await Norep('What are you looking for?
**D-2211** queue owner `use_misc(muse.c:2552)` is a literal tie-break, not the printer: line 2552 is  — `js/uhitm.js` only — AD_FIRE arm now `await erode_obj(weapon, null, ERODE_BURN, EF_NONE)` via dynamic `./trap.js` import (same-function AD_CORR convention, no new static edge; `weapon` is the C-resolved `obj`); `ERODE_BU
**D-2210** `insight.c:3402–3489` `ustatusline` — `js/insight.js` only — full info chain in C order with house predicate idioms (`u.Sick/Stoned/Slimed` + uprops-intrinsic mirrors per `display.js:5700–5703`; Strangled H/E flats + intrinsic/extrinsic; Vomiting flat-or-int
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2217; wrap `wildmiss` /
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
