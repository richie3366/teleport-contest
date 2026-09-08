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

Score last measured: **2026-09-08** — full `sessions` at **D-2063**
(audit **1027–1033**, `84dc0e34`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`63+0.43/turn` (R² 0.79).

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
Reviews 990–1017: 24 ACCEPT, 2 ACCEPT-WITH-DEBT (991/998 map/state debts named, 1000 D-2030 slip harmless), 2 QUALITY-RISK (1006/1014 Must-fix all shipped).
Reviews 1018–1026: 8 ACCEPT, 1 ACCEPT-WITH-DEBT (1025 readobjnam deny-check debt, map-named, no Must-fix).
Reviews 1027–1033: 7 ACCEPT, 0 Must-fix.
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
**Next cluster:** `mhitu.c` wildmiss — blocks 2/553 corpus sessions (scen-wish-Healer-92147, scen-wish-Ranger-92155 step 186): C draws `rn2(3)=1` in wildmiss, JS `rn2(5)=4` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify wildmiss`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2066 (index).**
<!-- recent:begin -->
**D-2066** `monst.h:69–73` — `js/const.js` — `M_AP_TYPE` returns `((mon?.m_ap_type ?? 0) & M_AP_TYPMASK)` with the monst.h:73 citation; `M_AP_TYPMASK` is already exported from the same file (call-time reference, no TDZ, no new import/edge).
**D-2065** `pline.c` `You_hear` `:436–452` — `js/hack.js` — `You_hear` ports the Unaware arm verbatim via `youprop.h:399` (`(game.multi|0)<0 && (unconscious() || is_fainted())`, importing `teleport.js` `unconscious` — hoisted-function, cycle-safe per `imports.mjs -
**D-2064** the queue owner names where C printed; the writer is the caller — `js/zap.js` — after the self-zap `losehp`, mirror the `backfire` arm: `if (game._losehp_needs_done || game.program_state?.gameover) { await finish_losehp_done(); if (game.program_state?.gameover) return 1; }`.
**D-2063** `polyself.c` polyself `:596–615` (!polyok message arm: `pmname(flags.female)` then `the_un — `js/polyself.js` — article arm verbatim (`the_unique_pm`/`the`/`type_is_pname` + your_race/G_UNIQ guard); `controllable_poly` const (Stunned shape mirrors `hack.js` Stunned_prop `(u.HStun|0) || u.Stunned`); `vampyr_goto`
**D-2062** the queue owner is a literal-match misattribution — `js/invent.js` — (a) ulycn were-form arm (`an(pmname(mons(ulycn), female?FEMALE:MALE))` + « in beast form» + wizard `mtimedone` iff `umonnum==ulycn`) and `Hate_silver` arm (`ismnum(ulycn) || hates_silver(youmonst.data)`)
**D-2061** `end.c` really_done `:1186–1187` — `js/end.js` — after `at_midnight`, `if (((game.moves | 0) <= 1) && how < PANICKED && !(game.program_state?.done_stopprint | 0)) await pline(\`Do not pass Go.
**D-2060** `end.c` really_done `:1206–1219` (maintain `ugrave_arise` even for `!bones_ok`: PANICKED → — `js/end.js` — (1) `really_done` maintains `ugrave_arise` per C `:1206–1219` (PANICKED/BURNING+DISSOLVED/STONING/TURNED_SLIME+`G_GENOD` check via `game.mvitals`, `PM_GREEN_SLIME` via `monsterNames.indexOf` like D-2057; ki
**D-2059** the queue owner is a literal-match misattribution — `js/mhitu.js` — file-local `diseasemu` + `mhitm_ad_pest_u` + `mhitm_ad_heal_u` in the `mhitm_ad_famn_u` shape, wired into `mhitm_adtyping_u` in exact C order.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2066; wrap `wildmiss` /
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
