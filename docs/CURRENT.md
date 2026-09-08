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
(audit **1115–1122**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`56+0.35/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `76+0.46/turn` (R² 0.79) |
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
Reviews 1108–1114: 7 ACCEPT, 0 Must-fix.
Reviews 1115–1122: 8 ACCEPT, 0 Must-fix.
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
**Next cluster:** - [ ] `uhitm.c` hmon_hitmon_barehands — blocks 1/553 corpus sessions (first at step 87): C draws `rnd(4)=2` in hmon_hitmon_barehands, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify hmon_hitmon_barehands` (scen-poly-Monk-92213).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2157 (index).**
<!-- recent:begin -->
**D-2157** `light.c:213–250` (`do_light_sources`), reached via `apply.c` use_lamp `:1683` pline → `be — exact C ring — `limits = circle_ptr(range)`, `offset = limits[|y − ls.y|]`; `circle_ptr` exported from `js/vision.js` (was module-private; the table itself is already a verbatim C copy; `imports.mjs --can`: ALREADY, same
**D-2156** `zap.c:6401–6420` (`makewish` tail), not `mkobj.c hornoplenty`. The owner string is a topl — port the C block in exact branch order and short-circuit: fatal-corpse `wishedfor=1` via live `u_safe_from_fatal_corpse`/`st_all` (dynamic `pickup.js` import; `imports.mjs --can`: SAFE, hoisted function, same 90-module S
**D-2155** `uhitm.c:2626–2652` (`mhitm_ad_cold` uhitm arm: `mhitm_mgc_atk_negated(magr, mdef, TRUE)`  — new `damageum_ad_cold(mdef, mhm)` in `js/uhitm.js` in exact C order and short-circuit (negate-TRUE first; Blind-gated frost pline via house `Blind_that()`; resists_cold + shieldeff + chill pline then zero; `destroy_items
**D-2154** `insight.c:2784–2949` (`list_vanquished`: per-type line from `mons[i].pmnames[NEUTRAL]` — `pmname_neutral` now returns `pmnames[mndx]?.[NEUTRAL] ?? 'monster'` with the C cite (`mons[i].pmnames[NEUTRAL]`); `pmnames, NEUTRAL` join the existing `monsters.js` edge (`imports.mjs --can`: ALREADY, no new edge).
**D-2153** `potion.c:881–898` (`peffect_paralysis`: `Free_action` → `You("stiffen momentarily.")`; el — port the C branch order and short-circuit exactly: `Free_action()` resist arm; else Levitation (house reader, D-1419) / `Is_airlevel` / `Is_waterlevel` (const.js) → suspended, `u.usteed` → frozen in place, else feet + `s
**D-2152** `uhitm.c:933–1067` (`hmon_hitmon_weapon_melee`: `:944–945` dmgval + train gate, `:947–951` — New async `hmon_hitmon_weapon_melee(mon, obj, ctx)` in `js/uhitm.js` in exact C order and short-circuit (Healer `P_KNIFE` + `mvitals.died` bonus; `!train || ustuck || twoweap || Cleaver` no-bonus gate; Rogue `backstabbab
**D-2151** `uhitm.c:4593–4619` (`mhitm_ad_dise`; mhitu arm `:4604–4608`: `hitmsg(magr, mattk); if (!d — New `mhitm_ad_dise_u` in `js/mhitu.js` in exact C order and short-circuit (`await hitmsg`; `if (!(await diseasemu(mtmp?.data))) mhm.damage = 0` — sickness keeps leftover hitmu d(), resistance zeroes it), wired as `case A
**D-2150** `read.c:2651–2658` (`Snprintf(" [enter %s]", iflags.cmdassist ? "the symbol or name repres — Both genocide prompts use `!== false` default-On (house pattern from pickup.js/lock.js), C-cited.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2157; wrap `wildmiss` /
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
