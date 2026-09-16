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
(audit **1368–1373** + D-2403…D-2423).
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
audit 1368–1373 + D-2403…D-2423): **485 / 540 PASS (89.8 %)** excl. 13 env-only rows
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
**Next cluster:** [measure] `do_statusline2` HP residuals — queue Open head (scen-poly-Healer-92107, scen-wish-Healer-92092, scen-wish-Monk-92194; identical toplines, first diff row 23 HP; top parked owner with no Open row). See `LOOP-QUEUE.md` for the full row; D-2424 shipped the `m_move` Valkyrie writer (`can_fog` door arm) this iteration.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2423 (index).**
<!-- recent:begin -->
**D-2423** `nethack-c/upstream/src/insight.c` attributes_enlightenment — arms ported in C order on both builders — final `enlightenment()` (past tense via `final`, `you_are`/`enlght_line_txt` directly) and `doattributes()` ^X (in-progress tense via `o()` wrapper; C `!final` arms read `polymor
**D-2422** `nethack-c/upstream/src/mkobj.c` weight() `:1932–1934` — the three divisor arms in C order (cursed first, C ternary short-circuit; `Math.trunc` for the round-up divisions) + a module-level `BAG_OF_HOLDING` const via `objectNames.indexOf` (same shape as `STATUE`); doc header no
**D-2421** `makemon.c:1476–1504` (`!gi.in_mklev`: `newsym`, then `!MM_NOMSG`-gated appear `Norep`, th — `js/makemon.js` only for the arm — `dochugw` added to the existing static `./monmove.js` import (`imports.mjs --can` → ALREADY, hoisted `async function`, no new edge); `makemon_appear_msg` restructured so the appear `Nor
**D-2419** `dungeon.c:1403–1414` (`ledger_to_dnum`: `ledger_start < ledgerno && ledgerno <= ledger_st — `js/teleport.js` only — local condition → `start < want && want <= start + n` with a `|0` coercion (same shape as `js/dungeon.js:718–729`), C-order comment citing `:1408–1411`.
**D-2418** `shknam.c:658–660` (`if (MON_AT(sx, sy)) (void) rloc(m_at(sx, sy), RLOC_NOMSG); /* insuran — `js/shknam.js` — `shkinit` async with the insurance arm `if (blocker) await rloc(blocker, RLOC_NOMSG)` in C order (result ignored like C's `(void)`); `RLOC_NOMSG` added to the `./const.js` import; static `import { rloc }
**D-2417** `mon.c:4349` (`wakeup` calls `finish_meating(mtmp)` unconditionally); `uhitm.c:5215–5216`  — `js/mon.js` only — `finish_meating` added to the existing static `./dogmove.js` import (`imports.mjs --can` → ALREADY, no new edge); unconditional `finish_meating(mtmp)` in C order (after the mimic/forcefight block, befo
**D-2416** `read.c:1372–1383` (`seffect_destroy_armor` scursed arm); the shipped arm is `:1380–1383`  — `js/read.js` only — `else if (await disintegrate_arm(otmp)) { known = true; }` in C order with the `return sobj` fallthrough (C `return`, not useup); `disintegrate_arm` added to the existing static `./do_wear.js` import 
**D-2412** `insight.c:3007–3131` `list_genocided` (both=dumping||genoing→'y', genoing→both=FALSE; `nu — `js/insight.js` — exported `num_extinct`/`num_gone` (C `staticfn`, exported for the test pin; out-param→returned array, LOW_PM order); `genocided_prompt`/`genocided_title`/`genocided_line` pure builders (`:3043–3048`/`:3
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2423; wrap `wildmiss` /
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
