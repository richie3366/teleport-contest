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

Score last measured: **2026-09-08** — full `sessions` at **D-2070**
(audit **1034–1040**, `55a129a8`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`60+0.39/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `63+0.43/turn` (R² 0.79) |
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
Reviews 990–1026: 32 ACCEPT, 3 ACCEPT-WITH-DEBT (debts map-named), 2 QUALITY-RISK Must-fix all shipped (full record: reviews/ + DIVERGENCE-INDEX).
Reviews 1027–1033: 7 ACCEPT, 0 Must-fix.
Reviews 1034–1040: 7 ACCEPT, 0 Must-fix.
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
**Next cluster:** `muse.c` use_misc — blocks 2/553 corpus sessions (first at step 77): C «The pit fiend drinks a dark green potion! The pit fiend look» vs JS «The pit fiend drinks a dark green potion! The pit fiend look». Probe: `node scripts/hidden-proxy.mjs verify use_misc` (scen-wish-Healer-92125, scen-wish-Healer-92173).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2072 (index).**
<!-- recent:begin -->
**D-2072** `muse.c:2402` (`mquaffmsg` at `:292–302` uses `pline_mon`, not `pline`) + gain-level arm:  — `js/muse.js` — `mquaffmsg` vismon arm → `pline_mon` (C :297); rise arm → `pline_mon` + `ceiling(mtmp.mx,mtmp.my)` + `await trycall(otmp)`; skipmsg → `pline_mon` + `await trycall(otmp)`; uncursed → `pline_mon` + `if (!(aw
**D-2071** `uhitm.c:2338–2360` `mhitm_ad_corr`, mhitu arm `:2346–2351` (`hitmsg`; `magr->mcan → retur — `js/mhitu.js` — file-local `const AD_CORR = 42` (the file's local-AD_* idiom, cf `AD_RUST`); `ERODE_CORRODE` joins the existing `./const.js` import (no new module edge); new `mhitm_ad_corr_u` mirroring `mhitm_ad_rust_u` 
**D-2070** `timeout.c:267–274` `sleep_dialogue` (`i = HSleepy & TIMEOUT; i == 4 → You("yawn.")`) call — `js/wizcmds.js` — `PROP_FLAT += [SLEEPY]: 'HSleepy'` (youprop.h:141 cite); `js/timeout.js` — `TIMEOUT_FLAT += [SLEEPY]: 'HSleepy'` so the generic `--` keeps the flat synced, file-local `sleep_dialogue()` plus the `:639–6
**D-2069** `polyself.c:1777–1874` `dohide` (ustuck/utrap refuse + reveal; eel-out-of-water; hides_und — `js/polyself.js` — exported async `dohide()` (full C branch order incl. nested You_cant reason ternary; You_cant/There/pline_The composed via `pline` per the zap.js `You` idiom; floor pile via `objects_at` nexthere + `mo
**D-2068** `bones.c:388–399` `remove_mon_from_bones` (iswiz / Medusa / MS_NEMESIS / MS_LEADER / `is_V — `js/end.js` — file-local `fixuporacle` (Oracle-level gate, `mpeaceful=1`, DELPHI `roomno-ROOMOFFSET` keep, else centre `enexto`+`await rloc_to` and restore `rtype`, C `:307–363`) + file-local `remove_mon_from_bones` (exa
**D-2067** `youprop.h:195–198` — `js/mhitu.js` — file-local `BInvis` + `Invis` now mirror the potion.js/zap.js idiom (`H = HInvis||intrinsic`, `E = EInvis||extrinsic`, mummy-wrapping `uarmc` stand-in for setworn `w_blocks`); `INVIS` joins the existing `
**D-2066** `monst.h:69–73` — `js/const.js` — `M_AP_TYPE` returns `((mon?.m_ap_type ?? 0) & M_AP_TYPMASK)` with the monst.h:73 citation; `M_AP_TYPMASK` is already exported from the same file (call-time reference, no TDZ, no new import/edge).
**D-2065** `pline.c` `You_hear` `:436–452` — `js/hack.js` — `You_hear` ports the Unaware arm verbatim via `youprop.h:399` (`(game.multi|0)<0 && (unconscious() || is_fainted())`, importing `teleport.js` `unconscious` — hoisted-function, cycle-safe per `imports.mjs -
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2072; wrap `wildmiss` /
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
