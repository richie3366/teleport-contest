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

Score last measured: **2026-09-07** — full `sessions` at **D-1995**
(audit **950–965**, `f8079012`). Fortress **43/44**: `seed0002`
throws `DEAF is not defined` (Must-fix queued).
Scr **10,810**/11,405, RNG **765,680**/792,838, speed `56+0.35/turn`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** |
| Screens matched | **10,810 / 11,405** |
| Positional RNG calls matched | **765,680 / 792,838** |
| Speed label | `56+0.35/turn` (R² 0.80) |
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
Reviews 950–965: 14 ACCEPT, 1 debt (961), 1 QUALITY-RISK (965 → Must-fix).
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (43):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** seed0002 (`DEAF is not defined` throw; Must-fix queued).
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
**Next cluster:** `monmove.c` set_apparxy — blocks 6/553 (first at step 7): C draws `rn2(4)` in `set_apparxy :2280` (displacement / `mtmp->mux` notseen gate) where JS is in `m_initinv`; a freshly created (`^G`) monster's first move. Probe: `node scripts/hidden-proxy.mjs verify set_apparxy` (scen-genesis-Ranger-92126, scen-genesis-Ranger-92151, scen-wish-Healer-92147). (D-1998 shipped the wiz_intrinsic sick/stone/stun/vomit/warn/glib arms + tail.)
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1999 (index).**
<!-- recent:begin -->
**D-1999** `makemon.c:1391–1396` (`!in_mklev && byyou` → `newsym` + `set_apparxy` BEFORE `m_initweap` — `js/makemon.js` — `set_apparxy(mtmp)` after `newsym` in the `byyou` branch (C `:1393–1394` cite; import already existed, no new edge).
**D-1998** `wizcmds.c:948–1096` `wiz_intrinsic` — `js/wizcmds.js` — per-prop switch in exact C order with `:line` citations: SICK `!rn2(2) ?
**D-1996** `attrib.c:905–1001` `from_what` (DEAF `:931` roleplay-deaf arm); `insight.c:1059–1074` Bli — one-word addition to the existing same-edge `./const.js` import (after `BLINDED`, matching C `BLINDED=15, DEAF=16` order) with a C-citation comment.
**D-1995** `insight.c` enlightenment family — `js/invent.js` status arms (Stoned/Slimed/Strangled/Sick/Vomit/Stun/Conf/Blind-kinds/held-swallowed/Fumbling+Sleepy+Hunger-magic) + resistance `from_what` catalogue (Sleep/See_invisible/telepathic/warned/Fast/Reflecting/Lifesaved/spell-cast/wizard-record/Luck/Nth-death/bones) + corner `^X` menu; `js/attrib.js` dwa/gno infra + innate H-fields; `js/wizcmds.js` SLIMED arm. Verify: enlightenment 6 moved/1 unchanged, one_characteristic 5 PASS/8 moved, status_enlightenment 4 moved, 0 worse; wiz_intrinsic 9 unchanged (rest remains).
**D-1994** `attrib.c:520–584` `exerper` — `js/allmain.js` — SATIATED/WEAK Monk WIS arms (`(game.urole?.mnum|0)===PM_MONK` idiom) + every-5 H-only Clairvoyant WIS arm (flat+intrinsic, blocked vetoes) and H-only Regen STR arm, all with C `:line` comments (`PM_MONK
**D-1993** `mhitu.c:1421–1469` `gulpmu` switch — three one-line `exercise(A_STR, false)` insertions with C `:line` comments, each directly after its C pline.
**D-1992** `polyself.c:1305–1362` `drop_weapon` — deleted the clone; message via live `is_sword` (`./objects.js`) + `weapon_descr` (`./invent.js`) + live `makeplural` (`./objnam.js`) with C `:line` comments; drops via live sync `uswapwepgone()` + async `uwepgone()` with
**D-1991** `polyself.c:1157–1302` `break_armor` — exact-C arm order with `:line` citations — `end_burn` (new `./timeout.js` edge) + `await Armor_gone()` + `useup` (same-module `./invent.js`) for breakarm uarm; cloak 3-way on `(otyp !== MUMMY_WRAPPING || !WrappingAllowed
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1999; wrap `wildmiss` /
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
